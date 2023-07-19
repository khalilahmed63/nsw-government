import Lottie from "lottie-react";
import Animation from "./create.json";

const CreateLottie = () => {
  return (
    <div className="max-h-[300px] max-w-[300px] ">
      <Lottie animationData={Animation} />
    </div>
  );
};

export default CreateLottie;