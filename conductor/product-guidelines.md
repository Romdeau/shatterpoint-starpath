# Product Guidelines - Shatterpoint Starpath

## Visual Aesthetic & Design Language
### Galactic Imperial ("The Blind LTD / Andor Aesthetic")
- **Core Theme:** Heavily inspired by the UI work of Blind LTD for *Andor*. The interface should feel like a piece of high-end Imperial technology—bureaucratic, utilitarian, and dangerously efficient.
- **Palette:** 
  - **Imperial Bureaucratic:** Deep emerald greens and tactical ambers on near-black backgrounds.
  - **Tactical Alerts:** Sharp Imperial reds for warnings or critical state changes.
  - **Industrial Grime:** Use subtle textures and scan-line overlays to simulate a physical CRT or datapad screen.
- **Typography:**
  - **Primary:** High-readability sans-serif (e.g., Inter, Roboto Mono) for functional data.
  - **Atmospheric:** **Aurebesh** must be used for decorative labels, ID tags, and "fluff" descriptors to ground the app in the Star Wars universe.
- **Interface:** High-density data layouts. Grid systems, technical measuring lines, and "read-out" animations that look like real-time data processing.

## Narrative & Tone
### Imperial Property
- **Ownership:** All system text must reflect that this tool is official Imperial property. 
- **Prose Style:** Cold, authoritative, and formal. Use terms like "Classified," "By Order of the Bureau of Standards," "Priority One Clearance," and "Authorized Imperial Personnel Only."
- **Contradiction Check:** Avoid mixing Resistance and Imperial terminology. If the Empire designed the device, it uses Imperial standards.

## User Experience & Interface
### Tactical Hierarchy
- **Primary Information:** Critical game stats (Health, Force, Struggle) must be immediately visible and color-coded for high-glanceability.
- **Navigation:** Layered technical views. Transitions should feel like switching frequencies or loading new data sectors.
- **Accessibility:** Ensure high contrast and large touch targets for tabletop utility.

## Implementation Details
### Aurebesh Integration
- Use `@import url('https://fonts.cdnfonts.com/css/aurebesh');` for the Aurebesh font.
- Apply `font-family: 'Aurebesh', sans-serif;` to decorative elements only, ensuring core data remains legible in basic Inter/Mono fonts.

### Legal & Community
- Maintain the disclaimer: "Starpath is a community tool. Not affiliated with Atomic Mass Games. Created for fan use only."
