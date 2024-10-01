import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = () => {
  const [login, setLogin] = useState( {email: "", password: "" });
  const navigate = useNavigate() 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5001/api/user/login`, {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({email:login.email, password:login.password}),
    });
    const json = await response.json(); 
    console.log(json)
    if(json.success){
      localStorage.setItem("Token",json.token)
      navigate('/')
      toast.success('Logged-In Successfully');
    }else{
      toast.error("Incorrect Crediatial")

    }
  };

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    console.log(setLogin);
  };

  return (
    <div style={styles.pageContainer}>
      <div className="login-container" style={styles.loginContainer}>
        <h3 className="text-center" style={styles.title}>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={styles.label}>Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name='email'
              placeholder="Enter email"
              style={styles.input}
              value={login.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={styles.label}>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name='password'
              placeholder="Password"
              style={styles.input}
              value={login.password}
             onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={styles.loginBtn}
          >
            Login
          </button>
          <a className='mx-1' href='/signup'>New User ? Create Account</a>
        </form>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #f3ec78, #af4261)', // Gradient background
  },
  loginContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#666',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '15px',
    transition: 'border-color 0.3s',
    outline: 'none',
  },
  inputFocus: {
    borderColor: '#007bff',
  },
  loginBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    fontWeight: '600',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
  },
  loginBtnHover: {
    backgroundColor: '#0056b3',
  },
};

export default Login;
