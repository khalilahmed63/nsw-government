import ProjectFormVariantA from "./ProjectFormVariantA";

export default function ProjectDetailsVariantA(props: any) {
  return (
    <ProjectFormVariantA
      projectId={props?.projectId}
      data={props?.data}
      action={props?.action}
      edit={false}
      delete={props?.delete}
      status={props?.status}
      loading={props?.loading}
      animationType={props?.animationType}
      animation={props?.animation}
      modalDescription="Are you sure you want to edit this project?"
    />
  );
}
