import { Component, EventEmitter, Input, Output } from '@angular/core';
import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, set } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLm6nzB_PQUKDG6LjT7UybuE6m6I1h770",
  authDomain: "chatapp-95178.firebaseapp.com",
  databaseURL: "https://chatapp-95178-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatapp-95178",
  storageBucket: "chatapp-95178.appspot.com",
  messagingSenderId: "434978678153",
  appId: "1:434978678153:web:f50b772befdaddbe58ed58"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css'],
})
export class ChatBarComponent {
  @Input() nickname = '';
  @Output() submitMessage = new EventEmitter<string>();

  public chatMessage = '';
  public errorMessage = '';
  public lastDate = '';
  public history = '';
  public lastUser = '';
  public lastSentDate = '';

  constructor() {
    onValue(ref(db, '/globalDate'), (snapshot) => {
      this.lastDate = snapshot.val();
    });
  }

  public addMessage(message: string): void {

    // Überprüfen, ob die Nachricht nur aus Leerzeichen besteht
    if (!message.trim()) {
      alert ('Bitte einen Text eingeben!');
      this.chatMessage = '';
      return;
    }

    // Überprüfen, ob der Benutzer einen Benutzernamen eingegeben hat
    if (!this.nickname) {
      this.errorMessage = 'Bitte geben Sie einen Benutzernamen ein!';
      this.chatMessage = '';
      return;
    }

    // Überprüfen, ob der Benutzer einen Benutzernamen eingegeben hat
    else if (this.nickname.length>12) {
      this.errorMessage = 'Bitte geben Sie einen kürzeren Benutzernamen ein!';
      this.chatMessage = '';
      return;
    }

    // Datum und Zeit des Absendens der Nachricht festlegen
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    let displayDate = false;
    
    onValue(ref(db, 'globalDate'), (snapshot) => {
      const globalDate = snapshot.val();
      if (formattedCurrentDate !== globalDate) {
        displayDate = true;
        const globalDateRef = ref(db, 'globalDate');
        set(globalDateRef, formattedCurrentDate);
        console.log(`Current Date used is "${formattedCurrentDate}`);
        }
      });

      let messageToSend = '';
      const timestamp = currentDate.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});

      if (displayDate) {
        messageToSend += `<strong>${formattedCurrentDate}</strong><br>`;
      }

      messageToSend += `${timestamp} - <strong>${this.nickname}:</strong> ${message}<br>`;
      this.history += messageToSend;


    // Nachricht absenden
      this.submitMessage.emit(messageToSend);
      this.chatMessage = '';
      this.errorMessage = '';
    
  }
}