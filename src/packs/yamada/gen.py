import random, json, itertools, sys, os, time

# ---------- vocabulary ----------
OBJ = {
 # occupiable
 'chair':   dict(occ=True),
 'sofa':    dict(occ=True),
 'rug':     dict(occ=True),
 'bed':     dict(occ=True),
 'bench':   dict(occ=True),
 # blocked
 'desk':    dict(occ=False),
 'shelf':   dict(occ=False),
 'vending': dict(occ=False),
 'plant':   dict(occ=False),
 'crane':   dict(occ=False),
 'fridge':  dict(occ=False),
 'table':   dict(occ=False),
 'tree':    dict(occ=False),
}

# ---------- maps ----------
# rooms: letters; objects: dict "r,c" -> obj
MAPS = []

def M(id, title, titleHu, flav, flavHu, size, grid, rooms, objs, people, level, seed=None):
    # Explicit seeds keep every case reproducible when maps are reordered or added.
    if seed is None: seed = 3000 + len(MAPS) * 7
    MAPS.append(dict(id=id,title=title,titleHu=titleHu,flav=flav,flavHu=flavHu,size=size,grid=grid,rooms=rooms,objs=objs,people=people,level=level,seed=seed))

M('game-cafe','Il caso del game café','Az eset a játékkávézóban',
  'La gilda Chocolate Rabbit si ritrova al game café. Durante la pausa qualcuno ha nascosto Choco!',
  'A Csokinyuszi céh a játékkávézóban ül össze. A szünetben valaki elrejtette Chocót!',4,
  ['CCTT','CCTT','KKSS','KKSS'],
  {'C':dict(it='Counter',itIn='al bancone',hu='pult',huIn='a pultnál'),
   'T':dict(it='Tables',itIn='ai tavoli',hu='asztalok',huIn='az asztaloknál'),
   'K':dict(it='Kitchen',itIn='in cucina',hu='konyha',huIn='a konyhában'),
   'S':dict(it='SofaCorner',itIn='nell\'angolo divani',hu='kanapésarok',huIn='a kanapésarokban')},
  {'0,1':'chair','1,1':'rug','0,3':'vending','1,2':'plant','2,0':'sofa','2,2':'table','3,0':'shelf','3,3':'sofa'},
  [('Akane Kinoshita','f'),('Akito Yamada','m'),('Eita Sasaki','m'),('Choco','f')],1,7101)

M('yamada-home','Un tranquillo pomeriggio da Yamada','Egy nyugodt délután Yamadánál',
  'Akane e Runa vanno a trovare Yamada. Mentre il tè è pronto, Choco sparisce dal divano!',
  'Akane és Runa meglátogatja Yamadát. Míg a tea készül, Choco eltűnik a kanapéról!',4,
  ['EELL','EELL','KKBB','KKBB'],
  {'E':dict(it='Entry',itIn='all\'ingresso',hu='előszoba',huIn='az előszobában'),
   'L':dict(it='LivingRoom',itIn='in salotto',hu='nappali',huIn='a nappaliban'),
   'K':dict(it='Kitchen',itIn='in cucina',hu='konyha',huIn='a konyhában'),
   'B':dict(it='Bedroom',itIn='in camera',hu='hálószoba',huIn='a hálószobában')},
  {'0,1':'chair','1,1':'rug','0,3':'desk','1,2':'plant','2,0':'sofa','2,2':'table','3,0':'bed','3,3':'shelf'},
  [('Akito Yamada','m'),('Akane Kinoshita','f'),('Runa Sasaki','f'),('Choco','f')],1,7108)

M('university','Choco va all\'università','Choco egyetemre megy',
  'La gilda visita l\'università di Akane. Tra una lezione e l\'altra, qualcuno ha messo via Choco!',
  'A céh megnézi Akane egyetemét. Két előadás között valaki eldugta Chocót!',5,
  ['LLLBB','LLLBB','CCCBB','CCCPP','FFFPP'],
  {'L':dict(it='LectureHall',itIn='nell\'aula magna',hu='előadóterem',huIn='az előadóteremben'),
   'B':dict(it='Library',itIn='in biblioteca',hu='könyvtár',huIn='a könyvtárban'),
   'C':dict(it='Cafeteria',itIn='in mensa',hu='menza',huIn='a menzán'),
   'P':dict(it='Courtyard',itIn='in cortile',hu='udvar',huIn='az udvarban'),
   'F':dict(it='Corridor',itIn='nel corridoio',hu='folyosó',huIn='a folyosón')},
  {'0,1':'chair','1,1':'rug','0,4':'shelf','2,0':'table','2,3':'shelf','3,4':'plant','4,0':'bench','3,1':'sofa','2,2':'vending','2,1':'desk','4,3':'chair'},
  [('Akane Kinoshita','f'),('Eita Sasaki','m'),('Yukari Tsubaki','f'),('Momoko Maeda','f'),('Choco','f')],2,7115)

M('konbini','Missione snack di mezzanotte','Éjféli nasiküldetés',
  'Una corsa notturna al konbini. Choco è sparita tra gli scaffali!',
  'Éjjeli nasivásár a konbiniben. Choco eltűnt a polcok között!',5,
  ['SSSCC','SSSCC','FFFCC','FFEEE','MMMEE'],
  {'S':dict(it='Aisles',itIn='tra gli scaffali',hu='polcsorok',huIn='a polcsorok között'),
   'C':dict(it='Counter',itIn='al bancone',hu='pult',huIn='a pultnál'),
   'F':dict(it='Freezers',itIn='ai surgelati',hu='fagyasztók',huIn='a fagyasztóknál'),
   'E':dict(it='Entry',itIn='all\'ingresso',hu='bejárat',huIn='a bejáratnál'),
   'M':dict(it='Storage',itIn='in magazzino',hu='raktár',huIn='a raktárban')},
  {'0,1':'shelf','1,1':'rug','0,4':'vending','2,0':'fridge','2,3':'chair','3,4':'plant','4,0':'shelf','3,1':'bench','2,2':'table','2,1':'fridge','4,3':'sofa'},
  [('Runa Sasaki','f'),('Akito Yamada','m'),('Rurihime','f'),('Takezo Kamota','m'),('Choco','f')],2,7122)

M('school','Il mistero dell\'accademia Tousei','A Touszei-akadémia rejtélye',
  'Yamada e Yukari mostrano a Runa la loro vecchia scuola. Durante il giro, Choco sparisce!',
  'Yamada és Yukari megmutatja Runának a régi iskolájukat. A séta közben Choco eltűnik!',5,
  ['AAACC','AAACC','GGGCC','GGGBB','YYYBB'],
  {'A':dict(it='Classroom',itIn='in aula',hu='osztályterem',huIn='az osztályteremben'),
   'C':dict(it='Corridor',itIn='nel corridoio',hu='folyosó',huIn='a folyosón'),
   'G':dict(it='Gym',itIn='in palestra',hu='tornaterem',huIn='a tornateremben'),
   'B':dict(it='Library',itIn='in biblioteca',hu='könyvtár',huIn='a könyvtárban'),
   'Y':dict(it='Courtyard',itIn='in cortile',hu='udvar',huIn='az udvarban')},
  {'0,1':'chair','1,1':'rug','0,4':'shelf','2,0':'bench','2,3':'desk','3,4':'plant','4,0':'tree','3,1':'chair','2,2':'table','2,1':'shelf','4,3':'bench'},
  [('Yukari Tsubaki','f'),('Akito Yamada','m'),('Runa Sasaki','f'),('Rurihime','f'),('Choco','f')],3,7129)

M('arcade','Choco e la gru dei peluche','Choco és a plüssfogó',
  'La gilda assalta la sala giochi. Qualcuno ha nascosto Choco vicino alle gru per scherzo?',
  'A céh berohan a játéktermbe. Valaki poénból a plüssfogóknál rejtette el Chocót?',6,
  ['CCCRRR','CCCRRR','FFFRRR','FFFPPP','EEEPPP','EEESSS'],
  {'C':dict(it='Cranes',itIn='nella zona gru',hu='plüssfogók',huIn='a plüssfogóknál'),
   'R':dict(it='Rhythm',itIn='ai giochi di ritmo',hu='ritmusjátékok',huIn='a ritmusjátékoknál'),
   'F':dict(it='Fighting',itIn='ai picchiaduro',hu='verekedős játékok',huIn='a verekedős játékoknál'),
   'P':dict(it='Prizes',itIn='nell\'angolo premi',hu='nyereménysarok',huIn='a nyereménysarokban'),
   'E':dict(it='Entry',itIn='all\'ingresso',hu='bejárat',huIn='a bejáratnál'),
   'S':dict(it='SnackBar',itIn='allo snack bar',hu='snackbár',huIn='a snackbárnál')},
  {'0,1':'chair','1,2':'rug','2,0':'sofa','0,4':'crane','1,4':'crane','2,2':'table','2,1':'desk','3,5':'vending','3,4':'plant','4,0':'chair','4,3':'sofa','5,5':'table','2,3':'shelf'},
  [('Akane Kinoshita','f'),('Akito Yamada','m'),('Runa Sasaki','f'),('Eita Sasaki','m'),('Momoko Maeda','f'),('Choco','f')],3,7136)

M('strawberry-farm','Il caso del campo di fragole','Az eset az eperföldön',
  'Takezo invita tutti a raccogliere le fragole. Choco è sparita tra le piante!',
  'Takezo mindenkit eper szedni hív. Choco eltűnt a növények között!',6,
  ['SSSFFF','SSSFFF','SSSFFF','BBBKKK','BBBKKK','GGGPPP'],
  {'S':dict(it='Greenhouse',itIn='nella serra',hu='üvegház',huIn='az üvegházban'),
   'F':dict(it='Field',itIn='nel campo',hu='eperföld',huIn='az eperföldön'),
   'B':dict(it='Barn',itIn='nel fienile',hu='pajta',huIn='a pajtában'),
   'K':dict(it='FarmShop',itIn='nello spaccio',hu='farmbolt',huIn='a farmboltban'),
   'P':dict(it='Porch',itIn='sotto il portico',hu='tornác',huIn='a tornácon'),
   'G':dict(it='Gate',itIn='al cancello',hu='kapu',huIn='a kapunál')},
  {'0,1':'chair','1,2':'rug','2,0':'bed','0,4':'tree','1,4':'plant','2,2':'table','2,1':'shelf','3,5':'vending','3,4':'plant','4,0':'sofa','4,3':'chair','5,5':'bench','2,3':'tree'},
  [('Takezo Kamota','m'),('Akane Kinoshita','f'),('Momoko Maeda','f'),('Akito Yamada','m'),('Eita Sasaki','m'),('Choco','f')],3,7143)

M('fireworks','Il gran finale dei fuochi','A tűzijáték fináléja',
  'Tutti in yukata per i fuochi d\'artificio. Poco prima del primo botto, Choco non si trova più!',
  'Mindenki jukatában várja a tűzijátékot. Az első durranás előtt Choco sehol sincs!',7,
  ['SSSSHHH','SSSSHHH','FFFFHHH','FFFFVVV','PPPPVVV','PPPPRRR','TTTTRRR'],
  {'S':dict(it='Stalls',itIn='tra le bancarelle',hu='bódék',huIn='a bódéknál'),
   'H':dict(it='Shrine',itIn='al santuario',hu='szentélylépcső',huIn='a szentélylépcsőn'),
   'R':dict(it='Riverside',itIn='sulla riva del fiume',hu='folyópart',huIn='a folyóparton'),
   'T':dict(it='Stage',itIn='sul palco',hu='színpad',huIn='a színpadon'),
   'P':dict(it='Park',itIn='nel parco',hu='park',huIn='a parkban'),
   'F':dict(it='FoodAlley',itIn='nel vicolo goloso',hu='finomságsor',huIn='a finomságsoron'),
   'V':dict(it='Hill',itIn='sulla collina',hu='kilátódomb',huIn='a kilátódombon')},
  {'0,1':'chair','0,3':'table','0,5':'shelf','1,2':'tree','1,5':'plant','2,0':'bench','2,2':'table','2,6':'plant','3,1':'bench','3,4':'tree','4,0':'rug','4,2':'sofa','4,5':'plant','5,0':'chair','5,2':'rug','5,5':'tree','6,1':'bench','6,4':'chair','6,6':'shelf','3,0':'vending'},
  [('Akane Kinoshita','f'),('Akito Yamada','m'),('Runa Sasaki','f'),('Eita Sasaki','m'),('Momoko Maeda','f'),('Takezo Kamota','m'),('Choco','f')],4,7150)

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

def solve(m,clues,limit=2,max_nodes=200000):
    N,objs,room,occ=m['_b']
    P=len(m['people']); victim=P-1
    dom=[]
    for i in range(P):
        ds=[cell for cell in occ if all(unary_ok(m,cl,cell) for j,cl in clues if j==i)]
        dom.append(ds)
    sols=[]; pos=[None]*P; nodes=[0]
    def rec(ur,uc):
        if len(sols)>=limit or nodes[0]>max_nodes: return
        nodes[0]+=1
        # MRV: next unassigned person with the fewest still-possible cells
        best=-1; bestcells=None
        for i in range(P):
            if pos[i] is not None: continue
            cells=[cell for cell in dom[i] if cell[0] not in ur and cell[1] not in uc]
            if best<0 or len(cells)<len(bestcells):
                best=i; bestcells=cells
                if not cells: break
        if best<0:
            if global_ok(m,clues,pos,victim): sols.append(list(pos))
            return
        for (r,c) in bestcells:
            pos[best]=(r,c)
            if partial_ok(m,clues,pos,best):
                ur.add(r); uc.add(c)
                rec(ur,uc)
                ur.discard(r); uc.discard(c)
            pos[best]=None
    rec(set(),set())
    return sols, nodes[0]>max_nodes

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
        for R in sorted(set(room(*x) for x in occ)):
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

def unique_for(m,clues,sol):
    s,trunc=solve(m,clues,max_nodes=60000)
    return (not trunc) and len(s)==1 and s[0]==sol

# Lower removal priority = try to drop these clues first, so the puzzle keeps
# telling a story (rooms, objects, relations) instead of only row/col numbers.
REMOVE_PRIORITY={'row':0,'col':0,'corner':1,'notroom':1,'room':2,'with':3,'dir':3,
                 'by':4,'on':5,'onlyon':6,'alone':7}

def generate(m,seed,deadline=30.0):
    """Pick a random valid solution, then shrink its full clue set while the
    puzzle keeps exactly one solution. Greedy removal is both fast and gives
    at least one clue per suspect."""
    rng=random.Random(seed)
    m['_b']=build(m)
    P=len(m['people'])
    t0=time.time()
    for attempt in range(200):
        if time.time()-t0>deadline: return None
        sol=random_solution(m,rng)
        if not sol: continue
        cand=[true_clues(m,sol,i,m['level']) for i in range(P-1)]
        if any(not c for c in cand): continue
        # one weighted clue per suspect is mandatory; every other true clue is removable
        mandatory=[]; pool=[]
        for i in range(P-1):
            pick=rng.choices(cand[i],weights=[W[x['t']] for x in cand[i]])[0]
            mandatory.append((i,pick))
            seen={json.dumps(pick,sort_keys=True)}
            for cl in cand[i]:
                k=json.dumps(cl,sort_keys=True)
                if k not in seen:
                    seen.add(k); pool.append((i,cl))
        keep=list(mandatory)+list(pool)
        if not unique_for(m,keep,sol): continue
        pool.sort(key=lambda ic:(REMOVE_PRIORITY.get(ic[1]['t'],5),rng.random()))
        for item in pool:
            trial=[x for x in keep if x is not item]
            if unique_for(m,trial,sol): keep=trial
        # a little redundancy on the easy levels keeps the first cases friendly
        if m['level']<=2:
            spare=[x for x in pool if x not in keep]
            if spare: keep.append(rng.choice(spare))
        return sol,keep
    return None

out=[]
def main():
    out=[]
    for k,m in enumerate(MAPS):
        t0=time.time()
        res=generate(m,m['seed'])
        print(m['id'],'...',round(time.time()-t0,2),'s',flush=True)
        if not res:
            print('FAIL',m['id'],flush=True); continue
        sol,clues=res
        N,objs,room,occ=m['_b']
        victim=len(m['people'])-1
        va=room(*sol[victim])
        culprit=[i for i in range(victim) if room(*sol[i])==va][0]
        print(m['id'],'ok','culprit',m['people'][culprit][0],[(m['people'][i][0],c) for i,c in clues])
        d={k2:v for k2,v in m.items() if k2 not in ('_b','seed')}
        d['solution']=sol; d['killer']=culprit
        d['clues']=[dict(p=i,**c) for i,c in clues]
        out.append(d)

    HERE=os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(HERE,'cases.json'),'w',encoding='utf-8') as f:
        json.dump(out,f,ensure_ascii=False)
    print(len(out),'cases written to',os.path.join(HERE,'cases.json'))

if __name__=='__main__':
    main()
