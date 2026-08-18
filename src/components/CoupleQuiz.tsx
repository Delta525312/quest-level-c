"use client";

import { useEffect, useRef, useState } from "react";

type QuizQuestion = {
  id: string;
  question: string;
  answer: string;
  choices: readonly string[];
  suit: string;
};

const questions: readonly QuizQuestion[] = [
  { id: "age", question: "ซีอายุเท่าไหร่?", answer: "26", choices: ["24", "25", "26", "27"], suit: "♥" },
  { id: "favorite", question: "ซีชอบอะไรมากที่สุด?", answer: "เดลต้า", choices: ["ชานม", "เดลต้า", "เกมมือถือ", "ตุ๊กตาหมี"], suit: "♦" },
  { id: "career", question: "ซีทำอาชีพอะไร?", answer: "ผู้แทนยา", choices: ["เภสัชกร", "นักการตลาด", "ผู้แทนยา", "พยาบาล"], suit: "♣" },
  { id: "color", question: "ซีชอบสีอะไร?", answer: "ชมพู", choices: ["ฟ้า", "เขียว", "ดำ", "ชมพู"], suit: "♠" },
  { id: "food", question: "ซีชอบกินอะไร?", answer: "หมูกระทะ", choices: ["ชาบู", "ซูชิ", "หมูกระทะ", "ส้มตำ"], suit: "♥" },
  { id: "driving", question: "ซีขับรถเร็วไหม?", answer: "ตีนผี", choices: ["ช้าแบบชมวิว", "ตีนผี", "สายปลอดภัย", "ไม่ขับเลย"], suit: "♦" },
  { id: "fruit", question: "ซีชอบกินผลไม้อะไร?", answer: "สตอเบอรี่", choices: ["แตงโม", "มะม่วง", "องุ่น", "สตอเบอรี่"], suit: "♣" },
  { id: "free-time", question: "เวลาว่างซีชอบทำอะไร?", answer: "นอนเปื่อย ๆ ดูหนัง", choices: ["ออกกำลังกาย", "เดินห้าง", "นอนเปื่อย ๆ ดูหนัง", "ทำอาหาร"], suit: "♠" },
];

function shuffled<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

type CoupleQuizProps = {
  onCorrect: () => void;
  onWrong: () => void;
  onClick: () => void;
};

export default function CoupleQuiz({ onCorrect, onWrong, onClick }: CoupleQuizProps) {
  const [deck, setDeck] = useState<QuizQuestion[] | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [wrongChoice, setWrongChoice] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);
  const wrongTimerRef = useRef<number | null>(null);
  const nextTimerRef = useRef<number | null>(null);

  const dealDeck = () => {
    const nextDeck = shuffled(questions);
    setDeck(nextDeck);
    setQuestionIndex(0);
    setChoices(shuffled(nextDeck[0].choices));
    setWrongChoice(null);
    setIsCorrect(false);
    setCompleted(false);
  };

  useEffect(() => {
    const dealFrame = window.requestAnimationFrame(dealDeck);
    return () => {
      window.cancelAnimationFrame(dealFrame);
      if (wrongTimerRef.current !== null) window.clearTimeout(wrongTimerRef.current);
      if (nextTimerRef.current !== null) window.clearTimeout(nextTimerRef.current);
    };
  }, []);

  const chooseAnswer = (choice: string) => {
    const question = deck?.[questionIndex];
    if (!question || isCorrect) return;

    if (choice !== question.answer) {
      onWrong();
      setWrongChoice(null);
      window.requestAnimationFrame(() => setWrongChoice(choice));
      if (wrongTimerRef.current !== null) window.clearTimeout(wrongTimerRef.current);
      wrongTimerRef.current = window.setTimeout(() => setWrongChoice(null), 650);
      return;
    }

    onCorrect();
    setWrongChoice(null);
    setIsCorrect(true);
    nextTimerRef.current = window.setTimeout(() => {
      const nextIndex = questionIndex + 1;
      if (nextIndex >= deck.length) {
        setCompleted(true);
        return;
      }
      setQuestionIndex(nextIndex);
      setChoices(shuffled(deck[nextIndex].choices));
      setIsCorrect(false);
    }, 820);
  };

  const restart = () => {
    onClick();
    dealDeck();
  };

  const currentQuestion = deck?.[questionIndex];

  return (
    <div className="scene quiz-scene">
      <p className="quest-badge">LV.04 • HEART READER</p>
      <h1>รู้ใจซีมากแค่ไหน</h1>
      <p className="quiz-intro">หยิบไพ่คำถามเกี่ยวกับ “ซี” แล้วเลือกคำตอบที่ใช่ที่สุด</p>

      <div className="quiz-table">
        <span className="quiz-table-suit quiz-table-suit--one" aria-hidden="true">♥</span>
        <span className="quiz-table-suit quiz-table-suit--two" aria-hidden="true">♦</span>
        <span className="quiz-table-suit quiz-table-suit--three" aria-hidden="true">♣</span>
        <span className="quiz-table-suit quiz-table-suit--four" aria-hidden="true">♠</span>

        {!currentQuestion ? (
          <div className="quiz-dealing" aria-label="กำลังสับไพ่"><i /><i /><i /><strong>SHUFFLING...</strong></div>
        ) : completed ? (
          <div className="quiz-complete-card">
            <span className="quiz-complete-crown" aria-hidden="true">♛</span>
            <span className="quiz-complete-label">PERFECT MATCH!</span>
            <h2>รู้ใจซีครบทุกข้อ!</h2>
            <p>ผ่านด่านหัวใจไปแบบคะแนนเต็ม 8/8 สมกับเป็นคนพิเศษจริง ๆ</p>
            <div className="quiz-complete-hearts" aria-hidden="true"><i>♥</i><i>♥</i><i>♥</i></div>
            <button className="pixel-button quiz-restart-button" onClick={restart}>↻ สับไพ่เล่นใหม่</button>
          </div>
        ) : (
          <div className={`quiz-question-wrap ${isCorrect ? "is-correct" : ""}`} key={currentQuestion.id}>
            <div className="quiz-deck-stack" aria-hidden="true"><i /><i /></div>
            <article className="quiz-question-card">
              <div className="quiz-card-corner quiz-card-corner--top" aria-hidden="true"><strong>{questionIndex + 1}</strong><span>{currentQuestion.suit}</span></div>
              <div className="quiz-card-corner quiz-card-corner--bottom" aria-hidden="true"><strong>{questionIndex + 1}</strong><span>{currentQuestion.suit}</span></div>
              <div className="quiz-progress"><span>CARD {questionIndex + 1} / {deck.length}</span><i style={{ width: `${((questionIndex + 1) / deck.length) * 100}%` }} /></div>
              <span className="quiz-big-suit" aria-hidden="true">{currentQuestion.suit}</span>
              <h2>{currentQuestion.question}</h2>
              <div className="quiz-choices">
                {choices.map((choice, index) => (
                  <button
                    className={`quiz-choice ${wrongChoice === choice ? "is-wrong" : ""}`}
                    disabled={isCorrect}
                    key={choice}
                    onClick={() => chooseAnswer(choice)}
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    <strong>{choice}</strong>
                  </button>
                ))}
              </div>
              {wrongChoice ? <p className="quiz-feedback quiz-feedback--wrong" role="status">ผิดใบแล้ว ลองอ่านใจซีอีกครั้ง!</p> : <p className="quiz-hint">เลือกผิด จะยังไม่ยอมให้ผ่านนะ</p>}
              {isCorrect ? <div className="quiz-correct-stamp" role="status"><span>✓</span><strong>CORRECT!</strong></div> : null}
            </article>
          </div>
        )}
      </div>
    </div>
  );
}
