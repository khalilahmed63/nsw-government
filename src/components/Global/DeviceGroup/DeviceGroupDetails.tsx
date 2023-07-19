/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import DeleteLottie from "../Lottie/DeleteLottie";
import SecuredRoute from "../SecureRoute/SecuredRoute";
import DeviceGroupDetailsVariantA from "../../VariantA/DeviceGroups/DeviceGroupDetailsVariantA";

export default function DeviceGroupDetails() {
  const navigate = useNavigate();
  const { deviceGroupId } = useParams();

  const deviceGroupsAPI = process.env.REACT_APP_API_DEVICE_GROUPS;

  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState(false);
  const [animationType, setAnimationtype] = useState<any>();
  const [deviceGroupDetails, setDeviceGroupDetails] = useState<any | undefined>(
    null
  );

  const fetchDeviceGroupDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${deviceGroupsAPI}/${deviceGroupId}`);
      setDeviceGroupDetails(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  const deleteDeviceGroup = async () => {
    setAnimationtype(<DeleteLottie />);
    try {
      const response = await axios.delete(
        `${deviceGroupsAPI}/${deviceGroupId}`
      );
      if (response?.status === 200) {
        setAnimation(true);
        setTimeout(() => {
          setAnimation(false);
          navigate("/deviceGroups");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDeviceGroupDetails();
  }, []);

    return (
      <SecuredRoute>
        <DeviceGroupDetailsVariantA
          deviceGroupId={deviceGroupId}
          deviceGroupDetails={deviceGroupDetails}
          fetch={fetchDeviceGroupDetails}
          delete={deleteDeviceGroup}
          error={error}
          loading={loading}
          animation={animation}
          animationType={animationType}
        />
      </SecuredRoute>
    );
}
