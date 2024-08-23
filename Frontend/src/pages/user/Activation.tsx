import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, AppDispact } from "../../store";

import { setAuthState } from "../../slices/authenticationSlice";

import ScreenContainer from "../../ui/user/ScreenContainer";

import apiClient, {
  ApiClientError,
  ApiClientResponse,
} from "../../services/api-client";

import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";

import Loader from "../../components/Loader";
import NotFound from "../../components/NotFound";

type ActivationStatus = 200 | 409 | 400;

interface ActivationContextData {
  title: string;
  subTitle: string;
  btn: {
    text: string;
    onClick: () => void;
  };
}

type ActivationContext = {
  [key in ActivationStatus]: ActivationContextData;
};

const Activation = () => {
  const { auth_state } = useSelector(
    (state: RootState) => state.persistedReducer.auth
  );

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const dispatch = useDispatch<AppDispact>();

  const [activationStatus, setActivationStatus] =
    useState<ActivationStatus>(200);

  const [activationContext] = useState<ActivationContext>({
    400: {
      title: "Invalid Link",
      subTitle:
        " Sorry, we can't activate your account beacuse this is an invalid link  .",
      btn: {
        text: "resent link",
        onClick: () => {},
      },
    },

    409: {
      title: "Aleardy Active",
      subTitle: "Sorry , your account is already active please login",
      btn: {
        text: "login",
        onClick: () => {},
      },
    },

    200: {
      title: "Success",
      subTitle: "Success your account is now active ",
      btn: {
        text: "login",
        onClick() {
          navigate("/signin/");
        },
      },
    },
  });

  const { token } = useParams<string>();

  if (auth_state !== "ACTIVATION") {
    return <NotFound />;
  }

  useEffect(() => {
    token &&
      apiClient
        .post("users/activation/", {
          access_token: token,
        })
        .then((res: ApiClientResponse) => {
          if (res.status === 200) {
            dispatch(setAuthState("NOT LOGGED"));

            setTimeout(() => {
              navigate("signin/");
            }, 2000);
          }
        })
        .catch((err: ApiClientError) => {
          if (err?.response?.status) {
            if (err.response.status === 400) {
              setActivationStatus(400);
            }

            if (err.response.status === 409) {
              setActivationStatus(409);
            }
          }
        })
        .finally(() => {
          setShow(true);
        });
  }, []);

  return show ? (
    <ScreenContainer customClass="gap-5">
      <div className="lg:h-[72px] h-16 bg-black mb-0 sticky top-0 z-50 w-full">
        <Navbar onOpen={() => null} />
      </div>

      <div className="flex flex-row items-center justify-center h-[80vh]">
        <section className=" w-3/4 lg:w-1/2 font-ubuntu    rounded-sm">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                {activationContext[activationStatus].title}
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                {activationContext[activationStatus].subTitle}{" "}
              </p>
              <button
                onClick={activationContext[activationStatus].btn.onClick}
                className="inline-flex text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center  my-4"
              >
                {activationContext[activationStatus].btn.text}
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </ScreenContainer>
  ) : (
    <Loader />
  );
};

export default Activation;
