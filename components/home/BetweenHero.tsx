"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PANEL_NAV = [
  { label: "Heritage", href: "/heritage" },
  { label: "Craftsmanship", href: "/mysore-silk/craft" },
  { label: "Pure Silk", href: "/mysore-silk/silk" },
  { label: "Mysuru", href: "/world/mysuru" },
] as const;

function LotusMark() {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M14 24c-2.2-4.2-6.5-6.5-9-6.8 3.2-1.2 5.4-3.5 6.5-6.7 1.1 3.2 3.3 5.5 6.5 6.7-2.5.3-6.8 2.6-9 6.8Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M14 10c1.2-2.4 2.4-3.8 4.5-4.8-2.2.1-3.4.4-4.5 1.2-1.1-.8-2.3-1.1-4.5-1.2C11.6 6.2 12.8 7.6 14 10Z"
        stroke="currentColor"
        strokeWidth="0.95"
      />
      <circle cx="14" cy="14" r="1.2" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

function MarkIcon({ type }: { type: "silk" | "zari" | "mysuru" }) {
  if (type === "silk") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M16 5c-2.5 6-9 9-11 15 5.5 1.2 9 4.5 11 9 2-4.5 5.5-7.8 11-9-2-6-8.5-9-11-15Z"
          stroke="currentColor"
          strokeWidth="1.15"
        />
        <path d="M16 11v12" stroke="currentColor" strokeWidth="0.9" opacity="0.55" />
      </svg>
    );
  }
  if (type === "zari") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M8 16l8-10 8 10-8 10-8-10Z" stroke="currentColor" strokeWidth="1.1" />
        <path d="M12 16h8M16 12v8" stroke="currentColor" strokeWidth="0.85" opacity="0.65" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M5 25h22" stroke="currentColor" strokeWidth="1" />
      <path d="M9 25V15l7-9 7 9v10" stroke="currentColor" strokeWidth="1.1" />
      <path d="M14 25v-6h4v6" stroke="currentColor" strokeWidth="0.9" opacity="0.7" />
      <path d="M16 6v4" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="16" cy="5" r="1.3" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

export default function BetweenHero() {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`between-hero between-hero--split${ready ? " is-ready" : ""}`}
      id="between"
      aria-label="The art of Mysore silk"
    >
      <div className="between-hero__inner">
        <figure className="between-hero__media">
          <Image
            src="/between-loom-hero.jpg"
            alt="Deep burgundy Mysore silk with gold zari woven on a traditional loom"
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
            className="between-hero__img"
            priority
          />
          <div className="between-hero__media-veil" aria-hidden="true" />

          <div className="between-hero__side-label" aria-hidden="true">
            <span className="between-hero__side-line" />
            <p>From Mysuru to Generations</p>
            <span className="between-hero__lotus">
              <LotusMark />
            </span>
          </div>

          <div className="between-hero__shot" aria-hidden="true">
            <span>01 — 04</span>
            <em>At the loom</em>
          </div>
        </figure>

        <svg
          className="between-hero__curve"
          viewBox="0 0 48 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M48 0C28 12 16 28 18 50c2 22 14 38-18 50h48V0Z" fill="currentColor" />
        </svg>

        <div className="between-hero__panel">
          <div className="between-hero__panel-art" aria-hidden="true">
            <Image
              src="/mysore-palace-lineart.png?v=5"
              alt=""
              width={1280}
              height={720}
              className="between-hero__palace-img"
              unoptimized
            />
            <Image
              src="/mysore-jasmine-botanical.png?v=4"
              alt=""
              width={1152}
              height={864}
              className="between-hero__jasmine-img"
              unoptimized
            />
          </div>

          <div className="between-hero__panel-inner">
            <div className="between-hero__panel-nav">
              <nav aria-label="Heritage chapters">
                {PANEL_NAV.map((item, index) => (
                  <span key={item.href} className="between-hero__nav-item">
                    {index > 0 ? <i aria-hidden="true">|</i> : null}
                    <Link href={item.href}>{item.label}</Link>
                  </span>
                ))}
              </nav>
              <button
                type="button"
                className="between-hero__menu"
                aria-label={menuOpen ? "Close panel menu" : "Open panel menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>

            {menuOpen ? (
              <div className="between-hero__panel-drawer">
                {PANEL_NAV.map((item) => (
                  <Link key={`d-${item.href}`} href={item.href} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}

            <div className="between-hero__main">
              <div className="between-hero__crest-wrap">
                <span>Estd</span>
                <span className="between-hero__crest-img-wrap">
                  <Image
                    src="/heritage-crest-gold.png"
                    alt=""
                    width={160}
                    height={160}
                    className="between-hero__crest-img"
                  />
                </span>
                <span>1912</span>
              </div>

              <p className="between-hero__eyebrow">The Art of Mysore Silk</p>
              <h2 className="between-hero__title">
                A Legacy Woven
                <br />
                Since 1912
              </h2>
              <div className="between-hero__rule" aria-hidden="true">
                <i />
                <span className="between-hero__rule-lotus">
                  <LotusMark />
                </span>
                <i />
              </div>
              <p className="between-hero__lead">
                Mysore Silk is a timeless legacy of royal heritage — woven in Mysuru with pure
                mulberry silk and antique-gold zari, made to be worn and passed down.
              </p>
              <Link className="between-hero__cta between-hero__cta--btn" href="/story">
                Discover our story <span aria-hidden="true">→</span>
              </Link>
            </div>

            <ul className="between-hero__marks">
              <li>
                <span className="between-hero__mark">
                  <MarkIcon type="silk" />
                </span>
                <span>
                  Pure
                  <br />
                  Mulberry Silk
                </span>
              </li>
              <li>
                <span className="between-hero__mark">
                  <MarkIcon type="zari" />
                </span>
                <span>
                  Antique
                  <br />
                  Gold Zari
                </span>
              </li>
              <li>
                <span className="between-hero__mark">
                  <MarkIcon type="mysuru" />
                </span>
                <span>
                  Woven in
                  <br />
                  Mysuru
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
