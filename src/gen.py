import random, json, itertools, sys

# ---------- vocabulary ----------
OBJ = {
 # occupiable
 'sedia':   dict(occ=True,  it='sedia',   art='una', hu='szék',    huOn='egy széken ült', itOn={'m':'Era seduto su una sedia.','f':'Era seduta su una sedia.'}),
 'divano':  dict(occ=True,  it='divano',  art='un',  hu='kanapé',  huOn='egy kanapén ült', itOn={'m':'Era seduto su un divano.','f':'Era seduta su un divano.'}),
 'tappeto': dict(occ=True,  it='tappeto', art='un',  hu='szőnyeg', huOn='egy szőnyegen állt', itOn={'m':'Era su un tappeto.','f':'Era su un tappeto.'}),
 'letto':   dict(occ=True,  it='letto',   art='un',  hu='ágy',     huOn='egy ágyon volt', itOn={'m':'Era su un letto.','f':'Era su un letto.'}),
 # blocked
 'tavolo':  dict(occ=False, it='tavolo',  art='un',  hu='asztal',  huBy='egy asztal mellett'),
 'scaffale':dict(occ=False, it='scaffale',art='uno', hu='polc',    huBy='egy polc mellett'),
 'albero':  dict(occ=False, it='albero',  art='un',  hu='fa',      huBy='egy fa mellett'),
 'cespuglio':dict(occ=False,it='cespuglio',art='un', hu='bokor',   huBy='egy bokor mellett'),
 'cassa':   dict(occ=False, it='cassa',   art='una', hu='láda',    huBy='egy láda mellett'),
 'vaso':    dict(occ=False, it='vaso',    art='un',  hu='váza',    huBy='egy váza mellett'),
 'pianta':  dict(occ=False, it='pianta',  art='una', hu='cserepes növény', huBy='egy cserepes növény mellett'),
 'masso':   dict(occ=False, it='masso',   art='un',  hu='kőszikla', huBy='egy kőszikla mellett'),
 'frigo':   dict(occ=False, it='frigorifero', art='un', hu='hűtő', huBy='egy hűtő mellett'),
 'forno':   dict(occ=False, it='forno',   art='un',  hu='sütő',    huBy='egy sütő mellett'),
}
ORD_IT = ['prima','seconda','terza','quarta','quinta','sesta','settima']
ORD_HU = ['első','második','harmadik','negyedik','ötödik','hatodik','hetedik']

# ---------- maps ----------
# rooms: letters; objects: dict "r,c" -> obj
MAPS = []

def M(id, title, flav, flavHu, size, grid, rooms, objs, people, level):
    MAPS.append(dict(id=id,title=title,flav=flav,flavHu=flavHu,size=size,grid=grid,rooms=rooms,objs=objs,people=people,level=level))

M('cucina-nonna','A casa della nonna',
  'La torta della nonna è sparita... e anche il signor Rossi.',
  'Eltűnt a nagymama tortája... és Rossi úr is.',4,
  ['KKSS','KKSS','CCSB','CCBB'],
  {'K':dict(it='Cucina',itIn='in cucina',hu='konyha',huIn='a konyhában'),
   'S':dict(it='Salotto',itIn='in salotto',hu='nappali',huIn='a nappaliban'),
   'C':dict(it='Camera',itIn='in camera',hu='hálószoba',huIn='a hálószobában'),
   'B':dict(it='Bagno',itIn='in bagno',hu='fürdőszoba',huIn='a fürdőszobában')},
  {'0,0':'frigo','1,1':'sedia','0,3':'divano','1,2':'tappeto','2,0':'letto','3,1':'scaffale','2,3':'pianta'},
  [('Luca','m'),('Sofia','f'),('Marco','m'),('Rossi','m')],1)

M('giardino','Nel giardino',
  'Qualcuno ha calpestato le rose. E poi è successo il peggio.',
  'Valaki letaposta a rózsákat. Aztán jött a legrosszabb.',4,
  ['GGOO','GGOO','PPOT','PPTT'],
  {'G':dict(it='Giardino',itIn='in giardino',hu='kert',huIn='a kertben'),
   'O':dict(it='Orto',itIn='nell\'orto',hu='veteményes',huIn='a veteményesben'),
   'P':dict(it='Portico',itIn='sotto il portico',hu='tornác',huIn='a tornácon'),
   'T':dict(it='Serra',itIn='nella serra',hu='üvegház',huIn='az üvegházban')},
  {'0,0':'albero','1,1':'cespuglio','0,3':'cassa','2,1':'sedia','3,0':'tavolo','3,3':'pianta','2,3':'tappeto'},
  [('Giulia','f'),('Paolo','m'),('Anna','f'),('Bianchi','m')],1)

M('pizzeria','Alla pizzeria',
  'Pizza margherita per tutti, tranne che per il cuoco.',
  'Margherita pizza mindenkinek, kivéve a szakácsot.',5,
  ['FFKKK','FFKKK','SSSKK','SSSDD','SSSDD'],
  {'F':dict(it='Forno',itIn='al forno',hu='kemence',huIn='a kemencénél'),
   'K':dict(it='Cucina',itIn='in cucina',hu='konyha',huIn='a konyhában'),
   'S':dict(it='Sala',itIn='in sala',hu='étterem',huIn='az étteremben'),
   'D':dict(it='Dispensa',itIn='in dispensa',hu='kamra',huIn='a kamrában')},
  {'0,0':'forno','1,1':'cassa','0,3':'frigo','1,4':'tavolo','2,0':'sedia','2,1':'tavolo','3,1':'sedia','4,2':'tappeto','3,3':'scaffale','4,4':'cassa','2,3':'sedia'},
  [('Matteo','m'),('Chiara','f'),('Davide','m'),('Elena','f'),('Gino','m')],2)

M('scuola','A scuola',
  'Suona la campanella. Ma un professore non si alzerà più.',
  'Megszólal a csengő. De egy tanár már nem kel fel.',5,
  ['AAABB','AAABB','CCPBB','CCPPP','CCPPP'],
  {'A':dict(it='Aula',itIn='in aula',hu='osztályterem',huIn='az osztályteremben'),
   'B':dict(it='Biblioteca',itIn='in biblioteca',hu='könyvtár',huIn='a könyvtárban'),
   'C':dict(it='Corridoio',itIn='nel corridoio',hu='folyosó',huIn='a folyosón'),
   'P':dict(it='Palestra',itIn='in palestra',hu='tornaterem',huIn='a tornateremben')},
  {'0,0':'sedia','0,1':'tavolo','1,1':'sedia','1,2':'tavolo','0,4':'scaffale','1,3':'sedia','2,4':'scaffale','2,0':'pianta','4,0':'vaso','3,3':'tappeto','4,4':'cassa','4,2':'tappeto'},
  [('Federico','m'),('Martina','f'),('Lorenzo','m'),('Alice','f'),('Ferri','m')],2)

M('stazione','Alla stazione',
  'Il treno delle otto è partito in orario. Il capostazione no.',
  'A nyolcórás vonat időben indult. Az állomásfőnök nem.',6,
  ['BBBTTT','BBBTTT','SSBTTT','SSBBQQ','SSSBQQ','SSSBQQ'],
  {'B':dict(it='Binario',itIn='sul binario',hu='vágány',huIn='a vágánynál'),
   'T':dict(it='Bar',itIn='al bar',hu='büfé',huIn='a büfében'),
   'S':dict(it='Sala d\'attesa',itIn='in sala d\'attesa',hu='váróterem',huIn='a váróteremben'),
   'Q':dict(it='Biglietteria',itIn='in biglietteria',hu='jegypénztár',huIn='a jegypénztárban')},
  {'0,0':'cassa','1,2':'sedia','0,4':'tavolo','1,3':'sedia','1,5':'frigo','2,4':'sedia','2,0':'divano','3,1':'pianta','4,0':'divano','5,2':'vaso','3,4':'tavolo','4,5':'sedia','5,4':'scaffale','4,3':'cassa','5,0':'sedia'},
  [('Riccardo','m'),('Beatrice','f'),('Tommaso','m'),('Giorgia','f'),('Pietro','m'),('Moretti','m')],3)

M('castello','Nel castello',
  'Il fantasma del castello giura di non saperne niente.',
  'A kastély szelleme esküszik, hogy semmit sem tud.',6,
  ['TTTGGG','TTTGGG','CCSSGG','CCSSSS','CCSSKK','CCCSKK'],
  {'T':dict(it='Torre',itIn='nella torre',hu='torony',huIn='a toronyban'),
   'G':dict(it='Giardino',itIn='in giardino',hu='kert',huIn='a kertben'),
   'C':dict(it='Cappella',itIn='nella cappella',hu='kápolna',huIn='a kápolnában'),
   'S':dict(it='Salone',itIn='nel salone',hu='nagyterem',huIn='a nagyteremben'),
   'K':dict(it='Cantina',itIn='in cantina',hu='pince',huIn='a pincében')},
  {'0,0':'letto','0,2':'scaffale','1,1':'tappeto','0,4':'albero','1,5':'cespuglio','2,4':'masso','2,0':'sedia','3,1':'vaso','5,0':'sedia','2,3':'tavolo','3,2':'sedia','4,3':'tappeto','3,5':'divano','4,5':'cassa','5,4':'cassa'},
  [('Vittoria','f'),('Edoardo','m'),('Camilla','f'),('Leonardo','m'),('Aurora','f'),('Conte Neri','m')],3)

M('campeggio','Al campeggio',
  'Marshmallow sul fuoco, stelle in cielo, e un mistero in tenda.',
  'Mályvacukor a tűzön, csillagok az égen, és egy rejtély a sátorban.',7,
  ['LLLBBBB','LLLBBBB','LLFFBTT','PFFFFTT','PPFFFTT','PPPRRTT','PPPRRRR'],
  {'L':dict(it='Lago',itIn='al lago',hu='tó',huIn='a tónál'),
   'B':dict(it='Bosco',itIn='nel bosco',hu='erdő',huIn='az erdőben'),
   'F':dict(it='Falò',itIn='al falò',hu='tábortűz',huIn='a tábortűznél'),
   'T':dict(it='Tenda',itIn='in tenda',hu='sátor',huIn='a sátorban'),
   'P':dict(it='Prato',itIn='sul prato',hu='rét',huIn='a réten'),
   'R':dict(it='Roulotte',itIn='nella roulotte',hu='lakókocsi',huIn='a lakókocsiban')},
  {'0,0':'masso','1,2':'tappeto','0,4':'albero','0,6':'albero','1,5':'cespuglio','2,4':'albero','2,2':'sedia','3,3':'masso','4,4':'sedia','2,6':'letto','3,6':'cassa','4,5':'tappeto','3,0':'cespuglio','5,1':'albero','6,0':'sedia','5,3':'tavolo','6,5':'letto','5,6':'sedia','6,3':'divano','5,5':'letto'},
  [('Gabriele','m'),('Emma','f'),('Nicolò','m'),('Greta','f'),('Simone','m'),('Irene','f'),('Zio Bruno','m')],4)

M('museo','Al museo',
  'Tra statue e dipinti, solo una cosa non torna: il guardiano.',
  'Szobrok és festmények között csak egy dolog nem stimmel: az őr.',7,
  ['IIIEEEE','IIIEEEE','AAAEEMM','AAQQQMM','AAQQQMM','NNQQQMM','NNNNNMM'],
  {'I':dict(it='Ingresso',itIn='all\'ingresso',hu='bejárat',huIn='a bejáratnál'),
   'E':dict(it='Sala egizia',itIn='nella sala egizia',hu='egyiptomi terem',huIn='az egyiptomi teremben'),
   'A':dict(it='Sala dei quadri',itIn='nella sala dei quadri',hu='képterem',huIn='a képteremben'),
   'Q':dict(it='Cortile',itIn='in cortile',hu='udvar',huIn='az udvaron'),
   'M':dict(it='Magazzino',itIn='in magazzino',hu='raktár',huIn='a raktárban'),
   'N':dict(it='Negozio',itIn='nel negozio',hu='ajándékbolt',huIn='az ajándékboltban')},
  {'0,0':'sedia','0,2':'pianta','1,1':'tappeto','0,4':'vaso','0,6':'vaso','1,5':'tappeto','2,4':'vaso','2,0':'sedia','3,1':'scaffale','4,0':'divano','3,3':'albero','4,4':'masso','5,2':'cespuglio','2,6':'cassa','3,5':'cassa','4,6':'sedia','6,5':'cassa','5,0':'tavolo','6,2':'sedia','6,4':'scaffale','5,6':'tappeto'},
  [('Alessandro','m'),('Ginevra','f'),('Filippo','m'),('Bianca','f'),('Mattia','m'),('Ludovica','f'),('Signor Galli','m')],4)

# ---------- helpers ----------
def build(m):
    N=m['size']; g=m['grid']
    objs={tuple(map(int,k.split(','))):v for k,v in m['objs'].items()}
    room=lambda r,c:g[r][c]
    occ=[(r,c) for r in range(N) for c in range(N) if not (objs.get((r,c)) and not OBJ[objs[(r,c)]]['occ'])]
    return N,objs,room,occ

def nbrs(N,r,c):
    for dr,dc in ((1,0),(-1,0),(0,1),(0,-1)):
        rr,cc=r+dr,c+dc
        if 0<=rr<N and 0<=cc<N: yield rr,cc

def unary_ok(m,cl,cell):
    N,objs,room,occ=m['_b']
    r,c=cell; t=cl['t']
    if t=='room': return room(r,c)==cl['v']
    if t=='notroom': return room(r,c)!=cl['v']
    if t=='on' or t=='onlyon': return objs.get(cell)==cl['v']
    if t=='by': return any(objs.get(n)==cl['v'] and room(*n)==room(r,c) for n in nbrs(N,r,c))
    if t=='row': return r==cl['v']
    if t=='col': return c==cl['v']
    if t=='corner': return r in (0,N-1) and c in (0,N-1)
    if t=='edge': return r in (0,N-1) or c in (0,N-1)
    return True

def global_ok(m,clues,pos,victim):
    N,objs,room,occ=m['_b']
    # victim area exactly one other
    va=room(*pos[victim])
    if sum(1 for i,p in enumerate(pos) if i!=victim and room(*p)==va)!=1: return False
    for i,cl in clues:
        t=cl['t']; p=pos[i]
        if t=='onlyon':
            if any(j!=i and objs.get(pos[j])==cl['v'] for j in range(len(pos))): return False
        elif t=='alone':
            if any(j!=i and room(*pos[j])==room(*p) for j in range(len(pos))): return False
        elif t=='with':
            if room(*pos[cl['v']])!=room(*p): return False
        elif t=='dir':
            q=pos[cl['v']]; d=cl['d']
            if d=='n' and not p[0]<q[0]: return False
            if d=='s' and not p[0]>q[0]: return False
            if d=='e' and not p[1]>q[1]: return False
            if d=='o' and not p[1]<q[1]: return False
    return True

def partial_ok(m,clues,pos,i):
    N,objs,room,occ=m['_b']
    for j,cl in clues:
        t=cl['t']
        if t=='alone':
            a=pos[j]
            if a is None: continue
            for k,q in enumerate(pos):
                if k!=j and q is not None and room(*q)==room(*a): return False
        elif t=='onlyon':
            a=pos[j]
            if a is None: continue
            for k,q in enumerate(pos):
                if k!=j and q is not None and objs.get(q)==cl['v']: return False
        elif t in ('with','dir'):
            p=pos[j]; q=pos[cl['v']]
            if p is None or q is None: continue
            if t=='with' and room(*p)!=room(*q): return False
            if t=='dir':
                d=cl['d']
                if d=='n' and not p[0]<q[0]: return False
                if d=='s' and not p[0]>q[0]: return False
                if d=='e' and not p[1]>q[1]: return False
                if d=='o' and not p[1]<q[1]: return False
    return True

def solve(m,clues,limit=2):
    N,objs,room,occ=m['_b']
    P=len(m['people']); victim=P-1
    dom=[]
    for i in range(P):
        ds=[cell for cell in occ if all(unary_ok(m,cl,cell) for j,cl in clues if j==i)]
        dom.append(ds)
    order=sorted(range(P-1),key=lambda i:len(dom[i]))+[victim]
    sols=[]; pos=[None]*P
    def rec(k,ur,uc):
        if len(sols)>=limit: return
        if k==P:
            if global_ok(m,clues,pos,victim): sols.append(list(pos))
            return
        i=order[k]
        for (r,c) in dom[i]:
            if r in ur or c in uc: continue
            pos[i]=(r,c)
            if partial_ok(m,clues,pos,i):
                ur.add(r); uc.add(c)
                rec(k+1,ur,uc)
                ur.discard(r); uc.discard(c)
        pos[i]=None
    rec(0,set(),set())
    return sols

def true_clues(m,sol,i,level):
    N,objs,room,occ=m['_b']
    P=len(sol); r,c=sol[i]; out=[]
    out.append(dict(t='room',v=room(r,c)))
    o=objs.get((r,c))
    if o:
        out.append(dict(t='on',v=o))
        if not any(j!=i and objs.get(sol[j])==o for j in range(P)): out.append(dict(t='onlyon',v=o))
    for n in nbrs(N,r,c):
        on=objs.get(n)
        if on and not OBJ[on]['occ'] and room(*n)==room(r,c): out.append(dict(t='by',v=on))
    out.append(dict(t='row',v=r)); out.append(dict(t='col',v=c))
    if r in (0,N-1) and c in (0,N-1): out.append(dict(t='corner'))
    if level>=2:
        for R in set(room(*x) for x in occ):
            if R!=room(r,c): out.append(dict(t='notroom',v=R))
        if not any(j!=i and room(*sol[j])==room(r,c) for j in range(P)): out.append(dict(t='alone'))
        for j in range(P-1):
            if j==i: continue
            q=sol[j]
            if r<q[0]: out.append(dict(t='dir',d='n',v=j))
            if r>q[0]: out.append(dict(t='dir',d='s',v=j))
            if c>q[1]: out.append(dict(t='dir',d='e',v=j))
            if c<q[1]: out.append(dict(t='dir',d='o',v=j))
            if room(*q)==room(r,c) : out.append(dict(t='with',v=j))
    # dedupe
    seen=set(); res=[]
    for x in out:
        k=json.dumps(x,sort_keys=True)
        if k not in seen: seen.add(k); res.append(x)
    return res

W={'room':5,'on':5,'onlyon':3,'by':5,'row':2,'col':2,'corner':2,'notroom':2,'alone':3,'dir':3,'with':2}

def random_solution(m,rng):
    N,objs,room,occ=m['_b']; P=len(m['people'])
    for _ in range(20000):
        rows=rng.sample(range(N),P); cols=rng.sample(range(N),P)
        pos=list(zip(rows,cols))
        if not all(p in occ for p in pos): continue
        if global_ok(m,[],pos,P-1): return pos
    return None

def generate(m,seed):
    rng=random.Random(seed)
    m['_b']=build(m)
    P=len(m['people'])
    for attempt in range(400):
        sol=random_solution(m,rng)
        if not sol: continue
        cand=[true_clues(m,sol,i,m['level']) for i in range(P-1)]
        for t in range(60):
            clues=[]
            for i in range(P-1):
                cs=cand[i]
                cl=rng.choices(cs,weights=[W[x['t']] for x in cs])[0]
                clues.append((i,cl))
            s=solve(m,clues)
            if len(s)==1 and s[0]==sol:
                return sol,clues
            # allow a second clue for some suspects at higher levels
            if m['level']>=3:
                for k in range(8):
                    extra=list(clues)
                    i=rng.randrange(P-1)
                    extra.append((i,rng.choices(cand[i],weights=[W[x['t']] for x in cand[i]])[0]))
                    s=solve(m,extra)
                    if len(s)==1 and s[0]==sol:
                        return sol,extra
    return None

out=[]
for k,m in enumerate(MAPS):
    res=generate(m,1000+k*7)
    if not res:
        print('FAIL',m['id']); continue
    sol,clues=res
    N,objs,room,occ=m['_b']
    victim=len(m['people'])-1
    va=room(*sol[victim])
    killer=[i for i in range(victim) if room(*sol[i])==va][0]
    print(m['id'],'ok','killer',m['people'][killer][0],[(m['people'][i][0],c) for i,c in clues])
    d={k2:v for k2,v in m.items() if k2!='_b'}
    d['solution']=sol; d['killer']=killer
    d['clues']=[dict(p=i,**c) for i,c in clues]
    out.append(d)
json.dump(out,open('/home/claude/murdoku/cases.json','w'),ensure_ascii=False)
print(len(out))
