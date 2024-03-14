import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleSignIn = () => {
  const responseGoogle = (response) => {
    console.log(response);
    // response.tokenId contains the Google Auth ID token
  };

  return (
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleSignIn;