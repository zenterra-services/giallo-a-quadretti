import random, json, itertools, sys, os, time

# ---------- vocabulary ----------
OBJ = {
 # occupiable
 'chair':   dict(occ=True),
 'sofa':    dict(occ=True),
 'rug':     dict(occ=True),
 'bed':     dict(occ=True),
 'bench':   dict(occ=True),
 'armchair':dict(occ=True),
 'rocker':  dict(occ=True),
 'haybale': dict(occ=True),
 'coffin':  dict(occ=True),
 # blocked
 'table':   dict(occ=False),
 'desk':    dict(occ=False),
 'shelf':   dict(occ=False),
 'piano':   dict(occ=False),
 'clock':   dict(occ=False),
 'armor':   dict(occ=False),
 'cauldron':dict(occ=False),
 'plant':   dict(occ=False),
}

# ---------- maps ----------
# rooms: letters; objects: dict "r,c" -> obj
MAPS = []

def M(id, title, titleHu, flav, flavHu, size, grid, rooms, objs, people, level, seed=None):
    # Explicit seeds keep every case reproducible when maps are reordered or added.
    if seed is None: seed = 3000 + len(MAPS) * 7
    MAPS.append(dict(id=id,title=title,titleHu=titleHu,flav=flav,flavHu=flavHu,size=size,grid=grid,rooms=rooms,objs=objs,people=people,level=level,seed=seed))

# ===== level 1 — 4x4 =====

M('vanishing-snacks','La sparizione degli snack','Az eltűnt nasik',
  "È Halloween a Villa Spooky Hollow. Durante la festa, la scatola degli Scooby Snacks è sparita dall'ingresso!",
  'Halloween van a Spooky Hollow-kastélyban. A buli alatt eltűnt a Scooby Snacks doboza az előszobából!',4,
  ['FFCC','FFCC','KKDD','KKDD'],
  {'F':dict(it='Foyer',itIn="nell'atrio",hu='előszoba',huIn='az előszobában'),
   'C':dict(it='Corridor',itIn='nel corridoio',hu='folyosó',huIn='a folyosón'),
   'K':dict(it='Kitchen',itIn='in cucina',hu='konyha',huIn='a konyhában'),
   'D':dict(it='DiningRoom',itIn='nella sala da pranzo',hu='ebédlő',huIn='az ebédlőben')},
  {'0,1':'chair','1,1':'rug','0,3':'armor','1,2':'plant','2,0':'table','2,2':'sofa','3,0':'shelf','3,3':'armchair'},
  [('Scooby-Doo','m'),('Shaggy Rogers','m'),('Velma Dinkley','f'),('Scooby Snacks','f')],1,8101)

M('pumpkin-prank','Lo scherzo del campo di zucche','Tréfa a tökföldön',
  'Fuori, tra le zucche, qualcuno fa scherzi. La scatola degli snack è sparita tra una risata e l\'altra!',
  'Odakint, a tökök között valaki tréfál. A nasidoboz eltűnt két nevetés között!',4,
  ['PPGG','PPGG','OOBB','OOBB'],
  {'P':dict(it='PumpkinPatch',itIn='nel campo di zucche',hu='tökföld',huIn='a tökföldön'),
   'G':dict(it='Garden',itIn='in giardino',hu='kert',huIn='a kertben'),
   'O':dict(it='Porch',itIn='sul portico',hu='tornác',huIn='a tornácon'),
   'B':dict(it='Barn',itIn='nel fienile',hu='csűr',huIn='a csűrben')},
  {'0,1':'haybale','1,1':'plant','0,3':'cauldron','1,2':'rug','2,0':'rocker','2,2':'table','3,0':'haybale','3,3':'bench'},
  [('Scooby-Doo','m'),('Fred Jones','m'),('Daphne Blake','f'),('Scooby Snacks','f')],1,8108)

M('ghost-library','Il fantasma della biblioteca','A könyvtár szelleme',
  'Una figura bianca è stata vista in biblioteca. E gli Scooby Snacks? Spariti!',
  'Fehér alakot láttak a könyvtárban. És a Scooby Snacks? Eltűnt!',4,
  ['LLSS','LLSS','MMCC','MMCC'],
  {'L':dict(it='Library',itIn='in biblioteca',hu='könyvtár',huIn='a könyvtárban'),
   'S':dict(it='Study',itIn='nello studio',hu='dolgozószoba',huIn='a dolgozószobában'),
   'M':dict(it='MusicRoom',itIn='nella sala musica',hu='zeneszoba',huIn='a zeneszobában'),
   'C':dict(it='Corridor',itIn='nel corridoio',hu='folyosó',huIn='a folyosón')},
  {'0,1':'shelf','1,1':'armchair','0,3':'desk','1,2':'rug','2,0':'piano','2,2':'chair','3,0':'shelf','3,3':'clock'},
  [('Velma Dinkley','f'),('Fred Jones','m'),('Groundskeeper Gus','m'),('Scooby Snacks','f')],1,8115)

# ===== level 2 — 5x5 =====

M('midnight-bonfire','Mezzanotte al falò','Éjfél a máglyánál',
  "Storie spaventose intorno al falò della fiera. A mezzanotte la scatola degli snack non c'era più!",
  'Ijesztő történetek a vásári máglyánál. Éjfélkor a nasidoboz már nem volt sehol!',5,
  ['BBCCC','BBCCC','GGGCC','GGTTT','WWTTT'],
  {'B':dict(it='Bonfire',itIn='intorno al falò',hu='máglya',huIn='a máglyánál'),
   'C':dict(it='CandyStand',itIn='al banco dei dolcetti',hu='édességasztal',huIn='az édességasztalnál'),
   'G':dict(it='Garden',itIn='in giardino',hu='kert',huIn='a kertben'),
   'T':dict(it='Gate',itIn='al cancello',hu='kapu',huIn='a kapunál'),
   'W':dict(it='Well',itIn='al pozzo',hu='kút',huIn='a kútnál')},
  {'0,1':'bench','1,1':'rug','0,4':'table','2,0':'plant','2,3':'cauldron','3,4':'clock','4,0':'chair','3,1':'haybale','2,2':'table','2,1':'plant','4,3':'bench'},
  [('Scooby-Doo','m'),('Shaggy Rogers','m'),('Daphne Blake','f'),('Madame Zora','f'),('Scooby Snacks','f')],2,8122)

M('fortune-warning',"L'avvertimento della veggente",'A jósnő figyelmeztetése',
  'Madame Zora legge il futuro nella sfera: "Attenti agli snack!" Troppo tardi...',
  'Madame Zora a gömbbe néz: „Vigyázzatok a nasira!" De már késő...',5,
  ['FFFCC','FFFCC','MMMCC','MMPPP','TTPPP'],
  {'F':dict(it='FortuneTent',itIn='nella tenda della veggente',hu='jósdasátor',huIn='a jósdasátorban'),
   'C':dict(it='CandyStand',itIn='al banco dei dolcetti',hu='édességasztal',huIn='az édességasztalnál'),
   'M':dict(it='CornMaze',itIn='nel labirinto di granturco',hu='kukoricalabirintus',huIn='a kukoricalabirintusban'),
   'P':dict(it='Porch',itIn='sul portico',hu='tornác',huIn='a tornácon'),
   'T':dict(it='Gate',itIn='al cancello',hu='kapu',huIn='a kapunál')},
  {'0,1':'rug','1,1':'table','0,4':'clock','2,0':'plant','2,3':'chair','3,4':'rocker','4,0':'haybale','3,1':'sofa','2,2':'cauldron','2,1':'table','4,3':'rug'},
  [('Madame Zora','f'),('Velma Dinkley','f'),('Shaggy Rogers','m'),('Widow Ravenna','f'),('Scooby Snacks','f')],2,8129)

M('cellar-cobwebs','Ragnatele in cantina','Pókháló a pincében',
  'La cantina della villa è piena di ragnatele e strani rumori. Chi ha portato giù gli snack?',
  'A kastély pincéje tele van pókhálóval és furcsa hangokkal. Ki vitte le a nasit?',5,
  ['CCCKK','CCCKK','AAAKK','AAOOO','SSSOO'],
  {'C':dict(it='Cellar',itIn='in cantina',hu='pince',huIn='a pincében'),
   'K':dict(it='Kitchen',itIn='in cucina',hu='konyha',huIn='a konyhában'),
   'A':dict(it='Attic',itIn='in soffitta',hu='padlás',huIn='a padláson'),
   'O':dict(it='Corridor',itIn='nel corridoio',hu='folyosó',huIn='a folyosón'),
   'S':dict(it='Study',itIn='nello studio',hu='dolgozószoba',huIn='a dolgozószobában')},
  {'0,1':'shelf','1,1':'rug','0,4':'table','2,0':'coffin','2,3':'chair','3,4':'armor','4,0':'bed','3,1':'sofa','2,2':'desk','2,1':'shelf','4,3':'armchair'},
  [('Scooby-Doo','m'),('Fred Jones','m'),('Groundskeeper Gus','m'),('Widow Ravenna','f'),('Scooby Snacks','f')],2,8136)

# ===== level 3 — 6x6 =====

M('corn-maze-chase',"L'inseguimento nel labirinto",'Hajsza a labirintusban',
  'Uno spaventapasseri... si è mosso! La banda lo insegue nel labirinto di granturco, ma gli snack spariscono.',
  'A madárijesztő... megmozdult! A banda a kukoricalabirintusban üldözi, de a nasi eltűnik.',6,
  ['MMMPPP','MMMPPP','SSSBBB','SSSBBB','WWWTTT','WWWTTT'],
  {'M':dict(it='CornMaze',itIn='nel labirinto di granturco',hu='kukoricalabirintus',huIn='a kukoricalabirintusban'),
   'P':dict(it='PumpkinPatch',itIn='nel campo di zucche',hu='tökföld',huIn='a tökföldön'),
   'S':dict(it='Stables',itIn='nelle scuderie',hu='istálló',huIn='az istállóban'),
   'B':dict(it='Barn',itIn='nel fienile',hu='csűr',huIn='a csűrben'),
   'W':dict(it='Well',itIn='al pozzo',hu='kút',huIn='a kútnál'),
   'T':dict(it='Gate',itIn='al cancello',hu='kapu',huIn='a kapunál')},
  {'0,1':'haybale','1,1':'plant','0,4':'cauldron','1,4':'table','2,0':'haybale','2,2':'bench','3,3':'rug','2,5':'shelf','4,0':'plant','4,1':'clock','5,4':'bench','3,0':'table','4,4':'rocker','5,1':'rug','3,5':'haybale'},
  [('Scooby-Doo','m'),('Shaggy Rogers','m'),('Fred Jones','m'),('Daphne Blake','f'),('Groundskeeper Gus','m'),('Scooby Snacks','f')],3,8143)

M('thunder-tower','Tuono sulla torre','Vihar a torony felett',
  'Un temporale colpisce la torre della villa. Al buio, qualcuno ha nascosto gli Scooby Snacks!',
  'Vihar csap a kastély tornyára. A sötétben valaki elrejtette a Scooby Snackset!',6,
  ['TTTAAA','TTTAAA','LLLSSS','LLLSSS','BBBCCC','BBBCCC'],
  {'T':dict(it='Tower',itIn='sulla torre',hu='torony',huIn='a toronyban'),
   'A':dict(it='Attic',itIn='in soffitta',hu='padlás',huIn='a padláson'),
   'L':dict(it='Library',itIn='in biblioteca',hu='könyvtár',huIn='a könyvtárban'),
   'S':dict(it='Study',itIn='nello studio',hu='dolgozószoba',huIn='a dolgozószobában'),
   'B':dict(it='Bedroom',itIn='in camera',hu='hálószoba',huIn='a hálószobában'),
   'C':dict(it='Corridor',itIn='nel corridoio',hu='folyosó',huIn='a folyosón')},
  {'0,1':'clock','1,1':'rug','0,4':'bed','1,4':'shelf','2,0':'shelf','2,2':'armchair','3,3':'desk','2,5':'table','4,0':'bed','4,1':'rug','5,4':'armor','3,0':'shelf','4,4':'chair','5,1':'plant'},
  [('Velma Dinkley','f'),('Daphne Blake','f'),('Widow Ravenna','f'),('Fred Jones','m'),('Madame Zora','f'),('Scooby Snacks','f')],3,8150)

M('graveyard-gig','Il concerto al cimitero','Koncert a temetőben',
  'Musica misteriosa risuona dal vecchio cimitero. Durante il concerto, la scatola è sparita!',
  'Rejtélyes zene szól a régi temetőből. A koncert alatt a doboz eltűnt!',6,
  ['GGGMMM','GGGMMM','CCCDDD','CCCDDD','BBBTTT','BBBTTT'],
  {'G':dict(it='Graveyard',itIn='nel cimitero',hu='temető',huIn='a temetőben'),
   'M':dict(it='MusicRoom',itIn='nella sala musica',hu='zeneszoba',huIn='a zeneszobában'),
   'C':dict(it='Conservatory',itIn='nella serra',hu='üvegház',huIn='az üvegházban'),
   'D':dict(it='Garden',itIn='in giardino',hu='kert',huIn='a kertben'),
   'B':dict(it='Bonfire',itIn='intorno al falò',hu='máglya',huIn='a máglyánál'),
   'T':dict(it='Gate',itIn='al cancello',hu='kapu',huIn='a kapunál')},
  {'0,1':'bench','1,1':'plant','0,4':'piano','1,4':'chair','2,0':'plant','2,2':'rug','3,3':'table','2,5':'cauldron','4,0':'bench','4,1':'rug','5,4':'armor','3,0':'plant','4,4':'clock','5,1':'haybale'},
  [('Shaggy Rogers','m'),('Scooby-Doo','m'),('Madame Zora','f'),('Groundskeeper Gus','m'),('Daphne Blake','f'),('Scooby Snacks','f')],3,8157)

# ===== level 4 — 7x7 =====

M('headless-scarecrow','Lo spaventapasseri senza testa','A fej nélküli madárijesztő',
  'Lo spaventapasseri della fiera ha perso la testa... e gli snack hanno perso la scatola!',
  'A vásár madárijesztője elvesztette a fejét... a nasi pedig a dobozát!',7,
  ['PPPMMMM','PPPMMMM','PPPBBBB','SSSBBBB','SSSWWWW','GGGWWWW','GGGTTTT'],
  {'P':dict(it='PumpkinPatch',itIn='nel campo di zucche',hu='tökföld',huIn='a tökföldön'),
   'M':dict(it='CornMaze',itIn='nel labirinto di granturco',hu='kukoricalabirintus',huIn='a kukoricalabirintusban'),
   'B':dict(it='Barn',itIn='nel fienile',hu='csűr',huIn='a csűrben'),
   'S':dict(it='Stables',itIn='nelle scuderie',hu='istálló',huIn='az istállóban'),
   'W':dict(it='Well',itIn='al pozzo',hu='kút',huIn='a kútnál'),
   'G':dict(it='Graveyard',itIn='nel cimitero',hu='temető',huIn='a temetőben'),
   'T':dict(it='Gate',itIn='al cancello',hu='kapu',huIn='a kapunál')},
  {'0,1':'haybale','1,1':'plant','0,4':'cauldron','1,5':'table','2,0':'plant','2,3':'bench','3,0':'haybale','3,4':'rug','2,6':'shelf','4,1':'bench','4,4':'clock','5,0':'plant','5,5':'rug','6,1':'armor','6,4':'rocker','3,6':'table'},
  [('Scooby-Doo','m'),('Shaggy Rogers','m'),('Fred Jones','m'),('Daphne Blake','f'),('Velma Dinkley','f'),('Groundskeeper Gus','m'),('Scooby Snacks','f')],4,8164)

M('ballroom-howl',"L'ululato nella sala da ballo",'Üvöltés a bálteremben',
  'Un ululato gelido riempie la sala da ballo durante il ballo in maschera. Gli snack: spariti!',
  'Jéghideg üvöltés tölti be a báltermet a jelmezbál alatt. A nasi: eltűnt!',7,
  ['BBBDDDD','BBBDDDD','BBKKKKK','MMMKKKK','MMMFFFF','CCCFFFF','CCCLLLL'],
  {'B':dict(it='Ballroom',itIn='nella sala da ballo',hu='bálterem',huIn='a bálteremben'),
   'D':dict(it='DiningRoom',itIn='nella sala da pranzo',hu='ebédlő',huIn='az ebédlőben'),
   'K':dict(it='Kitchen',itIn='in cucina',hu='konyha',huIn='a konyhában'),
   'M':dict(it='MusicRoom',itIn='nella sala musica',hu='zeneszoba',huIn='a zeneszobában'),
   'F':dict(it='Foyer',itIn="nell'atrio",hu='előszoba',huIn='az előszobában'),
   'C':dict(it='Corridor',itIn='nel corridoio',hu='folyosó',huIn='a folyosón'),
   'L':dict(it='Library',itIn='in biblioteca',hu='könyvtár',huIn='a könyvtárban')},
  {'0,1':'clock','1,1':'rug','0,4':'table','1,5':'plant','2,0':'piano','2,4':'table','3,1':'armchair','3,5':'chair','4,0':'sofa','4,4':'armor','5,1':'rug','5,5':'shelf','6,0':'chair','6,3':'shelf','6,5':'desk','2,6':'cauldron'},
  [('Fred Jones','m'),('Daphne Blake','f'),('Velma Dinkley','f'),('Madame Zora','f'),('Widow Ravenna','f'),('Groundskeeper Gus','m'),('Scooby Snacks','f')],4,8171)

M('last-scooby-snack',"L'ultimo Scooby Snack",'Az utolsó Scooby Snack',
  'È rimasto un solo Scooby Snack... ed è sparito anche quello! Il gran finale di Halloween.',
  'Csak egyetlen Scooby Snack maradt... és az is eltűnt! A halloweeni nagy finálé.',7,
  ['FFFLLLL','FFFLLLL','CCCLLLL','CCCTTTT','GGCTTTT','GGGMMMM','GGGOOOO'],
  {'F':dict(it='Foyer',itIn="nell'atrio",hu='előszoba',huIn='az előszobában'),
   'L':dict(it='Library',itIn='in biblioteca',hu='könyvtár',huIn='a könyvtárban'),
   'C':dict(it='Cellar',itIn='in cantina',hu='pince',huIn='a pincében'),
   'T':dict(it='Tower',itIn='sulla torre',hu='torony',huIn='a toronyban'),
   'G':dict(it='Graveyard',itIn='nel cimitero',hu='temető',huIn='a temetőben'),
   'M':dict(it='CornMaze',itIn='nel labirinto di granturco',hu='kukoricalabirintus',huIn='a kukoricalabirintusban'),
   'O':dict(it='FortuneTent',itIn='nella tenda della veggente',hu='jósdasátor',huIn='a jósdasátorban')},
  {'0,1':'armor','1,1':'rug','0,4':'shelf','1,5':'shelf','2,0':'cauldron','2,3':'armchair','3,1':'coffin','3,4':'clock','4,0':'plant','4,4':'desk','5,1':'table','5,5':'haybale','6,0':'bench','6,3':'rug','6,5':'table','2,6':'piano'},
  [('Scooby-Doo','m'),('Shaggy Rogers','m'),('Fred Jones','m'),('Daphne Blake','f'),('Velma Dinkley','f'),('Widow Ravenna','f'),('Scooby Snacks','f')],4,8178)

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
