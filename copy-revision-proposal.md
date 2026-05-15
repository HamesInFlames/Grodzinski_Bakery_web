# Heritage copy proposal — About page

**Status:** PROPOSAL — not merged. Awaits sign-off from Chris and Carolina
before the changes below are applied to `src/pages/About.jsx`.

**Context:** The site's heritage copy currently implies the bakery has been
passed down through "three generations" of a single family. Per Kim
Consultant's strategy call, the original owners aren't related to Chris and
Carolina, so claims of family lineage are not supportable. The institution
itself — the Grodzinski Bakery name and recipes — has the 1888 heritage,
but the people running it today are stewards, not descendants.

The rule:

| ❌ Avoid (implies lineage) | ✅ Use (institution-led heritage) |
|---|---|
| "Three generations of" | (remove entirely) |
| "Family bakers since 1888" | "Baking since 1888" |
| "family-run" | "heritage" |
| "our family's recipes" | "traditional recipes" |
| "passed down through generations" | "rooted in over a century of baking tradition" |

---

## Proposed edits to `src/pages/About.jsx`

### Hero subtitle (line 23)

**Current:**
> Three generations of tradition, quality, and community — baked fresh every day.

**Proposed:**
> Over a century of tradition, quality, and community — baked fresh every day.

### Main body, paragraph 1 (lines 36-40)

**Current:**
> For over three generations, Grodzinski Bakery has been a cornerstone of
> Toronto's Jewish community — a place where tradition meets quality, and
> where every loaf, challah, and pastry is baked with pride and care.

**Proposed:**
> Since 1888, Grodzinski Bakery has been a cornerstone of Toronto's Jewish
> community — a place where tradition meets quality, and where every loaf,
> challah, and pastry is baked with pride and care.

### Main body, paragraph 2 (lines 44-51)

**Current:**
> What began as a small neighbourhood bakery has grown into a beloved
> institution across the Greater Toronto Area. From the earliest morning
> hours, our bakers arrive to knead dough, braid challahs, and hand-roll
> pastries using recipes that have been passed down through our family
> for generations. We believe in doing things the right way: fresh
> ingredients, traditional European techniques, and absolutely no artificial
> preservatives.

**Proposed:**
> What began as a small neighbourhood bakery has grown into a beloved
> institution across the Greater Toronto Area. From the earliest morning
> hours, our bakers arrive to knead dough, braid challahs, and hand-roll
> pastries using traditional recipes rooted in over a century of European
> Jewish baking. We believe in doing things the right way: fresh ingredients,
> time-honoured techniques, and absolutely no artificial preservatives.

### Main body, paragraph 5 (lines 78-83)

**Current:**
> At Grodzinski, we don't just bake bread — we bake memories. Every braided
> challah reminds families of Shabbat dinners together. Every birthday cake
> marks a milestone. Every rugelach brings back the flavours of childhood.
> We're grateful to serve this community, and we look forward to being part
> of your family's table for generations to come.

**Proposed:**
> At Grodzinski, we don't just bake bread — we bake memories. Every braided
> challah reminds families of Shabbat dinners together. Every birthday cake
> marks a milestone. Every rugelach brings back the flavours of childhood.
> We're grateful to serve this community, and we look forward to being part
> of your table for many years to come.

### "Why choose us" feature card (line 117)

**Current:** `desc: "European recipes passed down through generations, made with care and expertise."`

**Proposed:** `desc: "Traditional European recipes refined over more than a century, made with care and expertise."`

---

## Other heritage-language spots already updated (for reference)

| location | old → new |
|---|---|
| `src/pages/Home.jsx` hero subtitle | "Three generations of handcrafted breads…" → "Handcrafted breads, challahs, cakes, and pastries — baked daily in our 100% nut-free facility. Toronto's heritage kosher bakery." |
| `src/pages/Home.jsx` features → "Since 1888" desc | "Family tradition for generations" → "A baking tradition over a century in the making" |
| `src/pages/Home.jsx` home-about block | "just as we've done for generations" → "just as the bakery has done since 1888"; "recipes passed down through our family" → "traditional recipes rooted in over a century of baking" |
| `src/routes/MenuHub.tsx` trust line | "Family bakers since 1888" → "Toronto's heritage kosher bakery" |

---

## Untouched (correct as-is)

- `src/components/Footer.jsx`: "Toronto's favourite kosher bakery since 1888" — institution-led, no claim of lineage.
- `src/routes/ProductPage.tsx`: "From our {category.name} collection · Bakers since 1888" — institution-led.

---

## Sign-off

Once Chris and Carolina approve, apply the four proposed edits above to
`src/pages/About.jsx` and delete this file (or move it under
`docs/archive/`).
