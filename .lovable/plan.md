

# 🌹 Bloomcraft — Custom Flower Bouquet Creator & Sharing App

## Vision
A luxury Valentine-themed single-page app where users handpick illustrated flowers, compose a love note, and share a beautiful bouquet via a unique encoded link. The recipient gets an immersive "gift unwrapping" experience — no backend needed.

---

## Design Identity

- **Palette**: Deep burgundy, soft rose pink, champagne gold, ivory/cream, charcoal
- **Typography**: Cormorant Garamond (elegant serif headings) + Poppins (clean body text)
- **Aesthetic**: Minimalist luxury florist — glassmorphism cards, generous whitespace, soft shadows, subtle grain texture overlay
- **Background**: Cream gradient with floating rose petal particle animations
- **Motion**: Framer Motion throughout — fade-in-up reveals, scale selections, floating bouquet, petal burst celebrations

---

## Feature 1: Hero & Welcome (Creator View — Step 1)

- Grand serif heading: *"Craft a Bouquet for Someone Special"* with staggered fade-in
- Romantic subtext and a gold-shimmer "Start Creating" CTA button
- Soft gradient background with floating petal particles
- Smooth scroll to the flower picker on click

## Feature 2: Flower Picker (Step 2)

- 12 illustrated flower cards (Red Rose, Pink Tulip, White Lily, Sunflower, Lavender, Peony, Daisy, Orchid, Chrysanthemum, Carnation, Hydrangea, Cherry Blossom)
- Each card: custom SVG illustration, flower name, color dot indicator
- Hover: lift + shadow. Select: gold border + checkmark badge + scale pop
- Counter showing "X / 6 selected" — toast notification if exceeding limit
- Responsive grid: 2 cols mobile, 3-4 tablet, 4-6 desktop
- "Next" button animates in after first selection

## Feature 3: Live Bouquet Preview (Step 3)

- Dynamic bouquet composition: selected flowers arranged in a fan/cluster above an illustrated wrapper/vase SVG
- Each flower slightly rotated and offset for natural look
- Gentle floating/bobbing animation on the whole bouquet
- Empty state: elegant empty vase with invitation text
- Flower name chips below with "×" to remove
- Clicking a flower in the bouquet also removes it

## Feature 4: Love Note Composer (Step 4)

- Styled textarea resembling a paper card/letter with subtle texture
- Placeholder: *"Write something from your heart..."*
- Live character counter (max 300)
- Gold-accented focus border
- Optional "From" and "To" name fields

## Feature 5: Generate & Share (Step 5)

- Final gift card preview: bouquet + message + names in elegant layout
- "Create Shareable Link ✨" button encodes all data as base64 in the URL (no backend)
- Generated link displayed in a styled input with "Copy Link" button
- Share buttons: WhatsApp, Twitter/X, and Web Share API
- Celebration animation on generation: confetti/petal burst

## Feature 6: Receiver Experience (Route: /bouquet)

- Parse base64-encoded data from URL
- Cinematic reveal sequence:
  1. Anticipation screen: *"Someone sent you something special..."* with pulsing heart (2-3s)
  2. Bouquet scales in dramatically with petal burst effect
  3. Message revealed with elegant typewriter/fade effect on a handwritten-style card
  4. Sender name fades in
- Deeper romantic background with more petals and sparkle effects
- "Create your own bouquet" CTA linking back to creator
- Fully immersive on mobile

## Feature 7: Polish & Micro-interactions

- Gold glow hover effects on all buttons
- Smooth scroll between sections
- Subtle grain/noise texture overlay for luxury feel
- localStorage save for work-in-progress bouquets
- Footer: *"Made with 🌹 by Bloomcraft"*
- Fully responsive across mobile, tablet, and desktop

