import run from "../assets/images/run.jpg";
import { Fade } from "react-awesome-reveal";
const SectionOne = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${run})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
      className="flex opacity-[0.9] flex-col gap-4 sm:flex-row justify-between items-center m-6 p-8 sm:h-[500px]"
    >
      <div>
        <Fade>
          <h1 className="text-6xl text-white mb-6 racing ">
            Eat Good, stay hydrated and Run Everyday
          </h1>
        </Fade>
        <p className="text-2xl text-gray-50 mb-6 racing">
          usually run as a road race, but the distance can be covered on trail
          routes. The marathon can be <br /> completed by running or with a
          run/walk strategy.
        </p>
        <button className="btn font-bold bg-[#DCFC62] hover:bg-black hover:text-red-700 border-none">
          DICOVER MORE
        </button>
      </div>
      <div>
        <div className="border-dashed border-2 p-4">
          <h1 className="text-2xl text-white font-bold">Our Vision</h1>
          <p className="text-gray-50 font-semibold mt-4">
            {" "}
            The first wheelchair marathon was in 1974 in Toledo
          </p>
        </div>
        <div className="border-dashed border-2 mt-6 p-4">
          <h1 className="text-xl text-white font-bold">Our Mission</h1>
          <p className="text-gray-50 font-semibold mt-4">
            Many marathons feature a wheelchair division. Typically,
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
