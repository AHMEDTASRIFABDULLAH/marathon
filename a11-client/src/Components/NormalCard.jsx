import { JackInTheBox } from "react-awesome-reveal";
import { MdLocationOn } from "react-icons/md";
const NormalCard = () => {
  const upcomingMarathons = [
    {
      id: 1,
      image: "https://i.postimg.cc/wBrt9Mj3/pexels-olly-3763871.jpg",
      title: "City Marathon 2025",
      location: "New York, USA",
      startDate: "2025-03-01",
      endDate: "2025-03-15",
    },
    {
      id: 2,
      image: "https://i.postimg.cc/y8vgrvqm/pexels-runffwpu-3638093.jpg",
      title: "Beach Marathon 2025",
      location: "Miami, USA",
      startDate: "2025-04-10",
      endDate: "2025-04-20",
    },
    {
      id: 3,
      image: "https://i.postimg.cc/dQyCt2dF/pexels-runffwpu-2600454.jpg",
      title: "Mountain Marathon 2025",
      location: "Denver, USA",
      startDate: "2025-05-05",
      endDate: "2025-05-15",
    },
    {
      id: 4,
      image:
        " https://i.postimg.cc/v8grxRJp/pexels-pexels-latam-478514802-17983227.jpg",
      title: "Desert Marathon 2025",
      location: "Phoenix, USA",
      startDate: "2025-06-01",
      endDate: "2025-06-10",
    },
    {
      id: 5,
      image: "https://i.postimg.cc/HxJyM5hQ/pexels-runffwpu-1568804.jpg",
      title: "Forest Marathon 2025",
      location: "Seattle, USA",
      startDate: "2025-07-01",
      endDate: "2025-07-10",
    },
    {
      id: 6,
      image: "https://i.postimg.cc/4yVHLGZy/pexels-cottonbro-5310907.jpg",
      title: "River Marathon 2025",
      location: "Chicago, USA",
      startDate: "2025-08-01",
      endDate: "2025-08-10",
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
      {upcomingMarathons.map((m) => (
        <div
          className="bg-white border space-y-3 font-semibold p-6 rounded-md "
          key={m.id}
        >
          <JackInTheBox>
            <img src={m.image} alt="" />

            <p className="text-white ">{m.title}</p>
            <div className="flex justify-between text-gray-400">
              <p>Location :</p>
              <p className="flex gap-2 items-center">
                {m.location} <MdLocationOn />
              </p>
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Start Date : </p>
              <p>{m.startDate}</p>
            </div>
            <div className="flex justify-between text-gray-400">
              <p>End Date :</p>
              <p>{m.endDate}</p>
            </div>
          </JackInTheBox>
        </div>
      ))}
    </div>
  );
};

export default NormalCard;
