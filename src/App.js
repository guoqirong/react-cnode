import React from "react";
import Index from "./view/index/index";

function App(props) {
  const { parentName } = props ?? {};
  return (
    <div id="app">
      <Index parentName={parentName} />
    </div>
  );
}

export default App;
