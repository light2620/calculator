import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/AuthPage/Login";
import Register from "../Pages/AuthPage/Register";
import Home from "../Pages/Home/homes";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // this means "/"
        element: <Home />,
      },
      {
        path: "login", // means "/login"
        element: <Login />,
      },
      {
        path: "create-user", // means "/create-user"
        element: <Register />,
      },
    ],
  },
]);



export default router;