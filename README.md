# Giallo a Quadretti

Logic murder mysteries for learning languages. Place every suspect on the floor plan from the clues, then name the killer: the one person who was alone with the victim.

- **Solo:** 8 original cases, 4×4 to 7×7, each with exactly one solution.
- **Co-op detectives:** create a room, share the 4-letter code. Each player sees only some suspects' clues, in the language they are learning (Italiano, English, Deutsch, Français, Español), and shares them with the team. A shared clue appears in every player's own language.
- Hungarian helper translations, spoken pronunciation, phone layout.

Play: https://zenterra-services.github.io/giallo-a-quadretti/

## Team play setup (Supabase)

Co-op uses Supabase Realtime broadcast and presence channels. No database tables are needed.

1. Create a free project at supabase.com.
2. Project Settings → API: copy the **Project URL** and the **anon public** key.
3. Put them in `site/config.js`. The anon key is meant to be public.

## Layout

- `site/` is what GitHub Pages serves (`index.html` is generated).
- `src/` holds the sources: `art.js` (all SVG art), `i18n.js` (languages and clue grammar), `main.js` (game, co-op, phone layout), `cases.json` (puzzles from `gen.py`, each verified unique).
- `python3 build.py` regenerates `site/index.html` (and `dist-claude.html`, the solo build for claude.ai).

Testing co-op without Supabase: serve `site/` locally and open two tabs with `?net=local`.
