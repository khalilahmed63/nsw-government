import { Link } from "react-router-dom";
import { Loader, LoadingOverlay } from "@mantine/core";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ActivitiesVariantA from "../Activities.tsx/ActivitiesVariantA";
import LanOutlinedIcon from "@mui/icons-material/LanOutlined";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import WifiIcon from "@mui/icons-material/Wifi";

export default function HomeVariantA(props: any) {
  return (
    <>
      <div className="p-6 flex justify-between ">
        <p className="text-3xl font-bold">Dashboard</p>
      </div>
      <>
        {false ? (
          <div className="mt-20 flex justify-center items-center h-full w-full">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="mb-10 px-6">
            <p className="text-sm">Monitor devices</p>
            <div className=" flex flex-wrap  lg:mr-4 my-2 mb-4">
              <Link to="/devices">
                <div className="border border-[#2E808E] shadow-md shadow-[#2E808E] hover:shadow-lg hover:shadow-[#2E808E] duration-300 rounded border-b-4 p-4 w-60 h-32 sm:mr-4 relative flex flex-col justify-between">
                  <LoadingOverlay
                    visible={props?.deviceLoading}
                    overlayBlur={2}
                    className="!z-0"
                  />
                  <p className="text-4xl">
                    {props?.devicesCount?.count?.devices?.total || 0}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-sm font-bold mt-2">Total devices</p>
                    <DeviceHubIcon
                      className="text-[#2E808E]"
                      fontSize="medium"
                    />
                  </div>
                </div>
              </Link>
              <Link to="/devices">
                <div className="border border-[#2E808E] shadow-md shadow-[#2E808E] hover:shadow-lg hover:shadow-[#2E808E] duration-300 rounded border-b-4 p-4 w-60 h-32 sm:mr-4 relative flex flex-col justify-between">
                  <LoadingOverlay
                    visible={props?.deviceLoading}
                    overlayBlur={2}
                    className="!z-0"
                  />
                  <p className="text-4xl">
                    {props?.devicesCount?.count?.devices?.offline || 0}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-sm font-bold mt-2">Offline devices</p>
                    <WifiOffIcon className="text-[#2E808E]" fontSize="medium" />
                  </div>
                </div>
              </Link>
              <Link to="/devices">
                <div className="border border-[#2E808E] shadow-md shadow-[#2E808E] hover:shadow-lg hover:shadow-[#2E808E] duration-300 rounded border-b-4 p-4 w-60 h-32 sm:mr-4 relative flex flex-col justify-between">
                  <LoadingOverlay
                    visible={props?.deviceLoading}
                    overlayBlur={2}
                    className="!z-0"
                  />
                  <p className="text-4xl">
                    {props?.devicesCount?.count?.devices?.online || 0}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-sm font-bold mt-2">Online devices</p>
                    <WifiIcon className="text-[#2E808E]" fontSize="medium" />
                  </div>
                </div>
              </Link>
            </div>
            <p className="text-sm">Manage records</p>

            <div className=" flex flex-wrap lg:mr-4 my-2 mb-4">
              <Link to="/vendors">
                <div className="border border-[#2E808E] shadow-md shadow-[#2E808E] hover:shadow-lg hover:shadow-[#2E808E] duration-300 rounded border-b-4 p-4 w-60 h-32 sm:mr-4 relative flex flex-col justify-between">
                  <LoadingOverlay
                    visible={props?.vendorLoading}
                    overlayBlur={2}
                    className="!z-0"
                  />
                  <p className="text-4xl">{props?.vendorsCount || 0}</p>
                  <div className="flex justify-between">
                    <p className="text-sm font-bold mt-2">Vendors</p>
                    <AccountBoxOutlinedIcon
                      className="text-[#2E808E]"
                      fontSize="medium"
                    />
                  </div>
                </div>
              </Link>
              <Link to="/projects">
                <div className="border border-[#2E808E] shadow-md shadow-[#2E808E] hover:shadow-lg hover:shadow-[#2E808E] duration-300 rounded border-b-4 p-4 w-60 h-32 sm:mr-4 relative flex flex-col justify-between">
                  <LoadingOverlay
                    visible={props?.projectLoading}
                    overlayBlur={2}
                    className="!z-0"
                  />
                  <p className="text-4xl">{props?.projectsCount || 0}</p>
                  <div className="flex justify-between">
                    <p className="text-sm font-bold mt-2">Projects</p>
                    <InsertDriveFileOutlinedIcon
                      className="text-[#2E808E]"
                      fontSize="medium"
                    />
                  </div>
                </div>
              </Link>
              <Link to="/deviceGroups">
                <div className="border border-[#2E808E] shadow-md shadow-[#2E808E] hover:shadow-lg hover:shadow-[#2E808E] duration-300 rounded border-b-4 p-4 w-60 h-32 sm:mr-4 relative flex flex-col justify-between">
                  <LoadingOverlay
                    visible={props?.deviceGroupLoading}
                    overlayBlur={2}
                    className="!z-0"
                  />
                  <p className="text-4xl">{props?.deviceGroupsCount || 0}</p>
                  <div className="flex justify-between">
                    <p className="text-sm font-bold mt-2">Device models</p>
                    <LanOutlinedIcon
                      className="text-[#2E808E]"
                      fontSize="medium"
                    />
                  </div>
                </div>
              </Link>
            </div>
            <div className=" pt-4">
              <ActivitiesVariantA type="all" />
            </div>
          </div>
        )}
      </>
    </>
  );
}
