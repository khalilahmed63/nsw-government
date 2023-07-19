import CreateLottie from "../../Global/Lottie/CreateLottie";
import DeviceGroupFormVariantA from "./DeviceGroupFormVariantA";

export default function NewDeviceGroupVariantA(props: any) {
  return (
    <DeviceGroupFormVariantA
      action={props?.action}
      edit={true}
      loading={props?.loading}
      animation={props?.animation}
      animationType={<CreateLottie />}
      modalDescription="Are you sure you want to create this device model?"
    />
  );
}
