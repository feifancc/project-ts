import { LOGIN } from "../CONST";
export interface LoginRes {
  data: {
    refresh_token: string;
    token: string;
  };
  message: string;
}
export function loginAction(promis: Promise<LoginRes>) {
  return async (pach: any) => {
    promis.then((data) => {
      pach({
        type: LOGIN,
        data: data.data.token,
      });
    });
  };
}
