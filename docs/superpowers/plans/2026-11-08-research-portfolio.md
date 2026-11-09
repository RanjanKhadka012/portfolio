# Research Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Deliver the approved cinematic, research-first portfolio as a working local Vite website before any GitHub push.

**Architecture:** Keep Vite and semantic static HTML. Promote the approved mockup's composition into index.html, place the visual system in src/style.css, and use src/main.js only for progressive motion and responsive navigation. Research images and real photographs are local assets with explicit dimensions and source credit.

**Tech Stack:** Existing Vite, HTML, CSS, JavaScript. No new frontend dependencies.

**Spec:** docs/superpowers/specs/2026-11-08-research-portfolio-design.md

## Global Constraints

- Style A: cinematic dark presentation, large system typography, warm copper accents.
- Research precedes engineering, education, experience, honors, teaching, and service.
- Confirmed low-light classes: car, person, truck, bus, bicycle, and road signs.
- Research illustrations are labeled as generated, never as experimental output.
- Parking result: vehicle-detection mAP@0.5 = 0.757 on 31 validation images, trained on 123 aerial images using CPU-only hardware; preserve alert-validation limitations.
- Adverse-weather work is ongoing; parking manuscript is unpublished; ARIA is design in progress.
- Preserve portrait identity and credit the official Alignt team image.
- Keep text and navigation usable without JavaScript and with reduced motion.
- Local preview before GitHub; do not push in this implementation turn.

## Review Focus

- Small screens: all six classes remain available in the image and legend; navigation links are reachable.
- Reduced motion or absent observer APIs: no invisible content or animation-dependent navigation.
- Different hosting base paths: local image and CV links work with existing relative Vite base.
- Scientific claims: detection metrics cannot be mistaken for alert accuracy or low-light results.
- External links and downloads: every contact/CV action has a real destination; no simulated message success.

## File Responsibilities

- index.html: metadata, navigation, complete CV-grounded page content, accessible imagery and links.
- src/style.css: approved visual style, responsive layouts, focus states, reduced motion.
- src/main.js: menu state, optional reveal/parallax, progress indicator; no blocking content.
- public/images/: optimized copies of generated research scenes, portrait, team photo, and existing software screenshots.
- public/Ranjan_Khadka_Academic_CV.pdf: supplied academic CV.
- public/favicon.svg: existing monogram adapted to the approved palette.
- README.md: current content, local commands, verification scope, image attribution.
- docs/research-image-provenance.md: recorded image sources and references to exact generation prompts.

### Task 1: Establish the local working branch and assets

**Files:** public/images/*; public/Ranjan_Khadka_Academic_CV.pdf; docs/research-image-provenance.md.

**Interfaces:** Produces image names low-light-six-classes.webp, aerial-parking-concept.webp, portrait.webp, alignt-team.webp, umc-green.webp, eleven-bunkers.webp under public/images/. All production references use ./images/<name>. CV path is ./Ranjan_Khadka_Academic_CV.pdf.

- [x] Create an ignored isolated worktree from the approved design commit and run npm ci plus the baseline npm run build.
- [x] Copy the supplied CV and convert selected images to WebP without changing scene composition or personal identity. Keep generated-image originals in the brainstorm folder.
- [x] Inspect dimensions and verify output files exist and decode. Record source links and generation prompt provenance.

### Task 2: Build the complete research-first page

**Files:** index.html; src/style.css; public/favicon.svg.

**Interfaces:** Produces #top, #research, #parking, #work, #about, #experience, #recognition, #contact anchors. Menu hooks: #menu-toggle, #site-links; optional motion hooks: [data-reveal], [data-parallax], #reading-progress. All important content is initially visible.

- [x] Adapt the approved mockup into semantic HTML with correct metadata and local assets, remove all design-review controls and companion URLs.
- [x] Expand research with clear question/contribution/evidence, exact status and supervision, optional details for limitations, and the six-class legend.
- [x] Include all four selected software projects with exact contributions; add education, experience, teaching, honors, leadership, service, and contact from the CV.
- [x] Move and refine approved CSS into src/style.css. Provide keyboard focus states, a no-JavaScript mobile navigation fallback, responsive uncropped research scenes, and prefers-reduced-motion handling.
- [x] Run static checks for duplicate IDs, fragment destinations, local asset/CV references, alt text, six classes, and absence of prototype controls.

### Task 3: Add progressive motion and navigation

**Files:** src/main.js; src/style.css.

**Interfaces:** Consumes Task 2 hooks. Menu button controls aria-expanded and site-links. Motion runs only when appropriate APIs exist and reduced motion is not requested.

- [x] Add accessible inline mobile menu behavior: toggle, close on navigation or Escape, and safe return of focus for Escape.
- [x] Add restrained intersection reveals with a short distance and fail-open behavior; respect preference changes and keep already-seen content visible.
- [x] Add lightweight requestAnimationFrame scroll progress and a subtle desktop research-image transform; no scroll hijacking, no long pinned section, no artificial loading screen.
- [x] Check JavaScript syntax and production build. No new automated tests for reversible presentation changes or tests that duplicate markup; verify meaningful static integrity and build output instead.

### Task 4: Review, verify, and hand off localhost

**Files:** README.md; tracked implementation files above.

**Interfaces:** Finished static build in dist/ and Vite local URL at port 3000 or its actual available port.

- [x] Update README with npm ci, npm run dev, npm run build, source credits, and verification limits.
- [x] Run npm run build, source/build asset and fragment checks, node --check src/main.js, and git diff --check.
- [x] Request one fresh-context whole-change review against the approved design and resolve material findings.
- [x] Commit local changes, integrate the completed branch into the user's local checkout without pushing, and verify the merged build.
- [x] Run a retained local Vite preview with automatic browser opening disabled. Check HTTP success for the page, images, and CV, and give the user the local URL.
- [x] Report the known browser verification limit; do not attempt to bypass the Windows URL-policy restriction.

## Execution Decisions

The user approved the full local build. Use ordinary agent execution without another implementation-method approval. Independent asset preparation can run in a bounded subagent; the main page and interaction implementation stays with the coordinator. Worktree setup, local commits, and local integration are reversible implementation steps; GitHub publication remains pending local review.


## Completion Record

Implemented and integrated into the local main checkout. No GitHub push or deployment was performed. The retained Vite preview is http://127.0.0.1:3000/.

Validation: Vite 6.4.5 production build passed; JavaScript syntax passed; npm audit reports zero vulnerabilities; source and build passed asset/fragment integrity checks; six images decode with accurate dimensions; the CV matches the supplied bytes; HTTP delivery checks passed for the page and eleven local resources.

Fresh whole-change review found one material issue: mobile cover cropping of the team photograph. The image now keeps its natural aspect ratio and complete group context. No minor findings were deferred. Browser-rendered layout, actual keyboard behavior, and assistive-technology output remain for visual review because Windows browser automation was restricted.
