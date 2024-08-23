import { store } from "../store";
import { logedIn } from "../slices/authenticationSlice";
import apiClient, {
  ApiClientError,
  ApiClientResponse,
} from "../services/api-client";
import { State } from "../slices/authenticationSlice";
import routes from "../routes";

function handleGoogleAuth(id: string): null | State {
  console.log(id);

  apiClient
    .post("users/google/", { access_token: id })
    .then((res: ApiClientResponse) => {
      if (res.status === 200) {
        console.log(res);

        store.dispatch(
          logedIn({
            access: res.data.access,
            refresh: res.data.refresh,
            user: res.data.user,
          })
        );
        routes.navigate("/");
      }
    })
    .catch((err: ApiClientError) => {
      let error = err.response?.data;
      error;
      console.log(error);
    });

  return null;
}

export { handleGoogleAuth };
