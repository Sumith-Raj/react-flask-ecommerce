import axios from "axios";
import React, { useState } from "react";
import "../Styles/Home.css";
import "../Styles/Sell.css";
import { useHistory } from "react-router-dom";

const Sell = () => {
  const [imageInput, setimageInput] = useState("");
  const [price, setprice] = useState("");
  const [name, setname] = useState("");
  const [details, setdetails] = useState("");
  const [message, setmessage] = useState();
  const history = useHistory();

  function onimageInputChange(event: any) {
    setimageInput(event.target.files[0]);
  }
  function onprice(event: any) {
    setprice(event.target.value);
  }
  function onname(event: any) {
    setname(event.target.value);
  }function ondetails(event: any) {
    setdetails(event.target.value);
  }
  function chooseFile(event: any) {
    document.getElementById("imageInput")!.click();
  }
  function onUpload(event: any) {
    event.preventDefault();
    const form = new FormData();
    form.append("imageInput", imageInput!);
    console.log(imageInput)
    form.append("price", price!);
    form.append("name", name!);
    form.append("details", details!);
    const token = localStorage.getItem("token");
    axios.post("http://127.0.0.1:5000/sell/",form,{headers: {'Authorization':JSON.stringify(token)}} ).then((response) => {
      console.log(response.data);
      setmessage(response.data);
      var message_ele = document.getElementById("messages");

  setTimeout(function(){
    message_ele!.style.display = "none";
  }, 2000);
      
    }).catch((er)=>{console.error(er)});
  }
  
 
  
  return (
    
    <>{message && <p id="messages"  >{message}</p>}<div className="container col-3 mt-5 mb-3 p-5" style={{ textAlign: "center" }} id="Card">
      <form method="POST">
        <div className="form-group">
          <div style={{ height: "0px", overflow: "hidden" }}>
            <input
              type="file"
              id="imageInput"
              name="imageInput"
              accept="image/*"
              onChange={onimageInputChange} />
          </div>

          <button className="btn btn-info"
            type="button"
            onClick={chooseFile}
            style={{ width: "100%" }}
          >
            Choose Image
          </button>
        </div>
        <div className="form-group">
          <input
            name="name"
            placeholder="Product Name"
            style={{ width: "100%", color: "Red" }}
            onChange={onname} />
        </div>
        <div className="form-group">
          <input
            name="details"
            placeholder="Product details"
            style={{ width: "100%", color: "Red" }}
            onChange={ondetails} />
        </div>
        <div className="form-group">
          <input
            name="price"
            placeholder="Enter Price"
            style={{ width: "100%", color: "Red" }}
            onChange={onprice} />
        </div>

        <div>
          <button className="btn btn-primary"
            type="submit"
            style={{ width: "50%" }}
            onClick={onUpload}
          >
            Submit
          </button>
        </div>
      </form>
    </div></>
  );
};

export default Sell;
