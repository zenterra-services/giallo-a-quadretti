/* Scooby a Quadretti — spooky Halloween night palette. */
var BGS=['orange','lavender','teal','yellow','purple','peach','sky'];
var PCOL=['#E8721C','#7FC4C9','#A98AD4','#FFD98E','#9ADFC3','#F2A56B'];
var FALLBACK_LOOK=[0,'short','k',[],'teal','smile'];
var SHORT_NAMES={'Scooby-Doo':'Scooby','Shaggy Rogers':'Shaggy','Fred Jones':'Fred','Daphne Blake':'Daphne','Velma Dinkley':'Velma','Madame Zora':'Zora','Groundskeeper Gus':'Gus','Widow Ravenna':'Ravenna','Scooby Snacks':'Snacks'};

if (typeof module !== 'undefined') module.exports = { BGS: BGS, PCOL: PCOL, FALLBACK_LOOK: FALLBACK_LOOK, SHORT_NAMES: SHORT_NAMES };
