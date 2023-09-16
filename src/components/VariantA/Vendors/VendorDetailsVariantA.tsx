import VendorFormVariantA from "./VendorFormVariantA";

export default function VendorDetailsVariantA(props: any) {
  return (
    <VendorFormVariantA
      vendorId={props?.vendorId}
      data={props?.data}
      action={props?.action}
      edit={false}
      delete={props?.delete}
      loading={props?.loading}
      animation={props?.animation}
      animationType={props?.animationType}
      modalDescription="Are you sure you want to edit this vendor?"
    />
  );
}
