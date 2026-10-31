/* Hungarian helper copy and ordinal words for this pack. */
var ORD_HU=['első','második','harmadik','negyedik','ötödik','hatodik','hetedik'];
var HU_TIPS=['Kezdd azzal, akinek pontos nyoma van, például egy sor vagy egy helyiség.','Soronként és oszloponként egy ember. Jelöld ✕-szel a lehetetlen mezőket.','Ha egy sorban csak egy szabad mező van, ott valakinek állnia kell.','A „mellett” csak ugyanabban a helyiségben érvényes. A fal elválaszt!','A végén Choco az utolsó szabad helyre kerül.'];
var HU_RULES=['Soronként és oszloponként pontosan egy ember.','Széken, kanapén, ágyon, padon és szőnyegen lehet állni. Más tárgyon nem.','„Mellett” = közvetlenül fölötte, alatta, balra vagy jobbra, ugyanabban a helyiségben.','Észak fent, dél lent, kelet jobbra, nyugat balra.','Choco az utolsó szabad mezőn van. Aki egyedül volt vele, az rejtette el.'];

/* Kid-friendly overrides for the engine's Hungarian helper lines. */
var PACK_HU={
  victim:'Choco, a céh plüssnyuszija. Egyedül volt azzal, aki elrejtette.',
  nope:'Nem! {n} nem volt Choco szobájában.',
  glVictim:'Choco, a plüssnyuszi',
  glKiller:'aki elrejtette',
  whoKiller:'Ki rejtette el Chocót?',
  solvedHu:'{n} rejtette el Chocót!'
};

if (typeof module !== 'undefined') module.exports = { ORD_HU: ORD_HU, HU_TIPS: HU_TIPS, HU_RULES: HU_RULES, PACK_HU: PACK_HU };
