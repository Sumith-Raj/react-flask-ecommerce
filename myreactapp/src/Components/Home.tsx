import { Fragment, useEffect, useState } from "react";
import "../Styles/Home.css";
// import authHeader from "./AuthHeader";
import LoginLogic from "./LoginLogic";
import Products from "./Products";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [user, setuser] = useState([]);
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', JSON.stringify(token));

  useEffect(() => {token &&
    fetch("http://127.0.0.1:5000/showproducts/",{headers: myHeaders }).then((response) =>
      response.json().then((data) => {
        console.log(data)
        setProducts(data[0]);
       
        setuser(data[1])//future use for userdata
      })
    ).catch((err:Error) =>{
      console.error(err)
    })
  }, []);
  return (
    <Fragment>
      <LoginLogic/>
      <Products listofproducts={products}/>
    </Fragment>
  );
};
export default Home;
