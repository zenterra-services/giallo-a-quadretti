/* Rejtő a Quadretti — UI copy in the pack's voice. */
var PACK_UI = {
  it: { tag: "Gialli d'altri tempi", eyebrow: 'Dossier · {n} casi',
    pigeon: 'Tranquilli, ci penso io… cioè, il capitano.' },
  en: { tag: 'Vintage mysteries', eyebrow: 'Dossiers · {n} cases',
    pigeon: "Relax, I've got this… I mean, the captain has." },
  de: { tag: 'Krimis von damals', eyebrow: 'Akten · {n} Fälle',
    pigeon: 'Keine Sorge, ich mach das… also, der Kapitän.' },
  fr: { tag: "Polars d'autrefois", eyebrow: 'Dossiers · {n} affaires',
    pigeon: "Pas de panique, je m'en occupe… enfin, le capitaine." },
  es: { tag: 'Misterios de época', eyebrow: 'Expedientes · {n} casos',
    pigeon: 'Tranquilos, yo me encargo… bueno, el capitán.' }
};
if (typeof module !== 'undefined') module.exports = PACK_UI;
