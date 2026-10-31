/* Scooby a Quadretti — UI copy in the pack's spooky-but-sweet voice.
   Overrides the murder framing with the "Who took the Scooby Snacks?" premise.
   clueVictim is a pack hook read by the engine for the victim's clue line. */
var PACK_UI = {
  it: {
    tag: 'Misteri da brivido ad Halloween', eyebrow: 'Caselle · {n} casi',
    h1a: 'Chi ha preso gli ', h1b: 'Scooby Snacks?',
    lead: "Leggi gli indizi in italiano. Metti ogni amico sulla mappa di Villa Spooky Hollow. Scopri chi era da solo con la scatola degli Scooby Snacks.",
    pigeon: 'Psst… zoinks! La scatola non può essere lontana. Hai controllato vicino al falò?',
    victim: 'SPARITA', suspects: 'Amici',
    killerIs: 'Chi ha preso gli Scooby Snacks?', solved: 'È stato {n} a prendere gli Scooby Snacks!',
    nope: 'No! {n} non era nella ⟦stanza⟧ della scatola.',
    clueVictim: 'Questa è la ⟦scatola⟧ degli Scooby Snacks. Era da sola con il ⟦colpevole⟧.',
    rules: ['Una persona per ⟦riga⟧ e per ⟦colonna⟧.', 'Puoi stare su ⟦sedie⟧, ⟦divani⟧, ⟦letti⟧, ⟦panche⟧, ⟦tappeti⟧, ⟦poltrone⟧, ⟦sedie a dondolo⟧, ⟦balle di fieno⟧ e ⟦bare⟧. Sulle altre cose no.', '⟦Accanto⟧ = subito sopra, sotto, a destra o a sinistra, nella stessa stanza.', '⟦Nord⟧ è su, ⟦sud⟧ è giù, ⟦est⟧ è a destra, ⟦ovest⟧ a sinistra.', "La ⟦scatola⟧ è sull'ultima casella libera. Chi era solo con lei è il ⟦colpevole⟧."],
    tips: ['Comincia da chi ha un indizio preciso, come una riga o una stanza.', 'Una persona per riga e per colonna. Segna con ✕ le caselle impossibili.', 'Se una riga ha una sola casella libera, qualcuno deve stare lì.', '«Accanto» vale solo nella stessa stanza. Il muro separa!', "Alla fine la scatola va sull'ultima casella libera. Zoinks!"],
    gl: { victim: 'la scatola degli snack', killer: 'il colpevole' }
  },
  en: {
    tag: 'Spooky-sweet Halloween mysteries', eyebrow: 'Case files · {n} cases',
    h1a: 'Who took the ', h1b: 'Scooby Snacks?',
    lead: 'Read the clues in English. Put every friend on the map of Spooky Hollow Manor. Find out who was alone with the box of Scooby Snacks.',
    pigeon: 'Psst… zoinks! The box can’t be far. Have you checked by the bonfire?',
    victim: 'MISSING', suspects: 'Friends',
    killerIs: 'Who took the Scooby Snacks?', solved: '{n} took the Scooby Snacks!',
    nope: 'No! {n} was not in the box’s ⟦room⟧.',
    clueVictim: 'This is the ⟦box⟧ of Scooby Snacks. It was alone with the ⟦culprit⟧.',
    rules: ['One person per ⟦row⟧ and per ⟦column⟧.', 'You can stand on ⟦chairs⟧, ⟦sofas⟧, ⟦beds⟧, ⟦benches⟧, ⟦rugs⟧, ⟦armchairs⟧, ⟦rocking chairs⟧, ⟦hay bales⟧ and ⟦coffins⟧. Not on other things.', '⟦Next to⟧ = directly above, below, left or right, in the same room.', '⟦North⟧ is up, ⟦south⟧ is down, ⟦east⟧ is right, ⟦west⟧ is left.', 'The ⟦box⟧ is on the last free square. Whoever was alone with it is the ⟦culprit⟧.'],
    tips: ['Start with the friend who has an exact clue, like a row or a room.', 'One person per row and column. Mark impossible squares with ✕.', 'If a row has only one free square, someone must be there.', '“Next to” only counts in the same room. Walls separate!', 'At the end, the box goes on the last free square. Zoinks!'],
    gl: { victim: 'the snack box', killer: 'the culprit' }
  },
  de: {
    tag: 'Gruselig-süße Halloween-Rätsel', eyebrow: 'Akten · {n} Fälle',
    h1a: 'Wer hat die ', h1b: 'Scooby Snacks genommen?',
    lead: 'Lies die Hinweise auf Deutsch. Setz alle Freunde auf den Plan von Spooky Hollow. Finde heraus, wer allein bei der Schachtel Scooby Snacks war.',
    pigeon: 'Psst… zoinks! Die Schachtel ist bestimmt nicht weit. Hast du am Lagerfeuer geschaut?',
    victim: 'VERSCHWUNDEN', suspects: 'Freunde',
    killerIs: 'Wer hat die Scooby Snacks genommen?', solved: '{n} hat die Scooby Snacks genommen!',
    nope: 'Nein! {n} war nicht im ⟦Raum⟧ der Schachtel.',
    clueVictim: 'Das ist die ⟦Schachtel⟧ der Scooby Snacks. Sie war allein mit dem ⟦Übeltäter⟧.',
    rules: ['Eine Person pro ⟦Reihe⟧ und pro ⟦Spalte⟧.', 'Man darf auf ⟦Stühlen⟧, ⟦Sofas⟧, ⟦Betten⟧, ⟦Bänken⟧, ⟦Teppichen⟧, ⟦Sesseln⟧, ⟦Schaukelstühlen⟧, ⟦Heuballen⟧ und ⟦Särgen⟧ stehen. Auf anderen Dingen nicht.', '⟦Neben⟧ = direkt darüber, darunter, links oder rechts, im selben Raum.', '⟦Norden⟧ ist oben, ⟦Süden⟧ unten, ⟦Osten⟧ rechts, ⟦Westen⟧ links.', 'Die ⟦Schachtel⟧ steht auf dem letzten freien Feld. Wer allein bei ihr war, ist der ⟦Übeltäter⟧.'],
    tips: ['Fang bei der Person an, die einen genauen Hinweis hat, zum Beispiel eine Reihe oder einen Raum.', 'Eine Person pro Reihe und Spalte. Markiere unmögliche Felder mit ✕.', 'Hat eine Reihe nur ein freies Feld, muss dort jemand stehen.', '„Neben“ gilt nur im selben Raum. Wände trennen!', 'Am Ende kommt die Schachtel auf das letzte freie Feld. Zoinks!'],
    gl: { victim: 'die Snackschachtel', killer: 'der Übeltäter' }
  },
  fr: {
    tag: 'Mystères d’Halloween qui font frissonner', eyebrow: 'Dossiers · {n} affaires',
    h1a: 'Qui a pris les ', h1b: 'Scooby Snacks ?',
    lead: 'Lis les indices en français. Place chaque ami sur le plan du manoir Spooky Hollow. Découvre qui était seul avec la boîte de Scooby Snacks.',
    pigeon: 'Psst… zoinks ! La boîte ne peut pas être loin. Tu as regardé près du feu de joie ?',
    victim: 'DISPARUE', suspects: 'Amis',
    killerIs: 'Qui a pris les Scooby Snacks ?', solved: "C'est {n} qui a pris les Scooby Snacks !",
    nope: 'Non ! {n} n’était pas dans la ⟦pièce⟧ de la boîte.',
    clueVictim: 'Voici la ⟦boîte⟧ de Scooby Snacks. Elle était seule avec le ⟦coupable⟧.',
    rules: ['Une personne par ⟦ligne⟧ et par ⟦colonne⟧.', 'On peut se mettre sur les ⟦chaises⟧, ⟦canapés⟧, ⟦lits⟧, ⟦bancs⟧, ⟦tapis⟧, ⟦fauteuils⟧, ⟦rocking-chairs⟧, ⟦bottes de foin⟧ et ⟦cercueils⟧. Pas sur les autres objets.', '⟦À côté⟧ = juste au-dessus, en dessous, à gauche ou à droite, dans la même pièce.', 'Le ⟦nord⟧ est en haut, le ⟦sud⟧ en bas, l’⟦est⟧ à droite, l’⟦ouest⟧ à gauche.', 'La ⟦boîte⟧ est sur la dernière case libre. Celui qui était seul avec elle est le ⟦coupable⟧.'],
    tips: ['Commence par l’ami qui a un indice précis, comme une ligne ou une pièce.', 'Une personne par ligne et par colonne. Marque les cases impossibles avec ✕.', "Si une ligne n'a qu'une case libre, quelqu'un doit y être.", '« À côté » ne compte que dans la même pièce. Les murs séparent !', 'À la fin, la boîte va sur la dernière case libre. Zoinks !'],
    gl: { victim: 'la boîte de snacks', killer: 'le coupable' }
  },
  es: {
    tag: 'Misterios de Halloween de dulce susto', eyebrow: 'Expedientes · {n} casos',
    h1a: '¿Quién se llevó los ', h1b: 'Scooby Snacks?',
    lead: 'Lee las pistas en español. Coloca a cada amigo en el mapa de la mansión Spooky Hollow. Descubre quién estaba a solas con la caja de Scooby Snacks.',
    pigeon: 'Psst… ¡zoinks! La caja no puede estar lejos. ¿Has mirado junto a la hoguera?',
    victim: 'PERDIDA', suspects: 'Amigos',
    killerIs: '¿Quién se llevó los Scooby Snacks?', solved: '¡{n} se llevó los Scooby Snacks!',
    nope: '¡No! {n} no estaba en la ⟦habitación⟧ de la caja.',
    clueVictim: 'Esta es la ⟦caja⟧ de los Scooby Snacks. Estaba a solas con el ⟦culpable⟧.',
    rules: ['Una persona por ⟦fila⟧ y por ⟦columna⟧.', 'Te puedes poner en ⟦sillas⟧, ⟦sofás⟧, ⟦camas⟧, ⟦bancos⟧, ⟦alfombras⟧, ⟦sillones⟧, ⟦mecedoras⟧, ⟦balas de heno⟧ y ⟦ataúdes⟧. En las demás cosas no.', '⟦Junto a⟧ = justo arriba, abajo, a la izquierda o a la derecha, en la misma habitación.', 'El ⟦norte⟧ está arriba, el ⟦sur⟧ abajo, el ⟦este⟧ a la derecha y el ⟦oeste⟧ a la izquierda.', 'La ⟦caja⟧ está en la última casilla libre. Quien estaba a solas con ella es el ⟦culpable⟧.'],
    tips: ['Empieza por quien tiene una pista exacta, como una fila o una habitación.', 'Una persona por fila y por columna. Marca con ✕ las casillas imposibles.', 'Si una fila tiene una sola casilla libre, alguien tiene que estar ahí.', '«Junto a» solo vale en la misma habitación. ¡Las paredes separan!', 'Al final, la caja va en la última casilla libre. ¡Zoinks!'],
    gl: { victim: 'la caja de snacks', killer: 'el culpable' }
  }
};
if (typeof module !== 'undefined') module.exports = PACK_UI;
