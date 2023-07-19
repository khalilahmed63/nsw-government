import SideBarVariantA from "../../VariantA/Layouts/SideBarVariantA";
import NavigationHeaderVariantA from "../../VariantA/Layouts/HeaderVariantA";

export default function Main(props: any) {
  return (
    <>
      <NavigationHeaderVariantA />
      <SideBarVariantA>{props.children}</SideBarVariantA>
    </>
  );
}
