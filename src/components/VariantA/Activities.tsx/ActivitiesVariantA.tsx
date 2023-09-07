/* eslint-disable react-hooks/exhaustive-deps */
import { Card, LoadingOverlay, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function ActivitiesVariantA(props: any) {
  const WIP = process.env.REACT_APP_WIP;
  const fetchActivitiesAPI = process.env.REACT_APP_API_ACTIVITIES;

  // const [activities, setActivities] = useState<any | null | object>(null);
  const [setData, data] = useState <any>([])
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [error, setError] = useState(false);


  const navigate = useNavigate();

  // const fetchActivities = async (data: any) => {
  //   try {
  //     const response = await axios.get(
  //       `${fetchActivitiesAPI}?type=${data.type}${
  //         data.projectId ? `&projectId=${data.projectId} ` : ""
  //       } ${data.deviceGroupId ? `&deviceGroupId=${data.deviceGroupId}` : ""} ${
  //         data.vendorId ? `&vendorId=${data.vendorId} ` : ""
  //       }`
  //     );
  //     setActivitiesLoading(false);
  //     setActivities(response?.data?.data);
  //     // console.log(response, "response");
  //   } catch (error) {
  //     console.log(error);
  //     setActivitiesLoading(false);
  //   }
  // };
   const fetchActivities = async () => {
    try{
    const response = await axios.get(`${fetchActivitiesAPI}`);
    setData(response.data);
    setActivitiesLoading(false);
   }catch(error){
    setActivitiesLoading(false);
    setError(true);
   }
  }
  useEffect(() => {
    fetchActivities()
    //   type: props?.type,
    //   projectId: props?.projectId,
    //   deviceGroupId: props?.deviceGroupId,
    //   vendorId: props?.vendorId,
    // });
  }, []);

  return (
    <>
      {data?.length > 0 && (
        <>
          <p className="text-lg">Activity Log</p>
          <Card
            sx={(theme: any) => ({
              backgroundColor:
                theme.colorScheme === "dark" ? theme.colors.gray[8] : "#F5F5F5",
              color: theme.colorScheme === "dark" ? "white" : "black",
            })}
            p={0}
            radius={0}
            className="p-4 my-4 w-full md:w-full h-[15rem] mx-6 md:mx-0 overflow-auto rounded"
          >
            <LoadingOverlay visible={activitiesLoading} overlayBlur={2} />
            <div>
              <Table
                verticalSpacing="xs"
                striped
                fontSize="sm"
                highlightOnHover
              >
                <thead>
                  <tr>
                    <th className="w-[14.2%] !text-[#2E808E]">Device ID</th>
                    <th className="w-[14.2%] !text-[#2E808E]">Project name</th>
                    <th className="w-[14.2%] !text-[#2E808E]">Vendor name</th>
                    <th className="w-[14.2%] !text-[#2E808E]">
                      Device model name
                    </th>
                    <th className="w-[14.2%] !text-[#2E808E]">
                      Last updated state
                    </th>
                    <th className="w-[14.2%] !text-[#2E808E]">Last updated</th>
                  </tr>
                </thead>

                <tbody>
                  {props?.data?.map((item: any) => (
                    <tr
                      key={item?.DeviceId}
                      className="cursor-pointer"
                      onClick={() => {
                        WIP !== "true" &&
                          navigate(`/devices/${item?.ActivityId}`);
                      }}
                    >
                      <td>{item?.DeviceId}</td>
                      <td>{item?.ProjectName || item?.ProjectId}</td>
                      <td>{item?.DeviceGroupName || item?.DeviceGroupId}</td>
                      <td>{item?.VendorName || item?.VendorId}</td>
                      <td>{item?.Status}</td>
                      {/* <td>{dayjs(item?.Timestamp).format("DD/MMM/YYYY (hh:mm:ss)")}</td> */}
                      <td>{item?.Timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
