/* Palette roles used by portraits and player chips.
   FALLBACK_LOOK is only a safety net; verify.mjs requires a LOOKS entry for every cast member. */
var BGS=['yellow','pink','teal','orange','green','blue','yellow'];
var PCOL=['#FFE14D','#FF48B0','#7FD1C9','#FF6C2F','#5FD39A','#8AA6F2'];
var FALLBACK_LOOK=[0,'short','d',[],'blue','smile'];

if (typeof module !== 'undefined') module.exports = { BGS: BGS, PCOL: PCOL, FALLBACK_LOOK: FALLBACK_LOOK };
