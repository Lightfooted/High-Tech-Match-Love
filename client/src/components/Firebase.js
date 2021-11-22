import * as firebase from 'firebase';

const firebaseConfig = {
    projectId: 'html-chat-6985a', 
    apiKey: 'AIzaSyDH3S1UMiD9gU62hsWtoqrRMXAMnEtt0OY',
    databaseURL: 'https://html-chat-6985a-default-rtdb.firebaseio.com'
  };
  firebase.initializeApp(firebaseConfig);

  firebase.firestore().settings({});
  
  export default firebase;