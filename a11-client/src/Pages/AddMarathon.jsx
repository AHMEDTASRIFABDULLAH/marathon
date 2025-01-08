import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../Hooks/useAxios";
import { compareAsc } from "date-fns";
const AddMarathon = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [marathonStartDate, setMarathonStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic here
    const from = event.target;
    const marathonTitle = from.marathonTitle.value;
    const location = from.location.value;
    const runningDistance = from.runningDistance.value;
    const marathonImageUrl = from.marathonImageUrl.value;
    const description = from.description.value;
    let createdAt = new Date();
    const addMarathon = {
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
    if (compareAsc(new Date(endDate), new Date(marathonStartDate)) === 0)
      return toast.error("Please set valid date");
    if (compareAsc(new Date(endDate), new Date(startDate)) === 0)
      return toast.error("Please set valid date");
    if (compareAsc(new Date(endDate), new Date(marathonStartDate)) === 1) {
      return toast.error("Marathon start date will be big than end reg");
    }
    if (compareAsc(new Date(startDate), new Date(endDate)) === 1) {
      return toast.error("Marathon End date will be big than start reg");
    }
    try {
      await axiosSecure.post(`/add-marathon`, addMarathon);
      from.reset();
      toast.success("Marathon added successfully");
    } catch (error) {
      toast.error("something went worng!!", error);
    }
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Marathon</title>
      </Helmet>
      <div className=" mb-6 sm:flex pt-4 px-6 sm:mt-4 sm:justify-center sm:items-center min-h-[calc(100vh-292px)] ">
        <section className=" p-6  md:p-6 mx-auto bg-white  shadow-inner border rounded-md  ">
          <h2 className="text-lg font-semibold text-black capitalize ">
            Add Marathon
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-black" htmlFor="marathonTitle">
                  Marathon Title
                </label>
                <input
                  id="marathonTitle"
                  name="marathonTitle"
                  type="text"
                  required
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                />
              </div>

              <div className="flex flex-col gap-2 ">
                <label className="text-black">Start Registration Date</label>
                <DatePicker
                  className="border p-2 rounded-md"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>

              <div className="flex flex-col gap-2 ">
                <label className="text-black">End Registration Date</label>
                <DatePicker
                  className="border p-2 rounded-md"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </div>

              <div className="flex flex-col gap-2 ">
                <label className="text-black">Marathon Start Date</label>
                <DatePicker
                  className="border p-2 rounded-md"
                  selected={marathonStartDate}
                  onChange={(date) => setMarathonStartDate(date)}
                />
              </div>

              <div>
                <label className="text-black" htmlFor="location">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                />
              </div>

              <div className="flex flex-col gap-2 ">
                <label className="text-black" htmlFor="runningDistance">
                  Running distance
                </label>
                <select
                  id="runningDistance"
                  name="runningDistance"
                  className="border p-2 rounded-md"
                >
                  <option value="3k">3k</option>
                  <option value="10k">10k</option>
                  <option value="30k">30k</option>
                </select>
              </div>

              <div>
                <label className="text-black" htmlFor="marathonImageUrl">
                  Marathon Image URL
                </label>
                <input
                  id="marathonImageUrl"
                  name="marathonImageUrl"
                  required
                  type="url"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label className="text-black" htmlFor="description">
                Description
              </label>
              <textarea
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                name="description"
                id="description"
                required
              ></textarea>
            </div>

            <div className="flex justify-end mt-6">
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
    </>
  );
};

export default AddMarathon;
