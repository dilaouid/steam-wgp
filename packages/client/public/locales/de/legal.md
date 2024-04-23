# Rechtliche Hinweise

## Allgemeine Informationen

**Hauptverantwortlicher**: Diyaeddine LAOUID  
**Projekttyp**: Open-Source-Projekt unter der GPLv3-Lizenz  
**Entwicklungs- und Hosting-Plattform**: GitHub  
**Projekt-URL**: [GitHub SteamWGP](https://github.com/dilaouid/steam-wgp)

## Beschreibung des Dienstes

SteamWGP ist ein Open-Source-Projekt, das darauf abzielt, Steam-Nutzern die Anmeldung über OpenID mit ihren Steam-Konten zu ermöglichen. Das Projekt erleichtert die Aggregation und Nutzung von Benutzerkontoinformationen wie Spitznamen, Profil-URLs, Avataren, digitalen IDs und Spielebibliotheken. SteamWGP ist nicht mit Steam oder Valve Corporation oder einer anderen Drittpartei verbunden.

### Datenerhebung

Das Projekt sammelt die folgenden Informationen:

- **Steam-Spitzname**: Wird verwendet, um Benutzer auf der Plattform zu identifizieren.
- **Profil-URL**: Öffentlich zugänglich und wird verwendet, um zum Steam-Profil weiterzuleiten.
- **Avatar-Hash**: Wird verwendet, um das Avatarbild des Benutzers anzuzeigen.
- **Steam digitale ID**: Dient als eindeutige Kennung für jeden Benutzer.
- **Spielebibliothek**:
  - Wenn öffentlich, werden alle Spiele gesammelt, um eine effektive Teilnahme an "Steamders" zu ermöglichen.
  - Wenn privat, werden keine Spiele gesammelt, was die Nützlichkeit der Plattform für den betroffenen Benutzer einschränkt.
  - Spiele bleiben in unserer Datenbank gespeichert, auch wenn die Bibliothek eines Benutzers nach deren Erfassung privat wird, selbst wenn der Benutzer sein Konto löscht oder das Konto gesperrt oder gesperrt wird. Ebenso bleibt ein Spiel in unserer Datenbank gespeichert, auch wenn ein Benutzer ein Spiel aus seiner Bibliothek löscht. Spiele werden verwendet, um gemeinsame Spiele zwischen den Benutzern zu identifizieren und die Suche nach Spielpartnern zu erleichtern.

### Funktionalität der Steamders

"Steamders" sind virtuelle Räume, in denen sich Spieler versammeln können, um gemeinsam zu entscheiden, welches Spiel sie spielen möchten. Das System kann Multiplayer-Spiele abrufen, die allen Spielern eines Steamders gemeinsam sind, oder alle Multiplayer-Spiele der Teilnehmer.

### Datenverwaltung

- Daten, die sich auf Steamders beziehen, werden auf unbestimmte Zeit in der Datenbank gespeichert.
- Informationen über die Teilnehmer eines Steamders werden gelöscht, sobald dieser abgeschlossen ist, mit Ausnahme der ausgewählten Spiele und der dauerhaften Informationen über den Steamder selbst.

### Löschung von Daten

Benutzer können ihr Konto jederzeit löschen, was zur Löschung aller ihrer Daten führt, einschließlich ihrer in der Datenbank gespeicherten Spielebibliothek. Sobald ein Konto gelöscht wird, kann es vom Benutzer jedoch erst nach **zwei Tagen** wiederhergestellt werden. Dies soll den Missbrauch von Serverressourcen bei der Synchronisation von Steam-Daten verhindern.

## Nutzungsrechte

Da das Projekt unter der GPLv3-Lizenz steht, ist der Verkauf verboten. Jegliche direkte kommerzielle Nutzung dieses Projekts ist strengstens untersagt. Dieses Projekt ist strikt nicht-kommerziell: Es ist kostenlos, enthält keine Werbung und verwendet keine Tracking-Cookies, mit Ausnahme von JWT-Tokens zur Authentifizierung der Benutzer. Es ist jedoch möglich, Spenden zur Unterstützung des Projektleiters zu leisten, ohne direkte Gegenleistung.

## Lizenz

Dieses Projekt wird unter der [GNU General Public License v3 (GPLv3)](https://www.gnu.org/licenses/gpl-3.0.html) veröffentlicht, die den Benutzern die Freiheit garantiert, die Software zu teilen und zu modifizieren, solange alle modifizierten Kopien ebenfalls unter derselben Lizenz geteilt werden.

## Verantwortlichkeiten

Der Projektleiter kann nicht für Dienstunterbrechungen oder Datenverluste verantwortlich gemacht werden.

 Die Benutzer nutzen den Dienst auf eigenes Risiko. Die Zuverlässigkeit der über Steam abgerufenen Daten und deren Integrität werden vom Projektleiter nicht garantiert.

---

Diese rechtlichen Hinweise sollen eine vollständige Transparenz über die Funktionsweise des Projekts und seine Auswirkungen auf die Benutzer bieten. Bei weiteren Fragen oder Bedenken wenden Sie sich bitte an den Projektleiter über die auf der GitHub-Projektseite angegebenen Kommunikationskanäle.
