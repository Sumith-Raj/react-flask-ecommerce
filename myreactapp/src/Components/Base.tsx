import { Fragment } from "react";
import { Counter } from "../features/counter";
import "../Styles/Base.css";

const Base = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/" id="Home">
              <b>ONLINESHOP</b>
            </a>
          </li>
        </ul>
      </nav>
      {/* <Counter/> */}
    </Fragment>
  );
};

export default Base;
