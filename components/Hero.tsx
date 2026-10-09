"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import HeroOrnament from "@/components/home/HeroOrnament";
import { readLocale, type SiteLocale } from "@/lib/locale";

const copy = {
  en: {
    eyebrow: "A Royal Heritage · Since 1912",
    titleA: "Mysore",
    titleB: "Silk",
    lead: ["Pure silk.", "Woven in Mysuru.", "For generations."],
    cta: "Explore Collection",
    scroll: ["Scroll", "to explore"],
  },
  kn: {
    eyebrow: "ರಾಜಮನೆತನದ ಪರಂಪರೆ · ೧೯೧೨ರಿಂದ",
    titleA: "ಮೈಸೂರು",
    titleB: "ಸಿಲ್ಕ್",
    lead: ["ಶುದ್ಧ ರೇಷ್ಮೆ.", "ಮೈಸೂರಿನಲ್ಲಿ ನೇಯ್ದಿದ್ದು.", "ತಲೆಮಾರುಗಳಿಗಾಗಿ."],
    cta: "ಸಂಗ್ರಹವನ್ನು ನೋಡಿ",
    scroll: ["ಸ್ಕ್ರಾಲ್", "ಅನ್ವೇಷಿಸಿ"],
  },
} as const;

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [locale, setLocale] = useState<SiteLocale>("en");
  const [ready, setReady] = useState(false);
  const t = copy[locale];

  useEffect(() => {
    setLocale(readLocale());
    setReady(true);
    const onLocale = (event: Event) => {
      const detail = (event as CustomEvent<SiteLocale>).detail;
      if (detail === "en" || detail === "kn") setLocale(detail);
      else setLocale(readLocale());
    };
    window.addEventListener("ksic:locale-changed", onLocale);
    return () => window.removeEventListener("ksic:locale-changed", onLocale);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
        stage.style.setProperty("--hero-parallax", `${progress * 28}px`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollNext = () => {
    const next = document.getElementById("between");
    next?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className={`hero hero-royal${ready ? " is-ready" : ""}`}
      id="hero"
      aria-label="Mysore Silk"
    >
      <div className="hero-royal__stage" ref={stageRef}>
        <picture className="hero-royal__picture">
          <source
            media="(max-width: 640px)"
            srcSet="/hero-royal-sm.webp"
            type="image/webp"
          />
          <source
            media="(max-width: 1100px)"
            srcSet="/hero-royal-md.webp"
            type="image/webp"
          />
          <source srcSet="/hero-royal.webp" type="image/webp" />
          <img
            src="/hero-royal.jpg"
            alt=""
            className="hero-royal__image"
            width={1672}
            height={941}
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <div className="hero-royal__veil" aria-hidden="true" />
      </div>

      <HeroOrnament />

      <div className="hero-royal__copy">
        <p className="hero-royal__eyebrow">{t.eyebrow}</p>
        <div className="hero-royal__rule" aria-hidden="true" />
        <h1 className="hero-royal__title">
          <span>{t.titleA}</span>
          <span>{t.titleB}</span>
        </h1>
        <p className="hero-royal__lead">
          {t.lead.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <Link className="hero-royal__cta" href="/collections">
          {t.cta} <span aria-hidden="true">→</span>
        </Link>
      </div>

      <button type="button" className="hero-royal__scroll" onClick={scrollNext}>
        <span>
          {t.scroll[0]}
          <br />
          {t.scroll[1]}
        </span>
        <span className="hero-royal__scroll-line" aria-hidden="true" />
      </button>
    </section>
  );
}
