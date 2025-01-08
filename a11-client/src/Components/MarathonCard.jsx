import { format } from "date-fns";
import { Link } from "react-router-dom";

// import Counter from "./Counter";

// eslint-disable-next-line react/prop-types
const MarathonCard = ({ marathon }) => {
  const {
    // eslint-disable-next-line react/prop-types
    marathonTitle,
    marathonStartDate,
    marathonImageUrl,
    startDate,
    endDate,
    location,
    _id,
  } = marathon;

  console.log(marathon, "marathon Card");
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-400">
        {" "}
        <img
          src={marathonImageUrl}
          alt=""
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{marathonTitle}</h2>{" "}
          <p className=" mb-2">
            {" "}
            <span className="font-semibold">Location :</span> {location}
          </p>{" "}
          <p className="text-gray-600 mb-2">
            <span className="font-semibold"> Registration Start :</span>{" "}
            {format(startDate, "P")}{" "}
            <span className="font-semibold">-- End :</span>{" "}
            {format(endDate, "P")}
          </p>
          {/* <div className="flex  items-center gap-4">
            {compareAsc(new Date(startDate), new Date(endDate)) === 1 ? (
              <p className="font-bold hidden sm:block text-xl text-red-600">
                Marathon End
              </p>
            ) : (
              <p className="font-bold hidden sm:block text-xl text-[#0F3850]">
                Marathon Start
              </p>
            )}
            <Counter marathonStartDate={marathonStartDate} endDate={endDate} />
          </div> */}
          <Link to={`/details/${_id}`}>
            <button className="bg-gray-800  text-white px-4 py-2 rounded hover:bg-blue-600">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarathonCard;
