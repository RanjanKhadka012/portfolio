# Ranjan Khadka — Research Portfolio

A portfolio for graduate schools and future employers, opening with a portrait and brief introduction before the research. The cinematic dark design uses original research illustrations, large system typography, and restrained motion inspired by the supplied Apple reference.

## Run locally

Requires Node.js 22 or newer (the implementation was verified on Node 22.17.1).

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, normally http://localhost:3000. The development server binds to loopback and does not automatically open a browser.

```sh
npm run build
npm run preview
```

The production build is written to `dist/`. The build preview normally uses http://localhost:4173. The Vite base is relative so assets work under a hosting subdirectory.

## Content

- Adverse-weather and low-light object detection/classification: car, person, truck, bus, bicycle, and road signs. Ongoing undergraduate research.
- Aerial parking prototype: YOLO11n, ByteTrack, stationary-state analysis, and polygon rules. The unpublished manuscript's reported 0.757 mAP@0.5 concerns **vehicle detection**, evaluated on 31 validation images after training on 123 images. Parking-alert validation is separately qualified.
- UMC-Green, ARIA (design in progress), Alignt, and 11Bunkers.
- Education, experience, teaching, honors, leadership, and community service grounded in the supplied Academic CV.
- Email, GitHub, LinkedIn, and a downloadable copy of the supplied Academic CV.

## Source files

- `index.html`: semantic content, navigation, metadata, and local asset references.
- `src/style.css`: visual system, responsive layouts, keyboard focus states, and reduced-motion styles.
- `src/main.js`: progressive reveals, subtle scene movement, reading progress, and accessible mobile navigation.
- `public/images/`: optimized WebP illustrations, photographs, and project screenshots.
- `public/Ranjan_Khadka_Academic_CV.pdf`: supplied academic CV, unchanged.
- `docs/research-image-provenance.md`: image sources, attribution, dimensions, and prompt reference.

Generated visuals are labeled as research illustrations; they are not experimental frames, model predictions, or evidence of measured performance. The real team photo is credited to the [official Southwest MN Hacks Fall 2026 recap](https://www.southwestmnhacks.org/events/fall-2026).

## Accessibility and motion

The page uses semantic landmarks, a skip link, visible keyboard focus, descriptive image text, native expandable research notes, and a mobile menu with Escape handling. Content and navigation remain available without JavaScript. Device reduced-motion preference is respected by default. A visitor can explicitly choose Play animations or Pause animations for this site, and Replay intro restarts the entrance. The site preference is stored locally when storage is available; no device setting is changed. Normal scrolling is never intercepted.

## Verification and publication

Verify changes with `npm run build`, `node --check src/main.js`, `npm audit`, and local page/asset checks. This repository has no automated test suite. During this build, browser automation was unavailable because Windows browser URL-policy enforcement was unsupported; source, production-build, image-decoding, and HTTP checks do not substitute for a final visual check on the user's device.

The approved workflow is local review before GitHub publication. No deployment or push is triggered by the development commands above.
