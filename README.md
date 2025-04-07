# Felhő alapú elosztott rendszerek laboratórium,  4-5. labor


## 1. Bevezetés

Ebben a feladatban egy webes alkalmazás megvalósítását végeztük el OpenShiftes környezetben. Ehhez egy többrétegű szoftvert kellett megvalósítani, amit aztán a GitHub segítségével deploy-olunk a felhős környezetünkbe.

Az alkalmazás célja, hogy a felhasználók autentikáció után kezelni tudják a feltöltött fényképeiket egy saját profilban, feltölthessenek, törölhessenek és rendezhessenek képeket saját tetszés szerint.

## 2. Felhasznált eszközök

Többrétegű alkalmazás lévén a webes applikáció 3 részre bontható. A legalsó szinten egy <ins>adatbázis</ins> található, melynek feladata a felhasználók által feltöltött és megadott információk perzisztens tárolása. Ehhez MySQL relációs adatbázist használtunk.

A középső, második szinten a <ins>backend</ins> található. A réteg feladata, hogy a beérkező HTTP kéréseket kezelje, a szükséges adatokat elérje az adatbázisból, azokat feldolgozza és az adatokat – akár aggregálva, átalakítva -  tovább küldje a harmadik réteg felé. Ehhez Java programozási nyelvet választottunk Spring keretrendszerrel. Ez a réteg további 3 rétegre bomlik. Az adatbázissal való kapcsolatot és az SQL lekérdezések létrehozásában a <ins>repository</ins> réteg felel. Ezen réteggel a <ins>service</ins> réteg kommunikál, amely az üzleti logikát tartalmazza. Itt történik meg az adatbázisból lekért adatot átdolgozása, szűrése, aggregálása és szükség szerint számolt adatok létrehozása. Az utolsó réteg a <ins>kontroller</ins> réteg, amely feladata a frontend réteggel történő kommunikáció. Ezen rétegbeli osztályok feladata a megfelelő endpointok definiálása, a beérkező kérések fogadása illetve a feldolgozott, visszaküldendő adatok továbbítása.

Az utolsó a <ins>frontend</ins>, melynek feladata a felhasználók kéréseinek kezelése, az azokhoz szükséges API hívások indítása és az eredményük eltárolása, valamint igény szerint a formok validációja.  Ennél Angulart választottuk TypeScript nyelv segítségével. A felhős technológiák közül az OpenShiftre esett a választás.

Az adatbázis sémát <ins>Spring JPA</ins>-val valósítottuk meg, amely Java osztályokat képes adatbázis táblákká alakítani. Minden osztály megfeleltethető egy táblának, a bennük lévő mezők pedig javarészt egy-egy oszlopot reprezentálnak. Az SQL-es BLOB Spring JPA-s megfelelőjét a @Lob annotációval tudjuk elérni és használni.

Méretét a @Column annotáció length attribútumának beállításával tudjuk megadni. Az adatbázissal történő kommunikációt is a JPA könyvtár biztosítja. Ennek segítségével a backenden interface típusok hozhatók létre, amelybe különböző metódusokat definiálhatunk. Ezen függvények elnevezését a könyvtár feldolgozza, és a háttérben, a programozó számára teljesen transzparens módon hozzárendel egy adatbázis lekérdezést, amely nagyban megkönnyíti a fejlesztést. Alapvetően is támogat néhány műveletet, mint például az id alapján történő keresést, törlést és az összes elem lekérdezését egy táblán belül.

Biztonság terén a <ins>Spring Security</ins>-t választottuk. Elsődleges alkalmazása, hogy az endpointokat csak bejelentkezett felhasználók érhessék el. Ezt úgy éri el, hogy regisztráció után, amikor a felhasználó belép elküldi az adatait a backendnek. A backend egy előre definiált titkos kulccsal, ami környezeti változóként van tárolva összehash-eli a felhasználó adataival, amiből egy token keletkezik. Ezt a tokent visszaküldi a felhasználónak a backend, majd a további API hívásoknál ezt fejlécben mindig elküldi. A backend innen tudhatja, hogy egy valós, bejelentkezett felhasználóval van dolga, és kiszolgálja a kérést. Ellenkező esetben ez nem történik meg.

Az alkalmazás fejlesztéséhez használtuk még a <ins>Lombok</ins> könyvtárat is. Ez a tipikus Java nyelv adottságaihoz köthető boilerplate kódok mennyiségét redukálja. Ilyennek nevezik azokat a kódrészeket, amelyek sok osztálynál ismétlődnek anélkül, hogy üzleti szempontból nagyobb jelentőségük lenne. Példaként említhetők a getterek és a setterek, amelyek minden osztálynál ugyanolyan struktúrát vesznek fel: egyszerűen visszaadják vagy beállítják az adott változó értékét. Konstruktorokat is létre lehet vele hozni, equals és hash code metódusokat is, amelyek az egyenlőség vizsgálatnál játszanak fontos szerepet. Builder mintát is lehet vele alkalmazni, amely egy külön tervezési mintára épít és az objektumok inicializálásánál hasznosak a konstruktorok helyett, amiket úgyszintén ki tud váltani a könyvtár. Mindezt fordítási időben szúrja be a lefordított bájtkódba.

## 3. Adatszerkezet

A feladat megvalósításához két adatbázis táblát használtunk. Az első a <ins>user_entity</ins> nevű tábla, amelyben a felhasználó adatait tároljuk. Ezek az emailje, jelszava és egy azonosító, amely alapján egyértelműen azonosítható a felhasználó. Az email cím is használható erre, mivel két azonos emaillel rendelkező felhasználó nem engedélyezett. Ezeken felül a felhasználó által feltöltött képeknek is van egy tárolója, ami egy egy-több kapcsolatot reprezentál adatbázis szinten. Egy felhasználóhoz több kép is tartozhat, de egy képhez csak egy felhasználó. A második tábla a <ins>photo_entity</ins>, ebben a képhez tartozó információkat mentjük el. Egy fényképhez tartozik egy azonosító, egy név, egy feltöltési dátum, illetve maga a kép információját hordozó bájt tömb. Ez utóbbinak adatbázis szintű reprezentációja egy Blob, ami Binary Large Objectet rövidít. Célja, hogy nagy adatmennyiséget lehessen bájt formátumban eltárolni benne.

## 4. Üzembehelyezés

Az alkalmazás OpenShift platformban egy projekt egy namespace alatt került deploy-olásra 3 különálló pod-ként. Ezen pod-ok az alkalmazás különböző rétegeit is jelentik. Adatbázis szinten egy MySQL pod – pod-on belül konténerrel rendelkezünk. Szolgáltatási réteg szintjén a Java & Spring Boot és Security alkalmazásunkat helyeztük üzembe. Végül megjelenítési rétegünkben egy Angular frontend alkalmazást deployoltunk.

Az adatbázishoz tartozó Image-t az OpenShift biztosítja egy sablon alapján. A sablon használatakor környezeti változókban megadhatjuk az adatbázishoz egyéb konfigurációs elemét. Ilyen például, a kezdetleges adatbázis létrehozása (MYSQL_DATABASE) vagy root jelszó megadása (MYSQL_ROOT_PASSWORD). Az adatbázis a 3306-os porton és mysql-img host-on keresztül érhető el.

A backendhez tartozó Image-t az OpenShift szintén biztosítja, amikor GitHub repository-ból importáljuk a backend projektünket. Számos környezeti változót szerveztünk ki itt is. Ilyen például az adatbázis szerver eléréséhez tartozó adatok (DB_SERVER, DB_PORT, DB_NAME, DB_USERNAME), illetve a frontend felismeréséhez szükséges adatok (FRONTEND_SERVER, FRONTEND_PORT). A backend alkalmazás a 8080-os porton és OpenShift által létrehozott backend route-on (photo-album-backend-mgondocs_dev.apps.rm3.7wse.p1.openshiftapps.com) keresztül érhető el.

A frontend alkalmazásunkat egy OpenShift Github Repository-ból fork-oltuk, melyben szintén biztosítva volt az Image létrehozása Containerfile alapján. Itt egyedül a backend host elérésének útvonalát (url-jét) adtuk meg környezeti változóban. Az alkalmazás a 4200-as porton és az OpenShift által létrehozott frontend route-on (photo-album-frontend-...com) keresztül érhető el.

A folyamatos fejlesztés érdekében létrehoztunk Webhook-okat mind a backend és frontend projektet illetően.