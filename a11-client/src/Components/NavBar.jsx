import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useContext } from "react";
import logo1 from "../assets/images/icon2.png";
const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handelLogout = () => {
    logOut();
    navigate("/login");
  };
  return (
    <div>
      <div className="navbar shadow-sm bg-green-50 border-b-2 border-gray-400 px-4 mx-auto">
        <div className="flex-1">
          <Link to="/" className="flex gap-2 items-center">
            <img
              className=" sm:hidden md:block rounded-lg h-14"
              src={logo1}
              alt=""
            />
            <span className=" hidden sm:block font-bold sm:text-xl md:text-3xl text-green-900">
              Run to Rise
            </span>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="flex gap-1 sm:gap-6 items-center">
            <li>
              <button>
                <NavLink
                  className="text-black sm:py-2 sm:px-4 rounded-md  font-semibold"
                  to="/"
                >
                  Home
                </NavLink>
              </button>
            </li>
            <li>
              <button className="text-black  font-semibold">
                <NavLink className={`py-2 px-4 rounded-md`} to="/marathons">
                  {" "}
                  Marathons
                </NavLink>
              </button>
            </li>
            {user ? (
              <li>
                <button className="text-black  font-semibold mr-6">
                  <NavLink
                    className={`sm:py-2 sm:px-4 rounded-md`}
                    to={`dashboard`}
                  >
                    Dashboard
                  </NavLink>{" "}
                </button>
              </li>
            ) : (
              <></>
            )}
            {!user && (
              <li>
                <button className=" px-4 py-2 mr-3 rounded-md bg-indigo-500  text-white font-semibold ">
                  <Link className=" rounded-md" to="/login">
                    Login
                  </Link>
                </button>
              </li>
            )}
          </ul>

          {user && (
            <div className=" hidden sm:block dropdown dropdown-end z-50 ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-4 border-green-600"
              >
                <div title={user?.displayName} className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile Photo"
                    src={user?.photoURL}
                  />
                </div>
              </div>
            </div>
          )}
          {user ? (
            <></>
          ) : (
            <button className="px-4 py-2 text-white  bg-lime-500 font-semibold  rounded-md ">
              <Link to="/signup">Register</Link>
            </button>
          )}
          {user && (
            <button onClick={handelLogout}>
              <NavLink
                className=" text-red-500 sm:bg-red-500 sm:text-white ml-4 font-semibold sm:px-4 sm:py-2 rounded-md  "
                to="/signup"
              >
                Logout
              </NavLink>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
