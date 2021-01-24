import firebase from '../lib/firebase'
import { User } from '../types/user'

enum Collection {
  users = 'users',
}

export class Database {
  static async createUser(user: User): Promise<void> {
    await firebase
      .firestore()
      .collection(Collection.users)
      .doc(user.uid)
      .set(user)
  }
}
