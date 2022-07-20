import req from "axios";
import { message } from "antd";
import { tokenHandle } from "../util/public";

req.defaults.baseURL = "http://geek.itheima.net/v1_0/";

req.interceptors.request.use((config: any) => {
  if (tokenHandle() && config.url !== "authorizations") {
    console.log("stop");
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }
  config.headers["Authorization"] = "Bearer " + localStorage.token || "";
  return config;
});
req.interceptors.response.use((res) => {
  const { status } = res;

  const pae = parseInt(status * 0.01 + "");
  console.log(pae);
  switch (pae) {
    case 2:
      message.success(res.statusText);
      break;
    case 3:
      message.warn(res.statusText);
      break;
    case 4:
      message.error(res.statusText);
      break;
    case 5:
      message.info(res.statusText);
      break;
  }
  return res.data;
});
export default req;
