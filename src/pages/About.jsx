import { ScrollReveal, FadeIn, StaggerContainer, StaggerItem } from "../components/AnimationWrappers";
import { ShieldCheck, ChefHat, Wheat, UtensilsCrossed, Cake, Heart } from "lucide-react";

function About() {
  return (
    <div className="about-page-wrapper">
      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero__image-wrapper">
          <img
            src="/images/home/thumbnail_slider (2).jpg"
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

      {/* MAIN CONTENT */}
      <section className="section">
        <div className="section__inner about-page">
          <div className="about-content">
            {/* LEFT: Text Content */}
            <div className="about-content__text">
              <ScrollReveal>
                <p className="section__text">
                  For over three generations, Grodzinski Bakery has been a cornerstone of
                  Toronto's Jewish community — a place where tradition meets quality, and
                  where every loaf, challah, and pastry is baked with pride and care.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <p className="section__text">
                  What began as a small neighbourhood bakery has grown into a beloved institution
                  across the Greater Toronto Area. From the earliest morning hours, our bakers
                  arrive to knead dough, braid challahs, and hand-roll pastries using recipes
                  that have been passed down through our family for generations. We believe in
                  doing things the right way: fresh ingredients, traditional European techniques,
                  and absolutely no artificial preservatives.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <p className="section__text">
                  Our commitment to quality extends beyond our recipes. Grodzinski Bakery is
                  proudly certified as a 100% peanut- and tree-nut-free facility. We understand
                  how important allergen safety is for families, schools, and community events —
                  which is why we've made this commitment a foundational part of who we are.
                  Every product we bake is safe for those with nut allergies, giving families
                  complete peace of mind.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="section__text">
                  We specialize in traditional Jewish baking: from fresh Shabbat challahs to
                  holiday round challahs, from seven-layer cakes for simchas to everyday breads
                  for your table. Our selection includes dairy, pareve, vegetarian, and vegan
                  options, ensuring that everyone can find something delicious. Whether you're
                  preparing for a milestone celebration, hosting a community event, or simply
                  picking up your weekly challah, we're honoured to be part of your tradition.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <p className="section__text">
                  At Grodzinski, we don't just bake bread — we bake memories. Every braided
                  challah reminds families of Shabbat dinners together. Every birthday cake
                  marks a milestone. Every rugelach brings back the flavours of childhood.
                  We're grateful to serve this community, and we look forward to being part
                  of your family's table for generations to come.
                </p>
              </ScrollReveal>
            </div>

            {/* RIGHT: Image Gallery */}
            <div className="about-content__images">
              {[
                { src: "/images/home/thumbnail_challahs.jpg", alt: "Fresh challahs at Grodzinski Bakery", caption: "Fresh challahs, baked daily" },
                { src: "/images/home/thumbnail_cakes.jpg", alt: "Celebration cakes", caption: "Celebration cakes for every occasion" },
                { src: "/images/home/thumbnail_cookies.jpg", alt: "Handcrafted cookies", caption: "Handcrafted cookies and pastries" },
              ].map((img, i) => (
                <ScrollReveal key={i} direction="right" delay={i * 0.12}>
                  <div className="about-image-card">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="about-image-card__img"
                    />
                    <p className="about-image-card__caption">{img.caption}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* WHY CHOOSE US SECTION */}
          <div className="about-features">
            <ScrollReveal>
              <h2>Why Choose Grodzinski?</h2>
            </ScrollReveal>
            <StaggerContainer className="about-features__grid" staggerDelay={0.1}>
              {[
                { icon: <ShieldCheck size={28} />, title: "100% Nut-Free Facility", desc: "Complete allergen safety for families, schools, and anyone with nut allergies." },
                { icon: <ChefHat size={28} />, title: "Traditional Recipes", desc: "European recipes passed down through generations, made with care and expertise." },
                { icon: <Wheat size={28} />, title: "Fresh Daily", desc: "No artificial preservatives — everything is baked fresh every single day." },
                { icon: <UtensilsCrossed size={28} />, title: "Dietary Options", desc: "Full range of options: dairy, pareve, vegetarian, and vegan products available." },
                { icon: <Cake size={28} />, title: "Custom Orders", desc: "Custom cakes and catering for events of all sizes — from intimate to grand." },
                { icon: <Heart size={28} />, title: "Community Focus", desc: "Serving the Toronto Jewish community with warmth and dedication since day one." },
              ].map((feature, i) => (
                <StaggerItem key={i}>
                  <div className="about-feature-card">
                    <div className="about-feature-card__icon">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
