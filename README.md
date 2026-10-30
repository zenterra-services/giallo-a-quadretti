# Giallo a Quadretti

Logic murder mysteries for learning languages. Place every suspect on the floor plan from the clues, then name the killer: the one person who was alone with the victim.

- **Solo:** 16 original cases, 4×4 to 7×7, four difficulty levels, each with exactly one solution.
- **Co-op detectives:** create a room, share the 4-letter code (or the invite link). Each player sees only some suspects' clues, in the language they are learning (Italiano, English, Deutsch, Français, Español), and shares them with the team. A shared clue appears in every player's own language.
- **Review notebook:** after a case, read every clue again and revise the case vocabulary, with spoken pronunciation.
- Hungarian helper translations, spoken pronunciation, keyboard play, phone layout.

Play: https://zenterra-services.github.io/giallo-a-quadretti/

## Team play setup (Supabase)

Co-op uses Supabase Realtime broadcast and presence channels. No database tables are needed.

1. Create a free project at supabase.com.
2. Project Settings → API: copy the **Project URL** and the **anon public** key.
3. Put them in `site/config.js`. The anon key is meant to be public.

Co-op state merges per-person, so two detectives can place different suspects at the same time without losing a move. Clue ownership is part of the room state and is handed over deliberately when someone joins or leaves.

## Style packs

The game is an engine plus a **style pack**. A pack owns everything a specific graphic/story style needs: SVG art, cast, vocabulary, cases, theme, icon and case generator.

Current packs:

- **`giallo`** — 16 Italian riso-printed detective cases.
- **`rejto`** — 4 Rejtő Jenő fan cases (Grand Hotel, Foreign Legion fort, lost cruiser, fourteen-carat car), English clues with the Hungarian helper on by default. See [src/packs/rejto/README.md](src/packs/rejto/README.md) for the source/rights note.

```
src/packs/<id>/
  pack.json  art.js  looks.js  vocab.js  casel.js  ui.js
  theme.js   theme.css  hu.js  cases.json  gen.py  icon.svg
  README.md
```

The engine, clue grammar and shared UI live in `src/main.js`, `src/i18n.js`, `src/style2.css` and `src/extra.css`. A new style is a new folder; see [src/packs/README.md](src/packs/README.md) for the full contract and how to add one.

## Layout

- `site/` is what GitHub Pages serves (`index.html` is generated).
- `src/packs/<id>/` holds the style-specific sources.
- `src/main.js`, `src/i18n.js`, `src/style2.css`, `src/extra.css` are shared.
- `tools/verify.mjs` validates a pack: clue truth, unique solutions, translations, vocabulary, cast and art coverage, UI strings.
- `build.py` assembles one pack into `site/index.html` and `dist-claude.html`.

## Development

```sh
python build.py --pack giallo                 # rebuild site/ and dist-claude.html
python build.py --pack giallo --check         # fail if the built site/ is stale
python build.py --pack rejto --out preview/rejto
node tools/verify.mjs --pack rejto            # validate a pack
python src/packs/rejto/gen.py                 # regenerate that pack's cases.json
```

The generator starts from a valid solution, then greedily drops clues while the puzzle keeps exactly one solution. Each map has an explicit seed, so reordering or adding maps does not change existing cases.

Testing co-op without Supabase: serve `site/` locally and open two tabs with `?net=local` (or run `python -m http.server -d site 8765`).

Build-time pack selection is intentional: one style per deployment keeps the page small and the cases coherent. Runtime switching is not part of the engine.
