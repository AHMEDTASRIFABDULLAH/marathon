import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import NormalCard from "../Components/NormalCard";
import { MdLocationOn } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const TabsPanel = ({ allMarathons }) => {
  return (
    <div>
      <Tabs>
        <div className="  px-6 py-10 mx-auto">
          <h1 className="text-2xl racing font-semibold text-center text-gray-800 capitalize lg:text-4xl ">
            Browse Marathons
          </h1>

          <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 ">
            mi 385 usually run as a road race, but the distance can be covered
            on trail routes. The marathon can be completed by running or with a
            run/walk strategy. There are also wheelchair divisions. More than
            800 marathons are held
          </p>
          <div className="flex items-center justify-center">
            <TabList>
              <Tab>Marathons</Tab>
              <Tab>Upcoming Marathons</Tab>
            </TabList>
          </div>
          <TabPanel>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 ">
              {allMarathons.map((m) => (
                <div
                  className=" border bg-white p-4 rounded-2xl hover:scale-105"
                  key={m._id}
                >
                  <div>
                    <img
                      src={m.marathonImageUrl}
                      alt=""
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <p className=" my-4 text-black text-xl ">
                      {m.marathonTitle}
                    </p>
                    <p className="text-gray-700 mt-2 flex gap-2 items-center">
                      {" "}
                      <span className="font-semibold">Location :</span>{" "}
                      {m.location}
                      <MdLocationOn />
                    </p>
                    <p className="mt-2">
                      <span className="font-semibold"> description :</span>{" "}
                      {m.description.substring(0, 15)}...
                    </p>
                    <Link to={`/details/${m._id}`}>
                      <button className="bg-gray-800 mt-3 text-white px-4 py-2 rounded hover:bg-blue-600">
                        See Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>

          <TabPanel>
            <div>
              <NormalCard />
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default TabsPanel;
