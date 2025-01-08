import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../Hooks/useAxios";

const Registration = () => {
  const [register, setRegister] = useState({});
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { Marathon_Count, startDate, _id, buyer } = register;
  const { id } = useParams();
  useEffect(() => {
    fetchMarathon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const fetchMarathon = async () => {
    const { data } = await axiosSecure.get(`/details/${id}`);
    setRegister(data);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic here
    const from = event.target;
    const marathonTitle = from.marathonTitle.value;
    const LastName = from.LastName.value;
    const FirstName = from.FirstName.value;
    const email = from.email.value;
    const number = from.number.value;

    const regisTer = {
      marathonTitle,
      startDate,
      Marathon_Count,
      LastName,
      FirstName,
      email,
      marathonId: _id,
      buyer,
      number,
    };
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/registion`, regisTer);
      from.reset();
      toast.success("Register successfull");
      navigate("/marathons");
    } catch (error) {
      toast.error(" Already Registed !!!", error);
    }
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Registation</title>
      </Helmet>
      <div>
        <div>
          <div className="flex bg-green-50 shadow-transparent justify-center items-center min-h-[calc(100vh-306px)] p-6 md:py-12">
            <section className=" p-4 w-full md:w-[60%] md:p-6 mx-auto bg-white rounded-md shadow-md ">
              <h2 className="text-lg font-semibold text-gray-700 capitalize ">
                Registation
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label className="text-gray-700" htmlFor="marathonTitle">
                      Marathon Title
                    </label>
                    <input
                      id="marathonTitle"
                      name="marathonTitle"
                      disabled
                      defaultValue={register.marathonTitle}
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    />
                  </div>

                  <div className="flex flex-col gap-2 ">
                    <label className="text-gray-700">start date</label>
                    <DatePicker
                      className="border p-2 rounded-md"
                      selected={register.startDate}
                      disabled
                    />
                  </div>

                  <div>
                    <label className="text-gray-700" htmlFor="location">
                      First Name
                    </label>
                    <input
                      id="location"
                      name="FirstName"
                      type="text"
                      required
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700" htmlFor="location">
                      Last Name
                    </label>
                    <input
                      id="location"
                      name="LastName"
                      required
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700" htmlFor="location">
                      Number
                    </label>
                    <input
                      id="number"
                      name="number"
                      type="number"
                      required
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700" htmlFor="marathonImageUrl">
                      Email
                    </label>
                    <input
                      id="email"
                      name="marathonImageUrl"
                      defaultValue={user?.email}
                      disabled
                      type="email"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    />
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
