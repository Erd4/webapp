import { Component, EventEmitter, Output } from '@angular/core';
import BadWordsFilter from 'bad-words';

@Component({
  selector: 'app-nickname',
  templateUrl: './nickname.component.html',
  styleUrls: ['./nickname.component.css'],
})
export class NicknameComponent {
  // Event-Output zum Übergeben des Benutzernamens an das übergeordnete Komponente
  @Output() public nicknameCreate = new EventEmitter<string>();

  // Eigenschaften der Komponente
  public nickname = '';
  public message = '';
  public inputVisible = true;

  public createNickname(): void {
    // Leerzeichen aus dem eingegebenen Benutzernamen entfernen
    const trimmedNickname = this.nickname.trim();
    const filter = new BadWordsFilter();
  
    if (trimmedNickname.length === 0) {
      // Fehlermeldung anzeigen, wenn kein Name eingegeben wurde
      this.message = 'Bitte einen Benutzernamen eingeben!';
      this.inputVisible = false;
      return;
    }
    else if (filter.isProfane(trimmedNickname)) { // Hinzufügen einer Bedingung zur Überprüfung auf Schimpfwörter
      // Fehlermeldung anzeigen, wenn ein Schimpfwort eingegeben wurde
      this.message = 'Bitte verwenden Sie keine Fluchwörter.';
      this.inputVisible = false;
      return;
    } 

    // Überprüfen, ob der Benutzername kürzer als 12 Zeichen ist
    else if (this.nickname.length>12) {
      this.message = 'Bitte geben Sie einen kürzeren Benutzernamen ein!';
      this.inputVisible = false;
      return;
        }

    else {
      // Benutzername an das übergeordnete Komponente übergeben
      this.nicknameCreate.emit(trimmedNickname);
  
      // Erfolgsmeldung anzeigen
      this.message = `Ihr Benutzername lautet: '${trimmedNickname}'. \n Sie können jetzt chatten.`;
      this.inputVisible = false;
  
      // Eingabefeld für den Benutzernamen leeren
      this.nickname = '';
    }
  }
  
  // Funktion zum Löschen des Benutzernamens
  public clearNickname(): void {
    this.nickname = '';
  }

  public changeNickname(): void {
    this.inputVisible = true;
  }

}
function isProfane(trimmedNickname: string) {
  throw new Error('Function not implemented.');
}

