import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  private htmlLessons = [
    {
      title: 'A <title> elem használata',
      content: 'A <title> elem a weboldal címét határozza meg, ami a böngésző lapján jelenik meg. Ez nem azonos az oldalon megjelenő főcímmel (<h1>).',
      examples: `<head>\n  <title>Az én weboldalam</title>\n</head>`,
      tips: 'A title elem tartalma fontos a keresőoptimalizálás (SEO) szempontjából is.',
      relatedQuestions: ['Mire használjuk a <title> elemet?']
    },
    {
      title: 'Bekezdések létrehozása',
      content: 'A <p> elem (paragraph) szöveges bekezdések létrehozására szolgál. Automatikusan térközt hagy a bekezdések között.',
      examples: `<p>Ez az első bekezdés.</p>\n<p>Ez a második bekezdés.</p>`,
      tips: 'Használj <br> elemet, ha csak sortörést szeretnél beilleszteni egy bekezdésen belül.',
      relatedQuestions: ['Melyik HTML elem használható egy bekezdés létrehozására?']
    },
    {
      title: 'Képek beszúrása',
      content: 'A <img> elem segítségével szúrhatunk be képeket. Kötelező attribútum a src (kép forrása) és az alt (alternatív szöveg).',
      examples: `<img src="logo.png" alt="Weboldal logója">`,
      tips: 'Az alt szöveg fontos a látássérültek számára és akkor is megjelenik, ha a kép nem töltődik be.',
      relatedQuestions: ['Milyen elem használható egy kép beillesztésére HTML-ben?', 'Melyik attribútum határozza meg egy kép alternatív szövegét?']
    },
    {
      title: 'Linkek létrehozása',
      content: 'Az <a> elem (anchor) hivatkozások létrehozására szolgál. A href attribútum határozza meg a cél URL-t.',
      examples: `<a href="https://www.példa.hu">Látogass el a példa oldalra</a>`,
      tips: 'Használd a target="_blank" attribútumot, ha új lapon szeretnéd megnyitni a linket.',
      relatedQuestions: ['Melyik attribútum segítségével adhatunk meg egy hivatkozást egy <a> elemben?']
    },
    {
      title: 'Táblázatok készítése',
      content: 'A <table> elem táblázatok létrehozására szolgál. Sorok (<tr>), oszlopok (<td>) és fejlécek (<th>) segítségével építheted fel.',
      examples: `<table>\n  <tr>\n    <th>Név</th>\n    <th>Kor</th>\n  </tr>\n  <tr>\n    <td>Példa</td>\n    <td>25</td>\n  </tr>\n</table>`,
      tips: 'Használd a <thead>, <tbody> és <tfoot> elemeket a táblázat logikai szerkezetének kialakításához.',
      relatedQuestions: ['Melyik elem használható egy táblázat létrehozására HTML-ben?']
    },
    {
      title: 'Listák használata',
      content: 'A <ul> elem (unordered list) nem számozott listák létrehozására szolgál. A <li> elemek tartalmazzák a lista elemeit.',
      examples: `<ul>\n  <li>Első elem</li>\n  <li>Második elem</li>\n</ul>`,
      tips: 'A <ol> elemet használj számozott listákhoz, a <dl> elemet definíciós listákhoz.',
      relatedQuestions: ['Melyik elem felelős egy lista létrehozásáért?']
    },
    {
      title: 'Űrlapok készítése',
      content: 'A <form> elem űrlapok létrehozására szolgál. Tartalmazhat input mezőket, legördülő listákat, jelölőnégyzeteket és gombokat.',
      examples: `<form action="/feldolgozas" method="post">\n  <input type="text" name="nev">\n  <button type="submit">Küldés</button>\n</form>`,
      tips: 'Mindig adj meg action és method attribútumokat a form elemhez.',
      relatedQuestions: ['Melyik elem használható űrlap létrehozására?']
    },
    {
      title: 'Fejléc elemek',
      content: 'A <h1> - <h6> elemek címsorok létrehozására szolgálnak, ahol a <h1> a legfontosabb (legnagyobb) cím.',
      examples: `<h1>Főcím</h1>\n<h2>Alcím</h2>\n<h3>Harmadik szintű cím</h3>`,
      tips: 'Használj hierarchikusan a címeket, és mindig csak egy <h1> elem legyen oldalanként.',
      relatedQuestions: ['Melyik HTML elem jelöli a főcímet?']
    },
    {
      title: 'Lábléc tartalom',
      content: 'A <footer> elem a weboldal láblécét jelöli, ami általában copyright információkat, linkeket vagy kapcsolatfelvételi adatokat tartalmaz.',
      examples: `<footer>\n  <p>© 2023 Az én weboldalam</p>\n</footer>`,
      tips: 'A footer nem csak az oldal alján, hanem szakaszok alján is használható.',
      relatedQuestions: ['Melyik elem felelős a lábjegyzet tartalmáért egy weboldalon?']
    },
    {
      title: 'HTML dokumentum szerkezete',
      content: 'Egy alap HTML dokumentum a következő elemekből épül fel: <!DOCTYPE html>, <html>, <head> és <body>.',
      examples: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Oldal címe</title>\n</head>\n<body>\n  <h1>Üdvözöllek</h1>\n</body>\n</html>`,
      tips: 'A <head> részbe kerülnek a metaadatok, a <body> részbe a látható tartalom.',
      relatedQuestions: []
    },
    {
      title: 'Kép attribútumok',
      content: 'Az <img> elem fontos attribútumai: src (kép forrása), alt (alternatív szöveg), width és height (méret beállítás).',
      examples: `<img src="kep.jpg" alt="Leírás" width="200" height="100">`,
      tips: 'Mindig adj meg alt szöveget a képhez akceszibilitás és SEO miatt.',
      relatedQuestions: ['Melyik attribútum határozza meg egy kép alternatív szövegét?']
    },
    {
      title: 'Link célok',
      content: 'Az <a> elem target attribútumával szabályozhatod, hogy a link hol nyíljon meg (_self: ugyanaz a lap, _blank: új lap).',
      examples: `<a href="https://példa.hu" target="_blank">Megnyitás új lapon</a>`,
      tips: 'Az új lapon megnyitásnál fontos a rel="noopener" attribútum biztonsági okokból.',
      relatedQuestions: ['Melyik attribútum segítségével adhatunk meg egy hivatkozást egy <a> elemben?']
    },
    {
      title: 'Táblázat szerkezet',
      content: 'A táblázat alapvető elemei: <table> (táblázat), <tr> (sor), <td> (adatcella), <th> (fejléc cella).',
      examples: `<table>\n  <tr>\n    <th>Termék</th>\n    <th>Ár</th>\n  </tr>\n  <tr>\n    <td>Alma</td>\n    <td>200 Ft</td>\n  </tr>\n</table>`,
      tips: 'Használd a scope attribútumot a <th> elemekhez a táblázat akceszibilitásának javításához.',
      relatedQuestions: ['Melyik elem használható egy táblázat létrehozására HTML-ben?']
    },
    {
      title: 'Rendezett listák',
      content: 'A <ol> elem (ordered list) számozott listákat hoz létre. A <li> elemek tartalmazzák a lista elemeit.',
      examples: `<ol>\n  <li>Első lépés</li>\n  <li>Második lépés</li>\n</ol>`,
      tips: 'A type attribútummal változtathatod a számozás stílusát (1, A, a, I, i).',
      relatedQuestions: ['Melyik elem felelős egy lista létrehozásáért?']
    },
    {
      title: 'Űrlap elemek',
      content: 'Az űrlapokban használatos elemek: <input> (szövegmező, jelölőnégyzet stb.), <select> (legördülő lista), <textarea> (többsoros szöveg).',
      examples: `<form>\n  <input type="text" placeholder="Név">\n  <select>\n    <option>Válassz</option>\n  </select>\n</form>`,
      tips: 'Mindig adj name attribútumot az űrlap elemeknek a szerveroldali feldolgozáshoz.',
      relatedQuestions: ['Melyik elem használható űrlap létrehozására?']
    },
    {
      title: 'Címsor hierarchia',
      content: 'A <h1> a legfontosabb cím, a <h6> a legkevésbé fontos. Fontos a hierarchikus használat a tartalom szerkezetének kialakításához.',
      examples: `<h1>Főcím</h1>\n<h2>Alcím</h2>\n<h3>Al-alcím</h3>`,
      tips: 'Ne használj cím elemeket a szöveg méretének változtatásához, erre a CSS szolgál.',
      relatedQuestions: ['Melyik HTML elem jelöli a főcímet?']
    },
    {
      title: 'Lábléc tartalma',
      content: 'A <footer> elem nemcsak az oldal alján, hanem szakaszok végén is használható, például cikkek vagy blogbejegyzések alatt.',
      examples: `<article>\n  <h2>Cikk címe</h2>\n  <p>Tartalom...</p>\n  <footer>Szerző: Példa</footer>\n</article>`,
      tips: 'A footer általában tartalmazhat szerzői jogi információkat, kapcsolatot vagy linkeket.',
      relatedQuestions: ['Melyik elem felelős a lábjegyzet tartalmáért egy weboldalon?']
    },
    {
      title: 'Meta információk',
      content: 'A <head> részbe helyezett <meta> elemek információkat szolgáltatnak a böngészőnek és keresőmotoroknak (pl. karakterkódolás, nézetport).',
      examples: `<meta charset="UTF-8">\n<meta name="description" content="Weboldal leírása">`,
      tips: 'A viewport meta tag elengedhetetlen a reszponzív webdesignhoz.',
      relatedQuestions: []
    },
    {
      title: 'HTML kommentek',
      content: 'A <!-- --> szintaxissal lehet kommenteket hozzáadni a HTML kódhoz, amit a böngésző nem jelenít meg.',
      examples: `<!-- Ez egy komment, csak a kódban látszik -->\n<p>Látható tartalom</p>`,
      tips: 'Használj kommenteket a kód szakaszainak megjelölésére, de ne helyettesítsd velük a verziókövetést.',
      relatedQuestions: []
    },
    {
      title: 'Gombok létrehozása',
      content: 'A <button> elem interaktív gombok létrehozására szolgál. Típusát a type attribútummal lehet beállítani (submit, reset, button).',
      examples: `<button type="button">Kattints ide</button>\n<button type="submit">Küldés</button>`,
      tips: 'Használj CSS-t a gombok stílusozásához, hogy vonzóbbak legyenek.',
      relatedQuestions: ['Melyik HTML elem használható egy gomb létrehozására?']
    },
    {
      title: 'Videó beágyazása',
      content: 'A <video> elem segítségével videókat lehet beágyazni a weboldalba. Támogatott formátumok: MP4, WebM, Ogg.',
      examples: `<video width="320" height="240" controls>\n  <source src="film.mp4" type="video/mp4">\n  A böngésződ nem támogatja a videó elemet.\n</video>`,
      tips: 'Mindig adj meg több forrást (source) a különböző böngészők támogatása érdekében.',
      relatedQuestions: ['Melyik elem használható egy videó beágyazására HTML-ben?']
    },
    {
      title: 'Hangfájlok beágyazása',
      content: 'Az <audio> elem hangfájlok lejátszására szolgál. Támogatott formátumok: MP3, WAV, Ogg.',
      examples: `<audio controls>\n  <source src="zene.mp3" type="audio/mpeg">\n  A böngésződ nem támogatja az audio elemet.\n</audio>`,
      tips: 'A controls attribútum nélkül a hang lejátszó felület nem jelenik meg.',
      relatedQuestions: ['Melyik elem használható egy hangfájl beágyazására?']
    },
    {
      title: 'Elemek egyedi azonosítása',
      content: 'Az id attribútum egyedi azonosítót ad egy HTML elemnek. Oldalonként egy azonosító csak egyszer szerepelhet.',
      examples: `<div id="fejlec">Fejléc tartalom</div>\n<p id="fontos-bekezdes">Ez egy fontos bekezdés</p>`,
      tips: 'Az id-k legyenek beszédesek és következetesek, de ne tartalmazzanak szóközt vagy speciális karaktert.',
      relatedQuestions: ['Melyik HTML attribútum ad egyedi azonosítót egy elemnek?']
    },
    {
      title: 'Dokumentum fejléc',
      content: 'A <header> elem a dokumentum vagy egy szakasz fejlécét jelöli. Általában tartalmaz logót, navigációt, keresőmezőt.',
      examples: `<header>\n  <h1>Weboldal címe</h1>\n  <nav>Navigációs linkek</nav>\n</header>`,
      tips: 'Egy oldalon több header elem is lehet, ha különböző szakaszoknak van fejléce.',
      relatedQuestions: ['Melyik HTML elem jelöli a dokumentum fejlécét?']
    },
    {
      title: 'Vízszintes vonal',
      content: 'A <hr> (horizontal rule) elem vízszintes vonalat hoz létre, ami témaváltást vagy szakadást jelez a tartalomban.',
      examples: `<p>Első szakasz</p>\n<hr>\n<p>Második szakasz</p>`,
      tips: 'Modern webdesignban inkább CSS border-t használnak vizuális elválasztóként.',
      relatedQuestions: ['Melyik elem használható egy vízszintes vonal beszúrására HTML-ben?']
    },
    {
      title: 'Idézetek megjelenítése',
      content: 'A <blockquote> elem hosszú, bekezdés szintű idézetek megjelenítésére szolgál. A cite attribútummal lehet megadni az idézet forrását.',
      examples: `<blockquote cite="https://példa.hu">\n  <p>Ez egy hosszú idézet valakitől.</p>\n</blockquote>`,
      tips: 'Rövid idézetekhez használd a <q> elemet, ami automatikusan idézőjeleket helyez el.',
      relatedQuestions: ['Melyik HTML elem használható egy idézet megjelenítésére?']
    },
    {
      title: 'Soron belüli csoportosítás',
      content: 'A <span> elem soron belüli szövegrészek csoportosítására és stílusozására szolgál. Maga önmagában nem jelent vizuális változást.',
      examples: `<p>Ez egy <span class="kiemel">kiemelt</span> szövegrész.</p>`,
      tips: 'A <div> elemtől eltérően a <span> blokk szintű elemeket nem hoz létre.',
      relatedQuestions: ['Melyik HTML elem használható egy soron belüli szövegkiemelésre?']
    },
    {
      title: 'Külső CSS fájlok linkelése',
      content: 'A <link> elem segítségével lehet külső CSS fájlokat hozzárendelni a HTML dokumentumhoz. A href attribútum tartalmazza a fájl elérési útját.',
      examples: `<head>\n  <link rel="stylesheet" href="stilus.css">\n</head>`,
      tips: 'Több CSS fájlt is linkelhetsz, és a sorrend számít - a későbbiek felülírhatják a korábbi szabályokat.',
      relatedQuestions: ['Melyik attribútum segítségével adhatunk meg egy külső CSS fájlt?']
    },
    {
      title: 'Legördülő listák',
      content: 'A <select> elem legördülő listát hoz létre, ahol a felhasználó választhat a <option> elemek között. A name attribútum kötelező az űrlapküldéshez.',
      examples: `<select name="varos">\n  <option value="bp">Budapest</option>\n  <option value="db">Debrecen</option>\n</select>`,
      tips: 'A multiple attribútummal több választás is engedélyezhető, és a size attribútummal állítható a látható opciók száma.',
      relatedQuestions: ['Melyik HTML elem használható egy legördülő lista létrehozására?']
    },
    {
      title: 'Kötelező űrlapmezők',
      content: 'A required attribútummal jelölhetjük meg, hogy egy űrlapmező kitöltése kötelező. A böngésző nem engedi az űrlap elküldését, ha a kötelező mezők nincsenek kitöltve.',
      examples: `<input type="text" name="nev" required>\n<select name="varos" required>...</select>`,
      tips: 'Mindig adjunk meg értelmes validációs üzeneteket a required mezőkhöz a felhasználó számára.',
      relatedQuestions: ['Melyik HTML attribútum határozza meg, hogy egy űrlapmező kötelező-e?']
    },
    {
      title: 'Navigációs menü',
      content: 'A <nav> elem a fő navigációs linkek csoportosítására szolgál. Általában a <header> elemen belül vagy az oldal oldalán helyezkedik el.',
      examples: `<nav>\n  <ul>\n    <li><a href="/">Főoldal</a></li>\n    <li><a href="/rolunk">Rólunk</a></li>\n  </ul>\n</nav>`,
      tips: 'Egy oldalon több <nav> elem is lehet, ha különböző navigációs blokkok vannak.',
      relatedQuestions: ['Melyik HTML elem szolgál egy navigációs menü létrehozására?']
    },
    {
      title: 'Alapértelmezett értékek',
      content: 'A value attribútum segítségével állítható be az űrlapmezők alapértelmezett értéke. Ez a felhasználó által módosítható kezdőérték.',
      examples: `<input type="text" name="nev" value="Gipsz Jakab">\n<textarea name="uzenet" value="Alapértelmezett üzenet"></textarea>`,
      tips: 'A checkbox és radio button elemeknél a value attribútum határozza meg az elküldött értéket.',
      relatedQuestions: ['Melyik HTML attribútum felelős az űrlapmező alapértelmezett értékének beállításáért?']
    },
    {
      title: 'Letiltott űrlapmezők',
      content: 'A disabled attribútummal letilthatunk egy űrlapmezőt, ami szürkén jelenik meg, és nem szerkeszthető. Az ilyen mezők értéke nem kerül elküldésre az űrlappal.',
      examples: `<input type="text" name="azonosito" disabled value="Nem módosítható">\n<button type="submit" disabled>Küldés</button>`,
      tips: 'A readonly attribútum hasonló, de az csak a szerkesztést tiltja, az érték elküldése mégis megtörténik.',
      relatedQuestions: ['Melyik HTML attribútummal lehet egy űrlapmezőt letiltani?']
    },
    {
      title: 'Cikkek és blogbejegyzések',
      content: 'Az <article> elem önálló, újrafelhasználható tartalmi egységet jelöl, mint egy cikket, blogbejegyzést vagy hírt. Általában tartalmaz fejlécet és láblécet is.',
      examples: `<article>\n  <header>\n    <h2>Cikk címe</h2>\n    <p>Szerző: Példa</p>\n  </header>\n  <p>Tartalom...</p>\n</article>`,
      tips: 'Az <article> elemeket érdemes címkézni <section> elemekkel a tartalom jobb strukturálása érdekében.',
      relatedQuestions: ['Melyik HTML elem jelöli egy cikk vagy blog bejegyzés tartalmát?']
    },
    {
      title: 'Oldalsávak kialakítása',
      content: 'Az <aside> elem a fő tartalommal érintkező, de attól elkülönülő tartalmat jelöl, mint oldalsáv, hirdetés vagy kapcsolódó linkek.',
      examples: `<main>\n  <article>Fő tartalom</article>\n  <aside>\n    <h3>Kapcsolódó cikkek</h3>\n    <ul>...</ul>\n  </aside>\n</main>`,
      tips: 'Az <aside> nem feltétlenül kell oldalsáv legyen - bárhol lehet a dokumentumban, ahol a tartalom kapcsolódik, de nem része a fő folyamatnak.',
      relatedQuestions: ['Melyik elem használható egy oldalsáv jelölésére?']
    },
    {
      title: 'Placeholder szövegek',
      content: 'A placeholder attribútum segítségével adhatunk meg tippeket vagy példákat az űrlapmezőkben, ami a felhasználói bevitel kezdetekor eltűnik.',
      examples: `<input type="text" name="keres" placeholder="Keresés...">\n<input type="email" placeholder="email@pelda.hu">`,
      tips: 'A placeholder nem helyettesíti a címkéket (<label>) - mindig használj címkéket az akceszibilitás érdekében.',
      relatedQuestions: ['Melyik HTML attribútum segít egy űrlapmező előzetes szövegének megjelenítésében?']
    },
    {
      title: 'Adatlisták használata',
      content: 'A <datalist> elem előre definiált opciókat biztosít a felhasználónak egy beviteli mezőhöz, de lehetővé teszi egyéni érték megadását is.',
      examples: `<input list="varosok" name="varos">\n<datalist id="varosok">\n  <option value="Budapest">\n  <option value="Debrecen">\n</datalist>`,
      tips: 'A <datalist> nem ugyanaz, mint a <select> - itt a felhasználó saját értéket is megadhat, nem csak a listából választhat.',
      relatedQuestions: ['Melyik HTML elem használható egy adatlista létrehozására?']
    },
    {
      title: 'Meta információk',
      content: 'A <meta> elem a dokumentumról szóló információkat (metainformációkat) tartalmaz, amelyek nem jelennek meg magán a weboldalon, de a böngészők és keresőmotorok számára fontosak.',
      examples: `<meta charset="UTF-8">\n<meta name="description" content="Weboldal leírása">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
      tips: 'A viewport meta tag elengedhetetlen a reszponzív webdesignhoz, mindig szerepeljen a <head> részben.',
      relatedQuestions: ['Melyik HTML elem felelős egy metainformációk meghatározásáért?']
    },
    {
      title: 'CSS osztályok hozzárendelése',
      content: 'A class attribútummal egy vagy több CSS osztályt rendelhetünk egy HTML elemhez. Az osztálynevek szóközzel elválasztva adhatók meg.',
      examples: `<p class="fontos figyelmeztetes">Ez egy fontos üzenet!</p>\n<div class="doboz keretes">...</div>`,
      tips: 'Az osztályneveket érdemes tartalmi jelentéssel ellátni (pl. "hiba-uzenet"), nem megjelenés alapján (pl. "piros-szoveg").',
      relatedQuestions: ['Melyik HTML attribútummal adhatunk egyedi CSS osztályokat egy elemhez?']
    }
    
  ];

  private cssLessons = [
    {
      title: 'Szöveg színezése',
      content: 'A color tulajdonság határozza meg a szöveg színét. Az értékek megadhatók szóval (red), hex kóddal (#ff0000), RGB (rgb(255,0,0)) vagy HSL (hsl(0, 100%, 50%)) formátumban.',
      examples: `p {\n  color: #333;\n}\n.highlight {\n  color: rgb(220, 20, 60);\n}`,
      tips: 'Használj kontrasztos színeket a szöveg és a háttér között az olvashatóság érdekében.',
      relatedQuestions: ['Milyen CSS tulajdonságot használunk a szöveg színének megváltoztatására?']
    },
    {
      title: 'Betűméret beállítása',
      content: 'A font-size tulajdonság szabályozza a szöveg méretét. Gyakori mértékegységek: px, em, rem, %. Az alapértelmezett méret általában 16px.',
      examples: `body {\n  font-size: 16px;\n}\nh1 {\n  font-size: 2em;\n}\n.small {\n  font-size: 0.8rem;\n}`,
      tips: 'Használj relatív mértékegységeket (em, rem) a reszponzív designhoz.',
      relatedQuestions: ['Melyik CSS tulajdonság határozza meg a betűméretet?']
    },
    {
      title: 'Félkövér szöveg',
      content: 'A font-weight tulajdonság állítja be a szöveg vastagságát. Értékei lehetnek: normal, bold, bolder, lighter vagy 100-900 közötti számérték.',
      examples: `strong {\n  font-weight: bold;\n}\n.title {\n  font-weight: 700;\n}`,
      tips: 'Nem minden betűtípus támogatja az összes font-weight értéket. Ellenőrizd a betűtípus dokumentációját.',
      relatedQuestions: ['Hogyan lehet félkövérre állítani egy szöveget CSS-ben?']
    },
    {
      title: 'Háttérszín beállítása',
      content: 'A background-color tulajdonság határozza meg egy elem háttérszínét. A color tulajdonsághoz hasonlóan különböző színformátumok használhatók.',
      examples: `body {\n  background-color: #f5f5f5;\n}\n.alert {\n  background-color: rgba(255, 0, 0, 0.1);\n}`,
      tips: 'Átlátszó háttérhez használj rgba vagy hsla színértékeket.',
      relatedQuestions: ['Melyik CSS tulajdonság befolyásolja a háttérszínt?']
    },
    {
      title: 'Elem szélessége',
      content: 'A width tulajdonság határozza meg egy elem szélességét. Megadható fix (px) vagy relatív (%, vw) mértékegységekkel.',
      examples: `.container {\n  width: 80%;\n}\n.sidebar {\n  width: 300px;\n}`,
      tips: 'A max-width tulajdonsággal korlátozhatod a maximális szélességet, különösen hasznos reszponzív design esetén.',
      relatedQuestions: ['Hogyan lehet egy elem szélességét beállítani CSS-ben?']
    },
    {
      title: 'Szegélyek formázása',
      content: 'A border tulajdonság együttesen állítja be a szegély színét, stílusát és vastagságát. Külön is megadható: border-width, border-style, border-color.',
      examples: `img {\n  border: 2px solid #ccc;\n}\n.input {\n  border-bottom: 1px dotted red;\n}`,
      tips: 'A border-radius tulajdonsággal lekerekítheted a szegély sarkait.',
      relatedQuestions: ['Melyik CSS tulajdonság állítja be az elem szegélyét?']
    },
    {
      title: 'Margók kezelése',
      content: 'A margin tulajdonság határozza meg az elem külső térközét. Megadható külön az összes oldalra (margin: 10px) vagy oldalanként (margin-top, margin-right stb.).',
      examples: `.box {\n  margin: 20px;\n}\np {\n  margin: 10px 5px;\n}\n.header {\n  margin-bottom: 30px;\n}`,
      tips: 'A margin: auto érték középre igazítást tesz lehetővé vízszintes irányban.',
      relatedQuestions: ['Melyik CSS tulajdonság határozza meg az elem külső margóját?']
    },
    {
      title: 'Betűtípus választás',
      content: 'A font-family tulajdonság határozza meg a használt betűtípust. Több betűtípust is megadhatunk tartalék opcióként, vesszővel elválasztva.',
      examples: `body {\n  font-family: 'Open Sans', Arial, sans-serif;\n}\n.code {\n  font-family: 'Courier New', monospace;\n}`,
      tips: 'Mindig adj meg általános betűtípus családot (serif, sans-serif, monospace) a lista végén.',
      relatedQuestions: ['Melyik CSS tulajdonság állítja be a betűtípust?']
    },
    {
      title: 'Belső térköz beállítása',
      content: 'A padding tulajdonság határozza meg az elem belső térközét, ami a tartalom és a szegély közötti teret jelöli. A marginhoz hasonlóan megadható.',
      examples: `.card {\n  padding: 15px;\n}\n.button {\n  padding: 10px 20px;\n}`,
      tips: 'A padding növeli az elem teljes méretét, míg a margin nem.',
      relatedQuestions: ['Melyik CSS tulajdonság állítja be az elem belső térközét?']
    },
    {
      title: 'Átlátszóság szabályozása',
      content: 'Az opacity tulajdonság állítja be az elem átlátszóságát 0 (teljesen átlátszó) és 1 (teljesen átlátszatlan) között.',
      examples: `.overlay {\n  opacity: 0.5;\n}\n.image:hover {\n  opacity: 0.8;\n}`,
      tips: 'Az opacity az egész elemre vonatkozik (tartalommal együtt), míg a rgba/hsla csak a háttérszínre.',
      relatedQuestions: ['Melyik CSS tulajdonság határozza meg az elem átlátszóságát?']
    },
    {
      title: 'Doboz árnyékok',
      content: 'A box-shadow tulajdonság segítségével árnyékot adhatsz egy elemhez. Az értékek sorrendje: vízszintes eltolás, függőleges eltolás, elmosás, szóródás, szín.',
      examples: `.card {\n  box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.3);\n}\n.button:hover {\n  box-shadow: 0 0 10px 2px #ff0000;\n}`,
      tips: 'Az inset kulcsszóval belső árnyékot is létrehozhatsz.',
      relatedQuestions: ['Melyik CSS tulajdonsággal lehet árnyékot adni egy dobozhoz?']
    },
    {
      title: 'Elemek láthatósága',
      content: 'A visibility tulajdonság szabályozza egy elem láthatóságát. Lehetséges értékek: visible (látható), hidden (rejtett), collapse (táblázat elemeknél).',
      examples: `.hidden-element {\n  visibility: hidden;\n}\n.tooltip {\n  visibility: visible;\n}`,
      tips: 'A visibility: hidden eltünteti az elemet, de a helyét megtartja, míg a display: none teljesen eltávolítja a dokumentum folyásából.',
      relatedQuestions: ['Melyik CSS tulajdonság határozza meg az elem láthatóságát?']
    },
    {
      title: 'Szöveg középre igazítása',
      content: 'A text-align tulajdonság segítségével igazíthatod a szöveget vízszintesen. Lehetséges értékek: left, right, center, justify.',
      examples: `.center-text {\n  text-align: center;\n}\n.header {\n  text-align: right;\n}`,
      tips: 'A text-align nem csak szövegre, hanem bármilyen inline vagy inline-block elemre hatással van.',
      relatedQuestions: ['Melyik CSS tulajdonság segítségével lehet egy elemet középre igazítani?']
    },
    {
      title: 'Megjelenítési mód',
      content: 'A display tulajdonság határozza meg, hogy egy elem hogyan jelenik meg. Gyakori értékek: block, inline, inline-block, flex, grid, none.',
      examples: `.inline-block {\n  display: inline-block;\n}\n.hidden {\n  display: none;\n}`,
      tips: 'A flex és grid értékek modern elrendezési lehetőségeket biztosítanak.',
      relatedQuestions: ['Melyik CSS tulajdonság határozza meg az elem kijelző típusát?']
    },
    {
      title: 'Elemek elrejtése',
      content: 'A display: none érték teljesen eltávolítja az elemet a dokumentum folyásából, nem foglal helyet és nem lesz látható.',
      examples: `.mobile-menu {\n  display: none;\n}\n.hidden-form {\n  display: none;\n}`,
      tips: 'A display: none és visibility: hidden között az a különbség, hogy az utóbbi megtartja az elem helyét a dokumentumban.',
      relatedQuestions: ['Melyik CSS tulajdonság felelős az elem tartalmának elrejtéséért?']
    },
    {
      title: 'Háttérképek',
      content: 'A background-image tulajdonság segítségével beállítható egy elem háttérképe. Az url() függvényben adjuk meg a kép elérési útját.',
      examples: `.hero {\n  background-image: url('hero-image.jpg');\n}\n.pattern {\n  background-image: url('pattern.png');\n}`,
      tips: 'Használd a background-size, background-position és background-repeat tulajdonságokat a háttérkép pontos beállításához.',
      relatedQuestions: ['Melyik CSS tulajdonság határozza meg az elem háttérképét?']
    },
    {
      title: 'Szöveg átalakítása',
      content: 'A text-transform tulajdonság segítségével változtathatod a szöveg megjelenését: uppercase (nagybetű), lowercase (kisbetű), capitalize (minden szó nagybetűvel kezdődik).',
      examples: `.uppercase {\n  text-transform: uppercase;\n}\n.title {\n  text-transform: capitalize;\n}`,
      tips: 'A text-transform nem változtatja meg a tényleges szöveget, csak a megjelenítését.',
      relatedQuestions: ['Hogyan lehet egy elem tartalmát nagybetűssé alakítani CSS-ben?']
    },
    {
      title: 'Betűk közötti térköz',
      content: 'A letter-spacing tulajdonság szabályozza a betűk közötti térközt. Pozitív érték növeli, negatív érték csökkenti a térközt.',
      examples: `.wide {\n  letter-spacing: 2px;\n}\n.narrow {\n  letter-spacing: -0.5px;\n}`,
      tips: 'Az optimális olvashatóság érdekében ne használj túl nagy vagy túl kicsi letter-spacing értékeket.',
      relatedQuestions: ['Melyik CSS tulajdonság felelős a betűk közötti térköz beállításáért?']
    },
    {
      title: 'Szöveg vastagsága',
      content: 'A font-weight tulajdonság 100 és 900 közötti számértékeket is fogad, ahol 400 a normál, 700 a félkövér vastagságot jelenti.',
      examples: `.light {\n  font-weight: 300;\n}\n.bold {\n  font-weight: 700;\n}`,
      tips: 'Nem minden betűtípus támogatja az összes font-weight értéket. Ellenőrizd a betűtípus dokumentációját.',
      relatedQuestions: ['Melyik CSS érték felel meg a félkövér szövegnek?']
    },
    {
      title: 'Szöveg igazítása',
      content: 'A text-align tulajdonság nemcsak a center értéket, hanem left (balra), right (jobbra) és justify (sorkizárt) értékeket is fogad.',
      examples: `.left-align {\n  text-align: left;\n}\n.justified {\n  text-align: justify;\n}`,
      tips: 'A justify érték sorkizárt szöveget hoz létre, ami hosszabb szövegeknél lehet előnyös.',
      relatedQuestions: ['Melyik CSS tulajdonság határozza meg a szöveg igazítását?']
    },
    {
      title: 'Elemek pozicionálása',
      content: 'A position tulajdonság határozza meg, hogy egy elem hogyan pozicionálódik a dokumentumban. Lehetséges értékek: static, relative, absolute, fixed, sticky.',
      examples: `.fixed-header {\n  position: fixed;\n  top: 0;\n}\n.relative-box {\n  position: relative;\n  left: 20px;\n}`,
      tips: 'A position: fixed értéknél az elem a böngészőablakhoz képest rögzítődik, nem a dokumentumhoz.',
      relatedQuestions: ['Melyik CSS tulajdonság felelős egy elem pozíciójának beállításáért?']
    },
    {
      title: 'Fix pozíció',
      content: 'A position: fixed érték rögzíti az elemet a böngészőablakhoz képest. Az elem nem mozdul el, ha a felhasználó görget.',
      examples: `.navbar {\n  position: fixed;\n  top: 0;\n  width: 100%;\n}\n.chat-button {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n}`,
      tips: 'Fix pozíció használatakor győződj meg róla, hogy az elem nem takar ki más tartalmat.',
      relatedQuestions: ['Melyik CSS érték használható egy elem fix pozícióban tartásához?']
    },
    {
      title: 'Sorok közötti térköz',
      content: 'A line-height tulajdonság szabályozza a szöveg sorok közötti térközét. Megadható számértékkel (nincs mértékegység), px-ben, em-ben vagy %-ban.',
      examples: `body {\n  line-height: 1.5;\n}\n.article {\n  line-height: 24px;\n}`,
      tips: '1.2-1.5 közötti line-height értékek optimálisak az olvashatóság szempontjából.',
      relatedQuestions: ['Melyik CSS tulajdonság állítja be a sorok közötti térközt?']
    },
    {
      title: 'Maximális szélesség',
      content: 'A max-width tulajdonság korlátozza egy elem maximális szélességét. Hasznos, hogy a tartalom ne terjedjen ki túl széles képernyőkön.',
      examples: `.container {\n  max-width: 1200px;\n  width: 100%;\n}\n.image {\n  max-width: 100%;\n}`,
      tips: 'A max-width: 100% gyakran használt képeknél, hogy ne lógjanak ki a konténerükből.',
      relatedQuestions: ['Melyik CSS tulajdonság határozza meg az elem maximális szélességét?']
    },
    {
      title: 'Minimális magasság',
      content: 'A min-height tulajdonság garantálja, hogy egy elem elér egy bizonyos minimális magasságot, még ha a tartalma kevesebb helyet is foglal.',
      examples: `.card {\n  min-height: 200px;\n}\n.footer {\n  min-height: 100px;\n}`,
      tips: 'Hasznos lehet üres állapotú konténereknél, hogy ne zsugorodjanak össze teljesen.',
      relatedQuestions: ['Melyik CSS tulajdonság határozza meg az elem minimális magasságát?']
    },
    {
      title: 'Lebegő elemek',
      content: 'A float tulajdonság lehetővé teszi, hogy egy elem "lebegjen" a többi elem mellett. Gyakori értékek: left, right, none.',
      examples: `.image-left {\n  float: left;\n  margin-right: 15px;\n}\n.clearfix::after {\n  content: "";\n  display: table;\n  clear: both;\n}`,
      tips: 'A float-olt elemek után mindig használj clearfix technikát, hogy a következő elem ne kerüljön mellé.',
      relatedQuestions: ['Melyik CSS tulajdonság teszi lehetővé a lebegő hatás hozzáadását egy elemhez?']
    },
    {
      title: 'Lista stílusok',
      content: 'A list-style tulajdonság együttesen állítja be a lista jelölő típusát, pozícióját és képét. Külön is megadható: list-style-type, list-style-position, list-style-image.',
      examples: `ul {\n  list-style: square inside;\n}\n.custom-list {\n  list-style-image: url('bullet.png');\n}`,
      tips: 'A list-style-type: none érték eltávolítja a lista jelölőket, ami gyakran használt navigációs menüknél.',
      relatedQuestions: ['Melyik CSS tulajdonság felelős egy lista stílusának beállításáért?']
    },
    {
      title: 'Átlátszóság szabályozása',
      content: 'Az opacity tulajdonság 0 (teljesen átlátszó) és 1 (teljesen átlátszatlan) között állítja be az elem átlátszóságát.',
      examples: `.overlay {\n  opacity: 0.8;\n}\n.image:hover {\n  opacity: 0.6;\n}`,
      tips: 'Az opacity az egész elemre vonatkozik (tartalommal együtt), míg a rgba/hsla csak a háttérszínre.',
      relatedQuestions: ['Melyik CSS tulajdonság felelős az elem átlátszóságának szabályozásáért?']
    },
    {
      title: 'Túlcsordulás kezelése',
      content: 'Az overflow tulajdonság szabályozza, mi történjen, ha egy elem tartalma nagyobb, mint maga az elem. Lehetséges értékek: visible, hidden, scroll, auto.',
      examples: `.scroll-box {\n  overflow: auto;\n  height: 200px;\n}\n.hidden-content {\n  overflow: hidden;\n}`,
      tips: 'Az overflow: auto csak akkor jelenít meg görgetősávot, ha szükséges, míg az overflow: scroll mindig.',
      relatedQuestions: ['Melyik CSS tulajdonság segít egy elem görgetésének szabályozásában?']
    },
    {
      title: 'Flexbox elrendezés',
      content: 'A display: flex érték rugalmas dobozmodellt (Flexbox) aktivál, ami egyszerűvé teszi az elemek elrendezését, igazítását és a térközök elosztását.',
      examples: `.container {\n  display: flex;\n  justify-content: space-between;\n}\n.item {\n  flex: 1;\n}`,
      tips: 'A flex-direction tulajdonsággal megváltoztathatod a fő tengely irányát (row, column).',
      relatedQuestions: ['Melyik CSS tulajdonság szabályozza a rugalmas konténerek elrendezését?']
    }
  ];

  private jsLessons = [
    {
      title: 'Változó deklarálása',
      content: 'JavaScript-ben három kulcsszóval deklarálhatunk változókat: var, let és const. A var a régebbi változat, míg a let és const az ES6-ban jelentek meg.',
      examples: `var nev = 'Példa';\nlet kor = 25;\nconst PI = 3.14;`,
      tips: 'Használd a const-ot mindig, ha a változó értéke nem változik, és a let-et, ha változhat. Kerüld a var használatát.',
      relatedQuestions: ['Melyik kulcsszóval deklarálhatunk változót JavaScript-ben?']
    },
    {
      title: 'Függvények meghívása',
      content: 'Egy függvényt a nevével és zárójelekkel lehet meghívni. Ha a függvény paramétereket vár, azokat a zárójelek között kell megadni.',
      examples: `function udvozles() {\n  console.log('Helló!');\n}\nudvozles(); // Függvény meghívása\n\nfunction osszead(a, b) {\n  return a + b;\n}\nosszead(5, 3); // 8-at ad vissza`,
      tips: 'A függvények neve legyen leíró, és használj camelCase írásmódot.',
      relatedQuestions: ['Hogyan lehet egy függvényt meghívni JavaScript-ben?']
    },
    {
      title: 'Szigorú egyenlőség vizsgálat',
      content: 'A === operátor nem csak az értékeket, hanem a típusukat is összehasonlítja. Ez biztonságosabb, mint a ==, ami típuskonverziót végez.',
      examples: `5 === 5   // true\n5 === '5' // false\n\n0 === false // false`,
      tips: 'Mindig a === operátort használd, hacsak nincs különösebb okod a == használatára.',
      relatedQuestions: ['Melyik operátor felelős az értékek összehasonlításáért és típusegyezés vizsgálatáért?']
    },
    {
      title: 'Tömb utolsó elemének eltávolítása',
      content: 'A pop() metódus eltávolítja a tömb utolsó elemét, és visszaadja azt. Ez módosítja az eredeti tömböt.',
      examples: `let gyumolcsok = ['alma', 'körte', 'banán'];\nlet utolso = gyumolcsok.pop(); // 'banán'\n// gyumolcsok most ['alma', 'körte']`,
      tips: 'Ha üres a tömb, a pop() undefined értéket ad vissza.',
      relatedQuestions: ['Melyik metódussal lehet egy tömb utolsó elemét eltávolítani?']
    },
    {
      title: 'Tömb első elemének eltávolítása',
      content: 'A shift() metódus eltávolítja a tömb első elemét, és visszaadja azt. Ez módosítja az eredeti tömböt, és az összes többi elem indexe csökken.',
      examples: `let szamok = [1, 2, 3];\nlet elso = szamok.shift(); // 1\n// szamok most [2, 3]`,
      tips: 'A shift() lassú lehet nagy tömböknél, mivel minden elemet újra kell indexelni.',
      relatedQuestions: ['Melyik metódussal lehet egy tömb első elemét eltávolítani?']
    },
    {
      title: 'do...while ciklus',
      content: 'A do...while ciklus először végrehajtja a kódblokkot, majd ellenőrzi a feltételt. Ez garantálja, hogy a ciklus legalább egyszer lefut.',
      examples: `let i = 0;\ndo {\n  console.log(i);\n  i++;\n} while (i < 5);`,
      tips: 'Hasznos, ha a ciklusnak legalább egyszer le kell futnia, függetlenül a feltételtől.',
      relatedQuestions: ['Melyik JavaScript ciklus fut legalább egyszer, mielőtt ellenőrzi a feltételt?']
    },
    {
      title: 'Eseménykezelés',
      content: 'Az addEventListener metódussal tudunk eseményfigyelőket hozzáadni HTML elemekhez. Ez a modern módszer az eseménykezelésre.',
      examples: `document.getElementById('gomb').addEventListener('click', function() {\n  alert('Gombra kattintottál!');\n});`,
      tips: 'Egy elemhez több eseményfigyelőt is hozzáadhatunk ugyanarra az eseményre.',
      relatedQuestions: ['Hogyan lehet egy elemhez eseménykezelőt hozzáadni JavaScript-ben?']
    },
    {
      title: 'Konzol használata',
      content: 'A console objektum metódusai segítségével lehet üzeneteket kiírni a böngésző konzoljába. Ez nagyon hasznos hibakereséshez.',
      examples: `console.log('Egyszerű üzenet');\nconsole.error('Hibaüzenet');\nconsole.warn('Figyelmeztetés');\nconsole.table({nev: 'Példa', kor: 25});`,
      tips: 'A console.log() mellett érdemes megismerni a console.dir(), console.table() és egyéb speciális metódusokat is.',
      relatedQuestions: ['Melyik objektum felelős a konzolba való kiírásért JavaScript-ben?']
    },
    {
      title: 'Karakterlánc kisbetűssé alakítása',
      content: 'A toLowerCase() metódus visszaadja a karakterlánc kisbetűs változatát, az eredeti sztringet nem módosítja.',
      examples: `let szoveg = 'Hello Világ';\nlet kisbetus = szoveg.toLowerCase(); // 'hello világ'`,
      tips: 'Hasznos lehet például felhasználói bevitel összehasonlításakor, hogy ne legyen érzékeny a kis/nagybetűkre.',
      relatedQuestions: ['Melyik metódussal lehet karakterláncot kisbetűssé alakítani?']
    },
    {
      title: 'Karakterlánc nagybetűssé alakítása',
      content: 'A toUpperCase() metódus visszaadja a karakterlánc nagybetűs változatát, az eredeti sztringet nem módosítja.',
      examples: `let szoveg = 'Hello Világ';\nlet nagybetus = szoveg.toUpperCase(); // 'HELLO VILÁG'`,
      tips: 'Fontos tudni, hogy ez a metódus nem kezeli speciálisan a nem angol karaktereket (pl. ékezetes betűket).',
      relatedQuestions: ['Melyik metódussal lehet egy karakterláncot nagybetűssé alakítani?']
    },
    {
      title: 'Tömb összefűzése karakterlánccá',
      content: 'A join() metódus egy tömb összes elemét egy karakterlánccá fűzi össze. Opcionális paraméterként megadható az elválasztó karakter (alapértelmezett a vessző).',
      examples: `let fruits = ['alma', 'körte', 'banán'];\nlet result = fruits.join(' - '); // "alma - körte - banán"\nlet noSeparator = fruits.join(); // "alma,körte,banán"`,
      tips: 'Ha üres stringet adsz meg elválasztónak (""), az elemek közé nem kerül elválasztó karakter.',
      relatedQuestions: ['Melyik metódussal lehet egy tömböt összefűzni egy karakterlánccá?']
    },
    {
      title: 'Lefelé kerekítés',
      content: 'A Math.floor() függvény egy számot a legközelebbi kisebb egész számra kerekít lefelé. Mindig kisebb vagy egyenlő értéket ad vissza, mint az eredeti szám.',
      examples: `Math.floor(3.7); // 3\nMath.floor(-1.2); // -2\nMath.floor(5); // 5`,
      tips: 'Hasznos, ha biztosan kisebb egész számra van szükséged, például oldalszámításnál vagy tömbindexelésnél.',
      relatedQuestions: ['Melyik JavaScript függvény kerekíti lefelé a számokat?']
    },
    {
      title: 'Véletlenszám generálás',
      content: 'A Math.random() függvény egy pszeudo-véletlen számot generál 0 (beleértve) és 1 (kizárva) között. A szám egyenletes eloszlású.',
      examples: `// Véletlen szám 0 és 1 között\nlet random = Math.random();\n\n// Véletlen szám 1 és 10 között\nlet random1To10 = Math.floor(Math.random() * 10) + 1;`,
      tips: 'Ha egész számokra van szükséged egy tartományban, kombináld Math.random()-t Math.floor()-ral vagy Math.ceil()-lel.',
      relatedQuestions: ['Melyik JavaScript függvény generál egy véletlenszámot 0 és 1 között?']
    },
    {
      title: 'Maradékos osztás (moduló)',
      content: 'A % operátor két szám osztásakor a maradékot adja vissza. Hasznos páros/páratlan ellenőrzésre, vagy ciklikus műveleteknél.',
      examples: `10 % 3; // 1 (mert 3*3=9, maradék 1)\n15 % 5; // 0 (nincs maradék)\n\n// Páros szám ellenőrzése\nlet num = 4;\nif (num % 2 === 0) {\n  console.log('Páros szám');\n}`,
      tips: 'Negatív számok esetén az eredmény előjele megegyezik az osztandó előjelével.',
      relatedQuestions: ['Melyik operátor felelős a moduló (maradékos osztás) műveletért?']
    },
    {
      title: 'Állandók létrehozása',
      content: 'A const kulcsszóval olyan változót hozhatunk létre, amelynek értéke nem változtatható meg később. Az érték csak egyszer kaphat értéket.',
      examples: `const PI = 3.14159;\nconst MAX_SIZE = 100;\n\n// Hibát dob, ha megpróbálod megváltoztatni\n// PI = 3.14; // TypeError: Assignment to constant variable.`,
      tips: 'Használd const-ot minden olyan értéknél, ami nem változik a program futása során. Ez javítja a kód olvashatóságát és megbízhatóságát.',
      relatedQuestions: ['Melyik kulcsszóval hozhatunk létre állandó értéket JavaScript-ben?']
    },
    {
      title: 'Tömb hosszának lekérdezése',
      content: 'A length tulajdonság egy tömb elemeinek számát adja vissza. Ez nem egy metódus, hanem egy property, így zárójelek nélkül használjuk.',
      examples: `let colors = ['piros', 'kék', 'zöld'];\nconsole.log(colors.length); // 3\n\n// Üres tömb\nlet empty = [];\nconsole.log(empty.length); // 0`,
      tips: 'A length tulajdonság írható is - ha csökkented, a tömb elemei elvesznek, ha növeled, üres helyek jönnek létre.',
      relatedQuestions: ['Melyik metódussal lehet egy tömb hosszát lekérdezni?']
    },
    {
      title: 'JSON stringgé alakítás',
      content: 'A JSON.stringify() metódus egy JavaScript objektumot vagy értéket JSON formátumú karakterlánccá alakít. Ez hasznos adatok tárolására vagy küldésére.',
      examples: `let user = { name: 'Anna', age: 25 };\nlet json = JSON.stringify(user); // '{"name":"Anna","age":25}'\n\n// Tömbök is konvertálhatók\nlet numbers = [1, 2, 3];\nJSON.stringify(numbers); // '[1,2,3]'`,
      tips: 'A JSON.stringify() második paramétereként megadhatsz egy replacer függvényt a szűréshez, harmadik paraméterként pedig a behúzás mértékét.',
      relatedQuestions: ['Hogyan lehet egy JSON objektumot JavaScript-ben szöveggé alakítani?']
    },
    {
      title: 'Karakterlánc felosztása',
      content: 'A split() metódus egy karakterláncot feldarabol egy tömbbé egy megadott elválasztó karakter mentén. Az elválasztó lehet string vagy reguláris kifejezés.',
      examples: `let sentence = "Ez egy példa mondat";\nlet words = sentence.split(" "); // ["Ez", "egy", "példa", "mondat"]\n\n// Dátum felbontása\nlet date = "2023-04-15";\nlet parts = date.split("-"); // ["2023", "04", "15"]`,
      tips: 'Ha üres stringet ("") adsz meg elválasztónak, a karakterlánc minden egyes karaktere külön tömbbelem lesz.',
      relatedQuestions: ['Melyik JavaScript metódussal lehet egy karakterláncot egy adott karakter mentén feldarabolni?']
    },
    {
      title: 'Objektum tulajdonság elérése',
      content: 'Objektum tulajdonságokhoz kétféleképpen férhetünk hozzá: pontjelölés (obj.key) vagy szögletes zárójelekkel (obj["key"]). A szögletes zárójeles változat dinamikus kulcsokhoz is használható.',
      examples: `let person = { name: 'Péter', age: 30 };\n\n// Pontjelölés\nconsole.log(person.name); // "Péter"\n\n// Szögletes zárójelek\nlet key = 'age';\nconsole.log(person[key]); // 30\n\n// Dinamikus kulcs\nfunction getProp(obj, prop) {\n  return obj[prop];\n}`,
      tips: 'Ha a kulcs neve változóban van, vagy speciális karaktereket tartalmaz, mindig a szögletes zárójeles szintaxist kell használni.',
      relatedQuestions: ['Hogyan lehet egy JavaScript objektum egy adott kulcsának értékéhez hozzáférni?']
    },
    {
      title: 'Elem hozzáadása tömb végéhez',
      content: 'A push() metódus egy vagy több elemet ad hozzá egy tömb végéhez, és visszaadja a tömb új hosszát. Módosítja az eredeti tömböt.',
      examples: `let fruits = ['alma', 'körte'];\nlet newLength = fruits.push('banán'); // 3\n// fruits most ['alma', 'körte', 'banán']\n\n// Több elem hozzáadása egyszerre\nfruits.push('narancs', 'szilva'); // 5`,
      tips: 'A push() mellett érdemes megismerni az unshift() metódust is, ami a tömb elejére szúr be elemeket.',
      relatedQuestions: ['Melyik metódussal lehet egy tömb végére elemet hozzáadni?']
    },
    {
      title: 'Elem hozzáadása tömb elejéhez',
      content: 'Az unshift() metódus egy vagy több elemet ad hozzá egy tömb elejéhez, és visszaadja a tömb új hosszát. Az összes többi elem indexe növekszik.',
      examples: `let numbers = [2, 3, 4];\nnumbers.unshift(1); // [1, 2, 3, 4]\n\n// Több elem hozzáadása\nnumbers.unshift(-1, 0); // [-1, 0, 1, 2, 3, 4]`,
      tips: 'Az unshift() hatása hasonló a push()-hoz, de a tömb elejére szúr be elemeket. Nagy tömböknél lassabb lehet, mint a push().',
      relatedQuestions: ['Melyik metódussal lehet egy tömb elején új elemet hozzáadni?']
    },
    {
      title: 'Elem keresése tömbben',
      content: 'Az includes() metódus megállapítja, hogy egy tömb tartalmazza-e a megadott elemet, true vagy false értéket visszaadva. Különösen hasznos egyszerű értékek (primitívek) keresésére.',
      examples: `let fruits = ['alma', 'körte', 'banán'];\n\nfruits.includes('körte'); // true\nfruits.includes('szilva'); // false\n\n// Második paraméter: kezdőindex\nfruits.includes('alma', 1); // false (az 1. indextől keres)`,
      tips: 'Az includes() nem működik objektumokra, mivel azok referenciák alapján hasonlítanak össze. Objektumoknál használd a some() metódust.',
      relatedQuestions: ['Melyik JavaScript metódus ellenőrzi, hogy egy tömb tartalmaz-e egy adott elemet?']
    },
    {
      title: 'Tömb rendezése',
      content: 'A sort() metódus helyben rendezi a tömb elemeit. Alapértelmezés szerint a string-ek szerint rendez, ezért számoknál külön összehasonlító függvényt kell megadni.',
      examples: `// String-ek rendezése\nlet fruits = ['banán', 'alma', 'körte'];\nfruits.sort(); // ['alma', 'banán', 'körte']\n\n// Számok rendezése\nlet numbers = [40, 1, 5, 200];\nnumbers.sort((a, b) => a - b); // [1, 5, 40, 200]`,
      tips: 'A sort() módosítja az eredeti tömböt! Ha az eredetit meg akarod őrizni, először készíts másolatot a slice() metódussal.',
      relatedQuestions: ['Melyik metódussal lehet egy tömb elemeit növekvő sorrendbe rendezni?']
    },
    {
      title: 'Szám egészrésze',
      content: 'A Math.trunc() függvény egy szám egész részét adja vissza, a tizedes jegyek eltávolításával. Nem kerekít, csak egyszerűen levágja a tizedes részt.',
      examples: `Math.trunc(3.7); // 3\nMath.trunc(-1.2); // -1\nMath.trunc(0.123); // 0\nMath.trunc(5); // 5`,
      tips: 'A Math.trunc() különbözik a Math.floor()-tól negatív számok esetén: Math.floor(-1.2) eredménye -2, míg Math.trunc(-1.2) eredménye -1.',
      relatedQuestions: ['Melyik függvény adja meg egy szám egészrészét JavaScript-ben?']
    },
    {
      title: 'Aszinkron függvények',
      content: 'Az async kulcsszóval jelölhetünk egy függvényt aszinkronnak. Az async függvények mindig Promise-t adnak vissza, és használhatják az await kulcsszót más Promise-ok megvárására.',
      examples: `async function fetchData() {\n  let response = await fetch('https://api.example.com/data');\n  let data = await response.json();\n  return data;\n}\n\n// Használat\nfetchData().then(data => console.log(data));`,
      tips: 'Az async/await szintaxis megkönnyíti az aszinkron kód írását és olvasását, mintha szinkron kód lenne.',
      relatedQuestions: ['Melyik kulcsszóval lehet aszinkron függvényt létrehozni?']
    },
    {
      title: 'Időzítők - setTimeout',
      content: 'A setTimeout() függvény egy adott kódot (callback) futtat egy megadott késleltetés (milliszekundumban) után. Visszaad egy időzítő azonosítót, amivel a timeout törölhető.',
      examples: `// Egyszerű időzítő\nsetTimeout(() => {\n  console.log('Ez 2 másodperc múlva fut le');\n}, 2000);\n\n// Paraméterek átadása\nsetTimeout((name) => {\n  console.log('Hello, ' + name);\n}, 1000, 'Anna');`,
      tips: 'A setTimeout() nem garantálja pontos időzítést, csak azt, hogy a kód nem fut le a megadott idő előtt.',
      relatedQuestions: ['Hogyan lehet egy JavaScript időzítőt elindítani?']
    },
    {
      title: 'Időzítők leállítása',
      content: 'A clearTimeout() függvény leállít egy setTimeout() által létrehozott időzítőt, ha az még nem futott le. Az időzítő azonosítóját kell megadni paraméterként.',
      examples: `// Időzítő létrehozása és leállítása\nconst timerId = setTimeout(() => {\n  console.log('Ez soha nem fog lefutni');\n}, 5000);\n\n// Időzítő leállítása 2 másodperc múlva\nsetTimeout(() => {\n  clearTimeout(timerId);\n}, 2000);`,
      tips: 'Hasznos lehet, ha a felhasználó valamilyen akciója (pl. gombnyomás) miatt már nem szükséges az időzítő lefutása.',
      relatedQuestions: ['Hogyan lehet egy JavaScript időzítőt leállítani?']
    },
    {
      title: 'Tömb bejárása - forEach',
      content: 'A forEach() metódus egy megadott függvényt hajt végre a tömb minden elemén. Nem ad vissza új tömböt, hanem csak végrehajtja a műveletet az elemeken.',
      examples: `let numbers = [1, 2, 3];\n\n// Minden elem kiírása\nnumbers.forEach(num => {\n  console.log(num * 2);\n});\n// 2, 4, 6\n\n// Index és tömb is elérhető\nnumbers.forEach((num, index, arr) => {\n  console.log(\`\${index}: \${num} (tömb hossza: \${arr.length})\`);\n});`,
      tips: 'A forEach()-ban a return nem szakítja meg a ciklust (mint a for-ban). Ha korai kilépésre van szükség, inkább használj for ciklust vagy some()/every() metódust.',
      relatedQuestions: ['Hogyan lehet egy tömb minden elemére egy műveletet végrehajtani JavaScript-ben?']
    },
    {
      title: 'Szöveg csere',
      content: 'A replace() metódus egy karakterlánc egy részét cseréli le egy másik szövegre. Csak az első előfordulást cseréli le, hacsak nem használsz reguláris kifejezést globális jelzővel.',
      examples: `let text = 'Szia Világ';\n\n// Egyszerű csere\ntext.replace('Világ', 'Péter'); // 'Szia Péter'\n\n// Reguláris kifejezés\ntext.replace(/i/g, 'o'); // 'Szoa Vólág'\n\n// Callback függvény\ntext.replace(/(\\w+)\\s(\\w+)/, (match, p1, p2) => {\n  return \`\${p2}, \${p1}\`;\n}); // 'Világ, Szia'`,
      tips: 'A replace() nem módosítja az eredeti stringet, hanem újat ad vissza. A stringek JavaScript-ben immutable (változtathatatlan) értékek.',
      relatedQuestions: ['Melyik metódussal lehet egy karakterláncban egy adott szövegrészt lecserélni?']
    },
    {
      title: 'Tömb transzformáció - map',
      content: 'A map() metódus egy új tömböt hoz létre, amiben az eredeti tömb minden eleme átalakítva szerepel egy megadott függvény alapján. Az eredeti tömb változatlan marad.',
      examples: `let numbers = [1, 2, 3];\n\n// Számok duplázása\nlet doubled = numbers.map(num => num * 2); // [2, 4, 6]\n\n// Objektumok transzformációja\nlet users = [{name: 'Anna'}, {name: 'Péter'}];\nlet names = users.map(user => user.name); // ['Anna', 'Péter']\n\n// Index használata\nlet indexed = numbers.map((num, index) => num + index); // [1, 3, 5]`,
      tips: 'A map() ideális, ha egy tömb minden elemére ugyanazt a transzformációt akarod alkalmazni. Tiszta függvényként használd - ne módosíts külső változókat!',
      relatedQuestions: ['Hogyan lehet egy tömb minden elemét egy új tömbbé alakítani egy művelettel?']
    },
    
   
];
private phLesson=[
// 1. Python telepítés és környezet
{
  title: 'Python telepítés és környezet',
  content: 'A Python interpreter telepítése, IDE-k (PyCharm, VS Code), virtuális környezetek (venv) létrehozása. A pip csomagkezelő használata.',
  examples: `# Virtuális környezet létrehozása\npython -m venv myenv\n\n# Csomag telepítése\npip install numpy`,
  tips: 'Használd a python --version parancsot a telepített verzió ellenőrzéséhez',
  relatedQuestions: []
},

// 2. Alapvető szintaxis
{
  title: 'Python alap szintaxis',
  content: 'Kommentek (#), változódeklaráció, egyszerű operátorok (+, -, *, /, //, %, **), beépített függvények (print(), input(), len()).',
  examples: `# Változók és operátorok\nx = 10\ny = 3\nprint(x ** y)  # Hatványozás`,
  tips: 'A Pythonban nincs ; a sor végén (opcionális, de nem szokásos)',
  relatedQuestions: ['Melyik függvény ír ki szöveget a képernyőre?']
},

// 3. Adattípusok
{
  title: 'Python adattípusok',
  content: 'Numerikus típusok (int, float, complex), szöveg (str), logikai (bool), kollekciók (list, tuple, set, dict). Típuskonverzió (int(), str(), float()).',
  examples: `# Típuskonverzió\nszam = int("42")\nszoveg = str(3.14)\n\n# Dictionary létrehozása\nadatok = {'név': 'Péter', 'kor': 25}`,
  tips: 'Az isinstance() függvénnyel ellenőrizheted egy változó típusát',
  relatedQuestions: []
},

// 4. String műveletek
{
  title: 'String kezelés',
  content: 'String formázás (f-string), műveletek (összefűzés, ismétlés, slicing), hasznos metódusok (upper(), lower(), strip(), split(), join()).',
  examples: `# String formázás\nnev = "Anna"\nkor = 25\nprint(f"{nev} {kor} éves")\n\n# Slicing\nszoveg = "Python"\nprint(szoveg[1:4])  # "yth"`,
  tips: 'A Python stringek immutable-ek (nem módosíthatók)',
  relatedQuestions: ['Melyik metódussal lehet karakterláncot kisbetűssé alakítani?']
},

// 5. Listák és tuple-ok
{
  title: 'Listák és tuple-ok',
  content: 'Lista létrehozása, elemek elérése, módosítása. Lista metódusok (append(), remove(), sort()). Tuple-ok jellemzői (immutable).',
  examples: `# Lista műveletek\nszamok = [1, 2, 3]\nszamok.append(4)\n\n# Tuple létrehozás\nkoordinatak = (10, 20)`,
  tips: 'Használj tuple-t olyan adatokhoz, amiket nem kell módosítani',
  relatedQuestions: ['Melyik metódussal lehet egy tömb utolsó elemét eltávolítani?']
},

// 6. Szótár (dictionary)
{
  title: 'Dictionary kezelés',
  content: 'Kulcs-érték párok tárolása, elemek elérése, módosítása. Dictionary metódusok (keys(), values(), items(), get()).',
  examples: `# Dictionary létrehozás\nember = {'név': 'Kata', 'kor': 30}\n\n# Érték lekérdezése\nprint(ember.get('foglalkozás', 'ismeretlen'))`,
  tips: 'A dictionary kulcsoknak immutable típusnak kell lenniük',
  relatedQuestions: []
},

// 7. Halmazok (set)
{
  title: 'Halmaz műveletek',
  content: 'Halmaz létrehozása, műveletek (unió, metszet, különbség). Hasznos metódusok (add(), remove(), union(), intersection()).',
  examples: `# Halmaz létrehozás\na = {1, 2, 3}\nb = {3, 4, 5}\n\n# Metszet\nprint(a & b)  # {3}`,
  tips: 'A halmazok automatikusan eltávolítják a duplikált elemeket',
  relatedQuestions: []
},

// 8. Feltételes utasítások
{
  title: 'Elágazások Pythonban',
  content: 'if, elif, else használata. Logikai operátorok (and, or, not). Ternary operátor (feltételes kifejezés).',
  examples: `# Egyszerű if\nif x > 0:\n    print("Pozitív")\n\n# Ternary operátor\nparos = "igen" if x % 2 == 0 else "nem"`,
  tips: 'Használj pass utasítást üres blokkokhoz',
  relatedQuestions: []
},

// 9. Ciklusok
{
  title: 'Ciklusok Pythonban',
  content: 'for ciklus (iterálás iterálható objektumokon), while ciklus. Ciklusvezérlés (break, continue, else ág).',
  examples: `# For ciklus\nfor i in range(5):\n    print(i)\n\n# While ciklus\nwhile x > 0:\n    x -= 1`,
  tips: 'A range() függvény hatékonyan kezeli a nagy tartományokat',
  relatedQuestions: ['Hogyan kezdődik egy for ciklus Pythonban?']
},

// 10. Függvények
{
  title: 'Függvények Pythonban',
  content: 'Függvények definiálása (def), paraméterek, visszatérési érték. Alapértelmezett paraméterek, név szerinti paraméterátadás.',
  examples: `# Függvény definíció\ndef udvozles(nev="Vendég"):\n    return f"Szia, {nev}!"\n\n# Hívás\nprint(udvozles("Péter"))`,
  tips: 'A függvények első osztályú objektumok Pythonban',
  relatedQuestions: ['Melyik kulcsszóval kell függvényt definiálni Pythonban?']
},

// 11. Modulok és csomagok
{
  title: 'Modulok használata',
  content: 'Modulok importálása (import), alias létrehozása (as). Saját modulok készítése. A __name__ változó jelentése.',
  examples: `# Modul importálás\nimport math\nprint(math.sqrt(16))\n\n# Saját modul\nimport sajat_modul`,
  tips: 'Használj relatív importot csomagokon belül',
  relatedQuestions: []
},

// 12. Fájlkezelés
{
  title: 'Fájlkezelés Pythonban',
  content: 'Fájlok olvasása és írása. Módok: "r" (olvasás), "w" (írás), "a" (hozzáfűzés). Kontextuskezelő (with).',
  examples: `# Fájl olvasása\nwith open('adat.txt', 'r') as f:\n    tartalom = f.read()\n\n# Fájl írása\nwith open('kimenet.txt', 'w') as f:\n    f.write("Hello")`,
  tips: 'Mindig használj with utasítást a fájlkezeléshez',
  relatedQuestions: ['Hogyan nyitunk meg fájlt olvasásra?']
},

// 13. Hibakezelés
{
  title: 'Kivételek kezelése',
  content: 'try-except blokk használata. Beépített kivételek (ValueError, TypeError, FileNotFoundError). finally és else ágak.',
  examples: `# Hibakezelés\ntry:\n    szam = int(input("Szám: "))\nexcept ValueError:\n    print("Nem szám!")\nfinally:\n    print("Vége")`,
  tips: 'Specifikus kivételeket fogj el először, az általánosakat utoljára',
  relatedQuestions: []
},

// 14. List comprehension
{
  title: 'List comprehension',
  content: 'Tömör lista létrehozása. Feltételes list comprehension. Dictionary és set comprehension.',
  examples: `# Egyszerű példa\nnegyzetek = [x**2 for x in range(10)]\n\n# Feltételes\nparosak = [x for x in range(20) if x % 2 == 0]`,
  tips: 'Ne használj túl bonyolult list comprehension-öket',
  relatedQuestions: []
},

// 15. Generátorok
{
  title: 'Generátorok és yield',
  content: 'Generátor függvények, yield kulcsszó. Generátor kifejezések. Memóriahatékonyság előnyei.',
  examples: `# Generátor függvény\ndef szamgenerator():\n    for i in range(10):\n        yield i\n\n# Használat\nfor szam in szamgenerator():\n    print(szam)`,
  tips: 'Generátorok egyszer használatosak',
  relatedQuestions: []
},

// 16. Lambda függvények
{
  title: 'Lambda függvények',
  content: 'Név nélküli függvények létrehozása. Használat map(), filter() és sorted() függvényekkel.',
  examples: `# Lambda példa\nosszead = lambda x, y: x + y\n\n# Filter használata\nszamok = [1, 2, 3, 4]\nparosak = filter(lambda x: x % 2 == 0, szamok)`,
  tips: 'Használj lambda függvényeket csak egyszerű műveletekhez',
  relatedQuestions: []
},

// 17. Dekorátorok
{
  title: 'Függvény dekorátorok',
  content: 'Dekorátorok létrehozása és használata. Többszörös dekorálás. Paraméteres dekorátorok.',
  examples: `# Egyszerű dekorátor\ndef logger(func):\n    def wrapper(*args):\n        print("Függvény hívás")\n        return func(*args)\n    return wrapper\n\n@logger\ndef udvozles(nev):\n    return f"Szia {nev}!"`,
  tips: 'A functools.wraps segít megőrizni a függvény metaadatait',
  relatedQuestions: []
},

// 18. OOP alapok
{
  title: 'Objektumorientált programozás',
  content: 'Osztályok létrehozása, objektumok példányosítása. Konstruktor (__init__), self paraméter. Példányváltozók és metódusok.',
  examples: `# Egyszerű osztály\nclass Kutya:\n    def __init__(self, nev):\n        self.nev = nev\n    \n    def ugat(self):\n        print(f"{self.nev} mondja: Vau!")`,
  tips: 'A self csak konvenció, de mindig használd',
  relatedQuestions: []
},

// 19. Öröklődés
{
  title: 'Öröklődés Pythonban',
  content: 'Szülő és gyermek osztályok. Metódus felülírás (override). super() függvény használata.',
  examples: `# Öröklődés példa\nclass Allat:\n    def hang(self):\n        print("Hang")\n\nclass Macska(Allat):\n    def hang(self):\n        print("Miau")`,
  tips: 'A Pythonban többszörös öröklődés is lehetséges',
  relatedQuestions: []
},

// 20. Magic methods
{
  title: 'Speciális metódusok',
  content: '__str__ vs __repr__, __len__, __add__ és egyéb operátor overloading. Kontextuskezelő (__enter__, __exit__).',
  examples: `# __str__ példa\nclass Pont:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    \n    def __str__(self):\n        return f"({self.x}, {self.y})"`,
  tips: 'A __repr__ célja egyértelmű string reprezentáció',
  relatedQuestions: []
},

// 21. Iterátorok
{
  title: 'Iterátor protokoll',
  content: '__iter__ és __next__ metódusok. Iterálható vs iterátor objektumok. Egyéni iterátorok készítése.',
  examples: `# Egyszerű iterátor\nclass Szamok:\n    def __init__(self, max):\n        self.max = max\n    \n    def __iter__(self):\n        self.n = 0\n        return self\n    \n    def __next__(self):\n        if self.n < self.max:\n            self.n += 1\n            return self.n\n        raise StopIteration`,
  tips: 'A legtöbb iterálható objektum nem iterátor',
  relatedQuestions: []
},

// 22. Generátor kifejezések
{
  title: 'Generátor kifejezések',
  content: 'Generátorok létrehozása zárójeles szintaxissal. Memóriahatékonyság előnyei. Használat nagy adathalmazoknál.',
  examples: `# Generátor kifejezés\nnegyzetek = (x**2 for x in range(1000000))\n\n# Használat\nfor negyzet in negyzetek:\n    print(negyzet)`,
  tips: 'Generátor kifejezések egyszer használatosak',
  relatedQuestions: []
},

// 23. Dinamikus attribútumok
{
  title: 'Dinamikus attribútumok',
  content: '__getattr__, __setattr__, __delattr__. property dekorátor. Dinamikus attribútumkezelés.',
  examples: `# Property példa\nclass Kor:\n    def __init__(self, ev):\n        self.ev = ev\n    \n    @property\n    def kor(self):\n        return 2023 - self.ev`,
  tips: 'A property segít az adatellenőrzésben',
  relatedQuestions: []
},

// 24. Modulok készítése
{
  title: 'Saját modulok készítése',
  content: 'Modul szerkezet, __init__.py szerepe. Relatív importok. Csomagok létrehozása és terjesztése.',
  examples: `# Példa csomag struktúra\nmy_package/\n    __init__.py\n    modul1.py\n    modul2.py\n    subpackage/\n        __init__.py\n        modul3.py`,
  tips: 'A __all__ változó szabályozza az import * működését',
  relatedQuestions: []
},

// 25. Unit tesztek
{
  title: 'Unit tesztelés Pythonban',
  content: 'unittest modul használata. Tesztesetek írása. Assert metódusok. pytest keretrendszer bemutatása.',
  examples: `# Egyszerű unittest\nimport unittest\n\nclass Teszt(unittest.TestCase):\n    def test_osszeadas(self):\n        self.assertEqual(1 + 1, 2)`,
  tips: 'Írj kis, atomi teszteket',
  relatedQuestions: []
},

// 26. Reguláris kifejezések
{
  title: 'Reguláris kifejezések',
  content: 're modul használata. Mintaillesztés, keresés, csere. Speciális karakterek (., *, +, ?, []). Csoportok létrehozása.',
  examples: `# Email cím validálás\nimport re\nminta = r'^[\w\.-]+@[\w\.-]+\.\w+$'\nif re.match(minta, email):\n    print("Érvényes")`,
  tips: 'Használj nyers stringeket (r prefix) reguláris kifejezésekhez',
  relatedQuestions: []
},

// 27. Multithreading
{
  title: 'Párhuzamos programozás',
  content: 'threading modul. Szálak létrehozása és kezelése. GIL (Global Interpreter Lock) hatásai. Multiprocessing alapok.',
  examples: `# Szál létrehozása\nimport threading\n\ndef feladat():\n    print("Szál fut")\n\nszal = threading.Thread(target=feladat)\nszal.start()`,
  tips: 'CPU intenzív feladatokhoz használd a multiprocessing modult',
  relatedQuestions: []
},

// 28. Adatbázis kapcsolat
{
  title: 'Adatbázis kezelés',
  content: 'sqlite3 modul használata. Kapcsolat létrehozása, lekérdezések végrehajtása. Paraméteres lekérdezések.',
  examples: `# SQLite példa\nimport sqlite3\nconn = sqlite3.connect('adatbazis.db')\nc = conn.cursor()\nc.execute("SELECT * FROM felhasznalok")\nprint(c.fetchall())\nconn.close()`,
  tips: 'Mindig zárd le a kapcsolatot',
  relatedQuestions: []
},

// 29. Web scraping
{
  title: 'Web adatgyűjtés',
  content: 'requests modul HTTP kérésekhez. BeautifulSoup HTML elemzés. Alapvető etikai irányelvek.',
  examples: `# Egyszerű scraping\nimport requests\nfrom bs4 import BeautifulSoup\n\noldal = requests.get("http://pelda.hu")\nsoup = BeautifulSoup(oldal.text, 'html.parser')\ncimek = soup.find_all('h2')`,
  tips: 'Tiszteld a robots.txt szabályokat',
  relatedQuestions: []
},

// 30. API fejlesztés
{
  title: 'REST API készítése',
  content: 'Flask keretrendszer alapok. Végpontok létrehozása. JSON válaszok. Egyszerű CRUD műveletek.',
  examples: `# Flask példa\nfrom flask import Flask, jsonify\napp = Flask(__name__)\n\n@app.route('/api/udvozles/<nev>')\ndef udvozles(nev):\n    return jsonify({"uzenet": f"Szia {nev}!"})`,
  tips: 'Használj virtuális környezetet fejlesztéshez',
  relatedQuestions: []
}
];

private javaLesson=[// 1. Java bevezető
  {
    title: 'Java története és jellemzői',
    content: 'A Java nyelv kialakulása, főbb verziók. JVM, JRE, JDK szerepe. Platformfüggetlenség, objektumorientált paradigma, automatikus memóriakezelés (garbage collection).',
    examples: `// Hello World\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}`,
    tips: 'A Java forráskód .java kiterjesztésű, a fordított bytecode .class kiterjesztésű',
    relatedQuestions: ['Mi a Java program belépési pontja?']
  },
  
  // 2. Fejlesztőkörnyezet
  {
    title: 'JDK telepítés és IDE beállítás',
    content: 'Oracle JDK vs OpenJDK. Népszerű IDE-k: IntelliJ IDEA, Eclipse, NetBeans. Projekt létrehozása, osztálypath konfigurálás. Maven/Gradle build eszközök bemutatása.',
    examples: `// Parancssorból fordítás és futtatás\njavac Main.java\njava Main`,
    tips: 'Használj LTS (Long-Term Support) Java verziót éles rendszerekhez',
    relatedQuestions: []
  },
  
  // 3. Alapvető szintaxis
  {
    title: 'Változók és adattípusok',
    content: 'Primitív típusok (byte, short, int, long, float, double, char, boolean) és osztályok (String, Integer). Változódeklaráció, típuskonverzió (casting), final kulcsszó.',
    examples: `// Változók\ndouble szam = 3.14;\nfinal int ALLANDO = 42;\n\n// Típuskonverzió\nint x = (int)szam;`,
    tips: 'A final változók értéke később nem módosítható',
    relatedQuestions: ['Melyik adattípus tárol igaz/hamis értékeket?']
  },
  
  // 4. Operátorok
  {
    title: 'Operátorok és kifejezések',
    content: 'Aritmetikai (+, -, *, /, %), relációs (==, !=, >, <), logikai (&&, ||, !) operátorok. Bitműveletek (&, |, ^, ~, <<, >>). Ternary operátor (?:).',
    examples: `// Feltételes operátor\nint max = (a > b) ? a : b;\n\n// Bitművelet\nint eredmeny = flags & MASK;`,
    tips: 'A ++ és -- operátorok előtag és utótag formája különbözik',
    relatedQuestions: []
  },
  
  // 5. Vezérlési szerkezetek
  {
    title: 'Elágazások és ciklusok',
    content: 'if-else, switch-case szerkezetek. for, while, do-while ciklusok. break, continue utasítások. Címkézett break használata.',
    examples: `// Switch szerkezet\nswitch (honap) {\n  case 12: System.out.println("December"); break;\n  default: System.out.println("Egyéb");\n}\n\n// Címkézett ciklus\nkulso: for(int i=0; i<10; i++) {\n  // ...\n}`,
    tips: 'Java 14-től a switch expression használható visszatérési értékkel',
    relatedQuestions: ['Melyik JavaScript ciklus fut legalább egyszer?']
  },
  
  // 6. Tömbök
  {
    title: 'Tömbök kezelése',
    content: 'Egydimenziós és többdimenziós tömbök deklarálása, inicializálása. Tömbök másolása (System.arraycopy), rendezése (Arrays.sort). Varargs használata.',
    examples: `// Tömb létrehozása\nint[] szamok = {1, 2, 3};\n\n// Többdimenziós\nString[][] nevek = new String[2][2];\n\n// Varargs\nvoid metodus(String... elemek) { ... }`,
    tips: 'A tömbök mérete rögzített, dekorálás után nem változtatható',
    relatedQuestions: ['Melyik metódussal lehet egy tömb utolsó elemét eltávolítani?']
  },
  
  // 7. Osztályok és objektumok
  {
    title: 'OOP alapok - Osztály és példány',
    content: 'Osztálydefiníció, példányosítás (new), konstruktorok, this referencia. Mezők és metódusok láthatósága (private, protected, public). Getter/setter metódusok.',
    examples: `// Egyszerű osztály\npublic class Auto {\n  private String marka;\n  \n  public Auto(String m) { this.marka = m; }\n  \n  public String getMarka() { return marka; }\n}`,
    tips: 'Egy forrásfájlban csak egy public osztály lehet',
    relatedQuestions: ['Melyik kulcsszóval hozunk létre osztályt Javaban?']
  },
  
  // 8. Öröklődés
  {
    title: 'Öröklődés és polimorfizmus',
    content: 'extends kulcsszó, metódus felülírás (@Override), super referencia. Absztrakt osztályok és metódusok. final osztályok és metódusok.',
    examples: `// Öröklődés\nclass Allat { void hang() { ... } }\nclass Macska extends Allat {\n  @Override void hang() { System.out.println("Miau"); }\n}`,
    tips: 'A Java csak egyszeres öröklődést támogat osztályoknál',
    relatedQuestions: ['Melyik kulcsszóval valósítjuk meg az öröklődést?']
  },
  
  // 9. Interfészek
  {
    title: 'Interfészek és default metódusok',
    content: 'interface definiálása, implementálás (implements). Többes interfész implementáció. Default és static metódusok interfészekben. Funkcionális interfészek.',
    examples: `// Interfész\ninterface Rajzolhato {\n  void rajzol();\n  default void uzenet() { System.out.println("Rajzolás"); }\n}\n\nclass Kor implements Rajzolhato {\n  @Override public void rajzol() { ... } }`,
    tips: 'Java 8 óta az interfészek tartalmazhatnak implementációt (default metódus)',
    relatedQuestions: []
  },
  
  // 10. Kivételkezelés
  {
    title: 'Kivételkezelés Java-ban',
    content: 'try-catch-finally blokk. Checked és unchecked kivételek. Saját kivétel osztályok készítése. try-with-resources szerkezet.',
    examples: `// Kivételkezelés\ntry {\n  File file = new File("nemletezo.txt");\n  Scanner sc = new Scanner(file);\n} catch (FileNotFoundException e) {\n  System.err.println("Hiba: " + e.getMessage());\n} finally {\n  // erőforrások felszabadítása\n}`,
    tips: 'Java 7-től a try-with-resources automatikusan lezárja az AutoCloseable erőforrásokat',
    relatedQuestions: []
  },
  
  // 11. Generikusok
  {
    title: 'Generikus típusok',
    content: 'Generikus osztályok és metódusok. Type parameter hatókör és korlátozások (extends). Wildcard típusok (?), hatékonysági megfontolások.',
    examples: `// Generikus osztály\nclass Box<T> {\n  private T tartalom;\n  public void set(T tartalom) { this.tartalom = tartalom; }\n}\n\n// Használat\nBox<String> doboz = new Box<>();`,
    tips: 'A diamant operátor (<>) használata javasolt a jobb olvashatóságért',
    relatedQuestions: []
  },
  
  // 12. Kollekciók
  {
    title: 'Kollekció keretrendszer',
    content: 'List (ArrayList, LinkedList), Set (HashSet, TreeSet), Map (HashMap, TreeMap) interfészek. Iterator használata. Comparable és Comparator.',
    examples: `// HashMap példa\nMap<String, Integer> emberek = new HashMap<>();\nemberek.put("Péter", 25);\n\n// Rendezés Comparatorral\nlista.sort((a, b) -> a.compareTo(b));`,
    tips: 'A kollekciók nem primitív típusokkal dolgoznak, használj wrapper osztályokat',
    relatedQuestions: ['Melyik nem primitív adattípus?']
  },
  
  // 13. Lambda kifejezések
  {
    title: 'Lambda és funkcionális programozás',
    content: 'Lambda szintaxis, funkcionális interfészek (Function, Predicate, Consumer, Supplier). Method reference (::). Stream API alapok.',
    examples: `// Lambda példa\nList<String> nevek = Arrays.asList("Anna", "Béla");\nnevek.forEach(n -> System.out.println(n));\n\n// Method reference\nnevek.forEach(System.out::println);`,
    tips: 'Használj @FunctionalInterface annotációt egyéni funkcionális interfészekhez',
    relatedQuestions: []
  },
  
  // 14. Stream API
  {
    title: 'Stream műveletek',
    content: 'Köztes (filter, map, sorted) és terminális (collect, forEach, reduce) műveletek. Parallel stream használata. Collectors osztály gyűjtő műveletei.',
    examples: `// Stream példa\nList<String> eredmeny = lista.stream()\n  .filter(s -> s.length() > 3)\n  .map(String::toUpperCase)\n  .collect(Collectors.toList());`,
    tips: 'Parallel stream csak nagy adathalmazoknál hatékony',
    relatedQuestions: []
  },
  
  // 15. Fájlkezelés
  {
    title: 'IO műveletek és NIO',
    content: 'File osztály, InputStream/OutputStream, Reader/Writer hierarchia. try-with-resources használata. NIO.2 API (Path, Files).',
    examples: `// Fájl olvasása\nPath path = Paths.get("adat.txt");\nList<String> sorok = Files.readAllLines(path);\n\n// try-with-resources\ntry (BufferedReader br = new BufferedReader(new FileReader("fajl.txt"))) {\n  String sor;\n  while ((sor = br.readLine()) != null) { ... } }`,
    tips: 'Mindig használj UTF-8 kódolást szöveges fájlokhoz',
    relatedQuestions: []
  },
  
  // 16. Multithreading
  {
    title: 'Szálkezelés alapok',
    content: 'Thread osztály és Runnable interfész. Szinkronizáció (synchronized), volatile változók. ExecutorService és ThreadPool használata.',
    examples: `// Szál létrehozása\nnew Thread(() -> {\n  System.out.println("Fut a szál");\n}).start();\n\n// ExecutorService\nExecutorService executor = Executors.newFixedThreadPool(4);`,
    tips: 'A synchronized blokkokat mindig azonos sorrendben kell megszerezni a holtpont elkerüléséhez',
    relatedQuestions: []
  },
  
  // 17. Concurrent kollekciók
  {
    title: 'Párhuzamos kollekciók',
    content: 'ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue implementációk. Atomikus műveletek (AtomicInteger stb.). Lock interfész alternatívái.',
    examples: `// ConcurrentHashMap\nConcurrentMap<String, Integer> map = new ConcurrentHashMap<>();\nmap.putIfAbsent("kulcs", 42);\n\n// AtomicInteger\nAtomicInteger szamlalo = new AtomicInteger(0);\nszamlalo.incrementAndGet();`,
    tips: 'A ConcurrentHashMap nem szinkronizált, de thread-safe',
    relatedQuestions: []
  },
  
  // 18. Annotációk
  {
    title: 'Annotációk és metadatok',
    content: 'Beépített annotációk (@Override, @Deprecated, @SuppressWarnings). Egyéni annotációk készítése. Futásidőben való feldolgozás (reflection).',
    examples: `// Egyéni annotáció\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.METHOD)\npublic @interface Teszt {}\n\n// Használat\n@Teszt\npublic void tesztMetodus() { ... }`,
    tips: 'Az annotációk önmagukban nem változtatják meg a program viselkedését',
    relatedQuestions: []
  },
  
  // 19. Reflection
  {
    title: 'Reflection API',
    content: 'Osztályok vizsgálata futásidőben (Class objektum). Mezők és metódusok elérése. Konstruktorok hívása. Dinamikus proxyk.',
    examples: `// Reflection példa\nClass<?> clazz = Class.forName("java.lang.String");\nMethod[] metodusok = clazz.getDeclaredMethods();\n\n// Példányosítás\nConstructor<?> cons = clazz.getConstructor(String.class);\nObject instance = cons.newInstance("Hello");`,
    tips: 'A reflection lassú, csak szükség esetén használd',
    relatedQuestions: []
  },
  
  // 20. JDBC
  {
    title: 'Adatbázis kapcsolat JDBC-vel',
    content: 'JDBC architektúra. Connection, Statement, PreparedStatement, ResultSet használata. Tranzakciókezelés. Connection pool megoldások (HikariCP).',
    examples: `// JDBC példa\ntry (Connection conn = DriverManager.getConnection(URL, USER, PASS);\n     PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users");\n     ResultSet rs = stmt.executeQuery()) {\n  while (rs.next()) {\n    System.out.println(rs.getString("name"));\n  }\n}`,
    tips: 'Mindig használj PreparedStatement-t SQL injection ellen',
    relatedQuestions: []
  },
  
  // 21. JUnit tesztelés
  {
    title: 'Unit tesztelés JUnit-tal',
    content: 'Tesztesetek írása, assert metódusok. @Before, @After annotációk. Paraméterezett tesztek. Mockolás (Mockito).',
    examples: `// JUnit teszt\n@Test\npublic void testOsszeadas() {\n  assertEquals(4, Calculator.add(2, 2));\n}\n\n// Mockito példa\n@Mock\nUserRepository userRepo;\n\n@Test\npublic void testFindUser() {\n  when(userRepo.findById(1)).thenReturn(new User("Test"));\n}`,
    tips: 'Írj kis, gyors, izolált teszteket (FIRST elv)',
    relatedQuestions: []
  },
  
  // 22. Logolás
  {
    title: 'Naplózás Java-ban',
    content: 'SLF4J és Log4j2 bemutatása. Log szintek (DEBUG, INFO, WARN, ERROR). Konfigurálás XML-ben vagy properties fájlban. Strukturált naplózás.',
    examples: `// SLF4J használata\nprivate static final Logger logger = LoggerFactory.getLogger(MyClass.class);\n\nlogger.info("User {} logged in", username);\nlogger.error("Hiba történt", exception);`,
    tips: 'Kerüld a string összefűzést a log üzenetekben, használj helyőrzőket',
    relatedQuestions: []
  },
  
  // 23. XML és JSON
  {
    title: 'XML és JSON feldolgozás',
    content: 'DOM és SAX parser használata. JAXB annotációk. JSON kezelése Jackson vagy GSON könyvtárakkal. JSON séma validálás.',
    examples: `// Jackson példa\nObjectMapper mapper = new ObjectMapper();\nUser user = mapper.readValue(jsonString, User.class);\nString json = mapper.writeValueAsString(user);\n\n// JAXB példa\nJAXBContext context = JAXBContext.newInstance(User.class);\nMarshaller marshaller = context.createMarshaller();\nmarshaller.marshal(user, System.out);`,
    tips: 'A Jackson a legnépszerűbb JSON könyvtár Java-ban',
    relatedQuestions: []
  },
  
  // 24. Hálózati programozás
  {
    title: 'Hálózati kommunikáció',
    content: 'TCP/UDP kommunikáció. Socket és ServerSocket osztályok. HTTP kliens (HttpURLConnection, HttpClient). Alapvető biztonsági megfontolások.',
    examples: `// HTTP kérés Java 11+ HttpClient-tel\nHttpClient client = HttpClient.newHttpClient();\nHttpRequest request = HttpRequest.newBuilder()\n  .uri(URI.create("https://api.pelda.hu"))\n  .build();\nHttpResponse<String> response = client.send(request, BodyHandlers.ofString());`,
    tips: 'A HttpClient immutable, thread-safe megoldást nyújt',
    relatedQuestions: []
  },
  
  // 25. Design pattern-ek
  {
    title: 'Gyakori tervezési minták',
    content: 'Singleton, Factory, Builder, Observer, Strategy minták implementációja Java-ban. Lombok könyvtár használata annotációkkal.',
    examples: `// Singleton példa\npublic class Database {\n  private static Database instance;\n  \n  private Database() {}\n  \n  public static synchronized Database getInstance() {\n    if (instance == null) {\n      instance = new Database();\n    }\n    return instance;\n  }\n}`,
    tips: 'A modern Java (14+) a record osztályokkal csökkenti a boilerplate kódot',
    relatedQuestions: []
  },
  
  // 26. Java 8+ újítások
  {
    title: 'Modern Java funkciók',
    content: 'Lambda kifejezések, method reference, Optional osztály. Stream API, új dátum/idő API (java.time). Var típuskövetés (Java 10+), rekord osztályok (Java 14+).',
    examples: `// Optional példa\nOptional<String> opt = Optional.ofNullable(getName());\nString nev = opt.orElse("Ismeretlen");\n\n// Rekord (Java 14+)\nrecord User(String name, int age) {}\nUser user = new User("Péter", 30);`,
    tips: 'Az Optional segít elkerülni a NullPointerException-t',
    relatedQuestions: []
  },
  
  // 27. Spring Boot alapok
  {
    title: 'Spring Boot bevezető',
    content: 'Dependency injection, Spring kontextus. @RestController, @Service, @Repository annotációk. Autowiring. Alapvető REST API készítése.',
    examples: `// Egyszerű Controller\n@RestController\n@RequestMapping("/api")\npublic class UserController {\n  \n  @Autowired\n  private UserService userService;\n  \n  @GetMapping("/users/{id}")\n  public User getUser(@PathVariable Long id) {\n    return userService.findById(id);\n  }\n}`,
    tips: 'A Spring Initializr (start.spring.io) segít projekt létrehozásban',
    relatedQuestions: []
  },
  
  // 28. Build és deployment
  {
    title: 'Build rendszerek és CI/CD',
    content: 'Maven és Gradle összehasonlítása. Pom.xml szerkezet, függőségek kezelése. Dockerizálás. Folyamatos integráció (GitHub Actions, Jenkins).',
    examples: "// Maven Docker plugin konfig\n<plugin>\n  <groupId>com.spotify</groupId>\n  <artifactId>dockerfile-maven-plugin</artifactId>\n  <version>1.4.13</version>\n  <configuration>\n    <repository>${docker.image.prefix}/${project.artifactId}</repository>\n  </configuration>\n</plugin>",
    tips: 'A .m2/local mappában tárolódnak a letöltött függőségek',
    relatedQuestions: []
  },
  
  // 29. Biztonság
  {
    title: 'Biztonságos Java fejlesztés',
    content: 'OWASP Top 10 kockázatok. Jelszó tárolás (BCrypt), JWT token kezelés. SQL injection, XSS, CSRF védelem. Spring Security alapok.',
    examples: `// JWT token generálás\nString token = Jwts.builder()\n  .setSubject(username)\n  .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))\n  .signWith(SignatureAlgorithm.HS512, SECRET.getBytes()))\n  .compact();`,
    tips: 'Sose tárolj érzékeny adatokat forráskódban vagy verziókezelőben',
    relatedQuestions: []
  },
  
  // 30. Microservices
  {
    title: 'Microservices architektúra',
    content: 'Service discovery (Eureka), API gateway (Zuul), konfigurációkezelés (Spring Cloud Config). REST vs gRPC. Resiliencia (Hystrix).',
    examples: `// Spring Cloud Feign client\n@FeignClient(name = "user-service")\npublic interface UserServiceClient {\n  @GetMapping("/users/{id}")\n  User getUser(@PathVariable("id") Long id);\n}\n\n// Használat\nUser user = userServiceClient.getUser(1L);`,
    tips: 'A microservices-ekhez mindenképpen használj megfelelő monitorozást',
    relatedQuestions: []
  }];
private sqlLesson=[// 1. SQL bevezető
  {
    title: 'Adatbázis alapok és SQL története',
    content: 'Relációs adatbázis fogalma, táblák, rekordok, oszlopok. SQL nyelv története és változatai (MySQL, PostgreSQL, Oracle, SQL Server). Elsődleges kulcs (PRIMARY KEY), idegen kulcs (FOREIGN KEY) fogalma.',
    examples: `-- Egyszerű tábla létrehozása
  CREATE TABLE felhasznalok (
    id INT PRIMARY KEY,
    nev VARCHAR(50) NOT NULL
  );`,
    tips: 'Az SQL nyelv szabványa az ANSI SQL, de minden adatbázis rendszer implementál saját kiterjesztéseket',
    relatedQuestions: ['Melyik SQL utasítás kérdez le adatokat?']
  },
  
  // 2. Adattípusok
  {
    title: 'SQL adattípusok',
    content: 'Numerikus típusok (INT, DECIMAL, FLOAT), karakterláncok (CHAR, VARCHAR, TEXT), dátum/idő (DATE, TIME, DATETIME, TIMESTAMP), logikai (BOOLEAN), bináris (BLOB). Típusválasztás hatékonysági szempontjai.',
    examples: `-- Tábla létrehozása különböző típusokkal
  CREATE TABLE termekek (
    id INT,
    nev VARCHAR(100),
    ar DECIMAL(10,2),
    keszlet SMALLINT,
    datum TIMESTAMP
  );`,
    tips: 'A VARCHAR helyett TEXT típus használata nagy szövegeknél (több ezer karakter)',
    relatedQuestions: []
  },
  
  // 3. SELECT alapok
  {
    title: 'Alapvető SELECT lekérdezések',
    content: 'Egyszerű lekérdezések összeállítása, oszlopok kiválasztása, WHERE feltétel használata. Aliasok (AS) használata oszlopok és táblák átnevezésére. DISTINCT kulcsszó egyedi értékek kinyerésére.',
    examples: `-- Alapvető SELECT
  SELECT nev, email FROM felhasznalok;
  
  -- WHERE feltétellel
  SELECT * FROM termekek WHERE ar > 1000;
  
  -- DISTINCT használata
  SELECT DISTINCT varos FROM felhasznalok;`,
    tips: 'Kerüld a SELECT * használatát, mindig csak a szükséges oszlopokat kérd le',
    relatedQuestions: ['Melyik záradék szűri a rekordokat?']
  },
  
  // 4. Rendezés és korlátozás
  {
    title: 'ORDER BY és LIMIT',
    content: 'Eredményhalmaz rendezése (ORDER BY) növekvő (ASC) és csökkenő (DESC) sorrendben. Eredményhalmaz méretének korlátozása (LIMIT, OFFSET). TOP kulcsszó SQL Server-ben.',
    examples: `-- Rendezés és oldaltörés
  SELECT nev, fizetes FROM alkalmazottak
  ORDER BY fizetes DESC
  LIMIT 10 OFFSET 20;
  
  -- SQL Server változat
  SELECT TOP 10 * FROM termekek;`,
    tips: 'Nagy adathalmazoknál az OFFSET lassú lehet, inkább használj WHERE feltételt az oldaltöréshez',
    relatedQuestions: ['Melyik SQL záradék rendez eredményeket?']
  },
  
  // 5. Aggregáló függvények
  {
    title: 'GROUP BY és aggregátumok',
    content: 'Aggregáló függvények (COUNT, SUM, AVG, MIN, MAX) használata. Csoportosítás (GROUP BY). HAVING záradék csoportok szűrésére. NULL értékek kezelése aggregátumoknál.',
    examples: `-- Egyszerű aggregáció
  SELECT COUNT(*) FROM felhasznalok;
  
  -- Csoportosítás
  SELECT osztaly, AVG(fizetes) FROM alkalmazottak
  GROUP BY osztaly
  HAVING AVG(fizetes) > 300000;`,
    tips: 'A WHERE a GROUP BY előtt szűr, a HAVING a GROUP BY után',
    relatedQuestions: ['Melyik függvény számolja a sorokat?']
  },
  
  // 6. JOIN műveletek
  {
    title: 'Táblák összekapcsolása',
    content: 'INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN műveletek. Tábla aliasok használata. Összetett JOIN feltételek. CROSS JOIN (Descartes-szorzat) és önjoin (self join).',
    examples: `-- INNER JOIN példa
  SELECT f.nev, r.datum 
  FROM felhasznalok f
  JOIN rendelesek r ON f.id = r.felhasznalo_id;
  
  -- LEFT JOIN
  SELECT f.nev, COUNT(r.id) 
  FROM felhasznalok f
  LEFT JOIN rendelesek r ON f.id = r.felhasznalo_id
  GROUP BY f.nev;`,
    tips: 'Mindig határozz meg explicit JOIN feltételt, ne használj implicit JOIN szintaxist',
    relatedQuestions: ['Melyik JOIN visszaadja mindkét tábla összes sorát?']
  },
  
  // 7. Allekérdezések
  {
    title: 'Allekérdezések (subqueries)',
    content: 'Allekérdezések használata SELECT, FROM, WHERE és HAVING záradékokban. IN, EXISTS, NOT EXISTS operátorok. Korrelált allekérdezések. Allekérdezések teljesítménybeli hatásai.',
    examples: `-- WHERE-ben használt allekérdezés
  SELECT nev FROM termekek
  WHERE ar > (SELECT AVG(ar) FROM termekek);
  
  -- EXISTS példa
  SELECT nev FROM felhasznalok f
  WHERE EXISTS (
    SELECT 1 FROM rendelesek r 
    WHERE r.felhasznalo_id = f.id
  );`,
    tips: 'Az EXISTS általában hatékonyabb mint az IN nagy adathalmazoknál',
    relatedQuestions: []
  },
  
  // 8. Set műveletek
  {
    title: 'Halmazműveletek',
    content: 'UNION, UNION ALL, INTERSECT, EXCEPT/MINUS operátorok. Halmazműveletek és JOIN-ok különbségei. Oszlopok kompatibilitása halmazműveleteknél.',
    examples: `-- UNION példa
  SELECT nev FROM aktiv_felhasznalok
  UNION
  SELECT nev FROM inaktiv_felhasznalok;
  
  -- INTERSECT (csak bizonyos adatbázisokban)
  SELECT termek_id FROM raktar_keszlet
  INTERSECT
  SELECT termek_id FROM rendelesek;`,
    tips: 'A UNION automatikusan eltávolítja a duplikátumokat, míg a UNION ALL nem',
    relatedQuestions: []
  },
  
  // 9. INSERT, UPDATE, DELETE
  {
    title: 'Adatmódosító utasítások',
    content: 'Új rekordok beszúrása (INSERT), meglévők módosítása (UPDATE), rekordok törlése (DELETE). Többsoros INSERT utasítások. RETURNING záradék (PostgreSQL) visszatérési értékhez.',
    examples: `-- INSERT példa
  INSERT INTO felhasznalok (id, nev, email)
  VALUES (1, 'Kovács Péter', 'kovacs@example.com');
  
  -- UPDATE
  UPDATE termekek 
  SET ar = ar * 1.1 
  WHERE kategoria = 'Elektronika';
  
  -- DELETE
  DELETE FROM naplo 
  WHERE datum < '2020-01-01';`,
    tips: 'Mindig használj WHERE feltételt UPDATE és DELETE parancsoknál!',
    relatedQuestions: ['Melyik utasítás módosít rekordokat?']
  },
  
  // 10. Tranzakciók
  {
    title: 'Tranzakciókezelés',
    content: 'ACID tulajdonságok. Tranzakciók kezdése (BEGIN), véglegesítése (COMMIT), visszavonása (ROLLBACK). Savepoint-ok. Tranzakciószintű izoláció (READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE).',
    examples: `-- Tranzakció példa
  BEGIN;
  UPDATE szamlak SET egyenleg = egyenleg - 100 WHERE id = 1;
  UPDATE szamlak SET egyenleg = egyenleg + 100 WHERE id = 2;
  -- Ha minden rendben
  COMMIT;
  -- Ha hiba történt
  -- ROLLBACK;`,
    tips: 'A tranzakciókat mindig a lehető legrövidebb ideig tartd nyitva',
    relatedQuestions: []
  },
  
  // 11. Indexek
  {
    title: 'Indexek és teljesítményoptimalizálás',
    content: 'Indexek típusai (B-fa, hash, full-text). Egyedi és nem egyedi indexek. Összetett indexek. Indexek létrehozása és használata. EXPLAIN parancs lekérdezések elemzésére.',
    examples: `-- Index létrehozása
  CREATE INDEX idx_felhasznalo_email ON felhasznalok(email);
  
  -- Összetett index
  CREATE INDEX idx_rendeles_datum_felh ON rendelesek(datum, felhasznalo_id);
  
  -- EXPLAIN példa
  EXPLAIN SELECT * FROM felhasznalok WHERE email LIKE '%@example.com';`,
    tips: 'Túl sok index lassítja az INSERT, UPDATE, DELETE műveleteket',
    relatedQuestions: []
  },
  
  // 12. Nézetek
  {
    title: 'Nézetek (views)',
    content: 'Nézetek létrehozása és használata. Materializált nézetek. Nézetek frissítése. Nézetek előnyei biztonsági és egyszerűsítési szempontból.',
    examples: `-- Egyszerű nézet
  CREATE VIEW aktiv_felhasznalok AS
  SELECT * FROM felhasznalok WHERE aktiv = true;
  
  -- Használat
  SELECT * FROM aktiv_felhasznalok LIMIT 10;
  
  -- Materializált nézet (PostgreSQL)
  CREATE MATERIALIZED VIEW top_vasarlok AS
  SELECT felhasznalo_id, SUM(osszeg) 
  FROM rendelesek 
  GROUP BY felhasznalo_id;`,
    tips: 'A nézetek frissülnek az alap táblák változásakor',
    relatedQuestions: []
  },
  
  // 13. Tárolt eljárások
  {
    title: 'Tárolt eljárások és függvények',
    content: 'Tárolt eljárások (stored procedures) és függvények létrehozása. Paraméterek használata. Vezérlési szerkezetek (IF, CASE, LOOP) PL/SQL-ben. Kivételkezelés tárolt eljárásokban.',
    examples: `-- MySQL tárolt eljárás
  DELIMITER //
  CREATE PROCEDURE ember_fizetes_novel(IN ember_id INT, IN noveles INT)
  BEGIN
    UPDATE alkalmazottak 
    SET fizetes = fizetes + noveles 
    WHERE id = ember_id;
  END //
  DELIMITER ;
  
  -- Használat
  CALL ember_fizetes_novel(123, 5000);`,
    tips: 'A tárolt eljárások csökkenthetik a hálózati forgalmat',
    relatedQuestions: []
  },
  
  // 14. Eseményindítók
  {
    title: 'Trigger-ek (eseményindítók)',
    content: 'Trigger-ek létrehozása és használata. BEFORE és AFTER trigger-ek. Sor- és utasítás-szintű trigger-ek. OLD és NEW rekordok elérése trigger-ben.',
    examples: `-- Trigger példa (PostgreSQL)
  CREATE OR REPLACE FUNCTION naplozas_trigger_func()
  RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO naplo(tabla, muvelet, ido)
    VALUES (TG_TABLE_NAME, TG_OP, NOW());
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
  
  CREATE TRIGGER naplozas_trigger
  AFTER INSERT OR UPDATE OR DELETE ON felhasznalok
  FOR EACH ROW EXECUTE FUNCTION naplozas_trigger_func();`,
    tips: 'A trigger-ek nehézkesen nyomon követhetők, használatukat tartsd minimálisra',
    relatedQuestions: []
  },
  
  // 15. Partícionálás
  {
    title: 'Táblapartícionálás',
    content: 'Partícionálás típusai (range, list, hash). Partícionált táblák létrehozása és kezelése. Partíciók használata nagy táblák teljesítményének javítására.',
    examples: `-- Range particionálás (PostgreSQL)
  CREATE TABLE meresek (
    id SERIAL,
    meres_ido TIMESTAMP,
    ertek DECIMAL
  ) PARTITION BY RANGE (meres_ido);
  
  -- Partíciók létrehozása
  CREATE TABLE meresek_2023_01 PARTITION OF meresek
  FOR VALUES FROM ('2023-01-01') TO ('2023-02-01');`,
    tips: 'A partícionálás különösen hatékony időalapú adatoknál',
    relatedQuestions: []
  },
  
  // 16. Teljes szöveges keresés
  {
    title: 'Full-text keresés',
    content: 'Teljes szöveges indexek létrehozása. Full-text keresési függvények (MATCH, AGAINST, tsvector, tsquery). Kiemelés (highlighting) és rangolás (ranking) eredményeknél.',
    examples: `-- Full-text index (MySQL)
  CREATE FULLTEXT INDEX idx_cikk_szoveg ON cikkek(cim, tartalom);
  
  -- Keresés
  SELECT * FROM cikkek 
  WHERE MATCH(cim, tartalom) AGAINST('adatbázis optimalizálás');
  
  -- PostgreSQL változat
  SELECT * FROM cikkek 
  WHERE to_tsvector('hungarian', cim || ' ' || tartalom) @@ to_tsquery('hungarian', 'adatbázis & optimalizálás');`,
    tips: 'A legtöbb adatbázis támogat nyelvi alapú szótövezést (stemming)',
    relatedQuestions: []
  },
  
  // 17. JSON kezelés
  {
    title: 'JSON adatok kezelése',
    content: 'JSON adattípus támogatás. JSON mezők lekérdezése, módosítása. JSON függvények (JSON_EXTRACT, JSON_OBJECT, JSON_ARRAY). Teljes értékű JSON dokumentum adatbázisok bemutatása.',
    examples: `-- JSON mező létrehozása (MySQL)
  CREATE TABLE termekek (
    id INT,
    nev VARCHAR(100),
    tulajdonsagok JSON
  );
  
  -- JSON lekérdezés
  SELECT id, nev, 
    JSON_EXTRACT(tulajdonsagok, '$.suly') AS suly
  FROM termekek
  WHERE JSON_EXTRACT(tulajdonsagok, '$.keszleten') = true;
  
  -- PostgreSQL JSONB
  SELECT * FROM termekek 
  WHERE tulajdonsagok @> '{"keszleten": true}';`,
    tips: 'A PostgreSQL JSONB típusa indexelhető és gyorsabb a JSON-nál',
    relatedQuestions: []
  },
  
  // 18. Rekurzív lekérdezések
  {
    title: 'Közös tábla kifejezések (CTE)',
    content: 'WITH záradék használata. Egyszerű és rekurzív CTE-k. Rekurzív lekérdezések alkalmazási területei (fák, gráfok bejárása). Teljesítménybeli megfontolások.',
    examples: `-- Egyszerű CTE
  WITH dragabb_termekek AS (
    SELECT * FROM termekek WHERE ar > 1000
  )
  SELECT COUNT(*) FROM dragabb_termekek;
  
  -- Rekurzív CTE (szervezeti hierarchia)
  WITH RECURSIVE alkalmazott_hierarchia AS (
    -- Alap eset
    SELECT id, nev, fonok_id, 1 AS szint
    FROM alkalmazottak WHERE id = 100
    
    UNION ALL
    
    -- Rekurzív rész
    SELECT a.id, a.nev, a.fonok_id, h.szint + 1
    FROM alkalmazottak a
    JOIN alkalmazott_hierarchia h ON a.fonok_id = h.id
  )
  SELECT * FROM alkalmazott_hierarchia;`,
    tips: 'A rekurzív CTE-nek mindig legyen termináló feltétele',
    relatedQuestions: []
  },
  
  // 19. Ablakfüggvények
  {
    title: 'Ablakfüggvények (Window functions)',
    content: 'OVER záradék használata. Részhalmazok kezelése (PARTITION BY). Rendezés az ablakban (ORDER BY). Gyakori ablakfüggvények (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, FIRST_VALUE).',
    examples: `-- Rangsorolás
  SELECT nev, fizetes,
    RANK() OVER (ORDER BY fizetes DESC) AS rang
  FROM alkalmazottak;
  
  -- Mozgóátlag
  SELECT datum, ertek,
    AVG(ertek) OVER (ORDER BY datum ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) 
    AS mozgo_atlag
  FROM meresek;`,
    tips: 'Az ablakfüggvények nem csökkentik a sorok számát mint a GROUP BY',
    relatedQuestions: []
  },
  
  // 20. Pivot táblák
  {
    title: 'Pivot táblák SQL-ben',
    content: 'CROSSTAB használata PostgreSQL-ben. PIVOT és UNPIVOT operátorok SQL Server-ben. CASE és aggregáció használata pivot táblák létrehozására.',
    examples: `-- CASE alapú pivot (több adatbázisban működik)
  SELECT 
    ev,
    SUM(CASE WHEN honap = 1 THEN osszeg END) AS jan,
    SUM(CASE WHEN honap = 2 THEN osszeg END) AS feb,
    SUM(CASE WHEN honap = 3 THEN osszeg END) AS mar
  FROM eladasok
  GROUP BY ev;
  
  -- PostgreSQL CROSSTAB
  SELECT * FROM crosstab(
    'SELECT ev, honap, osszeg FROM eladasok ORDER BY 1,2',
    'SELECT m FROM generate_series(1,12) m'
  ) AS (ev int, jan numeric, feb numeric, mar numeric, ...);`,
    tips: 'A pivot táblák dinamikus oszlopait általában alkalmazás szinten kell kezelni',
    relatedQuestions: []
  },
  
  // 21. Temporális táblák
  {
    title: 'Temporális táblák',
    content: 'Rendszeridővel ellátott (system-versioned) táblák. Adatváltozások nyomon követése. Táblák létrehozása időbeli lekérdezésekhez. SQL:2011 szabvány támogatás.',
    examples: `-- Temporális tábla létrehozása (SQL Server)
  CREATE TABLE alkalmazottak (
    id INT PRIMARY KEY,
    nev VARCHAR(100),
    pozicio VARCHAR(50),
    fizetes DECIMAL,
    SysStartTime DATETIME2 GENERATED ALWAYS AS ROW START,
    SysEndTime DATETIME2 GENERATED ALWAYS AS ROW END,
    PERIOD FOR SYSTEM_TIME (SysStartTime, SysEndTime)
  ) WITH (SYSTEM_VERSIONING = ON);
  
  -- Időbeli lekérdezés
  SELECT * FROM alkalmazottak
  FOR SYSTEM_TIME AS OF '2023-01-01';`,
    tips: 'A temporális táblák automatikusan tárolják az adatváltozások történetét',
    relatedQuestions: []
  },
  
  // 22. Adatbázis biztonság
  {
    title: 'Biztonság és jogosultságok',
    content: 'Felhasználók és szerepkörök létrehozása. Objektum szintű jogosultságok (GRANT, REVOKE). Nézetek használata biztonsági rétegként. Adattitkosítás (TDE, oszlop szintű titkosítás).',
    examples: `-- Felhasználó létrehozása
  CREATE USER uj_felhasznalo WITH PASSWORD 'titkos123';
  
  -- Jogosultság adása
  GRANT SELECT, INSERT ON felhasznalok TO uj_felhasznalo;
  
  -- Oszlop titkosítás (SQL Server)
  CREATE COLUMN MASTER KEY MyCMK
  WITH (KEY_STORE_PROVIDER_NAME = 'MSSQL_CERTIFICATE_STORE',
        KEY_PATH = 'CurrentUser/My/AAABBBCCCDDD');
  
  CREATE COLUMN ENCRYPTION KEY MyCEK
  WITH VALUES (
    COLUMN_MASTER_KEY = MyCMK,
    ALGORITHM = 'RSA_OAEP',
    ENCRYPTED_VALUE = 0x01700000016...);`,
    tips: 'A legszigorúbb jogosultság elvét (Principle of Least Privilege) mindig kövesd',
    relatedQuestions: []
  },
  
  // 23. Teljesítményhangolás
  {
    title: 'Lekérdezés optimalizálás',
    content: 'EXPLAIN ANALYZE használata. Lekérdezés tervek értelmezése. Gyakori teljesítményproblémák és megoldásaik. Statisztikák frissítése. Adatbázis konfigurációs paraméterek.',
    examples: `-- EXPLAIN ANALYZE példa (PostgreSQL)
  EXPLAIN ANALYZE 
  SELECT * FROM nagy_tabla 
  WHERE id BETWEEN 1000 AND 2000;
  
  -- Statisztika frissítés
  ANALYZE nagy_tabla;
  
  -- MySQL slow query log beállítás
  SET GLOBAL slow_query_log = 'ON';
  SET GLOBAL long_query_time = 1;`,
    tips: 'A legtöbb lassú lekérdezés rossz indexelésből vagy hiányos WHERE feltételből adódik',
    relatedQuestions: []
  },
  
  // 24. Adatbázis karbantartás
  {
    title: 'Karbantartási műveletek',
    content: 'Táblák optimalizálása (ANALYZE, VACUUM, OPTIMIZE TABLE). Indexek újraépítése. Adatbázis biztonsági mentések készítése. Partíciók karbantartása.',
    examples: `-- Tábla optimalizálás (MySQL)
  OPTIMIZE TABLE nagy_tabla;
  
  -- PostgreSQL VACUUM
  VACUUM (VERBOSE, ANALYZE) aktivitas_log;
  
  -- Biztonsági mentés (PostgreSQL pg_dump)
  pg_dump -U felhasznalo -h localhost -d adatbazis -F c -f mentes.backup`,
    tips: 'Rendszeres karbantartás nélkül az adatbázis teljesítménye romlani fog',
    relatedQuestions: []
  },
  
  // 25. NoSQL bevezető
  {
    title: 'SQL vs NoSQL',
    content: 'NoSQL adatbázisok típusai (dokumentum, kulcs-érték, oszlopcsalád, gráf). Használati területek és korlátok. Polyglot persistence megközelítés. NewSQL megoldások.',
    examples: `-- MongoDB példa (dokumentum adatbázis)
  db.felhasznalok.insertOne({
    nev: "Kovács Péter",
    email: "kovacs@example.com",
    tagsag: {
      tipus: "prémium",
      lejarat: ISODate("2023-12-31")
    }
  });
  
  -- Redis példa (kulcs-érték tároló)
  SET felhasznalo:123:nev "Kovács Péter"
  EXPIRE felhasznalo:123:nev 3600`,
    tips: 'A NoSQL nem mindig jobb mint az SQL, csak más felhasználási területekre optimalizált',
    relatedQuestions: []
  },
  
  // 26. OLAP és adattárházak
  {
    title: 'Analitikai feldolgozás',
    content: 'OLTP vs OLAP rendszerek. Csillag- és hópehely sémák. ETL folyamatok. Tény- és dimenziótáblák. Adatkockák (cubes) és MDX lekérdezések.',
    examples: `-- Tipikus csillag séma
  CREATE TABLE dim_datum (
    datum_id INT PRIMARY KEY,
    datum DATE,
    ev INT,
    negyedev INT,
    honap INT
  );
  
  CREATE TABLE fact_eladasok (
    eladas_id INT,
    datum_id INT REFERENCES dim_datum(datum_id),
    termek_id INT REFERENCES dim_termek(termek_id),
    mennyiseg INT,
    osszeg DECIMAL(10,2)
  );`,
    tips: 'Az adattárházak denormalizált struktúrája optimalizált analitikai lekérdezésekhez',
    relatedQuestions: []
  },
  
  // 27. GIS támogatás
  {
    title: 'Térinformatikai adatok',
    content: 'Geometriai adattípusok (POINT, LINESTRING, POLYGON). Térbeli függvények (ST_Distance, ST_Contains, ST_Intersects). Térbeli indexek (R-fa). PostGIS kiterjesztés.',
    examples: `-- PostGIS példa
  CREATE TABLE varosok (
    id SERIAL PRIMARY KEY,
    nev VARCHAR(100),
    hely GEOGRAPHY(POINT)
  );
  
  -- Keresés 10 km-es körben
  SELECT nev FROM varosok
  WHERE ST_DWithin(hely, 
    ST_GeogFromText('POINT(47.5 19.05)'), 
    10000);`,
    tips: 'A GEOGRAPHY típus pontosabb nagy távolságoknál mint a GEOMETRY',
    relatedQuestions: []
  },
  
  // 28. Time series adatok
  {
    title: 'Idősor adatok kezelése',
    content: 'Idősor adatok optimalizált tárolása. Partícionálás idő szerint. Gyorsító struktúrák (BRIN index). Idősor aggregációs függvények (time_bucket, date_trunc).',
    examples: `-- TimescaleDB (PostgreSQL kiterjesztés)
  CREATE TABLE meresek (
    id SERIAL,
    meres_ido TIMESTAMPTZ,
    ertek DOUBLE PRECISION
  );
  
  -- Idősor hiper táblává alakítása
  SELECT create_hypertable('meresek', 'meres_ido');
  
  -- Időintervallum szerinti aggregáció
  SELECT 
    time_bucket('1 hour', meres_ido) AS ora,
    AVG(ertek) AS atlag
  FROM meresek
  GROUP BY ora;`,
    tips: 'Az idősor adatbázisok speciális tömörítési algoritmusokat használnak',
    relatedQuestions: []
  },
  
  // 29. Graph adatbázisok
  {
    title: 'Grág adatbázis alapok',
    content: 'Csomópontok és élek modellezése. Gráf lekérdező nyelvek (Cypher, Gremlin). Gyakori gráf algoritmusok (legrövidebb út, közösségfelderítés). SQL-gráf kiterjesztések.',
    examples: `-- Cypher lekérdezés (Neo4j)
  MATCH (p:Person)-[:FRIENDS_WITH]->(friend)
  WHERE p.name = 'Anna'
  RETURN friend.name;
  
  -- PostgreSQL gráf kiterjesztés
  CREATE TABLE csomopontok (
    id SERIAL PRIMARY KEY,
    tulajdonsagok JSONB
  );
  
  CREATE TABLE elek (
    forras INT REFERENCES csomopontok(id),
    cel INT REFERENCES csomopontok(id),
    tipus VARCHAR(50)
  );`,
    tips: 'A gráf adatbázisok kiválóak összetett kapcsolatok modellezésére',
    relatedQuestions: []
  },
  
  // 30. Jövőbeli trendek
  {
    title: 'SQL jövője és új trendek',
    content: 'In-memory adatbázisok. Serverless adatbázis architektúrák. AI integráció SQL-be. Edge computing és elosztott adatbázisok. Blockchain alapú adatbázis megoldások.',
    examples: `-- AI integráció (Microsoft SQL Server)
  SELECT text, sentiment, key_phrases
  FROM OPENROWSET(
    BULK 'https://...',
    FORMAT = 'CSV',
    FIELDTERMINATOR = '0x0b',
    FIELDQUOTE = '0x0b'
  ) WITH (
    doc NVARCHAR(MAX) AS [document]
  ) AS [input]
  CROSS APPLY OPENJSON(WITH(
    sentiment FLOAT,
    key_phrases NVARCHAR(MAX) AS JSON
  ) AS [output]`,
    tips: 'A modern SQL rendszerek egyre inkább integrálódnak a felhőszolgáltatásokba',
    relatedQuestions: []
  }];

  private lessonsSubject = new BehaviorSubject<any>(this.htmlLessons);
  lessons$ = this.lessonsSubject.asObservable();

  constructor() {}

  setLessons(type: string): void {
    if (type === 'html') {
      this.lessonsSubject.next(this.htmlLessons);
    } else if (type === 'css') {
      this.lessonsSubject.next(this.cssLessons);
    } else if (type === 'javascript') {
      this.lessonsSubject.next(this.jsLessons);
    } else if (type === 'phyton') {
      this.lessonsSubject.next(this.phLesson);
    } else if (type === 'java') {
      this.lessonsSubject.next(this.javaLesson);
    } else if (type === 'sql') {
      this.lessonsSubject.next(this.sqlLesson);
    }
    
  }
}