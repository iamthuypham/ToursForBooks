import React, { Component } from 'react'
import SERVER_URI from '../config'
import firebase from 'firebase'

const api = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_PROJECT_ID + '.firebaseapp.com',
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET
}

firebase.initializeApp(api)

class AdminPage extends Component {
  state = {
    auth: null,
    isSavedAndAddAnother: false,
    uiConfig: {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      signInSuccessUrl: '/admin',
      // We will display Google and Facebook as auth providers.
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    }
  }
  addTour = () => {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(idToken => {
        fetch(`${SERVER_URI}/addTour`, {
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ idToken })
        }).then(res => {
          if (res.status === 200) {
            this.setState({ isSavedAndAddAnother: true })
          }
        })
      })
      .catch(error => console.log('Cannot get token', error))
  }
  render() {
    const { isSavedAndAddAnother } = this.state
    return (
      <div>
        {isSavedAndAddAnother && <h6>New Tour is created!</h6>}
        <button onClick={this.addTour}>Add Tour</button>
      </div>
    )
  }
}

export default AdminPage
