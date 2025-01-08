import MarathonCard from "../Components/MarathonCard";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Components/LoadingSpinner";
import { useState } from "react";

const Marathons = () => {
  const axiosSecure = useAxiosSecure();
  const [sort, setSort] = useState("");
  console.log(sort);
  const { data: allMarathons, isLoading } = useQuery({
    queryKey: ["marathons", sort],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-marathons?sort=${sort}`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merathons</title>
      </Helmet>
      <div className="p-6 bg-green-50">
        <div className="my-4">
          <div>
            <select
              name="category"
              id="category"
              className="border p-4 rounded-md"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort By Deadline</option>
              <option value="dsc">Newest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4 p-6 bg-green-50">
        {allMarathons.map((marathon) => (
          <MarathonCard key={marathon._id} marathon={marathon} />
        ))}
      </div>
    </>
  );
};

export default Marathons;
