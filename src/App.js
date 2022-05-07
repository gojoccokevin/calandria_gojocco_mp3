import './App.css';
import React, {useState} from "react";

function App() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    remail: "",
    rpassword: "",
    lemail:"",
    lpassword: ""
  })

  const [loginSubmitted, setLoginSubmitted] = useState(false);
  const [loginValid, setLoginValid] = useState(false);
  const [registerSubmitted, setRegisterSubmitted] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [registerValid, setRegisterValid] = useState(false);
  const [switchView, setView] = useState(false);  

  // *Acquires input from user
  const handlerFirstName = (e) => {
    setValues({...values, firstName: e.target.value});
  };

  const handlerLastName = (e) => {
    setValues({...values, lastName: e.target.value});
  };

  const handlerRegisterEmail = (e) => {
    setValues({...values, remail: e.target.value});
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(values.remail)){
      setEmailValid(false);
    }else{
      setEmailValid(true)
    }
    
  };

  const handlerRegisterPassword = (e) => {
    setValues({...values, rpassword: e.target.value});
  };
  const handlerLoginEmail = (e) => {
    setValues({...values, lemail: e.target.value});
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(values.lemail)){
      setEmailValid(false);
    }else{
      setEmailValid(true)
    }
  };

  const handlerLoginPassword = (e) => {
    setValues({...values, lpassword: e.target.value});
  };
  // *Acquires input from user

  // *Resets the form
  const resetForm = (e) => {
    if(switchView === false){
      setLoginSubmitted(false);
      setLoginValid(false);
      setValues({...values, lemail: "", lpassword: ""})
    }
    else if(switchView === true){
      setRegisterSubmitted(false)
    }
  }
  // *Resets the form

  const resetLogin = (e) => {
    setLoginValid(false);
    setLoginSubmitted(false)
    setValues({...values, lemail: "", lpassword: ""})
  }

  // *Is called when Login on the form is clicked
  const handleLogin = (e) => {
    e.preventDefault(); //method used to cancel a certain event

    if(values.lemail === values.remail && values.lpassword === values.rpassword){
      setLoginValid(true);
      setLoginSubmitted(true);
      setTimeout(() => {resetLogin()},4000)
    }
    else{
      setLoginValid(false);
      setLoginSubmitted(true);
      setTimeout(() => {resetLogin()},3000)
    }
    
  }
  // *Is called when Register on the form is clicked
  const handleRegister = (e) => {
    e.preventDefault(); //method used to cancel a certain event
    if(values.firstName && values.lastName && values.remail && values.rpassword){
      setRegisterValid(true);
    }
    setRegisterSubmitted(true);
  }

  // *Handles the switching of the Forms
  const handleSwitchView = (e) => {
    console.log("i have been called");
    if(switchView === false){
      setView(true);
      setRegisterSubmitted(false);
      setTimeout(() => {resetForm();},500)
      console.log("viewing Register");
    }
    else if(switchView === true){
      setView(false);
      setLoginSubmitted(false);
      setTimeout(() => {resetForm();},500)
      console.log("viewing Login");
    }
  }
  return (
    <div className='container'>
      <div className='login-register-container'>
        {/* *Login Form */}
        <div className='form-container'>
            <form className='form' onSubmit={handleLogin} noValidate>
              <div className='form-notif'>
                {/* *Popup when Successful Login */}
                {loginSubmitted && loginValid ? (
                <div className='notif'>
                  <div className='notif-text'>Welcome!<br/> {values.firstName} {values.lastName} </div>
                </div>) : null}
                {loginSubmitted && !loginValid  && emailValid ? (
                <div className='error-notif'>
                  <div className='notif-text'>Error! Wrong <br/> Username or Password</div>
                </div>) : null}
              </div>
              <div className='form-inputs'>
                <div>
                  <label className='input-labels'>Email</label>
                  <input
                  name='lemail'
                  value={values.lemail}
                  onChange={handlerLoginEmail}
                  type='email'
                  formnovalidate='formnovalidate'
                  className='login-inputs'></input>
                  <div className='error-container'>
                    {/* *msg when no email on login attempt */}
                    {loginSubmitted && !values.lemail ? <label className='error'>Please Enter Email</label> :null}
                    {/* *msg when not email format */}
                    {loginSubmitted && !emailValid  && values.lemail ? <label className='error'>Please Enter Valid Email</label> :null}
                  </div>
                </div>
                <div>
                  <label className='input-labels'>Password</label>
                  <input
                  name='lpassword'
                  value={values.lpassword}
                  onChange={handlerLoginPassword}
                  type='password'
                  className='login-inputs'></input>
                  <div className='error-container'>
                    {/* *msg when no password on login attempt */}
                    {loginSubmitted && !values.lpassword ? <label className='error'>Please Enter Password</label> :null}
                  </div>
                </div>
                
              </div>
              <div className='form-submit'>
                <button className='submit' type='submit'>Login</button>
              </div>
            </form>
        </div>
        {/* *Login Form */}

        {/* *Register Form */}
        <div className='form-container' onSubmit={handleRegister}>
            <form className='form' noValidate>
              <div className='form-notif'>
              {/* Notif when succesful register */}
              {registerSubmitted && registerValid && emailValid ? (
                <div className='notif'>
                  <div className='notif-text'>Successfully Registered!</div>
                </div>) :null}
              </div>
              <div className='form-inputs'>
                <div className='name-inputs'>
                  <div className='names'>
                    <label className='register-name-input-labels'>First Name</label>
                    <input
                      name='firstName'
                      value={values.firstName}
                      onChange={handlerFirstName}
                      type='text'
                      className='register-name-inputs'></input>
                      <div className='error-container'>
                        {/* *msg when no fname on login attempt */}
                        {registerSubmitted && !values.firstName ? <label className='error'>Please Enter First Name</label> :null}
                      </div>
                  </div>
                  <div className='names'>
                    <label className='register-name-input-labels'>Last Name</label>
                    <input
                      name='lastName'
                      value={values.lastName}
                      onChange={handlerLastName}
                      type='text'
                      className='register-name-inputs'></input>
                    <div className='error-container'>
                      {/* *msg when no lname on login attempt */}
                      {registerSubmitted && !values.lastName ? <label className='error'>Please Enter Last Name</label> :null}
                    </div>
                  </div>
                </div>
                <div>
                  <label className='register-input-labels'>Email</label>
                  <input
                  name='remail'
                  value={values.remail}
                  onChange={handlerRegisterEmail}
                  type='email'
                  formnovalidate='formnovalidate'
                  className='register-inputs'></input>
                  <div className='error-container'>
                    {/* *msg when no email on register attempt */}
                    {registerSubmitted && !values.remail ? <label className='error'>Please Enter Email</label> :null}
                    {/* *msg when not email format */}
                    {registerSubmitted && !emailValid  && values.remail ? <label className='error'>Please Enter Valid Email</label> :null}
                  </div>
                </div>
                <div>
                  <label className='register-input-labels'>Password</label>
                  <input
                  name='rpassword'
                  value={values.rpassword}
                  onChange={handlerRegisterPassword}
                  type='password'
                  className='register-inputs'></input>
                  <div className='error-container'>
                    {/* *msg when no password on login attempt */}
                    {registerSubmitted && !values.rpassword ? <label className='error'>Please Enter Password</label> :null}
                  </div>
                </div>
              </div>
              <div className='form-submit'>
                <button className='submit' type='submit'>Register</button>
              </div>
            </form>
        </div>
        {/* *Register Form */}

        {/* Overlay Panel */}
        {/* switches the classes when you click either login or register */}
        <div className={`overlay-container ${switchView ? 'overlay-container-left' : 'overlay-container-right'}`}>
            <div className={`overlay-left ${switchView ? 'overlay-left-active' : 'overlay-left-inactive'}`}>
                <h1>Welcome Back!</h1>
                <p>Please Enter Your</p>
                <p>Credientials To Register!</p>
                <button className='overlay-button' onClick={handleSwitchView}>Login</button>
            </div>
            <div className={`overlay-right ${switchView ? 'overlay-right-inactive' : 'overlay-right-active'}`}>
                <h1>Hi There!</h1>
                <p>Enter Your Email And</p> 
                <p>Password To Login!</p>
                <button className='overlay-button' onClick={handleSwitchView}>Register</button>
            </div>
        </div>
        {/* Overlay Panel */}
      </div>
    </div>
  );
}

export default App;
