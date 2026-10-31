/* Yamada a Quadretti — UI copy in the pack's cozy voice.
   Overrides the murder framing with the "Who hid Choco?" premise.
   clueVictim is a pack hook read by the engine for the victim's clue line. */
var PACK_UI = {
  it: {
    tag: 'Misteri teneri tra videogiochi', eyebrow: 'Caselle · {n} casi',
    h1a: 'Chi ha nascosto ', h1b: 'Choco?',
    lead: 'Leggi gli indizi in italiano. Metti ogni amico sulla mappa. Scopri chi era da solo con Choco, la mascotte di peluche della gilda.',
    pigeon: 'Psst… Choco non può essere lontana. Hai controllato gli snack?',
    victim: 'SCOMPARSA', suspects: 'Amici',
    killerIs: 'Chi ha nascosto Choco?', solved: 'È stato {n} a nascondere Choco!',
    nope: 'No! {n} non era nella ⟦stanza⟧ di Choco.',
    clueVictim: 'Lei è ⟦Choco⟧, il peluche della gilda. Era da sola con il ⟦colpevole⟧.',
    rules: ['Una persona per ⟦riga⟧ e per ⟦colonna⟧.', 'Puoi stare su ⟦sedie⟧, ⟦divani⟧, ⟦letti⟧, ⟦panche⟧ e ⟦tappeti⟧. Sulle altre cose no.', '⟦Accanto⟧ = subito sopra, sotto, a destra o a sinistra, nella stessa stanza.', '⟦Nord⟧ è su, ⟦sud⟧ è giù, ⟦est⟧ è a destra, ⟦ovest⟧ a sinistra.', "⟦Choco⟧ è sull'ultima casella libera. Chi era solo con lei è il ⟦colpevole⟧."],
    tips: ['Comincia da chi ha un indizio preciso, come una riga o una stanza.', 'Una persona per riga e per colonna. Segna con ✕ le caselle impossibili.', 'Se una riga ha una sola casella libera, qualcuno deve stare lì.', '«Accanto» vale solo nella stessa stanza. Il muro separa!', "Alla fine Choco va sull'ultima casella libera."],
    gl: { victim: 'Choco', killer: 'il colpevole' }
  },
  en: {
    tag: 'Cozy gaming mysteries', eyebrow: 'Case files · {n} cases',
    h1a: 'Who hid ', h1b: 'Choco?',
    lead: 'Read the clues in English. Put every friend on the map. Find out who was alone with Choco, the guild plushie.',
    pigeon: 'Psst… Choco can’t be far. Have you checked the snacks?',
    victim: 'MISSING', suspects: 'Friends',
    killerIs: 'Who hid Choco?', solved: '{n} hid Choco!',
    nope: 'No! {n} was not in Choco’s ⟦room⟧.',
    clueVictim: 'This is ⟦Choco⟧, the guild plushie. She was alone with the ⟦culprit⟧.',
    rules: ['One person per ⟦row⟧ and per ⟦column⟧.', 'You can stand on ⟦chairs⟧, ⟦sofas⟧, ⟦beds⟧, ⟦benches⟧ and ⟦rugs⟧. Not on other things.', '⟦Next to⟧ = directly above, below, left or right, in the same room.', '⟦North⟧ is up, ⟦south⟧ is down, ⟦east⟧ is right, ⟦west⟧ is left.', '⟦Choco⟧ is on the last free square. Whoever was alone with her is the ⟦culprit⟧.'],
    tips: ['Start with the friend who has an exact clue, like a row or a room.', 'One person per row and column. Mark impossible squares with ✕.', 'If a row has only one free square, someone must be there.', '“Next to” only counts in the same room. Walls separate!', 'At the end, Choco goes on the last free square.'],
    gl: { victim: 'Choco', killer: 'the culprit' }
  },
  de: {
    tag: 'Gemütliche Gaming-Rätsel', eyebrow: 'Akten · {n} Fälle',
    h1a: 'Wer hat ', h1b: 'Choco versteckt?',
    lead: 'Lies die Hinweise auf Deutsch. Setz alle Freunde auf den Plan. Finde heraus, wer allein mit Choco war, dem Plüschtier der Gilde.',
    pigeon: 'Psst… Choco ist bestimmt nicht weit. Hast du bei den Snacks geschaut?',
    victim: 'VERMISST', suspects: 'Freunde',
    killerIs: 'Wer hat Choco versteckt?', solved: '{n} hat Choco versteckt!',
    nope: 'Nein! {n} war nicht in Chocos ⟦Raum⟧.',
    clueVictim: 'Das ist ⟦Choco⟧, das Plüschtier der Gilde. Sie war allein mit dem ⟦Übeltäter⟧.',
    rules: ['Eine Person pro ⟦Reihe⟧ und pro ⟦Spalte⟧.', 'Man darf auf ⟦Stühlen⟧, ⟦Sofas⟧, ⟦Betten⟧, ⟦Bänken⟧ und ⟦Teppichen⟧ stehen. Auf anderen Dingen nicht.', '⟦Neben⟧ = direkt darüber, darunter, links oder rechts, im selben Raum.', '⟦Norden⟧ ist oben, ⟦Süden⟧ unten, ⟦Osten⟧ rechts, ⟦Westen⟧ links.', '⟦Choco⟧ steht auf dem letzten freien Feld. Wer allein bei ihr war, ist der ⟦Übeltäter⟧.'],
    tips: ['Fang bei der Person an, die einen genauen Hinweis hat, zum Beispiel eine Reihe oder einen Raum.', 'Eine Person pro Reihe und Spalte. Markiere unmögliche Felder mit ✕.', 'Hat eine Reihe nur ein freies Feld, muss dort jemand stehen.', '„Neben“ gilt nur im selben Raum. Wände trennen!', 'Am Ende kommt Choco auf das letzte freie Feld.'],
    gl: { victim: 'Choco', killer: 'der Übeltäter' }
  },
  fr: {
    tag: 'Mystères gaming tout doux', eyebrow: 'Dossiers · {n} affaires',
    h1a: 'Qui a caché ', h1b: 'Choco ?',
    lead: 'Lis les indices en français. Place chaque ami sur le plan. Découvre qui était seul avec Choco, la peluche de la guilde.',
    pigeon: 'Psst… Choco ne peut pas être loin. Tu as regardé du côté des snacks ?',
    victim: 'DISPARUE', suspects: 'Amis',
    killerIs: 'Qui a caché Choco ?', solved: "C'est {n} qui a caché Choco !",
    nope: 'Non ! {n} n’était pas dans la ⟦pièce⟧ de Choco.',
    clueVictim: 'Voici ⟦Choco⟧, la peluche de la guilde. Elle était seule avec le ⟦coupable⟧.',
    rules: ['Une personne par ⟦ligne⟧ et par ⟦colonne⟧.', 'On peut se mettre sur les ⟦chaises⟧, ⟦canapés⟧, ⟦lits⟧, ⟦bancs⟧ et ⟦tapis⟧. Pas sur les autres objets.', '⟦À côté⟧ = juste au-dessus, en dessous, à gauche ou à droite, dans la même pièce.', 'Le ⟦nord⟧ est en haut, le ⟦sud⟧ en bas, l’⟦est⟧ à droite, l’⟦ouest⟧ à gauche.', '⟦Choco⟧ est sur la dernière case libre. Celui qui était seul avec elle est le ⟦coupable⟧.'],
    tips: ['Commence par l’ami qui a un indice précis, comme une ligne ou une pièce.', 'Une personne par ligne et par colonne. Marque les cases impossibles avec ✕.', "Si une ligne n'a qu'une case libre, quelqu'un doit y être.", '« À côté » ne compte que dans la même pièce. Les murs séparent !', 'À la fin, Choco va sur la dernière case libre.'],
    gl: { victim: 'Choco', killer: 'le coupable' }
  },
  es: {
    tag: 'Misterios gamers adorables', eyebrow: 'Expedientes · {n} casos',
    h1a: '¿Quién escondió a ', h1b: 'Choco?',
    lead: 'Lee las pistas en español. Coloca a cada amigo en el mapa. Descubre quién estaba a solas con Choco, el peluche del gremio.',
    pigeon: 'Psst… Choco no puede estar lejos. ¿Has mirado junto a los snacks?',
    victim: 'PERDIDA', suspects: 'Amigos',
    killerIs: '¿Quién escondió a Choco?', solved: '¡{n} escondió a Choco!',
    nope: '¡No! {n} no estaba en la ⟦habitación⟧ de Choco.',
    clueVictim: 'Esta es ⟦Choco⟧, el peluche del gremio. Estaba a solas con el ⟦culpable⟧.',
    rules: ['Una persona por ⟦fila⟧ y por ⟦columna⟧.', 'Te puedes poner en ⟦sillas⟧, ⟦sofás⟧, ⟦camas⟧, ⟦bancos⟧ y ⟦alfombras⟧. En las demás cosas no.', '⟦Junto a⟧ = justo arriba, abajo, a la izquierda o a la derecha, en la misma habitación.', 'El ⟦norte⟧ está arriba, el ⟦sur⟧ abajo, el ⟦este⟧ a la derecha y el ⟦oeste⟧ a la izquierda.', '⟦Choco⟧ está en la última casilla libre. Quien estaba a solas con ella es el ⟦culpable⟧.'],
    tips: ['Empieza por quien tiene una pista exacta, como una fila o una habitación.', 'Una persona por fila y por columna. Marca con ✕ las casillas imposibles.', 'Si una fila tiene una sola casilla libre, alguien tiene que estar ahí.', '«Junto a» solo vale en la misma habitación. ¡Las paredes separan!', 'Al final, Choco va en la última casilla libre.'],
    gl: { victim: 'Choco', killer: 'el culpable' }
  }
};
if (typeof module !== 'undefined') module.exports = PACK_UI;
