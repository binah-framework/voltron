import { UserData, User, LoginResponse, AuthInfo } from "@/types";

import axios, { AxiosResponse } from "axios";

// import _ from "lodash";

const API_URL = "/api";

const serverResponse = { data: null };

function delay(ms = 1000) {
  if (process.env.NODE_ENV === "development") {
    return new Promise(resolve => setTimeout(resolve, ms));
  } else {
    return Promise.resolve();
  }
}

class ApiService {
  // constructor(private currentUser: UserData | null) {}
  constructor(private accessToken: string | null) {}
  
  // Auth
  async signIn(info: AuthInfo): Promise<LoginResponse> {
    await delay();
    const response: AxiosResponse<LoginResponse> = await axios.post(`${API_URL}/signin`, {
      emailAddress: info.emailAddress,
      password: info.password
    });
    console.log("server-signIn", response.data);
    // this.currentUser = response.data.user;
    this.accessToken = response.data.accessToken;
    return response.data;
  }

  isSignedIn() : boolean {
    const res = this.accessToken !== null;
    console.log("isSignedIn", res);
    return res; 
  }
}

const accessToken = localStorage.getItem("accessToken");
export default new ApiService(accessToken);
// export default new ApiService(null);
