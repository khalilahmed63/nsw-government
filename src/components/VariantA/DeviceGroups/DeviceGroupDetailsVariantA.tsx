import DeviceGroupFormVariantA from "./DeviceGroupFormVariantA";

export default function DeviceGroupDetailsVariantA(props: any) {
  return (
    <DeviceGroupFormVariantA
      deviceGroupId={props?.deviceGroupId}
      data={props?.deviceGroupDetails}
      action={props?.action}
      edit={false}
      delete={props?.delete}
      error={props?.error}
      loading={props?.loading}
      animation={props?.animation}
      animationType={props?.animationType}
      modalDescription="Are you sure you want to edit this device model?"
    />
  );
}
