"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CoupleQuiz from "@/components/CoupleQuiz";
import MemoryTimeline from "@/components/MemoryTimeline";
import RelationshipCounter from "@/components/RelationshipCounter";
import VisitorCounter from "@/components/VisitorCounter";

type Stage = "gift" | "opening" | "flowers" | "menu" | "counter" | "message" | "timeline" | "quiz";
type SfxName = "click" | "select" | "back" | "reset" | "toggleOn" | "toggleOff" | "calendar" | "gallery" | "gift" | "sparkle" | "shuffle" | "letter" | "replay" | "wrong" | "correct";

const SOUND_STORAGE_KEY = "quest-lv-c-sound-enabled";
const STAGE_STORAGE_KEY = "quest-lv-c-current-stage";
const savedStages: readonly Stage[] = ["gift", "opening", "flowers", "menu", "counter", "message", "timeline", "quiz"];

function isStage(value: string | null): value is Stage {
  return value !== null && savedStages.includes(value as Stage);
}

const sfxPatterns: Record<SfxName, Array<[number, number, number, OscillatorType]>> = {
  click: [[520, 0, 0.055, "square"], [680, 0.045, 0.065, "square"]],
  select: [[440, 0, 0.07, "square"], [660, 0.065, 0.08, "square"], [880, 0.14, 0.11, "triangle"]],
  back: [[560, 0, 0.07, "square"], [380, 0.07, 0.12, "triangle"]],
  reset: [[620, 0, 0.045, "square"], [460, 0.045, 0.055, "square"], [310, 0.1, 0.1, "triangle"]],
  toggleOn: [[330, 0, 0.045, "square"], [494, 0.04, 0.055, "square"], [740, 0.09, 0.1, "triangle"]],
  toggleOff: [[620, 0, 0.045, "square"], [420, 0.045, 0.07, "square"], [250, 0.1, 0.08, "triangle"]],
  calendar: [[880, 0, 0.035, "square"], [440, 0.055, 0.06, "square"], [660, 0.12, 0.075, "triangle"]],
  gallery: [[190, 0, 0.04, "square"], [920, 0.035, 0.035, "square"], [460, 0.085, 0.08, "triangle"]],
  gift: [[392, 0, 0.08, "square"], [523, 0.07, 0.09, "square"], [659, 0.15, 0.12, "triangle"], [1047, 0.25, 0.2, "sine"]],
  sparkle: [[1047, 0, 0.045, "sine"], [1397, 0.045, 0.06, "sine"]],
  shuffle: [[260, 0, 0.035, "square"], [330, 0.045, 0.035, "square"], [420, 0.09, 0.05, "square"]],
  letter: [[310, 0, 0.045, "triangle"], [390, 0.04, 0.05, "square"], [784, 0.1, 0.12, "sine"], [1047, 0.19, 0.15, "sine"]],
  replay: [[784, 0, 0.05, "triangle"], [659, 0.045, 0.05, "square"], [784, 0.1, 0.06, "square"], [1047, 0.17, 0.11, "sine"]],
  wrong: [[210, 0, 0.13, "sawtooth"], [165, 0.11, 0.18, "sawtooth"], [120, 0.25, 0.22, "square"]],
  correct: [[523, 0, 0.07, "square"], [784, 0.07, 0.09, "triangle"], [1047, 0.15, 0.16, "sine"]],
};

const LETTER_MESSAGE = "สุขสันต์วันครบรอบ 1 ปี 4 เดือน นะ ถึงเดือนนี้จะไม่ได้อยู่ด้วยกัน ก็ขอให้มีความสุข รักกันเหมือนเดิม ดีใจเสมอที่ชีวิตนี้ได้เจอกัน";

const copy = {
    badge: "QUEST LV.C",
    giftTitle: "มีของขวัญมาส่ง!",
    giftBody: "แตะกล่องเบา ๆ แล้วมาดูกันว่าข้างในมีอะไร",
    open: "เปิดของขวัญ",
    flowerEyebrow: "ไอเทมพิเศษที่ได้รับ!",
    flowerTitle: "ดอกไม้ให้คนน่ารัก",
    flowerBody: "ขอมอบดอกไม้ช่อนี้ให้คนที่ทำให้ทุกวันมีความหมายและสดใสเสมอ ขอบคุณที่อยู่ด้วยกันนะ 💞",
    next: "ไปต่อกันเลย",
    menuEyebrow: "เลือกด่านของเรา",
    menuTitle: "เรื่องราวเล็ก ๆ ของเราสองคน",
    menuBody: "เลือกหมวดที่อยากเปิดดู แล้วออกเดินทางไปกับเรื่องราวของเราได้เลย",
    reset: "เริ่มใหม่",
    cards: [
      { number: "01", title: "เราคบกันมาแล้วกี่วัน", subtitle: "Our days together", art: "days" },
      { number: "02", title: "ข้อความถึงคนน่ารัก", subtitle: "A message for you", art: "message" },
      { number: "03", title: "แกลเลอรี่ความทรงจำ", subtitle: "Memory timeline", art: "gallery" },
      { number: "04", title: "รู้ใจซีมากแค่ไหน", subtitle: "Our little quiz", art: "quiz" },
    ],
} as const;

function CategoryArt({ type, alt }: { type: "days" | "message" | "gallery" | "quiz"; alt: string }) {
  return (
    <span className={`category-art category-art--${type}`}>
      <span className="category-effect" aria-hidden="true" />
      {type === "quiz" ? (
        <span className="quiz-card-deck" aria-label={alt} role="img">
          <Image className="quiz-playing-card quiz-playing-card--one" src="/images/category-quiz-card.png" width={220} height={220} alt="" />
          <Image className="quiz-playing-card quiz-playing-card--two" src="/images/category-quiz-card.png" width={220} height={220} alt="" />
          <Image className="quiz-playing-card quiz-playing-card--three" src="/images/category-quiz-card.png" width={220} height={220} alt="" />
        </span>
      ) : (
        <Image className="category-device" src={`/images/category-${type}.png`} width={360} height={360} alt={alt} />
      )}
    </span>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg className="speaker-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      {muted ? <path d="m17 9 5 6m0-6-5 6" /> : <><path d="M16 9.2c1.4 1.5 1.4 4.1 0 5.6" /><path d="M19 6.5c3.4 3 3.4 8 0 11" /></>}
    </svg>
  );
}

function RomanticLetter({ onReplay }: { onReplay: () => void }) {
  const [animationKey, setAnimationKey] = useState(0);

  const replayLetter = () => {
    onReplay();
    setAnimationKey((key) => key + 1);
  };

  return (
    <div className="scene letter-scene">
      <p className="quest-badge">LV.02 • SECRET LETTER</p>
      <h1>ข้อความถึงคนน่ารัก</h1>
      <p className="letter-intro">มีจดหมายฉบับหนึ่งตั้งใจเขียนถึงคนพิเศษโดยเฉพาะ</p>

      <div className="letter-display" key={animationKey}>
        <div className="letter-sparkles" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <div className="letter-envelope">
          <span className="envelope-shadow" aria-hidden="true" />
          <span className="envelope-back" aria-hidden="true" />
          <article className="letter-paper">
            <span className="letter-stamp" aria-hidden="true">♥</span>
            <p className="letter-kicker">TO MY FAVORITE PERSON</p>
            <h2>ถึงคนพิเศษ</h2>
            <span className="letter-divider" aria-hidden="true"><i /> ♥ <i /></span>
            <p className="letter-message">{LETTER_MESSAGE}</p>
            <p className="letter-signature">จากคนที่อยากเห็นเธอมีความสุขทุกวัน <span>♥</span></p>
          </article>
          <span className="envelope-flap" aria-hidden="true"><i>♥</i></span>
          <span className="envelope-front" aria-hidden="true" />
        </div>
      </div>

      <button className="pixel-button letter-replay-button" onClick={replayLetter}><span aria-hidden="true">↻</span> เปิดจดหมายอีกครั้ง</button>
    </div>
  );
}

function PixelWorldBackground() {
  return (
    <div className="pixel-world" aria-hidden="true">
      <span className="sky-halo" />
      <span className="pixel-sun"><i /></span>
      <span className="pixel-rainbow"><i /><i /><i /></span>
      <span className="shooting-star shooting-star--one" />
      <span className="shooting-star shooting-star--two" />
      <div className="floating-pixels">
        <i className="float-heart float-heart--one" /><i className="float-heart float-heart--two" /><i className="float-heart float-heart--three" />
        <i className="float-star float-star--one" /><i className="float-star float-star--two" /><i className="float-star float-star--three" /><i className="float-star float-star--four" />
        <i className="float-diamond float-diamond--one" /><i className="float-diamond float-diamond--two" /><i className="float-diamond float-diamond--three" />
      </div>
      <div className="cloud-bank cloud-bank--far"><i /><i /><i /></div>
      <div className="cloud-bank cloud-bank--near"><i /><i /></div>
      <div className="pixel-hills pixel-hills--far" />
      <div className="pixel-hills pixel-hills--near" />
      <div className="pixel-town"><i /><i /><i /><i /><i /><i /></div>
      <div className="ground-scenery">
        <span className="pixel-tree pixel-tree--one"><i /></span><span className="pixel-tree pixel-tree--two"><i /></span><span className="pixel-tree pixel-tree--three"><i /></span><span className="pixel-tree pixel-tree--four"><i /></span>
        <span className="pixel-flower pixel-flower--one" /><span className="pixel-flower pixel-flower--two" /><span className="pixel-flower pixel-flower--three" /><span className="pixel-flower pixel-flower--four" /><span className="pixel-flower pixel-flower--five" /><span className="pixel-flower pixel-flower--six" /><span className="pixel-flower pixel-flower--seven" /><span className="pixel-flower pixel-flower--eight" />
        <span className="pixel-mushroom pixel-mushroom--one" /><span className="pixel-mushroom pixel-mushroom--two" /><span className="pixel-mushroom pixel-mushroom--three" /><span className="pixel-mushroom pixel-mushroom--four" />
        <span className="grass-tuft grass-tuft--one" /><span className="grass-tuft grass-tuft--two" /><span className="grass-tuft grass-tuft--three" /><span className="grass-tuft grass-tuft--four" />
      </div>
      <div className="fireflies"><i /><i /><i /><i /><i /><i /><i /><i /></div>
      <div className="edge-decor">
        <span className="pixel-balloon"><i /></span>
        <span className="pixel-bird pixel-bird--one" /><span className="pixel-bird pixel-bird--two" /><span className="pixel-bird pixel-bird--three" />
        <span className="side-vine side-vine--left"><i /><i /><i /><i /></span><span className="side-vine side-vine--right"><i /><i /><i /><i /></span>
        <span className="pixel-butterfly pixel-butterfly--one"><i /></span><span className="pixel-butterfly pixel-butterfly--two"><i /></span>
        <span className="corner-spark corner-spark--tl" /><span className="corner-spark corner-spark--tr" /><span className="corner-spark corner-spark--bl" /><span className="corner-spark corner-spark--br" />
      </div>
      <span className="content-quiet-zone" />
      <span className="scanline-sheen" />
    </div>
  );
}

export default function AnniversaryGame() {
  const [stage, setStage] = useState<Stage | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sfxContextRef = useRef<AudioContext | null>(null);
  const shellRef = useRef<HTMLElement | null>(null);
  const text = copy;
  const showsMenuBack = stage === "counter" || stage === "message" || stage === "timeline" || stage === "quiz";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.48;
    let soundEnabled = false;
    let restoredStage: Stage = "gift";
    try {
      soundEnabled = window.localStorage.getItem(SOUND_STORAGE_KEY) === "true";
      const savedStage = window.localStorage.getItem(STAGE_STORAGE_KEY);
      if (isStage(savedStage)) restoredStage = savedStage;
    } catch { soundEnabled = false; }
    audio.muted = !soundEnabled;
    if (soundEnabled) void audio.play().catch(() => undefined);
    const restoreFrame = window.requestAnimationFrame(() => {
      setStage(restoredStage);
      setIsMuted(!soundEnabled);
    });
    return () => window.cancelAnimationFrame(restoreFrame);
  }, []);

  useEffect(() => () => { void sfxContextRef.current?.close(); }, []);

  const playSfx = (name: SfxName, force = false) => {
    if (isMuted && !force) return;
    const context = sfxContextRef.current ?? new window.AudioContext();
    sfxContextRef.current = context;
    void context.resume();
    const start = context.currentTime;
    sfxPatterns[name].forEach(([frequency, delay, duration, type]) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const at = start + delay;
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, at);
      const volume = name === "click" || name === "calendar" || name === "gallery" ? 0.072 : name === "wrong" ? 0.065 : name === "gift" ? 0.058 : 0.05;
      gain.gain.setValueAtTime(volume, at);
      gain.gain.exponentialRampToValueAtTime(0.001, at + duration);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(at);
      oscillator.stop(at + duration);
    });
  };

  const playButtonSfx = (sound: Exclude<SfxName, "sparkle"> = "click", force = false) => {
    if (!isMuted) void audioRef.current?.play().catch(() => undefined);
    playSfx(sound, force);
  };

  const rememberSound = (enabled: boolean) => {
    try { window.localStorage.setItem(SOUND_STORAGE_KEY, String(enabled)); } catch { /* Storage can be unavailable in private contexts. */ }
  };

  const rememberStage = (nextStage: Stage) => {
    try { window.localStorage.setItem(STAGE_STORAGE_KEY, nextStage); } catch { /* Storage can be unavailable in private contexts. */ }
  };

  const toggleSound = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !isMuted;
    if (nextMuted) playButtonSfx("toggleOff");
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
    rememberSound(!nextMuted);
    if (!nextMuted) {
      try { await audio.play(); playButtonSfx("toggleOn", true); } catch { audio.muted = true; setIsMuted(true); rememberSound(false); }
    }
  };

  const goTo = (nextStage: Stage) => {
    setStage(nextStage);
    rememberStage(nextStage);
  };
  const handleMenuClick = (index: number) => {
    if (index === 0) { playButtonSfx("calendar"); goTo("counter"); return; }
    if (index === 1) { playButtonSfx("letter"); goTo("message"); return; }
    if (index === 2) { playButtonSfx("gallery"); goTo("timeline"); return; }
    if (index === 3) { playButtonSfx("shuffle"); goTo("quiz"); }
  };
  const openGift = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = false;
      setIsMuted(false);
      rememberSound(true);
      void audio.play().catch(() => { audio.muted = true; setIsMuted(true); rememberSound(false); });
    }
    playButtonSfx("gift", true);
    goTo("opening");
  };

  const moveScene = (event: React.PointerEvent<HTMLElement>) => {
    const shell = shellRef.current;
    if (!shell) return;
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    shell.style.setProperty("--scene-x", `${x * 18}px`);
    shell.style.setProperty("--scene-y", `${y * 12}px`);
  };

  return (
    <main ref={shellRef} className={`game-shell game-shell--${stage}`} onPointerMove={moveScene}>
      <PixelWorldBackground />
      <div className="pixel-sky" aria-hidden="true"><span className="cloud cloud--one" /><span className="cloud cloud--two" /><span className="spark spark--one" /><span className="spark spark--two" /><span className="spark spark--three" /></div>
      <audio ref={audioRef} src="/audio/04.%20YUBIKIRI-GENMAN.mp3" loop autoPlay muted={isMuted} preload="auto" />
      <header className="game-toolbar">
        <div className="toolbar-leading">
          {showsMenuBack ? (
            <button className="toolbar-back-button" onClick={() => { playButtonSfx("back"); goTo("menu"); }}>
              <span aria-hidden="true">←</span><span className="toolbar-back-full">กลับไปเลือกด่าน</span><span className="toolbar-back-short">เลือกด่าน</span>
            </button>
          ) : (
            <div className="brand-mark">QUEST LV.C <span>♥</span></div>
          )}
        </div>
        <div className="toolbar-actions">
          <button className={`sound-icon-toggle ${isMuted ? "is-muted" : ""}`} onClick={toggleSound} aria-label={isMuted ? "เปิดเสียงเพลง" : "ปิดเสียงเพลง"} aria-pressed={!isMuted} title={isMuted ? "Unmute" : "Mute"}><SpeakerIcon muted={isMuted} /></button>
        </div>
      </header>

      <section className={`game-stage game-stage--${stage}`} aria-live="polite">
        {(stage === "gift" || stage === "opening") && <div className={`scene scene--gift ${stage === "opening" ? "scene--opening" : ""}`} key="gift">
          <div className="pixel-petals" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
          <p className="quest-badge">{text.badge}</p><h1>{text.giftTitle}</h1><p className="scene-copy">{text.giftBody}</p>
          <button className="asset-button" onClick={openGift} onPointerEnter={() => playSfx("sparkle")} disabled={stage === "opening"} onAnimationEnd={(event) => { if (event.animationName === "gift-open") goTo("flowers"); }} aria-label={text.open}>
            <span className="asset-glow" /><Image src="/images/pixel-gift.png" width={640} height={640} priority alt="กล่องของขวัญพิกเซลสีชมพู" /><span className="tap-label">{text.open}</span>
          </button>
        </div>}

        {stage === "flowers" && <div className="scene scene--flowers" key="flowers">
          <p className="quest-badge">{text.flowerEyebrow}</p>
          <div className="flower-card">
            <Image src="/images/pixel-bouquet.png" width={720} height={720} priority alt="ช่อดอกไม้พิกเซลสีชมพู" />
            <div className="flower-message"><span className="tiny-kicker">FOR YOU ♥</span><h1>{text.flowerTitle}</h1><p>{text.flowerBody}</p><button className="pixel-button" onClick={() => { playButtonSfx("select"); goTo("menu"); }}>{text.next}<span aria-hidden="true">››</span></button></div>
          </div>
        </div>}

        {stage === "menu" && <div className="scene scene--menu" key="menu">
          <p className="quest-badge">{text.menuEyebrow}</p><h1>{text.menuTitle}</h1><p className="scene-copy">{text.menuBody}</p>
          <div className="chapter-grid">{text.cards.map((card, index) => <button className={`chapter-card chapter-card--${card.art}`} key={card.number} onClick={() => handleMenuClick(index)}><span className="chapter-number">LV.{card.number}</span><CategoryArt type={card.art} alt={`ภาพพิกเซล ${card.title}`} /><span className="chapter-copy"><span className="chapter-title">{card.title}</span><span className="chapter-subtitle">{card.subtitle}</span></span></button>)}</div>
          <button className="reset-button" onClick={() => { playButtonSfx("reset"); goTo("gift"); }}>← {text.reset}</button>
        </div>}
        {stage === "counter" && <RelationshipCounter />}
        {stage === "message" && <RomanticLetter onReplay={() => playButtonSfx("replay")} />}
        {stage === "timeline" && <MemoryTimeline />}
        {stage === "quiz" && <CoupleQuiz onClick={() => playButtonSfx("shuffle")} onCorrect={() => playButtonSfx("correct")} onWrong={() => playButtonSfx("wrong")} />}
      </section>
      <VisitorCounter visible={stage === "gift"} />
      <footer className="game-footer"><span>♥</span> Created By Delta <span>♥</span></footer>
    </main>
  );
}
