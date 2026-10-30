/* Giallo a Quadretti — pack vocabulary.
   Semantic keys are referenced by cases and clue rules; labels live per language. */

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


var OBJ = {
 sedia:{occ:1,hu:'szék'}, divano:{occ:1,hu:'kanapé'}, tappeto:{occ:1,hu:'szőnyeg'}, letto:{occ:1,hu:'ágy'},
 tavolo:{hu:'asztal'}, scaffale:{hu:'polc'}, albero:{hu:'fa'}, cespuglio:{hu:'bokor'}, cassa:{hu:'láda'}, vaso:{hu:'váza'},
 pianta:{hu:'cserepes növény'}, masso:{hu:'kőszikla'}, frigo:{hu:'hűtő'}, forno:{hu:'kemence'}
};
var HU_ON={sedia:'egy széken ült',divano:'egy kanapén ült',tappeto:'egy szőnyegen állt',letto:'egy ágyon volt'};
var HU_BY={tavolo:'egy asztal',scaffale:'egy polc',albero:'egy fa',cespuglio:'egy bokor',cassa:'egy láda',vaso:'egy váza',pianta:'egy cserepes növény',masso:'egy kőszikla',frigo:'egy hűtő',forno:'egy kemence'};

if (typeof module !== 'undefined') module.exports = { ROOMS: ROOMS, OBJL: OBJL, SIT: SIT, OBJ: OBJ, HU_ON: HU_ON, HU_BY: HU_BY };
