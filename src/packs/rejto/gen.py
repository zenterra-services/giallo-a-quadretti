import random, json, itertools, sys, os, time

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

def M(id, title, titleHu, flav, flavHu, size, grid, rooms, objs, people, level, seed=None):
    # Explicit seeds keep every case reproducible when maps are reordered or added.
    if seed is None: seed = 1000 + len(MAPS) * 7
    MAPS.append(dict(id=id,title=title,titleHu=titleHu,flav=flav,flavHu=flavHu,size=size,grid=grid,rooms=rooms,objs=objs,people=people,level=level,seed=seed))

M('grand-hotel','Coprifuoco al Grand Hotel','Vesztegzár a Grand Hotelben',
  'Il Grand Hotel è chiuso. Tra gli ospiti c’è l’assassino — e secondo il portiere anche l’ascensore è sospetto.',
  'A Grand Hotel ajtaja zárva. A vendégek között ott a gyilkos – és a portás szerint a lift is gyanús.',4,
  ['LLRR','LLRR','BBSS','BBSS'],
  {'L':dict(it='Hall',itIn='nell\'atrio',hu='előcsarnok',huIn='az előcsarnokban'),
   'R':dict(it='Reception',itIn='alla reception',hu='recepció',huIn='a recepción'),
   'B':dict(it='Bar',itIn='al bar',hu='bár',huIn='a bárban'),
   'S':dict(it='Room',itIn='in camera',hu='szoba',huIn='a szobában')},
  {'0,1':'sedia','1,1':'tappeto','0,3':'cassa','1,2':'vaso','2,0':'divano','2,2':'tavolo','3,0':'pianta','3,3':'letto'},
  [('Piszkos Fred','m'),('Fülig Jimmy','m'),('Vanek úr','m'),('Török Szultán','m')],1,2001)

M('legio','La legione invisibile','A láthatatlan légió',
  'Nel fortino nessuno è invisibile. Qualcuno però lo è diventato per sempre.',
  'A légióban senki sem láthatatlan. De valaki most már örökre az.',5,
  ['BBBRR','BBBRR','KKKRR','KKKOO','TTTOO'],
  {'B':dict(it='Barracks',itIn='nel baraccamento',hu='barakk',huIn='a barakkban'),
   'R':dict(it='Guardroom',itIn='nel corpo di guardia',hu='őrszoba',huIn='az őrszobában'),
   'K':dict(it='Cucina',itIn='in cucina',hu='konyha',huIn='a konyhában'),
   'O':dict(it='Cortile',itIn='in cortile',hu='udvar',huIn='az udvarban'),
   'T':dict(it='Magazzino',itIn='in magazzino',hu='raktár',huIn='a raktárban')},
  {'0,1':'letto','1,1':'sedia','0,4':'cassa','2,0':'tavolo','2,3':'scaffale','3,4':'masso','4,0':'cespuglio','3,1':'vaso','2,2':'frigo','2,1':'forno','4,3':'pianta'},
  [('Csülök','m'),('Senki Alfonz','m'),('Glória','f'),('Vanek úr','m'),('Böffentő','m')],2,2014)

M('cirkalo','L\'incrociatore perduto','Az elveszett cirkáló',
  'L\'incrociatore è sparito. Il capitano sostiene che si è solo perso.',
  'A cirkáló eltűnt. A kapitány szerint csak eltévedt.',6,
  ['DDDCCC','DDDCCC','KKKCCC','KKKRRR','EEERRR','EEEHHH'],
  {'D':dict(it='Deck',itIn='sul ponte',hu='fedélzet',huIn='a fedélzeten'),
   'C':dict(it='Cabin',itIn='in cabina',hu='kabin',huIn='a kabinban'),
   'K':dict(it='Cucina',itIn='in cucina',hu='konyha',huIn='a konyhában'),
   'R':dict(it='Hold',itIn='nella stiva',hu='raktér',huIn='a raktérben'),
   'E':dict(it='Engine',itIn='nella sala macchine',hu='gépterem',huIn='a gépteremben'),
   'H':dict(it='Bridge',itIn='sul ponte di comando',hu='híd',huIn='a hídon')},
  {'0,1':'sedia','1,2':'tappeto','2,0':'letto','0,4':'cassa','1,4':'scaffale','2,2':'tavolo','2,1':'frigo','3,5':'vaso','3,4':'masso','4,0':'pianta','4,3':'divano','5,5':'letto','2,3':'forno'},
  [('Piszkos Fred','m'),('Fülig Jimmy','m'),('Vanek úr','m'),('Csülök','m'),('Senki Alfonz','m'),('Török Szultán','m')],3,2027)

M('karatos-auto','L\'auto a quattordici carati','A tizennégy karátos autó',
  'L\'auto è ritrovata. Il proprietario no.',
  'A tizennégy karátos autó megvan. A tulajdonosa nincs.',7,
  ['HHHHSSS','HHHHSSS','KKKKGGG','KKKKGGG','GGGGAAA','CCCCAAA','CCCCLLL'],
  {'H':dict(it='Hall',itIn='nell\'atrio',hu='előcsarnok',huIn='az előcsarnokban'),
   'S':dict(it='Salone',itIn='nel salone',hu='szalon',huIn='a szalonban'),
   'K':dict(it='Cucina',itIn='in cucina',hu='konyha',huIn='a konyhában'),
   'G':dict(it='Giardino',itIn='in giardino',hu='kert',huIn='a kertben'),
   'A':dict(it='Garage',itIn='nel garage',hu='garázs',huIn='a garázsban'),
   'C':dict(it='Cantina',itIn='in cantina',hu='pince',huIn='a pincében'),
   'L':dict(it='Biblioteca',itIn='in biblioteca',hu='könyvtár',huIn='a könyvtárban')},
  {'0,1':'sedia','0,3':'tavolo','0,5':'scaffale','1,2':'albero','1,5':'cespuglio','2,0':'cassa','2,2':'forno','2,6':'vaso','3,1':'tavolo','3,4':'scaffale','4,0':'tappeto','4,2':'divano','4,5':'pianta','5,0':'cassa','5,2':'sedia','5,5':'masso','6,1':'tappeto','6,4':'vaso','6,6':'scaffale','3,0':'letto'},
  [('Piszkos Fred','m'),('Fülig Jimmy','m'),('Vanek úr','m'),('Csülök','m'),('Senki Alfonz','m'),('Glória','f'),('Török Szultán','m')],4,2040)

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
        killer=[i for i in range(victim) if room(*sol[i])==va][0]
        print(m['id'],'ok','killer',m['people'][killer][0],[(m['people'][i][0],c) for i,c in clues])
        d={k2:v for k2,v in m.items() if k2 not in ('_b','seed')}
        d['solution']=sol; d['killer']=killer
        d['clues']=[dict(p=i,**c) for i,c in clues]
        out.append(d)

    HERE=os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(HERE,'cases.json'),'w',encoding='utf-8') as f:
        json.dump(out,f,ensure_ascii=False)
    print(len(out),'cases written to',os.path.join(HERE,'cases.json'))

if __name__=='__main__':
    main()
