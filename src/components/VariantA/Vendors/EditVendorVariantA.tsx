import EditLottie from "../../Global/Lottie/EditLottie";
import VendorFormVariantA from "./VendorFormVariantA";

export default function EditVendorVariantA(props: any) {
  return (
    <VendorFormVariantA
      vendorId={props?.vendorId}
      data={props?.vendorDetails}
      action={props?.action}
      fetch={props?.fetch}
      edit={true}
      loading={props?.loading}
      animation={props?.animation}
      animationType={<EditLottie />}
      modalDescription="Are you sure you want to edit this vendor?"
    />
  );
}
