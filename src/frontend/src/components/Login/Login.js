import React, {useState} from "react";
import itulogo from './ITULogo.svg';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
import './Login.css';

function Login(props) {
    const ituEmail = useFormInput('');
    const ituPassword = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
   
    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post('http://localhost:5000/api/v1/login', { email: ituEmail.value, password: ituPassword.value }).then(response => {
            console.warn(ituEmail)
            setLoading(false);
            setUserSession(response.data.token, response.data.user);
            props.history.push('/staff');
        }).catch(error => {
            setLoading(false);
            if (error.response && error.response.status === 401) setError(error.response.data.message);
            else if (error.response && error.response.status === 500) setError("Incorrect Email or Password");
            else setError("Something went wrong. Please try again later.");
        });
      }

return (
    <div className="container-fluid Tms-page-bg" style= {{height: "100vh"}}>
        <br /> <br /> <br /> <br /> <br /> <br /> <br />
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-4">
                <img src={itulogo} alt="itulogo" />
            </div>
            <div className="col-md-4">
                <form>
                    <fieldset>
                        <div className="form-group">
                            <label className="Tms-h5">Sign In with ITU email</label>
                        </div>
                        <div className="form-group">
                            <input type="email" 
                                {...ituEmail}
                                className="form-control Tms-input-field Tms-imput-field-text" 
                                id="ituemail" 
                                placeholder="ITU Email Address" 
                            />
                        </div>
                        <div className="form-group">
                            <input type="password" 
                                {...ituPassword}
                                className="form-control Tms-input-field Tms-imput-field-text" 
                                id="itupassword" 
                                placeholder="Password" 
                            />
                        </div>
                        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                        <div className="form-check Set-position-right">
                            <input type="checkbox" className="form-check-input" id="remembermelogin" />
                            <label className="Tms-para4">Remember Me</label>
                        </div>
                        <br /> <br/>
                        <div>
                            <label className="Tms-para3 Tms-primary-color-green Text-center">Forgot Password?</label>
                            <button
                                value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading}
                                className="Tms-primary-large-button Tms-button-text-color Set-position-right">
                            Sign In</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
);
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }

export default Login;