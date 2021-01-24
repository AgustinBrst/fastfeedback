import firebase from '../lib/firebase'
import { User } from '../types/user'

export class Auth {
  static async signInWithGithub(): Promise<User | null> {
    const { user } = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())

    return user ? getUserFromFirebaseUser(user) : null
  }

  static async signOut(): Promise<void> {
    await firebase.auth().signOut()
  }

  static onAuthStateChange(callback: (value: User | null) => void) {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      callback(user ? getUserFromFirebaseUser(user) : null)
    })

    return () => unsubscribe()
  }
}

function getUserFromFirebaseUser(user: firebase.User): User {
  return {
    email: user.email,
    uid: user.uid,
    displayName: user.displayName,
    providerId: user.providerData[0]?.providerId ?? null,
    photoUrl: user.photoURL,
  }
}
