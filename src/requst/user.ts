import QueryString from "qs";
import req from "./init";
export interface LoginReq {
  mobile: number | string;
  code: number | string;
}
export const login = async (data: LoginReq) => {
  const result = await req.post("authorizations", QueryString.stringify(data));
  return result;
};

export const getUserInfo = async () => {
  const result = await req.get("user/profile");
  return result;
};
export const getUserFollow = async () => {
  const result = await req.get("user/followings");
  return result;
};
