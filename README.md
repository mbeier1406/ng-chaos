# Chaos Web Application

Eine Web-Anwendung basierend auf Angular.
Siehe auch das [Angular.de Tutorial](https://angular.de/artikel/angular-tutorial-deutsch/).

## Technologie-Stack

- Lunux Ubuntu 24.04
- **Node Version Manager (nvm) v0.40.3**
- **Node.js (node) v24.12.0**
- **Node Package Manager (npm) v11.6.2**
- **Angular (ng) v21.0.4**
- **TypeScript Version (npx) 11.6.2**
- **json-server v1.0.0-beta.3**

## Installation

```bash
# NVM installieren
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Terminal neu laden
$ source ~/.bashrc

# Node.js 24 installieren (kompatibel mit Angular 21)
$ nvm install 24

# Verwendete Version festlegen
$ nvm use 24

# Versionen prüfen
$ node --version
$ npm --version

$ npm list --global --depth=0
/home/mbeier/.nvm/versions/node/v24.12.0/lib
├── @angular/cli@21.0.4
├── bookmonkey-api@3.2.0
├── corepack@0.34.5
├── json-server@1.0.0-beta.3
└── npm@11.6.2
```

**Alternative mit wget:**

```bash
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

**Vorteile von NVM:**
- Einfaches Wechseln zwischen Node.js-Versionen
- Keine sudo-Rechte für npm-Pakete nötig

**Installation Angular**

Benötigt wird die Angular CLI:

```bash
# Angular CLI global installieren
$ npm install -g @angular/cli@21

# Angular Version prüfen
$ ng version
```

TypeScript und RxJS werden automatisch als Projekt-Dependencies installiert, wenn ein neues Angular-Projekt erstellt wird:

```bash
$ ng new ng-chaos

# Während der Erstellung wird gefragt:
# - Would you like to add Angular routing? (Empfehlung: Yes)
# - Which stylesheet format would you like to use? (z.B. CSS, SCSS, SASS)

# In das Projektverzeichnis wechseln
$ cd ng-chaos

# Entwicklungsserver starten
$ ng serve

# Die App läuft dann auf: http://localhost:4200
```

Laut dem [Angular.de Tutorial](https://angular.de/artikel/angular-tutorial-deutsch/) werden dabei automatisch die richtigen Versionen von TypeScript (>=5.8.0 <5.9.0) und RxJS (^6.5.3 oder ^7.4.0) als Projekt-Dependencies installiert.

## Projektentwicklung

Projekt anlegen und Dependencies laden:

```bash
$ ng new --interactive ng-chaos
$ npm install
```

Anlegen von Komponenten, Interfaces usw.

```bash
# Komponent anlegen mit:
# - selector: Name unter dem Angular die Komponente in anderen Vorlagen adressiert.
# - imports: Abhängikeiten der Komponente zu anderen Funktionen, Komponenten usw.
# - template: Das HTML und Layout der Komponente.
# - styleUrls: Die URLs der CSS Dateien, die die Komponente verwendet.
# Beispiel src/app/home
$ ng generate component NAME

# Interfaces/Datenstrukturen anlegen
# Beispiel src/app/housinglocation.ts
# Service, der die Daten liefert: src/app/housing.service.ts
# Komponente, die die Daten liest und an die konsumierende Komponente bindet: src/app/home/home.ts
# Komponente, die die Daten konsumiert und als Tabelle anzeigt (Interpolation): src/app/housing-location/housing-location.ts
$ ng generate interface NAME

# Service, der Daten bereitstellt anlegen
# Beispiel: src/app/housing.service.ts
$ ng generate service NAME --skip-tests

# Routen anlegen, um zwischen verschiedenen Komponenten zu navigieren
$ cat src/app/routes.ts

# Formular mit Schaltfläche anlegen
$ cat src/app/details/details.ts

# http Service erstellen, der Zugriff auf eine Datenbank erlaubt
# Service, der die Daten asynchron abruft: src/app/housing.service.ts
# Komponente, die den Service benutzt: src/app/home/home.ts
# Datenbank anlegen
$ cat db.json
# JSON-Server anlegen
$ npm install --global json-server
# JSON-Server starten und testen
$ json-server --watch db.json
$ curl http://localhost:3000/locations?id=1
```
