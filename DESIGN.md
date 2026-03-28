# Design System: The Ethereal Aesthetic

## 1. Overview & Creative North Star
**Creative North Star: "The Translucent Atelier"**

This design system rejects the rigid, boxy constraints of traditional mobile apps in favor of a fluid, editorial experience that feels like flipping through a high-end fashion monograph. We are moving beyond "Standard Minimalism" into "Atmospheric Luxury." 

To break the "template" look, we utilize **intentional asymmetry** (e.g., staggering image heights in a gallery) and **tonal depth**. The UI should not feel like a flat screen, but like layers of frosted silk and polished quartz. By leveraging glassmorphism and exaggerated typography scales, we create an environment that feels breathable, premium, and calm—essential for a high-end beauty salon.

---

## 2. Colors & Surface Architecture
Our palette is a study in light and soft warmth. It relies on the interplay between `primary_container` (#F7CAC9) and the various `surface` tiers to create a sense of expensive space.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Content boundaries must be defined solely through background color shifts.
*   *Example:* A service description in `surface_container_low` should sit directly on a `background` (#f9f9f9) floor. The change in tone is the boundary.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked materials.
*   **Base:** `surface` (#f9f9f9)
*   **The Lift:** Use `surface_container_lowest` (#ffffff) for primary cards to create a "natural glow" effect.
*   **The Depth:** Use `surface_container_highest` (#e2e2e2) only for recessed elements like input fields or search bars to give them a "carved" feel.

### The "Glass & Gradient" Rule
To achieve the signature beauty look, use Glassmorphism for floating navigation bars and modal overlays.
*   **Specs:** Background: `surface` at 60% opacity | Backdrop-filter: `blur(10px)`.
*   **Signature Textures:** For main Call-to-Actions (CTAs), apply a subtle linear gradient from `primary` (#785655) to `primary_container` (#f7cac9) at a 135-degree angle. This adds a "silk-sheen" finish that flat hex codes cannot replicate.

---

## 3. Typography
The typographic voice is "Authoritative Grace." We pair a timeless serif with a modern, high-legibility sans-serif.

*   **Display & Headlines (`notoSerif`):** Use for service names and editorial quotes. The high contrast of Noto Serif conveys luxury. Use `display-lg` for hero titles with `letter-spacing: -0.02em` to feel tighter and more bespoke.
*   **Body & Labels (`plusJakartaSans`):** Use for descriptions and navigation. Plus Jakarta Sans provides a clean, contemporary counterpoint to the serif headings.
*   **The Hierarchy Rule:** Never use two different font weights in the same color if they are adjacent. If a `title-md` is `on_surface`, the `body-md` below it should be `on_surface_variant` to create a sophisticated tonal hierarchy.

---

## 4. Elevation & Depth
In this design system, shadows are an atmosphere, not a structure.

### The Layering Principle
Avoid shadows for standard cards. Instead, stack `surface_container_lowest` (#ffffff) on top of `surface_container` (#eeeeee). This "Tonal Layering" creates a soft, organic lift that feels more modern than traditional drop shadows.

### Ambient Shadows
When an element must float (e.g., a "Book Now" floating action button):
*   **Blur:** 40px to 60px.
*   **Opacity:** 4%–6% of `on_surface`.
*   **Color Tint:** Use a soft tint of the `primary` color for the shadow instead of pure black to maintain the "Rose Quartz" warmth.

### The "Ghost Border" Fallback
If contrast testing requires a container edge, use a **Ghost Border**: 
*   **Stroke:** 1px
*   **Color:** `outline_variant` at 15% opacity. 
*   **Constraint:** Never use 100% opaque outlines.

---

## 5. Components

### Buttons
*   **Primary:** Gradient (Primary to Primary-Container), `rounded-xl` (3rem), `title-sm` typography.
*   **Secondary:** Glassmorphic background (Surface @ 20% opacity) with a `Ghost Border`.
*   **Interaction:** On tap, scale the button to 96% rather than changing color. This mimics a physical "press" into a soft surface.

### Input Fields
*   **Style:** `surface_container_highest` background, no border, `rounded-md` (1.5rem). 
*   **Active State:** Transition background to `primary_fixed` (#ffdad9) with a 2px "Ghost Border" of `primary`.

### Cards & Lists
*   **The Divider Ban:** Strictly forbid the use of horizontal divider lines. Use `spacing-6` (2rem) of vertical white space or a subtle shift from `surface` to `surface_container_low` to separate items.
*   **Imagery:** All images must use `rounded-lg` (2rem) to match the soft aesthetic of the system.

### Specialized Beauty Components
*   **Treatment Chips:** Use `secondary_container` with `label-md` text. The pill shape should be `rounded-full`.
*   **Floating Booking Bar:** A glassmorphic bar docked to the bottom of the screen using `backdrop-filter: blur(20px)` and a `surface_lowest` fill at 70% opacity.

---

## 6. Do's and Don'ts

### Do
*   **Use Asymmetry:** Stagger image grids to create an editorial, magazine-like feel.
*   **Embrace White Space:** If you think there is enough space, add 20% more. Premium feels "expensive" because it isn't crowded.
*   **Color Nuance:** Use `on_surface_variant` for secondary text to keep the interface soft; pure black (#000000) is forbidden.

### Don't
*   **Don't use 90° corners:** Every element must have at least a `rounded-sm` (0.5rem) radius; however, primary containers must stay at `rounded-xl` (3rem) or higher.
*   **Don't use "Heavy" Shadows:** If the shadow is clearly visible as a dark shape, it is too heavy. It should feel like a soft glow.
*   **Don't use standard icons:** Use high-stroke-weight, rounded-terminal icons. Sharp, thin icons will clash with the soft typography and radius.