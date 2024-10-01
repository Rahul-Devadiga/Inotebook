import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Navbar() {

  let location = useLocation();
  const navigate = useNavigate()


  const handleLogout = () =>{
    localStorage.clear();
    navigate("/Login")
    toast.success(<b>Logged Out</b>)
  }

  // useEffect(()=>{
  //   console.log(location.pathname);
  // },[location]);

  return (

    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark"  style={{ height: '70px' }}>

  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><b>I-NOTE</b></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname=== '/' ? "active":""}`} aria-current="page" to="/"><b>HOME</b></Link>
        </li>
        <li className="nav-item">
          <Link  className={`nav-link ${location.pathname=== '/about' ? "active":""}`} to="/about"><b>ABOUT</b></Link>
        </li>
      </ul>
      {!localStorage.getItem("Token") ?
      <form className="d-flex" role="search">
        
        <Link className="btn btn-primary mx-1" to="/login" type="submit">Login</Link>
        <Link className="btn btn-primary mx-1" to="/Signup" type="submit">Signup</Link>
      </form> :  <Link className="btn btn-primary mx-1" onClick={handleLogout} type="submit">Logout</Link> }
    </div>
  </div>
</nav>
  )
}

export default Navbar