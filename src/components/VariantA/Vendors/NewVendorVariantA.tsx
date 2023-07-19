import CreateLottie from "../../Global/Lottie/CreateLottie";
import VendorFormVariantA from "./VendorFormVariantA";

export default function NewVendorVariantA(props: any) {
  return (
    <VendorFormVariantA
      action={props?.action}
      edit={true}
      loading={false}
      animation={props?.animation}
      animationType={<CreateLottie />}
      modalDescription="Are you sure you want to create new vendor?"
    />
  );
}
