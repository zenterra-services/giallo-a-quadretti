import json, os, sys

ROOT = os.path.dirname(os.path.abspath(__file__))

def read(*parts):
    with open(os.path.join(ROOT, *parts), encoding='utf-8') as f:
        return f.read()

def write(*parts, text):
    path = os.path.join(ROOT, *parts)
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(text)
    return path

def build():
    css = read('src/style2.css').replace('<style>', '').replace('</style>', '') + read('src/extra.css')
    art = read('src/art.js'); i18n = read('src/i18n.js'); main = read('src/main.js')
    looks = read('src/looks.js'); lo = looks[looks.index('{'):looks.rindex('};') + 1]
    d = json.loads(read('src/cases.json'))
    data = 'const CASES=' + json.dumps(d, ensure_ascii=False) + ';\nconst LOOKS=' + lo + ';'
    for s in (art, i18n, main, data):
        assert '</script' not in s, 'inline source contains </script>'
    FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
             '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One'
             '&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800'
             '&family=Courier+Prime:wght@400;700&family=Gochi+Hand&display=swap">')
    body = ('<div class="wrap" id="app"></div>\n<script>' + art + '</script>\n<script>' + i18n +
            '</script>\n<script>' + data + '</script>\n<script>' + main + '</script>\n')
    # artifact build (single file for claude.ai / offline sharing)
    artifact = ('<title>Giallo a Quadretti</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n'
                + FONTS + '\n<style>' + css + '</style>\n' + body)
    reset = (':root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);'
             'padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}'
             '[hidden]{display:none!important}*{-webkit-tap-highlight-color:transparent}')
    site = ('<!doctype html>\n<html lang="it">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
            '<title>Giallo a Quadretti</title>\n'
            '<meta name="description" content="Gialli logici per imparare le lingue: italiano, English, Deutsch, français, español.">\n'
            '<meta name="theme-color" content="#FFE14D">\n'
            '<link rel="icon" href="icon.svg" type="image/svg+xml">\n' + FONTS + '\n'
            '<style>' + reset + css + '</style>\n'
            '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js"></script>\n'
            '<script src="config.js"></script>\n</head>\n<body>\n' + body + '</body>\n</html>\n')
    icon = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
            '<rect x="4" y="4" width="56" height="56" rx="12" fill="#FFE14D" stroke="#1D1D24" stroke-width="5"/>'
            '<g fill="#1D1D24" opacity=".2"><rect x="14" y="14" width="10" height="10" rx="2"/>'
            '<rect x="27" y="14" width="10" height="10" rx="2"/><rect x="40" y="14" width="10" height="10" rx="2"/>'
            '<rect x="14" y="27" width="10" height="10" rx="2"/><rect x="27" y="27" width="10" height="10" rx="2"/>'
            '<rect x="14" y="40" width="10" height="10" rx="2"/><rect x="27" y="40" width="10" height="10" rx="2"/>'
            '<rect x="40" y="40" width="10" height="10" rx="2"/></g>'
            '<rect x="40" y="27" width="10" height="10" rx="2" fill="#E8413C"/></svg>')
    return site, artifact, icon

def main(argv):
    site, artifact, icon = build()
    check = '--check' in argv
    if check:
        problems = []
        for rel, expected in (('site/index.html', site), ('site/icon.svg', icon)):
            path = os.path.join(ROOT, rel)
            if not os.path.exists(path):
                problems.append(rel + ' is missing; run python build.py')
            else:
                with open(path, encoding='utf-8', newline='') as f:
                    if f.read().replace('\r\n', '\n') != expected:
                        problems.append(rel + ' is stale; run python build.py')
        if problems:
            print('\n'.join(problems), file=sys.stderr)
            return 1
        print('site/ is up to date')
        return 0
    write('dist-claude.html', text=artifact)
    write('site/index.html', text=site)
    write('site/icon.svg', text=icon)
    cfg = os.path.join(ROOT, 'site', 'config.js')
    if not os.path.exists(cfg):
        write('site/config.js', text='/* Supabase project for team play. The anon key is public by design. */\n'
              'window.GQ_CONFIG = { supabaseUrl: "", supabaseKey: "" };\n')
    print(len(site), 'bytes -> site/index.html')
    return 0

if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
