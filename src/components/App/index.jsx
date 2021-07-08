import "./App.css";
import { Nav } from "../nav";
import { Home } from "../Home";
import { Favourites } from "../Favourites";

import { BrowserRouter, Route } from "react-router-dom";
export default function App() {
  if (!localStorage.getItem("results")) {
    localStorage.setItem("results", JSON.stringify({ result: [] }));
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Route path="/" exact component={Home}></Route>
        <Route path="/favourites" component={Favourites}></Route>
      </div>
    </BrowserRouter>
  );
}
