import {AuthApiResponse} from "../store/auth.effects";
import {authenticationSuccessAction} from "../store/auth.actions";
import {User} from "../user.model";

export const handleAuthentication = (apiRes: AuthApiResponse) => {

  const {email, idToken, localId, expiresIn} = apiRes;

  const user: User = {
    uid: localId,
    _idToken: idToken,
    email: email,
    _tokenExpirationTime: expiresIn,
  };

  localStorage.setItem('userAuthenticated', JSON.stringify(user));
  return authenticationSuccessAction({payload: user})
}
