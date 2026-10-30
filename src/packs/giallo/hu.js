/* Hungarian helper copy and ordinal words for this pack. */
var ORD_HU=['első','második','harmadik','negyedik','ötödik','hatodik','hetedik'];
var HU_TIPS=['Kezdd azzal, akinek pontos nyoma van, például egy sor vagy egy szoba.','Soronként és oszloponként egy ember. Jelöld ✕-szel a lehetetlen mezőket.','Ha egy sorban csak egy szabad mező van, ott valakinek állnia kell.','A „mellett” csak ugyanabban a szobában érvényes. A fal elválaszt!','A végén az áldozat az utolsó szabad mezőre kerül.'];
var HU_RULES=['Soronként és oszloponként pontosan egy ember.','Széken, kanapén, ágyon és szőnyegen lehet állni. Más tárgyon nem.','„Mellett” = közvetlenül fölötte, alatta, balra vagy jobbra, ugyanabban a szobában.','Észak fent, dél lent, kelet jobbra, nyugat balra.','Az áldozat az utolsó szabad mezőn van. Aki egyedül volt vele, az a gyilkos.'];

if (typeof module !== 'undefined') module.exports = { ORD_HU: ORD_HU, HU_TIPS: HU_TIPS, HU_RULES: HU_RULES };
