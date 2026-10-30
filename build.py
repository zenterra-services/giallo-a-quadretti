#!/usr/bin/env python3
"""Build a Giallo a Quadretti style pack.

A pack owns its art, cast, vocabulary, cases, theme and generator.
The engine and shared UI live in src/.

    python build.py                         # build the default pack into site/
    python build.py --pack giallo           # same
    python build.py --pack rejto --out preview/rejto
    python build.py --check                 # fail if site/ is stale
"""
import html
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
DEFAULT_PACK = 'giallo'


def read(*parts):
    with open(os.path.join(ROOT, *parts), encoding='utf-8-sig') as f:
        return f.read()


def read_optional(*parts):
    path = os.path.join(ROOT, *parts)
    if not os.path.exists(path):
        return ''
    with open(path, encoding='utf-8-sig') as f:
        return f.read()


def write(*parts, text):
    path = os.path.join(ROOT, *parts)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(text)
    return path


def arg_value(argv, name, default=None):
    for i, a in enumerate(argv):
        if a == name and i + 1 < len(argv):
            return argv[i + 1]
        if a.startswith(name + '='):
            return a.split('=', 1)[1]
    return default


def load_pack(pack_id):
    if not re.fullmatch(r'[a-z0-9-]+', pack_id):
        raise SystemExit('Pack id must be lowercase letters, digits and dashes: "%s"' % pack_id)
    pdir = os.path.join('src', 'packs', pack_id)
    manifest_path = os.path.join(ROOT, pdir, 'pack.json')
    if not os.path.exists(manifest_path):
        raise SystemExit('Unknown pack "%s": %s is missing' % (pack_id, os.path.join(pdir, 'pack.json')))
    with open(manifest_path, encoding='utf-8-sig') as f:
        manifest = json.load(f)
    for key in ('id', 'name', 'defaultLang'):
        if not manifest.get(key):
            raise SystemExit('%s/pack.json is missing "%s"' % (pdir, key))
    manifest['id'] = pack_id
    for name in ('art.js', 'vocab.js', 'looks.js', 'casel.js', 'cases.json', 'theme.css', 'theme.js', 'hu.js', 'icon.svg'):
        if not os.path.exists(os.path.join(ROOT, pdir, name)):
            raise SystemExit('%s/%s is missing' % (pdir, name))
    pack = {
        'dir': pdir,
        'manifest': manifest,
        'art': read(pdir, 'art.js'),
        'vocab': read(pdir, 'vocab.js'),
        'looks': read(pdir, 'looks.js'),
        'casel': read(pdir, 'casel.js'),
        'cases': json.loads(read(pdir, 'cases.json')),
        'theme_css': read(pdir, 'theme.css'),
        'theme_js': read(pdir, 'theme.js'),
        'hu': read(pdir, 'hu.js'),
        'ui': read_optional(pdir, 'ui.js'),
        'icon': read(pdir, 'icon.svg'),
    }
    return pack


def build(pack_id):
    pack = load_pack(pack_id)
    meta = pack['manifest']

    css = read('src/style2.css').replace('<style>', '').replace('</style>', '') + read('src/extra.css') + pack['theme_css']
    i18n = read('src/i18n.js')
    main = read('src/main.js')
    data = ('const PACK=' + json.dumps(meta, ensure_ascii=False) + ';\n'
            'const CASES=' + json.dumps(pack['cases'], ensure_ascii=False) + ';')
    scripts = [pack['art'], i18n, pack['theme_js'], pack['vocab'], pack['hu'], pack['looks'],
               pack['casel'], pack['ui'], data, main]
    for s in scripts:
        assert '</script' not in s, 'inline source contains </script>'

    fonts_url = meta.get('fonts', '')
    fonts = ''
    if fonts_url:
        fonts = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
                 '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
                 '<link rel="stylesheet" href="' + html.escape(fonts_url, quote=True) + '">\n')
    title = html.escape(meta.get('title') or meta['name'])
    description = html.escape(meta.get('description', ''), quote=True)
    theme_color = html.escape(meta.get('themeColor', '#FFE14D'), quote=True)
    lang = html.escape(meta.get('lang', meta['defaultLang']), quote=True)

    body = ('<div class="wrap" id="app"></div>\n'
            + ''.join('<script>' + s + '</script>\n' for s in scripts))
    artifact = ('<title>' + title + '</title>\n'
                '<meta name="claude:viewport-fit-sides" content="cover">\n'
                + fonts + '<style>' + css + '</style>\n' + body)
    reset = (':root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);'
             'padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}'
             '[hidden]{display:none!important}*{-webkit-tap-highlight-color:transparent}')
    site = ('<!doctype html>\n<html lang="' + lang + '">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
            '<title>' + title + '</title>\n'
            '<meta name="description" content="' + description + '">\n'
            '<meta name="theme-color" content="' + theme_color + '">\n'
            '<link rel="icon" href="icon.svg" type="image/svg+xml">\n'
            + fonts + '<style>' + reset + css + '</style>\n'
            '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js"></script>\n'
            '<script src="config.js"></script>\n</head>\n<body>\n' + body + '</body>\n</html>\n')
    return site, artifact, pack['icon'].strip()


def main(argv):
    pack_id = arg_value(argv, '--pack', DEFAULT_PACK)
    out_raw = arg_value(argv, '--out', 'site')
    out = out_raw if os.path.isabs(out_raw) else out_raw.strip('/\\')
    site, artifact, icon = build(pack_id)
    out_dir = out if os.path.isabs(out) else os.path.join(ROOT, out)

    if '--check' in argv:
        problems = []
        for name, expected in (('index.html', site), ('icon.svg', icon)):
            path = os.path.join(out_dir, name)
            if not os.path.exists(path):
                problems.append(os.path.join(out, name) + ' is missing; run python build.py --pack ' + pack_id)
            else:
                with open(path, encoding='utf-8', newline='') as f:
                    if f.read().replace('\r\n', '\n') != expected:
                        problems.append(os.path.join(out, name) + ' is stale; run python build.py --pack ' + pack_id)
        if problems:
            print('\n'.join(problems), file=sys.stderr)
            return 1
        print(out + '/ is up to date (pack: ' + pack_id + ')')
        return 0

    write(out, 'index.html', text=site)
    write(out, 'icon.svg', text=icon)
    is_site = os.path.abspath(out_dir) == os.path.join(ROOT, 'site')
    if is_site:
        write('dist-claude.html', text=artifact)
    cfg = os.path.join(out_dir, 'config.js')
    if not os.path.exists(cfg):
        src_cfg = os.path.join(ROOT, 'site', 'config.js')
        if os.path.exists(src_cfg):
            text = read('site', 'config.js')
        else:
            text = ('/* Supabase project for team play. The anon key is public by design. */\n'
                    'window.GQ_CONFIG = { supabaseUrl: "", supabaseKey: "" };\n')
        write(out, 'config.js', text=text)
    print('%d bytes -> %s/index.html (pack: %s)' % (len(site), out, pack_id))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
