/* Hungarian helper copy and ordinal words for this pack. */
var ORD_HU=['első','második','harmadik','negyedik','ötödik','hatodik','hetedik'];
var HU_TIPS=['Kezdd azzal, akinek pontos nyoma van, például egy sor vagy egy helyiség.','Soronként és oszloponként egy ember. Jelöld ✕-szel a lehetetlen mezőket.','Ha egy sorban csak egy szabad mező van, ott valakinek állnia kell.','A „mellett” csak ugyanabban a helyiségben érvényes. A fal elválaszt!','A végén a nasidoboz az utolsó szabad helyre kerül. Zoinks!'];
var HU_RULES=['Soronként és oszloponként pontosan egy ember.','Széken, kanapén, ágyon, padon, szőnyegen, fotelben, hintaszéken, szénabálán és koporsón lehet lenni. Más tárgyon nem.','„Mellett” = közvetlenül fölötte, alatta, balra vagy jobbra, ugyanabban a helyiségben.','Észak fent, dél lent, kelet jobbra, nyugat balra.','A nasidoboz az utolsó szabad mezőn van. Aki egyedül volt vele, az vitte el.'];

/* Kid-friendly overrides for the engine's Hungarian helper lines. */
var PACK_HU={
  victim:'A Scooby Snacks doboza. Egyedül volt azzal, aki elvitte.',
  nope:'Nem! {n} nem volt a doboz szobájában.',
  glVictim:'a nasidoboz',
  glKiller:'aki elvitte',
  whoKiller:'Ki vitte el a Scooby Snackset?',
  solvedHu:'{n} vitte el a Scooby Snackset!'
};

if (typeof module !== 'undefined') module.exports = { ORD_HU: ORD_HU, HU_TIPS: HU_TIPS, HU_RULES: HU_RULES, PACK_HU: PACK_HU };
