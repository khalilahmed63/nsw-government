import DeviceGroupFormVariantA from "./DeviceGroupFormVariantA";

export default function EditDeviceGroupVariantA(props: any) {
  return (
    <DeviceGroupFormVariantA
      deviceGroupId={props?.deviceGroupId}
      data={props?.data}
      action={props?.action}
      fetch={props?.fetch}
      edit={true}
      loading={props?.loading}
      animation={props?.animation}
      animationType={props?.animationType}
      modalDescription="Are you sure you want to edit this device model?"
    />
  );
}
