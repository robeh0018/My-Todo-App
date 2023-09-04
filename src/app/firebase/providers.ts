import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {FirebaseAuth} from "./firebase.config";

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(FirebaseAuth, googleProvider);

    // @ts-ignore
    const {user, _tokenResponse} = res;

    const {email, displayName, uid} = user;

    return {
      email,
      displayName,
      uid,
      _idToken: _tokenResponse.idToken
    }

  } catch (e) {
    return {
      errorMessage: e,
    }
  }
}
