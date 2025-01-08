import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const SectionThree = () => {
  const { user } = useContext(AuthContext);
  const hndelSubscribe = () => {
    if (user) {
      toast.success(`Thank you for joining ${user?.displayName}`);
    } else {
      toast.error(`Please signup`);
    }
  };
  return (
    <div
      id="join"
      className="bg-gray-500  border-green-300 border-2 flex flex-col items-center mt-10 py-6  gap-6 m-6 rounded-2xl"
    >
      <div className="text-center">
        <h1 className="text-4xl text-white font-bold mb-4 title_font  ">
          Join Our Newsletter
        </h1>
        <p className="text-white pb-4 title_font ">
          For a long time after the Olympic marathon started, there were no
          long-distance races, such as the marathon, <br /> for women. Although
          a few women, such as Stamata Revithi in 1896, had run the marathon
          distance, they were ,
        </p>
      </div>
      <div className=" flex justify-center w-1/2 gap-6">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-error shadow-2xl w-full "
          defaultValue={user?.email}
        />
        <button
          onClick={hndelSubscribe}
          className="btn btn-error shadow-2xl bg-red-500  text-white font-bold"
        >
          Subsciibe
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default SectionThree;
