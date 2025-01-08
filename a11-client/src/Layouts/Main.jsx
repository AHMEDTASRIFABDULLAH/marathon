import NavBar from "../Components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import { Helmet } from "react-helmet";
const Main = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Run to Rise</title>
      </Helmet>
      {/* Navbar */}
      <NavBar />
      {/* Outlet */}
      <div className="min-h-[calc(100vh-292px)]">
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Main;
