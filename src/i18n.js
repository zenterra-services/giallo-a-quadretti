/* Giallo a Quadretti — languages. ⟦…⟧ marks the key words that get the highlighter. */
var LANGS = {
  it: { name: 'Italiano', voice: 'it-IT', learn: "impara l'italiano" },
  en: { name: 'English', voice: 'en-GB', learn: 'learn English' },
  de: { name: 'Deutsch', voice: 'de-DE', learn: 'lerne Deutsch' },
  fr: { name: 'Français', voice: 'fr-FR', learn: 'apprends le français' },
  es: { name: 'Español', voice: 'es-ES', learn: 'aprende español' }
};

/* room name → [name, in-phrase] per language */
var ROOMS = {
  'Cucina': { it: ['Cucina', 'in ⟦cucina⟧'], en: ['Kitchen', 'in the ⟦kitchen⟧'], de: ['Küche', 'in der ⟦Küche⟧'], fr: ['Cuisine', 'dans la ⟦cuisine⟧'], es: ['Cocina', 'en la ⟦cocina⟧'] },
  'Salotto': { it: ['Salotto', 'in ⟦salotto⟧'], en: ['Living room', 'in the ⟦living room⟧'], de: ['Wohnzimmer', 'im ⟦Wohnzimmer⟧'], fr: ['Salon', 'dans le ⟦salon⟧'], es: ['Salón', 'en el ⟦salón⟧'] },
  'Camera': { it: ['Camera', 'in ⟦camera⟧'], en: ['Bedroom', 'in the ⟦bedroom⟧'], de: ['Schlafzimmer', 'im ⟦Schlafzimmer⟧'], fr: ['Chambre', 'dans la ⟦chambre⟧'], es: ['Dormitorio', 'en el ⟦dormitorio⟧'] },
  'Bagno': { it: ['Bagno', 'in ⟦bagno⟧'], en: ['Bathroom', 'in the ⟦bathroom⟧'], de: ['Bad', 'im ⟦Bad⟧'], fr: ['Salle de bain', 'dans la ⟦salle de bain⟧'], es: ['Baño', 'en el ⟦baño⟧'] },
  'Giardino': { it: ['Giardino', 'in ⟦giardino⟧'], en: ['Garden', 'in the ⟦garden⟧'], de: ['Garten', 'im ⟦Garten⟧'], fr: ['Jardin', 'dans le ⟦jardin⟧'], es: ['Jardín', 'en el ⟦jardín⟧'] },
  'Orto': { it: ['Orto', "nell'⟦orto⟧"], en: ['Vegetable patch', 'in the ⟦vegetable patch⟧'], de: ['Gemüsegarten', 'im ⟦Gemüsegarten⟧'], fr: ['Potager', 'dans le ⟦potager⟧'], es: ['Huerto', 'en el ⟦huerto⟧'] },
  'Portico': { it: ['Portico', 'sotto il ⟦portico⟧'], en: ['Porch', 'on the ⟦porch⟧'], de: ['Veranda', 'auf der ⟦Veranda⟧'], fr: ['Porche', 'sous le ⟦porche⟧'], es: ['Porche', 'en el ⟦porche⟧'] },
  'Serra': { it: ['Serra', 'nella ⟦serra⟧'], en: ['Greenhouse', 'in the ⟦greenhouse⟧'], de: ['Gewächshaus', 'im ⟦Gewächshaus⟧'], fr: ['Serre', 'dans la ⟦serre⟧'], es: ['Invernadero', 'en el ⟦invernadero⟧'] },
  'Forno': { it: ['Forno', 'al ⟦forno⟧'], en: ['Oven corner', 'by the ⟦oven⟧'], de: ['Ofenecke', 'am ⟦Ofen⟧'], fr: ['Coin du four', 'près du ⟦four⟧'], es: ['Rincón del horno', 'junto al ⟦horno⟧'] },
  'Sala': { it: ['Sala', 'in ⟦sala⟧'], en: ['Dining room', 'in the ⟦dining room⟧'], de: ['Gastraum', 'im ⟦Gastraum⟧'], fr: ['Salle', 'dans la ⟦salle⟧'], es: ['Comedor', 'en el ⟦comedor⟧'] },
  'Dispensa': { it: ['Dispensa', 'in ⟦dispensa⟧'], en: ['Pantry', 'in the ⟦pantry⟧'], de: ['Vorratskammer', 'in der ⟦Vorratskammer⟧'], fr: ['Garde-manger', 'dans le ⟦garde-manger⟧'], es: ['Despensa', 'en la ⟦despensa⟧'] },
  'Aula': { it: ['Aula', 'in ⟦aula⟧'], en: ['Classroom', 'in the ⟦classroom⟧'], de: ['Klassenzimmer', 'im ⟦Klassenzimmer⟧'], fr: ['Salle de classe', 'dans la ⟦salle de classe⟧'], es: ['Aula', 'en el ⟦aula⟧'] },
  'Biblioteca': { it: ['Biblioteca', 'in ⟦biblioteca⟧'], en: ['Library', 'in the ⟦library⟧'], de: ['Bibliothek', 'in der ⟦Bibliothek⟧'], fr: ['Bibliothèque', 'dans la ⟦bibliothèque⟧'], es: ['Biblioteca', 'en la ⟦biblioteca⟧'] },
  'Corridoio': { it: ['Corridoio', 'nel ⟦corridoio⟧'], en: ['Corridor', 'in the ⟦corridor⟧'], de: ['Flur', 'im ⟦Flur⟧'], fr: ['Couloir', 'dans le ⟦couloir⟧'], es: ['Pasillo', 'en el ⟦pasillo⟧'] },
  'Palestra': { it: ['Palestra', 'in ⟦palestra⟧'], en: ['Gym', 'in the ⟦gym⟧'], de: ['Turnhalle', 'in der ⟦Turnhalle⟧'], fr: ['Gymnase', 'dans le ⟦gymnase⟧'], es: ['Gimnasio', 'en el ⟦gimnasio⟧'] },
  'Binario': { it: ['Binario', 'sul ⟦binario⟧'], en: ['Platform', 'on the ⟦platform⟧'], de: ['Bahnsteig', 'am ⟦Bahnsteig⟧'], fr: ['Quai', 'sur le ⟦quai⟧'], es: ['Andén', 'en el ⟦andén⟧'] },
  'Bar': { it: ['Bar', 'al ⟦bar⟧'], en: ['Café', 'in the ⟦café⟧'], de: ['Café', 'im ⟦Café⟧'], fr: ['Café', 'au ⟦café⟧'], es: ['Cafetería', 'en la ⟦cafetería⟧'] },
  "Sala d'attesa": { it: ["Sala d'attesa", "in ⟦sala d'attesa⟧"], en: ['Waiting room', 'in the ⟦waiting room⟧'], de: ['Wartesaal', 'im ⟦Wartesaal⟧'], fr: ["Salle d'attente", "dans la ⟦salle d'attente⟧"], es: ['Sala de espera', 'en la ⟦sala de espera⟧'] },
  'Biglietteria': { it: ['Biglietteria', 'in ⟦biglietteria⟧'], en: ['Ticket office', 'at the ⟦ticket office⟧'], de: ['Fahrkartenschalter', 'am ⟦Fahrkartenschalter⟧'], fr: ['Guichet', 'au ⟦guichet⟧'], es: ['Taquilla', 'en la ⟦taquilla⟧'] },
  'Torre': { it: ['Torre', 'nella ⟦torre⟧'], en: ['Tower', 'in the ⟦tower⟧'], de: ['Turm', 'im ⟦Turm⟧'], fr: ['Tour', 'dans la ⟦tour⟧'], es: ['Torre', 'en la ⟦torre⟧'] },
  'Cappella': { it: ['Cappella', 'nella ⟦cappella⟧'], en: ['Chapel', 'in the ⟦chapel⟧'], de: ['Kapelle', 'in der ⟦Kapelle⟧'], fr: ['Chapelle', 'dans la ⟦chapelle⟧'], es: ['Capilla', 'en la ⟦capilla⟧'] },
  'Salone': { it: ['Salone', 'nel ⟦salone⟧'], en: ['Great hall', 'in the ⟦great hall⟧'], de: ['Rittersaal', 'im ⟦Rittersaal⟧'], fr: ['Grande salle', 'dans la ⟦grande salle⟧'], es: ['Gran salón', 'en el ⟦gran salón⟧'] },
  'Cantina': { it: ['Cantina', 'in ⟦cantina⟧'], en: ['Cellar', 'in the ⟦cellar⟧'], de: ['Keller', 'im ⟦Keller⟧'], fr: ['Cave', 'dans la ⟦cave⟧'], es: ['Bodega', 'en la ⟦bodega⟧'] },
  'Lago': { it: ['Lago', 'al ⟦lago⟧'], en: ['Lake', 'at the ⟦lake⟧'], de: ['See', 'am ⟦See⟧'], fr: ['Lac', 'au ⟦lac⟧'], es: ['Lago', 'en el ⟦lago⟧'] },
  'Bosco': { it: ['Bosco', 'nel ⟦bosco⟧'], en: ['Woods', 'in the ⟦woods⟧'], de: ['Wald', 'im ⟦Wald⟧'], fr: ['Bois', 'dans le ⟦bois⟧'], es: ['Bosque', 'en el ⟦bosque⟧'] },
  'Falò': { it: ['Falò', 'al ⟦falò⟧'], en: ['Campfire', 'at the ⟦campfire⟧'], de: ['Lagerfeuer', 'am ⟦Lagerfeuer⟧'], fr: ['Feu de camp', 'près du ⟦feu de camp⟧'], es: ['Hoguera', 'junto a la ⟦hoguera⟧'] },
  'Tenda': { it: ['Tenda', 'in ⟦tenda⟧'], en: ['Tent', 'in the ⟦tent⟧'], de: ['Zelt', 'im ⟦Zelt⟧'], fr: ['Tente', 'dans la ⟦tente⟧'], es: ['Tienda de campaña', 'en la ⟦tienda de campaña⟧'] },
  'Prato': { it: ['Prato', 'sul ⟦prato⟧'], en: ['Meadow', 'in the ⟦meadow⟧'], de: ['Wiese', 'auf der ⟦Wiese⟧'], fr: ['Pré', 'dans le ⟦pré⟧'], es: ['Prado', 'en el ⟦prado⟧'] },
  'Roulotte': { it: ['Roulotte', 'nella ⟦roulotte⟧'], en: ['Caravan', 'in the ⟦caravan⟧'], de: ['Wohnwagen', 'im ⟦Wohnwagen⟧'], fr: ['Caravane', 'dans la ⟦caravane⟧'], es: ['Caravana', 'en la ⟦caravana⟧'] },
  'Ingresso': { it: ['Ingresso', "all'⟦ingresso⟧"], en: ['Entrance', 'at the ⟦entrance⟧'], de: ['Eingang', 'am ⟦Eingang⟧'], fr: ['Entrée', "à l'⟦entrée⟧"], es: ['Entrada', 'en la ⟦entrada⟧'] },
  'Sala egizia': { it: ['Sala egizia', 'nella ⟦sala egizia⟧'], en: ['Egyptian room', 'in the ⟦Egyptian room⟧'], de: ['Ägyptischer Saal', 'im ⟦Ägyptischen Saal⟧'], fr: ['Salle égyptienne', 'dans la ⟦salle égyptienne⟧'], es: ['Sala egipcia', 'en la ⟦sala egipcia⟧'] },
  'Sala dei quadri': { it: ['Sala dei quadri', 'nella ⟦sala dei quadri⟧'], en: ['Painting gallery', 'in the ⟦painting gallery⟧'], de: ['Gemäldesaal', 'im ⟦Gemäldesaal⟧'], fr: ['Galerie de peinture', 'dans la ⟦galerie de peinture⟧'], es: ['Sala de pinturas', 'en la ⟦sala de pinturas⟧'] },
  'Cortile': { it: ['Cortile', 'in ⟦cortile⟧'], en: ['Courtyard', 'in the ⟦courtyard⟧'], de: ['Innenhof', 'im ⟦Innenhof⟧'], fr: ['Cour', 'dans la ⟦cour⟧'], es: ['Patio', 'en el ⟦patio⟧'] },
  'Magazzino': { it: ['Magazzino', 'in ⟦magazzino⟧'], en: ['Storeroom', 'in the ⟦storeroom⟧'], de: ['Lager', 'im ⟦Lager⟧'], fr: ['Réserve', 'dans la ⟦réserve⟧'], es: ['Almacén', 'en el ⟦almacén⟧'] },
  'Negozio': { it: ['Negozio', 'nel ⟦negozio⟧'], en: ['Gift shop', 'in the ⟦gift shop⟧'], de: ['Museumsladen', 'im ⟦Museumsladen⟧'], fr: ['Boutique', 'dans la ⟦boutique⟧'], es: ['Tienda', 'en la ⟦tienda⟧'] }
};

/* objects: n = word with article (glossary), on/by = phrase used in clues */
var OBJL = {
  it: { sedia: ['la sedia', 'su una ⟦sedia⟧'], divano: ['il divano', 'su un ⟦divano⟧'], tappeto: ['il tappeto', 'su un ⟦tappeto⟧'], letto: ['il letto', 'su un ⟦letto⟧'],
        tavolo: ['il tavolo', '⟦accanto⟧ a un ⟦tavolo⟧'], scaffale: ['lo scaffale', '⟦accanto⟧ a uno ⟦scaffale⟧'], albero: ["l'albero", '⟦accanto⟧ a un ⟦albero⟧'], cespuglio: ['il cespuglio', '⟦accanto⟧ a un ⟦cespuglio⟧'],
        cassa: ['la cassa', '⟦accanto⟧ a una ⟦cassa⟧'], vaso: ['il vaso', '⟦accanto⟧ a un ⟦vaso⟧'], pianta: ['la pianta', '⟦accanto⟧ a una ⟦pianta⟧'], masso: ['il masso', '⟦accanto⟧ a un ⟦masso⟧'],
        frigo: ['il frigorifero', '⟦accanto⟧ a un ⟦frigorifero⟧'], forno: ['il forno', '⟦accanto⟧ a un ⟦forno⟧'] },
  en: { sedia: ['the chair', 'on a ⟦chair⟧'], divano: ['the sofa', 'on a ⟦sofa⟧'], tappeto: ['the rug', 'on a ⟦rug⟧'], letto: ['the bed', 'on a ⟦bed⟧'],
        tavolo: ['the table', '⟦next to⟧ a ⟦table⟧'], scaffale: ['the bookshelf', '⟦next to⟧ a ⟦bookshelf⟧'], albero: ['the tree', '⟦next to⟧ a ⟦tree⟧'], cespuglio: ['the bush', '⟦next to⟧ a ⟦bush⟧'],
        cassa: ['the crate', '⟦next to⟧ a ⟦crate⟧'], vaso: ['the vase', '⟦next to⟧ a ⟦vase⟧'], pianta: ['the plant', '⟦next to⟧ a ⟦plant⟧'], masso: ['the boulder', '⟦next to⟧ a ⟦boulder⟧'],
        frigo: ['the fridge', '⟦next to⟧ a ⟦fridge⟧'], forno: ['the oven', '⟦next to⟧ an ⟦oven⟧'] },
  de: { sedia: ['der Stuhl', 'auf einem ⟦Stuhl⟧'], divano: ['das Sofa', 'auf einem ⟦Sofa⟧'], tappeto: ['der Teppich', 'auf einem ⟦Teppich⟧'], letto: ['das Bett', 'auf einem ⟦Bett⟧'],
        tavolo: ['der Tisch', '⟦neben⟧ einem ⟦Tisch⟧'], scaffale: ['das Regal', '⟦neben⟧ einem ⟦Regal⟧'], albero: ['der Baum', '⟦neben⟧ einem ⟦Baum⟧'], cespuglio: ['der Busch', '⟦neben⟧ einem ⟦Busch⟧'],
        cassa: ['die Kiste', '⟦neben⟧ einer ⟦Kiste⟧'], vaso: ['die Vase', '⟦neben⟧ einer ⟦Vase⟧'], pianta: ['die Pflanze', '⟦neben⟧ einer ⟦Pflanze⟧'], masso: ['der Felsbrocken', '⟦neben⟧ einem ⟦Felsbrocken⟧'],
        frigo: ['der Kühlschrank', '⟦neben⟧ einem ⟦Kühlschrank⟧'], forno: ['der Ofen', '⟦neben⟧ einem ⟦Ofen⟧'] },
  fr: { sedia: ['la chaise', 'sur une ⟦chaise⟧'], divano: ['le canapé', 'sur un ⟦canapé⟧'], tappeto: ['le tapis', 'sur un ⟦tapis⟧'], letto: ['le lit', 'sur un ⟦lit⟧'],
        tavolo: ['la table', "⟦à côté⟧ d'une ⟦table⟧"], scaffale: ["l'étagère", "⟦à côté⟧ d'une ⟦étagère⟧"], albero: ["l'arbre", "⟦à côté⟧ d'un ⟦arbre⟧"], cespuglio: ['le buisson', "⟦à côté⟧ d'un ⟦buisson⟧"],
        cassa: ['la caisse', "⟦à côté⟧ d'une ⟦caisse⟧"], vaso: ['le vase', "⟦à côté⟧ d'un ⟦vase⟧"], pianta: ['la plante', "⟦à côté⟧ d'une ⟦plante⟧"], masso: ['le rocher', "⟦à côté⟧ d'un ⟦rocher⟧"],
        frigo: ['le frigo', "⟦à côté⟧ d'un ⟦frigo⟧"], forno: ['le four', "⟦à côté⟧ d'un ⟦four⟧"] },
  es: { sedia: ['la silla', 'en una ⟦silla⟧'], divano: ['el sofá', 'en un ⟦sofá⟧'], tappeto: ['la alfombra', 'sobre una ⟦alfombra⟧'], letto: ['la cama', 'en una ⟦cama⟧'],
        tavolo: ['la mesa', '⟦junto a⟧ una ⟦mesa⟧'], scaffale: ['la estantería', '⟦junto a⟧ una ⟦estantería⟧'], albero: ['el árbol', '⟦junto a⟧ un ⟦árbol⟧'], cespuglio: ['el arbusto', '⟦junto a⟧ un ⟦arbusto⟧'],
        cassa: ['la caja', '⟦junto a⟧ una ⟦caja⟧'], vaso: ['el jarrón', '⟦junto a⟧ un ⟦jarrón⟧'], pianta: ['la planta', '⟦junto a⟧ una ⟦planta⟧'], masso: ['la roca', '⟦junto a⟧ una ⟦roca⟧'],
        frigo: ['la nevera', '⟦junto a⟧ una ⟦nevera⟧'], forno: ['el horno', '⟦junto a⟧ un ⟦horno⟧'] }
};
var SIT = { sedia: 1, divano: 1 };
var ORD = {
  it: { f: ['prima', 'seconda', 'terza', 'quarta', 'quinta', 'sesta', 'settima'], last: 'ultima' },
  en: { f: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh'], last: 'last' },
  de: { f: ['ersten', 'zweiten', 'dritten', 'vierten', 'fünften', 'sechsten', 'siebten'], last: 'letzten' },
  fr: { f: ['première', 'deuxième', 'troisième', 'quatrième', 'cinquième', 'sixième', 'septième'], last: 'dernière' },
  es: { f: ['primera', 'segunda', 'tercera', 'cuarta', 'quinta', 'sexta', 'séptima'], last: 'última' }
};
var vowel = function (s) { return /^[aeiouhàèéìòùâêîôûäöüy]/i.test(s); };

/* clue sentence: kind, gender ('m'|'f'), args → string with ⟦⟧ */
var CLUE = {
  it: function (k, g, a) { var F = g === 'f';
    switch (k) {
      case 'room': return 'Era ' + a.inr + '.';
      case 'notroom': return '⟦Non⟧ era ' + a.inr + '.';
      case 'on': return SIT[a.o] ? 'Era ' + (F ? 'seduta' : 'seduto') + ' ' + a.on + '.' : 'Era ' + a.on + '.';
      case 'onlyon': return "Era ⟦l'unica persona⟧ " + a.on + '.';
      case 'by': return 'Era ' + a.on + '.';
      case 'row': return 'Era ' + (a.last ? "nell'⟦ultima riga⟧" : 'nella ⟦' + a.ord + ' riga⟧') + '.';
      case 'col': return 'Era ' + (a.last ? "nell'⟦ultima colonna⟧" : 'nella ⟦' + a.ord + ' colonna⟧') + '.';
      case 'corner': return 'Era in un ⟦angolo⟧ della griglia.';
      case 'alone': return 'Era ⟦' + (F ? 'sola' : 'solo') + '⟧.';
      case 'with': return 'Era nella ⟦stessa area⟧ di ' + a.who + '.';
      case 'dir': return 'Era a ⟦' + { n: 'nord', s: 'sud', e: 'est', o: 'ovest' }[a.d] + '⟧ di ' + a.who + '.';
      case 'victim': return "La ⟦vittima⟧. Era " + (F ? 'sola' : 'solo') + " con l'⟦assassino⟧.";
    } },
  en: function (k, g, a) { var P = g === 'f' ? 'She' : 'He';
    switch (k) {
      case 'room': return P + ' was ' + a.inr + '.';
      case 'notroom': return P + ' was ⟦not⟧ ' + a.inr + '.';
      case 'on': return SIT[a.o] ? P + ' was sitting ' + a.on + '.' : P + ' was ' + a.on + '.';
      case 'onlyon': return P + ' was ⟦the only person⟧ ' + a.on + '.';
      case 'by': return P + ' was ' + a.on + '.';
      case 'row': return P + ' was in the ⟦' + (a.last ? 'last' : a.ord) + ' row⟧.';
      case 'col': return P + ' was in the ⟦' + (a.last ? 'last' : a.ord) + ' column⟧.';
      case 'corner': return P + ' was in a ⟦corner⟧ of the grid.';
      case 'alone': return P + ' was ⟦alone⟧.';
      case 'with': return P + ' was in the ⟦same room⟧ as ' + a.who + '.';
      case 'dir': return P + ' was ⟦' + { n: 'north', s: 'south', e: 'east', o: 'west' }[a.d] + '⟧ of ' + a.who + '.';
      case 'victim': return 'The ⟦victim⟧. ' + P + ' was alone with the ⟦murderer⟧.';
    } },
  de: function (k, g, a) { var P = g === 'f' ? 'Sie' : 'Er';
    var verb = { sedia: 'saß', divano: 'saß', tappeto: 'stand', letto: 'lag' };
    switch (k) {
      case 'room': return P + ' war ' + a.inr + '.';
      case 'notroom': return P + ' war ⟦nicht⟧ ' + a.inr + '.';
      case 'on': return P + ' ' + (verb[a.o] || 'war') + ' ' + a.on + '.';
      case 'onlyon': return P + ' war ⟦die einzige Person⟧ ' + a.on + '.';
      case 'by': return P + ' stand ' + a.on + '.';
      case 'row': return P + ' war in der ⟦' + (a.last ? 'letzten' : a.ord) + ' Reihe⟧.';
      case 'col': return P + ' war in der ⟦' + (a.last ? 'letzten' : a.ord) + ' Spalte⟧.';
      case 'corner': return P + ' war in einer ⟦Ecke⟧ des Rasters.';
      case 'alone': return P + ' war ⟦allein⟧.';
      case 'with': return P + ' war im ⟦selben Raum⟧ wie ' + a.who + '.';
      case 'dir': return P + ' war ⟦' + { n: 'nördlich', s: 'südlich', e: 'östlich', o: 'westlich' }[a.d] + '⟧ von ' + a.who + '.';
      case 'victim': return 'Das ⟦Opfer⟧. ' + P + ' war allein mit dem ⟦Mörder⟧.';
    } },
  fr: function (k, g, a) { var F = g === 'f', P = F ? 'Elle' : 'Il';
    var de = function (n) { return (vowel(n) ? "d'" : 'de ') + n; }, que = function (n) { return (vowel(n) ? "qu'" : 'que ') + n; };
    switch (k) {
      case 'room': return P + ' était ' + a.inr + '.';
      case 'notroom': return P + " ⟦n'était pas⟧ " + a.inr + '.';
      case 'on': return SIT[a.o] ? P + ' était ' + (F ? 'assise' : 'assis') + ' ' + a.on + '.' : P + ' était ' + a.on + '.';
      case 'onlyon': return "C'était ⟦la seule personne⟧ " + a.on + '.';
      case 'by': return P + ' était ' + a.on + '.';
      case 'row': return P + ' était sur la ⟦' + (a.last ? 'dernière' : a.ord) + ' ligne⟧.';
      case 'col': return P + ' était dans la ⟦' + (a.last ? 'dernière' : a.ord) + ' colonne⟧.';
      case 'corner': return P + ' était dans un ⟦coin⟧ de la grille.';
      case 'alone': return P + ' était ⟦' + (F ? 'seule' : 'seul') + '⟧.';
      case 'with': return P + ' était dans la ⟦même pièce⟧ ' + que(a.who) + '.';
      case 'dir': return P + ' était ⟦' + { n: 'au nord', s: 'au sud', e: "à l'est", o: "à l'ouest" }[a.d] + '⟧ ' + de(a.who) + '.';
      case 'victim': return 'La ⟦victime⟧. ' + P + ' était ' + (F ? 'seule' : 'seul') + " avec l'⟦assassin⟧.";
    } },
  es: function (k, g, a) { var F = g === 'f';
    switch (k) {
      case 'room': return 'Estaba ' + a.inr + '.';
      case 'notroom': return '⟦No⟧ estaba ' + a.inr + '.';
      case 'on': return SIT[a.o] ? 'Estaba ' + (F ? 'sentada' : 'sentado') + ' ' + a.on + '.' : 'Estaba ' + a.on + '.';
      case 'onlyon': return 'Era ⟦la única persona⟧ ' + a.on + '.';
      case 'by': return 'Estaba ' + a.on + '.';
      case 'row': return 'Estaba en la ⟦' + (a.last ? 'última' : a.ord) + ' fila⟧.';
      case 'col': return 'Estaba en la ⟦' + (a.last ? 'última' : a.ord) + ' columna⟧.';
      case 'corner': return 'Estaba en una ⟦esquina⟧ de la cuadrícula.';
      case 'alone': return 'Estaba ⟦' + (F ? 'sola' : 'solo') + '⟧.';
      case 'with': return 'Estaba en la ⟦misma habitación⟧ que ' + a.who + '.';
      case 'dir': return 'Estaba ⟦' + { n: 'al norte', s: 'al sur', e: 'al este', o: 'al oeste' }[a.d] + '⟧ de ' + a.who + '.';
      case 'victim': return 'La ⟦víctima⟧. Estaba ' + (F ? 'sola' : 'solo') + ' con el ⟦asesino⟧.';
    } }
};

/* case titles and one-liners */
var CASEL = {
  'cucina-nonna': { en: ["At Grandma's", "Grandma's cake has vanished... and so has Mr Rossi."], de: ['Bei Oma', 'Omas Kuchen ist verschwunden... und Herr Rossi auch.'], fr: ['Chez mamie', 'Le gâteau de mamie a disparu... et monsieur Rossi aussi.'], es: ['En casa de la abuela', 'La tarta de la abuela ha desaparecido... y el señor Rossi también.'] },
  'giardino': { en: ['In the garden', 'Someone trampled the roses. Then things got worse.'], de: ['Im Garten', 'Jemand ist auf die Rosen getreten. Dann wurde es schlimmer.'], fr: ['Au jardin', "Quelqu'un a piétiné les roses. Puis le pire est arrivé."], es: ['En el jardín', 'Alguien pisoteó las rosas. Y luego pasó lo peor.'] },
  'pizzeria': { en: ['At the pizzeria', 'Margherita for everyone, except the chef.'], de: ['In der Pizzeria', 'Margherita für alle, nur nicht für den Koch.'], fr: ['À la pizzeria', 'Une margherita pour tout le monde, sauf pour le cuisinier.'], es: ['En la pizzería', 'Margarita para todos, menos para el cocinero.'] },
  'scuola': { en: ['At school', 'The bell rings. One teacher will not get up again.'], de: ['In der Schule', 'Es klingelt. Ein Lehrer steht nicht mehr auf.'], fr: ["À l'école", 'La cloche sonne. Un professeur ne se relèvera pas.'], es: ['En el colegio', 'Suena el timbre. Un profesor no volverá a levantarse.'] },
  'stazione': { en: ['At the station', 'The eight o’clock train left on time. The stationmaster did not.'], de: ['Am Bahnhof', 'Der Acht-Uhr-Zug fuhr pünktlich ab. Der Bahnhofsvorsteher nicht.'], fr: ['À la gare', 'Le train de huit heures est parti à l’heure. Le chef de gare, non.'], es: ['En la estación', 'El tren de las ocho salió puntual. El jefe de estación, no.'] },
  'castello': { en: ['In the castle', 'The castle ghost swears it knows nothing.'], de: ['Im Schloss', 'Das Schlossgespenst schwört, nichts zu wissen.'], fr: ['Au château', 'Le fantôme du château jure ne rien savoir.'], es: ['En el castillo', 'El fantasma del castillo jura que no sabe nada.'] },
  'campeggio': { en: ['At the campsite', 'Marshmallows on the fire, stars in the sky, and a mystery in the tent.'], de: ['Auf dem Campingplatz', 'Marshmallows am Feuer, Sterne am Himmel und ein Rätsel im Zelt.'], fr: ['Au camping', 'Des marshmallows sur le feu, des étoiles dans le ciel, et un mystère sous la tente.'], es: ['En el camping', 'Nubes en el fuego, estrellas en el cielo y un misterio en la tienda.'] },
  'museo': { en: ['At the museum', 'Among statues and paintings, only one thing is off: the guard.'], de: ['Im Museum', 'Zwischen Statuen und Gemälden stimmt nur eines nicht: der Wächter.'], fr: ['Au musée', 'Entre statues et tableaux, une seule chose cloche : le gardien.'], es: ['En el museo', 'Entre estatuas y cuadros, solo una cosa no encaja: el vigilante.'] }
};

/* interface text */
var UI = {
  it: { tag: 'Gialli logici', eyebrow: 'Dossier · 8 casi', h1a: 'Chi è ', h1b: 'stato?', lead: 'Leggi gli indizi in italiano. Metti ogni sospettato sulla mappa. Trova chi era da solo con la vittima.',
    start: 'Apri il primo caso', cont: "Continua l'indagine", cases: 'I casi', how: 'Come si gioca', yes: 'Ci puoi stare sopra', no: 'Non ci puoi stare sopra',
    back: 'Tutti i casi', caso: 'Caso n°', levels: ['', 'Facile', 'Medio', 'Difficile', 'Esperto'], suspects: 'Sospettati', words: 'Parole del caso', rooms: 'Stanze', tip: 'Consiglio',
    mark: '✕ segna', hintX: 'Tocca una casella per segnarla con ✕, o per togliere una persona.', hintPlace: 'Tocca una casella per mettere {n}.', longpress: 'Tieni premuto per segnare ✕.',
    check: 'Controlla', help: 'Aiutino', restart: 'Ricomincia', allRight: 'Tutti al posto giusto', killerIs: "L'assassino è…", next: 'Prossimo caso', again: 'Gioca di nuovo', solved: "L'assassino è {n}!", time: 'Tempo', hints: 'aiutini',
    missing: 'Persone ancora da mettere: ⟦{k}⟧.', clash: 'Due persone sono nella stessa ⟦riga⟧ o ⟦colonna⟧.', wrong: 'Quasi! Al posto sbagliato: ⟦{k}⟧. Rileggi gli indizi.', hintMsg: '{n} è in ⟦riga {r}⟧, ⟦colonna {c}⟧.', blocked: 'Non puoi stare qui.', nope: 'No! {n} non era nella ⟦stanza⟧ della vittima.',
    more: 'Un altro consiglio →', victim: 'VITTIMA', lang: 'Lingua che impari',
    coop: 'Gioca in squadra', coopLead: 'Ognuno vede solo alcuni indizi, nella lingua che impara. Leggeteli ad alta voce, condivideteli e risolvete il caso insieme.', yourName: 'Il tuo nome', create: 'Crea una stanza', join: 'Entra', code: 'Codice',
    room: 'Stanza', team: 'Squadra', you: 'tu', host: 'capo', pickCase: 'Scegli il caso per la squadra', waitHost: 'Aspetta che {n} scelga il caso.', leave: 'Esci', share: 'Condividi', sharedBy: 'condiviso da {n}', heldBy: 'Indizio di {n}. Chiediglielo!', yours: 'Il tuo indizio', offline: 'Gioco in squadra non disponibile qui.', invite: 'Dai il codice agli amici:', connecting: 'Connessione…', alone: 'Sei solo nella stanza. Invita qualcuno!',
    rules: ['Una persona per ⟦riga⟧ e per ⟦colonna⟧.', 'Puoi stare su ⟦sedie⟧, ⟦divani⟧, ⟦letti⟧ e ⟦tappeti⟧. Sugli altri oggetti no.', '⟦Accanto⟧ = subito sopra, sotto, a destra o a sinistra, nella stessa stanza.', '⟦Nord⟧ è su, ⟦sud⟧ è giù, ⟦est⟧ è a destra, ⟦ovest⟧ a sinistra.', "La ⟦vittima⟧ è nell'ultima casella libera. Chi era solo con lei è l'⟦assassino⟧."],
    tips: ['Comincia da chi ha un indizio preciso, come una riga o una stanza.', 'Una persona per riga e per colonna. Segna con ✕ le caselle impossibili.', 'Se una riga ha una sola casella libera, qualcuno deve stare lì.', '«Accanto» vale solo nella stessa stanza. Il muro separa!', "Alla fine la vittima va nell'ultima casella libera."],
    pigeon: 'Tranquilli, ci penso io… cioè, tu.',
    gl: { row: 'riga', col: 'colonna', by: 'accanto a', alone: 'solo · sola', only: "l'unica persona", with: 'la stessa area', dir: 'nord · sud · est · ovest', corner: 'angolo', not: 'non era', victim: 'la vittima', killer: "l'assassino" } },
  en: { tag: 'Logic murder mysteries', eyebrow: 'Case files · 8 cases', h1a: 'Who ', h1b: 'did it?', lead: 'Read the clues in English. Put every suspect on the map. Find who was alone with the victim.',
    start: 'Open the first case', cont: 'Continue the investigation', cases: 'The cases', how: 'How to play', yes: 'You can stand on it', no: "You can't stand on it",
    back: 'All cases', caso: 'Case no.', levels: ['', 'Easy', 'Medium', 'Hard', 'Expert'], suspects: 'Suspects', words: 'Words in this case', rooms: 'Rooms', tip: 'Tip',
    mark: '✕ mark', hintX: 'Tap a square to mark it ✕, or to remove a person.', hintPlace: 'Tap a square to place {n}.', longpress: 'Press and hold to mark ✕.',
    check: 'Check', help: 'Hint', restart: 'Start over', allRight: 'Everyone is in the right place', killerIs: 'The murderer is…', next: 'Next case', again: 'Play again', solved: 'The murderer is {n}!', time: 'Time', hints: 'hints',
    missing: 'Still to place: ⟦{k}⟧.', clash: 'Two people are in the same ⟦row⟧ or ⟦column⟧.', wrong: 'Close! In the wrong place: ⟦{k}⟧. Read the clues again.', hintMsg: '{n} is in ⟦row {r}⟧, ⟦column {c}⟧.', blocked: "You can't stand here.", nope: 'No! {n} was not in the victim’s ⟦room⟧.',
    more: 'Another tip →', victim: 'VICTIM', lang: 'Language you learn',
    coop: 'Play as a team', coopLead: 'Everyone sees only some clues, in the language they are learning. Read them out, share them and solve the case together.', yourName: 'Your name', create: 'Create a room', join: 'Join', code: 'Code',
    room: 'Room', team: 'Team', you: 'you', host: 'host', pickCase: 'Choose the case for the team', waitHost: 'Waiting for {n} to choose the case.', leave: 'Leave', share: 'Share', sharedBy: 'shared by {n}', heldBy: '{n} has this clue. Ask them!', yours: 'Your clue', offline: 'Team play is not available here.', invite: 'Give your friends the code:', connecting: 'Connecting…', alone: 'You are alone in the room. Invite someone!',
    rules: ['One person per ⟦row⟧ and per ⟦column⟧.', 'You can stand on ⟦chairs⟧, ⟦sofas⟧, ⟦beds⟧ and ⟦rugs⟧. Not on other objects.', '⟦Next to⟧ = directly above, below, left or right, in the same room.', '⟦North⟧ is up, ⟦south⟧ is down, ⟦east⟧ is right, ⟦west⟧ is left.', 'The ⟦victim⟧ is on the last free square. Whoever was alone with them is the ⟦murderer⟧.'],
    tips: ['Start with the suspect who has an exact clue, like a row or a room.', 'One person per row and column. Mark impossible squares with ✕.', 'If a row has only one free square, someone must be there.', '“Next to” only counts in the same room. Walls separate!', 'At the end, the victim goes on the last free square.'],
    pigeon: 'Relax, I’ve got this… I mean, you have.',
    gl: { row: 'row', col: 'column', by: 'next to', alone: 'alone', only: 'the only person', with: 'the same room', dir: 'north · south · east · west', corner: 'corner', not: 'was not', victim: 'the victim', killer: 'the murderer' } },
  de: { tag: 'Logik-Krimis', eyebrow: 'Akten · 8 Fälle', h1a: 'Wer ', h1b: "war's?", lead: 'Lies die Hinweise auf Deutsch. Setz alle Verdächtigen auf den Plan. Finde heraus, wer allein mit dem Opfer war.',
    start: 'Ersten Fall öffnen', cont: 'Weiter ermitteln', cases: 'Die Fälle', how: "So geht's", yes: 'Darauf darf man stehen', no: 'Darauf darf man nicht stehen',
    back: 'Alle Fälle', caso: 'Fall Nr.', levels: ['', 'Leicht', 'Mittel', 'Schwer', 'Profi'], suspects: 'Verdächtige', words: 'Wörter im Fall', rooms: 'Räume', tip: 'Tipp',
    mark: '✕ markieren', hintX: 'Tippe auf ein Feld, um es mit ✕ zu markieren oder eine Person zu entfernen.', hintPlace: 'Tippe auf ein Feld, um {n} hinzustellen.', longpress: 'Lange drücken markiert ✕.',
    check: 'Prüfen', help: 'Hilfe', restart: 'Neu anfangen', allRight: 'Alle stehen richtig', killerIs: 'Der Mörder ist…', next: 'Nächster Fall', again: 'Nochmal spielen', solved: 'Der Mörder ist {n}!', time: 'Zeit', hints: 'Tipps',
    missing: 'Noch zu setzen: ⟦{k}⟧.', clash: 'Zwei Personen stehen in derselben ⟦Reihe⟧ oder ⟦Spalte⟧.', wrong: 'Fast! Falsch gesetzt: ⟦{k}⟧. Lies die Hinweise nochmal.', hintMsg: '{n} steht in ⟦Reihe {r}⟧, ⟦Spalte {c}⟧.', blocked: 'Hier kann niemand stehen.', nope: 'Nein! {n} war nicht im ⟦Raum⟧ des Opfers.',
    more: 'Noch ein Tipp →', victim: 'OPFER', lang: 'Sprache, die du lernst',
    coop: 'Im Team spielen', coopLead: 'Jede Person sieht nur einige Hinweise, in der Sprache, die sie lernt. Lest sie vor, teilt sie und löst den Fall gemeinsam.', yourName: 'Dein Name', create: 'Raum erstellen', join: 'Beitreten', code: 'Code',
    room: 'Raum', team: 'Team', you: 'du', host: 'Leitung', pickCase: 'Wähle den Fall fürs Team', waitHost: 'Warte, bis {n} den Fall wählt.', leave: 'Verlassen', share: 'Teilen', sharedBy: 'geteilt von {n}', heldBy: '{n} hat diesen Hinweis. Frag nach!', yours: 'Dein Hinweis', offline: 'Teamspiel ist hier nicht verfügbar.', invite: 'Gib deinen Freunden den Code:', connecting: 'Verbinde…', alone: 'Du bist allein im Raum. Lade jemanden ein!',
    rules: ['Eine Person pro ⟦Reihe⟧ und pro ⟦Spalte⟧.', 'Man darf auf ⟦Stühlen⟧, ⟦Sofas⟧, ⟦Betten⟧ und ⟦Teppichen⟧ stehen. Auf anderen Dingen nicht.', '⟦Neben⟧ = direkt darüber, darunter, links oder rechts, im selben Raum.', '⟦Norden⟧ ist oben, ⟦Süden⟧ unten, ⟦Osten⟧ rechts, ⟦Westen⟧ links.', 'Das ⟦Opfer⟧ steht auf dem letzten freien Feld. Wer allein mit ihm war, ist der ⟦Mörder⟧.'],
    tips: ['Fang bei der Person an, die einen genauen Hinweis hat, zum Beispiel eine Reihe oder einen Raum.', 'Eine Person pro Reihe und Spalte. Markiere unmögliche Felder mit ✕.', 'Hat eine Reihe nur ein freies Feld, muss dort jemand stehen.', '„Neben“ gilt nur im selben Raum. Wände trennen!', 'Zum Schluss kommt das Opfer auf das letzte freie Feld.'],
    pigeon: 'Keine Sorge, ich mach das… also, du.',
    gl: { row: 'die Reihe', col: 'die Spalte', by: 'neben', alone: 'allein', only: 'die einzige Person', with: 'derselbe Raum', dir: 'nördlich · südlich · östlich · westlich', corner: 'die Ecke', not: 'war nicht', victim: 'das Opfer', killer: 'der Mörder' } },
  fr: { tag: 'Enquêtes logiques', eyebrow: 'Dossiers · 8 affaires', h1a: 'Qui ', h1b: "l'a fait ?", lead: "Lis les indices en français. Place chaque suspect sur le plan. Trouve qui était seul avec la victime.",
    start: 'Ouvrir la première affaire', cont: "Continuer l'enquête", cases: 'Les affaires', how: 'Comment jouer', yes: 'On peut monter dessus', no: 'On ne peut pas monter dessus',
    back: 'Toutes les affaires', caso: 'Affaire n°', levels: ['', 'Facile', 'Moyen', 'Difficile', 'Expert'], suspects: 'Suspects', words: "Mots de l'affaire", rooms: 'Pièces', tip: 'Conseil',
    mark: '✕ marquer', hintX: 'Touche une case pour la marquer ✕, ou pour retirer une personne.', hintPlace: 'Touche une case pour placer {n}.', longpress: 'Appui long pour marquer ✕.',
    check: 'Vérifier', help: 'Indice', restart: 'Recommencer', allRight: 'Tout le monde est à sa place', killerIs: "L'assassin est…", next: 'Affaire suivante', again: 'Rejouer', solved: "L'assassin est {n} !", time: 'Temps', hints: 'indices',
    missing: 'Encore à placer : ⟦{k}⟧.', clash: 'Deux personnes sont sur la même ⟦ligne⟧ ou ⟦colonne⟧.', wrong: 'Presque ! Mal placés : ⟦{k}⟧. Relis les indices.', hintMsg: '{n} est ⟦ligne {r}⟧, ⟦colonne {c}⟧.', blocked: 'Personne ne peut se mettre ici.', nope: "Non ! {n} n'était pas dans la ⟦pièce⟧ de la victime.",
    more: 'Un autre conseil →', victim: 'VICTIME', lang: 'Langue que tu apprends',
    coop: 'Jouer en équipe', coopLead: "Chacun ne voit que certains indices, dans la langue qu'il apprend. Lisez-les à voix haute, partagez-les et résolvez l'affaire ensemble.", yourName: 'Ton prénom', create: 'Créer une salle', join: 'Rejoindre', code: 'Code',
    room: 'Salle', team: 'Équipe', you: 'toi', host: 'chef', pickCase: "Choisis l'affaire pour l'équipe", waitHost: "On attend que {n} choisisse l'affaire.", leave: 'Quitter', share: 'Partager', sharedBy: 'partagé par {n}', heldBy: '{n} a cet indice. Demande-le !', yours: 'Ton indice', offline: "Le jeu en équipe n'est pas disponible ici.", invite: 'Donne le code à tes amis :', connecting: 'Connexion…', alone: 'Tu es seul dans la salle. Invite quelqu’un !',
    rules: ['Une personne par ⟦ligne⟧ et par ⟦colonne⟧.', 'On peut se mettre sur les ⟦chaises⟧, ⟦canapés⟧, ⟦lits⟧ et ⟦tapis⟧. Pas sur les autres objets.', '⟦À côté⟧ = juste au-dessus, en dessous, à gauche ou à droite, dans la même pièce.', 'Le ⟦nord⟧ est en haut, le ⟦sud⟧ en bas, l’⟦est⟧ à droite, l’⟦ouest⟧ à gauche.', "La ⟦victime⟧ est sur la dernière case libre. Celui qui était seul avec elle est l'⟦assassin⟧."],
    tips: ["Commence par le suspect qui a un indice précis, comme une ligne ou une pièce.", 'Une personne par ligne et par colonne. Marque les cases impossibles avec ✕.', "Si une ligne n'a qu'une case libre, quelqu'un doit y être.", '« À côté » ne compte que dans la même pièce. Les murs séparent !', 'À la fin, la victime va sur la dernière case libre.'],
    pigeon: "Pas de panique, je m'en occupe… enfin, toi.",
    gl: { row: 'la ligne', col: 'la colonne', by: 'à côté de', alone: 'seul · seule', only: 'la seule personne', with: 'la même pièce', dir: 'nord · sud · est · ouest', corner: 'le coin', not: "n'était pas", victim: 'la victime', killer: "l'assassin" } },
  es: { tag: 'Misterios lógicos', eyebrow: 'Expedientes · 8 casos', h1a: '¿Quién ', h1b: 'fue?', lead: 'Lee las pistas en español. Pon a cada sospechoso en el mapa. Descubre quién estaba solo con la víctima.',
    start: 'Abrir el primer caso', cont: 'Seguir investigando', cases: 'Los casos', how: 'Cómo se juega', yes: 'Te puedes poner encima', no: 'No te puedes poner encima',
    back: 'Todos los casos', caso: 'Caso n.º', levels: ['', 'Fácil', 'Medio', 'Difícil', 'Experto'], suspects: 'Sospechosos', words: 'Palabras del caso', rooms: 'Habitaciones', tip: 'Consejo',
    mark: '✕ marcar', hintX: 'Toca una casilla para marcarla con ✕ o para quitar a una persona.', hintPlace: 'Toca una casilla para poner a {n}.', longpress: 'Mantén pulsado para marcar ✕.',
    check: 'Comprobar', help: 'Pista', restart: 'Empezar de nuevo', allRight: 'Todos en su sitio', killerIs: 'El asesino es…', next: 'Siguiente caso', again: 'Jugar otra vez', solved: '¡El asesino es {n}!', time: 'Tiempo', hints: 'pistas',
    missing: 'Faltan por colocar: ⟦{k}⟧.', clash: 'Dos personas están en la misma ⟦fila⟧ o ⟦columna⟧.', wrong: '¡Casi! Mal colocados: ⟦{k}⟧. Vuelve a leer las pistas.', hintMsg: '{n} está en la ⟦fila {r}⟧, ⟦columna {c}⟧.', blocked: 'Aquí no se puede poner nadie.', nope: '¡No! {n} no estaba en la ⟦habitación⟧ de la víctima.',
    more: 'Otro consejo →', victim: 'VÍCTIMA', lang: 'Idioma que aprendes',
    coop: 'Jugar en equipo', coopLead: 'Cada uno ve solo algunas pistas, en el idioma que aprende. Leedlas en voz alta, compartidlas y resolved el caso juntos.', yourName: 'Tu nombre', create: 'Crear una sala', join: 'Entrar', code: 'Código',
    room: 'Sala', team: 'Equipo', you: 'tú', host: 'jefe', pickCase: 'Elige el caso para el equipo', waitHost: 'Esperando a que {n} elija el caso.', leave: 'Salir', share: 'Compartir', sharedBy: 'compartido por {n}', heldBy: '{n} tiene esta pista. ¡Pregúntale!', yours: 'Tu pista', offline: 'El juego en equipo no está disponible aquí.', invite: 'Dale el código a tus amigos:', connecting: 'Conectando…', alone: 'Estás solo en la sala. ¡Invita a alguien!',
    rules: ['Una persona por ⟦fila⟧ y por ⟦columna⟧.', 'Te puedes poner en ⟦sillas⟧, ⟦sofás⟧, ⟦camas⟧ y ⟦alfombras⟧. En los demás objetos no.', '⟦Junto a⟧ = justo arriba, abajo, a la izquierda o a la derecha, en la misma habitación.', 'El ⟦norte⟧ está arriba, el ⟦sur⟧ abajo, el ⟦este⟧ a la derecha y el ⟦oeste⟧ a la izquierda.', 'La ⟦víctima⟧ está en la última casilla libre. Quien estaba solo con ella es el ⟦asesino⟧.'],
    tips: ['Empieza por quien tiene una pista exacta, como una fila o una habitación.', 'Una persona por fila y por columna. Marca con ✕ las casillas imposibles.', 'Si una fila tiene una sola casilla libre, alguien tiene que estar ahí.', '«Junto a» solo vale en la misma habitación. ¡Las paredes separan!', 'Al final, la víctima va en la última casilla libre.'],
    pigeon: 'Tranquilos, yo me encargo… bueno, tú.',
    gl: { row: 'la fila', col: 'la columna', by: 'junto a', alone: 'solo · sola', only: 'la única persona', with: 'la misma habitación', dir: 'norte · sur · este · oeste', corner: 'la esquina', not: 'no estaba', victim: 'la víctima', killer: 'el asesino' } }
};
if (typeof module !== 'undefined') module.exports = { LANGS: LANGS, ROOMS: ROOMS, OBJL: OBJL, ORD: ORD, CLUE: CLUE, CASEL: CASEL, UI: UI };
