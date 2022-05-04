import React from "react";
import Index from "./view/index/index";

function App(props) {
  const { parentName } = props ?? {};
  return (
    <Index parentName={parentName} />
  );
}

export default App;
