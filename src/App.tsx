import React from "react";
import { useRoutes } from "react-router-dom";
import { routers } from "./router";

import "./App.scss";

function App() {
  const ele = useRoutes(routers);
  return <>{ele}</>;
}

export default App;
