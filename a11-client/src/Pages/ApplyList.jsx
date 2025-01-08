import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../Hooks/useAxios";
const ApplyList = () => {
  const { user } = useContext(AuthContext);
  const [applylists, setApplyLists] = useState([]);
  const [modaldata, setModaldata] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  console.log(applylists);
  useEffect(() => {
    fetchMyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email, search]);
  const fetchMyList = async () => {
    const { data } = await axiosSecure.get(
      `/applylist/${user?.email}?search=${search}`
    );
    setApplyLists(data);
  };
  // delete methods
  const handelDelete = async (_id) => {
    console.log(_id);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/delete-applylist/${_id}`
      );
      toast.success(" Successfully Deleted");
      fetchMyList();
    } catch (error) {
      toast.error(error);
    }
  };
  // delete Style
  const newDeletStyle = async (_id) => {
    toast((t) => (
      <div className="flex items-center gap-2">
        <p className="font-bold text-black">Are You sure ?</p>
        <button
          className=" rounded-lg text-white font-bold bg-red-500 py-1 px-2"
          onClick={() => {
            toast.dismiss(t.id);
            handelDelete(_id);
          }}
        >
          Yes
        </button>
        <button
          className=" rounded-md text-white font-bold bg-green-500 py-1 px-2"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancel
        </button>
      </div>
    ));
  };
  // handel modal data
  const handelUpdateClick = (id) => {
    setModaldata(id);
    setStartDate(id.startDate);
    // setEndDate(id.endDate);
    // setMarathonStartDate(id.marathonStartDate);
    // setStartDate(id.startDate);
    // setRunningDistance(id.runningDistance);
    document.getElementById("my_modal_4").showModal();
  };
  // Handel Update
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic here
    const from = event.target;
    const marathonTitle = from.marathonTitle.value;
    const LastName = from.LastName.value;
    const FirstName = from.FirstName.value;
    const email = from.email.value;

    const regisTer = {
      marathonTitle,
      // startDate,
      // Marathon_Count,
      LastName,
      FirstName,
      email,
      // marathonId: _id,
      // buyer,
    };
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/update-registion/${modaldata._id}`,
        regisTer
      );
      from.reset();
      toast.success(" Updated successfull");
      fetchMyList();
      document.getElementById("my_modal_4").close();
      //   navigate("/my-bids");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error(" Worng !!!");
    }
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Apply List</title>
      </Helmet>
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <div className="flex w-[330px] p-1 overflow-hidden border  rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-purple-400 focus-within:ring-blue-300">
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="px-6 py-2 text-gray-700 rounded-l-md placeholder-gray-500  outline-none focus:placeholder-transparent"
              type="text"
              name="search"
              value={search}
              placeholder="Enter Job Title"
              aria-label="Enter Job Title"
            />

            <button className=" rounded-r-xl px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
              Search
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-purple-500 text-white text-left">
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Fast Name</th>
                <th className="border border-gray-300 px-4 py-2">Last Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Update/Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {applylists.map((apply) => (
                <tr key={apply._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {apply.buyer}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {apply.marathonTitle}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {apply.FirstName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {apply.LastName}{" "}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex gap-2">
                      <Link onClick={() => handelUpdateClick(apply)}>
                        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => newDeletStyle(apply._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* modal  */}
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            {/* Modal close fun */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label className="text-gray-700" htmlFor="marathonTitle">
                    Marathon Title
                  </label>
                  <input
                    id="marathonTitle"
                    name="marathonTitle"
                    defaultValue={modaldata?.marathonTitle}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                  />
                </div>

                <div className="flex flex-col gap-2 ">
                  <label className="text-gray-700">
                    Start Registration Date
                  </label>
                  <DatePicker
                    className="border p-2 rounded-md"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
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
                    defaultValue={modaldata.FirstName}
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
                    defaultValue={modaldata.LastName}
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
                    defaultValue={modaldata?.number}
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
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default ApplyList;
