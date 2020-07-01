import React from "react";
import * as ReactBootStrap from "react-bootstrap";
import "./App.css";
import Kanban from "./components/Kanban";
import NavBar from "./components/NavBar";

function App() {
  return (
    /* Navbar */
    <div>
        <NavBar />
        <Kanban />
    </div>
  );
}

export default App;