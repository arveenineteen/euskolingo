import React, { useEffect, useMemo, useState } from "react";
import {
  LEVELS,
  LEVEL_LABELS,
  TOPICS,
  FLASHCARDS_BY_LEVEL_TOPIC,
  GRAMMAR,
  SPELLING,
  PRONUNCIATION,
  VOCAB_CONCEPTS,
  GRAMMAR_CONCEPTS
} from "./data.js";
import { generateSessionQuestions, normalizeText } from "./questionGenerator.js";
const KEY = "euskara-progress-v1";
const fresh = () => ({ passed: [], pending: [], corrected: [], best: {}, completedQuestions: 0 });
const load = () => {
  try {
    return { ...fresh(), ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return fresh();
  }
};
const unitId = (level, index) => `${level}-${index}`;

const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const prepareMatchQuestion = (q) => {
  if (q.type !== "match" || !Array.isArray(q.pairs)) return q;
  const fivePairs = q.pairs.slice(0, 5);
  return {
    ...q,
    leftWords: shuffleArray(fivePairs.map(([eu]) => eu)),
    rightWords: shuffleArray(fivePairs.map(([, es]) => es)),
    pairMap: Object.fromEntries(fivePairs)
  };
};

const buildUnitQuestions = (level, index, pendingIds = [], sessionSalt = 0) => {
  const seed = `${level}-${index}-${sessionSalt}`
    .split("")
    .reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 2147483647, 17);

  const generated = generateSessionQuestions({
    vocabConcepts: VOCAB_CONCEPTS,
    grammarConcepts: GRAMMAR_CONCEPTS,
    topicIndex: index,
    level,
    count: 30,
    seed,
    pendingIds,
    cooldownConcepts: 4
  });

  const base = generated.length > 0 ? generated : [{
    type: "choice",
    question: "Pregunta de demostración.",
    options: ["Opción A", "Opción B", "Opción C", "Opción D"],
    answer: "Opción A"
  }];

  return base.slice(0, 30).map((q, i) => prepareMatchQuestion({ ...q, id: `${level}-${index}-${i}` }));
};
 
const ZIGZAG_OFFSETS = [0, 58, 0, -58, 0, 58, 0, -58, 0, 58];

function App() {
  const [progress, setProgress] = useState(load);
  const [tab, setTab] = useState("Practicar");
  const [level, setLevel] = useState("A1.1");
  const [unit, setUnit] = useState(0);
  const [screen, setScreen] = useState("path");
  const [learnTab, setLearnTab] = useState("Flashcards");
  const [evoTab, setEvoTab] = useState("Progreso");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");

  // Estado para ordenar frases arrastrando palabras a slots
  const [orderedSlots, setOrderedSlots] = useState([]);
  const [draggedToken, setDraggedToken] = useState(null);

  // Estado para nivel de repaso de errores
  const [reviewSessionActive, setReviewSessionActive] = useState(false);
  const [reviewQuestions, setReviewQuestions] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewSolvedCount, setReviewSolvedCount] = useState(0);
  const [reviewFinished, setReviewFinished] = useState(false);

  // Estado para ejercicio de emparejar 5 + 5 en 2 columnas
  const [leftPick, setLeftPick] = useState("");
  const [rightPick, setRightPick] = useState("");
  const [matchedLeft, setMatchedLeft] = useState([]);
  const [matchedRight, setMatchedRight] = useState([]);
  const [matchErrors, setMatchErrors] = useState([]);

  // Estado para flashcards por nivel y tema
  const [flashLevel, setFlashLevel] = useState("A1.1");
  const [flashTopic, setFlashTopic] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(progress));
  }, [progress]);
  const [attemptSalt, setAttemptSalt] = useState(0);
  const questions = useMemo(
  () => buildUnitQuestions(level, unit, progress.pending.map((x) => x.conceptId || x.id), attemptSalt),
  [level, unit, attemptSalt]
);
  const activeQuestions = reviewSessionActive ? reviewQuestions : questions;
  const activeIdx = reviewSessionActive ? reviewIndex : questionIndex;
  const current = activeQuestions[activeIdx];

  useEffect(() => {
    if (current?.type === "order") {
      const count = (current.words || []).length;
      setOrderedSlots(Array.from({ length: count }, () => null));
    } else {
      setOrderedSlots([]);
    }
    setDraggedToken(null);
  }, [current]);

  const passed = new Set(progress.passed);
  const unlocked = (l, i) => i === 0 || passed.has(unitId(l, i - 1));
  const update = (fn) => setProgress((p) => fn({ ...p }));

  const resetQuestionState = () => {
    setSelected("");
    setFeedback("");
    setLeftPick("");
    setRightPick("");
    setMatchedLeft([]);
    setMatchedRight([]);
    setMatchErrors([]);
    setDraggedToken(null);
  };

  const start = (i) => {
    setAttemptSalt((s) => s + 1);
    setReviewSessionActive(false);
    setReviewFinished(false);
    setUnit(i);
    setScreen("quiz");
    setQuestionIndex(0);
    setAnswers({});
    resetQuestionState();
  };

  const startFixErrorsLevel = () => {
    if (progress.pending.length === 0) return;
    const prepared = progress.pending.map((item, idx) =>
      prepareMatchQuestion({
        ...(item.rawQuestion || {
          type: item.type || "choice",
          question: item.question,
          options: item.options || [item.answer, "Opción 2", "Opción 3", "Opción 4"],
          words: item.words,
          pairs: item.pairs,
          answer: item.answer,
          explanation: item.explanation || ""
        }),
        id: item.id,
        _reviewItem: item,
        _key: `${item.id}-${idx}`
      })
    );
    setReviewQuestions(prepared);
    setReviewIndex(0);
    setReviewSolvedCount(0);
    setReviewFinished(false);
    setReviewSessionActive(true);
    setTab("Practicar");
    setScreen("quiz");
    resetQuestionState();
  };

  const rememberWrong = (q, chosen, expected) =>
    update((p) => {
      const rawQuestion = {
        type: q.type,
        question: q.question,
        options: q.options,
        words: q.words,
        pairs: q.pairs,
        answer: expected || q.answer || "Revisar pareja/frase",
        explanation: q.explanation || ""
      };
      const item = {
        conceptId: q.conceptId || q._reviewItem?.conceptId || q.id,
        id: q.id,
        level: q._reviewItem?.level || level,
        topic: q._reviewItem?.topic || TOPICS[unit]?.name || `Subnivel ${unit + 1}`,
        question: q.question,
        chosen,
        answer: expected || q.answer || "Revisar pareja/frase",
        type: q.type,
        rawQuestion
      };
      if (!p.pending.some((x) => x.id === item.id)) {
        p.pending.push(item);
      }
      return p;
    });

  const markReviewItemSolved = (q) => {
    if (!reviewSessionActive || !q?._reviewItem) return;
    setReviewSolvedCount((c) => c + 1);
    update((p) => {
      p.pending = p.pending.filter((x) => x.id !== q._reviewItem.id);
      p.corrected.unshift({
        ...q._reviewItem,
        correctedAt: new Date().toISOString()
      });
      return p;
    });
  };

  const choose = (value) => {
    if (feedback) return;
    setSelected(value);
    const acceptedList = Array.isArray(current.acceptedAnswers) && current.acceptedAnswers.length > 0
  ? current.acceptedAnswers
  : [current.answer];
    const ok = acceptedList.some((ans) => normalizeText(value) === normalizeText(ans));
    setFeedback(ok ? "¡Correcto!" : `No es correcto. Respuesta: ${current.answer}`);
    if (reviewSessionActive) {
      if (ok) markReviewItemSolved(current);
      else rememberWrong(current, value, current.answer);
    } else {
      setAnswers((a) => ({ ...a, [questionIndex]: ok }));
      if (!ok) rememberWrong(current, value, current.answer);
    }
  };

  const placeWordInSlot = (wordObj, targetSlotIdx) => {
    if (feedback || !wordObj) return;
    setOrderedSlots((prev) => {
      const next = [...prev];
      if (wordObj.fromSlot !== undefined && wordObj.fromSlot !== null) {
        next[wordObj.fromSlot] = null;
      }
      const existing = next[targetSlotIdx];
      next[targetSlotIdx] = { word: wordObj.word, bankIndex: wordObj.bankIndex };
      if (existing && wordObj.fromSlot !== undefined && wordObj.fromSlot !== null) {
        next[wordObj.fromSlot] = existing;
      }
      return next;
    });
  };

  const removeWordFromSlot = (slotIdx) => {
    if (feedback) return;
    setOrderedSlots((prev) => {
      const next = [...prev];
      next[slotIdx] = null;
      return next;
    });
  };

  const evaluateMatchAttempt = (euWord, esWord) => {
    if (feedback) return;
    const expectedEs = current.pairMap[euWord];
    if (expectedEs === esWord) {
      const nextLeft = [...matchedLeft, euWord];
      const nextRight = [...matchedRight, esWord];
      setMatchedLeft(nextLeft);
      setMatchedRight(nextRight);
      setLeftPick("");
      setRightPick("");

      if (nextLeft.length === current.leftWords.length) {
        const noErrors = matchErrors.length === 0;
        if (reviewSessionActive) {
          if (noErrors) markReviewItemSolved(current);
        } else {
          setAnswers((a) => ({ ...a, [questionIndex]: noErrors }));
        }
        setFeedback(
          noErrors
            ? "¡Perfecto! Has emparejado las 5 parejas sin fallos."
            : "Has completado las 5 parejas, pero hubo algún fallo previo."
        );
      }
    } else {
      const wrongAttempt = `${euWord} ↔ ${esWord}`;
      setMatchErrors((errs) => [...errs, wrongAttempt]);
      rememberWrong(current, wrongAttempt, `${euWord} — ${expectedEs}`);
      setFeedback(`«${euWord}» no significa «${esWord}». Inténtalo de nuevo.`);
      setTimeout(() => {
        setLeftPick("");
        setRightPick("");
        setFeedback("");
      }, 900);
    }
  };

  const handleLeftClick = (euWord) => {
    if (feedback || matchedLeft.includes(euWord)) return;
    setLeftPick(euWord);
    if (rightPick) evaluateMatchAttempt(euWord, rightPick);
  };

  const handleRightClick = (esWord) => {
    if (feedback || matchedRight.includes(esWord)) return;
    setRightPick(esWord);
    if (leftPick) evaluateMatchAttempt(leftPick, esWord);
  };

  const next = () => {
    if (reviewSessionActive) {
      if (reviewIndex < reviewQuestions.length - 1) {
        setReviewIndex((n) => n + 1);
        resetQuestionState();
      } else {
        setReviewFinished(true);
        setScreen("result");
        setFeedback("");
      }
      return;
    }

    if (questionIndex < activeQuestions.length - 1) {
      setQuestionIndex((n) => n + 1);
      resetQuestionState();
      return;
    }
    const correct = Object.values(answers).filter(Boolean).length;
    update((p) => {
      p.completedQuestions += activeQuestions.length;
      p.best[unitId(level, unit)] = Math.max(p.best[unitId(level, unit)] || 0, correct);
      if (correct >= 27 && !p.passed.includes(unitId(level, unit))) {
        p.passed.push(unitId(level, unit));
      }
      return p;
    });
    setScreen("result");
    setFeedback("");
  };

  const reset = () => {
    if (confirm("¿Seguro que quieres borrar todo tu progreso en este dispositivo?")) {
      setProgress(fresh());
    }
  };

  const levelNumber = LEVELS.indexOf(level) + 1;
  const sublevels = Array.from({ length: 10 }, (_, i) => i);
  const allUnits = LEVELS.length * 10;
  const percentage = Math.round((progress.passed.length / allUnits) * 100);

  const flashDeck = FLASHCARDS_BY_LEVEL_TOPIC[`${flashLevel}-${flashTopic}`] || [];
  const activeFlash = flashDeck[cardIndex % Math.max(flashDeck.length, 1)] || ["—", "—"];

  const usedBankIndices = new Set(
    orderedSlots.filter(Boolean).map((item) => item.bankIndex)
  );
  const assembledSentence = orderedSlots.map((s) => (s ? s.word : "")).filter(Boolean).join(" ");
  const allSlotsFilled = orderedSlots.length > 0 && orderedSlots.every(Boolean);

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="level-dropdown-wrap">
          <select
            aria-label="Seleccionar nivel"
            className="level-dropdown"
            value={level}
            onChange={(e) => {
              setLevel(e.target.value);
              setReviewSessionActive(false);
              setReviewFinished(false);
              setScreen("path");
            }}
          >
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {LEVEL_LABELS[l] || l}
              </option>
            ))}
          </select>
        </div>
        <span className="sublevels-counter">
          <span className="flame-ico">🔥</span>
          {progress.passed.length} Subniveles
        </span>
      </header>

      <main>
        {tab === "Practicar" && (
          <section>
            {screen === "path" && (
              <div className="route-view">
                <div className="route-header">
                  <h1>Ruta Nivel {levelNumber}</h1>
                  <p>Supera los 10 subniveles (mínimo 27/30 aciertos)</p>
                </div>

                <div className="route-nodes">
                  {sublevels.map((i) => {
                    const isPassed = passed.has(unitId(level, i));
                    const isUnlocked = unlocked(level, i);
                    const nextPassed = i < sublevels.length - 1 && passed.has(unitId(level, i));
                    const offsetX = ZIGZAG_OFFSETS[i % ZIGZAG_OFFSETS.length];
                    const nextOffsetX = ZIGZAG_OFFSETS[(i + 1) % ZIGZAG_OFFSETS.length];
                    const deltaX = nextOffsetX - offsetX;

                    return (
                      <div key={i} className="route-step">
                        <div
                          className="node-slot"
                          style={{ transform: `translateX(${offsetX}px)` }}
                        >
                          <button
                            type="button"
                            disabled={!isUnlocked}
                            onClick={() => start(i)}
                            className={`node-circle ${isPassed ? "passed" : isUnlocked ? "active-node" : "locked-node"}`}
                            title={TOPICS[i]?.name || `Subnivel ${i + 1}`}
                          >
                            {isPassed ? "✓" : isUnlocked ? i + 1 : "🔒"}
                          </button>
                          <span className={`node-label ${!isUnlocked ? "muted-label" : ""}`}>
                            Subnivel {i + 1}
                          </span>
                        </div>

                        {i < sublevels.length - 1 && (
                          <div
                            className={`dotted-connector ${nextPassed ? "connector-done" : ""}`}
                            style={{
                              transform: `translateX(${offsetX + deltaX * 0.5}px) rotate(${Math.atan2(deltaX, 46)}rad)`
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {screen === "quiz" && current && (
              <>
                <button
                  className="back"
                  onClick={() => {
                    setReviewSessionActive(false);
                    setReviewFinished(false);
                    setScreen("path");
                  }}
                >
                  ← {reviewSessionActive ? "Salir del repaso" : "Volver a la ruta"}
                </button>
                <div className="quiz-top">
                  <span>
                    {reviewSessionActive
                      ? "Nivel de repaso · Todos los errores"
                      : `${LEVEL_LABELS[level]} · Subnivel ${unit + 1} (${TOPICS[unit]?.name})`}
                  </span>
                  <b>
                    {activeIdx + 1}/{activeQuestions.length}
                  </b>
                </div>
                <div className="progress-track">
                  <div style={{ width: `${((activeIdx + 1) / activeQuestions.length) * 100}%` }} />
                </div>

                <div className="quiz-card">
                  <span className="eyebrow">
                    EJERCICIO {current.type === "choice" ? "· TEST" : current.type === "order" ? "· ARRASTRA Y ORDENA" : "· RELACIONA (5 + 5)"}
                  </span>
                  <h2>{current.question}</h2>

                  {current.type === "choice" && (
                    <div className="options">
                      {current.options.map((o) => (
                        <button
                          key={o}
                          className={`option ${selected === o ? "selected" : ""}`}
                          onClick={() => choose(o)}
                          disabled={!!feedback}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  )}

                  {current.type === "order" && (
                    <div className="order-builder">
                      <div className="order-slots">
                        {orderedSlots.map((slotItem, slotIdx) => (
                          <div
                            key={slotIdx}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => {
                              if (draggedToken) {
                                placeWordInSlot(draggedToken, slotIdx);
                                setDraggedToken(null);
                              }
                            }}
                            onClick={() => {
                              if (slotItem) {
                                removeWordFromSlot(slotIdx);
                              } else if (draggedToken) {
                                placeWordInSlot(draggedToken, slotIdx);
                                setDraggedToken(null);
                              }
                            }}
                            className={`order-slot ${slotItem ? "filled" : ""}`}
                          >
                            {slotItem ? (
                              <span
                                draggable={!feedback}
                                onDragStart={() =>
                                  setDraggedToken({
                                    word: slotItem.word,
                                    bankIndex: slotItem.bankIndex,
                                    fromSlot: slotIdx
                                  })
                                }
                                className="draggable-chip in-slot"
                              >
                                {slotItem.word}
                              </span>
                            ) : (
                              <span className="slot-placeholder">{slotIdx + 1}</span>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="word-bank">
                        {(current.words || []).map((w, bIdx) => {
                          const isPlaced = usedBankIndices.has(bIdx);
                          return (
                            <button
                              key={`${w}-${bIdx}`}
                              type="button"
                              draggable={!feedback && !isPlaced}
                              disabled={!!feedback || isPlaced}
                              onDragStart={() =>
                                setDraggedToken({ word: w, bankIndex: bIdx, fromSlot: null })
                              }
                              onClick={() => {
                                const firstEmpty = orderedSlots.findIndex((s) => s === null);
                                if (firstEmpty !== -1) {
                                  placeWordInSlot({ word: w, bankIndex: bIdx }, firstEmpty);
                                }
                              }}
                              className={`draggable-chip ${isPlaced ? "used-chip" : ""}`}
                            >
                              {w}
                            </button>
                          );
                        })}
                      </div>

                      <div className="order-actions">
                        <button
                          type="button"
                          className="secondary"
                          disabled={!!feedback || usedBankIndices.size === 0}
                          onClick={() =>
                            setOrderedSlots(Array.from({ length: orderedSlots.length }, () => null))
                          }
                        >
                          Limpiar frase
                        </button>
                        <button
                          type="button"
                          className="primary"
                          disabled={!allSlotsFilled || !!feedback}
                          onClick={() => choose(assembledSentence)}
                        >
                          Comprobar frase
                        </button>
                      </div>
                    </div>
                  )}

                  {current.type === "match" && (
                    <div className="match-board">
                      <div className="match-col">
                        <small className="match-col-title">EUSKERA</small>
                        {(current.leftWords || []).map((euWord) => {
                          const isMatched = matchedLeft.includes(euWord);
                          const isPicked = leftPick === euWord;
                          return (
                            <button
                              key={euWord}
                              type="button"
                              disabled={isMatched || !!feedback}
                              onClick={() => handleLeftClick(euWord)}
                              className={`option match-item ${isPicked ? "selected" : ""} ${isMatched ? "matched" : ""}`}
                            >
                              {euWord}
                            </button>
                          );
                        })}
                      </div>

                      <div className="match-col">
                        <small className="match-col-title">ESPAÑOL</small>
                        {(current.rightWords || []).map((esWord) => {
                          const isMatched = matchedRight.includes(esWord);
                          const isPicked = rightPick === esWord;
                          return (
                            <button
                              key={esWord}
                              type="button"
                              disabled={isMatched || !!feedback}
                              onClick={() => handleRightClick(esWord)}
                              className={`option match-item ${isPicked ? "selected" : ""} ${isMatched ? "matched" : ""}`}
                            >
                              {esWord}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {feedback && (
                    <div className={`feedback ${feedback.startsWith("¡") || feedback.startsWith("Has completado") ? "good" : "bad"}`}>
                      {feedback} {current.explanation || ""}
                    </div>
                  )}

                  <button
                    className="primary full"
                    disabled={current.type === "match" ? matchedLeft.length < (current.leftWords?.length || 0) : !feedback}
                    onClick={next}
                  >
                    {activeIdx === activeQuestions.length - 1 ? "Ver resultado" : "Siguiente pregunta"}
                  </button>
                </div>
              </>
            )}

            {screen === "result" && reviewFinished && (
              <div className="result-card">
                <div className="result-icon">✅</div>
                <span className="eyebrow">NIVEL DE REPASO COMPLETADO</span>
                <h1>
                  {reviewSolvedCount}/{reviewQuestions.length}
                </h1>
                <h2>Errores revisados</h2>
                <p>Las preguntas acertadas se han eliminado de tus errores pendientes.</p>
                <button
                  className="primary full"
                  onClick={() => {
                    setReviewSessionActive(false);
                    setReviewFinished(false);
                    setScreen("path");
                  }}
                >
                  Volver a la ruta
                </button>
              </div>
            )}

            {screen === "result" && !reviewFinished && (
              <div className="result-card">
                <div className="result-icon">{(progress.best[unitId(level, unit)] || 0) >= 27 ? "🏆" : "💪"}</div>
                <span className="eyebrow">RESULTADO DEL SUBNIVEL</span>
                <h1>{progress.best[unitId(level, unit)] || 0}/30</h1>
                <h2>{(progress.best[unitId(level, unit)] || 0) >= 27 ? "¡Subnivel superado!" : "Sigue practicando"}</h2>
                <p>
                  {(progress.best[unitId(level, unit)] || 0) >= 27
                    ? "Has desbloqueado el siguiente subnivel."
                    : "Necesitas al menos 27 respuestas correctas."}
                </p>
                <button className="primary full" onClick={() => setScreen("path")}>
                  Volver a la ruta
                </button>
                <button className="secondary full" onClick={() => start(unit)}>
                  Repetir subnivel
                </button>
              </div>
            )}
          </section>
        )}

        {tab === "Aprender" && (
          <section>
            <div className="page-intro">
              <h1>Aprender</h1>
              <p>Consulta vocabulario, gramática, ortografía y pronunciación.</p>
            </div>
            <div className="tabs">
              {["Flashcards", "Gramática", "Ortografía", "Pronunciación"].map((x) => (
                <button className={learnTab === x ? "chosen" : ""} onClick={() => setLearnTab(x)} key={x}>
                  {x}
                </button>
              ))}
            </div>

            {learnTab === "Flashcards" && (
              <>
                <label className="field-label">Nivel</label>
                <div className="level-select">
                  {LEVELS.map((l) => (
                    <button
                      key={l}
                      className={flashLevel === l ? "active" : ""}
                      onClick={() => {
                        setFlashLevel(l);
                        setCardIndex(0);
                        setFlipped(false);
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>

                <label className="field-label">Tema / Campo semántico</label>
                <div className="level-select">
                  {TOPICS.map((t, i) => (
                    <button
                      className={flashTopic === i ? "active" : ""}
                      key={t.name}
                      onClick={() => {
                        setFlashTopic(i);
                        setCardIndex(0);
                        setFlipped(false);
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <div className="flashcard" onClick={() => setFlipped(!flipped)}>
                  <span className="eyebrow">
                    {flashLevel} · {TOPICS[flashTopic]?.name.toUpperCase()} ({(cardIndex % Math.max(flashDeck.length, 1)) + 1}/{Math.max(flashDeck.length, 1)})
                  </span>
                  <strong>{activeFlash[flipped ? 1 : 0]}</strong>
                  <small>{flipped ? "Español / Respuesta (toca para ver euskera)" : "Euskera / Expresión (toca para girar)"}</small>
                </div>

                <div className="flash-actions">
                  <button
                    className="secondary"
                    onClick={() => {
                      const len = Math.max(flashDeck.length, 1);
                      setCardIndex((cardIndex + len - 1) % len);
                      setFlipped(false);
                    }}
                  >
                    ← Anterior
                  </button>
                  <button
                    className="primary"
                    onClick={() => {
                      const len = Math.max(flashDeck.length, 1);
                      setCardIndex((cardIndex + 1) % len);
                      setFlipped(false);
                    }}
                  >
                    Siguiente →
                  </button>
                </div>

                <div className="deck-list">
                  <small className="field-label">Todas las tarjetas de {flashLevel} · {TOPICS[flashTopic]?.name}</small>
                  {flashDeck.map(([eu, es], idx) => (
                    <button
                      key={`${eu}-${idx}`}
                      type="button"
                      className={`deck-row ${cardIndex % flashDeck.length === idx ? "active-row" : ""}`}
                      onClick={() => {
                        setCardIndex(idx);
                        setFlipped(false);
                      }}
                    >
                      <b>{eu}</b>
                      <span>{es}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {learnTab === "Gramática" && <InfoList items={GRAMMAR} />}
            {learnTab === "Ortografía" && <InfoList items={SPELLING} />}
            {learnTab === "Pronunciación" && <InfoList items={PRONUNCIATION} />}
          </section>
        )}

        {tab === "Progreso" && (
          <section>
            <div className="page-intro">
              <h1>Tu progreso</h1>
              <p>Revisa tus subniveles completados y corrige tus errores.</p>
            </div>
            <div className="tabs">
              <button className={evoTab === "Progreso" ? "chosen" : ""} onClick={() => setEvoTab("Progreso")}>
                Resumen
              </button>
              <button className={evoTab === "Repaso" ? "chosen" : ""} onClick={() => setEvoTab("Repaso")}>
                Repaso ({progress.pending.length})
              </button>
            </div>

            {evoTab === "Progreso" && (
              <>
                <div className="stats-grid">
                  <div className="stat">
                    <strong>{progress.passed.length}</strong>
                    <span>Subniveles superados</span>
                  </div>
                  <div className="stat">
                    <strong>{progress.completedQuestions}</strong>
                    <span>Preguntas respondidas</span>
                  </div>
                  <div className="stat">
                    <strong>{progress.pending.length}</strong>
                    <span>Errores pendientes</span>
                  </div>
                </div>

                <div className="progress-card">
                  <div className="section-heading">
                    <h2>Progreso global</h2>
                    <b>{percentage}%</b>
                  </div>
                  <div className="progress-track">
                    <div style={{ width: `${percentage}%` }} />
                  </div>
                  <p className="muted">
                    {progress.passed.length} de {allUnits} subniveles en los 8 niveles.
                  </p>
                </div>

                {LEVELS.map((l) => (
                  <div className="level-progress" key={l}>
                    <b>{l}</b>
                    <span>{sublevels.filter((i) => passed.has(unitId(l, i))).length}/10</span>
                    <div className="mini-track">
                      <i style={{ width: `${sublevels.filter((i) => passed.has(unitId(l, i))).length * 10}%` }} />
                    </div>
                  </div>
                ))}

                <button className="text-button" onClick={reset}>
                  Borrar progreso de este dispositivo
                </button>
              </>
            )}

            {evoTab === "Repaso" && (
              <div className="review-box">
                {progress.pending.length === 0 ? (
                  <div className="empty">¡Todo al día! No tienes errores pendientes por corregir.</div>
                ) : (
                  <div className="progress-card">
                    <h2>Nivel de repaso de errores</h2>
                    <p className="muted">
                      Tienes {progress.pending.length}{" "}
                      {progress.pending.length === 1 ? "error pendiente" : "errores pendientes"}. Entra para resolverlos todos juntos en un mismo nivel.
                    </p>
                    <button type="button" className="primary full" onClick={startFixErrorsLevel}>
                      Corregir errores ({progress.pending.length})
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </main>

      <nav className="bottom-nav">
        {[
          { id: "Practicar", label: "Practicar", icon: "🎯" },
          { id: "Aprender", label: "Aprender", icon: "📖" },
          { id: "Progreso", label: "Progreso", icon: "📊" }
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            className={tab === item.id ? "nav-active" : ""}
            onClick={() => {
              setTab(item.id);
              setReviewSessionActive(false);
              setReviewFinished(false);
              setScreen("path");
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function InfoList({ items }) {
  return (
    <div className="info-list">
      {items.map(([title, body]) => (
        <article key={title}>
          <h3>{title}</h3>
          <p>{body}</p>
        </article>
      ))}
    </div>
  );
}

export default App;
