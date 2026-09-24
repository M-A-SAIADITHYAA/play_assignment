---
name: airbnb-design-tokens
description: Specification for Airbnb brand tokens, layout metrics, colors, typography, and component styling.
---

# Airbnb Design Tokens Skill

This skill enforces strict adherence to Airbnb design standards across all frontend components.

## 1. Color Palette
* **Primary Brand Accent**: `#ff385c` (Rausch / Coral Red)
* **Gradient Brand CTA**: `linear-gradient(to right, #e61e4d, #e31c5f, #d70466)`
* **Primary Foreground**: `#222222` (Charcoal Black)
* **Secondary Foreground**: `#717171` / `#6a6a6a` (Medium Gray)
* **Background**: `#ffffff` (Pure White)
* **Muted Surfaces**: `#f7f7f7` (Off-white / card highlights)
* **Borders & Dividers**: `#dddddd` (Card borders), `#ebebeb` (Section dividers)

## 2. Typography
* **Font Family**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
* **Listing Title**: `text-2xl md:text-[26px] font-bold text-[#222222] tracking-tight`
* **Section Headings**: `text-xl md:text-2xl font-semibold text-[#222222]`
* **Body Text**: `text-base text-[#222222] leading-relaxed`
* **Captions & Metadata**: `text-sm text-[#717171]`

## 3. Layout Dimensions
* **Main Container**: `max-w-[1120px] mx-auto px-6 lg:px-0`
* **Two-Column Split**: `grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16`
* **Hero Photo Grid**: `h-[420px] rounded-2xl overflow-hidden grid grid-cols-4 gap-2`
* **Sticky Navigation**: `h-20 border-b border-[#ebebeb] fixed top-0 left-0 right-0 z-40 bg-white`

## 4. Animation Guidelines
* **Image Hover**: `transition-all duration-300 group-hover:scale-105 group-hover:brightness-90`
* **Button Active**: `transition-transform duration-100 active:scale-[0.98]`
* **Modal Transitions**: Framer Motion `initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}`
