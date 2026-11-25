export function seededRandom(seed) {
  let s = Number(seed) % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function shuffleWithSeed(list, rng) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function normalizeText(str = "") {
  return String(str)
    .toLowerCase()
    .replace(/[¿?¡!.,;:«»"']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function pickUniqueOptions(correct, pool, rng, count = 3) {
  const seen = new Set([normalizeText(correct)]);
  const candidates = [];
  for (const item of shuffleWithSeed(pool, rng)) {
    const norm = normalizeText(item);
    if (!norm || seen.has(norm)) continue;
    seen.add(norm);
    candidates.push(item);
    if (candidates.length === count) break;
  }
  return shuffleWithSeed([correct, ...candidates], rng);
}

export function buildQuestionFromPattern(concept, patternId, poolConcepts, rng) {
  const samePool = poolConcepts.filter((c) => c.id !== concept.id);

  if (patternId === "eu-to-es-choice") {
    const source = concept.distractorsEs?.length ? concept.distractorsEs : samePool.map((c) => c.es);
    return {
      conceptId: concept.id,
      patternId,
      type: "choice",
      question: `¿Qué significa «${concept.eu}»?`,
      options: pickUniqueOptions(concept.es, source, rng, 3),
      answer: concept.es,
      explanation: concept.explanation || ""
    };
  }

  if (patternId === "es-to-eu-choice") {
    const source = concept.distractorsEu?.length ? concept.distractorsEu : samePool.map((c) => c.eu);
    return {
      conceptId: concept.id,
      patternId,
      type: "choice",
      question: `¿Cómo se dice «${concept.es}» en euskera?`,
      options: pickUniqueOptions(concept.eu, source, rng, 3),
      answer: concept.eu,
      explanation: concept.explanation || ""
    };
  }

  if (patternId === "context-gap-choice" && concept.gapEu && concept.gapAnswer) {
    const source = samePool.map((c) => c.gapAnswer || c.eu);
    return {
      conceptId: concept.id,
      patternId,
      type: "choice",
      question: `Completa la frase («${concept.exampleEs}»): «${concept.gapEu}»`,
      options: pickUniqueOptions(concept.gapAnswer, source, rng, 3),
      answer: concept.gapAnswer,
      explanation: concept.explanation || ""
    };
  }

  if (patternId === "build-order" && Array.isArray(concept.tokensEu) && concept.tokensEu.length >= 2) {
    const targetPhrase = concept.acceptedAnswers?.[0] || concept.exampleEu || concept.tokensEu.join(" ");
    return {
      conceptId: concept.id,
      patternId,
      type: "order",
      question: `Ordena las palabras para decir «${concept.exampleEs || concept.promptEs}»:`,
      words: shuffleWithSeed(concept.tokensEu, rng),
      answer: targetPhrase,
      acceptedAnswers: concept.acceptedAnswers || [targetPhrase],
      explanation: concept.explanation || concept.commonTrap || ""
    };
  }

  if (patternId === "grammar-transform-choice" && Array.isArray(concept.wrongOptions) && concept.wrongOptions.length > 0) {
    const answer = concept.acceptedAnswers?.[0] || concept.tokensEu?.join(" ") || "";
    return {
      conceptId: concept.id,
      patternId,
      type: "choice",
      question: `Elige la forma correcta para: «${concept.promptEs}» (${concept.commonTrap || "revisa la estructura"})`,
      options: pickUniqueOptions(answer, concept.wrongOptions, rng, 3),
      answer,
      acceptedAnswers: concept.acceptedAnswers || [answer],
      explanation: concept.explanation || ""
    };
  }

  const fallbackSource = concept.distractorsEs?.length ? concept.distractorsEs : samePool.map((c) => c.es);
  return {
    conceptId: concept.id,
    patternId: "eu-to-es-choice",
    type: "choice",
    question: `¿Qué significa «${concept.eu}»?`,
    options: pickUniqueOptions(concept.es, fallbackSource, rng, 3),
    answer: concept.es,
    explanation: concept.explanation || ""
  };
}

function getPatternsForConcept(concept) {
  if (concept.kind === "grammar") {
    const list = [];
    if (Array.isArray(concept.wrongOptions) && concept.wrongOptions.length > 0) {
      list.push("grammar-transform-choice");
    }
    if (Array.isArray(concept.tokensEu) && concept.tokensEu.length >= 2) {
      list.push("build-order");
    }
    return list.length > 0 ? list : ["grammar-transform-choice"];
  }

  const list = ["eu-to-es-choice", "es-to-eu-choice"];
  if (concept.gapEu && concept.gapAnswer) list.push("context-gap-choice");
  if (Array.isArray(concept.tokensEu) && concept.tokensEu.length >= 2) list.push("build-order");
  return list;
}

export function generateSessionQuestions({
  vocabConcepts = [],
  grammarConcepts = [],
  topicIndex,
  level = null,
  count = 30,
  seed = 101,
  pendingIds = [],
  cooldownConcepts = 4
}) {
  const rng = seededRandom(seed);

  const filterPool = (items) => {
    const byTopic = typeof topicIndex === "number"
      ? items.filter((item) => item.topicIndex === topicIndex)
      : items;
    if (!level) return byTopic.length > 0 ? byTopic : items;

    const baseLevel = String(level).slice(0, 2);
    const exact = byTopic.filter((item) => item.level === level || item.level === baseLevel);
    if (exact.length >= 3) return exact;
    return byTopic.length > 0 ? byTopic : items;
  };

  const vocabPool = filterPool(vocabConcepts);
  const gramPool = filterPool(grammarConcepts);

  const combined = [
    ...vocabPool.map((c) => ({ ...c, kind: "vocab" })),
    ...gramPool.map((g) => ({ ...g, kind: "grammar" }))
  ];

  if (combined.length === 0) return [];

  const pendingSet = new Set(pendingIds);
  const orderedConcepts = shuffleWithSeed(combined, rng).sort((a, b) => {
    const aPend = pendingSet.has(a.id) ? 0 : 1;
    const bPend = pendingSet.has(b.id) ? 0 : 1;
    return aPend - bPend;
  });

  const usedPatternsByConcept = new Map();
  const usedSignatures = new Set();
  const usedMatchCombos = new Set();
  const recentConceptIds = [];
  const questions = [];
  let matchCounter = 0;

  const effectiveCooldown = Math.min(
    cooldownConcepts,
    Math.max(1, orderedConcepts.length - 1)
  );

  for (let i = 0; i < count; i++) {
    if (i > 0 && i % 6 === 0 && vocabPool.length >= 5) {
      let chosenFive = null;
      for (let attempt = 0; attempt < 8; attempt++) {
        const sample = shuffleWithSeed(vocabPool, rng).slice(0, 5);
        const comboKey = sample.map((x) => x.id).sort().join("|");
        if (!usedMatchCombos.has(comboKey)) {
          usedMatchCombos.add(comboKey);
          chosenFive = sample;
          break;
        }
      }
      if (!chosenFive) chosenFive = shuffleWithSeed(vocabPool, rng).slice(0, 5);

      questions.push({
        id: `match-${topicIndex ?? "all"}-${matchCounter++}-${i}`,
        conceptId: chosenFive.map((x) => x.id).join("+"),
        patternId: "match-5-pairs",
        type: "match",
        question: "Empareja cada palabra en euskera con su significado:",
        pairs: chosenFive.map((x) => [x.eu, x.es]),
        explanation: "Revisa cada pareja en euskera y castellano."
      });
      continue;
    }

    const recentSet = new Set(recentConceptIds.slice(-effectiveCooldown));
    let candidate =
      orderedConcepts.find((c) => !recentSet.has(c.id)) ||
      orderedConcepts[i % orderedConcepts.length];

    const availablePatterns = getPatternsForConcept(candidate);
    const usedSet = usedPatternsByConcept.get(candidate.id) || new Set();
    const unusedPatterns = availablePatterns.filter((p) => !usedSet.has(p));
    const patternCandidates = shuffleWithSeed(
      unusedPatterns.length > 0 ? unusedPatterns : availablePatterns,
      rng
    );

    let built = null;
    for (const pat of patternCandidates) {
      const q = buildQuestionFromPattern(candidate, pat, vocabPool, rng);
      const sig = `${candidate.id}::${pat}::${normalizeText(q.question)}::${normalizeText(q.answer)}`;
      if (!usedSignatures.has(sig)) {
        usedSignatures.add(sig);
        usedSet.add(pat);
        if (usedSet.size >= availablePatterns.length) {
          usedPatternsByConcept.set(candidate.id, new Set([pat]));
        } else {
          usedPatternsByConcept.set(candidate.id, usedSet);
        }
        built = q;
        break;
      }
    }

    if (!built) {
      const altCandidate = orderedConcepts.find((c) => {
        const pats = getPatternsForConcept(c);
        return pats.some((p) => {
          const testQ = buildQuestionFromPattern(c, p, vocabPool, rng);
          const testSig = `${c.id}::${p}::${normalizeText(testQ.question)}::${normalizeText(testQ.answer)}`;
          return !usedSignatures.has(testSig);
        });
      });

      if (altCandidate) {
        candidate = altCandidate;
        const pat = getPatternsForConcept(altCandidate)[0];
        const q = buildQuestionFromPattern(altCandidate, pat, vocabPool, rng);
        usedSignatures.add(
          `${altCandidate.id}::${pat}::${normalizeText(q.question)}::${normalizeText(q.answer)}`
        );
        built = q;
      } else {
        const fallbackPat = availablePatterns[i % availablePatterns.length];
        built = buildQuestionFromPattern(candidate, fallbackPat, vocabPool, rng);
      }
    }

    questions.push({
      ...built,
      id: `q-${topicIndex ?? "all"}-${i}-${candidate.id}`
    });
    recentConceptIds.push(candidate.id);
  }

  return questions;
}
