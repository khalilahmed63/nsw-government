/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Table,
  MultiSelect,
  Pagination,
  ActionIcon,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LoadingLottie from "../../Global/Lottie/LoadingLottie";
import { AiOutlineSortAscending } from "react-icons/ai";
import dayjs from "dayjs";
import { BsSortNumericDown } from "react-icons/bs";

export default function DevicesVariantA(props:any) {
  const [sort, setSort] = useState<any>("");
  const [search, setSearch] = useState<any>([]);
  const [result, setResult] = useState<any>([]);
  const [state, setState] = useState<any>([]);
  const [deviceGroup, setDeviceGroup] = useState<any>([]);
  const [project, setProject] = useState<any>([]);
  const [vendor, setVendor] = useState<any>([]);
  const [activePage, setPage] = useState(1);
  

  const navigate = useNavigate();
  const today = new Date();

  const fetchData = () => {
    props.fetchActivities({
      activePage,
      state,
      project,
      vendor,
      deviceGroup,
    });
  };

  const deviceSortData = [...props?.devices]?.sort((a: any, b: any) =>
    a.DeviceId.localeCompare(b.DeviceId)
  );
  const projectSortData = [...props?.devices]?.sort((a: any, b: any) =>
    a.ProjectName.localeCompare(b.ProjectName)
  );
  const vendorSortData = [...props?.devices]?.sort((a: any, b: any) =>
    a.VendorName.localeCompare(b.VendorName)
  );
  const deviceGroupSortData = [...props?.devices]?.sort((a: any, b: any) =>
    a.DeviceGroupName.localeCompare(b.DeviceGroupName)
  );
  const stateSortData = [...props?.devices]?.sort((a: any, b: any) =>
    a.Status.localeCompare(b.Status)
  );
  // const updateSortData = props?.devices?.sort((a: any, b: any) =>
  //   a.DeviceId.localeCompare(b.DeviceId)
  // );

  useEffect(() => {
    fetchData();
  }, [activePage]);
  //  console.log(props.data,'props.data');
  return (
    <>
      <div className="p-6 flex justify-between ">
        <p className="text-3xl font-bold">Monitor</p>
      </div>
      <section>
        {props?.loading ? (
          <div className="pt-20 flex justify-center items-center h-full w-full">
            <LoadingLottie />
          </div>
        ) : (
          <div className="px-6">
            <div className=" flex items-end">
              <MultiSelect
                label="State"
                placeholder="State"
                searchable
                clearable
                nothingFound="No options"
                className="w-96 mr-4"
                data={[
                  "DeviceConnected",
                  "DeviceDisconnected",
                  "DeviceCreated",
                  "DeviceDeleted",
                ]}
                value={state}
                onChange={setState}
              />
              <MultiSelect
                label="Project"
                placeholder="Project"
                searchable
                clearable
                maxSelectedValues={2}
                nothingFound="No options"
                className="w-96 mr-4"
                data={props?.projectList}
                value={project}
                onChange={setProject}
              />
              <div className="flex items-center">
                <Button
                  disabled={
                    state.length === 0 &&
                    project.length === 0 &&
                    vendor.length === 0 &&
                    deviceGroup.length === 0
                  }
                  className="mr-4 border-2 border-[#202E61] bg-[#202E61] hover:bg-[#26477B] text-white"
                  onClick={() => {
                    fetchData();
                  }}
                >
                  Apply
                </Button>
                <button
                  disabled={false}
                  className="text-sm cursor-pointer text-[#202E61] font-bold underline underline-offset-2"
                  onClick={() => {
                    setResult([]);
                    setState([]);
                    setProject([]);
                    setVendor([]);
                    setDeviceGroup([]);
                    setSearch(false);
                    props.fetchActivities({});
                  }}
                >
                  Clear filters
                </button>
              </div>
            </div>
            <div className="flex items-end">
              <MultiSelect
                label="Vendor"
                placeholder="Vendor"
                searchable
                clearable
                maxSelectedValues={5}
                nothingFound="No options"
                className="w-96 mr-4"
                data={props?.vendorList}
                value={vendor}
                onChange={setVendor}
              />
              <MultiSelect
                label="Device Model"
                placeholder="Device Model"
                searchable
                clearable
                maxSelectedValues={2}
                nothingFound="No options"
                className="w-96 mr-4"
                data={props?.deviceGroupList}
                value={deviceGroup}
                onChange={setDeviceGroup}
              />
            </div>
            <div className="mt-4">
              <Table
                verticalSpacing="xs"
                striped
                fontSize="sm"
                highlightOnHover
              >
                <thead>
                  <tr>
                    <th className="w-[14.2%] !text-[#2E808E]">
                      <span className=" flex justify-between">
                        Device ID
                        <ActionIcon
                          onClick={() => setSort("")}
                          size="sm"
                          className={`${sort === "" && "text-black"}`}
                          sx={(theme) => ({
                            backgroundColor:
                              theme.colorScheme === "dark"
                                ? theme.colors.dark[6]
                                : theme.colors.gray[0],
                            color:
                              theme.colorScheme === "dark"
                                ? theme.colors.yellow[4]
                                : theme.colors.blue[6],
                          })}
                        >
                          <AiOutlineSortAscending size={25} />
                        </ActionIcon>
                      </span>
                    </th>
                    <th className="w-[14.2%] !text-[#2E808E]">
                      <span className=" flex justify-between">
                        Project name
                        <ActionIcon
                          onClick={() => setSort("project")}
                          size="sm"
                          className={`${sort === "project" && "text-black"}`}
                          sx={(theme) => ({
                            backgroundColor:
                              theme.colorScheme === "dark"
                                ? theme.colors.dark[6]
                                : theme.colors.gray[0],
                            color:
                              theme.colorScheme === "dark"
                                ? theme.colors.yellow[4]
                                : theme.colors.blue[6],
                          })}
                        >
                          <AiOutlineSortAscending size={25} />
                        </ActionIcon>
                      </span>
                    </th>

                    <th className="w-[14.2%] !text-[#2E808E]">
                      <span className=" flex justify-between">
                        Vendor name
                        <ActionIcon
                          onClick={() => setSort("vendor")}
                          size="sm"
                          className={`${sort === "vendor" && "text-black"}`}
                          sx={(theme) => ({
                            backgroundColor:
                              theme.colorScheme === "dark"
                                ? theme.colors.dark[6]
                                : theme.colors.gray[0],
                            color:
                              theme.colorScheme === "dark"
                                ? theme.colors.yellow[4]
                                : theme.colors.blue[6],
                          })}
                        >
                          <AiOutlineSortAscending size={25} />
                        </ActionIcon>
                      </span>
                    </th>
                    <th className="w-[14.2%] !text-[#2E808E]">
                      <span className=" flex justify-between">
                        Device model name
                        <ActionIcon
                          onClick={() => setSort("deviceGroup")}
                          size="sm"
                          className={`${sort === "deviceGroup" && "text-black"
                            }`}
                          sx={(theme) => ({
                            backgroundColor:
                              theme.colorScheme === "dark"
                                ? theme.colors.dark[6]
                                : theme.colors.gray[0],
                            color:
                              theme.colorScheme === "dark"
                                ? theme.colors.yellow[4]
                                : theme.colors.blue[6],
                          })}
                        >
                          <AiOutlineSortAscending size={25} />
                        </ActionIcon>
                      </span>
                    </th>
                    <th className="w-[14.2%] !text-[#2E808E]">
                      <span className=" flex justify-between">
                        Last updated state
                        <ActionIcon
                          onClick={() => setSort("state")}
                          size="sm"
                          className={`${sort === "state" && "text-black"}`}
                          sx={(theme) => ({
                            backgroundColor:
                              theme.colorScheme === "dark"
                                ? theme.colors.dark[6]
                                : theme.colors.gray[0],
                            color:
                              theme.colorScheme === "dark"
                                ? theme.colors.yellow[4]
                                : theme.colors.blue[6],
                          })}
                        >
                          <AiOutlineSortAscending size={25} />
                        </ActionIcon>
                      </span>
                    </th>
                    <th className="w-[14.2%] !text-[#2E808E]">
                      <span className=" flex justify-between">
                        Last updated
                        <ActionIcon
                          onClick={() => setSort("date")}
                          size="sm"
                          className={`${sort === "date" && "text-black"}`}
                          sx={(theme) => ({
                            backgroundColor:
                              theme.colorScheme === "dark"
                                ? theme.colors.dark[6]
                                : theme.colors.gray[0],
                            color:
                              theme.colorScheme === "dark"
                                ? theme.colors.yellow[4]
                                : theme.colors.blue[6],
                          })}
                        >
                          <BsSortNumericDown size={25} />
                        </ActionIcon>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sort === "" ? (
                    <>
                      {props?.data?.map((item: any) => (
                        <tr
                          key={item?.DeviceId}
                          className="cursor-pointer"
                          onClick={() => {
                            navigate(`/devices/${item?.ActivityId}`);
                          }}
                        >
                          <td>{item?.DeviceId}</td>
                          <td>{item?.ProjectName || item?.ProjectId}</td>
                          <td>{item?.VendorName || item?.VendorId}</td>
                          <td>
                            {item?.DeviceGroupName || item?.DeviceGroupId}
                          </td>
                          <td>{item?.Status}</td>
                          {/* <td>{item?.Timestamp?.slice(0, 10)}</td> */}
                          <td>{item?.Timestamp}</td>
                          {/* <td>
                        {dayjs(item?.Timestamp).format(
                          "DD/MMM/YYYY (hh:mm:ss a)"
                        )}
                      </td> */}
                        </tr>
                      ))}
                    </>
                  ) : sort === "project" ? (
                    <>
                      {projectSortData.map((item: any) => (
                        <tr
                          key={item?.DeviceId}
                          className="cursor-pointer"
                          onClick={() => {
                            navigate(`/devices/${item?.ActivityId}`);
                          }}
                        >
                          <td>{item?.DeviceId}</td>
                          <td>{item?.ProjectName || item?.ProjectId}</td>
                          <td>{item?.VendorName || item?.VendorId}</td>
                          <td>
                            {item?.DeviceGroupName || item?.DeviceGroupId}
                          </td>
                          <td>{item?.Status}</td>
                          <td>{item?.Timestamp}</td>
                        </tr>
                      ))}
                    </>
                  ) : sort === "vendor" ? (
                    <>
                      {vendorSortData.map((item: any) => (
                        <tr
                          key={item?.DeviceId}
                          className="cursor-pointer"
                          onClick={() => {
                            navigate(`/devices/${item?.ActivityId}`);
                          }}
                        >
                          <td>{item?.DeviceId}</td>
                          <td>{item?.ProjectName || item?.ProjectId}</td>
                          <td>{item?.VendorName || item?.VendorId}</td>
                          <td>
                            {item?.DeviceGroupName || item?.DeviceGroupId}
                          </td>
                          <td>{item?.Status}</td>
                          <td>{item?.Timestamp}</td>
                        </tr>
                      ))}
                    </>
                  ) : sort === "deviceGroup" ? (
                    <>
                      {deviceGroupSortData.map((item: any) => (
                        <tr
                          key={item?.DeviceId}
                          className="cursor-pointer"
                          onClick={() => {
                            navigate(`/devices/${item?.ActivityId}`);
                          }}
                        >
                          <td>{item?.DeviceId}</td>
                          <td>{item?.ProjectName || item?.ProjectId}</td>
                          <td>{item?.VendorName || item?.VendorId}</td>
                          <td>
                            {item?.DeviceGroupName || item?.DeviceGroupId}
                          </td>
                          <td>{item?.Status}</td>
                          <td>{item?.Timestamp}</td>
                        </tr>
                      ))}
                    </>
                  ) : sort === "state" ? (
                    <>
                      {stateSortData.map((item: any) => (
                        <tr
                          key={item?.DeviceId}
                          className="cursor-pointer"
                          onClick={() => {
                            navigate(`/devices/${item?.ActivityId}`);
                          }}
                        >
                          <td>{item?.DeviceId}</td>
                          <td>{item?.ProjectName || item?.ProjectId}</td>
                          <td>{item?.VendorName || item?.VendorId}</td>
                          <td>
                            {item?.DeviceGroupName || item?.DeviceGroupId}
                          </td>
                          <td>{item?.Status}</td>
                          <td>{item?.Timestamp}</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      {deviceSortData.map((item: any) => (
                        <tr
                          key={item?.DeviceId}
                          className="cursor-pointer"
                          onClick={() => {
                            navigate(`/devices/${item?.ActivityId}`);
                          }}
                        >
                          <td>{item?.DeviceId}</td>
                          <td>{item?.ProjectName || item?.ProjectId}</td>
                          <td>{item?.VendorName || item?.VendorId}</td>
                          <td>
                            {item?.DeviceGroupName || item?.DeviceGroupId}
                          </td>
                          <td>{item?.Status}</td>
                          <td>{item?.Timestamp}</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </Table>
            </div>
            {props?.data.length > 0 ? (
              <>
                <div className="py-10 flex justify-center">
                  <Pagination value={activePage} onChange={setPage} total={1} />
                </div>
              </>
            ) : (
              <p className="text-center text-5xl font-bold p-10">
                Record not found
              </p>
            )}
          </div>
        )}
      </section>
    </>
  );
}
