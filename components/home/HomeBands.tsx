import Image from "next/image";
import Link from "next/link";

export function CloseBand() {
  return (
    <section className="story-banner" aria-label="A part of your story">
      <div className="story-banner__inner">
        <div className="story-banner__copy">
          <p className="story-banner__eyebrow">
            <span aria-hidden="true" />
            More than a saree
          </p>
          <h2 className="story-banner__title">
            A Part of
            <br />
            Your Story
          </h2>
          <div className="story-banner__rule" aria-hidden="true" />
          <p className="story-banner__lead">
            From weddings to milestones, Mysore silk has always been a part of
            life&apos;s most cherished moments. It&apos;s not just a saree,
            it&apos;s an emotion, a tradition and a legacy you carry forward.
          </p>
          <Link className="story-banner__cta" href="/journal/stories">
            Our Stories <span aria-hidden="true">→</span>
          </Link>
        </div>

        <figure className="story-banner__media">
          <Image
            src="/story-banner-silk.jpg?v=1"
            alt="Deep maroon Mysore silk saree with a gold zari border"
            fill
            sizes="(max-width: 900px) 100vw, 58vw"
            className="story-banner__img"
            priority={false}
          />
        </figure>
      </div>
    </section>
  );
}
