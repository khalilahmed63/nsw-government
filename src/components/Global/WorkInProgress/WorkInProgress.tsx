import { Image } from "@mantine/core";

function WorkInProgress() {
  return (
    <div key="work-in-progress" className="flex justify-center items-center">
      <Image
        width={800}
        height={500}
        alt="logo"
        src="/variantA/assets/images/underConstruction.png"
      />
    </div>
  );
}

export default WorkInProgress;
