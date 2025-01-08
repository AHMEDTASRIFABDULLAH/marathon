/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Zoom } from "react-awesome-reveal";
const Slide = ({ image, text }) => {
  const handleScroll = () => {
    const element = document.getElementById("join");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div
      className="w-full bg-center bg-cover h-[38rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-900/50">
        <div className="text-center">
          <Zoom>
            <h1 className="text-3xl mb-6  title_font  font-semibold text-white lg:text-4xl">
              {text}
            </h1>
            <p className="mb-6 text-gray-100 px-2 title_font ">
              Many marathons feature a wheelchair division. Typically, those in
              the wheelchair racing division <br /> start their races earlier
              than their running counterparts.
            </p>
          </Zoom>
          <br />
          <Link
            onClick={handleScroll}
            className="w-full px-5 py-4 mt-4 text-sm  text-white capitalize transition-colors duration-300 transform border border-dashed rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500 font-bold"
          >
            Join Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;