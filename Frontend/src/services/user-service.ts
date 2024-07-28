import { UserSigninData, UserSignupData } from "../@types";
import createHttpService from "./http-service";

class User {
  endpoint = "users/";
  service;

  constructor() {
    this.service = createHttpService();
  }

  signup(data: UserSignupData | any) {
    return this.service.post(this.endpoint + "signup/", data);
  }

  signin(data: UserSigninData) {
    return this.service.post(this.endpoint + "signin/", data);
  }
}

const createUserService = () => new User();

export { createUserService };
