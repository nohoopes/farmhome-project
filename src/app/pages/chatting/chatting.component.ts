import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { ref, child, get } from 'firebase/database';

const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: 'https://farmhomemessage-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
//const app = firebase.initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
//const database = getDatabase(app);

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['../../scss/index.scss'],
})
export class ChattingComponent {
  constructor() {}

  ngOnInit(): void {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `messages/9`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
