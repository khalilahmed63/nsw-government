/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import SecuredRoute from "../SecureRoute/SecuredRoute";
import HomeVariantA from "../../VariantA/HomePage/HomeVariantA";

export default function HomePage() {
  // const fetchDeviceAPI = process.env.REACT_APP_API_DEVICES_COUNT;
  // const fetchProjectsCountAPI = process.env.REACT_APP_API_PROJECTS_COUNT;
  // const fetchVendorsCountAPI = process.env.REACT_APP_API_VENDORS_COUNT;
  // const fetchDeviceGroupsCountAPI = process.env.REACT_APP_API_DEVICE_GROUPS_COUNT;

  // const [devicesCount, setDeviceCount] = useState<any | null>(null);
  // const [projectsCount, setProjectsCount] = useState<any | null>(null);
  // const [vendorsCount, setVendorsCount] = useState<any | null>(null);
  // const [deviceGroupsCount, setDeviceGroupsCount] = useState<any | null>(null);
  // const [deviceLoading, setDeviceLoading] = useState(true);
  // const [projectLoading, setProjectLoading] = useState(true);
  // const [vendorLoading, setVendorLoading] = useState(true);
  // const [deviceGroupLoading, setdeviceGroupLoading] = useState(true);
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${'mock-api'}`);
      setData(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // const fetchDevicesCount = async () => {
  //   try {
  //     const response = await axios.get(`${fetchDeviceAPI}`);
  //     setDeviceCount(response?.data);
  //     setDeviceLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setDeviceLoading(false);
  //   }
  // };

  // const fetchProjectsCount = async () => {
  //   try {
  //     const response = await axios.get(`${fetchProjectsCountAPI}`);
  //     setProjectsCount(response?.data?.count?.projects?.total);
  //     setProjectLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setProjectLoading(false);
  //   }
  // };

  // const fetchVendorsCount = async () => {
  //   try {
  //     const response = await axios.get(`${fetchVendorsCountAPI}`);
  //     setVendorsCount(response?.data?.count?.vendors?.total);
  //     setVendorLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setVendorLoading(false);
  //   }
  // };

  // async function fetchDeviceGroupsCount() {
  //   try {
  //     const response = await axios.get(`${fetchDeviceGroupsCountAPI}`);
  //     setDeviceGroupsCount(response?.data?.count?.deviceGroups?.total);
  //     setdeviceGroupLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setdeviceGroupLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchDevicesCount();
  //   fetchProjectsCount();
  //   fetchVendorsCount();
  //   fetchDeviceGroupsCount();
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SecuredRoute>
      <HomeVariantA
        // devicesCount={devicesCount}
        // deviceLoading={deviceLoading}
        // projectsCount={projectsCount}
        // projectLoading={projectLoading}
        // deviceGroupsCount={deviceGroupsCount}
        // deviceGroupLoading={deviceGroupLoading}
        // vendorsCount={vendorsCount}
        // vendorLoading={vendorLoading}
        loading={loading}
        data={data}
      />
    </SecuredRoute>
  );
}
