import event1 from "../assets/images/Event-1.jpg";
import event2 from "../assets/images/Event-2.jpg";
import event3 from "../assets/images/Event-3.jpg";
import { Roll, Fade } from "react-awesome-reveal";
const SectionTwo = () => {
  return (
    <div className="m-6">
      <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
        <div className="m-6 sm:w-1/2">
          <p className="text-xl border-b-2 border-red-400 pb-2  text-black font-bold">
            Events
          </p>
          <Fade>
            <h1 className="text-4xl font-bold  mt-6">
              Feeling Fit is the joy you get after running
            </h1>
          </Fade>
        </div>

        <div className="m-6 sm:w-1/2">
          <p></p>
          <Fade>
            <p className=" text-gray-600 mt-6 text-wrap ">
              Tincidunt ante nibh habitasse arcu eget lobortis facilisis. Platea
              imperdiet facilisis dignissim auctor sodales sagittis velit.
              Praesent nisl auctor quis augue semper pretium ac suscipit purus
              tempor ullamcorper.
            </p>
          </Fade>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6  ">
        <Roll>
          <div>
            <div className="bg-gray-100 p-4 ">
              <img src={event1} alt="" />
            </div>
          </div>
        </Roll>
        <div>
          <div className="bg-gray-100 p-4 ">
            {" "}
            <img src={event2} alt="" />
          </div>
        </div>
        <div>
          <Roll>
            <div className="bg-gray-100 p-4 ">
              <img src={event3} alt="" />
            </div>
          </Roll>
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;
