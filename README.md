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

## Layout

- `site/` is what GitHub Pages serves (`index.html` is generated).
- `src/` holds the sources: `art.js` (all SVG art), `i18n.js` (languages and clue grammar), `main.js` (game, co-op, phone layout), `cases.json` (generated puzzles), `gen.py` (case generator), `looks.js` (suspect portraits).
- `tools/verify.mjs` validates every case: clue truth, unique solution, translations, art and UI strings.
- `build.py` assembles `site/index.html` and `dist-claude.html`.

## Development

```sh
python build.py            # rebuild site/index.html and dist-claude.html
python build.py --check    # fail if the committed site/ is stale
node tools/verify.mjs      # validate all cases and translations
python src/gen.py          # regenerate cases.json (deterministic per-case seeds)
```

The generator starts from a valid solution, then greedily drops clues while the puzzle keeps exactly one solution. Each map has an explicit seed, so reordering or adding maps does not change existing cases.

Testing co-op without Supabase: serve `site/` locally and open two tabs with `?net=local` (or run `python -m http.server -d site 8765`).
