import React, { Fragment } from "react";
import Cards from "./Cards";
import { ListaTareas } from "./components/ListaTareas";

function App() {
  return (
    <Fragment>
      <ListaTareas><Cards></Cards></ListaTareas>
    </Fragment>
  );
}

export default App;
