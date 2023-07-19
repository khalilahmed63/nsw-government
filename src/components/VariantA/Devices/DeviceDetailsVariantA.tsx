import LoadingLottie from "../../Global/Lottie/LoadingLottie";
import WorkInProgress from "../../Global/WorkInProgress/WorkInProgress";

export default function DeviceDetailsVariantA(props: any) {
  return (
    <>
      <div className="p-6 flex justify-between ">
        <p className="text-3xl font-bold">Device details</p>
      </div>
      <section>
        {props?.loading ? (
          <div className="pt-20 flex justify-center items-center h-full w-full">
            <LoadingLottie />
          </div>
        ) : (
          <div className="px-6">
            <div className="mt-4">
              {" "}
              <WorkInProgress />
            </div>
          </div>
        )}
      </section>
    </>
  );
}
