Garden Planner

Ein interaktiver Planer, mit dem du dein Gemüse- bzw. Nutzgarten-Beet monatlich planen und verwalten kannst. Du kannst Beete anlegen, Pflanzen definieren, Anbau- und Erntemonate festlegen und daraus automatisch Aufgaben generieren.
Das ist mein erstes vibe-coded Projekt, für mich zum üben aber auch weil ich diesen Gemüseplaner brauche. 

🚀 Features

Visuelle Beetplanung (Pflanzen platzieren & bearbeiten)

Pflanzendaten verwalten (Anbau- & Erntemonate, Platzbedarf, Pflegehinweise)

Automatische Aufgaben (Säen, Pflege, Ernte) basierend auf Wachstum

Export als Kalender-ICS möglich

Einfach über einen Browser nutzbar

📦 Installation

Voraussetzungen: Docker & Docker Compose

Repository klonen

git clone https://github.com/franzidecker/Garden_planner.git
cd Garden_planner

Anwendung starten

docker compose up -d

Öffne deinen Browser und gehe zu
http://localhost:8080

🧠 Architektur

Frontend: Einfache HTML/JS-Oberfläche (gartenplaner.html) für die Interaktion

Backend: Node.js-Server (server.js) stellt API und Daten-Speicherung bereit

Persistenz: JSON-Datei im Ordner /data

📁 API Endpunkte

GET /api/data – Liefert den aktuellen Garten-Status

POST /api/data – Speichert neue Garten-Daten

🛠️ Entwicklung & Beiträge

Beiträge willkommen!

Fork → 2. Feature-Branch → 3. Pull Request
Bitte Issues öffnen für Bugs oder Feature-Requests.
