import math, random, sys
W,H=2400,1400; SX,SY=900,700
def pol(r,a): a=math.radians(a); return SX+r*math.cos(a), SY+r*math.sin(a)
ORB={"mercurio":(150,-10,10,"#b9b2a8"),"venus":(215,230,15,"#e8c98c"),"tierra":(290,140,17,"#5b8cff"),
     "marte":(380,-60,14,"#e0673f"),"jupiter":(600,20,34,"#d9b48c"),"saturno":(690,-115,28,"#e9d39a"),
     "urano":(780,215,22,"#9fe3ea"),"neptuno":(870,-25,22,"#5f7dff")}
NOM={"es":{"mercurio":"Mercurio","venus":"Venus","tierra":"Tierra","marte":"Marte","jupiter":"Júpiter","saturno":"Saturno","urano":"Urano","neptuno":"Neptuno","sol":"Sol","cinturon":"Cinturón de asteroides","kuiper":"Cinturón de Kuiper","alde":"Aldebarán (Tauro)","ceres":"Ceres","eros":"Eros","nota":"Esquema del Sistema Solar dibujado para el juego. Tamaños y distancias NO están a escala."},
     "en":{"mercurio":"Mercury","venus":"Venus","tierra":"Earth","marte":"Mars","jupiter":"Jupiter","saturno":"Saturn","urano":"Uranus","neptuno":"Neptune","sol":"Sun","cinturon":"Asteroid belt","kuiper":"Kuiper belt","alde":"Aldebaran (Taurus)","ceres":"Ceres","eros":"Eros","nota":"Sketch of the Solar System drawn for the game. Sizes and distances are NOT to scale."}}
# Lado de cada etiqueta de planeta (dx, anchor)
LADO={"mercurio":"der","venus":"izq","tierra":"der","marte":"der","jupiter":"der","saturno":"der","urano":"der","neptuno":"der"}
def sonda(x,y,rot=0,s=1.0):
    return f'''<g transform="translate({x:.0f},{y:.0f}) rotate({rot}) scale({s})">
<line x1="-26" y1="0" x2="26" y2="0" stroke="#e8e6ff" stroke-width="5"/>
<rect x="-34" y="-9" width="14" height="18" fill="#6f8cff" stroke="#e8e6ff" stroke-width="2"/>
<rect x="20" y="-9" width="14" height="18" fill="#6f8cff" stroke="#e8e6ff" stroke-width="2"/>
<rect x="-9" y="-9" width="18" height="18" rx="2" fill="#f2c14e" stroke="#2a2550" stroke-width="2"/>
<path d="M-12 -12 Q0 -26 12 -12" fill="none" stroke="#e8e6ff" stroke-width="3"/></g>'''
def antena(x,y,s=1.0):  # sonda con antena parabólica grande (tipo Pioneer)
    return f'''<g transform="translate({x:.0f},{y:.0f}) scale({s})">
<path d="M-30 -6 Q0 -30 30 -6 Z" fill="#e8e6ff" stroke="#2a2550" stroke-width="2"/>
<rect x="-8" y="-6" width="16" height="12" fill="#f2c14e" stroke="#2a2550" stroke-width="2"/>
<line x1="-6" y1="6" x2="-22" y2="22" stroke="#e8e6ff" stroke-width="3"/><line x1="6" y1="6" x2="22" y2="22" stroke="#e8e6ff" stroke-width="3"/>
<rect x="-28" y="20" width="10" height="8" fill="#b9b2a8"/><rect x="18" y="20" width="10" height="8" fill="#b9b2a8"/></g>'''
def telescopio(x,y,s=1.0):
    return f'''<g transform="translate({x:.0f},{y:.0f}) rotate(-25) scale({s})">
<rect x="-12" y="-24" width="24" height="44" rx="4" fill="#e8e6ff" stroke="#2a2550" stroke-width="2"/>
<ellipse cx="0" cy="-24" rx="12" ry="5" fill="#2a2550"/>
<rect x="-34" y="-6" width="20" height="26" fill="#6f8cff" stroke="#e8e6ff" stroke-width="2"/></g>'''
def svg(lang, conObjetivos=True):
    T=NOM[lang]; rnd=random.Random(7); o=[]
    o.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="DejaVu Sans, Arial, sans-serif">')
    o.append(f'<rect width="{W}" height="{H}" fill="#0d0c26"/>')
    for _ in range(420):
        x,y=rnd.uniform(0,W),rnd.uniform(0,H); o.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{rnd.choice([1,1,1.5,2])}" fill="#ffffff" opacity="{rnd.uniform(.2,.6):.2f}"/>')
    # cinturones
    for _ in range(1400):
        r=rnd.gauss(485,22); a=rnd.uniform(0,360); x,y=pol(r,a); o.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{rnd.choice([1.5,2,2.5])}" fill="#cbbf9e" opacity="{rnd.uniform(.35,.8):.2f}"/>')
    for _ in range(1300):
        r=rnd.gauss(1010,30); a=rnd.uniform(-60,60); x,y=pol(r,a)
        if 0<x<W and 0<y<H: o.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{rnd.choice([2,2.5])}" fill="#9fb4ff" opacity="{rnd.uniform(.4,.8):.2f}"/>')
    for k,(r,a,rad,col) in ORB.items():
        o.append(f'<circle cx="{SX}" cy="{SY}" r="{r}" fill="none" stroke="#5b5aa8" stroke-width="3" opacity=".75"/>')
    # Sol
    o.append(f'<defs><radialGradient id="g"><stop offset="0" stop-color="#fff3b0"/><stop offset=".6" stop-color="#ffb347"/><stop offset="1" stop-color="#ff8a3d"/></radialGradient></defs>')
    o.append(f'<circle cx="{SX}" cy="{SY}" r="95" fill="#ffb347" opacity=".18"/><circle cx="{SX}" cy="{SY}" r="70" fill="url(#g)"/>')
    o.append(f'<text x="{SX}" y="{SY+125}" text-anchor="middle" font-size="46" font-weight="700" fill="#ffd27a" stroke="#0d0c26" stroke-width="8" paint-order="stroke">{T["sol"]}</text>')
    for k,(r,a,rad,col) in ORB.items():
        x,y=pol(r,a)
        if k=="saturno": o.append(f'<ellipse cx="{x:.0f}" cy="{y:.0f}" rx="{rad*1.9:.0f}" ry="{rad*.55:.0f}" fill="none" stroke="#e9d39a" stroke-width="5"/>')
        o.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{rad}" fill="{col}"/>')
        izq=LADO[k]=="izq"; tx=x-(rad+16) if izq else x+(rad*(1.9 if k=="saturno" else 1)+16)
        o.append(f'<text x="{tx:.0f}" y="{y+17:.0f}" text-anchor="{"end" if izq else "start"}" font-size="50" font-weight="700" fill="#f3f1ff" stroke="#0d0c26" stroke-width="9" paint-order="stroke">{T[k]}</text>')
    bx,by=pol(485,-28); o.append(f'<text x="{bx+30:.0f}" y="{by:.0f}" font-size="38" font-style="italic" fill="#e4dbbf" stroke="#0d0c26" stroke-width="8" paint-order="stroke">{T["cinturon"]}</text>')
    o.append(f'<text x="1790" y="1290" font-size="38" font-style="italic" fill="#c3cfff" stroke="#0d0c26" stroke-width="8" paint-order="stroke">{T["kuiper"]}</text>')
    # Ceres y Eros
    cx,cy=pol(485,120); o.append(f'<circle cx="{cx:.0f}" cy="{cy:.0f}" r="13" fill="#bdb6a6"/><text x="{cx-24:.0f}" y="{cy+14:.0f}" text-anchor="end" font-size="36" fill="#e4dbbf" stroke="#0d0c26" stroke-width="7" paint-order="stroke">{T["ceres"]}</text>')
    ex,ey=pol(340,50); o.append(f'<ellipse cx="{ex:.0f}" cy="{ey:.0f}" rx="16" ry="8" transform="rotate(-30 {ex:.0f} {ey:.0f})" fill="#b39a7a"/><text x="{ex:.0f}" y="{ey+50:.0f}" text-anchor="middle" font-size="36" fill="#e4dbbf" stroke="#0d0c26" stroke-width="7" paint-order="stroke">{T["eros"]}</text>')
    # Aldebarán y flecha de rumbo
    o.append(f'<circle cx="2330" cy="470" r="14" fill="#ff8f5a"/><circle cx="2330" cy="470" r="30" fill="#ff8f5a" opacity=".2"/>')
    o.append(f'<text x="2380" y="410" text-anchor="end" font-size="38" fill="#ffb08a" stroke="#0d0c26" stroke-width="8" paint-order="stroke">{T["alde"]}</text>')
    if conObjetivos:
        o.append('<line x1="2185" y1="510" x2="2290" y2="480" stroke="#ff8f5a" stroke-width="3" stroke-dasharray="10 10" opacity=".7"/>')
        # objetivos reales
        kx,ky=pol(290,160); o.append(telescopio(kx,ky,1.0))
        o.append(sonda(ex+4,ey-22,-20,0.75))       # NEAR sobre Eros
        o.append(sonda(cx+2,cy-40,10,0.8))         # Dawn junto a Ceres
        o.append(antena(2150,520,1.0))             # Pioneer 10
        # señuelos (sondas que no son de ningún caso)
        for (x,y,r) in [(1980,200,15),(2060,1150,-10),(1340,1270,30),(480,458,0),(1690,640,-20)]:
            o.append(sonda(x,y,r,0.8))
    o.append(f'<text x="40" y="{H-36}" font-size="34" fill="#b7b4dc">{T["nota"]}</text>')
    o.append('</svg>'); return "\n".join(o)
POS={"kepler":pol(290,160),"near":pol(340,50),"dawn":pol(485,120),"pioneer10":(2150,520)}
if __name__=="__main__":
    for l in ("es","en"): open(f"/home/claude/gen/sistema-{l}.svg","w").write(svg(l))
    for k,(x,y) in POS.items(): print(k, round(x), round(y))
