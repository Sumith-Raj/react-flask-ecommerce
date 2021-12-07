import { Fragment, useMemo, useState } from "react";
import "./App.css";
import Base from "./Components/Base";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Sell from "./Components/Sell";
import Home from "./Components/Home";
import { UserContext } from "./Components/UserContext";

function App() {
  const [user, setuser] = useState();
  const providerValue = useMemo(() => ({ user, setuser }), [user, setuser]);
  return (
    <Fragment>
      <Router>
        <UserContext.Provider value={providerValue}>
          <Base />
          <Switch>
            {/* <Route path="/home">
              <Home />
            </Route> */}
            
            <Route path="/home">
              <Home />
            </Route>
            {/* <Route path="/login">
              <Login />
            </Route> */}
            {localStorage.getItem("loggedin") === "True" ? (
              <>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/sell">
                  <Sell />
                </Route>
                <Route path="/cart">
                  
                </Route>
              </>
            ) : ( <><Route exact path="/">
              <Login />
            </Route><Route path="/signup">
                <Signup />
              </Route></>
            )}
          </Switch>
        </UserContext.Provider>
      </Router>
    </Fragment>
  );
}

export default App;
