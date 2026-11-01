# Rejtő cast — painted character brief (canonical comic redesign, 2026-11-01)

This is the brief for the fourteen painted pieces. **New direction (Istvan,
2026-11-01): the game now runs as a closed system for a circle of friends, so
the characters should match the canonical look of the original Korcsmáros-era
comic adaptations** — no more "original designs only". We still generate new
artwork from text descriptions (never image-to-image off the comic pages):
each brief below describes the canonical visual traits of the character as
drawn in the classic comics, rendered fresh in the same register.

## Shared style prompt

> Full-body 1930s Central European adventure-comic caricature of **[…]**.
> Rough black ink outline, transparent watercolour and gouache washes, visible
> paper grain, exaggerated grotesque anatomy (long limbs, huge hands, big
> noses, expressive ears), muted sepia / oxblood / teal / mustard palette,
> theatrical three-quarter pose, arms relaxed, plain transparent background,
> no text, no frame, no cast shadow. Mid-century pulp-comic register, slightly
> grotesque, never photorealistic.

**Negative prompt**

> photorealistic, anime, 3D render, flat vector, neon, glossy digital
> painting, text, watermark, logo, frame, busy background, cropped hat,
> cropped shoes, extra limbs, deformed hands, comic panel, speech bubble

## Technical spec

| Asset | Size | Notes |
|---|---|---|
| Full body | 1024 × 1536 | transparent, hat to shoes inside frame, 3/4 view, one character |
| Head crop | 512 × 512 | face centred, chin + a little shoulder, no hat clipping |
| Format | WebP | transparent; no shadows |

Keep the same palette, light direction and line weight across all fourteen.

## Characters (canonical looks)

### 1. Piszkos Fred — `piszkos-fred`
Tall, gaunt, stooped old sea captain. Battered off-white canvas captain's cap,
brim pulled low, small faded anchor badge. Enormous bulbous red nose, tiny
beady eyes under bushy grey brows, long unkempt grey beard to his chest, bent
pipe in the corner of his mouth. Dark striped sailor jersey under a shabby
oversized pea coat with misaligned buttons, baggy trousers, heavy boots.
Knowing smirk; has seen too much. Body: **tall**.

### 2. Fülig Jimmy — `fulig-jimmy`
Impossibly tall, rail-thin young sailor. Very long neck, forward-hunched
posture, small head with enormous protruding ears, dark hair with one
sticking-up tuft, big cheeky grin. Blue-and-white striped sailor shirt under a
loose brown checkered jacket, too-short trousers, oversized worn shoes, long
bony hands, hands in pockets. Body: **thin**.

### 3. Vanek úr — `vanek-ur`
Tall, gaunt, elegant swindler. Long thin face, long pointed nose, slicked-back
dark hair, pencil moustache, monocle on a black ribbon, straw boater hat, tan
pinstripe suit with bow tie, yellow gloves, spats, sly unctuous smile. Body:
**tall**.

### 4. Csülök — `csulok`
Massive strongman, bald as a billiard ball with a tiny striped cap perched on
his huge head. Clean-shaven round cheerful face, small merry eyes. Red-and-
cream striped sleeveless tank top stretched over an enormous chest and belly,
huge arms, ham-sized fists, knee-length strongman tights, simple amused grin.
Body: **huge**.

### 5. Senki Alfonz — `senki-alfonz`
Tall, elegant gentleman thief. Thin aristocratic face, small dark moustache,
slicked dark hair, black top hat, black opera cape over an evening tailcoat,
white bow tie, white gloves, silver-topped cane, calm unreadable half-smile.
Body: **normal**.

### 6. Glória — `gloria`
1930s femme fatale. Golden-blonde finger-wave hair, long red evening gown,
white fur stole, gold earrings, long black cigarette holder, half-lidded
knowing smirk. Body: **normal**.

### 7. Török Szultán — `torok-szultan`
Corpulent old Levantine potentate. Bald head, luxuriant full grey moustache
and beard, red fez with black tassel, richly embroidered waistcoat, wide sash,
baggy oriental trousers, curled-toe slippers, small globe tucked under one
arm, imperious glare. Body: **fat**.

### 8. Böffentő — `boffentoo`
Short, very round, anxious little man. Black bowler hat, enormous curling
handlebar moustache, tight checked waistcoat over his potbelly, straining
jacket, hands clasped apologetically, worried watery eyes. Body: **fat**.

### 9. Privát Elek — `privat-elek`
Huge, broad, cheerful Foreign Legion legionnaire. White kepi, khaki legion
uniform with rolled sleeves and blue waist sash, short black beard, enormous
fists, boots, wide friendly grin. Body: **huge**.

### 10. Mr. Hobbs — `mr-hobbs`
Fat, bald, fussy old English gentleman. Grey walrus moustache, black bowler
hat, dark three-piece suit with gold watch chain, tightly rolled umbrella,
disapproving pout. Body: **fat**.

### 11. Sir Egmont — `sir-egmont`
Tall, haughty aristocrat. Grey hair at the temples, black top hat, monocle,
black tailcoat, white gloves, silver-headed cane, disdainful sneer, high
starched collar. Body: **tall**.

### 12. Holdvilág Charley — `holdvilag-charley`
Gaunt, melancholy night wanderer. Long dark hair under a battered top hat,
hollow cheeks, drooping dark moustache, threadbare long blue coat, red scarf,
leaning on a cane, sorrowful eyes. Body: **normal**.

### 13. Nagy Brezely — `nagy-brezely`
Enormous silent brute. Shaved head with a pale scar, small piggy eyes, full
black beard, massive shaggy fur coat, arms crossed over a barrel chest, utter
stillness. Body: **huge**.

### 14. Fortély Róka — `fortely-roka`
Thin, foxy trickster. Curly red hair under a shabby fedora, sharp pointed
nose, sly sideways grin, pipe clamped in his teeth, patched green coat, hands
buried deep in his pockets. Body: **thin**.

## Integration

1. Save the pieces as `portraits/full/<slug>.webp` and
   `portraits/head/<slug>.webp` (converter: `scripts/convert_portraits.py`).
2. `portraits.json` keys must equal the LOOKS keys.
3. Rebuild: `python3 build.py --pack rejto --out site/rejto` +
   `node tools/verify.mjs --pack rejto` + `--check`.

## Rights

Rejtő Jenő died in 1943; his texts and characters are public domain in the EU.
The classic comic artwork is not — that is why the previous round of portraits
used all-original designs. Per Istvan's instruction (2026-11-01) this redesign
goes only to the **login-gated deployment for a closed circle of friends**, not
to the public GitHub Pages repo. We generate fresh artwork from textual trait
descriptions; we do not upload comic pages as image prompts and do not ship
scans of the original art.
