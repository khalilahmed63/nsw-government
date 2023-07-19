/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import EditLottie from "../Lottie/EditLottie";
import SecuredRoute from "../SecureRoute/SecuredRoute";
import EditDeviceGroupVariantA from "../../VariantA/DeviceGroups/EditDeviceGroupVariantA";

export default function EditDeviceGroup() {
  const navigate = useNavigate();
  const { deviceGroupId } = useParams();

  const deviceGroupsAPI = process.env.REACT_APP_API_DEVICE_GROUPS;

  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState(false);
  const [animationType, setAnimationtype] = useState<any>();
  const [deviceGroupDetails, setDeviceGroupDetails] = useState<any | null>(
    null
  );

  const fetchDeviceGroupDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${deviceGroupsAPI}/${deviceGroupId}`);
      setDeviceGroupDetails(response?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const editDeviceGroup = async (formData: any) => {
    setAnimationtype(<EditLottie />);
    try {
      const response = await axios.patch(
        `${deviceGroupsAPI}/${deviceGroupId}`,
        formData
      );
      if (response?.status === 200) {
        setAnimation(true);
        setTimeout(() => {
          setAnimation(false);
          navigate(`/deviceGroups/${deviceGroupId}`);
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
      <EditDeviceGroupVariantA
        deviceGroupId={deviceGroupId}
        data={deviceGroupDetails}
        fetch={fetchDeviceGroupDetails}
        action={editDeviceGroup}
        loading={loading}
        animation={animation}
        animationType={animationType}
      />
    </SecuredRoute>
  );
}
