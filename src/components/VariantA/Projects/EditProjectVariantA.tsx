import ProjectFormVariantA from "./ProjectFormVariantA";

export default function EditProjectVariantA(props: any) {
  return (
    <ProjectFormVariantA
      projectId={props?.projectId}
      data={props?.data}
      action={props?.action}
      fetch={props?.fetch}
      edit={true}
      loading={props?.loading}
      animation={props?.animation}
      animationType={props?.animationType}
      modalDescription="Are you sure you want to edit this project?"
    />
  );
}
