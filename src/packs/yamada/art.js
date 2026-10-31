/* Yamada a Quadretti — soft pastel anime art. Original SVG shapes only;
   character likenesses are established by the painted portraits in portraits.json. */
(function (root) {
  var INK = {
    pink: '#FF9DBD', rose: '#E86A8E', red: '#D95A6E', peach: '#FFC09B', orange: '#F2A56B',
    yellow: '#FFD98E', cream: '#FFF3DA', mint: '#9ADFC3', green: '#7FBF8E', teal: '#7FC4C9',
    sky: '#A8CFF0', blue: '#7FA8DC', navy: '#5B6B9C', lavender: '#C9B2E8', purple: '#A98AD4',
    brown: '#A0785A', choco: '#7A5340', black: '#4A3A44', paper: '#FFF9F4'
  };
  var SKIN = ['#FBE3CF', '#F2CDA8', '#DFA87E', '#B97F56', '#8A5A3B', '#F7D9BE'];
  var HAIR = { k: '#332A33', d: '#4A3628', b: '#8A6242', y: '#E8BE78', a: '#D9C29A', r: '#C96B4A', g: '#9C9CA4', w: '#F0EBE0', p: '#F2A5C0', v: '#9B7EC8', u: '#3A4A6B', s: '#8A857E', choco: '#7A5340' };
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

  /* ---------- Choco, the guild plushie ---------- */
  function plushFigure(opts) {
    var B = HAIR.choco, BD = shade(B, 0.7), C = INK.cream;
    var body =
      '<ellipse cx="60" cy="118" rx="34" ry="26" fill="' + B + '"/>' +
      '<ellipse cx="60" cy="122" rx="20" ry="15" fill="' + C + '"/>' +
      '<g stroke="' + K + '" stroke-width="3" stroke-linejoin="round" fill="' + B + '">' +
      '<path d="M40 36 C30 4 42 -2 50 10 C55 18 54 30 52 38 Z"/>' +
      '<path d="M80 36 C90 4 78 -2 70 10 C65 18 66 30 68 38 Z"/></g>' +
      '<g fill="' + INK.pink + '"><path d="M44 30 C38 10 43 7 48 14 C51 19 50 28 49 33 Z"/><path d="M76 30 C82 10 77 7 72 14 C69 19 70 28 71 33 Z"/></g>' +
      '<circle cx="60" cy="62" r="30" fill="' + B + '"/>' +
      '<ellipse cx="60" cy="74" rx="15" ry="10" fill="' + C + '"/>' +
      '<circle cx="48" cy="60" r="4.6" fill="' + K + '"/><circle cx="72" cy="60" r="4.6" fill="' + K + '"/>' +
      '<circle cx="49.6" cy="58.4" r="1.5" fill="#fff"/><circle cx="73.6" cy="58.4" r="1.5" fill="#fff"/>' +
      '<ellipse cx="60" cy="70" rx="3.4" ry="2.6" fill="' + INK.rose + '"/>' +
      '<path d="M60 72 q0 4 -4 5 M60 72 q0 4 4 5" fill="none" stroke="' + K + '" stroke-width="2.2" stroke-linecap="round"/>' +
      '<g fill="' + INK.pink + '" fill-opacity=".45"><ellipse cx="40" cy="70" rx="5.4" ry="3.2"/><ellipse cx="80" cy="70" rx="5.4" ry="3.2"/></g>' +
      '<g stroke="' + K + '" stroke-width="2.2" stroke-linejoin="round" fill="' + INK.rose + '"><path d="M60 96 L46 88 L48 104 Z"/><path d="M60 96 L74 88 L72 104 Z"/><circle cx="60" cy="96" r="4.6" fill="' + INK.red + '"/></g>' +
      '<path d="M36 108 q-6 6 -2 12 M84 108 q6 6 2 12" fill="none" stroke="' + BD + '" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="4 4"/>';
    var keyline = '<g fill="none" stroke="' + K + '" stroke-width="3" stroke-linejoin="round"><ellipse cx="60" cy="118" rx="34" ry="26"/><circle cx="60" cy="62" r="30"/></g>';
    if (opts.crop === 'head') {
      var cid = id('cl');
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 16 100 104" role="img" aria-label="' + (opts.label || '') + '">' +
        '<defs><clipPath id="' + cid + '"><circle cx="60" cy="66" r="44"/></clipPath></defs>' +
        '<circle cx="60" cy="70" r="47" fill="' + shade(INK[opts.bg] || INK.yellow, 0.72) + '" stroke="' + K + '" stroke-width="3"/>' +
        '<circle cx="60" cy="66" r="47" fill="#fff" stroke="' + K + '" stroke-width="3"/>' +
        '<circle cx="60" cy="66" r="44" fill="' + (INK[opts.bg] || INK.yellow) + '"/>' +
        '<g clip-path="url(#' + cid + ')">' + body + keyline + '</g></svg>';
    }
    var sil = '<path d="M40 36 C30 4 42 -2 50 10 C55 18 54 30 52 38 Z"/><path d="M80 36 C90 4 78 -2 70 10 C65 18 66 30 68 38 Z"/><circle cx="60" cy="62" r="30"/><ellipse cx="60" cy="118" rx="34" ry="26"/>';
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
      '<circle cx="50" cy="46" r="34" fill="none" ' + S + '/>'; }
  };
  function object(name, label) { var f = OBJ[name]; return f ? wrap(f(), label || name) : ''; }

  /* ---------- mascot: Choco, the guild plushie bunny ---------- */
  function pigeon(opts) {
    opts = opts || {};
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Choco">' +
      '<ellipse cx="60" cy="112" rx="30" ry="5" fill="#000" fill-opacity=".16"/>' +
      '<g transform="translate(4 4)" fill="' + INK.pink + '" opacity=".4"><ellipse cx="58" cy="80" rx="32" ry="26"/><circle cx="60" cy="44" r="24"/></g>' +
      '<g stroke="' + K + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">' +
      '<path d="M44 26 C34 -4 46 -8 54 4 C58 12 58 24 56 32 Z" fill="' + INK.choco + '"/>' +
      '<path d="M76 26 C86 -4 74 -8 66 4 C62 12 62 24 64 32 Z" fill="' + INK.choco + '"/>' +
      '<ellipse cx="58" cy="82" rx="32" ry="26" fill="' + INK.choco + '"/>' +
      '<ellipse cx="58" cy="86" rx="18" ry="13" fill="' + INK.cream + '"/>' +
      '<circle cx="60" cy="46" r="24" fill="' + INK.choco + '"/>' +
      '<ellipse cx="60" cy="56" rx="12" ry="8" fill="' + INK.cream + '"/></g>' +
      '<circle cx="51" cy="44" r="3.8" fill="' + K + '"/><circle cx="69" cy="44" r="3.8" fill="' + K + '"/>' +
      '<circle cx="52.2" cy="42.8" r="1.2" fill="#fff"/><circle cx="70.2" cy="42.8" r="1.2" fill="#fff"/>' +
      '<ellipse cx="60" cy="52" rx="2.8" ry="2.2" fill="' + INK.rose + '"/>' +
      '<path d="M60 54 q0 3.4 -3.4 4.2 M60 54 q0 3.4 3.4 4.2" fill="none" stroke="' + K + '" stroke-width="2" stroke-linecap="round"/>' +
      '<g fill="' + INK.pink + '" fill-opacity=".5"><ellipse cx="44" cy="52" rx="4.6" ry="2.8"/><ellipse cx="76" cy="52" rx="4.6" ry="2.8"/></g>' +
      '<g stroke="' + K + '" stroke-width="2" stroke-linejoin="round" fill="' + INK.rose + '"><path d="M58 74 L46 67 L48 81 Z"/><path d="M58 74 L70 67 L68 81 Z"/><circle cx="58" cy="74" r="4" fill="' + INK.red + '"/></g>' +
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
