import Image from "next/image";
import Link from "next/link";

const occasions = [
  {
    title: "Sarees",
    copy: "Mysore silk, woven for every occasion.",
    image: "/cat-sarees-royal.jpg?v=1",
    alt: "Woman in a peacock-blue Mysore silk saree with gold zari border",
    href: "/sarees",
    face: true,
    feature: true,
  },
  {
    title: "Men's",
    copy: "Silk shirts, kurtas, and ties from the house.",
    image: "/cat-mens-royal.jpg?v=1",
    alt: "Ivory Mysore silk kurta with emerald and gold zari stole",
    href: "/collections/mens",
    face: true,
  },
  {
    title: "Gifts",
    copy: "Silk to give, and to keep.",
    image: "/cat-gifts-royal.jpg?v=1",
    alt: "Folded Mysore silk sarees in a rosewood gifting chest",
    href: "/collections/gifts",
  },
];

export default function Categories() {
  const feature = occasions.find((c) => c.feature)!;
  const rest = occasions.filter((c) => !c.feature);

  return (
    <section
      className="categories categories--split"
      id="categories"
      aria-label="Shop by collection"
    >
      <div className="categories__layout">
        <Link
          className={
            feature.face ? "cat cat--feature cat--face" : "cat cat--feature"
          }
          href={feature.href}
        >
          <div className="media-fill">
            <Image
              src={feature.image}
              alt={feature.alt}
              fill
              sizes="(max-width: 900px) 100vw, 57vw"
              priority
            />
          </div>
          <div className="cat__copy">
            <span className="cat__index" aria-hidden="true">
              01
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.copy}</p>
            <span className="cat__cta">
              Explore collection <span aria-hidden="true">→</span>
            </span>
          </div>
        </Link>

        <div className="categories__stack">
          {rest.map((cat, i) => (
            <Link
              key={cat.title}
              className={
                cat.face ? "cat cat--compact cat--face" : "cat cat--compact"
              }
              href={cat.href}
            >
              <div className="media-fill">
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 43vw"
                />
              </div>
              <div className="cat__copy">
                <span className="cat__index" aria-hidden="true">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <h3>{cat.title}</h3>
                <p>{cat.copy}</p>
                <span className="cat__cta">
                  Explore collection <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
