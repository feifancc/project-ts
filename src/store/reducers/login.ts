import { LOGIN } from "../CONST";

export function loginReducer(
  preState: string,
  action: { type: string; data: string }
) {
  let { type, data } = action;
  switch (type) {
    case LOGIN:
      console.log(data);

      localStorage.setItem("token", data);
      localStorage.setItem("tokenTime", Date.now() + "");
      return (preState = data);

    default:
      return (preState = localStorage.token || "");
  }
}
