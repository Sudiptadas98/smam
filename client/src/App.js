import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Logout from "./components/Logout";
import Errorpage from "./components/Errorpage";
import TrendingMainPage from "./components/pages/TrendingMainPage";
import MovieDetailsPage from "./components/pages/MovieDetailsPage";
import CreateRec from "./components/pages/CreateRec";
import AllRecs from "./components/pages/AllRecs";
import { createContext, useReducer } from "react";
import { InitialState, reducer } from "../src/reducer/UseReducer";
import RecAbt from "./components/pages/RecAbt";
import Footer from "./components/pages/Footer";

//contextAPI
export const UserContext = createContext();

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/about">
        <About />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      {/* <Route path="/contact">
        <Contact />
      </Route> */}

      <Route path="/logout">
        <Logout />
      </Route>

      <Route path="/trendingpage">
        <TrendingMainPage />
      </Route>

      <Route exact path="/:type/:movieid" render={props => (<MovieDetailsPage {...props} />)} />
      {/* <MovieDetailsPage />
      </Route> */}

      <Route exact path="/:type/createrec/:movieid" render={props => (<CreateRec {...props} />)} />

      <Route exact path="/about/rec/:recid" render={props => (<RecAbt {...props} />)} />

      <Route path="/recommendations">
        <AllRecs />
      </Route>

      <Route>
        <Errorpage />
      </Route>
    </Switch>

  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, InitialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
