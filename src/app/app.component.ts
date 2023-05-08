import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, set, get, update, query, orderByValue, equalTo, child, DataSnapshot } from 'firebase/database';
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
// User meldet sich an:
signInAnonymously(auth)
  .then(() => {
    // Signed in..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });

// SOBALD USER ANGEMELDET IST:
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
  const uid = user.uid;

    // ...
  } else {
    // User is signed out
    // ...
  }
});

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Titel der Anwendung
  public title = 'ChatAppStep';

  // Gesamte Nachrichtengeschichte
  public messageHistory = '';

  // Benutzername des Benutzers
  public nickname = '';

  // Realtime Database reference to the chat history
  private chatHistoryRef = ref(db, 'chatHistory');

  // Realtime Database reference to the nicknames
  private nicknamesRef = ref(db, 'nicknames');

  constructor() {
    // Listen for changes in the chat history
    onValue(this.chatHistoryRef, (snapshot) => {
      const data = snapshot.val();
      // Update the messageHistory with the latest chat history
      if (data) {
        // Extract the values of the object into an array
        const messages = Object.values(data);
        // Join the messages with a newline character
        this.messageHistory = messages.join('\n');
      } else {
        this.messageHistory = 'Bisher wurden noch keine Nachrichten versendet.';
      }
    });
  }

  // Methode zur Behandlung der Benutzername-Erstellung
  public async nicknameCreated(nickname: string): Promise<void> {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const userRef = ref(getDatabase(), `users/${uid}/nicknames`);
  
      // Get the current count of nicknames for the user
      const snapshot = await get(userRef);
      let nicknameCount = 0;
      snapshot.forEach(() => {
        nicknameCount++;
      });
  
      // Save the new nickname with an incremented number as the key
      await set(child(userRef, `nickname${nicknameCount + 1}`), nickname);
  
      console.log(`Saved nickname "${nickname} with ID "nickname${nicknameCount+1}"`);
    }
    this.nickname = nickname;
  }

  // Methode zur Behandlung des Absendens der Nachricht
  public messageSubmitted(message: string): void {
    push(this.chatHistoryRef, `${message}`);
  }

}
