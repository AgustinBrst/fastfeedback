import firebase from './firebase'
import { User } from '../types/user'

export class Auth {
  static async signInWithGithub(): Promise<User | null> {
    const response = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())

    const { user } = response

    if (user) {
      return {
        email: user.email,
      }
    }

    return null
  }

  static async signOut(): Promise<void> {
    await firebase.auth().signOut()
  }

  static onAuthStateChange(callback: (value: User | null) => void) {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback({
          email: user.email,
        })
      }

      return null
    })

    return () => unsubscribe()
  }
}
