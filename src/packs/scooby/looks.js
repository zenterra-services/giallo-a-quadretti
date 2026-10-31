/* ============================================================
   SCOOBY A QUADRETTI — LOOKS (chi è chi)
   [skin, hairStyle, hairColor, [accessories], shirtInk, expression]
   ============================================================ */
var LOOKS = {
  'Scooby-Doo':        [2, 'short', 'choco', ['collar'], 'brown', 'smile'],
  'Shaggy Rogers':     [0, 'shaggy', 'b', ['goatee'], 'green', 'smile', 'thin'],
  'Fred Jones':        [0, 'short', 'y', ['ascot'], 'paper', 'smile'],
  'Daphne Blake':      [0, 'wavy', 'o', ['headband'], 'purple', 'smile'],
  'Velma Dinkley':     [0, 'bob', 'b', ['glasses'], 'orange', 'smile'],
  'Madame Zora':       [1, 'wavy', 'k', ['earrings'], 'teal', 'smile'],
  'Groundskeeper Gus': [2, 'bald', 's', ['beard'], 'navy', 'smile'],
  'Widow Ravenna':     [0, 'long', 's', ['streak', 'earrings'], 'purple', 'flat'],
  'Scooby Snacks':     [1, 'plush', 'biscuit', ['ribbon'], 'yellow', 'smile']
};

if (typeof module !== 'undefined') module.exports = LOOKS;
