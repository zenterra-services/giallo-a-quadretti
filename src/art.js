/* Giallo a Quadretti — art library. Pure functions that return SVG strings.
   Riso-zine style: flat inks, black keyline, misregistered offset layer, halftone. */
(function (root) {
  var INK = {
    blue: '#3255A4', pink: '#FF48B0', yellow: '#FFE14D', green: '#00A95C',
    orange: '#FF6C2F', teal: '#0E8A8F', red: '#E8413C', black: '#1D1D24', paper: '#FFFFFF'
  };
  var SKIN = ['#F7D7BE', '#EDB98F', '#D39A6F', '#A8704A', '#7A4A2E', '#F2C6A0'];
  var HAIR = { k: '#1E1A18', d: '#4A2E1F', b: '#8A5A2B', y: '#E9B949', r: '#C2492A', g: '#A7ABB0', w: '#ECE7DD', p: '#FF48B0', u: '#3D6FE0' };
  var K = '#1D1D24';
  function shade(hex, f) { var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    f = f || 0.72; r = Math.round(r * f); g = Math.round(g * f); b = Math.round(b * f);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1); }
  var FLOOR = 'fill="#000" fill-opacity=".22"';
  var uid = 0;
  function id(p) { uid += 1; return p + uid; }
  function dots(pid, color, size, op) {
    return '<pattern id="' + pid + '" width="' + size + '" height="' + size + '" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + (size * 0.22) + '" fill="' + color + '" fill-opacity="' + op + '"/></pattern>';
  }

  /* ---------- portraits ---------- */
  function hairBack(st, c) {
    switch (st) {
      case 'long': return '<path d="M30 58 C30 30 90 30 90 58 L94 112 C80 118 40 118 26 112 Z" fill="' + c + '"/>';
      case 'bob': return '<path d="M30 60 C30 30 90 30 90 60 L92 92 C80 98 40 98 28 92 Z" fill="' + c + '"/>';
      case 'ponytail': return '<path d="M84 50 C104 54 106 86 96 104 C92 88 88 74 82 66 Z" fill="' + c + '"/>';
      case 'curly': return '<g fill="' + c + '"><circle cx="34" cy="52" r="12"/><circle cx="86" cy="52" r="12"/><circle cx="32" cy="72" r="10"/><circle cx="88" cy="72" r="10"/></g>';
      default: return '';
    }
  }
  function hairFront(st, c) {
    switch (st) {
      case 'short': return '<path d="M33 56 C30 28 58 22 72 28 C86 30 92 44 88 58 C84 46 76 40 64 42 C52 44 42 44 33 56 Z" fill="' + c + '"/>';
      case 'buzz': return '<path d="M34 52 C36 30 84 30 86 52 C78 42 42 42 34 52 Z" fill="' + c + '" fill-opacity=".85"/>';
      case 'long': return '<path d="M32 60 C28 30 92 26 88 60 C82 44 70 38 60 40 C48 42 40 48 32 60 Z" fill="' + c + '"/>';
      case 'bob': return '<path d="M32 62 C28 30 92 28 88 62 C88 50 80 44 60 46 C42 46 34 52 32 62 Z" fill="' + c + '"/>';
      case 'bun': return '<g fill="' + c + '"><circle cx="60" cy="24" r="11"/><path d="M33 56 C32 30 88 30 87 56 C80 42 40 42 33 56 Z"/></g>';
      case 'ponytail': return '<path d="M33 56 C32 30 88 30 87 56 C76 40 46 40 33 56 Z" fill="' + c + '"/>';
      case 'curly': return '<g fill="' + c + '"><circle cx="40" cy="40" r="11"/><circle cx="54" cy="32" r="12"/><circle cx="68" cy="32" r="12"/><circle cx="81" cy="40" r="11"/><circle cx="34" cy="52" r="8"/><circle cx="86" cy="52" r="8"/></g>';
      case 'mohawk': return '<path d="M52 44 L54 16 L60 24 L62 12 L68 24 L70 44 Z" fill="' + c + '"/>';
      case 'bald': return '<g fill="' + c + '"><path d="M32 66 C30 54 34 50 36 50 L38 66 Z"/><path d="M88 66 C90 54 86 50 84 50 L82 66 Z"/></g>';
      default: return '';
    }
  }
  function face(expr) {
    var e = '';
    if (expr === 'x') {
      e += '<g stroke="' + K + '" stroke-width="3" stroke-linecap="round"><path d="M45 60 l8 8 M53 60 l-8 8"/><path d="M67 60 l8 8 M75 60 l-8 8"/></g>';
      e += '<path d="M52 84 q8 -5 16 0" fill="none" stroke="' + K + '" stroke-width="3" stroke-linecap="round"/>';
      return e;
    }
    e += '<g fill="' + K + '"><ellipse cx="49" cy="64" rx="3.6" ry="4.6"/><ellipse cx="71" cy="64" rx="3.6" ry="4.6"/></g>';
    e += '<g fill="#fff"><circle cx="50.2" cy="62.6" r="1.2"/><circle cx="72.2" cy="62.6" r="1.2"/></g>';
    var brow = expr === 'smirk' ? '<path d="M43 54 l11 -2 M66 52 l11 3" />' : expr === 'flat' ? '<path d="M43 55 h11 M66 55 h11"/>' : '<path d="M43 55 q5 -4 11 -1 M66 54 q6 -3 11 1"/>';
    e += '<g stroke="' + K + '" stroke-width="2.6" stroke-linecap="round" fill="none">' + brow + '</g>';
    var m = expr === 'smile' ? '<path d="M50 78 q10 10 20 0" />' : expr === 'smirk' ? '<path d="M52 81 q10 4 17 -4" />' : expr === 'o' ? '<ellipse cx="60" cy="81" rx="4" ry="5"/>' : '<path d="M52 81 h16" />';
    e += '<g stroke="' + K + '" stroke-width="3" stroke-linecap="round" fill="none">' + m + '</g>';
    e += '<g fill="' + INK.pink + '" fill-opacity=".35"><ellipse cx="41" cy="74" rx="6" ry="3.6"/><ellipse cx="79" cy="74" rx="6" ry="3.6"/></g>';
    return e;
  }
  function accBack(acc) {
    var s = '';
    if (acc.indexOf('headphones') >= 0) s += '<path d="M30 62 C26 20 94 20 90 62" fill="none" stroke="' + K + '" stroke-width="6"/>';
    return s;
  }
  function accFront(acc, hc) {
    var s = '';
    acc.forEach(function (a) {
      switch (a) {
        case 'glasses': s += '<g fill="none" stroke="' + K + '" stroke-width="2.6"><circle cx="49" cy="64" r="9"/><circle cx="71" cy="64" r="9"/><path d="M58 64 h4 M40 62 l-8 -3 M80 62 l8 -3"/></g>'; break;
        case 'monocle': s += '<g fill="none" stroke="' + INK.yellow + '" stroke-width="2.6"><circle cx="71" cy="64" r="9"/><path d="M78 70 q4 14 -2 30"/></g>'; break;
        case 'headphones': s += '<g fill="' + INK.pink + '" stroke="' + K + '" stroke-width="2.4"><rect x="22" y="54" width="12" height="20" rx="5"/><rect x="86" y="54" width="12" height="20" rx="5"/></g>'; break;
        case 'cap': s += '<g stroke="' + K + '" stroke-width="2.4"><path d="M32 50 C32 22 88 22 88 50 Z" fill="' + INK.blue + '"/><path d="M30 50 h66 q-4 8 -20 6 h-46 z" fill="' + INK.blue + '"/></g>'; break;
        case 'beanie': s += '<g stroke="' + K + '" stroke-width="2.4"><path d="M31 52 C30 18 90 18 89 52 Z" fill="' + INK.orange + '"/><rect x="28" y="44" width="64" height="12" rx="4" fill="' + INK.orange + '"/><circle cx="60" cy="20" r="6" fill="' + INK.yellow + '"/></g>'; break;
        case 'chef': s += '<g stroke="' + K + '" stroke-width="2.4" fill="#fff"><path d="M36 48 C22 40 30 18 44 24 C46 10 74 10 76 24 C90 18 98 40 84 48 Z"/><rect x="36" y="42" width="48" height="12" rx="3"/></g>'; break;
        case 'tiara': s += '<path d="M42 40 L48 28 L54 38 L60 24 L66 38 L72 28 L78 40 Z" fill="' + INK.yellow + '" stroke="' + K + '" stroke-width="2.2" stroke-linejoin="round"/>'; break;
        case 'headband': s += '<path d="M33 48 C40 36 80 36 87 48" fill="none" stroke="' + INK.yellow + '" stroke-width="6" stroke-linecap="round"/>'; break;
        case 'earrings': s += '<g fill="' + INK.yellow + '" stroke="' + K + '" stroke-width="1.6"><circle cx="33" cy="80" r="3.6"/><circle cx="87" cy="80" r="3.6"/></g>'; break;
        case 'mustache': s += '<path d="M46 76 q7 -6 14 -1 q7 -5 14 1 q-6 6 -14 2 q-8 4 -14 -2 z" fill="' + hc + '" stroke="' + K + '" stroke-width="1.6"/>'; break;
        case 'beard': s += '<path d="M34 70 C36 96 50 102 60 102 C70 102 84 96 86 70 C80 84 70 88 60 88 C50 88 40 84 34 70 Z" fill="' + hc + '"/>'; break;
        case 'freckles': s += '<g fill="#A0522D" fill-opacity=".55"><circle cx="40" cy="70" r="1.2"/><circle cx="44" cy="72" r="1.2"/><circle cx="42" cy="75" r="1.2"/><circle cx="80" cy="70" r="1.2"/><circle cx="76" cy="72" r="1.2"/><circle cx="78" cy="75" r="1.2"/></g>'; break;
      }
    });
    return s;
  }
  /* spec: [skinIdx, hairStyle, hairColorKey, [acc], shirtInk, expr] */
  function portrait(spec, opts) {
    opts = opts || {};
    var skin = SKIN[spec[0] % SKIN.length], hs = spec[1], hc = HAIR[spec[2]] || HAIR.k,
      acc = spec[3] || [], shirt = INK[spec[4]] || INK.blue, expr = spec[5] || 'smile';
    var pid = id('ht'), cid = id('cl');
    var sk2 = shade(skin, 0.8), lid = id('lt');
    var rightHalf = '<clipPath id="' + lid + '"><rect x="61" y="0" width="70" height="160"/></clipPath>';
    var figure =
      '<g>' + hairBack(hs, hc) + '<g clip-path="url(#' + lid + ')" opacity=".22">' + hairBack(hs, '#000').replace(/fill="#000"/g, 'fill="#000"') + '</g>' + accBack(acc) +
      '<path d="M14 142 C14 112 34 100 60 100 C86 100 106 112 106 142 Z" fill="' + shirt + '"/>' +
      '<path d="M14 142 C14 112 34 100 60 100 C86 100 106 112 106 142 Z" fill="url(#' + pid + ')"/>' +
      '<path d="M60 100 C82 100 106 112 106 142 L60 142 Z" fill="#000" fill-opacity=".16"/>' +
      '<path d="M50 100 L60 114 L70 100" fill="none" stroke="' + K + '" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<rect x="51" y="86" width="18" height="16" fill="' + sk2 + '"/>' +
      '<ellipse cx="60" cy="64" rx="27" ry="30" fill="' + skin + '"/>' +
      '<path d="M74 38 C92 52 90 84 66 93 C80 80 84 58 74 38 Z" fill="' + sk2 + '" fill-opacity=".75"/>' +
      '<ellipse cx="60" cy="95" rx="12" ry="3" fill="' + sk2 + '"/>' +
      '<ellipse cx="33" cy="68" rx="4" ry="6" fill="' + skin + '"/><ellipse cx="87" cy="68" rx="4" ry="6" fill="' + skin + '"/>' +
      face(expr) + hairFront(hs, hc) +
      '<g clip-path="url(#' + lid + ')" opacity=".22">' + hairFront(hs, '#000') + '</g>' +
      '<path d="M40 40 q8 -8 18 -9" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="3" stroke-linecap="round"/>' +
      accFront(acc, hc) + '</g>';
    var keyline = '<g fill="none" stroke="' + K + '" stroke-width="3" stroke-linejoin="round">' +
      '<path d="M14 142 C14 112 34 100 60 100 C86 100 106 112 106 142"/><ellipse cx="60" cy="64" rx="27" ry="30"/></g>';
    var defs = '<defs>' + dots(pid, '#000', 6, 0.14) +
      '<clipPath id="' + cid + '"><circle cx="60" cy="66" r="44"/></clipPath>' + rightHalf + '</defs>';
    if (opts.crop === 'head') {
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 16 100 104" role="img" aria-label="' + (opts.label || '') + '">' + defs +
        '<circle cx="60" cy="70" r="47" fill="' + shade(INK[opts.bg] || INK.yellow, 0.6) + '" stroke="' + K + '" stroke-width="3"/>' +
        '<circle cx="60" cy="66" r="47" fill="#fff" stroke="' + K + '" stroke-width="3"/>' +
        '<circle cx="60" cy="66" r="44" fill="' + (INK[opts.bg] || INK.yellow) + '"/>' +
        '<g clip-path="url(#' + cid + ')">' + figure + keyline + '</g></svg>';
    }
    // die-cut sticker: offset riso layer, thick white cut line, figure
    var silhouette = hairBack(hs, '#000') + '<path d="M14 142 C14 112 34 100 60 100 C86 100 106 112 106 142 Z"/><ellipse cx="60" cy="64" rx="27" ry="30"/>' + hairFront(hs, '#000') + accFront(acc.filter(function (a) { return a === 'chef' || a === 'cap' || a === 'beanie' || a === 'tiara'; }), '#000');
    var sil = silhouette.replace(/fill="[^"]*"/g, '').replace(/fill-opacity="[^"]*"/g, '');
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122 154" role="img" aria-label="' + (opts.label || '') + '">' + defs +
      '<g transform="translate(5 4)" fill="' + (INK[opts.bg] || INK.yellow) + '" stroke="' + (INK[opts.bg] || INK.yellow) + '" stroke-width="12" stroke-linejoin="round">' + sil + '</g>' +
      '<g transform="translate(1.5 3.5)" fill="#C3C7D2" stroke="#C3C7D2" stroke-width="12" stroke-linejoin="round">' + sil + '</g>' +
      '<g fill="#fff" stroke="#fff" stroke-width="12" stroke-linejoin="round">' + sil + '</g>' +
      figure + keyline + '</svg>';
  }

  /* ---------- objects (100×100) ---------- */
  function wrap(inner, label) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="' + (label || '') + '">' + inner + '</svg>';
  }
  var S = 'stroke="' + K + '" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round"';
  var OBJ = {
    sedia: function () { return '<g ' + FLOOR + '><rect x="32" y="40" width="50" height="50" rx="6"/></g>' +
      '<g ' + S + '><path d="M32 76 v12 M68 76 v12"/><rect x="26" y="40" width="48" height="42" rx="6" fill="' + shade(INK.orange) + '"/><rect x="26" y="34" width="48" height="42" rx="6" fill="' + INK.orange + '"/>' +
      '<rect x="24" y="24" width="52" height="14" rx="5" fill="' + shade(INK.yellow) + '"/><rect x="24" y="18" width="52" height="14" rx="5" fill="' + INK.yellow + '"/></g>' +
      '<path d="M32 40 h20" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>'; },
    divano: function () { return '<g ' + FLOOR + '><rect x="16" y="30" width="80" height="58" rx="12"/></g>' +
      '<g ' + S + '><rect x="10" y="28" width="80" height="58" rx="12" fill="' + shade(INK.teal) + '"/><rect x="10" y="22" width="80" height="56" rx="12" fill="' + INK.teal + '"/><rect x="22" y="36" width="56" height="34" rx="6" fill="#7FD1C9"/><path d="M50 36 v34"/><rect x="10" y="22" width="80" height="14" rx="7" fill="' + INK.teal + '"/></g>' +
      '<path d="M26 41 h18 M56 41 h18" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/>'; },
    tappeto: function () { return '<g ' + FLOOR + ' fill-opacity=".14"><rect x="17" y="20" width="72" height="68" rx="3"/></g>' +
      '<g ' + S + '><rect x="14" y="16" width="72" height="68" rx="3" fill="' + INK.red + '"/><rect x="22" y="24" width="56" height="52" fill="' + INK.yellow + '"/><path d="M50 30 L72 50 L50 70 L28 50 Z" fill="' + INK.pink + '"/><path d="M50 50 L72 50 L50 70 Z" fill="' + shade(INK.pink, .8) + '" stroke="none"/><path d="M14 22 h-6 M14 32 h-6 M14 42 h-6 M14 52 h-6 M14 62 h-6 M14 72 h-6 M86 22 h6 M86 32 h6 M86 42 h6 M86 52 h6 M86 62 h6 M86 72 h6"/></g>'; },
    letto: function () { return '<g ' + FLOOR + '><rect x="24" y="14" width="64" height="84" rx="6"/></g>' +
      '<g ' + S + '><rect x="18" y="14" width="64" height="82" rx="6" fill="' + shade(INK.blue) + '"/><rect x="18" y="8" width="64" height="82" rx="6" fill="#fff"/><rect x="26" y="14" width="48" height="18" rx="7" fill="' + INK.yellow + '"/><path d="M26 27 h48 v-2" fill="none" stroke="' + shade(INK.yellow) + '" stroke-width="3"/><path d="M18 42 h64 v42 a6 6 0 0 1 -6 6 h-52 a6 6 0 0 1 -6 -6 z" fill="' + INK.blue + '"/><path d="M18 52 h64" stroke="#fff"/></g>' +
      '<path d="M76 56 v28" stroke="' + shade(INK.blue) + '" stroke-width="6" stroke-linecap="round"/>'; },
    tavolo: function () { return '<g ' + FLOOR + '><rect x="18" y="26" width="76" height="64" rx="4"/></g>' +
      '<g ' + S + '><rect x="12" y="24" width="76" height="64" rx="4" fill="#7A4721"/><rect x="12" y="16" width="76" height="64" rx="4" fill="#C07A3E"/><path d="M12 37 h76 M12 58 h76" stroke="#7A4721" stroke-width="2.4"/>' +
      '<ellipse cx="66" cy="40" rx="9" ry="7" fill="#000" fill-opacity=".2" stroke="none"/><circle cx="64" cy="36" r="8" fill="#fff"/><circle cx="64" cy="36" r="4" fill="#7A4721" stroke="none"/></g>' +
      '<path d="M18 21 h30" stroke="#fff" stroke-opacity=".45" stroke-width="3" stroke-linecap="round"/>'; },
    scaffale: function () { var c = [INK.red, INK.yellow, INK.blue, INK.green, INK.pink, INK.orange]; var b = '';
      for (var r = 0; r < 3; r++) for (var i = 0; i < 6; i++) b += '<rect x="' + (17 + i * 11) + '" y="' + (14 + r * 23) + '" width="9" height="19" fill="' + c[(i + r * 2) % 6] + '"/><rect x="' + (23 + i * 11) + '" y="' + (14 + r * 23) + '" width="3" height="19" fill="#000" fill-opacity=".22"/>';
      return '<g ' + FLOOR + '><rect x="18" y="16" width="76" height="80" rx="3"/></g>' +
        '<g ' + S + '><rect x="12" y="16" width="76" height="78" rx="3" fill="#5C3A1A"/><rect x="12" y="8" width="76" height="78" rx="3" fill="#8B5A2B"/></g>' + '<g stroke="' + K + '" stroke-width="1.6">' + b + '</g>' + '<g ' + S + ' fill="none"><path d="M12 35 h76 M12 58 h76"/></g>'; },
    albero: function () { return '<g ' + FLOOR + '><ellipse cx="58" cy="58" rx="38" ry="36"/></g>' +
      '<g ' + S + '><circle cx="50" cy="48" r="38" fill="' + INK.green + '"/></g>' +
      '<path d="M82 30 A38 38 0 0 1 22 76 C52 84 84 64 82 30 Z" fill="' + shade(INK.green, .7) + '"/>' +
      '<g fill="#5FD39A"><circle cx="36" cy="36" r="10"/><circle cx="58" cy="28" r="8"/><circle cx="40" cy="58" r="6"/></g><circle cx="33" cy="33" r="3.5" fill="#fff" fill-opacity=".55"/><circle cx="50" cy="48" r="38" fill="none" ' + S + '/>'; },
    cespuglio: function () { return '<g ' + FLOOR + '><ellipse cx="56" cy="64" rx="34" ry="22"/></g>' +
      '<g ' + S + ' fill="' + INK.green + '"><circle cx="34" cy="58" r="18"/><circle cx="66" cy="58" r="18"/><circle cx="50" cy="40" r="20"/></g>' +
      '<g fill="' + shade(INK.green, .7) + '"><path d="M80 64 A18 18 0 0 1 52 70 C66 72 78 66 80 64 Z"/><path d="M69 32 A20 20 0 0 1 64 56 C70 48 72 40 69 32 Z"/></g>' +
      '<g fill="' + INK.pink + '" stroke="' + K + '" stroke-width="1.6"><circle cx="40" cy="40" r="4"/><circle cx="62" cy="50" r="4"/><circle cx="34" cy="64" r="4"/><circle cx="68" cy="66" r="3.4"/></g>'; },
    cassa: function () { return '<g ' + FLOOR + '><rect x="24" y="26" width="68" height="68"/></g>' +
      '<g ' + S + '><path d="M84 16 l8 8 v68 l-8 -8 z" fill="#A86E2E"/><path d="M16 84 l8 8 h68 l-8 -8 z" fill="#8A5A24"/><rect x="16" y="16" width="68" height="68" fill="#E0A35A"/><rect x="24" y="24" width="52" height="52" fill="none"/><path d="M24 24 L76 76 M76 24 L24 76"/></g>' +
      '<path d="M21 21 h24" stroke="#fff" stroke-opacity=".45" stroke-width="3" stroke-linecap="round"/>'; },
    vaso: function () { var p = 'M38 10 h24 v8 c14 10 18 30 12 50 c-4 14 -10 22 -24 22 c-14 0 -20 -8 -24 -22 c-6 -20 -2 -40 12 -50 z';
      return '<g ' + FLOOR + '><ellipse cx="60" cy="90" rx="22" ry="6"/></g>' +
      '<g ' + S + '><path d="' + p + '" fill="' + INK.teal + '"/></g><path d="M62 18 c14 10 18 30 12 50 c-4 14 -10 22 -24 22 c10 -4 16 -14 18 -26 c4 -20 0 -36 -6 -46 z" fill="' + shade(INK.teal, .68) + '"/>' +
      '<path d="M27 46 h46 M29 60 h42" stroke="' + INK.yellow + '" stroke-width="5"/><path d="M36 30 c-4 8 -6 18 -4 28" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="3.4" stroke-linecap="round"/><path d="' + p + '" fill="none" ' + S + '/>'; },
    pianta: function () { return '<g ' + FLOOR + '><ellipse cx="58" cy="90" rx="22" ry="6"/></g>' +
      '<g ' + S + '><path d="M50 56 C30 50 18 30 22 14 C40 20 50 36 50 56 Z" fill="' + INK.green + '"/><path d="M50 56 C70 50 82 30 78 14 C60 20 50 36 50 56 Z" fill="' + shade(INK.green, .75) + '"/><path d="M50 58 C48 36 54 20 50 8" fill="none"/><path d="M30 58 h40 l-6 32 h-28 z" fill="' + INK.orange + '"/></g>' +
      '<path d="M54 60 h16 l-6 30 h-12 z" fill="' + shade(INK.orange, .75) + '"/><g ' + S + ' fill="none"><path d="M30 58 h40 l-6 32 h-28 z"/><path d="M28 58 h44"/></g>'; },
    masso: function () { return '<g ' + FLOOR + '><path d="M22 76 L30 40 L56 24 L84 34 L94 68 L76 90 L36 92 Z"/></g>' +
      '<g ' + S + '><path d="M16 70 L24 34 L50 18 L78 28 L88 62 L70 84 L30 86 Z" fill="#C5C9D2"/><path d="M46 50 L88 62 L70 84 L30 86 Z" fill="#8D93A0"/><path d="M50 18 L78 28 L88 62 L46 50 Z" fill="#A9AEB8"/><path d="M50 18 L46 50 L88 62 M46 50 L30 86" fill="none" stroke-width="2.2"/></g>'; },
    frigo: function () { return '<g ' + FLOOR + '><rect x="32" y="12" width="52" height="86" rx="6"/></g>' +
      '<g ' + S + '><path d="M74 12 l8 6 v76 l-8 -2 z" fill="#9FB0CC"/><rect x="26" y="6" width="48" height="88" rx="6" fill="#DDE7F6"/><path d="M26 38 h48"/><path d="M64 16 v14 M64 46 v20" stroke-width="4"/></g><g fill="' + INK.pink + '" stroke="' + K + '" stroke-width="1.6"><circle cx="40" cy="22" r="4"/><rect x="36" y="52" width="10" height="8"/></g>' +
      '<path d="M32 12 v20" stroke="#fff" stroke-width="3" stroke-linecap="round"/>'; },
    forno: function () { return '<g ' + FLOOR + '><path d="M18 90 V60 C18 32 94 32 94 60 V90 Z"/></g>' +
      '<g ' + S + '><path d="M12 84 V54 C12 26 88 26 88 54 V84 Z" fill="#D4704A"/></g><path d="M66 34 C82 40 88 48 88 56 V84 H72 V60 C72 50 70 42 66 34 Z" fill="#A9532F"/>' +
      '<g ' + S + '><path d="M30 84 V64 C30 46 70 46 70 64 V84 Z" fill="' + K + '"/><path d="M12 84 V54 C12 26 88 26 88 54 V84 Z" fill="none"/></g><path d="M38 84 C36 72 44 70 44 62 C50 68 48 74 52 74 C54 68 58 66 58 60 C64 68 66 78 62 84 Z" fill="' + INK.yellow + '" stroke="' + INK.orange + '" stroke-width="2.4"/><g fill="#B85A38"><rect x="18" y="58" width="8" height="5"/><rect x="24" y="44" width="8" height="5"/></g>'; }
  };
  function object(name, label) { var f = OBJ[name]; return f ? wrap(f(), label || name) : ''; }

  /* ---------- mascot: Ispettore Piccione ---------- */
  function pigeon(opts) {
    opts = opts || {};
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Ispettore Piccione">' +
      '<ellipse cx="62" cy="112" rx="30" ry="5" fill="#000" fill-opacity=".2"/>' +
      '<g transform="translate(4 4)" fill="' + INK.pink + '" opacity=".55"><ellipse cx="58" cy="76" rx="34" ry="30"/><circle cx="62" cy="40" r="22"/></g>' +
      '<g ' + S + '>' +
      '<path d="M40 104 l-4 10 M50 106 l0 10 M70 104 l4 10" stroke="' + INK.orange + '" stroke-width="5"/>' +
      '<ellipse cx="58" cy="76" rx="34" ry="30" fill="#9AA3B5"/>' +
      '<path d="M86 62 C96 86 80 106 58 106 C76 98 88 84 86 62 Z" fill="#7C869B" stroke="none"/>' +
      '<path d="M28 74 C34 60 56 60 64 80 C54 92 36 92 28 74 Z" fill="#7C869B"/>' +
      '<path d="M44 58 C48 46 76 46 80 58 C74 66 50 66 44 58 Z" fill="' + INK.teal + '"/>' +
      '<circle cx="62" cy="40" r="22" fill="#9AA3B5"/>' +
      '<path d="M82 40 l14 4 l-14 4 z" fill="' + INK.orange + '"/>' +
      '<path d="M40 26 h46 l-6 -12 h-34 z" fill="#C9A36A"/><path d="M34 28 h58" stroke-width="5"/><path d="M42 22 h40" stroke="' + INK.red + '" stroke-width="4"/>' +
      '</g>' +
      '<circle cx="70" cy="40" r="6" fill="' + INK.yellow + '" stroke="' + K + '" stroke-width="2.6"/><circle cx="71" cy="40" r="2.6" fill="' + K + '"/>' +
      (opts.lens ? '<g ' + S + ' fill="none"><circle cx="100" cy="86" r="12" fill="#ffffff" fill-opacity=".6"/><path d="M92 95 l-12 12" stroke-width="6"/></g>' : '') +
      '</svg>';
  }

  /* ---------- stamp ---------- */
  function stamp(text, color) {
    var c = INK[color] || INK.red;
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 80" role="img" aria-label="' + text + '"><g transform="rotate(-6 130 40)">' +
      '<rect x="8" y="10" width="244" height="60" rx="8" fill="none" stroke="' + c + '" stroke-width="5"/>' +
      '<rect x="15" y="17" width="230" height="46" rx="4" fill="none" stroke="' + c + '" stroke-width="2"/>' +
      '<text x="130" y="52" text-anchor="middle" font-family="Dela Gothic One, Impact, sans-serif" font-size="28" fill="' + c + '" letter-spacing="1">' + text + '</text></g></svg>';
  }

  root.GQArt = { INK: INK, SKIN: SKIN, HAIR: HAIR, portrait: portrait, object: object, objects: Object.keys(OBJ), pigeon: pigeon, stamp: stamp };
})(typeof window !== 'undefined' ? window : globalThis);
