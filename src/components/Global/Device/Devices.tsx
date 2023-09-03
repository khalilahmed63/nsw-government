/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import SecuredRoute from "../SecureRoute/SecuredRoute";
import DevicesVariantA from "../../VariantA/Devices/DevicesVariantA";

export default function Devices() {
  // const vendorsAPI = process.env.REACT_APP_API_VENDORS;
  // const projectsAPI = process.env.REACT_APP_API_PROJECTS;
  // const deviceGroupsAPI = process.env.REACT_APP_API_DEVICE_GROUPS;
  const fetchActivitiesAPI = process.env.REACT_APP_API_ACTIVITIES;
  // const fetchDevicesCountsAPI = process.env.REACT_APP_API_DEVICES_COUNT;
  const fetchDataApi = process.env.REACT_APP_API_Devices_MockApi;

  const [devices, setDevices] = useState<any>([]);
  const [page, setPage] = useState(1);
  // const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState<any>([]);
  const [projects, setProjects] = useState<any>([]);
  const [deviceGroups, setDeviceGroups] = useState<any>([]);
  const [data, setData] = useState<any>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${fetchDataApi}`);
      setData(response?.data);
      setLoading(false);
      // console.log("API Response", response?.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // const fetchProjects = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`${projectsAPI}?page=${page}&limit=20`);
  //     setError(false);
  //     setProjects(response?.data);
  //     setLoading(false);
  //   } catch (error) {
  //     // console.log(error, "error");
  //     setError(true);
  //   }
  // };

  // const fetchDeviceGroups = async () => {
  //   const response = await axios.get(`${deviceGroupsAPI}`);
  //   setDeviceGroups(response.data);
  // };

  // const fetchDevicesCounts = async () => {
  //   const response = await axios.get(`${fetchDevicesCountsAPI}`);
  //   console.log(response, "fetchDevicesCountsAPI - response");
  // };

  // const fetchVendors = async () => {
  //   const apiResponse = await axios.get(`${vendorsAPI}`);
  //   setVendors(apiResponse.data);
  // };

  const projectList = projects?.map((project: any) => ({
    value: project?.projectId,
    label: project?.data?.projectName || "Unknown",
  }));

  const vendorList = vendors.map((vendor: any) => ({
    value: vendor?.vendorId,
    label: vendor?.data?.vendorName || "Unknown",
  }));

  console.log(vendors, "vendors");

  const deviceGroupList = deviceGroups?.map((deviceGroup: any) => ({
    value: deviceGroup.deviceGroupId,
    label: deviceGroup.data.deviceGroupName || "Unknown",
  }));

  // const fetchActivities = async (data: any) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `${fetchActivities}${
  //         data?.activePage ? `?offset=${data.activePage}` : ""
  //       }${data?.state?.length > 0 ? `&status=${data.state}` : ""}${
  //         data?.project?.length > 0 ? `&projectId=${data.project}` : ""
  //       }${
  //         data?.deviceGroup?.length > 0
  //           ? `&deviceGroupId=${data.deviceGroup}`
  //           : ""
  //       }${data?.vendor?.length > 0 ? `&vendorId=${data.vendor} ` : ""}`
  //     );
  //     setLoading(false);
  //     setDevices(response?.data?.data);
  //     // console.log(response, "response");
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetchActivities({});
    // fetchProjects();
    fetchData()
    // fetchDeviceGroups();
    // fetchVendors();
    // fetchDevicesCounts();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    // <SecuredRoute>
      <DevicesVariantA
        devices={devices}
        loading={loading}
        projectList={projectList}
        deviceGroupList={deviceGroupList}
        vendorList={vendorList}
        // fetchActivities={fetchActivities}
        data={data}
      />
    // </SecuredRoute>
  );
}
