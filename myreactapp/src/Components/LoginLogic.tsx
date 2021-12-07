
const LoginLogic = () => {
  function LogOut(event: any) {
    localStorage.removeItem("loggedin");
    localStorage.removeItem('user');
    localStorage.removeItem("token");
  }
  
  

  return (
    <div>
      {localStorage.getItem('loggedin') === "True" ? (
        <>
          <div
            style={{
              textAlign: "center",
              marginTop: "1%",
              fontSize: "30px",
              color: "Red",
            }}
          >
            <b>Welcome {localStorage.getItem('user')}</b>
          </div>
          <div
            className="jc-center"
            style={{ position: "absolute", top:6, right: "10%" }}
          >
           <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/sell">
              <b>Sell ?</b>
            </a>
          </li>
        </ul>
          </div>
          <div
            className="jc-center"
            style={{ position: "absolute", top:6, right: 2 }}
          >
            <a href="/">
              <button className="Login" onClick={LogOut}>
                <b>LOGOUT</b>
              </button>
            </a>
          </div>
        </>
      ) : (<>
        <div
          style={{
            textAlign: "center",
            marginTop: "1%",
            fontSize: "30px",
            color: "Red",
          }}
        >
          <b>Welcome to OnlineShop</b>
        </div>
        

         
      </>
      )}
    </div>
  );
};

export default LoginLogic;
