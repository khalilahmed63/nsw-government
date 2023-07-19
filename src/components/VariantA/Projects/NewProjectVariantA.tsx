import CreateLottie from "../../Global/Lottie/CreateLottie";
import ProjectFormVariantA from "./ProjectFormVariantA";

export default function NewProjectVariantA(props: any) {
  return (
    <ProjectFormVariantA
      projectId={props?.projectId}
      action={props?.action}
      edit={true}
      loading={props?.loading}
      animation={props?.animation}
      animationType={<CreateLottie />}
      modalDescription="Are you sure you want to create this project?"
    />
  );
}
