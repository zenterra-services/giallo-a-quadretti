/* Yamada a Quadretti — pack vocabulary.
   Semantic keys are referenced by cases and clue rules; labels live per language. */

/* room name → [name, in-phrase] per language */
var ROOMS = {
  'Counter': { it: ['Bancone', 'al ⟦bancone⟧'], en: ['Counter', 'at the ⟦counter⟧'], de: ['Tresen', 'am ⟦Tresen⟧'], fr: ['Comptoir', 'au ⟦comptoir⟧'], es: ['Barra', 'en la ⟦barra⟧'] },
  'Tables': { it: ['Tavoli', 'ai ⟦tavoli⟧'], en: ['Tables', 'at the ⟦tables⟧'], de: ['Tische', 'an den ⟦Tischen⟧'], fr: ['Tables', 'aux ⟦tables⟧'], es: ['Mesas', 'en las ⟦mesas⟧'] },
  'Kitchen': { it: ['Cucina', 'in ⟦cucina⟧'], en: ['Kitchen', 'in the ⟦kitchen⟧'], de: ['Küche', 'in der ⟦Küche⟧'], fr: ['Cuisine', 'dans la ⟦cuisine⟧'], es: ['Cocina', 'en la ⟦cocina⟧'] },
  'SofaCorner': { it: ['Angolo divani', "nell'⟦angolo divani⟧"], en: ['Sofa corner', 'in the ⟦sofa corner⟧'], de: ['Sofaecke', 'in der ⟦Sofaecke⟧'], fr: ['Coin canapé', 'dans le ⟦coin canapé⟧'], es: ['Rincón de sofás', 'en el ⟦rincón de sofás⟧'] },
  'Entry': { it: ['Ingresso', "all'⟦ingresso⟧"], en: ['Entrance', 'at the ⟦entrance⟧'], de: ['Eingang', 'am ⟦Eingang⟧'], fr: ['Entrée', "à l'⟦entrée⟧"], es: ['Entrada', 'en la ⟦entrada⟧'] },
  'LivingRoom': { it: ['Salotto', 'in ⟦salotto⟧'], en: ['Living room', 'in the ⟦living room⟧'], de: ['Wohnzimmer', 'im ⟦Wohnzimmer⟧'], fr: ['Salon', 'dans le ⟦salon⟧'], es: ['Salón', 'en el ⟦salón⟧'] },
  'Bedroom': { it: ['Camera', 'in ⟦camera⟧'], en: ['Bedroom', 'in the ⟦bedroom⟧'], de: ['Schlafzimmer', 'im ⟦Schlafzimmer⟧'], fr: ['Chambre', 'dans la ⟦chambre⟧'], es: ['Dormitorio', 'en el ⟦dormitorio⟧'] },
  'LectureHall': { it: ['Aula magna', "nell'⟦aula magna⟧"], en: ['Lecture hall', 'in the ⟦lecture hall⟧'], de: ['Hörsaal', 'im ⟦Hörsaal⟧'], fr: ['Amphithéâtre', "dans l'⟦amphithéâtre⟧"], es: ['Aula magna', 'en el ⟦aula magna⟧'] },
  'Library': { it: ['Biblioteca', 'in ⟦biblioteca⟧'], en: ['Library', 'in the ⟦library⟧'], de: ['Bibliothek', 'in der ⟦Bibliothek⟧'], fr: ['Bibliothèque', 'dans la ⟦bibliothèque⟧'], es: ['Biblioteca', 'en la ⟦biblioteca⟧'] },
  'Cafeteria': { it: ['Mensa', 'in ⟦mensa⟧'], en: ['Cafeteria', 'in the ⟦cafeteria⟧'], de: ['Mensa', 'in der ⟦Mensa⟧'], fr: ['Cafétéria', 'à la ⟦cafétéria⟧'], es: ['Cafetería', 'en la ⟦cafetería⟧'] },
  'Courtyard': { it: ['Cortile', 'in ⟦cortile⟧'], en: ['Courtyard', 'in the ⟦courtyard⟧'], de: ['Innenhof', 'im ⟦Innenhof⟧'], fr: ['Cour', 'dans la ⟦cour⟧'], es: ['Patio', 'en el ⟦patio⟧'] },
  'Corridor': { it: ['Corridoio', 'nel ⟦corridoio⟧'], en: ['Corridor', 'in the ⟦corridor⟧'], de: ['Flur', 'im ⟦Flur⟧'], fr: ['Couloir', 'dans le ⟦couloir⟧'], es: ['Pasillo', 'en el ⟦pasillo⟧'] },
  'Aisles': { it: ['Scaffali', 'tra gli ⟦scaffali⟧'], en: ['Aisles', 'between the ⟦aisles⟧'], de: ['Regale', 'zwischen den ⟦Regalen⟧'], fr: ['Rayons', 'dans les ⟦rayons⟧'], es: ['Pasillos', 'entre los ⟦pasillos⟧'] },
  'Freezers': { it: ['Surgelati', 'ai ⟦surgelati⟧'], en: ['Freezers', 'at the ⟦freezers⟧'], de: ['Kühltruhen', 'an den ⟦Kühltruhen⟧'], fr: ['Congélateurs', 'aux ⟦congélateurs⟧'], es: ['Congeladores', 'en los ⟦congeladores⟧'] },
  'Storage': { it: ['Magazzino', 'in ⟦magazzino⟧'], en: ['Storeroom', 'in the ⟦storeroom⟧'], de: ['Lager', 'im ⟦Lager⟧'], fr: ['Réserve', 'dans la ⟦réserve⟧'], es: ['Almacén', 'en el ⟦almacén⟧'] },
  'Classroom': { it: ['Aula', 'in ⟦aula⟧'], en: ['Classroom', 'in the ⟦classroom⟧'], de: ['Klassenzimmer', 'im ⟦Klassenzimmer⟧'], fr: ['Salle de classe', 'dans la ⟦salle de classe⟧'], es: ['Aula', 'en el ⟦aula⟧'] },
  'Gym': { it: ['Palestra', 'in ⟦palestra⟧'], en: ['Gym', 'in the ⟦gym⟧'], de: ['Turnhalle', 'in der ⟦Turnhalle⟧'], fr: ['Gymnase', 'dans le ⟦gymnase⟧'], es: ['Gimnasio', 'en el ⟦gimnasio⟧'] },
  'Cranes': { it: ['Zona gru', 'nella ⟦zona gru⟧'], en: ['Crane games', 'at the ⟦crane games⟧'], de: ['Greifautomaten', 'an den ⟦Greifautomaten⟧'], fr: ['Machines à pince', 'aux ⟦machines à pince⟧'], es: ['Máquinas de garra', 'en las ⟦máquinas de garra⟧'] },
  'Rhythm': { it: ['Giochi di ritmo', 'ai ⟦giochi di ritmo⟧'], en: ['Rhythm games', 'at the ⟦rhythm games⟧'], de: ['Rhythmusspiele', 'an den ⟦Rhythmusspielen⟧'], fr: ['Jeux de rythme', 'aux ⟦jeux de rythme⟧'], es: ['Juegos de ritmo', 'en los ⟦juegos de ritmo⟧'] },
  'Fighting': { it: ['Picchiaduro', 'ai ⟦picchiaduro⟧'], en: ['Fighting games', 'at the ⟦fighting games⟧'], de: ['Kampfspiele', 'an den ⟦Kampfspielen⟧'], fr: ['Jeux de combat', 'aux ⟦jeux de combat⟧'], es: ['Juegos de lucha', 'en los ⟦juegos de lucha⟧'] },
  'Prizes': { it: ['Angolo premi', "nell'⟦angolo premi⟧"], en: ['Prize corner', 'in the ⟦prize corner⟧'], de: ['Gewinnecke', 'in der ⟦Gewinnecke⟧'], fr: ['Coin des prix', 'dans le ⟦coin des prix⟧'], es: ['Rincón de premios', 'en el ⟦rincón de premios⟧'] },
  'SnackBar': { it: ['Snack bar', 'allo ⟦snack bar⟧'], en: ['Snack bar', 'at the ⟦snack bar⟧'], de: ['Snacktheke', 'an der ⟦Snacktheke⟧'], fr: ['Snack-bar', 'au ⟦snack-bar⟧'], es: ['Snacks', 'en el bar de ⟦snacks⟧'] },
  'Greenhouse': { it: ['Serra', 'nella ⟦serra⟧'], en: ['Greenhouse', 'in the ⟦greenhouse⟧'], de: ['Gewächshaus', 'im ⟦Gewächshaus⟧'], fr: ['Serre', 'dans la ⟦serre⟧'], es: ['Invernadero', 'en el ⟦invernadero⟧'] },
  'Field': { it: ['Campo', 'nel ⟦campo⟧'], en: ['Field', 'in the ⟦field⟧'], de: ['Feld', 'auf dem ⟦Feld⟧'], fr: ['Champ', 'dans le ⟦champ⟧'], es: ['Campo', 'en el ⟦campo⟧'] },
  'Barn': { it: ['Fienile', 'nel ⟦fienile⟧'], en: ['Barn', 'in the ⟦barn⟧'], de: ['Scheune', 'in der ⟦Scheune⟧'], fr: ['Grange', 'dans la ⟦grange⟧'], es: ['Granero', 'en el ⟦granero⟧'] },
  'FarmShop': { it: ['Spaccio', 'nello ⟦spaccio⟧'], en: ['Farm shop', 'in the ⟦farm shop⟧'], de: ['Hofladen', 'im ⟦Hofladen⟧'], fr: ['Boutique de la ferme', 'dans la ⟦boutique de la ferme⟧'], es: ['Tienda de la granja', 'en la ⟦tienda de la granja⟧'] },
  'Porch': { it: ['Portico', 'sotto il ⟦portico⟧'], en: ['Porch', 'on the ⟦porch⟧'], de: ['Veranda', 'auf der ⟦Veranda⟧'], fr: ['Porche', 'sous le ⟦porche⟧'], es: ['Porche', 'en el ⟦porche⟧'] },
  'Gate': { it: ['Cancello', 'al ⟦cancello⟧'], en: ['Farm gate', 'at the ⟦farm gate⟧'], de: ['Hoftor', 'am ⟦Hoftor⟧'], fr: ['Portail', 'au ⟦portail⟧'], es: ['Verja', 'en la ⟦verja⟧'] },
  'Stalls': { it: ['Bancarelle', 'tra le ⟦bancarelle⟧'], en: ['Food stalls', 'among the ⟦food stalls⟧'], de: ['Imbissstände', 'an den ⟦Imbissständen⟧'], fr: ['Stands', 'parmi les ⟦stands⟧'], es: ['Puestos', 'entre los ⟦puestos⟧'] },
  'Shrine': { it: ['Santuario', 'al ⟦santuario⟧'], en: ['Shrine steps', 'on the ⟦shrine steps⟧'], de: ['Schreintreppe', 'auf der ⟦Schreintreppe⟧'], fr: ['Sanctuaire', 'sur les marches du ⟦sanctuaire⟧'], es: ['Santuario', 'en las escaleras del ⟦santuario⟧'] },
  'Riverside': { it: ['Riva del fiume', 'sulla ⟦riva del fiume⟧'], en: ['Riverside', 'at the ⟦riverside⟧'], de: ['Flussufer', 'am ⟦Flussufer⟧'], fr: ['Rivière', 'au bord de la ⟦rivière⟧'], es: ['Ribera', 'en la ⟦ribera⟧'] },
  'Stage': { it: ['Palco', 'sul ⟦palco⟧'], en: ['Stage', 'on the ⟦stage⟧'], de: ['Bühne', 'auf der ⟦Bühne⟧'], fr: ['Scène', 'sur la ⟦scène⟧'], es: ['Escenario', 'en el ⟦escenario⟧'] },
  'Park': { it: ['Parco', 'nel ⟦parco⟧'], en: ['Park', 'in the ⟦park⟧'], de: ['Park', 'im ⟦Park⟧'], fr: ['Parc', 'dans le ⟦parc⟧'], es: ['Parque', 'en el ⟦parque⟧'] },
  'FoodAlley': { it: ['Vicolo goloso', 'nel ⟦vicolo goloso⟧'], en: ['Food alley', 'in the ⟦food alley⟧'], de: ['Leckergasse', 'in der ⟦Leckergasse⟧'], fr: ['Allée gourmande', "dans l'⟦allée gourmande⟧"], es: ['Callejón gourmet', 'en el ⟦callejón gourmet⟧'] },
  'Hill': { it: ['Collina', 'sulla ⟦collina⟧'], en: ['Viewing hill', 'on the ⟦viewing hill⟧'], de: ['Aussichtshügel', 'auf dem ⟦Aussichtshügel⟧'], fr: ['Colline', 'sur la ⟦colline⟧'], es: ['Colina', 'en la ⟦colina⟧'] }
};

/* objects: n = word with article (glossary), on/by = phrase used in clues */
var OBJL = {
  it: { chair: ['la sedia', 'su una ⟦sedia⟧'], sofa: ['il divano', 'su un ⟦divano⟧'], rug: ['il tappeto', 'su un ⟦tappeto⟧'], bed: ['il letto', 'su un ⟦letto⟧'], bench: ['la panchina', 'su una ⟦panchina⟧'],
        desk: ['la scrivania', '⟦accanto⟧ a una ⟦scrivania⟧'], shelf: ['lo scaffale', '⟦accanto⟧ a uno ⟦scaffale⟧'], vending: ['il distributore', '⟦accanto⟧ a un ⟦distributore⟧'], plant: ['la pianta', '⟦accanto⟧ a una ⟦pianta⟧'],
        crane: ['la gru dei peluche', '⟦accanto⟧ a una ⟦gru dei peluche⟧'], fridge: ['il frigorifero', '⟦accanto⟧ a un ⟦frigorifero⟧'], table: ['il tavolo', '⟦accanto⟧ a un ⟦tavolo⟧'], tree: ["l'albero", '⟦accanto⟧ a un ⟦albero⟧'] },
  en: { chair: ['the chair', 'on a ⟦chair⟧'], sofa: ['the sofa', 'on a ⟦sofa⟧'], rug: ['the rug', 'on a ⟦rug⟧'], bed: ['the bed', 'on a ⟦bed⟧'], bench: ['the bench', 'on a ⟦bench⟧'],
        desk: ['the desk', '⟦next to⟧ a ⟦desk⟧'], shelf: ['the shelf', '⟦next to⟧ a ⟦shelf⟧'], vending: ['the vending machine', '⟦next to⟧ a ⟦vending machine⟧'], plant: ['the plant', '⟦next to⟧ a ⟦plant⟧'],
        crane: ['the crane game', '⟦next to⟧ a ⟦crane game⟧'], fridge: ['the fridge', '⟦next to⟧ a ⟦fridge⟧'], table: ['the table', '⟦next to⟧ a ⟦table⟧'], tree: ['the tree', '⟦next to⟧ a ⟦tree⟧'] },
  de: { chair: ['der Stuhl', 'auf einem ⟦Stuhl⟧'], sofa: ['das Sofa', 'auf einem ⟦Sofa⟧'], rug: ['der Teppich', 'auf einem ⟦Teppich⟧'], bed: ['das Bett', 'auf einem ⟦Bett⟧'], bench: ['die Bank', 'auf einer ⟦Bank⟧'],
        desk: ['der Schreibtisch', '⟦neben⟧ einem ⟦Schreibtisch⟧'], shelf: ['das Regal', '⟦neben⟧ einem ⟦Regal⟧'], vending: ['der Automat', '⟦neben⟧ einem ⟦Automaten⟧'], plant: ['die Pflanze', '⟦neben⟧ einer ⟦Pflanze⟧'],
        crane: ['der Greifautomat', '⟦neben⟧ einem ⟦Greifautomaten⟧'], fridge: ['der Kühlschrank', '⟦neben⟧ einem ⟦Kühlschrank⟧'], table: ['der Tisch', '⟦neben⟧ einem ⟦Tisch⟧'], tree: ['der Baum', '⟦neben⟧ einem ⟦Baum⟧'] },
  fr: { chair: ['la chaise', 'sur une ⟦chaise⟧'], sofa: ['le canapé', 'sur un ⟦canapé⟧'], rug: ['le tapis', 'sur un ⟦tapis⟧'], bed: ['le lit', 'sur un ⟦lit⟧'], bench: ['le banc', 'sur un ⟦banc⟧'],
        desk: ['le bureau', "⟦à côté⟧ d'un ⟦bureau⟧"], shelf: ["l'étagère", "⟦à côté⟧ d'une ⟦étagère⟧"], vending: ['le distributeur', "⟦à côté⟧ d'un ⟦distributeur⟧"], plant: ['la plante', "⟦à côté⟧ d'une ⟦plante⟧"],
        crane: ['la machine à pince', "⟦à côté⟧ d'une ⟦machine à pince⟧"], fridge: ['le frigo', "⟦à côté⟧ d'un ⟦frigo⟧"], table: ['la table', "⟦à côté⟧ d'une ⟦table⟧"], tree: ["l'arbre", "⟦à côté⟧ d'un ⟦arbre⟧"] },
  es: { chair: ['la silla', 'en una ⟦silla⟧'], sofa: ['el sofá', 'en un ⟦sofá⟧'], rug: ['la alfombra', 'sobre una ⟦alfombra⟧'], bed: ['la cama', 'en una ⟦cama⟧'], bench: ['el banco', 'en un ⟦banco⟧'],
        desk: ['el escritorio', '⟦junto a⟧ un ⟦escritorio⟧'], shelf: ['la estantería', '⟦junto a⟧ una ⟦estantería⟧'], vending: ['la máquina expendedora', '⟦junto a⟧ una ⟦máquina expendedora⟧'], plant: ['la planta', '⟦junto a⟧ una ⟦planta⟧'],
        crane: ['la máquina de garra', '⟦junto a⟧ una ⟦máquina de garra⟧'], fridge: ['la nevera', '⟦junto a⟧ una ⟦nevera⟧'], table: ['la mesa', '⟦junto a⟧ una ⟦mesa⟧'], tree: ['el árbol', '⟦junto a⟧ un ⟦árbol⟧'] }
};

var SIT = { chair: 1, sofa: 1, bench: 1 };

var OBJ = {
 chair:{occ:1,hu:'szék'}, sofa:{occ:1,hu:'kanapé'}, rug:{occ:1,hu:'szőnyeg'}, bed:{occ:1,hu:'ágy'}, bench:{occ:1,hu:'pad'},
 desk:{hu:'íróasztal'}, shelf:{hu:'polc'}, vending:{hu:'italautomata'}, plant:{hu:'szobanövény'},
 crane:{hu:'plüssfogó gép'}, fridge:{hu:'hűtő'}, table:{hu:'asztal'}, tree:{hu:'fa'}
};
var HU_ON={chair:'egy széken ült',sofa:'egy kanapén ült',rug:'egy szőnyegen állt',bed:'egy ágyon volt',bench:'egy padon ült'};
var HU_BY={desk:'egy íróasztal',shelf:'egy polc',vending:'egy italautomata',plant:'egy szobanövény',crane:'egy plüssfogó gép',fridge:'egy hűtő',table:'egy asztal',tree:'egy fa'};

if (typeof module !== 'undefined') module.exports = { ROOMS: ROOMS, OBJL: OBJL, SIT: SIT, OBJ: OBJ, HU_ON: HU_ON, HU_BY: HU_BY };
