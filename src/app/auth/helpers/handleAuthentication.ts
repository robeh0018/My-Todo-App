import {AuthApiResponse} from "../store/auth.effects";
import {authenticationSuccessAction} from "../store/auth.actions";

export const handleAuthentication = (apiRes: AuthApiResponse) => {

  const {email, idToken, localId, expiresIn} = apiRes;


  return authenticationSuccessAction({
    payload: {
      userName: '',
      uid: localId,
      _idToken: idToken,
      email: email,
      _tokenExpirationTime: expiresIn,
    }
  })
}
