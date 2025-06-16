import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'primeicons/primeicons.css';
import { createUserApi } from "../../Apis/authApis";
import "./style.css";

const Register = () => {
  const [createUserCredentials, setCreateuserCredentials] = useState({
    username: "",
    password: "",
    company: "",
    is_ghl_user: false,
    is_admin: false,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateuserCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(createUserCredentials)
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCreateuserCredentials((prev) => ({
      ...prev,
      [name]: checked ,
    }));
    console.log(createUserCredentials)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await createUserApi(createUserCredentials);

      setCreateuserCredentials({
        username: "",
        password: "",
        company: "",
        is_ghl_user: false,
        is_admin: false,
      });

      navigate("/login");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-container-inner">
          <h1>Add A User</h1>
          <form onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="username"
                value={createUserCredentials.username}
                onChange={handleChange}
                placeholder="Your Email Address"
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={createUserCredentials.password}
                onChange={handleChange}
                placeholder="The Password You Picked"
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={createUserCredentials.company}
                onChange={handleChange}
                placeholder="Company Name"
              />
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="is_ghl_user"
                  checked={createUserCredentials.is_ghl_user}
                  onChange={handleCheckboxChange}
                />
                GHL User
              </label>
              <label>
                <input
                  type="checkbox"
                  name="is_admin"
                  checked={createUserCredentials.is_admin}
                  onChange={handleCheckboxChange}
                />
                Admin
              </label>
            </div>

            <div className="auth-button">
              <button disabled={loading}>
                {loading ? (
                  <>
                    <i className="pi pi-spin pi-spinner" /> Creating...
                  </>
                ) : (
                  "Create a User"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
