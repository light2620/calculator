import { useState } from "react"
import "./style.css"
import 'primeicons/primeicons.css';
import logo from "../../Assets/google-logo.png"
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../Apis/authApis";
const Login = () => {
    const [loginCredentials,setLoginCredentials] = useState({
      email : "",
      password : "",
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const {name , value} = e.target;
        setLoginCredentials((prev) => ({
  ...prev,
  [name]: value,
}));
    }

  const hanldesubmit = async(e) => {
    e.preventDefault();
        try{
          setLoading(true);
          const response = await loginApi(loginCredentials);
          localStorage.setItem("Authorization",`Bearer ${response.data.access}`);
          setLoginCredentials({
      username : "",
      password : "",
    })
        navigate("/")
        } catch(err){
          console.log(err)
        } finally{
          setLoading(false);
        }
  }


  return (
    <div className="auth">
      <div className="auth-container">

        <div className="auth-container-inner">
          <h1>Sign Into Your Account</h1>
          <form action="" onSubmit={hanldesubmit}>
            <div className="auth-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id='email'
                name = "email"
                value = {loginCredentials.email}
                placeholder='Your Email Address'
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id='password'
                name = "password"
                value = {loginCredentials.password}
                onChange={(e) => handleChange(e)}
                placeholder='The Password You Picked'
              />
              <p>Forgot password?</p>
            </div>
            <div className="auth-button">
              <button
               disabled={loading}>
                Sign in
                {loading && <i className="pi pi-spin pi-spinner"></i>}
              </button>
            </div>
          </form>
          <div>
            <div className="auth-divider">
              <div className="line"></div>
              <p>or Continue With </p>
              <div className="line"></div>
            </div>
            <div className="google-auth">
              <button
              
              >
                <span><img src={logo} alt="google logo" /></span>
                <p>Sign In With Google</p>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Login
