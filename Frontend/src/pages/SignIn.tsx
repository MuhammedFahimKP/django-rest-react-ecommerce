import SigninForm from "../components/SigninForm";
import Navbar from "../components/Navbar";
import ScreenContainer from "../ui/ScreenContainer";
const SignIn = () => {
  return (
    <ScreenContainer>
      <Navbar />
      <SigninForm />;
    </ScreenContainer>
  );
};

export default SignIn;
