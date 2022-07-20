import { Navigate } from "react-router-dom";
import { onRouteBefor, routers } from "../../router";
import { isObj } from "../../util/public";
interface Route {
  path: string;
  element: any;
  meta: object;
  children?: Array<Route>;
}
let node: any;
const findRoute = (routes: Array<Route>, path: string): any => {
  return routes.some((route) => {
    route.path = route.path.replace("/", "");
    if (path === route.path) {
      node = route;
      return true;
    } else {
      if (route.children) {
        return findRoute(route.children, path);
      } else {
        return false;
      }
    }
  });
};

export interface TokenNode {
  ChildNode: any;
  path: string;
}
export default function Token({ ChildNode, path }: TokenNode) {
  node = null;
  let result: string | undefined;
  findRoute(routers as Array<Route>, path.replace("/", ""));
  if (isObj(node)) {
    result = onRouteBefor({ path: node.path, meta: node.meta });
  }

  const ele = result ? <Navigate to={result} /> : <ChildNode />;

  return ele;
}
