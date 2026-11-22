import React, { useEffect, useMemo, useState } from "react";
import { LEVELS, TOPICS, QUESTION_BANK, FLASHCARDS, GRAMMAR, SPELLING, PRONUNCIATION } from "./data.js";

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

const buildUnitQuestions = (level, index) => {
  const stored = QUESTION_BANK[unitId(level, index)] || [];
  const base = stored.length > 0 ? stored : [{
    type: "choice",
    question: "Contenido de demostración: añade preguntas revisadas a src/data.js.",
    options: ["Opción A", "Opción B", "Opción C", "Opción D"],
    answer: "Opción A",
    explanation: "Pregunta de demostración."
  }];
  return Array.from({ length: 30 }, (_, i) => {
    const q = base[i % base.length];
    const cloned = { ...q, id: `${level}-${index}-${i}` };
    if (cloned.type === "match" && Array.isArray(cloned.pairs)) {
      const fivePairs = cloned.pairs.slice(0, 5);
      cloned.leftWords = shuffleArray(fivePairs.map(([eu]) => eu));
      cloned.rightWords = shuffleArray(fivePairs.map(([, es]) => es));
      cloned.pairMap = Object.fromEntries(fivePairs);
    }
    return cloned;
  });
};

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

  // Estado específico para el ejercicio de emparejar 5 + 5 en 2 columnas
  const [leftPick, setLeftPick] = useState("");
  const [rightPick, setRightPick] = useState("");
  const [matchedLeft, setMatchedLeft] = useState([]);
  const [matchedRight, setMatchedRight] = useState([]);
  const [matchErrors, setMatchErrors] = useState([]);

  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewMode, setReviewMode] = useState("pending");

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(progress));
  }, [progress]);

  const questions = useMemo(() => buildUnitQuestions(level, unit), [level, unit]);
  const current = questions[questionIndex];
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
  };

  const start = (i) => {
    setUnit(i);
    setScreen("quiz");
    setQuestionIndex(0);
    setAnswers({});
    resetQuestionState();
  };

  const rememberWrong = (q, chosen, expected) =>
    update((p) => {
      const item = {
        id: q.id,
        level,
        topic: TOPICS[unit].name,
        question: q.question,
        chosen,
        answer: expected || q.answer || "Revisar pareja/frase",
        type: q.type
      };
      if (!p.pending.some((x) => x.id === item.id)) p.pending.push(item);
      return p;
    });

  const choose = (value) => {
    if (feedback) return;
    setSelected(value);
    const ok = value === current.answer;
    setFeedback(ok ? "¡Correcto!" : "No es correcto.");
    setAnswers((a) => ({ ...a, [questionIndex]: ok }));
    if (!ok) rememberWrong(current, value, current.answer);
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
        setAnswers((a) => ({ ...a, [questionIndex]: noErrors }));
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
    if (questionIndex < 29) {
      setQuestionIndex((n) => n + 1);
      resetQuestionState();
      return;
    }
    const correct = Object.values(answers).filter(Boolean).length;
    update((p) => {
      p.completedQuestions += 30;
      p.best[unitId(level, unit)] = Math.max(p.best[unitId(level, unit)] || 0, correct);
      if (correct >= 27 && !p.passed.includes(unitId(level, unit))) {
        p.passed.push(unitId(level, unit));
      }
      return p;
    });
    setScreen("result");
    setFeedback("");
  };

  const retryReview = (item) => {
    const answer = window.prompt(`Repite: ${item.question}\nEscribe la respuesta correcta:`);
    if (answer === null) return;
    const normalized = (s) => s.trim().toLocaleLowerCase("es");
    if (normalized(answer) === normalized(item.answer)) {
      update((p) => {
        p.pending = p.pending.filter((x) => x.id !== item.id);
        p.corrected.unshift({ ...item, correctedAt: new Date().toISOString() });
        return p;
      });
      alert("¡Bien! Error marcado como corregido.");
    } else {
      alert("Todavía no está corregido. Inténtalo de nuevo.");
    }
  };

  const reset = () => {
    if (confirm("¿Seguro que quieres borrar todo tu progreso en este dispositivo?")) {
      setProgress(fresh());
    }
  };

  const topicCards = TOPICS.map((t, i) => (
    <button
      className={`topic ${unlocked(level, i) ? "" : "locked"} ${passed.has(unitId(level, i)) ? "done" : ""}`}
      key={t.name}
      disabled={!unlocked(level, i)}
      onClick={() => start(i)}
    >
      <span className="topic-number">{passed.has(unitId(level, i)) ? "✓" : i + 1}</span>
      <span>
        <b>{t.name}</b>
        <small>{t.grammar}</small>
      </span>
      <span>{unlocked(level, i) ? "›" : "🔒"}</span>
    </button>
  ));

  const allUnits = LEVELS.length * TOPICS.length;
  const percentage = Math.round((progress.passed.length / allUnits) * 100);
  const currentCards = FLASHCARDS[TOPICS[cardIndex]?.name] || [];

  return (
    <div className="app-shell">
      <header>
        <div className="brand-mark">E</div>
        <div>
          <strong>Euskara</strong>
          <small>Ikasi · Praktikatu · Hobetu</small>
        </div>
        <span className="header-spacer" />
        <span className="streak">✦ {progress.passed.length}/{allUnits}</span>
      </header>

      <main>
        {tab === "Practicar" && (
          <section>
            {screen === "path" && (
              <>
                <div className="hero">
                  <span className="eyebrow">ZURE EUSKARA BIDEA</span>
                  <h1>
                    Aprende euskera
                    <br />
                    paso a paso.
                  </h1>
                  <p>Completa unidades por nivel, supera retos y avanza a tu ritmo.</p>
                </div>

                <label className="field-label">Tu nivel</label>
                <div className="level-select">
                  {LEVELS.map((l) => (
                    <button key={l} className={level === l ? "active" : ""} onClick={() => setLevel(l)}>
                      {l}
                    </button>
                  ))}
                </div>

                <div className="section-heading">
                  <div>
                    <span className="eyebrow">CAMINO DE APRENDIZAJE</span>
                    <h2>{level}</h2>
                  </div>
                  <span className="muted">
                    {TOPICS.filter((_, i) => passed.has(unitId(level, i))).length}/{TOPICS.length} aprobados
                  </span>
                </div>

                <div className="path-list">{topicCards}</div>
                <p className="hint">
                  Cada examen tiene 30 preguntas del nivel seleccionado. Necesitas 27 aciertos para desbloquear la siguiente unidad.
                </p>
              </>
            )}

            {screen === "quiz" && (
              <>
                <button className="back" onClick={() => setScreen("path")}>
                  ← Volver al camino
                </button>
                <div className="quiz-top">
                  <span>
                    {level} · {TOPICS[unit].name}
                  </span>
                  <b>{questionIndex + 1}/30</b>
                </div>
                <div className="progress-track">
                  <div style={{ width: `${((questionIndex + 1) / 30) * 100}%` }} />
                </div>

                <div className="quiz-card">
                  <span className="eyebrow">
                    EJERCICIO {current.type === "choice" ? "· TEST" : current.type === "order" ? "· ORDENA" : "· RELACIONA (5 + 5)"}
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
                    <div className="options">
                      {(current.words || []).map((w, i) => (
                        <button
                          key={i}
                          className={`option ${selected.split(" ").includes(w) ? "selected" : ""}`}
                          disabled={!!feedback}
                          onClick={() => {
                            const nextVal = selected ? `${selected} ${w}` : w;
                            setSelected(nextVal);
                          }}
                        >
                          {w}
                        </button>
                      ))}
                      {selected && !feedback && (
                        <button className="secondary" onClick={() => setSelected("")}>
                          Limpiar selección ({selected})
                        </button>
                      )}
                      <button className="primary" disabled={!selected || !!feedback} onClick={() => choose(selected)}>
                        Comprobar frase
                      </button>
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
                    {questionIndex === 29 ? "Ver resultado" : "Siguiente pregunta"}
                  </button>
                </div>
              </>
            )}

            {screen === "result" && (
              <div className="result-card">
                <div className="result-icon">{(progress.best[unitId(level, unit)] || 0) >= 27 ? "🏆" : "💪"}</div>
                <span className="eyebrow">RESULTADO DEL EXAMEN</span>
                <h1>{progress.best[unitId(level, unit)] || 0}/30</h1>
                <h2>{(progress.best[unitId(level, unit)] || 0) >= 27 ? "¡Unidad aprobada!" : "Sigue practicando"}</h2>
                <p>
                  {(progress.best[unitId(level, unit)] || 0) >= 27
                    ? "Has desbloqueado la siguiente unidad."
                    : "Necesitas al menos 27 respuestas correctas."}
                </p>
                <button className="primary full" onClick={() => setScreen("path")}>
                  Volver al camino
                </button>
                <button className="secondary full" onClick={() => start(unit)}>
                  Repetir examen
                </button>
              </div>
            )}
          </section>
        )}

        {tab === "Aprender" && (
          <section>
            <div className="page-intro">
              <span className="eyebrow">TU ESPACIO DE ESTUDIO</span>
              <h1>Aprender</h1>
              <p>Consulta vocabulario y conceptos clave.</p>
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
                <label className="field-label">Campo semántico</label>
                <div className="level-select">
                  {TOPICS.map((t, i) => (
                    <button
                      className={cardIndex === i ? "active" : ""}
                      key={t.name}
                      onClick={() => {
                        setCardIndex(i);
                        setFlipped(false);
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div className="flashcard" onClick={() => setFlipped(!flipped)}>
                  <span className="eyebrow">{TOPICS[cardIndex].name.toUpperCase()} · TOCA PARA GIRAR</span>
                  <strong>{currentCards[0]?.[flipped ? 1 : 0] || "—"}</strong>
                  <small>{flipped ? "Español" : "Euskera"}</small>
                </div>
                <div className="flash-actions">
                  <button
                    className="secondary"
                    onClick={() => {
                      setCardIndex((cardIndex + TOPICS.length - 1) % TOPICS.length);
                      setFlipped(false);
                    }}
                  >
                    ← Anterior
                  </button>
                  <button
                    className="primary"
                    onClick={() => {
                      setCardIndex((cardIndex + 1) % TOPICS.length);
                      setFlipped(false);
                    }}
                  >
                    Siguiente →
                  </button>
                </div>
              </>
            )}

            {learnTab === "Gramática" && <InfoList items={GRAMMAR} />}
            {learnTab === "Ortografía" && <InfoList items={SPELLING} />}
            {learnTab === "Pronunciación" && <InfoList items={PRONUNCIATION} />}
          </section>
        )}

        {tab === "Evolución" && (
          <section>
            <div className="page-intro">
              <span className="eyebrow">AURRERAPENA</span>
              <h1>Tu evolución</h1>
              <p>Consulta tus avances y refuerza lo que más cuesta.</p>
            </div>
            <div className="tabs">
              <button className={evoTab === "Progreso" ? "chosen" : ""} onClick={() => setEvoTab("Progreso")}>
                Progreso
              </button>
              <button className={evoTab === "Repaso" ? "chosen" : ""} onClick={() => setEvoTab("Repaso")}>
                Repaso
              </button>
            </div>

            {evoTab === "Progreso" && (
              <>
                <div className="stats-grid">
                  <div className="stat">
                    <strong>{progress.passed.length}</strong>
                    <span>Unidades aprobadas</span>
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
                    {progress.passed.length} de {allUnits} unidades completadas en los 8 niveles.
                  </p>
                </div>

                {LEVELS.map((l) => (
                  <div className="level-progress" key={l}>
                    <b>{l}</b>
                    <span>
                      {TOPICS.filter((_, i) => passed.has(unitId(l, i))).length}/{TOPICS.length}
                    </span>
                    <div className="mini-track">
                      <i style={{ width: `${(TOPICS.filter((_, i) => passed.has(unitId(l, i))).length / TOPICS.length) * 100}%` }} />
                    </div>
                  </div>
                ))}

                <button className="text-button" onClick={reset}>
                  Borrar progreso de este dispositivo
                </button>
              </>
            )}

            {evoTab === "Repaso" && (
              <>
                <div className="tabs compact">
                  <button className={reviewMode === "pending" ? "chosen" : ""} onClick={() => setReviewMode("pending")}>
                    No corregidas ({progress.pending.length})
                  </button>
                  <button className={reviewMode === "corrected" ? "chosen" : ""} onClick={() => setReviewMode("corrected")}>
                    Corregidas ({progress.corrected.length})
                  </button>
                </div>
                {(reviewMode === "pending" ? progress.pending : progress.corrected).length === 0 ? (
                  <div className="empty">¡Todo al día! Aquí aparecerán tus errores.</div>
                ) : (
                  (reviewMode === "pending" ? progress.pending : progress.corrected).map((x, i) => (
                    <div className="mistake" key={`${x.id}-${i}`}>
                      <b>
                        {x.topic} · {x.level}
                      </b>
                      <p>{x.question}</p>
                      <small>
                        Tu respuesta: {x.chosen} · Respuesta: {x.answer}
                      </small>
                      {reviewMode === "pending" && (
                        <button className="secondary" onClick={() => retryReview(x)}>
                          Repetir error
                        </button>
                      )}
                    </div>
                  ))
                )}
              </>
            )}
          </section>
        )}
      </main>

      <nav className="bottom-nav">
        {[
          ["Practicar", "◈"],
          ["Aprender", "▤"],
          ["Evolución", "⌁"]
        ].map(([name, ico]) => (
          <button
            key={name}
            className={tab === name ? "nav-active" : ""}
            onClick={() => {
              setTab(name);
              setScreen("path");
            }}
          >
            <span>{ico}</span>
            {name}
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
