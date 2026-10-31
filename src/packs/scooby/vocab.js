/* Scooby a Quadretti — pack vocabulary.
   World: Halloween night at Spooky Hollow Manor — a creaky mansion, its grounds
   and the little Halloween fair outside. The Scooby Snacks box has vanished.
   ROOMS: room key -> per language [name, in-phrase]; 'it' required plus en/de/fr/es.
   OBJL:  per language { key: [nominative, phrase-form] }.
   OBJ:   occ=1 means characters can stand/sit on it (drives on-clues).
   German 'on'-clue verb map only knows sedia/divano/tappeto/letto; all other
   keys use the safe generic fallback — still read one German on-clue aloud. */
var ROOMS = {
  'Foyer': { it:['Atrio',"nell'⟦atrio⟧"], en:['Foyer','in the ⟦foyer⟧'], de:['Eingangshalle','in der ⟦Eingangshalle⟧'], fr:['Hall','dans le ⟦hall⟧'], es:['Vestíbulo','en el ⟦vestíbulo⟧'] },
  'Ballroom': { it:['Sala da ballo','nella ⟦sala da ballo⟧'], en:['Ballroom','in the ⟦ballroom⟧'], de:['Ballsaal','im ⟦Ballsaal⟧'], fr:['Salle de bal','dans la ⟦salle de bal⟧'], es:['Salón de baile','en el ⟦salón de baile⟧'] },
  'Library': { it:['Biblioteca','in ⟦biblioteca⟧'], en:['Library','in the ⟦library⟧'], de:['Bibliothek','in der ⟦Bibliothek⟧'], fr:['Bibliothèque','dans la ⟦bibliothèque⟧'], es:['Biblioteca','en la ⟦biblioteca⟧'] },
  'DiningRoom': { it:['Sala da pranzo','nella ⟦sala da pranzo⟧'], en:['Dining room','in the ⟦dining room⟧'], de:['Esszimmer','im ⟦Esszimmer⟧'], fr:['Salle à manger','dans la ⟦salle à manger⟧'], es:['Comedor','en el ⟦comedor⟧'] },
  'Kitchen': { it:['Cucina','in ⟦cucina⟧'], en:['Kitchen','in the ⟦kitchen⟧'], de:['Küche','in der ⟦Küche⟧'], fr:['Cuisine','dans la ⟦cuisine⟧'], es:['Cocina','en la ⟦cocina⟧'] },
  'Cellar': { it:['Cantina','in ⟦cantina⟧'], en:['Cellar','in the ⟦cellar⟧'], de:['Keller','im ⟦Keller⟧'], fr:['Cave','dans la ⟦cave⟧'], es:['Sótano','en el ⟦sótano⟧'] },
  'Attic': { it:['Soffitta','in ⟦soffitta⟧'], en:['Attic','in the ⟦attic⟧'], de:['Dachboden','auf dem ⟦Dachboden⟧'], fr:['Grenier','dans le ⟦grenier⟧'], es:['Desván','en el ⟦desván⟧'] },
  'Study': { it:['Studio','nello ⟦studio⟧'], en:['Study','in the ⟦study⟧'], de:['Arbeitszimmer','im ⟦Arbeitszimmer⟧'], fr:['Bureau','dans le ⟦bureau⟧'], es:['Estudio','en el ⟦estudio⟧'] },
  'Tower': { it:['Torre','sulla ⟦torre⟧'], en:['Tower','in the ⟦tower⟧'], de:['Turm','im ⟦Turm⟧'], fr:['Tour','dans la ⟦tour⟧'], es:['Torre','en la ⟦torre⟧'] },
  'Corridor': { it:['Corridoio','nel ⟦corridoio⟧'], en:['Corridor','in the ⟦corridor⟧'], de:['Flur','im ⟦Flur⟧'], fr:['Couloir','dans le ⟦couloir⟧'], es:['Pasillo','en el ⟦pasillo⟧'] },
  'Conservatory': { it:['Serra','nella ⟦serra⟧'], en:['Conservatory','in the ⟦conservatory⟧'], de:['Wintergarten','im ⟦Wintergarten⟧'], fr:['Véranda','dans la ⟦véranda⟧'], es:['Invernadero','en el ⟦invernadero⟧'] },
  'Bedroom': { it:['Camera','in ⟦camera⟧'], en:['Bedroom','in the ⟦bedroom⟧'], de:['Schlafzimmer','im ⟦Schlafzimmer⟧'], fr:['Chambre','dans la ⟦chambre⟧'], es:['Dormitorio','en el ⟦dormitorio⟧'] },
  'MusicRoom': { it:['Sala musica','nella ⟦sala musica⟧'], en:['Music room','in the ⟦music room⟧'], de:['Musikzimmer','im ⟦Musikzimmer⟧'], fr:['Salon de musique','dans le ⟦salon de musique⟧'], es:['Sala de música','en la ⟦sala de música⟧'] },
  'PumpkinPatch': { it:['Campo di zucche','nel ⟦campo di zucche⟧'], en:['Pumpkin patch','in the ⟦pumpkin patch⟧'], de:['Kürbisfeld','auf dem ⟦Kürbisfeld⟧'], fr:['Champ de citrouilles','dans le ⟦champ de citrouilles⟧'], es:['Huerto de calabazas','en el ⟦huerto de calabazas⟧'] },
  'CornMaze': { it:['Labirinto di granturco','nel ⟦labirinto di granturco⟧'], en:['Corn maze','in the ⟦corn maze⟧'], de:['Maislabyrinth','im ⟦Maislabyrinth⟧'], fr:['Labyrinthe de maïs','dans le ⟦labyrinthe de maïs⟧'], es:['Laberinto de maíz','en el ⟦laberinto de maíz⟧'] },
  'Graveyard': { it:['Cimitero','nel ⟦cimitero⟧'], en:['Graveyard','in the ⟦graveyard⟧'], de:['Friedhof','auf dem ⟦Friedhof⟧'], fr:['Cimetière','dans le ⟦cimetière⟧'], es:['Cementerio','en el ⟦cementerio⟧'] },
  'Garden': { it:['Giardino','in ⟦giardino⟧'], en:['Garden','in the ⟦garden⟧'], de:['Garten','im ⟦Garten⟧'], fr:['Jardin','dans le ⟦jardin⟧'], es:['Jardín','en el ⟦jardín⟧'] },
  'Porch': { it:['Portico','sul ⟦portico⟧'], en:['Front porch','on the ⟦front porch⟧'], de:['Veranda','auf der ⟦Veranda⟧'], fr:['Porche','sur le ⟦porche⟧'], es:['Porche','en el ⟦porche⟧'] },
  'Barn': { it:['Fienile','nel ⟦fienile⟧'], en:['Barn','in the ⟦barn⟧'], de:['Scheune','in der ⟦Scheune⟧'], fr:['Grange','dans la ⟦grange⟧'], es:['Granero','en el ⟦granero⟧'] },
  'Bonfire': { it:['Falò','intorno al ⟦falò⟧'], en:['Bonfire','by the ⟦bonfire⟧'], de:['Lagerfeuer','am ⟦Lagerfeuer⟧'], fr:['Feu de joie','près du ⟦feu de joie⟧'], es:['Hoguera','junto a la ⟦hoguera⟧'] },
  'CandyStand': { it:['Banco dei dolcetti','al ⟦banco dei dolcetti⟧'], en:['Candy stand','at the ⟦candy stand⟧'], de:['Süßigkeitenstand','am ⟦Süßigkeitenstand⟧'], fr:['Stand de bonbons','au ⟦stand de bonbons⟧'], es:['Puesto de dulces','en el ⟦puesto de dulces⟧'] },
  'FortuneTent': { it:['Tenda della veggente','nella ⟦tenda della veggente⟧'], en:['Fortune tent','in the ⟦fortune tent⟧'], de:['Wahrsagerzelt','im ⟦Wahrsagerzelt⟧'], fr:['Tente de la voyante','dans la ⟦tente de la voyante⟧'], es:['Tienda de la vidente','en la ⟦tienda de la vidente⟧'] },
  'Well': { it:['Pozzo','al ⟦pozzo⟧'], en:['Old well','at the ⟦old well⟧'], de:['Brunnen','am ⟦Brunnen⟧'], fr:['Puits','au ⟦puits⟧'], es:['Pozo','en el ⟦pozo⟧'] },
  'Gate': { it:['Cancello','al ⟦cancello⟧'], en:['Gate','at the ⟦gate⟧'], de:['Tor','am ⟦Tor⟧'], fr:['Portail','au ⟦portail⟧'], es:['Verja','en la ⟦verja⟧'] },
  'Stables': { it:['Scuderie','nelle ⟦scuderie⟧'], en:['Stables','in the ⟦stables⟧'], de:['Ställe','in den ⟦Ställen⟧'], fr:['Écuries','dans les ⟦écuries⟧'], es:['Establos','en los ⟦establos⟧'] }
};

var OBJL = {
  it: { chair:['la sedia','su una ⟦sedia⟧'], sofa:['il divano','su un ⟦divano⟧'], rug:['il tappeto','su un ⟦tappeto⟧'], bed:['il letto','su un ⟦letto⟧'], bench:['la panchina','su una ⟦panchina⟧'],
        armchair:['la poltrona','su una ⟦poltrona⟧'], rocker:['la sedia a dondolo','su una ⟦sedia a dondolo⟧'], haybale:['la balla di fieno','su una ⟦balla di fieno⟧'], coffin:['la bara','su una ⟦bara⟧'],
        table:['il tavolo','⟦accanto⟧ a un ⟦tavolo⟧'], desk:['la scrivania','⟦accanto⟧ a una ⟦scrivania⟧'], shelf:['lo scaffale','⟦accanto⟧ a uno ⟦scaffale⟧'], piano:['il pianoforte','⟦accanto⟧ a un ⟦pianoforte⟧'],
        clock:["l'orologio a pendolo",'⟦accanto⟧ a un ⟦orologio a pendolo⟧'], armor:["l'armatura","⟦accanto⟧ a un'⟦armatura⟧"], cauldron:['il calderone','⟦accanto⟧ a un ⟦calderone⟧'], plant:['la pianta','⟦accanto⟧ a una ⟦pianta⟧'] },
  en: { chair:['the chair','on a ⟦chair⟧'], sofa:['the sofa','on a ⟦sofa⟧'], rug:['the rug','on a ⟦rug⟧'], bed:['the bed','on a ⟦bed⟧'], bench:['the bench','on a ⟦bench⟧'],
        armchair:['the armchair','on an ⟦armchair⟧'], rocker:['the rocking chair','on the ⟦rocking chair⟧'], haybale:['the hay bale','on a ⟦hay bale⟧'], coffin:['the coffin','on a ⟦coffin⟧'],
        table:['the table','⟦next to⟧ a ⟦table⟧'], desk:['the desk','⟦next to⟧ a ⟦desk⟧'], shelf:['the bookshelf','⟦next to⟧ a ⟦bookshelf⟧'], piano:['the piano','⟦next to⟧ a ⟦piano⟧'],
        clock:['the grandfather clock','⟦next to⟧ the ⟦grandfather clock⟧'], armor:['the suit of armor','⟦next to⟧ a ⟦suit of armor⟧'], cauldron:['the cauldron','⟦next to⟧ a ⟦cauldron⟧'], plant:['the plant','⟦next to⟧ a ⟦plant⟧'] },
  de: { chair:['der Stuhl','auf einem ⟦Stuhl⟧'], sofa:['das Sofa','auf einem ⟦Sofa⟧'], rug:['der Teppich','auf einem ⟦Teppich⟧'], bed:['das Bett','auf einem ⟦Bett⟧'], bench:['die Bank','auf einer ⟦Bank⟧'],
        armchair:['der Sessel','auf einem ⟦Sessel⟧'], rocker:['der Schaukelstuhl','auf einem ⟦Schaukelstuhl⟧'], haybale:['der Heuballen','auf einem ⟦Heuballen⟧'], coffin:['der Sarg','auf einem ⟦Sarg⟧'],
        table:['der Tisch','⟦neben⟧ einem ⟦Tisch⟧'], desk:['der Schreibtisch','⟦neben⟧ einem ⟦Schreibtisch⟧'], shelf:['das Bücherregal','⟦neben⟧ einem ⟦Bücherregal⟧'], piano:['das Klavier','⟦neben⟧ einem ⟦Klavier⟧'],
        clock:['die Standuhr','⟦neben⟧ einer ⟦Standuhr⟧'], armor:['die Ritterrüstung','⟦neben⟧ einer ⟦Ritterrüstung⟧'], cauldron:['der Kessel','⟦neben⟧ einem ⟦Kessel⟧'], plant:['die Pflanze','⟦neben⟧ einer ⟦Pflanze⟧'] },
  fr: { chair:['la chaise','sur une ⟦chaise⟧'], sofa:['le canapé','sur un ⟦canapé⟧'], rug:['le tapis','sur un ⟦tapis⟧'], bed:['le lit','sur un ⟦lit⟧'], bench:['le banc','sur un ⟦banc⟧'],
        armchair:['le fauteuil','sur un ⟦fauteuil⟧'], rocker:['le rocking-chair','sur le ⟦rocking-chair⟧'], haybale:['la botte de foin','sur une ⟦botte de foin⟧'], coffin:['le cercueil','sur un ⟦cercueil⟧'],
        table:['la table',"⟦à côté⟧ d'une ⟦table⟧"], desk:['le bureau',"⟦à côté⟧ d'un ⟦bureau⟧"], shelf:['la bibliothèque',"⟦à côté⟧ d'une ⟦bibliothèque⟧"], piano:['le piano',"⟦à côté⟧ d'un ⟦piano⟧"],
        clock:["l'horloge comtoise","⟦à côté⟧ d'une ⟦horloge comtoise⟧"], armor:["l'armure","⟦à côté⟧ d'une ⟦armure⟧"], cauldron:['le chaudron',"⟦à côté⟧ d'un ⟦chaudron⟧"], plant:['la plante',"⟦à côté⟧ d'une ⟦plante⟧"] },
  es: { chair:['la silla','en una ⟦silla⟧'], sofa:['el sofá','en un ⟦sofá⟧'], rug:['la alfombra','sobre una ⟦alfombra⟧'], bed:['la cama','en una ⟦cama⟧'], bench:['el banco','en un ⟦banco⟧'],
        armchair:['el sillón','en un ⟦sillón⟧'], rocker:['la mecedora','en una ⟦mecedora⟧'], haybale:['la paca de heno','en una ⟦paca de heno⟧'], coffin:['el ataúd','sobre un ⟦ataúd⟧'],
        table:['la mesa','⟦junto a⟧ una ⟦mesa⟧'], desk:['el escritorio','⟦junto a⟧ un ⟦escritorio⟧'], shelf:['la estantería','⟦junto a⟧ una ⟦estantería⟧'], piano:['el piano','⟦junto a⟧ un ⟦piano⟧'],
        clock:['el reloj de pie','⟦junto a⟧ un ⟦reloj de pie⟧'], armor:['la armadura','⟦junto a⟧ una ⟦armadura⟧'], cauldron:['el caldero','⟦junto a⟧ un ⟦caldero⟧'], plant:['la planta','⟦junto a⟧ una ⟦planta⟧'] }
};

var SIT = { chair: 1, sofa: 1, bench: 1, armchair: 1, rocker: 1, haybale: 1 };

var OBJ = {
 chair:{occ:1,hu:'szék'}, sofa:{occ:1,hu:'kanapé'}, rug:{occ:1,hu:'szőnyeg'}, bed:{occ:1,hu:'ágy'}, bench:{occ:1,hu:'pad'},
 armchair:{occ:1,hu:'fotel'}, rocker:{occ:1,hu:'hintaszék'}, haybale:{occ:1,hu:'szénabála'}, coffin:{occ:1,hu:'koporsó'},
 table:{hu:'asztal'}, desk:{hu:'íróasztal'}, shelf:{hu:'könyvespolc'}, piano:{hu:'zongora'},
 clock:{hu:'állóóra'}, armor:{hu:'páncél'}, cauldron:{hu:'üst'}, plant:{hu:'szobanövény'}
};
var HU_ON={chair:'egy széken ült',sofa:'egy kanapén ült',rug:'egy szőnyegen állt',bed:'egy ágyon volt',bench:'egy padon ült',armchair:'egy fotelben ült',rocker:'egy hintaszékben ült',haybale:'egy szénabálán ült',coffin:'egy koporsón feküdt'};
var HU_BY={table:'egy asztal',desk:'egy íróasztal',shelf:'egy könyvespolc',piano:'egy zongora',clock:'egy állóóra',armor:'egy páncél',cauldron:'egy üst',plant:'egy szobanövény'};

if (typeof module !== 'undefined') module.exports = { ROOMS: ROOMS, OBJL: OBJL, SIT: SIT, OBJ: OBJ, HU_ON: HU_ON, HU_BY: HU_BY };
