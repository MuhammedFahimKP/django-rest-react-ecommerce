import { ComponentType, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../store";

import DelayComponent from "./DelayComponent";

function IsUserAuthenticated<T extends Object>(
  WrapppedComponent: ComponentType<T>
) {
  return ({ ...props }: T) => {
    const { user } = useSelector(
      (state: RootState) => state.persistedReducer.auth
    );
    const navigate = useNavigate();

    useEffect(() => {
      if (user === null) {
        navigate("signin/");
      }
    }, []);

    return (
      <DelayComponent delay={2000}>
        <WrapppedComponent {...(props as T)} />
      </DelayComponent>
    );
  };
}

export default IsUserAuthenticated;
