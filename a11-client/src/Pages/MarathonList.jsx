import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../Hooks/useAxios";
// import { axiosSecure } from "../Hooks/useAxios";

const MarathonList = () => {
  const [marathonList, setMarathonList] = useState([]);
  const { user } = useContext(AuthContext);
  const [modaldata, setModaldata] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [marathonStartDate, setMarathonStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [runningDistance, setRunningDistance] = useState();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    fetchMyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);
  const fetchMyList = async () => {
    const { data } = await axiosSecure.get(`/mymarathon/${user?.email}`);
    setMarathonList(data);
  };
  const handelUpdateClick = (id) => {
    setModaldata(id);
    setEndDate(id.endDate);
    setMarathonStartDate(id.marathonStartDate);
    setStartDate(id.startDate);
    setRunningDistance(id.runningDistance);
    document.getElementById("my_modal_5").showModal();
  };
  const handelUpdate = async (event) => {
    event.preventDefault();
    // Handle form submission logic here
    const form = event.target;
    const marathonTitle = form.marathonTitle.value;
    const location = form.location.value;
    const marathonImageUrl = form.marathonImageUrl.value;
    const description = form.description.value;
    let createdAt = new Date();
    const UpdateMarathon = {
      marathonTitle,
      startDate,
      endDate,
      marathonStartDate,
      location,
      runningDistance,
      marathonImageUrl,
      description,
      createdAt,
      Marathon_Count: 0,
      buyer: user?.email,
    };
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/update-marathon/${modaldata._id}`,
        UpdateMarathon
      );
      form.reset();
      toast.success("Job updated successfully");
      fetchMyList();
      document.getElementById("my_modal_5").close();
    } catch (error) {
      toast.error("something went worng!!", error);
    }
  };
  const handelDelete = async (_id) => {
    console.log(_id);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/delete-marathon/${_id}`
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
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Marathon List</title>
      </Helmet>
      <div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-purple-500  text-white text-left">
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">location</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Running Distance
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    createdAt
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Update/Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {marathonList.map((m) => (
                  <tr key={m._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {m.marathonTitle}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {m.location}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {m.runningDistance}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {" "}
                      {m.createdAt && format(m.createdAt, "P")}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex gap-2">
                        <Link onClick={() => handelUpdateClick(m)}>
                          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                            Update
                          </button>
                        </Link>
                        <button
                          onClick={() => newDeletStyle(m._id)}
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
        </div>
        {/* modal */}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
              <section className=" p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
                <h2 className="text-lg font-semibold text-gray-700 capitalize ">
                  Update Marathon
                </h2>

                <form onSubmit={handelUpdate}>
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

                    <div className="flex flex-col gap-2 ">
                      <label className="text-gray-700">
                        End Registration Date
                      </label>
                      <DatePicker
                        className="border p-2 rounded-md"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                      />
                    </div>

                    <div className="flex flex-col gap-2 ">
                      <label className="text-gray-700">
                        Marathon Start Date
                      </label>
                      <DatePicker
                        className="border p-2 rounded-md"
                        selected={marathonStartDate}
                        onChange={(date) => setMarathonStartDate(date)}
                      />
                    </div>

                    <div>
                      <label className="text-gray-700" htmlFor="location">
                        Location
                      </label>
                      <input
                        id="location"
                        name="location"
                        defaultValue={modaldata?.location}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                      />
                    </div>

                    <div className="flex flex-col gap-2 ">
                      <label className="text-gray-700 " htmlFor="category">
                        Category
                      </label>
                      <select
                        name="category"
                        value={runningDistance}
                        onChange={(e) => setRunningDistance(e.target.value)}
                        id="category"
                        className="border p-2 rounded-md"
                      >
                        <option value="3k">3k</option>
                        <option value="10k">10k</option>
                        <option value="30k">30k</option>
                      </select>
                    </div>

                    <div>
                      <label
                        className="text-gray-700"
                        htmlFor="marathonImageUrl"
                      >
                        Marathon Image URL
                      </label>
                      <input
                        id="marathonImageUrl"
                        name="marathonImageUrl"
                        type="url"
                        defaultValue={modaldata?.marathonImageUrl}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <label className="text-gray-700" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                      name="description"
                      defaultValue={modaldata?.description}
                      id="description"
                    ></textarea>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      type="submit"
                      className="disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    >
                      Save
                    </button>
                    <form method="dialog">
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default MarathonList;
