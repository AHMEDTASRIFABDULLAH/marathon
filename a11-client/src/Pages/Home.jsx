import { useEffect, useState } from "react";
import Carousel from "../Components/Carousel";
import axios from "axios";
import TabsPanel from "./TabsPanel";
import SectionOne from "../Components/SectionOne";
import SectionTwo from "../Components/SectionTwo";
import SectionThree from "../Components/SectionThree";

const Home = () => {
  const [allMarathons, setMarathons] = useState([]);

  console.log(allMarathons);
  useEffect(() => {
    const fetchAllJobs = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-six-Marathons`
      );
      setMarathons(data);
    };
    fetchAllJobs();
  }, []);
  return (
    <div className="bg-green-50">
      <Carousel />
      <TabsPanel allMarathons={allMarathons} />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </div>
  );
};

export default Home;
