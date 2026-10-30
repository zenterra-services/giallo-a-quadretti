# Rejtő cast — painted character brief

This is the brief for the fourteen **original** painted pieces. The reference sheets are not an input: do not trace, image-to-image or reproduce their faces, poses, compositions or linework. Match the *register* — ink and watercolour caricature, period wardrobe, exaggerated anatomy — with new designs.

## Shared style prompt

> Full-body 1930s Central European pulp-magazine caricature of **[…]**, original character design. Rough ink outline, transparent watercolour and gouache washes, visible paper grain, exaggerated anatomy, long limbs, expressive hands, muted sepia / oxblood / teal / mustard palette, theatrical three-quarter pose, plain transparent background, no text, no frame, no cast shadow. Elegant, slightly grotesque, never photorealistic.

**Negative prompt**

> photorealistic, anime, 3D render, flat vector, neon, glossy digital painting, text, watermark, logo, frame, busy background, cropped hat, cropped shoes, extra limbs, deformed hands, exact copy of any existing illustration, comic panel

## Technical spec

| Asset | Size | Notes |
|---|---|---|
| Full body | 1024 × 1536 | transparent, hat to shoes inside frame, 3/4 view, one character |
| Head crop | 512 × 512 | face centred, chin + a little shoulder, no hat clipping |
| Format | WebP (preferred) or PNG | transparent; no shadows |

Keep the same palette, light direction and line weight across all fourteen. Generate a few variants, pick one, and keep record of the prompt/model.

## Characters

### 1. Piszkos Fred — `piszkos-fred`
Tall, stooped, gaunt sea captain. Long nose, grey stubble, captain’s cap, shabby blue coat with misaligned buttons, frayed trousers, bottle in one hand, pipe in the other. Smirk; seen too much. Body: **tall**.

### 2. Fülig Jimmy — `fulig-jimmy`
Thin young redhead with enormous ears. White sailor cap, striped sailor shirt, neckerchief, hands in pockets, lopsided grin. Body: **thin**.

### 3. Vanek úr — `vanek-ur`
Tall, elegant con man. Sharp black suit, slick dark hair, pencil moustache, monocle, cigarette, pocket square. Relaxed, untrustworthy. Body: **tall**.

### 4. Csülök — `csulok`
Massive strongman. Red-and-cream striped tank top, tiny cap, black beard, huge fists, amused. Body: **huge**.

### 5. Senki Alfonz — `senki-alfonz`
Mysterious gentleman. Long dark hair, top hat, long green coat, red scarf, silver-handled cane, unreadable expression. Body: **normal**.

### 6. Glória — `gloria`
Femme fatale. Long yellow hair, red evening dress, gold earrings, fur stole, long cigarette holder, half-lidded smirk. Body: **normal**.

### 7. Török Szultán — `torok-szultan`
Heavy old potentate. Bald, full beard, red fez, embroidered waistcoat, sash, small globe under one arm, imperious. Body: **fat**.

### 8. Böffentő — `boffentoo`
Short, round, anxious. Bowler hat, curling moustache, tight waistcoat, hands clasped, apologetic expression. Body: **fat**.

### 9. Privát Elek — `privat-elek`
Huge legionnaire. Striped shirt, small kepi, black beard, rolled sleeves, fists like hams, cheerful. Body: **huge**.

### 10. Mr. Hobbs — `mr-hobbs`
Fat, bald, fussy. Grey moustache, bowler hat, dark waistcoat, pocket watch, umbrella, disapproving. Body: **fat**.

### 11. Sir Egmont — `sir-egmont`
Tall aristocrat. Grey hair, top hat, monocle, black tailcoat, white gloves, silver cane, sneer. Body: **tall**.

### 12. Holdvilág Charley — `holdvilag-charley`
Gaunt and melancholy. Long dark hair, battered top hat, long blue coat, red scarf, cane, hollow cheeks. Body: **normal**.

### 13. Nagy Brezely — `nagy-brezely`
Giant. Shaved head, scar, full beard, heavy fur coat, arms crossed, small eyes, silent menace. Body: **huge**.

### 14. Fortély Róka — `fortely-roka`
Thin and sly. Red curly hair, fedora, pipe, shabby green coat, hands in pockets, sideways glance. Body: **thin**.

## Integration

1. Save the pieces as `portraits/full/<slug>.webp` and `portraits/head/<slug>.webp`.
2. Add them to [`portraits.json`](portraits.json):

```json
{
  "Piszkos Fred": {
    "full": "portraits/full/piszkos-fred.webp",
    "head": "portraits/head/piszkos-fred.webp",
    "credit": "Generated with <model>, <date>"
  }
}
```

3. Rebuild:

```powershell
python build.py --pack rejto --out site/rejto
node tools/verify.mjs --pack rejto
python build.py --pack rejto --out site/rejto --check
```

The game falls back to the SVG portrait for any character without a raster entry, so a partial set works. The board uses the head crop; cards, hub and the review notebook use the full body.

## Rights

The Rejtő characters and titles are public domain in the EU; these fourteen pieces must be **new original designs**. Do not upload the reference sheets to an image generator as image prompts if that would reproduce them, and do not ship a piece you did not create or license. Record the model/artist and licence in `credit`.
