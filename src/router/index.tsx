import { Navigate } from "react-router-dom";
import ContentAdmin from "../components/ContentAdmin/ContentAdmin";
import DataShow from "../components/DataShow/DataShow";
import SubmitDoc from "../components/SubmitDoc/SubmitDoc";
import Token from "../components/Token/Token";
import Index from "../views/Index";
import User from "../views/user/user";

interface Route {
  path: string;
  meta?: {
    title: string;
    needLogin?: boolean;
  };
}

export const routers = [
  {
    path: "/index",
    element: <Token ChildNode={Index} path={"index"} />,
    children: [
      {
        path: "/index/dataShow",
        element: <DataShow />,
      },
      {
        path: "/index/contentAdmin",
        element: <ContentAdmin />,
      },
      {
        path: "/index/submitDoc",
        element: <SubmitDoc />,
      },
      {
        path: "*",
        element: <Navigate to="/index/dataShow" />,
      },
    ],
  },
  {
    path: "/login",
    element: <User />,
    meta: {
      title: "登录",
      is: true,
    },
  },
  { path: "*", element: <Navigate to={"/index/dataShow"}></Navigate> },
];

export const onRouteBefor = ({ path, meta }: Route) => {
  if (path === "index") {
    const token = localStorage.token;
    if (!token) {
      return "/login";
    }
  }
};
