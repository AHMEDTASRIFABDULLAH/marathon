import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import Login from "../Pages/Login/SingUp/Login";
import SignUp from "../Pages/Login/SingUp/SignUp";
import Marathons from "../Pages/Marathons";
import Dashboard from "../Pages/Dashboard";
import AddMarathon from "../Pages/AddMarathon";
import Details from "../Components/Details";
import ApplyList from "../Pages/ApplyList";
import MarathonList from "../Pages/MarathonList";
import Registration from "../Pages/Registration";
import Update from "../Components/Update";
import PrivateRoute from "./PrivateRoute";
import Error from "../Components/Error";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/marathons",
        element: (
          <PrivateRoute>
            <Marathons />
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "/dashboard",
            element: <Update />,
          },
          {
            path: "addmarathon",
            element: (
              <PrivateRoute>
                <AddMarathon />
              </PrivateRoute>
            ),
          },
          {
            path: "mymarathon/:email",
            element: (
              <PrivateRoute>
                <MarathonList />
              </PrivateRoute>
            ),
          },
          {
            path: "applylist/:email",
            element: (
              <PrivateRoute>
                <ApplyList />
              </PrivateRoute>
            ),
          },
        ],
      },

      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },
      {
        path: "/registration/:id",
        element: <Registration />,
      },
    ],
  },
]);
export default router;
