/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import SecuredRoute from "../SecureRoute/SecuredRoute";
import DeviceDetailsVariantA from "../../VariantA/Devices/DeviceDetailsVariantA";
import WorkInProgress from "../WorkInProgress/WorkInProgress";

export default function DeviceDetails() {
  const WIP = process.env.REACT_APP_WIP;
  const devicesAPI = process.env.REACT_APP_API_DEVICES;
  const fetchActivitiesAPI = process.env.REACT_APP_API_ACTIVITIES;

  const { deviceId } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  // console.log(deviceId, "deviceId");

  const fetchDeviceDetails = async () => {
    try {
      const response = await axios.get(`${devicesAPI}?deviceId=${deviceId}`);
      setData(response?.data);
      // console.log(response, "response - device details api");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${fetchActivitiesAPI}?deviceId=${deviceId}`
      );
      setLoading(false);
      // console.log(response, "response - activities api");
      // setDevices(response?.data?.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeviceDetails();
    fetchActivities();
  }, []);

  return (
    <SecuredRoute>
      {WIP === "true" ? (
        <WorkInProgress />
      ) : (
        <DeviceDetailsVariantA data={data} loading={loading} />
      )}
    </SecuredRoute>
  );
}
