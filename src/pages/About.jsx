import { ScrollReveal, FadeIn } from "../components/AnimationWrappers";
import { PhotoSlideshow } from "../components/PhotoSlideshow";
import {
  HERITAGE_PHOTOS,
  CELEBRATION_PHOTOS,
  FAMILY_PHOTOS,
} from "../data/slideshowPhotos";

function About() {
  return (
    <div className="about-page-wrapper">
      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero__image-wrapper">
          <img
            src="/images/home/thumbnail_slider (2).png"
            alt="Grodzinski Bakery - Traditional baking"
            className="about-hero__image"
          />
          <div className="about-hero__overlay"></div>
        </div>
        <div className="about-hero__content">
          <FadeIn delay={0.2}>
            <h1>About Grodzinski Bakery</h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="about-hero__subtitle">
              Three generations of tradition, quality, and community — baked fresh every day.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* STORY SECTION 1 — Heritage */}
      <section className="about-story about-story--cream">
        <div className="about-story__inner">
          <ScrollReveal direction="left">
            <div className="about-story__media">
              <PhotoSlideshow photos={HERITAGE_PHOTOS} interval={5000} />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.1}>
            <div className="about-story__body">
              <h2>A Toronto Tradition Since 1888</h2>
              <p>
                For over three generations, Grodzinski Bakery has been a cornerstone of
                Toronto's Jewish community — a place where tradition meets quality, and
                where every loaf, challah, and pastry is baked with pride and care.
              </p>
              <p>
                What began as a small neighbourhood bakery has grown into a beloved
                institution across the Greater Toronto Area. From the earliest morning
                hours, our bakers arrive to knead dough, braid challahs, and hand-roll
                pastries using recipes passed down through our family. Fresh ingredients,
                traditional European techniques, and absolutely no artificial preservatives.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* STORY SECTION 2 — Celebrations (reversed) */}
      <section className="about-story about-story--reverse">
        <div className="about-story__inner">
          <ScrollReveal direction="right">
            <div className="about-story__media">
              <PhotoSlideshow photos={CELEBRATION_PHOTOS} interval={5000} startIndex={1} />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.1}>
            <div className="about-story__body">
              <h2>Baked for Every Celebration</h2>
              <p>
                We specialize in traditional Jewish baking: from fresh Shabbat challahs
                to holiday round challahs, from seven-layer cakes for simchas to everyday
                breads for your table.
              </p>
              <p>
                Our selection includes dairy, pareve, vegetarian, and vegan options,
                ensuring that everyone can find something delicious. Whether you're
                preparing for a milestone celebration, hosting a community event, or
                simply picking up your weekly challah, we're honoured to be part of
                your tradition.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* STORY SECTION 3 — Community & Safety */}
      <section className="about-story about-story--cream">
        <div className="about-story__inner">
          <ScrollReveal direction="left">
            <div className="about-story__media">
              <PhotoSlideshow photos={FAMILY_PHOTOS} interval={5000} />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.1}>
            <div className="about-story__body">
              <h2>Safe for Every Family</h2>
              <p>
                Grodzinski Bakery is proudly certified as a 100% peanut- and
                tree-nut-free facility. We understand how important allergen safety is
                for families, schools, and community events — which is why we've made
                this commitment a foundational part of who we are.
              </p>
              <p>
                At Grodzinski, we don't just bake bread — we bake memories. Every
                braided challah reminds families of Shabbat dinners together. Every
                birthday cake marks a milestone. Every rugelach brings back the
                flavours of childhood. We're grateful to serve this community for
                generations to come.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

export default About;
