import { useState } from "react"
import "./style.css"
import 'primeicons/primeicons.css';
import logo from "../../Assets/google-logo.png"
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../Apis/authApis";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/userSlice";
import { getUserDetailApi } from "../../Apis/authApis";
import toast from "react-hot-toast";

const Login = () => {
    const [loginCredentials,setLoginCredentials] = useState({
      email : "",
      password : "",
    })
const [errors, setErrors] = useState({
  email: "",
  password: "",
});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {

        const {name , value} = e.target;
        setErrors((prev) => ({
          ...prev , [name] : ""
        }))
        setLoginCredentials((prev) => ({
  ...prev,
  [name]: value,
}));
    }

  const hanldesubmit = async (e) => {
  e.preventDefault();
  const newErrors = {
    email: loginCredentials.email ? "" : "Email is required",
    password: loginCredentials.password ? "" : "Password is required",
  };

  setErrors(newErrors);

  // Stop submission if there are validation errors
  if (newErrors.email || newErrors.password) return;

  try {
    setLoading(true);
    const response = await loginApi(loginCredentials);
    
    const token = response.data.access;
    localStorage.setItem("Authorization", `Bearer ${token}`);

    const userResponse = await getUserDetailApi();
    dispatch(setUser(userResponse?.data));

    setLoginCredentials({
      email: "",
      password: "",
    });

    navigate("/");
  } catch (err) {
    toast.error(err?.response?.data.error || "something get wrong ")
  } finally {
    setLoading(false);
  }
};



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
    id="email"
    name="email"
    value={loginCredentials.email}
    placeholder="Your Email Address"
    onChange={handleChange}
    className={errors.email ? "input-error" : ""}
  />
  {errors.email && <small className="error-message">{errors.email}</small>}
</div>

<div className="auth-form-group">
  <label htmlFor="password">Password</label>
  <input
    type="password"
    id="password"
    name="password"
    value={loginCredentials.password}
    onChange={handleChange}
    placeholder="The Password You Picked"
    className={errors.password ? "input-error" : ""}
  />
  {errors.password && <small className="error-message">{errors.password}</small>}
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
