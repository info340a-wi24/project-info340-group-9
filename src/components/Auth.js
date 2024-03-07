import { getAuth, EmailAuthProvider } from 'firebase/auth'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'; //install option 1

const firebaseConfig = {
    apiKey: "AIzaSyAFUN8dupzLJDV9AtR6-eeRaTDCjfKk5rE",
    authDomain: "info-340-uw-wiki.firebaseapp.com",
    databaseURL: "https://info-340-uw-wiki-default-rtdb.firebaseio.com",
    projectId: "info-340-uw-wiki",
    storageBucket: "info-340-uw-wiki.appspot.com",
    messagingSenderId: "724734448765",
    appId: "1:724734448765:web:51bc05fc274b0028fd0d14"
  };

export function MySignInScreen() {

    const auth = getAuth(); //access the "authenticator"
  
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
      </div>
    );
  }