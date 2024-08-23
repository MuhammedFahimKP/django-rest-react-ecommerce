import {
  useGoogleOneTapLogin,
  type CredentialResponse,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const UserAuthLogin = () => {
  useGoogleOneTapLogin({
    onSuccess: (response: CredentialResponse) =>
      response?.credential && console.log(jwtDecode(response?.credential)),
  });

  return <div>UserAuthLogin</div>;
};

export default UserAuthLogin;
