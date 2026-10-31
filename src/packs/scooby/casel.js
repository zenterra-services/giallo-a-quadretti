/* Scooby a Quadretti — case titles and one-liners in en/de/fr/es.
   Italian lives in cases.json; Hungarian is titleHu/flavHu, shown with the HU helper. */
var CASEL = {
  'vanishing-snacks': {
    en: ['The Vanishing Snacks', 'Halloween night at Spooky Hollow Manor. During the party, the box of Scooby Snacks vanished from the foyer!'],
    de: ['Die verschwundenen Snacks', 'Halloween-Nacht im Spukhaus-Spooky-Hollow. Während der Party ist die Schachtel Scooby Snacks aus der Eingangshalle verschwunden!'],
    fr: ['Les snacks envolés', "Nuit d'Halloween au manoir Spooky Hollow. Pendant la fête, la boîte de Scooby Snacks a disparu du hall !"],
    es: ['Los snacks desaparecidos', 'Noche de Halloween en la mansión Spooky Hollow. ¡Durante la fiesta, la caja de Scooby Snacks desapareció del vestíbulo!']
  },
  'pumpkin-prank': {
    en: ['The Pumpkin Patch Prank', 'Out among the pumpkins, someone is playing pranks. The snack box went missing between one laugh and the next!'],
    de: ['Der Kürbisfeld-Streich', 'Draußen zwischen den Kürbissen spielt jemand Streiche. Die Snackschachtel ist zwischen zwei Lachern verschwunden!'],
    fr: ['La farce du champ de citrouilles', "Dehors, parmi les citrouilles, quelqu'un fait des farces. La boîte de snacks a disparu entre deux éclats de rire !"],
    es: ['La broma del huerto de calabazas', 'Ahí fuera, entre las calabazas, alguien gasta bromas. ¡La caja de snacks desapareció entre risa y risa!']
  },
  'ghost-library': {
    en: ['The Ghost in the Library', 'A white figure was seen floating in the library. And the Scooby Snacks? Gone!'],
    de: ['Der Geist in der Bibliothek', 'Eine weiße Gestalt wurde in der Bibliothek gesehen. Und die Scooby Snacks? Verschwunden!'],
    fr: ['Le fantôme de la bibliothèque', 'Une silhouette blanche a été aperçue dans la bibliothèque. Et les Scooby Snacks ? Disparus !'],
    es: ['El fantasma de la biblioteca', 'Se vio una figura blanca flotando en la biblioteca. ¿Y los Scooby Snacks? ¡Desaparecieron!']
  },
  'midnight-bonfire': {
    en: ['Midnight at the Bonfire', 'Spooky stories around the fair bonfire. When midnight struck, the snack box was nowhere to be found!'],
    de: ['Mitternacht am Lagerfeuer', 'Gruselgeschichten am Lagerfeuer des Jahrmarkts. Als es Mitternacht schlug, war die Snackschachtel weg!'],
    fr: ['Minuit au feu de joie', 'Histoires effrayantes autour du feu de joie de la fête. À minuit, la boîte de snacks avait disparu !'],
    es: ['Medianoche junto a la hoguera', 'Historias de miedo junto a la hoguera de la feria. Al dar la medianoche, ¡la caja de snacks ya no estaba!']
  },
  'fortune-warning': {
    en: ["The Fortune Teller's Warning", 'Madame Zora gazes into her crystal ball: "Beware the snacks!" Too late...'],
    de: ['Die Warnung der Wahrsagerin', 'Madame Zora blickt in ihre Kristallkugel: „Hütet euch vor den Snacks!" Zu spät...'],
    fr: ["L'avertissement de la voyante", 'Madame Zora lit sa boule de cristal : « Méfiez-vous des snacks ! » Trop tard...'],
    es: ['La advertencia de la vidente', 'Madame Zora mira su bola de cristal: «¡Cuidado con los snacks!» Demasiado tarde...']
  },
  'cellar-cobwebs': {
    en: ['Cobwebs in the Cellar', 'The manor cellar is full of cobwebs and strange noises. Who carried the snacks down there?'],
    de: ['Spinnenweben im Keller', 'Der Keller des Hauses ist voller Spinnenweben und seltsamer Geräusche. Wer hat die Snacks hinuntergetragen?'],
    fr: ['Toiles d’araignée à la cave', 'La cave du manoir est pleine de toiles d’araignée et de bruits étranges. Qui a descendu les snacks ?'],
    es: ['Telarañas en el sótano', 'El sótano de la mansión está lleno de telarañas y ruidos extraños. ¿Quién bajó los snacks?']
  },
  'corn-maze-chase': {
    en: ['The Corn Maze Chase', 'A scarecrow... moved! The gang chases it through the corn maze, but the snacks disappear.'],
    de: ['Die Jagd im Maislabyrinth', 'Eine Vogelscheuche... hat sich bewegt! Die Bande jagt sie durchs Maislabyrinth, doch die Snacks verschwinden.'],
    fr: ['La poursuite dans le labyrinthe', "Un épouvantail... a bougé ! La bande le poursuit dans le labyrinthe de maïs, mais les snacks disparaissent."],
    es: ['La persecución en el laberinto', '¡Un espantapájaros... se movió! La pandilla lo persigue por el laberinto de maíz, pero los snacks desaparecen.']
  },
  'thunder-tower': {
    en: ['Thunder over the Tower', 'A storm strikes the manor tower. In the darkness, someone hid the Scooby Snacks!'],
    de: ['Gewitter über dem Turm', 'Ein Sturm trifft den Turm des Hauses. Im Dunkeln hat jemand die Scooby Snacks versteckt!'],
    fr: ['Tonnerre sur la tour', 'Un orage frappe la tour du manoir. Dans le noir, quelqu’un a caché les Scooby Snacks !'],
    es: ['Truenos sobre la torre', 'Una tormenta azota la torre de la mansión. ¡En la oscuridad, alguien escondió los Scooby Snacks!']
  },
  'graveyard-gig': {
    en: ['The Graveyard Gig', 'Mysterious music echoes from the old graveyard. During the concert, the box went missing!'],
    de: ['Das Friedhofskonzert', 'Geheimnisvolle Musik erklingt vom alten Friedhof. Während des Konzerts verschwand die Schachtel!'],
    fr: ['Le concert du cimetière', 'Une musique mystérieuse résonne depuis le vieux cimetière. Pendant le concert, la boîte a disparu !'],
    es: ['El concierto del cementerio', 'Una música misteriosa resuena desde el viejo cementerio. ¡Durante el concierto, la caja desapareció!']
  },
  'headless-scarecrow': {
    en: ['The Headless Scarecrow', 'The fair scarecrow has lost its head... and the snacks have lost their box!'],
    de: ['Die kopflose Vogelscheuche', 'Die Vogelscheuche des Jahrmarkts hat ihren Kopf verloren... und die Snacks ihre Schachtel!'],
    fr: ["L'épouvantail sans tête", "L'épouvantail de la fête a perdu sa tête... et les snacks ont perdu leur boîte !"],
    es: ['El espantapájaros sin cabeza', '¡El espantapájaros de la feria ha perdido la cabeza... y los snacks han perdido su caja!']
  },
  'ballroom-howl': {
    en: ['The Ballroom Howl', 'An icy howl fills the ballroom during the costume ball. The snacks: gone!'],
    de: ['Das Heulen im Ballsaal', 'Ein eisiges Heulen erfüllt den Ballsaal während des Kostümballs. Die Snacks: weg!'],
    fr: ['Le hurlement de la salle de bal', 'Un hurlement glacial remplit la salle de bal pendant le bal costumé. Les snacks : disparus !'],
    es: ['El aullido del salón de baile', 'Un aullido helado llena el salón de baile durante el baile de disfraces. Los snacks: ¡desaparecidos!']
  },
  'last-scooby-snack': {
    en: ['The Last Scooby Snack', 'Only one Scooby Snack was left... and now that one is gone too! The grand Halloween finale.'],
    de: ['Der letzte Scooby Snack', 'Es war nur noch ein einziger Scooby Snack übrig... und jetzt ist auch der weg! Das große Halloween-Finale.'],
    fr: ['Le dernier Scooby Snack', "Il ne restait plus qu'un seul Scooby Snack... et il a disparu lui aussi ! Le grand final d'Halloween."],
    es: ['El último Scooby Snack', 'Solo quedaba un Scooby Snack... ¡y ese también ha desaparecido! El gran final de Halloween.']
  }
};
if (typeof module !== 'undefined') module.exports = CASEL;
