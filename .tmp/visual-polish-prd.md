# Portfolio Visual Polish — PRD and Change Plan

## PRD: What and why

**Goal.** Give the portfolio a more refined visual finish that reflects work in AI and cloud infrastructure while keeping its warm, personal character. The change should be felt in the quality of the surfaces, typography, and interactions, not in new content or page structure.

**Visual direction.** Use light, depth, and restrained motion to suggest precision. Teal carries the technical accent; coral remains a selective human accent. Ivory and deep navy remain the foundation. Effects should look intentional at normal viewing size, not like a layer of decoration placed over the site.

**Problem.** The site already has a distinctive palette, expressive type, and clear content. Many cards currently share the same broad soft shadow, so the hero and featured work do not feel much more important than supporting content. The visual language could communicate more craft and technical confidence without changing what the site says.

**What changes.** Focus on the home page hero, featured project cards, and their immediate controls:

1. **Light:** add a fine directional highlight to featured surfaces and a small number of static glints near the hero. Glints are decorative and never cover text or photos.
2. **Depth:** use a tighter base shadow and a subtle inner edge highlight on featured cards. Reserve the stronger lifted shadow for hover and keyboard focus.
3. **Type:** retain the existing font families. Refine spacing and contrast in the hero role line and section headings; test a very shallow embossed treatment on the role line only. Keep the name over the photograph and all body copy easy to read.
4. **Motion:** use short CSS transitions for card lift and highlight changes. Motion occurs only in response to interaction; reduced-motion users get an immediate state change.

**Boundaries.** No copy, information architecture, photography, palette, font package, or navigation changes. No continuous sparkle animation, heavy effects library, or effects that obscure content. All treatments must work in light, dark, and classic themes and on narrow mobile screens.

**Success criteria.** The hero and featured work feel more visually prominent; text remains legible; interactive elements retain clear hover and keyboard-focus states; no horizontal overflow or noticeable layout shift is introduced. Decorative glints are hidden from assistive technology. Reduced-motion settings disable movement while preserving state feedback.

## Implementation plan: Exactly what I would change

1. **Create a small set of CSS effect tokens in `src/app/globals.css`.** Define theme-aware colors for edge light, inner highlight, and focused shadow. Keep the current global shadow tokens for surfaces outside this pass.
2. **Polish the hero in `src/app/page.tsx` and `src/app/globals.css`.** Add a restrained highlight to the hero frame and two or three small, static CSS glints outside the text and portrait areas. Adjust the role line's spacing and apply the shallow embossed effect there; preserve the name's existing legibility over the photo.
3. **Polish featured project cards in `src/app/page.tsx` and `src/app/globals.css`.** Give those cards a fine teal edge light and inner highlight, then a small lift and stronger shadow on hover or keyboard focus. Supporting experience cards keep their quieter treatment.
4. **Tune nearby controls and headings.** Make the featured-project expand control use the same highlight language. Refine section-heading spacing without changing font families or sizes across the site.
5. **Verify the result.** Run the production build and diff checks. Review the CSS for reduced-motion behavior, focus visibility, contrast, and theme coverage. Browser visual review at desktop, standard mobile, and narrow mobile is a separate step only if requested.

Implement these as one scoped pass after this document is reviewed; assess the hero and featured cards together before extending the treatment elsewhere.
