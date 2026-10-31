/* Yamada a Quadretti — cast look specs for the SVG fallback portraits.
   Painted portraits live in portraits.json; these specs drive the vector fallback
   and any square/round crops.
   spec: [skinIdx, hairStyle, hairColorKey, [accessories], shirtInk, expression, bodyType] */
var LOOKS = {
  'Akane Kinoshita': [0, 'wavy', 'y', ['earrings'], 'peach', 'smile'],
  'Akito Yamada': [0, 'medium', 'k', ['headphones'], 'blue', 'flat', 'thin'],
  'Runa Sasaki': [0, 'hime', 'a', ['headdress'], 'red', 'flat'],
  'Eita Sasaki': [0, 'long', 'y', [], 'mint', 'smile'],
  'Choco': [1, 'plush', 'choco', ['ribbon'], 'brown', 'smile'],
  'Momoko Maeda': [0, 'bob', 'v', [], 'purple', 'smile'],
  'Takezo Kamota': [2, 'short', 's', ['apron', 'towel'], 'green', 'smile'],
  'Yukari Tsubaki': [0, 'pigtails', 'k', ['glasses'], 'navy', 'smile'],
  'Rurihime': [0, 'wavy', 'v', ['bunnyears', 'ribbon'], 'pink', 'smile']
};

if (typeof module !== 'undefined') module.exports = LOOKS;
