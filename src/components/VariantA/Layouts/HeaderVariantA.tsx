/* eslint-disable react-hooks/exhaustive-deps */
// import { ColorSchemeToggle } from "../../Global/Common/ColorSchemeToggle";
import { Header, Image, createStyles } from "@mantine/core";
import { Link } from "react-router-dom";
import VariantToggle from "../../Global/Common/VariantToggle";

const HEADER_HEIGHT = 90;

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
    backgroundColor: "#22272B",
  },

  header: {
    position: "sticky",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
}));

export default function NavigationHeaderVariantA() {
  const { classes } = useStyles();

  return (
    <div className="fixed top-0 z-[100] w-full">
      <Header
        height={HEADER_HEIGHT}
        className={`${classes.root} border-b-4 border-b-[#8ddbe5] border-t-2 border-t-white`}
      >
        <div className="flex justify-between items-center h-full mx-5 lg:mx-10">
          <div className="h-full pb-2 flex flex-col justify-between items-start">
            <Link to="/">
              <Image
                alt="logo"
                height={25}
                src="/variantB/assets/images/logoTransport.jpeg"
              />
            </Link>
            <h1 className="text-base font-bold text-white">
              ODRE Enterprise IoT Capability
            </h1>
          </div>
          <div className="flex justify-end items-center text-sm">
            <VariantToggle />
            {/* <div className="flex justify-start items-center mb-6 mr-4">
              <ColorSchemeToggle />
            </div> */}
            <div>
              <Link to="/">
                <Image
                  alt="logo"
                  height={45}
                  src="/variantA/assets/images/nsw-government.png"
                />
              </Link>
            </div>
          </div>
        </div>
      </Header>
    </div>
  );
}
