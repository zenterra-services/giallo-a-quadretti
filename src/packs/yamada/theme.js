/* Yamada a Quadretti — soft pastel anime palette. */
var BGS=['pink','sky','mint','yellow','lavender','peach','teal'];
var PCOL=['#FF9DBD','#A8CFF0','#9ADFC3','#FFD98E','#C9B2E8','#FFC09B'];
var FALLBACK_LOOK=[0,'short','d',[],'blue','smile'];
var SHORT_NAMES={'Akane Kinoshita':'Akane','Akito Yamada':'Yamada','Runa Sasaki':'Runa','Eita Sasaki':'Eita','Momoko Maeda':'Momoko','Takezo Kamota':'Takezo','Yukari Tsubaki':'Yukari'};

if (typeof module !== 'undefined') module.exports = { BGS: BGS, PCOL: PCOL, FALLBACK_LOOK: FALLBACK_LOOK, SHORT_NAMES: SHORT_NAMES };
