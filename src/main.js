const A = window.GQArt;
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const huArt=w=>/^[aeiouáéíóöőúüű]/i.test(w)?'az':'a';
const plain=s=>String(s).replace(/[⟦⟧]/g,'');
const fill=(s,v)=>String(s).replace(/\{(\w)\}/g,(m,k)=>v[k]!=null?v[k]:m);
function lookOf(name,i){ return LOOKS[name] || (typeof FALLBACK_LOOK!=='undefined'?FALLBACK_LOOK:[i%6,'short','d',[],'blue','smile']); }
const shortName=nm=> (typeof SHORT_NAMES!=='undefined'&&SHORT_NAMES[nm])||nm.split(' ').slice(-1)[0];

/* Site root from the pack path, so style links work at /giallo/, /rejto/ and previews. */
const ROOT_PATH=(()=>{ let p=location.pathname; if(PACK.path&&p.endsWith(PACK.path)) p=p.slice(0,-PACK.path.length); if(!p.endsWith('/')) p+='/'; return p; })();
const NET_PARAM=(()=>{ try{ return new URLSearchParams(location.search).get('net'); }catch(e){ return null; } })();
const chooserHref=ROOT_PATH+'?choose=1'+(NET_PARAM?'&net='+encodeURIComponent(NET_PARAM):'');
const styleHref=s=>ROOT_PATH+((s&&s.path)||'');
const globalStore={get(k,d){try{const v=localStorage.getItem('gq:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},
                   set(k,v){try{localStorage.setItem('gq:'+k,JSON.stringify(v))}catch(e){}}};

/* Keep progress, settings and rooms separate when several style packs share an origin. */
const STORE_NS=PACK.id==='giallo'?'':PACK.id+':';
const NET_NS=PACK.id==='giallo'?'':PACK.id+'-';
const roomChannel=code=>'gq-'+NET_NS+code;
const store={get(k,d){try{const v=localStorage.getItem('gq:'+STORE_NS+k);return v==null?d:JSON.parse(v)}catch(e){return d}},
             set(k,v){try{localStorage.setItem('gq:'+STORE_NS+k,JSON.stringify(v))}catch(e){}}};
let LANG=store.get('lang',PACK.defaultLang||'it'); if(!LANGS[LANG]) LANG=(PACK.defaultLang&&LANGS[PACK.defaultLang])?PACK.defaultLang:'it';
const T=k=>{ const p=(typeof PACK_UI!=='undefined')&&PACK_UI[LANG]; return p&&p[k]!=null?p[k]:UI[LANG][k]; };

/* ---------- speech ---------- */
const canSpeak = typeof window!=='undefined' && 'speechSynthesis' in window;
function voiceFor(code){ try{ const vs=speechSynthesis.getVoices(), p=code.slice(0,2); return vs.find(v=>v.lang===code)||vs.find(v=>v.lang&&v.lang.toLowerCase().startsWith(p))||null; }catch(e){ return null; } }
if(canSpeak){ try{speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged=()=>{}}catch(e){} }
function say(text){ if(!canSpeak) return; try{ speechSynthesis.cancel(); const code=LANGS[LANG].voice; const u=new SpeechSynthesisUtterance(plain(text)); u.lang=code; const v=voiceFor(code); if(v) u.voice=v; u.rate=.85; speechSynthesis.speak(u);}catch(e){} }

/* ---------- text ---------- */
const caseTitle=cs=> (S.huAll&&cs.titleHu)?cs.titleHu:(LANG==='it'?cs.title:CASEL[cs.id][LANG][0]);
const caseFlav=cs=> (S.huAll&&cs.titleHu&&cs.flavHu)?cs.flavHu:(LANG==='it'?cs.flav:CASEL[cs.id][LANG][1]);
const roomName=(cs,k)=> ROOMS[cs.rooms[k].it][LANG][0];
function clueStr(cs,cl,lang){
  lang=lang||LANG; const N=cs.size, g=cs.people[cl.p][1], who=i=>cs.people[i][0], a={};
  if(cl.t==='room'||cl.t==='notroom') a.inr=ROOMS[cs.rooms[cl.v].it][lang][1];
  if(cl.t==='on'||cl.t==='onlyon'||cl.t==='by'){ a.o=cl.v; a.on=OBJL[lang][cl.v][1]; }
  if(cl.t==='row'||cl.t==='col'){ a.last=cl.v===N-1; a.ord=ORD[lang].f[cl.v]; }
  if(cl.t==='with'||cl.t==='dir'){ a.who=who(cl.v); a.d=cl.d; }
  return CLUE[lang](cl.t,g,a);
}
const victimStr=(cs,lang)=>CLUE[lang||LANG]('victim',cs.people[cs.people.length-1][1],{});
function huStr(cs,cl){
  const N=cs.size, R=cs.rooms, name=i=>cs.people[i][0];
  const ord=v=> v===N-1 ? 'az ⟦utolsó' : huArt(ORD_HU[v])+' ⟦'+ORD_HU[v];
  switch(cl.t){
    case 'room': return '⟦'+cap(R[cl.v].huIn)+'⟧ volt.';
    case 'notroom': return `⟦Nem⟧ ${R[cl.v].huIn} volt.`;
    case 'on': return cap(HU_ON[cl.v])+'.';
    case 'onlyon': return `Ő volt az ⟦egyetlen⟧, aki ${HU_ON[cl.v]}.`;
    case 'by': return cap(HU_BY[cl.v])+' ⟦mellett⟧ volt.';
    case 'row': return cap(ord(cl.v))+' sorban⟧ volt.';
    case 'col': return cap(ord(cl.v))+' oszlopban⟧ volt.';
    case 'corner': return 'A rács egyik ⟦sarkában⟧ volt.';
    case 'alone': return '⟦Egyedül⟧ volt a szobában.';
    case 'with': return `⟦Ugyanabban a szobában⟧ volt, mint ${name(cl.v)}.`;
    case 'dir': return `⟦${{n:'Északabbra',s:'Délebbre',e:'Keletebbre',o:'Nyugatabbra'}[cl.d]}⟧ volt, mint ${name(cl.v)}.`;
  } return '';
}

/* ---------- network (co-op) ---------- */
function makeNet(){
  let q=null; try{ q=new URLSearchParams(location.search).get('net'); }catch(e){}
  if(q==='local' && 'BroadcastChannel' in window) return localNet();
  const cfg=window.GQ_CONFIG||{};
  if(cfg.supabaseUrl && cfg.supabaseKey && window.supabase && window.supabase.createClient) return supaNet(cfg);
  return null;
}
function supaNet(cfg){
  const client=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseKey,{realtime:{params:{eventsPerSecond:20}}});
  return { join(code,me,h){
    const ch=client.channel(roomChannel(code),{config:{broadcast:{self:false},presence:{key:me.id}}});
    ch.on('broadcast',{event:'m'},({payload})=>h.onMsg(payload));
    ch.on('presence',{event:'sync'},()=>{ const st=ch.presenceState(), list=[]; for(const k in st){ const m=st[k]&&st[k][0]; if(m&&m.id) list.push({id:m.id,name:m.name,lang:m.lang,joined:m.joined}); } h.onPeers(list); });
    ch.subscribe(async status=>{ if(status==='SUBSCRIBED'){ try{ await ch.track(me); }catch(e){} h.onReady(); } else if(status==='CHANNEL_ERROR'||status==='TIMED_OUT') h.onError(status); });
    return { send:m=>{ try{ ch.send({type:'broadcast',event:'m',payload:m}); }catch(e){} }, update:me2=>{ try{ ch.track(me2); }catch(e){} }, leave:()=>{ try{ ch.untrack(); client.removeChannel(ch); }catch(e){} } };
  } };
}
function localNet(){
  return { join(code,me,h){
    const bc=new BroadcastChannel(roomChannel(code)); let self=me; const seen={};
    const peers=()=>{ const now=Date.now(); const l=[self]; for(const id in seen){ if(now-seen[id].t<4000) l.push(seen[id].m); } h.onPeers(l); };
    bc.onmessage=e=>{ const m=e.data; if(m&&m.__pres){ const known=!!seen[m.me.id]; seen[m.me.id]={m:m.me,t:Date.now()}; if(!known) peers(); return; } if(m&&m.__bye){ delete seen[m.id]; peers(); return; } h.onMsg(m); };
    const beat=()=>bc.postMessage({__pres:1,me:self});
    const iv=setInterval(()=>{ beat(); peers(); },1000);
    setTimeout(()=>{ beat(); peers(); h.onReady(); },50);
    return { send:m=>bc.postMessage(m), update:m2=>{ self=m2; beat(); peers(); }, leave:()=>{ clearInterval(iv); bc.postMessage({__bye:1,id:self.id}); bc.close(); } };
  } };
}
const NET=makeNet();

/* ---------- state ---------- */
const S={view:'hub', cs:null, idx:0, place:{}, marks:new Set(), tool:0, t0:0, elapsed:0, hints:0, phase:'play', msg:null,
         huAll:store.get('huAll',!!PACK.huHelperDefault), solved:store.get('solved',{}), openHu:new Set(), tip:0, coop:null, winShown:false,
         hist:[], focus:null};
let timerId=null;
const isPhone=()=>{ try{ return matchMedia('(max-width:700px)').matches; }catch(e){ return false; } };
let PH=isPhone();
try{ matchMedia('(max-width:700px)').addEventListener('change',()=>{ PH=isPhone(); render(); }); }catch(e){}

/* solo */
function startCase(i){
  const cs=CASES[i]; S.view='case'; S.cs=cs; S.idx=i;
  const saved=store.get('prog:'+cs.id,null);
  S.place=saved?saved.place:{}; S.marks=new Set(saved?saved.marks:[]); S.hints=saved?saved.hints:0;
  S.elapsed=saved?saved.elapsed:0; S.t0=Date.now(); S.tool=0; S.phase='play'; S.msg=null; S.openHu=new Set(); S.tip=0; S.winShown=false; S.hist=[]; S.focus=null;
  startTimer(); try{ if(!S.coop) location.hash=cs.id; }catch(e){}
  render(); window.scrollTo(0,0);
}
function startTimer(){ clearInterval(timerId); timerId=setInterval(tick,1000); }
function saveProg(){ if(S.coop||!S.cs||S.phase==='done') return; store.set('prog:'+S.cs.id,{place:S.place,marks:[...S.marks],hints:S.hints,elapsed:curElapsed()}); }
function curElapsed(){ if(S.coop){ const st=S.coop.st; return st.t0? Math.floor(((st.phase==='done'&&st.tEnd)?st.tEnd:Date.now())-st.t0)/1000|0 : 0; }
  return S.elapsed + (S.phase==='done'?0:Math.floor((Date.now()-S.t0)/1000)); }
function fmt(s){ return Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); }
function tick(){ const el=document.getElementById('timer'); if(el) el.textContent=fmt(curElapsed()); }
function goHub(){ saveProg(); clearInterval(timerId); if(S.coop) leaveRoom(); S.view='hub'; S.cs=null; try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}; render(); window.scrollTo(0,0); }

/* ---------- co-op ---------- */
const CODE_ABC='ABCDEFGHJKLMNPQRSTUVWXYZ';
function newCode(){ let s=''; for(let i=0;i<4;i++) s+=CODE_ABC[Math.floor(Math.random()*CODE_ABC.length)]; return s; }
function myId(){ let id=globalStore.get('pid',null); if(!id){ id='p'+Math.random().toString(36).slice(2,10); globalStore.set('pid',id); } return id; }
function emptySt(){ return {v:0,by:'',caseId:null,place:{},marks:[],shared:[],owners:[],phase:'lobby',t0:0,tEnd:0,hints:0,lam:0,pc:{},mc:{}}; }
function joinRoom(code,name){
  if(!NET) return;
  code=code.toUpperCase().replace(/[^A-Z]/g,'').slice(0,4); if(code.length!==4) return;
  name=(name||'').trim().slice(0,16)||'Detective'; globalStore.set('name',name);
  const me={id:myId()+'-'+Math.random().toString(36).slice(2,5),name,lang:LANG,joined:Date.now()};
  S.coop={code,me,peers:[me],st:emptySt(),ready:false,link:null};
  S.view='lobby'; render();
  S.coop.link=NET.join(code,me,{
    onReady(){ if(!S.coop) return; S.coop.ready=true; S.coop.link.send({t:'hello',from:me.id}); render(); },
    onError(){ if(!S.coop) return; S.coop.error=true; render(); },
    onPeers(list){ if(!S.coop) return; const seen={}; const ps=list.filter(p=>p&&p.id&&!seen[p.id]&&(seen[p.id]=1)).sort((a,b)=>(a.joined-b.joined)||(a.id<b.id?-1:1));
      const sig=ps.map(p=>p.id+'|'+p.name+'|'+p.lang).join(','); if(sig===S.coop.sig) return; S.coop.sig=sig; S.coop.peers=ps; render();
      if(isHost()) setTimeout(ensureOwners,0); },
    onMsg(m){ if(!S.coop||!m) return;
      if(m.t==='hello'){ if(S.coop.st.v>0) S.coop.link.send({t:'state',st:S.coop.st}); }
      else if(m.t==='state') mergeSt(m.st);
      else if(m.t==='toast') toast(m.txt);
    }
  });
  try{ history.replaceState(null,'',location.pathname+location.search+'#r-'+code); }catch(e){}
}
function leaveRoom(){ if(S.coop&&S.coop.link) S.coop.link.leave(); S.coop=null; }
const newerStamp=(a,b)=>!b||(a[0]>b[0]||(a[0]===b[0]&&a[1]>b[1]));
function mergeSt(inc){
  const cur=S.coop.st; if(!inc||typeof inc.v!=='number') return;
  const scalarNewer=inc.v>cur.v||(inc.v===cur.v&&inc.by>cur.by);
  // A different case is a full reset, not a merge.
  if(inc.caseId!==cur.caseId && inc.caseId && (!cur.caseId||inc.v>=cur.v)){
    const before=new Set(cur.shared||[]);
    S.coop.st=JSON.parse(JSON.stringify(inc)); applySt();
    (inc.shared||[]).forEach(i=>{ if(!before.has(i)&&S.cs){ const sh=S.coop.peers.find(p=>p.id===inc.by); toast(fill(T('sharedBy'),{n:sh?sh.name:'?'})+': '+S.cs.people[i][0]); } });
    return;
  }
  const beforeShared=new Set(cur.shared||[]);
  const st=JSON.parse(JSON.stringify(cur));
  st.lam=Math.max(cur.lam||0,inc.lam||0);
  // placements: last writer per person wins
  const pc={...(cur.pc||{})}, incPc=inc.pc||{}, place={...(cur.place||{})};
  for(const i of new Set([...Object.keys(pc),...Object.keys(incPc)])){
    if(!incPc[i]||!newerStamp(incPc[i],pc[i])) continue;
    pc[i]=incPc[i];
    if(inc.place&&inc.place[i]) place[i]=inc.place[i]; else delete place[i];
  }
  st.pc=pc; st.place=place;
  // ✕ notes: last writer per cell wins
  const mc={...(cur.mc||{})}, incMc=inc.mc||{}, marks=new Set(cur.marks||[]);
  for(const k of new Set([...Object.keys(mc),...Object.keys(incMc)])){
    if(!incMc[k]||!newerStamp(incMc[k],mc[k])) continue;
    mc[k]=incMc[k];
    if((inc.marks||[]).includes(k)) marks.add(k); else marks.delete(k);
  }
  st.mc=mc; st.marks=[...marks];
  // sharing is permanent: union both sides
  st.shared=[...new Set([...(cur.shared||[]),...(inc.shared||[])])];
  if(scalarNewer){
    st.phase=inc.phase; st.hints=inc.hints; st.t0=inc.t0; st.tEnd=inc.tEnd;
    if(inc.owners&&inc.owners.length) st.owners=inc.owners;
    st.v=inc.v; st.by=inc.by;
  }
  S.coop.st=st; applySt();
  st.shared.forEach(i=>{ if(!beforeShared.has(i)&&inc.by!==S.coop.me.id&&S.cs){
    const sh=S.coop.peers.find(p=>p.id===inc.by); toast(fill(T('sharedBy'),{n:sh?sh.name:'?'})+': '+S.cs.people[i][0]); } });
}
function commit(mut){
  const c=S.coop, old=c.st, st=JSON.parse(JSON.stringify(old));
  mut(st);
  const L=(old.lam||0)+1, by=c.me.id;
  st.lam=L;
  // stamp only what this move actually changed, so parallel moves can merge
  const op=(old.place||{}), np=(st.place||{}), pc={...(old.pc||{})};
  for(const i of new Set([...Object.keys(op),...Object.keys(np)])){
    const a=op[i], b=np[i];
    if((!a)!==(!b)||(a&&b&&(a[0]!==b[0]||a[1]!==b[1]))) pc[i]=[L,by];
  }
  const om=new Set(old.marks||[]), nm=new Set(st.marks||[]), mc={...(old.mc||{})};
  for(const k of new Set([...om,...nm])) if(om.has(k)!==nm.has(k)) mc[k]=[L,by];
  st.pc=pc; st.mc=mc;
  if(st.caseId!==old.caseId){ st.pc={}; st.mc={}; }
  st.v=old.v+1; st.by=by;
  c.st=st; c.link.send({t:'state',st}); applySt();
}
function applySt(){
  const st=S.coop.st;
  if(st.caseId){ const i=CASES.findIndex(c=>c.id===st.caseId); if(i<0) return;
    if(!S.cs||S.cs.id!==st.caseId){ S.cs=CASES[i]; S.idx=i; S.tool=0; S.openHu=new Set(); S.winShown=false; S.msg=null; startTimer(); window.scrollTo(0,0); }
    S.view='case'; S.place=st.place; S.marks=new Set(st.marks); S.phase=st.phase; S.hints=st.hints;
    if(st.phase==='done'&&!S.winShown){ S.winShown=true; render(); showWin(curElapsed()); return; }
  } else { S.view='lobby'; S.cs=null; }
  render();
}
const players=()=>S.coop?S.coop.peers:[];
const isHost=()=>S.coop&&players()[0]&&players()[0].id===S.coop.me.id;
function holderOf(i){
  const ps=players(), owners=S.coop&&S.coop.st.owners;
  if(!owners||!owners[i]) return null;
  return ps.find(p=>p.id===owners[i])||null;
}
function assignOwners(n){ const ps=players(), out=[]; for(let i=0;i<n;i++) out.push(ps.length?ps[i%ps.length].id:null); return out; }
// Keep every suspect's clue with a present player, even after somebody joins or leaves.
function ensureOwners(){
  const c=S.coop; if(!c||!isHost()||!c.st.caseId||!S.cs) return;
  const ps=players(); if(!ps.length) return;
  const P=S.cs.people.length-1;
  const owners=(c.st.owners||[]).slice(0,P);
  while(owners.length<P) owners.push(null);
  const ids=new Set(ps.map(p=>p.id));
  let changed=false;
  const count=()=>{ const m={}; for(const o of owners) if(o) m[o]=(m[o]||0)+1; return m; };
  for(let i=0;i<P;i++) if(!owners[i]||!ids.has(owners[i])){ owners[i]=null; changed=true; }
  for(let i=0;i<P;i++) if(!owners[i]){
    const m=count(); let best=ps[0];
    for(const p of ps) if((m[p.id]||0)<(m[best.id]||0)) best=p;
    owners[i]=best.id; changed=true;
  }
  // a player who joins mid-case should still have something to read
  for(const p of ps){
    if(count()[p.id]) continue;
    const donors=ps.filter(q=>q.id!==p.id&&(count()[q.id]||0)>1).sort((a,b)=>count()[b.id]-count()[a.id]);
    if(!donors.length) break;
    const d=donors[0];
    let idx=-1;
    for(let i=0;i<P;i++) if(owners[i]===d.id&&!c.st.shared.includes(i)){ idx=i; break; }
    if(idx<0) for(let i=P-1;i>=0;i--) if(owners[i]===d.id){ idx=i; break; }
    if(idx>=0){ owners[idx]=p.id; changed=true; toast(fill(T('clueMoved'),{n:p.name})); }
  }
  if(changed) commit(st=>{ st.owners=owners; });
}
function canSee(i){ if(!S.coop) return true; const cs=S.cs; if(i===cs.people.length-1) return true;
  if(S.coop.st.shared.includes(i)) return true; const h=holderOf(i); return !h||h.id===S.coop.me.id; }
function chooseCase(i){ commit(st=>{ st.caseId=CASES[i].id; st.place={}; st.marks=[]; st.shared=[]; st.phase='play'; st.t0=Date.now(); st.tEnd=0; st.hints=0;
  st.owners=assignOwners(CASES[i].people.length-1); }); }
function shareClue(i){ commit(st=>{ if(!st.shared.includes(i)) st.shared.push(i); }); }

/* ---------- moves (solo or co-op) ---------- */
function setBoard(place,marks,extra){
  if(S.coop) commit(st=>{ st.place=place; st.marks=[...marks]; if(extra) extra(st); });
  else { S.hist.push({place:{...S.place},marks:[...S.marks],hints:S.hints}); if(S.hist.length>200) S.hist.shift();
    S.place=place; S.marks=marks; saveProg(); render(); }
}
function onCell(r,c,longpress){
  const cs=S.cs; if(S.phase!=='play') return;
  const key=r+','+c, o=cs.objs[key];
  const place={...S.place}, marks=new Set(S.marks);
  const occupant=Object.keys(place).find(i=>place[i][0]===r&&place[i][1]===c);
  if(S.tool==='x'||longpress){
    if(occupant!=null && !longpress) delete place[occupant];
    else if(occupant==null){ if(marks.has(key)) marks.delete(key); else marks.add(key); }
  } else {
    if(o && !OBJ[o].occ){ flash(T('blocked')+' ('+plain(OBJL[LANG][o][0])+')',`Erre a mezőre nem lehet állni (${OBJ[o].hu}).`,'bad'); return; }
    const t=S.tool;
    if(occupant!=null && String(occupant)===String(t)) delete place[t];
    else { if(occupant!=null) delete place[occupant]; place[t]=[r,c]; marks.delete(key);
      const next=cs.people.map((_,i)=>i).find(i=>place[i]==null); if(next!=null) S.tool=next; }
  }
  S.msg=null; setBoard(place,marks);
}
function flash(it,hu,kind){ S.msg={it,hu,kind}; render(); }
function conflicts(){
  const bad=new Set(); const ents=Object.entries(S.place);
  for(let a=0;a<ents.length;a++)for(let b=a+1;b<ents.length;b++){ const [ra,ca]=ents[a][1],[rb,cb]=ents[b][1]; if(ra===rb||ca===cb){bad.add(ents[a][0]);bad.add(ents[b][0]);} }
  return bad;
}
function check(){
  const cs=S.cs, P=cs.people.length, placed=Object.keys(S.place).length;
  if(placed<P){ flash(fill(T('missing'),{k:P-placed}),`Még ${P-placed} embert kell elhelyezni.`,'bad'); return; }
  if(conflicts().size){ flash(T('clash'),'Két ember ugyanabban a sorban vagy oszlopban van.','bad'); return; }
  let wrong=0; cs.solution.forEach((p,i)=>{ const q=S.place[i]; if(!q||q[0]!==p[0]||q[1]!==p[1]) wrong++; });
  if(wrong){ flash(fill(T('wrong'),{k:wrong}),`Majdnem! ${wrong} ember rossz helyen van. Olvasd el újra a nyomokat.`,'bad'); return; }
  S.msg=null;
  if(S.coop) commit(st=>{ st.phase='accuse'; }); else { S.phase='accuse'; render(); }
}
function hint(){
  const cs=S.cs; if(S.phase!=='play') return;
  const order=cs.people.map((_,i)=>i);
  let target=order.find(i=>S.place[i] && (S.place[i][0]!==cs.solution[i][0]||S.place[i][1]!==cs.solution[i][1]));
  if(target==null) target=order.find(i=>S.place[i]==null);
  if(target==null){ check(); return; }
  const [r,c]=cs.solution[target], place={...S.place}, marks=new Set(S.marks);
  for(const k of Object.keys(place)) if(place[k][0]===r&&place[k][1]===c) delete place[k];
  place[target]=[r,c]; marks.delete(r+','+c);
  const nm=cs.people[target][0];
  S.msg={it:fill(T('hintMsg'),{n:nm,r:r+1,c:c+1}),hu:`Kis segítség: ${nm} a ${r+1}. sorban, ${c+1}. oszlopban van.`,kind:'good'};
  if(S.coop) commit(st=>{ st.place=place; st.marks=[...marks]; st.hints=(st.hints||0)+1; });
  else { S.hist.push({place:{...S.place},marks:[...S.marks],hints:S.hints}); S.place=place; S.marks=marks; S.hints++; saveProg(); render(); }
}
function undo(){
  if(S.coop) return;
  const h=S.hist.pop(); if(!h) return;
  S.place=h.place; S.marks=new Set(h.marks); S.hints=h.hints; S.msg=null; saveProg(); render();
}
function accuse(i){
  const cs=S.cs;
  if(i===cs.killer){
    say(fill(T('solved'),{n:cs.people[i][0]}));
    if(S.coop){ commit(st=>{ st.phase='done'; st.tEnd=Date.now(); }); return; }
    const time=curElapsed(); S.phase='done'; S.elapsed=time;
    const prev=S.solved[cs.id]; if(!prev||time<prev.time) S.solved[cs.id]={time,hints:S.hints};
    store.set('solved',S.solved); store.set('prog:'+cs.id,null);
    render(); showWin(time);
  } else flash(fill(T('nope'),{n:cs.people[i][0]}),`Nem! ${cs.people[i][0]} nem volt az áldozat szobájában.`,'bad');
}
function resetCase(){
  if(S.coop){ commit(st=>{ st.place={}; st.marks=[]; st.phase='play'; st.t0=Date.now(); st.tEnd=0; st.hints=0; }); return; }
  S.place={}; S.marks=new Set(); S.hints=0; S.elapsed=0; S.t0=Date.now(); S.phase='play'; S.msg=null; S.tool=0; S.hist=[]; store.set('prog:'+S.cs.id,null); render();
}
function nextCase(){ const n=(S.idx+1)%CASES.length; if(S.coop){ if(isHost()) chooseCase(n); } else startCase(n); }

/* ---------- dom helpers ---------- */
const h=(tag,attrs={},...kids)=>{const e=document.createElement(tag);for(const[k,v]of Object.entries(attrs)){if(k==='class')e.className=v;else if(k==='html')e.innerHTML=v;else if(k.startsWith('on'))e.addEventListener(k.slice(2),v);else if(v!==false&&v!=null)e.setAttribute(k,v===true?'':v)}for(const k of kids.flat()){if(k==null||k===false)continue;e.append(k.nodeType?k:document.createTextNode(k))}return e};
const svgEl=(html,cls,style)=>h('span',{class:cls||'',style:style||'',html});
function marked(s){ const out=h('span'); String(s).split(/(⟦[^⟧]*⟧)/).forEach(part=>{ if(part.startsWith('⟦')) out.append(h('mark',{},part.slice(1,-1))); else if(part) out.append(part.replace(/[⟦⟧]/g,'')); }); return out; }
const SPK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>';
const LOCK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor" fill-opacity=".15"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
function sayBtn(text,label){ return canSpeak? h('button',{class:'say',title:'🔊','aria-label':label,onclick:e=>{e.stopPropagation();say(text)},html:SPK}) : null; }
function head(cs,i){ const nm=cs.people[i][0]; return svgEl(A.portrait(lookOf(nm,i),{crop:'head',bg:BGS[i%BGS.length],label:nm}),'hd'); }
function sticker(cs,i){ const nm=cs.people[i][0]; return svgEl(A.portrait(lookOf(nm,i),{bg:BGS[i%BGS.length],label:nm}),'pic'); }
let toastT=null;
function toast(txt){ let el=document.getElementById('toast'); if(el) el.remove(); el=h('div',{class:'toast',id:'toast',role:'status'},txt); document.body.append(el); clearTimeout(toastT); toastT=setTimeout(()=>{ el.remove(); },3200); }
function langPicker(onPick){
  return h('div',{class:'langs',role:'group','aria-label':T('lang')},...Object.entries(LANGS).map(([k,v])=>h('button',{'aria-pressed':String(k===LANG),onclick:()=>{ LANG=k; store.set('lang',k); if(S.coop){ S.coop.me={...S.coop.me,lang:k}; S.coop.link&&S.coop.link.update(S.coop.me); } onPick&&onPick(); render(); }},v.name)));
}
function topbar(){
  return h('div',{class:'top'},
    h('button',{class:'brand',onclick:()=>{ if(S.view!=='hub') goHub(); },'aria-label':PACK.name},
      h('span',{class:'mark','aria-hidden':'true'},...[0,1,2,3,4,5,6,7,8].map(i=>h('i',{class:i===5?'v':''}))),
      h('span',{}, h('h1',{},PACK.name), h('small',{},T('tag')+' · '+LANGS[LANG].learn))),
    h('div',{class:'spacer'}),
    h('a',{class:'pill style-link',href:chooserHref},'🎨 ',T('styles')),
    h('button',{class:'pill','aria-pressed':String(S.huAll),onclick:()=>{S.huAll=!S.huAll;store.set('huAll',S.huAll);render()}},'HU ', S.huAll?'✓':'–'));
}

/* ---------- hub ---------- */
function renderHub(app){
  app.append(topbar());
  const heroNames=Object.keys(LOOKS).slice(0,5);
  const pick=heroNames.map((n,k)=>[n,[1,2,3,4,0][k]]);
  const pos=[['4%','2%',-8],['36%','0%',5],['66%','6%',-4],['18%','36%',7],['50%','32%',-6]];
  const coll=h('div',{class:'collage','aria-hidden':'true'});
  pick.forEach(([n,b],k)=>{ const [l,t,r]=pos[k]; coll.append(svgEl(A.portrait(lookOf(n,k),{bg:BGS[b]}),'st',`left:${l};top:${t};transform:rotate(${r}deg);animation-delay:${k*70}ms`)); });
  coll.append(svgEl(A.pigeon({lens:1}),'pg'));
  coll.append(h('div',{class:'bubble'},T('pigeon')));
  app.append(h('section',{class:'hero'},
    h('div',{},
      h('span',{class:'typ'},fill(T('eyebrow'),{n:CASES.length})),
      h('h2',{},T('h1a'),h('span',{class:'hl'},T('h1b'))),
      h('p',{},T('lead')),
      h('div',{style:'margin-top:16px'},h('p',{class:'typ',style:'margin:0 0 6px'},T('lang')),langPicker()),
      h('div',{class:'actions'}, h('button',{class:'btn',onclick:()=>{const i=CASES.findIndex(c=>!S.solved[c.id]);startCase(i<0?0:i)}}, Object.keys(S.solved).length?T('cont'):T('start')))),
    coll));

  if(NET){
    let pre=''; try{ const m=(location.hash||'').match(/^#r-([A-Z]{4})$/); if(m) pre=m[1]; }catch(e){}
    const nm=h('input',{id:'coop-name',type:'text',maxlength:'16',autocomplete:'nickname',value:globalStore.get('name','')});
    const cd=h('input',{id:'coop-code',class:'code',type:'text',maxlength:'4',autocapitalize:'characters',autocomplete:'off',placeholder:'ABCD',value:pre});
    const styleSel=h('select',{id:'coop-style',class:'style-select'},...STYLES.map(s=>h('option',{value:s.id,selected:s.id===PACK.id},s.name)));
    const createRoom=()=>{
      const name=nm.value.trim(); globalStore.set('name',name);
      const sid=styleSel.value;
      if(sid!==PACK.id){
        const target=STYLES.find(s=>s.id===sid);
        if(target){
          let href=styleHref(target)+'?create=1&name='+encodeURIComponent(name);
          if(NET_PARAM) href+='&net='+encodeURIComponent(NET_PARAM);
          location.href=href; return;
        }
      }
      joinRoom(newCode(),name);
    };
    app.append(h('div',{class:'section-h'},h('h2',{},T('coop'))));
    app.append(h('div',{class:'coopbox'},
      h('div',{},h('h3',{},T('coop')),h('p',{},T('coopLead')),S.huAll?h('p',{class:'hu'},'Mindenki csak néhány nyomot lát, a saját tanult nyelvén. Olvassátok fel, osszátok meg, és oldjátok meg együtt!'):null),
      h('div',{},
        h('div',{class:'field'},h('label',{for:'coop-name'},T('yourName')),nm),
        h('div',{class:'field'},h('label',{for:'coop-style'},T('roomStyle')),styleSel),
        h('button',{class:'btn',style:'width:100%;margin-bottom:12px',onclick:createRoom},T('create')),
        h('div',{class:'row2'},h('div',{class:'field'},h('label',{for:'coop-code'},T('code')),cd),h('button',{class:'btn ghost',onclick:()=>joinRoom(cd.value,nm.value)},T('join'))))));
  }

  app.append(h('div',{class:'section-h'},h('h2',{},T('cases')),S.huAll?h('span',{class:'hu'},'Az ügyek'):null));
  app.append(caseGrid(i=>startCase(i)));
  const solvedCases=CASES.filter(c=>S.solved[c.id]);
  if(solvedCases.length){
    app.append(h('div',{class:'section-h'},h('h2',{},T('notebook')),h('span',{class:'hu'},'A taccuinód')));
    app.append(h('div',{class:'reviews'},...solvedCases.map(cs=>h('button',{class:'reviewchip',onclick:()=>showReview(cs)},
      h('b',{},caseTitle(cs)),h('small',{},T('time')+' '+fmt(S.solved[cs.id].time)+(S.solved[cs.id].hints?` · ${T('hints')} ${S.solved[cs.id].hints}`:''))))));
  }

  app.append(h('div',{class:'section-h'},h('h2',{},T('how')),S.huAll?h('span',{class:'hu'},'Szabályok'):null));
  const objKeys=Object.keys(OBJ), sitKeys=objKeys.filter(k=>OBJ[k].occ), blockKeys=objKeys.filter(k=>!OBJ[k].occ);
  const icons=[A.object(sitKeys[0]||objKeys[0]),A.object(sitKeys[1]||sitKeys[0]||objKeys[0]),A.object(blockKeys[0]||objKeys[0]),A.pigeon(),A.portrait(lookOf(Object.keys(LOOKS)[0],0),{crop:'head',bg:'pink'})];
  app.append(h('div',{class:'rules'},...T('rules').map((it,k)=>h('div',{class:'rule'},svgEl(icons[k],'ri'),h('p',{},marked(it),' ',sayBtn(it,'')),S.huAll?h('p',{class:'hu'},HU_RULES[k]):null))));
  const occ=Object.keys(OBJ).filter(k=>OBJ[k].occ), blk=Object.keys(OBJ).filter(k=>!OBJ[k].occ);
  const oi=k=>h('div',{class:'oi'},svgEl(A.object(k,plain(OBJL[LANG][k][0])),'ic'),plain(OBJL[LANG][k][0]),S.huAll?h('small',{},OBJ[k].hu):null);
  app.append(h('div',{class:'objs'},
    h('div',{class:'objbox yes'},h('h4',{},'✓ '+T('yes')),h('div',{class:'ogrid'},...occ.map(oi))),
    h('div',{class:'objbox no'},h('h4',{},'✕ '+T('no')),h('div',{class:'ogrid'},...blk.map(oi)))));
  const otherStyle=(STYLES||[]).find(s=>s.id!==PACK.id);
  app.append(h('footer',{},PACK.name+' · '+Object.values(LANGS).map(l=>l.name).join(' · '),
    h('a',{class:'sibling',href:chooserHref},' · '+T('styles')),
    otherStyle?h('a',{class:'sibling',href:styleHref(otherStyle)},' · '+otherStyle.short):null));
}
function caseGrid(onPick){
  const grid=h('div',{class:'cases'});
  CASES.forEach((cs,i)=>{
    const sv=S.solved[cs.id];
    const heads=h('div',{class:'heads','aria-hidden':'true'},...cs.people.slice(0,-1).slice(0,5).map((_,k)=>{const s=h('span');s.append(head(cs,k));return s}));
    grid.append(h('button',{class:'case',onclick:()=>onPick(i)},
      h('span',{class:'tape',style:`background-color:${['rgba(255,225,77,.7)','rgba(255,72,176,.5)','rgba(50,85,164,.35)','rgba(0,169,92,.4)'][i%4]}`}),
      h('span',{class:'typ'},`${T('caso')} ${String(i+1).padStart(2,'0')} · ${cs.size}×${cs.size}`),
      h('h3',{},caseTitle(cs)), h('span',{class:'flav'},caseFlav(cs)),
      S.huAll&&!cs.titleHu? h('span',{class:'hu'},cs.flavHu):null, heads,
      h('span',{class:'meta'}, h('span',{class:'lvl','aria-label':T('levels')[cs.level]},...[1,2,3,4].map(k=>h('b',{class:k<=cs.level?'on':''}))), h('span',{class:'typ'},T('levels')[cs.level]),
        sv&&!S.coop? h('span',{class:'best'},`✓ ${fmt(sv.time)}`):null),
      sv&&!S.coop? svgEl(A.stamp(PACK.solvedStamp||'RISOLTO','red'),'stampwrap'):null));
  });
  return grid;
}

/* ---------- lobby ---------- */
function playerChip(p,k){ const me=S.coop&&p.id===S.coop.me.id;
  return h('span',{class:'player'},h('span',{class:'av',style:`background:${PCOL[k%PCOL.length]}`},(p.name||'?')[0].toUpperCase()),
    h('span',{},p.name,me?' ('+T('you')+')':'',k===0?' · '+T('host'):''),h('small',{},(LANGS[p.lang]||LANGS.it).name)); }
async function shareInvite(){
  if(!S.coop) return;
  const url=location.href.split('#')[0]+'#r-'+S.coop.code;
  try{ await navigator.clipboard.writeText(url); toast(T('copied')); return; }catch(e){}
  if(navigator.share){ try{ await navigator.share({title:PACK.name,text:T('invite'),url}); return; }catch(e){} }
  toast(url);
}
function renderLobby(app){
  app.append(topbar());
  app.append(h('button',{class:'back',onclick:goHub},'← '+T('leave')));
  const c=S.coop, ps=players(), host=ps[0];
  app.append(h('div',{class:'lobby'},
    h('div',{},h('p',{class:'typ',style:'margin:0 0 8px'},T('invite')),
      h('div',{class:'coderow'},h('span',{class:'bigcode'},c.code),h('button',{class:'btn ghost small',onclick:shareInvite},'🔗 '+T('copyLink'))),
      h('p',{class:'typ',style:'margin:12px 0 0'},T('roomStyle')+': '+((STYLES.find(s=>s.id===PACK.id)||{}).name||PACK.name))),
    h('div',{},h('h2',{style:'font-size:1.5rem;margin-bottom:10px'},T('team')),h('div',{class:'players'},...ps.map(playerChip)),
      !c.ready?h('p',{class:'typ'},c.error?T('offline'):T('connecting')):ps.length<2?h('p',{style:'color:var(--muted)'},T('alone')):null),
    h('div',{},h('p',{class:'typ',style:'margin:0 0 6px'},T('lang')),langPicker()),
    isHost()? h('div',{},h('h2',{style:'font-size:1.5rem;margin-bottom:12px'},T('pickCase')),caseGrid(i=>chooseCase(i)))
            : h('p',{style:'font-size:1.1rem'},fill(T('waitHost'),{n:host?host.name:'…'}))));
}

/* ---------- case ---------- */
function roomIndex(cs){ const keys=Object.keys(cs.rooms); return k=>keys.indexOf(k); }
function suspectCard(cs,i,opts){
  const P=cs.people.length, victim=P-1, isV=i===victim, nm=cs.people[i][0];
  const byP=cs.clues.filter(c=>c.p===i);
  const see=canSee(i), holder=S.coop&&!isV?holderOf(i):null, mine=holder&&holder.id===S.coop.me.id, shared=S.coop&&S.coop.st.shared.includes(i);
  const open=S.huAll||S.openHu.has(i);
  const lines=isV?[{it:victimStr(cs),hu:'Az áldozat. Egyedül volt a gyilkossal.'}]:byP.map(c=>({it:clueStr(cs,c),hu:huStr(cs,c)}));
  const card=h('div',{class:'card'+(isV?' victim':'')+(see?'':' locked')+(S.tool===i&&S.phase==='play'?' sel':''),style:opts&&opts.flat?'':`transform:rotate(${[-.8,.6,-.4,.9,-.6,.4,-.9][i%7]}deg)`,'data-i':String(i)},
    isV?h('span',{class:'vtag'},T('victim')):null,
    sticker(cs,i),
    h('div',{class:'nm'},h('b',{},nm),see&&!S.huAll?h('button',{class:'hubtn','aria-pressed':String(open),'aria-label':'HU',onclick:e=>{e.stopPropagation();open?S.openHu.delete(i):S.openHu.add(i);render()}},'HU'):null));
  if(see){
    lines.forEach(l=>card.append(h('div',{},h('p',{class:'clue'},marked(l.it),sayBtn(nm+'. '+l.it,nm)),open?h('p',{class:'hu'},marked(l.hu)):null)));
    if(S.coop&&!isV){ if(mine&&!shared) card.append(h('button',{class:'sharebtn',onclick:e=>{e.stopPropagation();shareClue(i)}},T('share')));
      else if(mine) card.append(h('span',{class:'mine'},'✓ '+T('yours')));
      else if(shared) card.append(h('span',{class:'sharedtag'},fill(T('sharedBy'),{n:holder?holder.name:'?'}))); }
  } else card.append(h('p',{class:'clue'},svgEl(LOCK,'lockic'),h('span',{},fill(T('heldBy'),{n:holder?holder.name:'?'}))));
  if(S.place[i]) card.append(h('span',{class:'placed'},`✓ R${S.place[i][0]+1} · C${S.place[i][1]+1}`));
  return card;
}
function glossary(cs){
  const ri=roomIndex(cs), words=[]; const objsHere=[...new Set(Object.values(cs.objs))], G=T('gl');
  Object.entries(cs.rooms).forEach(([k,r])=>words.push({w:roomName(cs,k),hu:r.hu,ic:h('span',{class:'sw',style:`width:26px;height:26px;background:var(--r${ri(k)})`})}));
  objsHere.forEach(k=>words.push({w:plain(OBJL[LANG][k][0]),hu:OBJ[k].hu+(OBJ[k].occ?' · ✓':' · ✕'),ic:svgEl(A.object(k),'ic')}));
  const kw=new Set(cs.clues.map(c=>c.t));
  [['row','sor','row'],['col','oszlop','col'],['by','mellett','by'],['alone','egyedül','alone'],['only','az egyetlen','onlyon'],['with','ugyanaz a szoba','with'],['dir','É · D · K · Ny','dir'],['corner','sarok','corner'],['not','nem volt','notroom']]
    .filter(e=>kw.has(e[2])).forEach(([k,hu])=>words.push({w:G[k],hu}));
  words.push({w:G.victim,hu:'az áldozat'},{w:G.killer,hu:'a gyilkos'});
  return h('div',{class:'gloss'},...words.map(w=>h('div',{class:'gw'},w.ic||null,h('div',{},h('b',{},w.w),h('p',{class:'hu'},w.hu)),sayBtn(w.w,w.w))));
}
let lpTimer=null, lpFired=false;
function boardEl(cs){
  const N=cs.size, ri=roomIndex(cs), bad=conflicts();
  const board=h('div',{class:'board',style:`grid-template-columns:repeat(${N},1fr);grid-template-rows:repeat(${N},1fr)`});
  const lab={}; for(let r=N-1;r>=0;r--)for(let c=0;c<N;c++){const k=cs.grid[r][c]; if(!lab[k]) lab[k]=r+','+c;}
  const W='4px solid var(--wall)';
  for(let r=0;r<N;r++)for(let c=0;c<N;c++){
    const k=cs.grid[r][c], key=r+','+c, o=cs.objs[key];
    const st=[`background:var(--r${ri(k)})`];
    if(r>0&&cs.grid[r-1][c]!==k) st.push('border-top:'+W);
    if(c>0&&cs.grid[r][c-1]!==k) st.push('border-left:'+W);
    const occ=Object.keys(S.place).find(i=>S.place[i][0]===r&&S.place[i][1]===c);
    const blocked=o&&!OBJ[o].occ, wt=r===0||cs.grid[r-1][c]!==k, wl=c===0||cs.grid[r][c-1]!==k;
    const desc=`R${r+1} C${c+1}, ${roomName(cs,k)}`+(o?`, ${plain(OBJL[LANG][o][0])}`:'')+(occ!=null?`, ${cs.people[occ][0]}`:'')+(S.marks.has(key)?', ✕':'');
    const focused=S.focus&&S.focus[0]===r&&S.focus[1]===c, tabb=focused?0:(S.focus?-1:(r===0&&c===0?0:-1));
    const cell=h('button',{class:'cell'+(wt?' wt':'')+(wl?' wl':'')+(blocked?' blk':'')+(occ!=null&&bad.has(String(occ))?' bad':''),style:st.join(';'),'aria-label':desc,
      'data-r':r,'data-c':c,tabindex:tabb,
      onfocus:()=>{ S.focus=[r,c]; },
      onkeydown:e=>{
        const K=e.key;
        const dr=K==='ArrowUp'?-1:K==='ArrowDown'?1:0, dc=K==='ArrowLeft'?-1:K==='ArrowRight'?1:0;
        if(dr||dc){ e.preventDefault(); const rr=r+dr, cc=c+dc;
          if(rr>=0&&rr<N&&cc>=0&&cc<N){ S.focus=[rr,cc]; const next=document.querySelector(`.cell[data-r="${rr}"][data-c="${cc}"]`); if(next){ cell.parentElement.querySelectorAll('.cell').forEach(el=>el.tabIndex=-1); next.tabIndex=0; next.focus(); } }
        } else if(K==='Delete'||K==='Backspace'){ e.preventDefault(); S.focus=[r,c]; onCell(r,c,true); }
      },
      onpointerdown:()=>{ S.focus=[r,c]; lpFired=false; clearTimeout(lpTimer); lpTimer=setTimeout(()=>{ lpFired=true; try{navigator.vibrate&&navigator.vibrate(15)}catch(e){} onCell(r,c,true); },450); },
      onpointerup:()=>clearTimeout(lpTimer), onpointerleave:()=>clearTimeout(lpTimer), oncontextmenu:e=>e.preventDefault(),
      onclick:()=>{ S.focus=[r,c]; if(lpFired){ lpFired=false; return; } onCell(r,c,false); }});
    if(o) cell.append(svgEl(A.object(o),'ob'));
    if(occ!=null) cell.append(svgEl(A.portrait(lookOf(cs.people[occ][0],+occ),{crop:'head',bg:BGS[occ%BGS.length]}),'pc'));
    else if(S.marks.has(key)) cell.append(h('span',{class:'xm'},'✕'));
    if(lab[k]===key) cell.append(h('span',{class:'lab'},roomName(cs,k)));
    board.append(cell);
  }
  const colnums=h('div',{class:'colnums',style:`grid-template-columns:repeat(${N},1fr)`},...Array.from({length:N},(_,i)=>h('span',{},'C'+(i+1))));
  const rownums=h('div',{class:'rownums',style:`grid-template-rows:repeat(${N},1fr)`},...Array.from({length:N},(_,i)=>h('span',{},'R'+(i+1))));
  return h('div',{class:'boardwrap'},h('span',{}),colnums,rownums,board);
}
function legend(cs){ const ri=roomIndex(cs); return h('div',{class:'legend'},...Object.keys(cs.rooms).map(k=>h('span',{class:'chip'},h('span',{class:'sw',style:`background:var(--r${ri(k)})`}),roomName(cs,k),sayBtn(roomName(cs,k),'')))); }
function phaseBlock(cs){
  const wrap=h('div');
  if(S.phase==='play'){
    wrap.append(h('div',{class:'actions'},h('button',{class:'btn',onclick:check},T('check')),
      S.coop?null:h('button',{class:'btn ghost small',onclick:undo,disabled:!S.hist.length},T('undo')),
      h('button',{class:'btn ghost small',onclick:hint},T('help')),h('button',{class:'btn ghost small',onclick:resetCase},T('restart'))));
  } else if(S.phase==='accuse'){
    wrap.append(h('div',{class:'slip'},h('p',{class:'typ',style:'margin:0;color:var(--ok)'},'✓ '+T('allRight')),
      h('h3',{},T('killerIs'),' ',sayBtn(T('killerIs'),'')),h('div',{class:'line'}),S.huAll?h('p',{class:'hu',style:'margin-bottom:8px'},'Ki a gyilkos?'):null,
      h('div',{class:'pick'},...cs.people.slice(0,-1).map(([nm],i)=>h('button',{class:'tool',onclick:()=>accuse(i)},head(cs,i),nm)))));
  } else {
    wrap.append(h('div',{class:'slip'},h('h3',{},fill(T('solved'),{n:cs.people[cs.killer][0]})),
      h('div',{class:'actions'},(!S.coop||isHost())?h('button',{class:'btn',onclick:nextCase},T('next')):null,(!S.coop||isHost())?h('button',{class:'btn ghost small',onclick:resetCase},T('again')):null)));
  }
  if(S.msg) wrap.append(h('div',{class:'msg '+(S.msg.kind||''),role:'status'},h('p',{},marked(S.msg.it),' ',sayBtn(S.msg.it,'')),S.huAll?h('p',{class:'hu'},S.msg.hu):null));
  return wrap;
}
function teamBar(){ if(!S.coop) return null; return h('div',{class:'teambar'},h('span',{class:'typ'},T('room')+' '+S.coop.code),...players().map(playerChip)); }
function caseHead(cs){
  return h('div',{class:'casehead'},
    h('div',{style:'min-width:0'},
      h('span',{class:'typ'},`${T('caso')} ${String(S.idx+1).padStart(2,'0')} · ${T('levels')[cs.level]} · ${cs.size}×${cs.size}`),
      h('h2',{},caseTitle(cs),' ',sayBtn(caseTitle(cs),'')),
      h('p',{class:'flav'},caseFlav(cs),' ',sayBtn(caseFlav(cs),'')),
      S.huAll&&!cs.titleHu?h('p',{class:'hu'},cs.flavHu):null),
    h('div',{class:'timer',id:'timer'},fmt(curElapsed())));
}
function tipBox(){ const k=S.tip%5, tp=T('tips')[k];
  return h('div',{class:'tip'},svgEl(A.pigeon(),'pg'),h('div',{class:'tb'},h('p',{class:'say-it'},tp,' ',sayBtn(tp,'')),S.huAll?h('p',{class:'hu'},HU_TIPS[k]):null,h('button',{class:'more',onclick:()=>{S.tip++;render()}},T('more')))); }

function renderCase(app){
  const cs=S.cs;
  app.append(topbar());
  app.append(h('button',{class:'back',onclick:goHub},'← '+(S.coop?T('leave'):T('back'))));
  app.append(caseHead(cs));
  if(S.coop) app.append(teamBar());
  if(PH) return renderCasePhone(app,cs);
  app.append(tipBox());
  const cards=h('div',{class:'cards'}); cs.people.forEach((_,i)=>cards.append(suspectCard(cs,i)));
  const left=h('div',{style:'min-width:0'},h('div',{class:'section-h',style:'margin-top:4px'},h('h2',{},T('suspects'))),cards,
    h('div',{class:'section-h'},h('h2',{},T('words')),h('span',{class:'hu'},'szószedet')),glossary(cs));
  const clip=h('div',{class:'clip'});
  if(S.phase==='play'){
    const tools=h('div',{class:'tools',role:'toolbar'});
    tools.append(h('button',{class:'tool xmark','aria-pressed':String(S.tool==='x'),onclick:()=>{S.tool='x';render()}},T('mark')));
    cs.people.forEach(([nm],i)=>tools.append(h('button',{class:'tool'+(S.place[i]?' done':''),'aria-pressed':String(S.tool===i),onclick:()=>{S.tool=i;render()}},head(cs,i),shortName(nm))));
    clip.append(tools);
    clip.append(h('p',{class:'toolhint'}, S.tool==='x'?T('hintX'):fill(T('hintPlace'),{n:cs.people[S.tool][0]})+' '+T('longpress')));
    clip.append(h('p',{class:'toolhint kbd'},T('keys')));
  }
  clip.append(boardEl(cs), legend(cs), phaseBlock(cs));
  app.append(h('div',{class:'layout'},left,h('div',{class:'boardcol'},clip)));
}
let carouselLock=false;
function renderCasePhone(app,cs){
  app.classList.add('ph');
  const clip=h('div',{class:'clip'}); clip.append(boardEl(cs)); app.append(clip);
  if(S.phase==='play'){
    const strip=h('div',{class:'strip',role:'toolbar'});
    strip.append(h('button',{class:'xb','aria-pressed':String(S.tool==='x'),'aria-label':T('mark'),onclick:()=>{S.tool='x';render()}},'✕'));
    cs.people.forEach(([nm],i)=>strip.append(h('button',{class:S.place[i]?'done':'','aria-pressed':String(S.tool===i),'aria-label':nm,onclick:()=>{S.tool=i;render()}},head(cs,i))));
    app.append(strip);
    app.append(h('p',{class:'toolhint',style:'margin:0 2px'}, S.tool==='x'?T('hintX'):fill(T('hintPlace'),{n:cs.people[S.tool][0]})+' '+T('longpress')));
  }
  const car=h('div',{class:'carousel'}); cs.people.forEach((_,i)=>car.append(suspectCard(cs,i,{flat:1})));
  app.append(car);
  const sel=S.tool==='x'?0:S.tool;
  app.append(h('div',{class:'dots','aria-hidden':'true'},...cs.people.map((_,i)=>h('i',{class:i===sel?'on':''}))));
  requestAnimationFrame(()=>{ const el=car.children[sel]; if(el){ carouselLock=true; car.scrollLeft=el.offsetLeft-(car.clientWidth-el.clientWidth)/2; setTimeout(()=>{carouselLock=false},120); } });
  let st=null;
  car.addEventListener('scroll',()=>{ if(carouselLock) return; clearTimeout(st); st=setTimeout(()=>{
    const mid=car.scrollLeft+car.clientWidth/2; let best=0,bd=1e9;
    [...car.children].forEach((c,i)=>{ const d=Math.abs(c.offsetLeft+c.clientWidth/2-mid); if(d<bd){bd=d;best=i;} });
    if(S.phase==='play'&&S.tool!==best){ S.tool=best; render(); }
  },140); },{passive:true});
  app.append(phaseBlock(cs));
  app.append(h('details',{class:'drawer'},h('summary',{},T('tip')),h('div',{class:'inner'},tipBox())));
  app.append(h('details',{class:'drawer'},h('summary',{},T('words')),h('div',{class:'inner'},glossary(cs))));
  app.append(h('details',{class:'drawer'},h('summary',{},T('rooms')),h('div',{class:'inner'},legend(cs))));
}
function showWin(time){
  const cs=S.cs, k=cs.people[cs.killer][0];
  const old=document.querySelector('.modal'); if(old) old.remove();
  const m=h('div',{class:'modal',role:'dialog','aria-modal':'true'},
    h('div',{class:'box'},
      svgEl(A.portrait(lookOf(k,cs.killer),{bg:'red',label:k}),'who'),
      svgEl(A.stamp(PACK.stampText||'COLPEVOLE','red'),'stp'),
      h('h3',{},fill(T('solved'),{n:k})),
      h('p',{class:'typ'},`${T('time')} ${fmt(time)}`+(S.hints?` · ${T('hints')} ${S.hints}`:'')),
      S.huAll?h('p',{class:'hu'},`A gyilkos: ${k}!`):null,
      h('div',{class:'actions',style:'justify-content:center'},
        (!S.coop||isHost())?h('button',{class:'btn',onclick:()=>{m.remove();nextCase()}},T('next')):null,
        h('button',{class:'btn ghost',onclick:()=>{m.remove();showReview(cs)}},'📖 '+T('review')),
        h('button',{class:'btn ghost',onclick:()=>{m.remove();if(!S.coop)goHub();}},S.coop?'OK':T('back')))));
  m.addEventListener('click',e=>{ if(e.target===m) m.remove(); });
  document.body.append(m);
}

/* ---------- case review (language notebook) ---------- */
function reviewPerson(cs,i){
  const nm=cs.people[i][0], isV=i===cs.people.length-1;
  const byP=cs.clues.filter(c=>c.p===i);
  const lines=isV?[{it:victimStr(cs),hu:'Az áldozat. Egyedül volt a gyilkossal.'}]:byP.map(c=>({it:clueStr(cs,c),hu:huStr(cs,c)}));
  return h('div',{class:'revperson'+(isV?' victim':'')},
    head(cs,i),
    h('div',{class:'revbody'},h('b',{},nm),
      ...lines.map(l=>h('div',{class:'revclue'},
        h('p',{class:'clue'},marked(l.it),sayBtn(nm+'. '+l.it,nm)),
        S.huAll?h('p',{class:'hu'},marked(l.hu)):null))));
}
function showReview(cs){
  const old=document.querySelector('.modal'); if(old) old.remove();
  if(!cs) return;
  const sv=S.solved[cs.id], k=cs.people[cs.killer][0];
  const box=h('div',{class:'box reviewbox'},
    h('button',{class:'xclose',onclick:()=>m.remove(),'aria-label':T('close')},'✕'),
    h('div',{class:'revhead'},
      h('div',{},
        h('span',{class:'typ'},`${T('caso')} ${String(CASES.indexOf(cs)+1).padStart(2,'0')} · ${cs.size}×${cs.size}`),
        h('h3',{},caseTitle(cs))),
      h('button',{class:'pill hu-toggle','aria-pressed':String(S.huAll),onclick:()=>{S.huAll=!S.huAll;store.set('huAll',S.huAll);showReview(cs)}},'HU ',S.huAll?'✓':'–')),
    h('p',{class:'revsolved'},fill(T('solved'),{n:k})+(sv?` · ${T('time')} ${fmt(sv.time)}`:'')),
    h('p',{class:'reviewlead'},T('reviewLead')),
    h('h4',{},T('cluesReview')),
    h('div',{class:'revlist'},...cs.people.map((_,i)=>reviewPerson(cs,i))),
    h('h4',{},T('words')),
    glossary(cs),
    h('div',{class:'actions',style:'justify-content:flex-end'},h('button',{class:'btn',onclick:()=>m.remove()},T('close'))));
  const m=h('div',{class:'modal review',role:'dialog','aria-modal':'true'},box);
  m.addEventListener('click',e=>{ if(e.target===m) m.remove(); });
  m.tabIndex=-1;
  m.addEventListener('keydown',e=>{ if(e.key==='Escape') m.remove(); });
  document.body.append(m);
  box.scrollTop=0;
  m.focus();
}

function render(){ const app=document.getElementById('app'); app.innerHTML=''; app.classList.remove('ph'); document.documentElement.lang=LANG;
  if(S.view==='lobby'&&S.coop) renderLobby(app); else if(S.view==='case'&&S.cs) renderCase(app); else renderHub(app);
  if(S.view==='case'&&S.cs&&S.focus&&S.phase==='play'&&!document.querySelector('.modal')){
    const el=document.querySelector(`.cell[data-r="${S.focus[0]}"][data-c="${S.focus[1]}"]`);
    if(el&&document.activeElement!==el) el.focus({preventScroll:true});
  }
}
function boot(){ let id=''; try{id=(location.hash||'').slice(1)}catch(e){} const i=CASES.findIndex(c=>c.id===id); if(i>=0) startCase(i); else render(); }
window.addEventListener('hashchange',()=>{ if(S.coop) return; let id='';try{id=location.hash.slice(1)}catch(e){} const i=CASES.findIndex(c=>c.id===id); if(i>=0&&(!S.cs||S.cs.id!==id)) startCase(i); else if(i<0&&S.view!=='hub'&&!/^r-/.test(id)) goHub();});
window.addEventListener('pagehide',()=>{ saveProg(); if(S.coop) leaveRoom(); });
boot();
/* A host chose another style for a new room: create it here, then clean the query. */
(function(){
  let q=null; try{ q=new URLSearchParams(location.search); }catch(e){ return; }
  if(q.get('create')==='1' && NET && !S.coop){
    const name=(q.get('name')||globalStore.get('name','')||'').trim().slice(0,16);
    joinRoom(newCode(),name);
    try{ if(S.coop) history.replaceState(null,'',location.pathname+(NET_PARAM?'?net='+encodeURIComponent(NET_PARAM):'')+'#r-'+S.coop.code); }catch(e){}
  }
})();
