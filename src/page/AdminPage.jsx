import React, { Component } from 'react'
import SERVER_URI from '../config'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'
import SignInPage from './SignInPage'

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
    isAuthenticated: !!firebase.auth().currentUser,
    isSavedAndAddAnother: false
  }
  handleSignOut = () => {
    firebase.auth().signOut()
    window.localStorage.clear()
    this.setState({ isAuthenticated: false })
  }
  addTour = () => {
    if (!this.state.isAuthenticated) {
      return
    }
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

  handleSignInSuccess = () => {
    this.setState({ isAuthenticated: true })
  }

  render() {
    const { isSavedAndAddAnother, isAuthenticated } = this.state
    console.log(this.props)
    return (
      <div>
        {!isAuthenticated ? (
          <SignInPage signInSuccess={this.handleSignInSuccess} />
        ) : (
          <>
            {isSavedAndAddAnother && <h6>New Tour is created!</h6>}
            <Button onClick={this.addTour} disabled={!isAuthenticated}>
              Add Tour
            </Button>
            <Button onClick={this.handleSignOut} disabled={!isAuthenticated}>
              Sign Out
            </Button>
          </>
        )}
      </div>
    )
  }
}

export default AdminPage
