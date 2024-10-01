import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const [signup, setSignup] = useState( {name:"",email: "", password: "", cpassword:"" });
  const navigate = useNavigate() 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email,password} = signup;
    const response = await fetch(`http://localhost:5001/api/user/newuser`, {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({name,email,password}),
    });
    const json = await response.json(); 
    console.log(json)
    if(json.success){
      navigate('/Login')
      toast.success('Signup Successfully');
    }else{
      alert("Incorrect Crediatial")
    }
  };

  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
    console.log(setSignup);
  };

  return (
    <div style={styles.pageContainer}>
      <div className="login-container" style={styles.loginContainer}>
        <h3 className="text-center" style={styles.title}>Signup</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={styles.label}> Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name='name'
              placeholder="Enter Your Name"
              style={styles.input}
              value={signup.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={styles.label}>Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name='email'
              placeholder="Enter Email"
              style={styles.input}
              value={signup.email}
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
              value={signup.password}
             onChange={handleChange}
             minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={styles.label}>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name='cpassword'
              placeholder="Password"
              style={styles.input}
              value={signup.cpassword}
             onChange={handleChange}
            minLength={5}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={styles.loginBtn}
          >
            Signup
          </button>
          <a className='mx-1' href='/login'>Already Having Account ?</a>
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

export default Signup;
