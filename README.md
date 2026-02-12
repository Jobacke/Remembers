# 🎙️ Sprachnotizen App

Eine cloudbasierte Web-App zum Aufnehmen, Organisieren und Abrufen von Sprachnotizen.

## Features

- 🎙️ Einfache Sprachaufnahme per Knopfdruck
- 📂 Kategorien/Bereiche zur Organisation
- 🔍 Suche und Filterung nach Bereichen
- ☁️ Cloud-Speicherung via Firebase
- 📱 PWA-fähig für iOS (Add to Home Screen)
- 🔐 Google Sign-In Authentifizierung

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JS (gehostet auf GitHub Pages)
- **Backend:** Firebase (Auth, Firestore, Storage)
- **Hosting:** GitHub Pages mit Custom Domain

---

## 🚀 Firebase-Einrichtung

### 1. Firebase-Projekt erstellen

1. Gehe zu [Firebase Console](https://console.firebase.google.com/)
2. Klicke auf **„Projekt hinzufügen"**
3. Gib einen Projektnamen ein (z.B. „Sprachnotizen")
4. Google Analytics kann deaktiviert werden
5. Klicke auf **„Projekt erstellen"**

### 2. Web-App hinzufügen

1. Im Firebase-Projekt auf das **Web-Symbol** (`</>`) klicken
2. App-Name eingeben (z.B. „Sprachnotizen Web")
3. Firebase SDK-Konfiguration kopieren
4. Die Werte in `js/config.js` eintragen:

```javascript
export const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "dein-projekt.firebaseapp.com",
  projectId: "dein-projekt-id",
  storageBucket: "dein-projekt.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 3. Google-Anmeldung aktivieren

1. In Firebase Console → **Authentication** → **Anmeldemethode**
2. **Google** aktivieren
3. Support-E-Mail-Adresse eingeben
4. Unter **Autorisierte Domains**: deine Custom Domain hinzufügen (`notizen.vjbackhaus.de`)

### 4. Firestore-Datenbank erstellen

1. Firebase Console → **Firestore Database** → **Datenbank erstellen**
2. **Produktionsmodus** wählen
3. Region wählen (z.B. `europe-west3` für Frankfurt)
4. Unter **Regeln** folgende Sicherheitsregeln eintragen:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Firebase Storage aktivieren

1. Firebase Console → **Storage** → **Jetzt starten**
2. **Produktionsmodus** wählen
3. Region wählen (gleiche wie Firestore)
4. Unter **Rules** folgende Regeln eintragen:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 6. Custom Domain konfigurieren

1. GitHub Pages aktivieren (Settings → Pages → Source: GitHub Actions)
2. Custom Domain eintragen: `notizen.vjbackhaus.de`
3. DNS-Eintrag beim Domain-Anbieter setzen:
   - **Typ:** CNAME
   - **Host/Name:** `notizen`
   - **Ziel/Value:** `dein-github-username.github.io`
4. In Firebase Auth → **Autorisierte Domains**: `notizen.vjbackhaus.de` hinzufügen

---

## 📱 iOS Installation (Add to Home Screen)

1. Safari öffnen → `notizen.vjbackhaus.de`
2. Teilen-Button (📤) antippen
3. **„Zum Home-Bildschirm"** wählen
4. Name bestätigen und **„Hinzufügen"**

Die App läuft dann im Vollbildmodus wie eine native App.

---

## 🛡️ Sicherheit

- Jeder Benutzer kann nur auf seine eigenen Daten zugreifen
- Audio-Dateien sind in Firebase Storage geschützt
- Authentifizierung über Google OAuth 2.0
