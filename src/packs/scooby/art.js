/* Yamada a Quadretti — soft pastel anime art. Original SVG shapes only;
   character likenesses are established by the painted portraits in portraits.json. */
(function (root) {
  var INK = {
    pink: '#FF9DBD', rose: '#E86A8E', red: '#D95A6E', peach: '#FFC09B', orange: '#F2A56B',
    yellow: '#FFD98E', cream: '#FFF3DA', mint: '#9ADFC3', green: '#7FBF8E', teal: '#7FC4C9',
    sky: '#A8CFF0', blue: '#7FA8DC', navy: '#5B6B9C', lavender: '#C9B2E8', purple: '#A98AD4',
    brown: '#A0785A', choco: '#7A5340', black: '#4A3A44', paper: '#FFF9F4', steel: '#9C9CA4'
  };
  var SKIN = ['#FBE3CF', '#F2CDA8', '#DFA87E', '#B97F56', '#8A5A3B', '#F7D9BE'];
  var HAIR = { k: '#332A33', d: '#4A3628', b: '#8A6242', y: '#E8BE78', a: '#D9C29A', r: '#C96B4A', g: '#9C9CA4', w: '#F0EBE0', p: '#F2A5C0', v: '#9B7EC8', u: '#3A4A6B', s: '#8A857E', choco: '#7A5340', o: '#E08A3C', biscuit: '#C99A5B' };
  var K = '#5A4650';
  function shade(hex, f) { var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    f = f || 0.74; r = Math.round(r * f); g = Math.round(g * f); b = Math.round(b * f);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1); }
  var FLOOR = 'fill="#000" fill-opacity=".14"';
  var uid = 0;
  function id(p) { uid += 1; return p + uid; }

  /* ---------- hair ---------- */
  function hairBack(st, c) {
    switch (st) {
      case 'long': return '<path d="M30 58 C30 30 90 30 90 58 L94 112 C80 118 40 118 26 112 Z" fill="' + c + '"/>';
      case 'wavy': return '<path d="M30 56 C30 28 90 28 90 56 C94 76 88 92 94 112 C86 118 78 112 76 104 C74 116 64 120 60 118 C56 120 46 116 44 104 C42 112 34 118 26 112 C32 92 26 76 30 56 Z" fill="' + c + '"/>';
      case 'hime': return '<path d="M31 58 C31 30 89 30 89 58 L92 116 C84 120 78 114 78 108 L42 108 C42 114 36 120 28 116 Z" fill="' + c + '"/>';
      case 'pigtails': return '<g fill="' + c + '"><path d="M30 58 C30 30 90 30 90 58 L91 82 C80 88 40 88 29 82 Z"/><path d="M30 74 C20 82 18 104 26 116 C32 108 34 92 34 80 Z"/><path d="M90 74 C100 82 102 104 94 116 C88 108 86 92 86 80 Z"/></g>';
      case 'bob': return '<path d="M30 60 C30 30 90 30 90 60 L92 92 C80 98 40 98 28 92 Z" fill="' + c + '"/>';
      case 'shaggy': return '<path d="M29 58 C28 28 92 26 91 58 L93 96 C86 100 82 94 82 88 C80 96 74 100 70 97 L68 86 C64 96 56 96 52 86 L50 97 C46 100 40 96 38 88 C38 94 34 100 27 96 Z" fill="' + c + '"/>';
      case 'ponytail': return '<path d="M84 50 C104 54 106 86 96 104 C92 88 88 74 82 66 Z" fill="' + c + '"/>';
      default: return '';
    }
  }
  function hairFront(st, c) {
    switch (st) {
      case 'short': return '<path d="M33 56 C30 28 58 22 72 28 C86 30 92 44 88 58 C84 46 76 40 64 42 C52 44 42 44 33 56 Z" fill="' + c + '"/>';
      case 'medium': return '<g fill="' + c + '"><path d="M31 58 C28 26 92 24 89 58 C87 46 82 40 76 42 L74 56 L70 42 L64 58 L60 40 L54 56 L50 42 C44 42 36 46 31 58 Z"/><path d="M31 58 C30 66 32 72 34 76 L38 62 Z"/><path d="M89 58 C90 66 88 72 86 76 L82 62 Z"/></g>';
      case 'long': return '<path d="M32 60 C28 30 92 26 88 60 C82 44 70 38 60 40 C48 42 40 48 32 60 Z" fill="' + c + '"/>';
      case 'wavy': return '<g fill="' + c + '"><path d="M31 62 C26 28 94 24 89 62 C86 48 80 40 70 42 C66 44 64 48 60 48 C56 48 54 44 50 42 C40 40 34 48 31 62 Z"/><path d="M31 62 C28 72 30 82 34 88 L38 66 Z"/><path d="M89 62 C92 72 90 82 86 88 L82 66 Z"/></g>';
      case 'hime': return '<g fill="' + c + '"><path d="M31 60 C28 28 92 26 89 60 C86 50 84 46 80 44 L32 44 Z" transform="translate(0,-2)"/><rect x="34" y="40" width="52" height="10" rx="4"/><path d="M31 58 C30 70 32 78 36 84 L39 60 Z"/><path d="M89 58 C90 70 88 78 84 84 L81 60 Z"/></g>';
      case 'pigtails': return '<path d="M32 60 C28 28 92 26 88 60 C86 50 80 44 74 46 L72 54 L66 44 L60 54 L54 44 L48 54 L46 46 C40 44 34 50 32 60 Z" fill="' + c + '"/>';
      case 'bun': return '<g fill="' + c + '"><circle cx="60" cy="24" r="11"/><path d="M33 56 C32 30 88 30 87 56 C80 42 40 42 33 56 Z"/></g>';
      case 'ponytail': return '<path d="M33 56 C32 30 88 30 87 56 C76 40 46 40 33 56 Z" fill="' + c + '"/>';
      case 'bald': return '<g fill="' + c + '"><path d="M32 66 C30 54 34 50 36 50 L38 66 Z"/><path d="M88 66 C90 54 86 50 84 50 L82 66 Z"/></g>';
      case 'shaggy': return '<g fill="' + c + '"><path d="M30 62 C26 26 94 24 90 62 C88 48 84 44 80 46 L78 58 L73 44 L68 58 L63 42 L58 58 L53 44 L48 58 L45 46 C39 45 33 50 30 62 Z"/><path d="M30 62 C28 72 29 82 33 90 L37 68 Z"/><path d="M90 62 C92 72 91 82 87 90 L83 68 Z"/></g>';
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
    /* big soft anime eyes */
    e += '<g fill="' + K + '"><ellipse cx="49" cy="64" rx="4" ry="5.4"/><ellipse cx="71" cy="64" rx="4" ry="5.4"/></g>';
    e += '<g fill="#fff"><circle cx="50.4" cy="62.2" r="1.6"/><circle cx="72.4" cy="62.2" r="1.6"/><circle cx="47.8" cy="66" r=".9"/><circle cx="69.8" cy="66" r=".9"/></g>';
    var brow = expr === 'smirk' ? '<path d="M43 54 l11 -2 M66 52 l11 3" />' : expr === 'flat' ? '<path d="M43 55 h11 M66 55 h11"/>' : '<path d="M43 55 q5 -4 11 -1 M66 54 q6 -3 11 1"/>';
    e += '<g stroke="' + K + '" stroke-width="2.4" stroke-linecap="round" fill="none">' + brow + '</g>';
    var m = expr === 'smile' ? '<path d="M51 78 q9 9 18 0" />' : expr === 'smirk' ? '<path d="M52 81 q10 4 17 -4" />' : expr === 'o' ? '<ellipse cx="60" cy="81" rx="4" ry="5"/>' : '<path d="M52 81 h16" />';
    e += '<g stroke="' + K + '" stroke-width="2.8" stroke-linecap="round" fill="none">' + m + '</g>';
    e += '<g fill="' + INK.pink + '" fill-opacity=".4"><ellipse cx="41" cy="73" rx="6" ry="3.4"/><ellipse cx="79" cy="73" rx="6" ry="3.4"/></g>';
    return e;
  }
  function accBack(acc) {
    var s = '';
    if (acc.indexOf('headphones') >= 0) s += '<path d="M30 62 C26 20 94 20 90 62" fill="none" stroke="' + K + '" stroke-width="6"/>';
    if (acc.indexOf('bunnyears') >= 0) s += '<g fill="' + INK.paper + '" stroke="' + K + '" stroke-width="2.6" stroke-linejoin="round"><path d="M42 34 C34 8 40 2 48 6 C52 10 52 24 50 36 Z"/><path d="M78 34 C86 8 80 2 72 6 C68 10 68 24 70 36 Z"/></g><g fill="' + INK.pink + '"><path d="M45 30 C40 12 43 8 47 12 C49 16 49 26 48 32 Z"/><path d="M75 30 C80 12 77 8 73 12 C71 16 71 26 72 32 Z"/></g>';
    return s;
  }
  function accFront(acc, hc, skin) {
    var s = '';
    acc.forEach(function (a) {
      switch (a) {
        case 'glasses': s += '<g fill="none" stroke="' + K + '" stroke-width="2.6"><circle cx="49" cy="64" r="9.5"/><circle cx="71" cy="64" r="9.5"/><path d="M58.5 64 h3 M39.5 62 l-7 -3 M80.5 62 l7 -3"/></g>'; break;
        case 'headphones': s += '<g fill="' + INK.navy + '" stroke="' + K + '" stroke-width="2.4"><rect x="22" y="54" width="12" height="20" rx="5"/><rect x="86" y="54" width="12" height="20" rx="5"/></g>'; break;
        case 'ribbon': s += '<g stroke="' + K + '" stroke-width="2.2" stroke-linejoin="round" fill="' + INK.rose + '"><path d="M60 20 L46 12 L48 26 Z"/><path d="M60 20 L74 12 L72 26 Z"/><circle cx="60" cy="19" r="4.6" fill="' + INK.red + '"/></g>'; break;
        case 'headdress': s += '<g stroke="' + K + '" stroke-width="2.2" stroke-linejoin="round"><path d="M30 44 C40 32 80 32 90 44 L90 50 C80 38 40 38 30 50 Z" fill="' + K + '"/><g fill="' + INK.paper + '"><circle cx="40" cy="42" r="3"/><circle cx="50" cy="39" r="3"/><circle cx="60" cy="38" r="3"/><circle cx="70" cy="39" r="3"/><circle cx="80" cy="42" r="3"/></g><path d="M30 48 L26 40 L34 42 Z" fill="' + K + '"/><path d="M90 48 L94 40 L86 42 Z" fill="' + K + '"/></g>'; break;
        case 'earrings': s += '<g fill="' + INK.yellow + '" stroke="' + K + '" stroke-width="1.6"><circle cx="33" cy="80" r="3.6"/><circle cx="87" cy="80" r="3.6"/></g>'; break;
        case 'mustache': s += '<path d="M46 76 q7 -6 14 -1 q7 -5 14 1 q-6 6 -14 2 q-8 4 -14 -2 z" fill="' + hc + '" stroke="' + K + '" stroke-width="1.6"/>'; break;
        case 'towel': s += '<g stroke="' + K + '" stroke-width="2" stroke-linejoin="round" fill="' + INK.paper + '"><path d="M40 98 Q60 110 80 98 L84 110 Q60 122 36 110 Z"/><path d="M50 108 L46 124 L54 122 L56 110 Z"/></g>'; break;
        case 'striped': case 'apron': case 'bunnyears': break;
        case 'collar': s += '<g stroke="' + K + '" stroke-width="2"><path d="M44 92 Q60 102 76 92 L76 99 Q60 109 44 99 Z" fill="' + INK.teal + '"/><rect x="57" y="99" width="6" height="7" rx="2" fill="' + INK.yellow + '" stroke="' + K + '" stroke-width="1.4"/></g>'; break;
        case 'goatee': s += '<path d="M54 84 q6 8 12 0 q-2 10 -6 10 q-4 0 -6 -10 z" fill="' + hc + '" stroke="' + K + '" stroke-width="1.4"/>'; break;
        case 'beard': s += '<path d="M42 72 q2 26 18 28 q16 -2 18 -28 q-4 14 -18 15 q-14 -1 -18 -15 z" fill="' + hc + '" stroke="' + K + '" stroke-width="1.6"/>'; break;
        case 'ascot': s += '<g stroke="' + K + '" stroke-width="1.8" stroke-linejoin="round" fill="' + INK.orange + '"><path d="M52 92 L60 102 L68 92 L66 104 Q60 108 54 104 Z"/><path d="M54 104 L60 118 L66 104 Z" fill="' + shade(INK.orange, .82) + '"/></g>'; break;
        case 'headband': s += '<path d="M31 56 C38 40 82 40 89 56 L89 49 C82 33 38 33 31 49 Z" fill="' + INK.lavender + '" stroke="' + K + '" stroke-width="1.8"/>'; break;
        case 'streak': s += '<path d="M55 27 C59 25 64 25 67 28 L65 56 L57 56 Z" fill="' + INK.paper + '" opacity=".9"/>'; break;
      }
    });
    return s;
  }

  /* ---------- optional raster portraits (painted pieces) ---------- */
  function rasterHead(src, opts) {
    var clip = id('rh');
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 16 100 104" role="img" aria-label="' + (opts.label || '') + '">' +
      '<defs><clipPath id="' + clip + '"><circle cx="60" cy="66" r="44"/></clipPath></defs>' +
      '<circle cx="60" cy="70" r="47" fill="' + shade(INK[opts.bg] || INK.yellow, 0.72) + '" stroke="' + K + '" stroke-width="3"/>' +
      '<circle cx="60" cy="66" r="47" fill="#fff" stroke="' + K + '" stroke-width="3"/>' +
      '<circle cx="60" cy="66" r="44" fill="' + (INK[opts.bg] || INK.yellow) + '"/>' +
      '<image href="' + src + '" x="10" y="16" width="100" height="104" preserveAspectRatio="xMidYMid slice" clip-path="url(#' + clip + ')"/>' +
      '</svg>';
  }
  function rasterFull(src, opts) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122 154" role="img" aria-label="' + (opts.label || '') + '">' +
      '<image href="' + src + '" x="0" y="0" width="122" height="154" preserveAspectRatio="xMidYMid meet"/>' +
      '</svg>';
  }

  /* ---------- the Scooby Snacks box mascot ---------- */
  function plushFigure(opts) {
    var B = INK.orange, BD = shade(B, 0.72), CR = INK.cream;
    var bone = function (x, y, r) {
      return '<g transform="translate(' + x + ' ' + y + ') rotate(' + r + ')" fill="' + HAIR.biscuit + '" stroke="' + K + '" stroke-width="1.6">' +
        '<rect x="-7" y="-2.6" width="14" height="5.2" rx="2.6"/>' +
        '<circle cx="-7" cy="-2.8" r="2.8"/><circle cx="-7" cy="2.8" r="2.8"/>' +
        '<circle cx="7" cy="-2.8" r="2.8"/><circle cx="7" cy="2.8" r="2.8"/></g>';
    };
    var body =
      '<path d="M46 118 v14 M74 118 v14" fill="none" stroke="' + K + '" stroke-width="7" stroke-linecap="round"/>' +
      '<rect x="36" y="128" width="20" height="10" rx="5" fill="' + INK.choco + '" stroke="' + K + '" stroke-width="2"/>' +
      '<rect x="64" y="128" width="20" height="10" rx="5" fill="' + INK.choco + '" stroke="' + K + '" stroke-width="2"/>' +
      '<path d="M28 76 q-12 2 -14 14 M92 76 q12 2 14 14" fill="none" stroke="' + K + '" stroke-width="5" stroke-linecap="round"/>' +
      '<rect x="28" y="42" width="64" height="80" rx="10" fill="' + B + '"/>' +
      '<path d="M28 52 v60 a10 10 0 0 0 10 10 h8 V42 h-8 a10 10 0 0 0 -10 10 z" fill="' + BD + '" opacity=".55"/>' +
      '<rect x="36" y="52" width="48" height="62" rx="8" fill="' + CR + '" stroke="' + K + '" stroke-width="2.2"/>' +
      '<circle cx="50" cy="80" r="4.6" fill="' + K + '"/><circle cx="70" cy="80" r="4.6" fill="' + K + '"/>' +
      '<circle cx="51.6" cy="78.4" r="1.5" fill="#fff"/><circle cx="71.6" cy="78.4" r="1.5" fill="#fff"/>' +
      '<path d="M53 92 q7 7 14 0" fill="none" stroke="' + K + '" stroke-width="2.4" stroke-linecap="round"/>' +
      '<g fill="' + INK.rose + '" fill-opacity=".5"><ellipse cx="43" cy="88" rx="4.4" ry="2.8"/><ellipse cx="77" cy="88" rx="4.4" ry="2.8"/></g>' +
      bone(44, 106, -18) + bone(76, 106, 14) +
      '<g stroke="' + K + '" stroke-width="2.2" stroke-linejoin="round" fill="' + INK.red + '"><path d="M60 42 L46 32 L48 50 Z"/><path d="M60 42 L74 32 L72 50 Z"/><circle cx="60" cy="41" r="5"/></g>';
    var keyline = '<g fill="none" stroke="' + K + '" stroke-width="3" stroke-linejoin="round"><rect x="28" y="42" width="64" height="80" rx="10"/></g>';
    if (opts.crop === 'head') {
      var cid = id('cl');
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 16 100 104" role="img" aria-label="' + (opts.label || '') + '">' +
        '<defs><clipPath id="' + cid + '"><circle cx="60" cy="66" r="44"/></clipPath></defs>' +
        '<circle cx="60" cy="70" r="47" fill="' + shade(INK[opts.bg] || INK.yellow, 0.72) + '" stroke="' + K + '" stroke-width="3"/>' +
        '<circle cx="60" cy="66" r="47" fill="#fff" stroke="' + K + '" stroke-width="3"/>' +
        '<circle cx="60" cy="66" r="44" fill="' + (INK[opts.bg] || INK.yellow) + '"/>' +
        '<g clip-path="url(#' + cid + ')">' + body + keyline + '</g></svg>';
    }
    var sil = '<rect x="28" y="42" width="64" height="80" rx="10"/><path d="M46 30 L60 44 L74 30 L72 50 L48 50 Z"/><path d="M44 118 h32 v18 h-32 z"/>';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 0 146 154" role="img" aria-label="' + (opts.label || '') + '">' +
      '<g transform="translate(4 3.5)" fill="#C9B2C0" stroke="#C9B2C0" stroke-width="12" stroke-linejoin="round">' + sil + '</g>' +
      '<g fill="#fff" stroke="#fff" stroke-width="12" stroke-linejoin="round">' + sil + '</g>' +
      body + keyline + '</svg>';
  }

  /* spec: [skinIdx, hairStyle, hairColorKey, [acc], shirtInk, expr, bodyType] */
  function portrait(spec, opts) {
    opts = opts || {};
    var pr = (typeof PORTRAITS !== 'undefined') && opts.label && PORTRAITS[opts.label];
    if (pr) {
      if (opts.crop === 'head' && pr.head) return rasterHead(pr.head, opts);
      if (opts.crop !== 'head' && pr.full) return rasterFull(pr.full, opts);
    }
    if (spec[1] === 'plush') return plushFigure(opts);
    var skin = SKIN[spec[0] % SKIN.length], hs = spec[1], hc = HAIR[spec[2]] || HAIR.k,
      acc = spec[3] || [], shirt = INK[spec[4]] || INK.blue, expr = spec[5] || 'smile',
      body = spec[6] || 'normal';
    var BW = ({ normal: 46, thin: 36, tall: 36, fat: 56, huge: 58, small: 40 })[body] || 46;
    var SH = ({ normal: 26, thin: 20, tall: 22, fat: 32, huge: 40, small: 24 })[body] || 26;
    var TY = ({ normal: 100, thin: 100, tall: 96, fat: 100, huge: 98, small: 104 })[body] || 100;
    var L = 60 - BW, R = 60 + BW, SL = 60 - SH, SR = 60 + SH;
    var torso = 'M' + L + ' 142 C' + L + ' ' + (TY + 12) + ' ' + SL + ' ' + TY + ' 60 ' + TY +
      ' C' + SR + ' ' + TY + ' ' + R + ' ' + (TY + 12) + ' ' + R + ' 142 Z';
    var cid = id('cl'), lid = id('lt');
    var rightHalf = '<clipPath id="' + lid + '"><rect x="61" y="0" width="70" height="160"/></clipPath>';
    var sk2 = shade(skin, 0.84);
    var bodyOverlay = '';
    if (acc.indexOf('striped') >= 0) bodyOverlay += '<path d="' + torso + '" fill="' + shade(shirt, .72) + '" stroke="none" stroke-dasharray="6 5"/>';
    if (acc.indexOf('apron') >= 0) bodyOverlay += '<path d="M' + (60 - BW * .45) + ' ' + (TY + 18) + ' L' + (60 + BW * .45) + ' ' + (TY + 18) +
      ' L' + (60 + BW * .4) + ' 142 L' + (60 - BW * .4) + ' 142 Z" fill="' + INK.paper + '" stroke="' + K + '" stroke-width="2.2"/>' +
      '<circle cx="60" cy="' + (TY + 32) + '" r="4" fill="' + INK.red + '"/><path d="M60 ' + (TY + 28) + ' q3 -5 6 -2" fill="none" stroke="' + INK.green + '" stroke-width="2"/>';
    var figure =
      '<g>' + hairBack(hs, hc) + '<g clip-path="url(#' + lid + ')" opacity=".18">' + hairBack(hs, '#000') + '</g>' + accBack(acc) +
      '<path d="' + torso + '" fill="' + shirt + '"/>' +
      '<path d="M60 ' + TY + ' C' + SR + ' ' + TY + ' ' + R + ' ' + (TY + 12) + ' ' + R + ' 142 L60 142 Z" fill="#000" fill-opacity=".12"/>' +
      bodyOverlay +
      '<path d="M50 ' + TY + ' L60 ' + (TY + 14) + ' L70 ' + TY + '" fill="none" stroke="' + K + '" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<rect x="51" y="86" width="18" height="' + (TY - 84) + '" fill="' + sk2 + '"/>' +
      '<ellipse cx="60" cy="64" rx="27" ry="30" fill="' + skin + '"/>' +
      '<path d="M74 38 C92 52 90 84 66 93 C80 80 84 58 74 38 Z" fill="' + sk2 + '" fill-opacity=".6"/>' +
      '<ellipse cx="33" cy="68" rx="4" ry="6" fill="' + skin + '"/><ellipse cx="87" cy="68" rx="4" ry="6" fill="' + skin + '"/>' +
      face(expr) + hairFront(hs, hc) +
      '<g clip-path="url(#' + lid + ')" opacity=".18">' + hairFront(hs, '#000') + '</g>' +
      '<path d="M40 40 q8 -8 18 -9" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/>' +
      accFront(acc, hc, skin) + '</g>';
    var keyline = '<g fill="none" stroke="' + K + '" stroke-width="3" stroke-linejoin="round">' +
      '<path d="' + torso + '"/><ellipse cx="60" cy="64" rx="27" ry="30"/></g>';
    var defs = '<defs><clipPath id="' + cid + '"><circle cx="60" cy="66" r="44"/></clipPath>' + rightHalf + '</defs>';
    if (opts.crop === 'head') {
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 16 100 104" role="img" aria-label="' + (opts.label || '') + '">' + defs +
        '<circle cx="60" cy="70" r="47" fill="' + shade(INK[opts.bg] || INK.yellow, 0.72) + '" stroke="' + K + '" stroke-width="3"/>' +
        '<circle cx="60" cy="66" r="47" fill="#fff" stroke="' + K + '" stroke-width="3"/>' +
        '<circle cx="60" cy="66" r="44" fill="' + (INK[opts.bg] || INK.yellow) + '"/>' +
        '<g clip-path="url(#' + cid + ')">' + figure + keyline + '</g></svg>';
    }
    /* die-cut sticker: soft offset layer, thick white cut line, figure */
    var silhouette = hairBack(hs, '#000') + '<path d="' + torso + '"/><ellipse cx="60" cy="64" rx="27" ry="30"/>' + hairFront(hs, '#000') +
      accFront(acc.filter(function (a) { return ['ribbon', 'headdress'].indexOf(a) >= 0; }), '#000', '#000');
    var sil = silhouette.replace(/fill="[^"]*"/g, '').replace(/fill-opacity="[^"]*"/g, '');
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 0 146 154" role="img" aria-label="' + (opts.label || '') + '">' + defs +
      '<g transform="translate(4 3.5)" fill="' + (INK[opts.bg] || INK.yellow) + '" stroke="' + (INK[opts.bg] || INK.yellow) + '" stroke-width="12" stroke-linejoin="round">' + sil + '</g>' +
      '<g transform="translate(1.5 3)" fill="#D9C2CC" stroke="#D9C2CC" stroke-width="12" stroke-linejoin="round">' + sil + '</g>' +
      '<g fill="#fff" stroke="#fff" stroke-width="12" stroke-linejoin="round">' + sil + '</g>' +
      figure + keyline + '</svg>';
  }

  /* ---------- objects (100×100) ---------- */
  function wrap(inner, label) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="' + (label || '') + '">' + inner + '</svg>';
  }
  var S = 'stroke="' + K + '" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round"';
  var OBJ = {
    chair: function () { return '<g ' + FLOOR + '><rect x="30" y="16" width="44" height="72" rx="14"/></g>' +
      '<g ' + S + '><path d="M36 74 v14 M64 74 v14" fill="none"/><rect x="30" y="12" width="40" height="52" rx="13" fill="' + INK.navy + '"/><rect x="36" y="18" width="28" height="14" rx="7" fill="' + INK.sky + '"/><rect x="22" y="48" width="56" height="20" rx="9" fill="' + INK.blue + '"/><path d="M30 38 h18" stroke="#fff" stroke-opacity=".5" stroke-width="3" fill="none"/></g>'; },
    sofa: function () { return '<g ' + FLOOR + '><rect x="16" y="32" width="78" height="56" rx="14"/></g>' +
      '<g ' + S + '><rect x="12" y="30" width="76" height="54" rx="14" fill="' + shade(INK.mint) + '"/><rect x="12" y="24" width="76" height="52" rx="14" fill="' + INK.mint + '"/><rect x="24" y="36" width="52" height="30" rx="8" fill="' + shade(INK.mint, .86) + '"/><path d="M50 36 v30" fill="none"/></g>' +
      '<path d="M28 42 h16 M56 42 h16" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/>'; },
    rug: function () { return '<g ' + FLOOR + ' fill-opacity=".1"><ellipse cx="52" cy="52" rx="40" ry="32"/></g>' +
      '<g ' + S + '><ellipse cx="50" cy="48" rx="40" ry="32" fill="' + INK.pink + '"/><ellipse cx="50" cy="48" rx="30" ry="23" fill="' + INK.cream + '"/><path d="M50 38 C44 32 36 38 40 46 C43 52 50 56 50 56 C50 56 57 52 60 46 C64 38 56 32 50 38 Z" fill="' + INK.rose + '" stroke-width="2.4"/></g>'; },
    bed: function () { return '<g ' + FLOOR + '><rect x="22" y="14" width="64" height="82" rx="8"/></g>' +
      '<g ' + S + '><rect x="18" y="12" width="64" height="80" rx="8" fill="' + shade(INK.lavender) + '"/><rect x="18" y="7" width="64" height="80" rx="8" fill="' + INK.paper + '"/><rect x="26" y="13" width="48" height="18" rx="9" fill="' + INK.yellow + '"/><path d="M18 42 h64 v38 a8 8 0 0 1 -8 8 h-48 a8 8 0 0 1 -8 -8 z" fill="' + INK.lavender + '"/><path d="M18 52 h64" stroke="#fff" fill="none"/></g>' +
      '<path d="M74 56 v24" stroke="' + shade(INK.lavender) + '" stroke-width="6" stroke-linecap="round"/>'; },
    bench: function () { return '<g ' + FLOOR + '><rect x="12" y="44" width="80" height="14" rx="6"/><path d="M20 58 h60 v26 h-60 z"/></g>' +
      '<g ' + S + '><path d="M20 54 v28 M80 54 v28" fill="none"/><rect x="10" y="40" width="80" height="14" rx="7" fill="' + INK.orange + '"/><rect x="16" y="22" width="68" height="12" rx="6" fill="' + shade(INK.orange, .85) + '"/></g>' +
      '<path d="M18 45 h26" stroke="#fff" stroke-opacity=".45" stroke-width="3" stroke-linecap="round"/>'; },
    desk: function () { return '<g ' + FLOOR + '><rect x="14" y="52" width="76" height="12" rx="4"/></g>' +
      '<g ' + S + '><rect x="10" y="48" width="80" height="10" rx="4" fill="' + INK.brown + '"/><path d="M16 58 v26 M84 58 v26" fill="none"/><rect x="30" y="12" width="40" height="30" rx="4" fill="' + K + '"/><rect x="33" y="15" width="34" height="24" rx="2" fill="' + INK.sky + '"/><path d="M46 42 v6 M40 48 h12" fill="none"/></g>' +
      '<path d="M38 20 l8 8 M48 18 l8 8" stroke="#fff" stroke-opacity=".7" stroke-width="2.6" stroke-linecap="round"/>'; },
    shelf: function () { var c = [INK.rose, INK.yellow, INK.blue, INK.green, INK.pink, INK.orange]; var b = '';
      for (var r = 0; r < 3; r++) for (var i = 0; i < 6; i++) b += '<rect x="' + (17 + i * 11) + '" y="' + (16 + r * 23) + '" width="9" height="17" rx="2" fill="' + c[(i + r * 2) % 6] + '"/>';
      b += '<circle cx="28" cy="22" r="5" fill="' + INK.choco + '"/><circle cx="25" cy="17" r="2" fill="' + INK.choco + '"/><circle cx="31" cy="17" r="2" fill="' + INK.choco + '"/>';
      return '<g ' + FLOOR + '><rect x="18" y="16" width="72" height="78" rx="4"/></g>' +
        '<g ' + S + '><rect x="12" y="14" width="76" height="78" rx="4" fill="' + shade(INK.brown, .85) + '"/><rect x="12" y="8" width="76" height="78" rx="4" fill="' + INK.brown + '"/></g>' + '<g stroke="' + K + '" stroke-width="1.6">' + b + '</g>' + '<g ' + S + ' fill="none"><path d="M12 35 h76 M12 58 h76"/></g>'; },
    vending: function () { return '<g ' + FLOOR + '><rect x="22" y="10" width="56" height="84" rx="6"/></g>' +
      '<g ' + S + '><rect x="18" y="8" width="56" height="84" rx="6" fill="' + INK.red + '"/><rect x="24" y="16" width="32" height="40" rx="3" fill="' + INK.paper + '"/><rect x="60" y="16" width="8" height="24" rx="2" fill="' + K + '"/><rect x="24" y="62" width="44" height="12" rx="3" fill="' + K + '"/></g>' +
      '<g stroke="' + K + '" stroke-width="1.6"><circle cx="32" cy="26" r="4" fill="' + INK.sky + '"/><circle cx="42" cy="26" r="4" fill="' + INK.yellow + '"/><circle cx="52" cy="26" r="4" fill="' + INK.mint + '"/><circle cx="32" cy="38" r="4" fill="' + INK.pink + '"/><circle cx="42" cy="38" r="4" fill="' + INK.orange + '"/><circle cx="52" cy="38" r="4" fill="' + INK.lavender + '"/></g>' +
      '<circle cx="64" cy="46" r="3" fill="' + INK.yellow + '" stroke="' + K + '" stroke-width="1.6"/>'; },
    plant: function () { return '<g ' + FLOOR + '><ellipse cx="56" cy="90" rx="22" ry="6"/></g>' +
      '<g ' + S + '><path d="M50 56 C30 50 18 30 22 14 C40 20 50 36 50 56 Z" fill="' + INK.green + '"/><path d="M50 56 C70 50 82 30 78 14 C60 20 50 36 50 56 Z" fill="' + shade(INK.green, .8) + '"/><path d="M50 58 C48 36 54 20 50 8" fill="none"/><path d="M30 58 h40 l-6 32 h-28 z" fill="' + INK.pink + '"/></g>' +
      '<path d="M54 60 h16 l-6 30 h-12 z" fill="' + shade(INK.pink, .8) + '"/><g ' + S + ' fill="none"><path d="M30 58 h40 l-6 32 h-28 z"/><path d="M28 58 h44"/></g>'; },
    crane: function () { return '<g ' + FLOOR + '><rect x="14" y="12" width="72" height="80" rx="6"/></g>' +
      '<g ' + S + '><rect x="10" y="10" width="72" height="80" rx="6" fill="' + INK.sky + '"/><rect x="16" y="18" width="60" height="44" rx="4" fill="' + INK.paper + '"/><path d="M16 62 h60 v22 a6 6 0 0 1 -6 6 h-48 a6 6 0 0 1 -6 -6 z" fill="' + shade(INK.sky, .8) + '"/><path d="M48 22 v10 M42 32 h12 l-3 8 h-6 z" fill="none"/><rect x="22" y="68" width="16" height="10" rx="2" fill="' + K + '"/></g>' +
      '<g stroke="' + K + '" stroke-width="1.6"><circle cx="28" cy="50" r="7" fill="' + INK.pink + '"/><circle cx="44" cy="52" r="7" fill="' + INK.choco + '"/><circle cx="60" cy="50" r="7" fill="' + INK.lavender + '"/><circle cx="36" cy="42" r="6" fill="' + INK.mint + '"/></g>' +
      '<circle cx="30" cy="73" r="2.6" fill="' + INK.yellow + '"/><circle cx="33" cy="73" r="1" fill="' + K + '"/>'; },
    fridge: function () { return '<g ' + FLOOR + '><rect x="24" y="12" width="52" height="80" rx="5"/></g>' +
      '<g ' + S + '><rect x="20" y="10" width="52" height="80" rx="5" fill="' + INK.paper + '"/><path d="M20 46 h52"/><path d="M62 18 v18 M62 52 v18" stroke-width="4"/></g>' +
      '<g stroke="' + K + '" stroke-width="1.6"><circle cx="34" cy="26" r="5" fill="' + INK.rose + '"/><path d="M30 26 h8 M34 22 v8" stroke-width="1.4"/><rect x="44" y="22" width="10" height="8" rx="1.6" fill="' + INK.yellow + '"/><path d="M26 56 q6 -6 12 0 q-6 6 -12 0 z" fill="' + INK.mint + '"/></g>'; },
    table: function () { return '<g ' + FLOOR + '><rect x="16" y="40" width="72" height="10" rx="4"/></g>' +
      '<g ' + S + '><rect x="12" y="36" width="76" height="9" rx="4" fill="' + INK.brown + '"/><path d="M46 45 v34 h8 v-34" fill="' + shade(INK.brown, .8) + '"/><path d="M34 84 h32" fill="none"/><circle cx="62" cy="26" r="8" fill="' + INK.paper + '"/><path d="M70 24 q6 0 6 4 q0 4 -6 4" fill="none"/></g>' +
      '<path d="M60 14 q2 3 0 6 M64 14 q2 3 0 6" stroke="' + K + '" stroke-width="1.8" fill="none" opacity=".5"/>'; },
    tree: function () { return '<g ' + FLOOR + '><ellipse cx="58" cy="58" rx="38" ry="36"/></g>' +
      '<rect x="46" y="66" width="10" height="24" rx="4" fill="' + INK.brown + '" stroke="' + K + '" stroke-width="2.6"/>' +
      '<g ' + S + '><circle cx="50" cy="46" r="34" fill="' + INK.green + '"/></g>' +
      '<path d="M76 28 A34 34 0 0 1 24 70 C52 78 78 58 76 28 Z" fill="' + shade(INK.green, .78) + '"/>' +
      '<g fill="' + INK.rose + '" stroke="' + K + '" stroke-width="1.4"><circle cx="38" cy="36" r="4"/><circle cx="60" cy="28" r="4"/><circle cx="42" cy="56" r="4"/></g>' +
      '<circle cx="50" cy="46" r="34" fill="none" ' + S + '/>'; },
    armchair: function () { return '<g ' + FLOOR + '><rect x="24" y="28" width="52" height="60" rx="14"/></g>' +
      '<g ' + S + '><rect x="20" y="26" width="52" height="46" rx="13" fill="' + INK.purple + '"/><rect x="14" y="52" width="18" height="30" rx="8" fill="' + shade(INK.purple, .85) + '"/><rect x="60" y="52" width="18" height="30" rx="8" fill="' + shade(INK.purple, .85) + '"/><rect x="26" y="52" width="40" height="24" rx="9" fill="' + shade(INK.purple, .8) + '"/><path d="M28 34 h24" stroke="#fff" stroke-opacity=".4" stroke-width="3" fill="none"/></g>'; },
    rocker: function () { return '<g ' + FLOOR + '><rect x="28" y="14" width="44" height="66" rx="12"/></g>' +
      '<g ' + S + '><rect x="30" y="10" width="36" height="40" rx="11" fill="' + INK.brown + '"/><rect x="24" y="42" width="48" height="16" rx="7" fill="' + shade(INK.brown, .85) + '"/></g>' +
      '<path d="M22 78 Q50 92 78 78" fill="none" stroke="' + K + '" stroke-width="4.5" stroke-linecap="round"/><path d="M32 58 v16 M64 58 v16" stroke="' + K + '" stroke-width="3.4" stroke-linecap="round"/>' +
      '<path d="M36 20 h20" stroke="#fff" stroke-opacity=".4" stroke-width="3" stroke-linecap="round"/>'; },
    haybale: function () { return '<g ' + FLOOR + '><rect x="14" y="36" width="76" height="48" rx="16"/></g>' +
      '<g ' + S + '><rect x="10" y="32" width="76" height="48" rx="16" fill="' + INK.yellow + '"/><path d="M10 56 h76" fill="none" stroke="' + shade(INK.yellow, .78) + '" stroke-width="5"/></g>' +
      '<g stroke="' + K + '" stroke-width="1.8" fill="none" stroke-linecap="round"><path d="M20 44 q8 -4 16 0 M48 68 q8 -4 16 0 M60 42 q6 -3 12 1 M26 66 q6 -3 12 1"/></g>' +
      '<path d="M18 40 h24" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>'; },
    coffin: function () { return '<g ' + FLOOR + '><path d="M30 14 h40 l12 22 -12 58 h-40 l-12 -58 z"/></g>' +
      '<g ' + S + '><path d="M30 10 h40 l12 22 -12 58 h-40 l-12 -58 z" fill="' + INK.choco + '"/><path d="M36 20 h28 l8 16 -8 46 h-28 l-8 -46 z" fill="' + shade(INK.choco, .82) + '"/></g>' +
      '<g stroke="' + INK.yellow + '" stroke-width="3" stroke-linecap="round"><path d="M50 34 v20 M42 41 h16"/></g>'; },
    piano: function () { return '<g ' + FLOOR + '><path d="M14 30 h72 v50 h-72 z"/></g>' +
      '<g ' + S + '><path d="M10 26 C10 14 30 8 52 8 C78 8 88 20 88 34 L88 44 L10 44 Z" fill="' + K + '"/><rect x="10" y="44" width="78" height="18" fill="' + shade(K, 1.18) + '"/></g>' +
      '<g><rect x="16" y="48" width="66" height="10" rx="2" fill="' + INK.paper + '" stroke="' + K + '" stroke-width="1.8"/><g fill="' + K + '"><rect x="21" y="48" width="4" height="6"/><rect x="29" y="48" width="4" height="6"/><rect x="40" y="48" width="4" height="6"/><rect x="48" y="48" width="4" height="6"/><rect x="59" y="48" width="4" height="6"/><rect x="67" y="48" width="4" height="6"/></g></g>' +
      '<path d="M18 62 v20 M80 62 v20" stroke="' + K + '" stroke-width="4" stroke-linecap="round"/>'; },
    clock: function () { return '<g ' + FLOOR + '><rect x="28" y="10" width="44" height="84" rx="6"/></g>' +
      '<g ' + S + '><rect x="24" y="8" width="44" height="86" rx="6" fill="' + INK.brown + '"/><circle cx="46" cy="26" r="14" fill="' + INK.paper + '"/><rect x="32" y="48" width="28" height="36" rx="4" fill="' + shade(INK.brown, .8) + '"/></g>' +
      '<g stroke="' + K + '" stroke-width="2" stroke-linecap="round"><path d="M46 26 v-8 M46 26 l6 4"/></g>' +
      '<path d="M46 52 v22" stroke="' + INK.yellow + '" stroke-width="3.4" stroke-linecap="round"/><circle cx="46" cy="78" r="5" fill="' + INK.yellow + '" stroke="' + K + '" stroke-width="1.6"/>'; },
    armor: function () { return '<g ' + FLOOR + '><ellipse cx="50" cy="88" rx="26" ry="6"/></g>' +
      '<g ' + S + '><circle cx="50" cy="18" r="11" fill="' + INK.steel + '"/><path d="M38 32 C38 26 62 26 62 32 L66 62 L34 62 Z" fill="' + INK.steel + '"/><path d="M34 62 h32 l-3 22 h-26 z" fill="' + shade(INK.steel, .85) + '"/><path d="M40 84 v8 M60 84 v8" stroke-width="4"/></g>' +
      '<path d="M44 14 h12" stroke="' + K + '" stroke-width="2.6" stroke-linecap="round"/><path d="M43 38 h14 M43 46 h14" stroke="' + shade(INK.steel, .7) + '" stroke-width="2.4" stroke-linecap="round"/>'; },
    cauldron: function () { return '<g ' + FLOOR + '><ellipse cx="50" cy="84" rx="32" ry="7"/></g>' +
      '<g ' + S + '><path d="M20 44 C20 72 32 84 50 84 C68 84 80 72 80 44 Z" fill="' + K + '"/><ellipse cx="50" cy="44" rx="30" ry="9" fill="' + shade(K, 1.25) + '"/><ellipse cx="50" cy="43" rx="24" ry="6" fill="' + INK.mint + '"/></g>' +
      '<g fill="' + INK.mint + '" stroke="' + K + '" stroke-width="1.4"><circle cx="40" cy="30" r="3.4"/><circle cx="52" cy="24" r="2.6"/><circle cx="60" cy="32" r="2.2"/></g>' +
      '<path d="M32 84 v6 M68 84 v6" stroke="' + K + '" stroke-width="4" stroke-linecap="round"/>'; }
  };
  function object(name, label) { var f = OBJ[name]; return f ? wrap(f(), label || name) : ''; }

  /* ---------- mascot: the tip ghost ---------- */
  function pigeon(opts) {
    opts = opts || {};
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="ghost">' +
      '<ellipse cx="60" cy="112" rx="28" ry="5" fill="#000" fill-opacity=".16"/>' +
      '<g transform="translate(4 5)" fill="' + INK.purple + '" opacity=".35"><path d="M60 14 C38 14 28 36 28 58 L28 92 q8 -11 16 0 q8 -11 16 0 q8 -11 16 0 q8 -11 16 0 L92 58 C92 36 82 14 60 14 Z"/></g>' +
      '<path d="M60 14 C38 14 28 36 28 58 L28 92 q8 -11 16 0 q8 -11 16 0 q8 -11 16 0 q8 -11 16 0 L92 58 C92 36 82 14 60 14 Z" fill="' + INK.paper + '" stroke="' + K + '" stroke-width="3" stroke-linejoin="round"/>' +
      '<path d="M34 52 q-10 6 -8 16 M86 52 q10 6 8 16" fill="none" stroke="' + K + '" stroke-width="3" stroke-linecap="round"/>' +
      '<ellipse cx="49" cy="52" rx="5" ry="7" fill="' + K + '"/><ellipse cx="71" cy="52" rx="5" ry="7" fill="' + K + '"/>' +
      '<circle cx="50.6" cy="49.6" r="1.6" fill="#fff"/><circle cx="72.6" cy="49.6" r="1.6" fill="#fff"/>' +
      '<path d="M53 68 q7 7 14 0" fill="none" stroke="' + K + '" stroke-width="2.6" stroke-linecap="round"/>' +
      '<g fill="' + INK.orange + '" fill-opacity=".55"><ellipse cx="40" cy="63" rx="4.8" ry="3"/><ellipse cx="80" cy="63" rx="4.8" ry="3"/></g>' +
      '<g stroke="' + K + '" stroke-width="2" stroke-linejoin="round" fill="' + INK.orange + '"><path d="M60 16 L48 8 L50 23 Z"/><path d="M60 16 L72 8 L70 23 Z"/><circle cx="60" cy="15" r="4.2" fill="' + INK.red + '"/></g>' +
      (opts.lens ? '<g ' + S + ' fill="none"><circle cx="100" cy="86" r="12" fill="#ffffff" fill-opacity=".5"/><path d="M92 95 l-12 12" stroke-width="6"/></g>' : '') +
      '</svg>';
  }

  /* ---------- stamp ---------- */
  function stamp(text, color) {
    var c = INK[color] || INK.rose;
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 80" role="img" aria-label="' + text + '"><g transform="rotate(-6 130 40)">' +
      '<rect x="8" y="10" width="244" height="60" rx="16" fill="none" stroke="' + c + '" stroke-width="5"/>' +
      '<rect x="16" y="18" width="228" height="44" rx="10" fill="none" stroke="' + c + '" stroke-width="2"/>' +
      '<text x="130" y="52" text-anchor="middle" font-family="Baloo 2, Nunito, sans-serif" font-weight="800" font-size="30" fill="' + c + '" letter-spacing="1.5">' + text + '</text></g></svg>';
  }

  root.GQArt = { INK: INK, SKIN: SKIN, HAIR: HAIR, portrait: portrait, object: object, objects: Object.keys(OBJ), pigeon: pigeon, stamp: stamp };
})(typeof window !== 'undefined' ? window : globalThis);
