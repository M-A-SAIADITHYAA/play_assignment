---
name: accessibility-checker
description: Accessibility and focus management guidelines for interactive modals, lightboxes, and keyboard navigation.
---

# Accessibility & Focus Management Skill

This skill provides verification criteria for WAI-ARIA compliance, focus trapping, and keyboard controls.

## 1. Dialog & Modal Standards
* **Roles**: All overlay modals must declare `role="dialog"` and `aria-modal="true"`.
* **Accessible Name**: Modals must feature an explicit `aria-label` or `aria-labelledby`.
* **Background Scroll Lock**: Whenever a modal opens, `document.body.style.overflow = "hidden"` must be set, and restored to `"unset"` upon unmounting.
* **Return of Focus**: Upon dialog dismissal, focus must be returned to the element that triggered the modal (`previousActiveElement.current?.focus()`).

## 2. Keyboard Navigation
* **Escape Key**: Pressing `Escape` must close the top-level open modal or lightbox.
* **Arrow Keys**: The Lightbox single-photo viewer must support `ArrowLeft` for previous photo and `ArrowRight` for next photo.
* **Focus Trapping**: Tab navigation (`Tab` and `Shift + Tab`) must cycle strictly through focusable elements within the active dialog.

## 3. Form & Interactive Element Standards
* **Screen Reader Labels**: Icon-only buttons must declare an `aria-label` (e.g. `"Back to photo tour grid"`, `"Close photo viewer"`, `"Next photo"`).
* **Focus Rings**: Interactive buttons must render visible focus rings (`focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff385c]`).
