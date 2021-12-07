import axios from 'axios';
import React, { Fragment } from 'react';


function onBuy(event: any) {
    event.preventDefault();
    alert('Click ok to confirm purchase')
    console.log("needgatewayIP");
    axios.post("http://").then((response) => {
        console.log(response.data);
        if (response.data === "success") {
            console.log("Success");
        }
    });
}
const Products = ({ listofproducts }: { listofproducts: any }) => {
    return (
        <Fragment>
            {listofproducts.map((products: any) => {
                return (
                    <div key={products.id}
                        className="Box container col-2 m-5 p-1 border">
                        <div id="Card" >

                            <img
                                src={`data:image/png;base64,${products.rendered_data}`} alt="productimage"
                                style={{ objectFit: "contain", width: "100%" }}
                            />
                            <div className="cardbody" style={{
                                    textAlign: "center",
                                }}>
                                <b className="cardtitle">{products.Name}</b><br/>
                                <i className ="cardtext" style={{textAlign:"left",padding:"3px"}}>{products.Details}</i><br/>
                                <i className="fas fa-rupee-sign">Rs {products.Price}/-</i>
                            </div>
                            <button
                            style={{
                                textAlign: "center",
                                backgroundColor: "lightseagreen",
                                width: "100%",
                            }}
                            onClick={onBuy}
                        >
                            BUY
                        </button>
                        </div>
                        
                    </div>)
            })}

        </Fragment>)
}

export default Products
