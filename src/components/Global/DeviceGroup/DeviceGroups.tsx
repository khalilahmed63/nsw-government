/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import SecuredRoute from "../SecureRoute/SecuredRoute";
import DeviceGroupsVariantA from "../../VariantA/DeviceGroups/DeviceGroupsVariantA";

export default function DeviceGroups() {
  // const vendorsAPI = process.env.REACT_APP_API_VENDORS;
  const deviceGroupsAPI = process.env.REACT_APP_API_DEVICE_GROUPS;

  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState<any>([]);
  const [deviceGroups, setDeviceGroups] = useState<any>([]);
  const [data, setData] = useState<any>([])

  const fetchDeviceGroups = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${deviceGroupsAPI}`);
      setLoading(false);
      setData(response.data);
      setError(false);
      // setDeviceGroups((res: any) => [...res, ...response.data]);
    } catch (error) {
      // console.log(error, "error");
      setError(true);
    }
  };

  // const fetchVendors = async () => {
  //   const apiResponse = await axios.get(`${vendorsAPI}`);
  //   setVendors(apiResponse.data);
  // };

  const deviceGroupList = deviceGroups?.map((deviceGroup: any) => ({
    value: deviceGroup.deviceGroupId,
    label: deviceGroup.data.deviceGroupName || "Unknown",
  }));

  const vendorList = vendors.map((vendor: any) => ({
    value: vendor.vendorId,
    label: vendor.data.vendorName || "Unknown",
  }));

  useEffect(() => {
    fetchDeviceGroups();
    // fetchVendors();
  }, []);

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((previous) => previous + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <SecuredRoute>
      <DeviceGroupsVariantA
        deviceGroups={deviceGroups}
        deviceGroupList={deviceGroupList}
        vendorList={vendorList}
        loading={loading}
        error={error}
        data={data}
        // refetch={fetchDeviceGroups}
      />
    </SecuredRoute>
  );
}
