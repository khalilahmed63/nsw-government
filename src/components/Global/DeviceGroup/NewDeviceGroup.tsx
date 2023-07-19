import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import SecuredRoute from "../SecureRoute/SecuredRoute";
import NewDeviceGroupVariantA from "../../VariantA/DeviceGroups/NewDeviceGroupVariantA";

export default function NewDeviceGroup() {
  const navigate = useNavigate();

  const deviceGroupsAPI = process.env.REACT_APP_API_DEVICE_GROUPS;

  const [loading, setLoading] = useState(false);
  const [animation, setAnimation] = useState(false);

  const createDeviceGroup = async (formData: any) => {
    setLoading(true);
    try {
      const response = await axios.post(`${deviceGroupsAPI}`, formData);
      if (response?.status === 200) {
        setAnimation(true);
        setTimeout(() => {
          setAnimation(false);
          navigate("/deviceGroups");
        }, 2000);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <SecuredRoute>
      <NewDeviceGroupVariantA
        action={createDeviceGroup}
        animation={animation}
        loading={loading}
      />
    </SecuredRoute>
  );
}
