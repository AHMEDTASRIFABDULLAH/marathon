import { compareAsc, format } from "date-fns";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxios";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import CounterTwo from "../CounterTwo/CounterTwo";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
const Details = () => {
  const { setEndTime, setStartTime } = useContext(AuthContext);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: marathon, isLoading } = useQuery({
    queryKey: ["details"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/details/${id}`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  const {
    marathonTitle,
    marathonImageUrl,
    Marathon_Count,
    runningDistance,
    location,
    _id,
    startDate,
    endDate,
    marathonStartDate,
  } = marathon;
  setEndTime(marathon.endDate);
  setStartTime(marathon.marathonStartDate);
  window.scroll(0, 0);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merathon Details</title>
      </Helmet>
      <div className="bg-green-50">
        <div className="p-6 md:w-1/2  ">
          <h2 className=" text-xl sm:text-3xl font-bold mb-6">
            {marathonTitle}
          </h2>{" "}
          <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
            <img
              src={marathonImageUrl}
              alt=""
              className="w-full h-48 object-cover"
            />
            <div className="">
              <p> Distance : {runningDistance}</p>
              <p> Total Register : {Marathon_Count}</p>
              <p className="text-gray-600 mb-2">
                Registration: Start : {startDate && format(startDate, "P")} --
                End : {endDate && format(endDate, "P")}
              </p>
              <p className="text-gray-700 mb-2">{location}</p>
              {/* timer */}
              <div className="flex  items-center gap-4">
                {compareAsc(new Date(startDate), new Date(endDate)) === 1 ? (
                  <p className="font-bold hidden sm:block text-xl text-red-600">
                    Marathon End
                  </p>
                ) : (
                  <p className="font-bold hidden sm:block text-xl text-[#0F3850]">
                    Marathon Start
                  </p>
                )}
                <CounterTwo />
              </div>
              <Link to={`/registration/${_id}`}>
                <button
                  disabled={
                    compareAsc(new Date(startDate), new Date(endDate)) === 1
                  }
                  className="disabled:bg-red-500 bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {compareAsc(new Date(startDate), new Date(endDate)) === 1
                    ? "Registration End"
                    : "Registration"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
