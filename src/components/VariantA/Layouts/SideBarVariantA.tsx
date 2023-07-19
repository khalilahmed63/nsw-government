import { Link, useLocation } from "react-router-dom";
import { Image, Box } from "@mantine/core";
import { useState } from "react";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { IconChevronDown, IconChevronUp } from "tabler-icons";

export default function SideBarVariantA(props: any) {
  const location = useLocation();

  const [sideBar, setSideBar] = useState(true);

  const [monitor, setMonitor] = useState(
    location.pathname.endsWith("/devices") ||
      location.pathname.endsWith("/reports")
      ? true
      : false
  );
  const [onboard, setOnboard] = useState(
    location.pathname.endsWith("/projects/new") ||
      location.pathname.endsWith("/deviceGroups/new") ||
      location.pathname.endsWith("/vendors/new")
      ? true
      : false
  );
  const [manage, setManage] = useState(
    location.pathname.endsWith("/projects") ||
      location.pathname.endsWith("/deviceGroups") ||
      location.pathname.endsWith("/vendors")
      ? true
      : false
  );

  return (
    <>
      <Box
        sx={(theme: any) => ({
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.gray[8] : "#d4e6e8",
          color: theme.colorScheme === "dark" ? "white" : "black",
        })}
        p={0}
        id="default-sidebar"
        className={`fixed left-0 z-40 ${
          sideBar ? "" : "-ml-64 md:-ml-80"
        }  md: w-64 md:w-80 h-full duration-300`}
        aria-label="Sidebar"
      >
        <div className="select-none h-full overflow-y-auto pt-20 flex flex-col justify-between items-start">
          <div className=" pt-3  w-full bg-[#2E808E]">
            <Link to="/">
              <div className="border-b border-[#0B3F47]">
                <p
                  className={`flex items-center py-[0.7rem] pl-6 border-l-4 text-lg border-[#2E808E] hover:border-[#23626b] text-white hover:bg-[#23606B] ${
                    location.pathname === "/" &&
                    " bg-[#0B3F47] hover:border-yellow-300 border-yellow-300 font-bold"
                  }`}
                >
                  <span className="ml-3">
                    <SpaceDashboardOutlinedIcon fontSize="small" />
                  </span>
                  <span className="ml-3">Dashboard</span>
                </p>
              </div>
            </Link>
            <div className="border-b border-[#0B3F47]">
              <p
                className={`${
                  monitor && ""
                } flex items-center justify-between py-[0.7rem] px-6 text-lg bg-[#2E808E] text-white hover:bg-[#23606B] cursor-pointer`}
                onClick={() => {
                  setMonitor(!monitor);
                  setOnboard(false);
                  setManage(false);
                }}
              >
                <div className="">
                  <span className="ml-3">
                    <QueryStatsRoundedIcon fontSize="small" />
                  </span>
                  <span className="ml-3">Monitor</span>
                </div>
                {monitor ? (
                  <IconChevronUp size="1rem" />
                ) : (
                  <IconChevronDown size="1rem" />
                )}
              </p>
            </div>
            <div className={`${monitor ? "block" : "hidden"} duration-300`}>
              <div className="border-b border-[#0B3F47]">
                <Link to="/devices">
                  <p
                    className={`flex items-center py-[0.7rem] pl-16 border-l-4 text-lg border-[#2E808E] hover:border-[#23626b] text-white hover:bg-[#23606B]  ${
                      location.pathname.endsWith("/devices") &&
                      "  bg-[#0B3F47] hover:border-yellow-300  border-yellow-300 font-bold "
                    }`}
                  >
                    <span className="ml-3">Devices</span>
                  </p>
                </Link>
              </div>
              <div className="border-b border-[#0B3F47]">
                <Link to="/reports">
                  <p
                    className={`flex items-center py-[0.7rem] pl-16 border-l-4 text-lg border-[#2E808E] hover:border-[#23626b] text-white hover:bg-[#23606B]  ${
                      location.pathname.endsWith("/reports") &&
                      "  bg-[#0B3F47] hover:border-yellow-300  border-yellow-300 font-bold"
                    }`}
                  >
                    <span className="ml-3">Reports</span>
                  </p>
                </Link>
              </div>
            </div>
            <div className="border-b border-[#0B3F47]">
              <p
                className={`${
                  manage && ""
                } flex items-center justify-between py-[0.7rem] px-6 text-lg text-white hover:bg-[#23606B] cursor-pointer  bg-[#2E808E]`}
                onClick={() => {
                  setManage(!manage);
                  setMonitor(false);
                  setOnboard(false);
                }}
              >
                <div className="">
                  <span className="ml-3">
                    <EditNoteRoundedIcon fontSize="small" />
                  </span>
                  <span className="ml-3">Manage</span>
                </div>
                {manage ? (
                  <IconChevronUp size="1rem" />
                ) : (
                  <IconChevronDown size="1rem" />
                )}
              </p>
            </div>
            <div className={`${manage ? "block" : "hidden"} duration-300`}>
              <div className="border-b border-[#0B3F47]">
                <Link to="/projects">
                  <p
                    className={`flex items-center py-[0.7rem] pl-16 border-l-4 text-lg border-[#2E808E] hover:border-[#23626b]  text-white hover:bg-[#23606B]  ${
                      location.pathname.endsWith("/projects") &&
                      "  bg-[#0B3F47] hover:border-yellow-300  border-yellow-300 font-bold"
                    }`}
                  >
                    <span className="ml-3">Project</span>
                  </p>
                </Link>
              </div>
              <div className="border-b border-[#0B3F47]">
                <Link to="/deviceGroups">
                  <p
                    className={`flex items-center py-[0.7rem] pl-16 border-l-4 text-lg border-[#2E808E] hover:border-[#23626b]  text-white hover:bg-[#23606B] ${
                      location.pathname.endsWith("/deviceGroups") &&
                      "  bg-[#0B3F47] hover:border-yellow-300  border-yellow-300 font-bold"
                    }`}
                  >
                    <span className="ml-3">Device Model</span>
                  </p>
                </Link>
              </div>
              <div className="border-b border-[#0B3F47]">
                <Link to="/vendors">
                  <p
                    className={`flex items-center py-[0.7rem] pl-16 border-l-4 text-lg border-[#2E808E] hover:border-[#23626b]  text-white hover:bg-[#23606B] ${
                      location.pathname.endsWith("/vendors") &&
                      "  bg-[#0B3F47] hover:border-yellow-300  border-yellow-300 font-bold"
                    }`}
                  >
                    <span className="ml-3">Vendor</span>
                  </p>
                </Link>
              </div>
            </div>
            <div className="border-b border-[#0B3F47]">
              <p
                className={`${
                  onboard && ""
                } flex items-center justify-between py-[0.7rem] px-6 text-lg text-white hover:bg-[#23606B] cursor-pointer  bg-[#2E808E]`}
                onClick={() => {
                  setOnboard(!onboard);
                  setManage(false);
                  setMonitor(false);
                }}
              >
                <div className="">
                  <span className="ml-3">
                    <AddBoxOutlinedIcon fontSize="small" />
                  </span>
                  <span className="ml-3">Onboard</span>
                </div>
                {onboard ? (
                  <IconChevronUp size="1rem" />
                ) : (
                  <IconChevronDown size="1rem" />
                )}
              </p>
            </div>
            <div className={`${onboard ? "block" : "hidden"} duration-300 `}>
              <div className="border-b border-[#0B3F47]">
                <Link to="/projects/new">
                  <p
                    className={` flex items-center py-[0.7rem] pl-16 border-l-4 text-lg border-[#2E808E] hover:border-[#23626b]  text-white hover:bg-[#23606B] ${
                      location.pathname.endsWith("/projects/new") &&
                      "  bg-[#0B3F47] hover:border-yellow-300  border-yellow-300 font-bold"
                    }`}
                  >
                    <span className="ml-3">New Project</span>
                  </p>
                </Link>
              </div>
              <div className="border-b border-[#0B3F47]">
                <Link to="/deviceGroups/new">
                  <p
                    className={` flex items-center py-[0.7rem] pl-16  border-l-4 text-lg border-[#2E808E] hover:border-[#23626b]  text-white hover:bg-[#23606B] ${
                      location.pathname.endsWith("/deviceGroups/new") &&
                      "  bg-[#0B3F47] hover:border-yellow-300  border-yellow-300 font-bold"
                    }`}
                  >
                    <span className="ml-3">New Device Model</span>
                  </p>
                </Link>
              </div>
              <div className="border-b border-[#0B3F47]">
                <Link to="/vendors/new">
                  <p
                    className={` flex items-center py-[0.7rem] pl-16  border-l-4 text-lg border-[#2E808E] hover:border-[#23626b]  text-white hover:bg-[#23606B] ${
                      location.pathname.endsWith("/vendors/new") &&
                      " bg-[#0B3F47] hover:border-yellow-300  border-yellow-300 font-bold"
                    }`}
                  >
                    <span className="ml-3">New Vendor</span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="pb-8 mx-5 lg:mx-10">
            <Link to="/">
              <Image
                alt="logo"
                height={70}
                src="/variantA/assets/images/odre.png"
              />
            </Link>
          </div>
        </div>
      </Box>
      <div
        className={`${
          sideBar ? "sm:ml-64 md:ml-80" : ""
        } pt-[0.65rem] duration-500`}
      >
        <div
          className="md:hidden fixed bottom-10 right-10 rounded-full z-50"
          onClick={() => {
            setSideBar(!sideBar);
          }}
        >
          {!sideBar ? (
            <MenuIcon fontSize="small" />
          ) : (
            <CloseIcon fontSize="small" />
          )}
        </div>
        <div className="mt-20 min-h-screen mx-auto">{props.children}</div>
      </div>
    </>
  );
}
