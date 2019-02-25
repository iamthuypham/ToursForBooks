import React, { Component } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'

class SignInPage extends Component {
  state = {
    isAuthenticated: false,
    auth: null,
    uiConfig: {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      signInSuccessUrl: '/admin',
      // We will display Google and Facebook as auth providers.
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    }
  }
  componentDidMount() {
    // const token = firebase.auth().currentUser.getIdToken()
    // console.log(token)
  }
  render() {
    return (
      <div>
        <StyledFirebaseAuth
          uiConfig={this.state.uiConfig}
          firebaseAuth={firebase.auth()}
        />
        <button onClick={() => firebase.auth().signOut()}>Log out</button>
      </div>
    )
  }
}

export default SignInPage
