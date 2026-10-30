/* Giallo a Quadretti — languages. ⟦…⟧ marks the key words that get the highlighter. */
var LANGS = {
  it: { name: 'Italiano', voice: 'it-IT', learn: "impara l'italiano" },
  en: { name: 'English', voice: 'en-GB', learn: 'learn English' },
  de: { name: 'Deutsch', voice: 'de-DE', learn: 'lerne Deutsch' },
  fr: { name: 'Français', voice: 'fr-FR', learn: 'apprends le français' },
  es: { name: 'Español', voice: 'es-ES', learn: 'aprende español' }
};

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

/* interface text */
var UI = {
  it: { tag: 'Gialli logici', eyebrow: 'Dossier · {n} casi', h1a: 'Chi è ', h1b: 'stato?', lead: 'Leggi gli indizi in italiano. Metti ogni sospettato sulla mappa. Trova chi era da solo con la vittima.',
    start: 'Apri il primo caso', cont: "Continua l'indagine", cases: 'I casi', how: 'Come si gioca', yes: 'Ci puoi stare sopra', no: 'Non ci puoi stare sopra',
    back: 'Tutti i casi', caso: 'Caso n°', levels: ['', 'Facile', 'Medio', 'Difficile', 'Esperto'], suspects: 'Sospettati', words: 'Parole del caso', rooms: 'Stanze', tip: 'Consiglio',
    mark: '✕ segna', hintX: 'Tocca una casella per segnarla con ✕, o per togliere una persona.', hintPlace: 'Tocca una casella per mettere {n}.', longpress: 'Tieni premuto per segnare ✕.',
    check: 'Controlla', help: 'Aiutino', restart: 'Ricomincia', undo: 'Annulla', keys: 'Frecce per spostarti, Canc per segnare ✕.', allRight: 'Tutti al posto giusto', killerIs: "L'assassino è…", next: 'Prossimo caso', again: 'Gioca di nuovo', review: 'Ripassa', notebook: 'Il tuo taccuino', cluesReview: 'Gli indizi', reviewLead: 'Rileggi con calma gli indizi e le parole di questo caso.', close: 'Chiudi', solved: "L'assassino è {n}!", time: 'Tempo', hints: 'aiutini',
    missing: 'Persone ancora da mettere: ⟦{k}⟧.', clash: 'Due persone sono nella stessa ⟦riga⟧ o ⟦colonna⟧.', wrong: 'Quasi! Al posto sbagliato: ⟦{k}⟧. Rileggi gli indizi.', hintMsg: '{n} è in ⟦riga {r}⟧, ⟦colonna {c}⟧.', blocked: 'Non puoi stare qui.', nope: 'No! {n} non era nella ⟦stanza⟧ della vittima.',
    more: 'Un altro consiglio →', victim: 'VITTIMA', lang: 'Lingua che impari', styles: 'Stile', roomStyle: 'Stile della stanza',
    coop: 'Gioca in squadra', coopLead: 'Ognuno vede solo alcuni indizi, nella lingua che impara. Leggeteli ad alta voce, condivideteli e risolvete il caso insieme.', yourName: 'Il tuo nome', create: 'Crea una stanza', join: 'Entra', code: 'Codice',
    room: 'Stanza', team: 'Squadra', you: 'tu', host: 'capo', pickCase: 'Scegli il caso per la squadra', waitHost: 'Aspetta che {n} scelga il caso.', leave: 'Esci', share: 'Condividi', sharedBy: 'condiviso da {n}', clueMoved: 'Un indizio è passato a {n}.', heldBy: 'Indizio di {n}. Chiediglielo!', yours: 'Il tuo indizio', offline: 'Gioco in squadra non disponibile qui.', invite: 'Dai il codice agli amici:', copyLink: 'Copia link invito', copied: 'Link copiato!', connecting: 'Connessione…', alone: 'Sei solo nella stanza. Invita qualcuno!',
    rules: ['Una persona per ⟦riga⟧ e per ⟦colonna⟧.', 'Puoi stare su ⟦sedie⟧, ⟦divani⟧, ⟦letti⟧ e ⟦tappeti⟧. Sugli altri oggetti no.', '⟦Accanto⟧ = subito sopra, sotto, a destra o a sinistra, nella stessa stanza.', '⟦Nord⟧ è su, ⟦sud⟧ è giù, ⟦est⟧ è a destra, ⟦ovest⟧ a sinistra.', "La ⟦vittima⟧ è nell'ultima casella libera. Chi era solo con lei è l'⟦assassino⟧."],
    tips: ['Comincia da chi ha un indizio preciso, come una riga o una stanza.', 'Una persona per riga e per colonna. Segna con ✕ le caselle impossibili.', 'Se una riga ha una sola casella libera, qualcuno deve stare lì.', '«Accanto» vale solo nella stessa stanza. Il muro separa!', "Alla fine la vittima va nell'ultima casella libera."],
    pigeon: 'Tranquilli, ci penso io… cioè, tu.',
    gl: { row: 'riga', col: 'colonna', by: 'accanto a', alone: 'solo · sola', only: "l'unica persona", with: 'la stessa area', dir: 'nord · sud · est · ovest', corner: 'angolo', not: 'non era', victim: 'la vittima', killer: "l'assassino" } },
  en: { tag: 'Logic murder mysteries', eyebrow: 'Case files · {n} cases', h1a: 'Who ', h1b: 'did it?', lead: 'Read the clues in English. Put every suspect on the map. Find who was alone with the victim.',
    start: 'Open the first case', cont: 'Continue the investigation', cases: 'The cases', how: 'How to play', yes: 'You can stand on it', no: "You can't stand on it",
    back: 'All cases', caso: 'Case no.', levels: ['', 'Easy', 'Medium', 'Hard', 'Expert'], suspects: 'Suspects', words: 'Words in this case', rooms: 'Rooms', tip: 'Tip',
    mark: '✕ mark', hintX: 'Tap a square to mark it ✕, or to remove a person.', hintPlace: 'Tap a square to place {n}.', longpress: 'Press and hold to mark ✕.',
    check: 'Check', help: 'Hint', restart: 'Start over', undo: 'Undo', keys: 'Arrow keys to move, Delete to mark ✕.', allRight: 'Everyone is in the right place', killerIs: 'The murderer is…', next: 'Next case', again: 'Play again', review: 'Review', notebook: 'Your notebook', cluesReview: 'The clues', reviewLead: 'Read the clues and the words of this case again at your own pace.', close: 'Close', solved: 'The murderer is {n}!', time: 'Time', hints: 'hints',
    missing: 'Still to place: ⟦{k}⟧.', clash: 'Two people are in the same ⟦row⟧ or ⟦column⟧.', wrong: 'Close! In the wrong place: ⟦{k}⟧. Read the clues again.', hintMsg: '{n} is in ⟦row {r}⟧, ⟦column {c}⟧.', blocked: "You can't stand here.", nope: 'No! {n} was not in the victim’s ⟦room⟧.',
    more: 'Another tip →', victim: 'VICTIM', lang: 'Language you learn', styles: 'Style', roomStyle: 'Room style',
    coop: 'Play as a team', coopLead: 'Everyone sees only some clues, in the language they are learning. Read them out, share them and solve the case together.', yourName: 'Your name', create: 'Create a room', join: 'Join', code: 'Code',
    room: 'Room', team: 'Team', you: 'you', host: 'host', pickCase: 'Choose the case for the team', waitHost: 'Waiting for {n} to choose the case.', leave: 'Leave', share: 'Share', sharedBy: 'shared by {n}', clueMoved: 'A clue moved to {n}.', heldBy: '{n} has this clue. Ask them!', yours: 'Your clue', offline: 'Team play is not available here.', invite: 'Give your friends the code:', copyLink: 'Copy invite link', copied: 'Link copied!', connecting: 'Connecting…', alone: 'You are alone in the room. Invite someone!',
    rules: ['One person per ⟦row⟧ and per ⟦column⟧.', 'You can stand on ⟦chairs⟧, ⟦sofas⟧, ⟦beds⟧ and ⟦rugs⟧. Not on other objects.', '⟦Next to⟧ = directly above, below, left or right, in the same room.', '⟦North⟧ is up, ⟦south⟧ is down, ⟦east⟧ is right, ⟦west⟧ is left.', 'The ⟦victim⟧ is on the last free square. Whoever was alone with them is the ⟦murderer⟧.'],
    tips: ['Start with the suspect who has an exact clue, like a row or a room.', 'One person per row and column. Mark impossible squares with ✕.', 'If a row has only one free square, someone must be there.', '“Next to” only counts in the same room. Walls separate!', 'At the end, the victim goes on the last free square.'],
    pigeon: 'Relax, I’ve got this… I mean, you have.',
    gl: { row: 'row', col: 'column', by: 'next to', alone: 'alone', only: 'the only person', with: 'the same room', dir: 'north · south · east · west', corner: 'corner', not: 'was not', victim: 'the victim', killer: 'the murderer' } },
  de: { tag: 'Logik-Krimis', eyebrow: 'Akten · {n} Fälle', h1a: 'Wer ', h1b: "war's?", lead: 'Lies die Hinweise auf Deutsch. Setz alle Verdächtigen auf den Plan. Finde heraus, wer allein mit dem Opfer war.',
    start: 'Ersten Fall öffnen', cont: 'Weiter ermitteln', cases: 'Die Fälle', how: "So geht's", yes: 'Darauf darf man stehen', no: 'Darauf darf man nicht stehen',
    back: 'Alle Fälle', caso: 'Fall Nr.', levels: ['', 'Leicht', 'Mittel', 'Schwer', 'Profi'], suspects: 'Verdächtige', words: 'Wörter im Fall', rooms: 'Räume', tip: 'Tipp',
    mark: '✕ markieren', hintX: 'Tippe auf ein Feld, um es mit ✕ zu markieren oder eine Person zu entfernen.', hintPlace: 'Tippe auf ein Feld, um {n} hinzustellen.', longpress: 'Lange drücken markiert ✕.',
    check: 'Prüfen', help: 'Hilfe', restart: 'Neu anfangen', undo: 'Rückgängig', keys: 'Pfeiltasten zum Bewegen, Entf zum Markieren ✕.', allRight: 'Alle stehen richtig', killerIs: 'Der Mörder ist…', next: 'Nächster Fall', again: 'Nochmal spielen', review: 'Wiederholen', notebook: 'Dein Notizbuch', cluesReview: 'Die Hinweise', reviewLead: 'Lies die Hinweise und Wörter dieses Falls in Ruhe noch einmal.', close: 'Schließen', solved: 'Der Mörder ist {n}!', time: 'Zeit', hints: 'Tipps',
    missing: 'Noch zu setzen: ⟦{k}⟧.', clash: 'Zwei Personen stehen in derselben ⟦Reihe⟧ oder ⟦Spalte⟧.', wrong: 'Fast! Falsch gesetzt: ⟦{k}⟧. Lies die Hinweise nochmal.', hintMsg: '{n} steht in ⟦Reihe {r}⟧, ⟦Spalte {c}⟧.', blocked: 'Hier kann niemand stehen.', nope: 'Nein! {n} war nicht im ⟦Raum⟧ des Opfers.',
    more: 'Noch ein Tipp →', victim: 'OPFER', lang: 'Sprache, die du lernst', styles: 'Stil', roomStyle: 'Raumstil',
    coop: 'Im Team spielen', coopLead: 'Jede Person sieht nur einige Hinweise, in der Sprache, die sie lernt. Lest sie vor, teilt sie und löst den Fall gemeinsam.', yourName: 'Dein Name', create: 'Raum erstellen', join: 'Beitreten', code: 'Code',
    room: 'Raum', team: 'Team', you: 'du', host: 'Leitung', pickCase: 'Wähle den Fall fürs Team', waitHost: 'Warte, bis {n} den Fall wählt.', leave: 'Verlassen', share: 'Teilen', sharedBy: 'geteilt von {n}', clueMoved: 'Ein Hinweis ist jetzt bei {n}.', heldBy: '{n} hat diesen Hinweis. Frag nach!', yours: 'Dein Hinweis', offline: 'Teamspiel ist hier nicht verfügbar.', invite: 'Gib deinen Freunden den Code:', copyLink: 'Einladungslink kopieren', copied: 'Link kopiert!', connecting: 'Verbinde…', alone: 'Du bist allein im Raum. Lade jemanden ein!',
    rules: ['Eine Person pro ⟦Reihe⟧ und pro ⟦Spalte⟧.', 'Man darf auf ⟦Stühlen⟧, ⟦Sofas⟧, ⟦Betten⟧ und ⟦Teppichen⟧ stehen. Auf anderen Dingen nicht.', '⟦Neben⟧ = direkt darüber, darunter, links oder rechts, im selben Raum.', '⟦Norden⟧ ist oben, ⟦Süden⟧ unten, ⟦Osten⟧ rechts, ⟦Westen⟧ links.', 'Das ⟦Opfer⟧ steht auf dem letzten freien Feld. Wer allein mit ihm war, ist der ⟦Mörder⟧.'],
    tips: ['Fang bei der Person an, die einen genauen Hinweis hat, zum Beispiel eine Reihe oder einen Raum.', 'Eine Person pro Reihe und Spalte. Markiere unmögliche Felder mit ✕.', 'Hat eine Reihe nur ein freies Feld, muss dort jemand stehen.', '„Neben“ gilt nur im selben Raum. Wände trennen!', 'Zum Schluss kommt das Opfer auf das letzte freie Feld.'],
    pigeon: 'Keine Sorge, ich mach das… also, du.',
    gl: { row: 'die Reihe', col: 'die Spalte', by: 'neben', alone: 'allein', only: 'die einzige Person', with: 'derselbe Raum', dir: 'nördlich · südlich · östlich · westlich', corner: 'die Ecke', not: 'war nicht', victim: 'das Opfer', killer: 'der Mörder' } },
  fr: { tag: 'Enquêtes logiques', eyebrow: 'Dossiers · {n} affaires', h1a: 'Qui ', h1b: "l'a fait ?", lead: "Lis les indices en français. Place chaque suspect sur le plan. Trouve qui était seul avec la victime.",
    start: 'Ouvrir la première affaire', cont: "Continuer l'enquête", cases: 'Les affaires', how: 'Comment jouer', yes: 'On peut monter dessus', no: 'On ne peut pas monter dessus',
    back: 'Toutes les affaires', caso: 'Affaire n°', levels: ['', 'Facile', 'Moyen', 'Difficile', 'Expert'], suspects: 'Suspects', words: "Mots de l'affaire", rooms: 'Pièces', tip: 'Conseil',
    mark: '✕ marquer', hintX: 'Touche une case pour la marquer ✕, ou pour retirer une personne.', hintPlace: 'Touche une case pour placer {n}.', longpress: 'Appui long pour marquer ✕.',
    check: 'Vérifier', help: 'Indice', restart: 'Recommencer', undo: 'Annuler', keys: 'Flèches pour te déplacer, Suppr pour marquer ✕.', allRight: 'Tout le monde est à sa place', killerIs: "L'assassin est…", next: 'Affaire suivante', again: 'Rejouer', review: 'Réviser', notebook: 'Ton carnet', cluesReview: 'Les indices', reviewLead: 'Relis les indices et les mots de cette affaire à ton rythme.', close: 'Fermer', solved: "L'assassin est {n} !", time: 'Temps', hints: 'indices',
    missing: 'Encore à placer : ⟦{k}⟧.', clash: 'Deux personnes sont sur la même ⟦ligne⟧ ou ⟦colonne⟧.', wrong: 'Presque ! Mal placés : ⟦{k}⟧. Relis les indices.', hintMsg: '{n} est ⟦ligne {r}⟧, ⟦colonne {c}⟧.', blocked: 'Personne ne peut se mettre ici.', nope: "Non ! {n} n'était pas dans la ⟦pièce⟧ de la victime.",
    more: 'Un autre conseil →', victim: 'VICTIME', lang: 'Langue que tu apprends', styles: 'Style', roomStyle: 'Style de la salle',
    coop: 'Jouer en équipe', coopLead: "Chacun ne voit que certains indices, dans la langue qu'il apprend. Lisez-les à voix haute, partagez-les et résolvez l'affaire ensemble.", yourName: 'Ton prénom', create: 'Créer une salle', join: 'Rejoindre', code: 'Code',
    room: 'Salle', team: 'Équipe', you: 'toi', host: 'chef', pickCase: "Choisis l'affaire pour l'équipe", waitHost: "On attend que {n} choisisse l'affaire.", leave: 'Quitter', share: 'Partager', sharedBy: 'partagé par {n}', clueMoved: 'Un indice est passé à {n}.', heldBy: '{n} a cet indice. Demande-le !', yours: 'Ton indice', offline: "Le jeu en équipe n'est pas disponible ici.", invite: 'Donne le code à tes amis :', copyLink: "Copier le lien d'invitation", copied: 'Lien copié !', connecting: 'Connexion…', alone: 'Tu es seul dans la salle. Invite quelqu’un !',
    rules: ['Une personne par ⟦ligne⟧ et par ⟦colonne⟧.', 'On peut se mettre sur les ⟦chaises⟧, ⟦canapés⟧, ⟦lits⟧ et ⟦tapis⟧. Pas sur les autres objets.', '⟦À côté⟧ = juste au-dessus, en dessous, à gauche ou à droite, dans la même pièce.', 'Le ⟦nord⟧ est en haut, le ⟦sud⟧ en bas, l’⟦est⟧ à droite, l’⟦ouest⟧ à gauche.', "La ⟦victime⟧ est sur la dernière case libre. Celui qui était seul avec elle est l'⟦assassin⟧."],
    tips: ["Commence par le suspect qui a un indice précis, comme une ligne ou une pièce.", 'Une personne par ligne et par colonne. Marque les cases impossibles avec ✕.', "Si une ligne n'a qu'une case libre, quelqu'un doit y être.", '« À côté » ne compte que dans la même pièce. Les murs séparent !', 'À la fin, la victime va sur la dernière case libre.'],
    pigeon: "Pas de panique, je m'en occupe… enfin, toi.",
    gl: { row: 'la ligne', col: 'la colonne', by: 'à côté de', alone: 'seul · seule', only: 'la seule personne', with: 'la même pièce', dir: 'nord · sud · est · ouest', corner: 'le coin', not: "n'était pas", victim: 'la victime', killer: "l'assassin" } },
  es: { tag: 'Misterios lógicos', eyebrow: 'Expedientes · {n} casos', h1a: '¿Quién ', h1b: 'fue?', lead: 'Lee las pistas en español. Pon a cada sospechoso en el mapa. Descubre quién estaba solo con la víctima.',
    start: 'Abrir el primer caso', cont: 'Seguir investigando', cases: 'Los casos', how: 'Cómo se juega', yes: 'Te puedes poner encima', no: 'No te puedes poner encima',
    back: 'Todos los casos', caso: 'Caso n.º', levels: ['', 'Fácil', 'Medio', 'Difícil', 'Experto'], suspects: 'Sospechosos', words: 'Palabras del caso', rooms: 'Habitaciones', tip: 'Consejo',
    mark: '✕ marcar', hintX: 'Toca una casilla para marcarla con ✕ o para quitar a una persona.', hintPlace: 'Toca una casilla para poner a {n}.', longpress: 'Mantén pulsado para marcar ✕.',
    check: 'Comprobar', help: 'Pista', restart: 'Empezar de nuevo', undo: 'Deshacer', keys: 'Flechas para moverte, Supr para marcar ✕.', allRight: 'Todos en su sitio', killerIs: 'El asesino es…', next: 'Siguiente caso', again: 'Jugar otra vez', review: 'Repasar', notebook: 'Tu cuaderno', cluesReview: 'Las pistas', reviewLead: 'Vuelve a leer las pistas y las palabras de este caso con calma.', close: 'Cerrar', solved: '¡El asesino es {n}!', time: 'Tiempo', hints: 'pistas',
    missing: 'Faltan por colocar: ⟦{k}⟧.', clash: 'Dos personas están en la misma ⟦fila⟧ o ⟦columna⟧.', wrong: '¡Casi! Mal colocados: ⟦{k}⟧. Vuelve a leer las pistas.', hintMsg: '{n} está en la ⟦fila {r}⟧, ⟦columna {c}⟧.', blocked: 'Aquí no se puede poner nadie.', nope: '¡No! {n} no estaba en la ⟦habitación⟧ de la víctima.',
    more: 'Otro consejo →', victim: 'VÍCTIMA', lang: 'Idioma que aprendes', styles: 'Estilo', roomStyle: 'Estilo de la sala',
    coop: 'Jugar en equipo', coopLead: 'Cada uno ve solo algunas pistas, en el idioma que aprende. Leedlas en voz alta, compartidlas y resolved el caso juntos.', yourName: 'Tu nombre', create: 'Crear una sala', join: 'Entrar', code: 'Código',
    room: 'Sala', team: 'Equipo', you: 'tú', host: 'jefe', pickCase: 'Elige el caso para el equipo', waitHost: 'Esperando a que {n} elija el caso.', leave: 'Salir', share: 'Compartir', sharedBy: 'compartido por {n}', clueMoved: 'Una pista ha pasado a {n}.', heldBy: '{n} tiene esta pista. ¡Pregúntale!', yours: 'Tu pista', offline: 'El juego en equipo no está disponible aquí.', invite: 'Dale el código a tus amigos:', copyLink: 'Copiar enlace de invitación', copied: '¡Enlace copiado!', connecting: 'Conectando…', alone: 'Estás solo en la sala. ¡Invita a alguien!',
    rules: ['Una persona por ⟦fila⟧ y por ⟦columna⟧.', 'Te puedes poner en ⟦sillas⟧, ⟦sofás⟧, ⟦camas⟧ y ⟦alfombras⟧. En los demás objetos no.', '⟦Junto a⟧ = justo arriba, abajo, a la izquierda o a la derecha, en la misma habitación.', 'El ⟦norte⟧ está arriba, el ⟦sur⟧ abajo, el ⟦este⟧ a la derecha y el ⟦oeste⟧ a la izquierda.', 'La ⟦víctima⟧ está en la última casilla libre. Quien estaba solo con ella es el ⟦asesino⟧.'],
    tips: ['Empieza por quien tiene una pista exacta, como una fila o una habitación.', 'Una persona por fila y por columna. Marca con ✕ las casillas imposibles.', 'Si una fila tiene una sola casilla libre, alguien tiene que estar ahí.', '«Junto a» solo vale en la misma habitación. ¡Las paredes separan!', 'Al final, la víctima va en la última casilla libre.'],
    pigeon: 'Tranquilos, yo me encargo… bueno, tú.',
    gl: { row: 'la fila', col: 'la columna', by: 'junto a', alone: 'solo · sola', only: 'la única persona', with: 'la misma habitación', dir: 'norte · sur · este · oeste', corner: 'la esquina', not: 'no estaba', victim: 'la víctima', killer: 'el asesino' } }
};
if (typeof module !== 'undefined') module.exports = { LANGS: LANGS, ORD: ORD, CLUE: CLUE, UI: UI };
