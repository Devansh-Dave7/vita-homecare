Add Onest font files here

To enable the Onest font locally for the Pricing page, place the font files in this folder with the exact filenames below:

- Onest-Regular.woff2  (used as weight 400)
- Onest-Medium.woff2   (used as weight 500)

If you have other formats (woff, ttf), you may also add them and update `app/globals.css` accordingly.

Notes:
- The CSS in `app/globals.css` already declares @font-face rules that load `/fonts/Onest-Regular.woff2` and `/fonts/Onest-Medium.woff2`.
- Use `font-display: swap` for faster rendering.
- After adding the files, restart the dev server if it was running to ensure Next.js picks up the new static assets.

If you want, provide the .woff2 files here and I can place them for you (if you upload them).