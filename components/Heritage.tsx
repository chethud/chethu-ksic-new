import Image from "next/image";
import Link from "next/link";

function HeritageLotusMark() {
  return (
    <svg className="heritage__lotus" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M14 23c-2.4-4.6-7-7-9.5-7 3.5-1.2 5.8-3.5 7-7 1.2 3.5 3.5 5.8 7 7-2.5 0-7.1 2.4-4.5 7Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M14 9c1.2-2.4 2.4-3.6 4.8-4.8-2.4 0-3.6 0-4.8 1.2C12.8 4.2 11.6 4.2 9.2 4.2 11.6 5.4 12.8 6.6 14 9Z"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <circle cx="14" cy="13" r="1.1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function HeritageOrnament() {
  return (
    <svg
      className="heritage__ornament"
      viewBox="0 0 220 300"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M110 250c-18-36-54-54-74-54 28-9 46-27 55-54 9 27 27 45 55 54-20 0-56 18-36 54Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M110 98c10-20 20-30 40-40-20 0-30 0-40 10-10-10-20-10-40-10 20 10 30 20 40 40Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M70 170c12-22 28-34 40-38 12 4 28 16 40 38"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.7"
      />
      <circle cx="110" cy="140" r="3" fill="currentColor" opacity="0.35" />
      <path d="M110 118v70M92 148h36" stroke="currentColor" strokeWidth="0.7" opacity="0.45" />
    </svg>
  );
}

export default function Heritage() {
  return (
    <section className="heritage" id="heritage" aria-label="A legacy of silk">
      <figure className="heritage__image">
        <div className="media-fill">
          <Image
            src="/generations-mallige.jpg?v=1"
            alt="A rich maroon Mysore silk saree with antique-gold zari border and fresh mallige jasmine"
            fill
            sizes="(max-width: 900px) 100vw, 52vw"
            priority={false}
          />
        </div>
      </figure>

      <div className="heritage__panel">
        <div className="heritage__ornament-wrap" aria-hidden="true">
          <HeritageOrnament />
        </div>

        <div className="heritage__copy">
          <div className="heritage__eyebrow-row">
            <p className="heritage__eyebrow">A Legacy of Silk</p>
            <span className="heritage__eyebrow-rule" aria-hidden="true" />
            <HeritageLotusMark />
          </div>

          <h2 className="heritage__title">
            Woven since 1912.
            <br />
            Treasured for generations.
          </h2>

          <p className="heritage__lead">
            From Mysuru’s silk looms to heirlooms at home, every thread carries a
            legacy of pure silk and gold zari.
          </p>

          <Link className="heritage__cta" href="/heritage">
            Discover Our Story <span aria-hidden="true">→</span>
          </Link>
        </div>

        <figure className="heritage__loom">
          <div className="heritage__loom-frame">
            <div className="media-fill">
              <Image
                src="/powerloom-factory.jpg"
                alt="Traditional silk mill with power looms weaving Mysore silk"
                fill
                sizes="(max-width: 900px) 90vw, 40vw"
              />
            </div>
          </div>
          <figcaption className="heritage__caption">
            <span className="heritage__caption-rule" aria-hidden="true" />
            The Art of Mysuru Silk
            <span className="heritage__caption-rule" aria-hidden="true" />
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
