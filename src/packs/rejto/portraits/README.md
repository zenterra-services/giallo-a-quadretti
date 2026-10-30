# Painted character pieces

This folder holds the optional raster portraits for the Rejtő pack.

```
portraits/
  full/<slug>.webp   full-body, transparent, for cards/hub
  head/<slug>.webp   head-and-shoulders crop, for the board and tool strip
```

Add an entry for every character you supply in [`../portraits.json`](../portraits.json):

```json
{
  "Piszkos Fred": {
    "full": "portraits/full/piszkos-fred.webp",
    "head": "portraits/head/piszkos-fred.webp",
    "credit": "Artist / licence"
  }
}
```

The pack falls back to the procedural SVG portrait for any character without an entry, so you can adopt pieces incrementally. `build.py` copies the images to `site/rejto/portraits/` and `--check` verifies they are current.

## Technical spec

- **Full body:** 1024 × 1536 px, transparent background, character fills the frame from hat to shoes, 3/4 view, no cast shadow, no frame, no text.
- **Head crop:** 512 × 512 px, face centred, chin and a little shoulder visible, transparent or simple flat background.
- **Format:** WebP (preferred) or PNG.
- **Consistency:** same palette, light direction, line weight and caricature scale for all fourteen. Keep one character per file.

The character brief and ready-to-use prompts are in [`../CHARACTERS.md`](../CHARACTERS.md).

Do not commit images you do not own or have permission to use.
