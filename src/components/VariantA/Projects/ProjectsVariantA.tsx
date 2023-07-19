import { Button, Table, Select } from "@mantine/core";
import { IconChevronDown } from "tabler-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import LoadingLottie from "../../Global/Lottie/LoadingLottie";

export default function ProjectsVariantA(props: any) {
  const [deviceGroup, setDeviceGroup] = useState<any>();
  const [project, setProject] = useState<any>();
  const [vendor, setVendor] = useState<any>();
  const [search, setSearch] = useState<any>(false);
  const [result, setResult] = useState<any>([]);
  const records: any[] = [];

  const searchRecord = (
    array: any,
    project: any,
    vendor: any,
    deviceGroup: any
  ) => {
    setSearch(true);
    for (const object of array) {
      if (object.projectId === project) {
        setResult([object]);
        return;
      } else {
        setResult([]);
      }
    }
    return null;
  };

  return (
    <>
      {props?.error ? (
        <div className="w-full h-screen -mt-20 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <BsExclamationCircle
              className="cursor-pointer mr-2"
              fontSize="large"
              size={100}
            />
            <p className="text-6xl font-bold">oops...!</p>
            <p className="text-xl my-2">Something went wrong</p>
            <Button
              className="border bg-[#202E61] hover:border-[#202E61] hover:bg-[#26477B] text-white"
              // onClick={reload()}
            >
              Reload
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-6 flex justify-between">
            <p className="text-3xl font-bold">Project</p>
            <Link to="/projects/new">
              <Button
                className="border-2 rounded-md border-[#202E61] text-[#202E61] hover:bg-[#202E61] hover:text-white"
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === "dark" ? "#F3F4F6" : "#F3F4F6",
                })}
              >
                Onboard new project
              </Button>
            </Link>
          </div>
          <section>
            {props?.loading ? (
              <div className="pt-20 flex justify-center items-center h-full w-full">
                <LoadingLottie />
              </div>
            ) : (
              <div>
                <div className="px-6">
                  {result ? <></> : <></>}
                  <>
                    {props?.projects.length > 0 ? (
                      <>
                        <div className="mb-4 flex items-start">
                          <div className="">
                            <div className="flex mb-4">
                              <Select
                                label="Project name"
                                placeholder="Select project name"
                                searchable
                                // rightSection={<IconChevronDown size="1rem" />}
                                nothingFound="No options"
                                className="w-48 mr-4"
                                data={props?.projectList}
                                value={project}
                                onChange={setProject}
                              />
                              <Select
                                label="Vendor name"
                                placeholder="Select vendor name"
                                searchable
                                // rightSection={<IconChevronDown size="1rem" />}
                                nothingFound="No options"
                                className="w-48 mr-4"
                                data={props?.vendorList}
                                value={vendor}
                                onChange={setVendor}
                              />
                            </div>
                            <div className="flex">
                              <Select
                                label="Device model name"
                                placeholder="Select device model name"
                                searchable
                                // rightSection={<IconChevronDown size="1rem" />}
                                nothingFound="No options"
                                className="w-48 mr-4"
                                data={props?.deviceGroupList}
                                value={deviceGroup}
                                onChange={setDeviceGroup}
                              />
                            </div>
                          </div>
                          <div className="mt-6 flex items-center">
                            <Button
                              disabled={!project && !vendor && !deviceGroup}
                              className="mr-4 border-2 border-[#202E61] bg-[#202E61] hover:bg-[#26477B] text-white"
                              onClick={() => {
                                searchRecord(
                                  props?.projects,
                                  project,
                                  vendor,
                                  deviceGroup
                                );
                              }}
                            >
                              Apply
                            </Button>
                            <button
                              disabled={!search}
                              className="text-sm cursor-pointer text-[#202E61] font-bold underline underline-offset-2"
                              onClick={() => {
                                setResult([]);
                                setProject("");
                                setVendor("");
                                setDeviceGroup("");
                                setSearch(false);
                              }}
                            >
                              Clear filters
                            </button>
                          </div>
                        </div>
                        <>
                          {search ? (
                            <>
                              {result?.map((item: any) => (
                                <>
                                  <Table
                                    key={item.id}
                                    verticalSpacing="xs"
                                    fontSize="sm"
                                    highlightOnHover
                                    className=" border-t-2"
                                  >
                                    <tbody>
                                      <tr>
                                        <td className="w-[16.66%]">
                                          <p className="font-bold !text-[#2E808E]">
                                            Project name
                                          </p>
                                          <p>
                                            {item?.data?.projectName || "-"}
                                          </p>
                                        </td>
                                        <td className="w-[16.66%]">
                                          <p className="font-bold !text-[#2E808E]">
                                            Sub branch
                                          </p>
                                          <p>{item?.data?.subBranch || "-"}</p>
                                        </td>
                                        <td className="w-[16.66%]">
                                          <p className="font-bold !text-[#2E808E]">
                                            Team
                                          </p>
                                          <p>{item?.data?.team || "-"}</p>
                                        </td>
                                        <td className="w-[16.66%]">
                                          <p className="font-bold !text-[#2E808E]">
                                            Project status
                                          </p>
                                          {item?.data?.projectState ? (
                                            <p className=" text-black bg-green-200 text-xs w-fit mt-1 px-2 rounded-full">
                                              Active
                                            </p>
                                          ) : (
                                            <p className=" text-black bg-red-200 text-xs w-fit mt-1 px-2 rounded-full">
                                              Inactive
                                            </p>
                                          )}
                                        </td>
                                        <td className="w-[16.66%]">
                                          <p className="font-bold !text-[#2E808E]">
                                            Last connected
                                          </p>
                                          <p>
                                            {item?.data?.updatedTimestamp?.slice(
                                              0,
                                              10
                                            ) ||
                                              item?.data?.createdTimestamp?.slice(
                                                0,
                                                10
                                              )}
                                          </p>
                                        </td>
                                        <td className="w-[16.66%]">
                                          <Link
                                            to={`/projects/${item.data?.entityId}`}
                                          >
                                            <Button className="border-2 border-[#202E61] rounded-md text-[#202E61] hover:text-white hover:bg-[#202E61]">
                                              Manage
                                            </Button>
                                          </Link>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </Table>

                                  <Table
                                    key={item.id}
                                    verticalSpacing="xs"
                                    fontSize="sm"
                                    highlightOnHover
                                    className=" border-t-2"
                                    sx={(theme) => ({
                                      backgroundColor:
                                        theme.colorScheme === "dark"
                                          ? theme.colors.dark[6]
                                          : "#F3F4F6",
                                      width: "100%",
                                    })}
                                  >
                                    <tbody>
                                      <tr className="w-full">
                                        <td className="w-[16.66%]">
                                          <p className="font-bold ">Vendor</p>
                                        </td>
                                        <td className="w-[16.66%]">
                                          <p className="font-bold">
                                            Device model
                                          </p>
                                        </td>
                                        <td className="w-[16.66%]">
                                          <p className="font-bold">Devices</p>
                                        </td>
                                        <td className="w-[16.66%]">
                                          <p className="font-bold">Online</p>
                                        </td>
                                        <td className="w-[33.2%]">
                                          <p className="font-bold">Offline</p>
                                        </td>
                                      </tr>
                                      {records?.map((item: any) => (
                                        <tr>
                                          <td className="w-[16.66%]">
                                            <Link to="/vendors/5c29d5e9-f5b7-4959-a48c-7f2714c79822">
                                              <p>{item?.vendor || "-"}</p>
                                            </Link>
                                          </td>
                                          <td className="w-[16.66%]">
                                            <Link to="/deviceGroups/0829ceea-9f92-4ad9-a0e4-02b783c2bf68">
                                              <p>{item?.deviceGroup || "-"}</p>
                                            </Link>
                                          </td>
                                          <td className="w-[16.66%]">
                                            <Link to="/devices">
                                              <p>{item?.devices || "-"}</p>
                                            </Link>
                                          </td>
                                          <td className="w-[16.66%]">
                                            <p>{item?.online || "-"}</p>
                                          </td>
                                          <td className="w-[33.2%]">
                                            <p>{item?.offline || "-"}</p>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                </>
                              ))}
                            </>
                          ) : (
                            <>
                              {props?.projects.map((item: any) => (
                                <>
                                  <Table
                                    key={item.id}
                                    verticalSpacing="xs"
                                    fontSize="sm"
                                    highlightOnHover
                                    className=" border-t-2"
                                  >
                                    <tbody>
                                      <tr>
                                        <td className="w-[16.66%]">
                                          <p className="font-bold !text-[#2E808E]">
                                            Project name
                                          </p>
                                          <p>
                                            {item?.data?.projectName || "-"}
                                          </p>
                                        </td>
                                        <td className="w-[16.66%]">
                                          <p className="font-bold !text-[#2E808E]">
                                            Sub branch
                                          </p>
                                          <p>{item?.data?.subBranch || "-"}</p>
                                        </td>
                                        <td className="w-[16.66%]">
                                          <p className="font-bold !text-[#2E808E]">
                                            Team
                                          </p>
                                          <p>{item?.data?.team || "-"}</p>
                                        </td>
                                        <td className="w-[16.66%]">
                                          <p className="font-bold !text-[#2E808E]">
                                            Project status
                                          </p>
                                          {item?.data?.projectState ? (
                                            <p className=" text-black bg-green-200 text-xs w-fit mt-1 px-2 rounded-full">
                                              Active
                                            </p>
                                          ) : (
                                            <p className=" text-black bg-red-200 text-xs w-fit mt-1 px-2 rounded-full">
                                              Inactive
                                            </p>
                                          )}
                                        </td>
                                        <td className="w-[16.66%]">
                                          <p className="font-bold !text-[#2E808E]">
                                            Last connected
                                          </p>
                                          <p>
                                            {item?.data?.updatedTimestamp?.slice(
                                              0,
                                              10
                                            ) ||
                                              item?.data?.createdTimestamp?.slice(
                                                0,
                                                10
                                              )}
                                          </p>
                                        </td>
                                        <td className="w-[16.66%]">
                                          <Link
                                            to={`/projects/${item.data?.entityId}`}
                                          >
                                            <Button className="border-2 border-[#202E61] rounded-md text-[#202E61] hover:text-white hover:bg-[#202E61]">
                                              Manage
                                            </Button>
                                          </Link>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </Table>

                                  <Table
                                    key={item.id}
                                    verticalSpacing="xs"
                                    fontSize="sm"
                                    highlightOnHover
                                    className=" border-t-2"
                                    sx={(theme) => ({
                                      backgroundColor:
                                        theme.colorScheme === "dark"
                                          ? theme.colors.dark[6]
                                          : "#F3F4F6",
                                      width: "100%",
                                    })}
                                  >
                                    <tbody>
                                      <tr className="w-full">
                                        <td className="w-[16.66%]">
                                          <p className="font-bold ">Vendor</p>
                                        </td>
                                        <td className="w-[16.66%]">
                                          <p className="font-bold">
                                            Device model
                                          </p>
                                        </td>
                                        <td className="w-[16.66%]">
                                          <p className="font-bold">Devices</p>
                                        </td>
                                        <td className="w-[16.66%]">
                                          <p className="font-bold">Online</p>
                                        </td>
                                        <td className="w-[33.2%]">
                                          <p className="font-bold">Offline</p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="w-[16.66%]">
                                          {item?.data?.vendor.length > 0 ? (
                                            <>
                                              {item?.data?.vendor?.map(
                                                (item: any) => (
                                                  <Link
                                                    to={`deviceGroups/${item?.vendorId}`}
                                                  >
                                                    <p>
                                                      {item?.vendorName || "-"}
                                                    </p>
                                                  </Link>
                                                )
                                              )}
                                            </>
                                          ) : (
                                            <p>{"-"}</p>
                                          )}
                                        </td>
                                        <td className="w-[16.66%]">
                                          {item?.data?.deviceGroup.length >
                                          0 ? (
                                            <>
                                              {item?.data?.deviceGroup?.map(
                                                (item: any) => (
                                                  <Link
                                                    to={`deviceGroups/${item?.deviceGroupId}`}
                                                  >
                                                    <p>
                                                      {item?.deviceGroupName ||
                                                        "-"}
                                                    </p>
                                                  </Link>
                                                )
                                              )}
                                            </>
                                          ) : (
                                            <p>{"-"}</p>
                                          )}
                                        </td>
                                        <td className="w-[16.66%]">
                                          <Link to="/devices">
                                            <p>{item?.devices || "-"}</p>
                                          </Link>
                                        </td>
                                        <td className="w-[16.66%]">
                                          <p>
                                            {item?.online ||
                                              Math.round(item?.devices / 2) ||
                                              "-"}
                                          </p>
                                        </td>
                                        <td className="w-[33.2%]">
                                          <p>
                                            {item?.offline ||
                                              Math.round(item?.devices / 2) ||
                                              "-"}
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </>
                              ))}
                            </>
                          )}
                          {search && result.length === 0 && (
                            <p className="text-4xl text-red-500 font-bold text-center mt-20">
                              Record not found
                            </p>
                          )}
                        </>
                      </>
                    ) : (
                      <p className="text-4xl text-red-500 font-bold text-center mt-20">
                        No projects
                      </p>
                    )}
                  </>
                </div>
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}
