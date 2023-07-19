import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import SecuredRoute from "../SecureRoute/SecuredRoute";
import NewVendorVariantA from "../../VariantA/Vendors/NewVendorVariantA";

export default function NewVendor() {
  const navigate = useNavigate();

  const vendorsAPI = process.env.REACT_APP_API_VENDORS;

  const [animation, setAnimation] = useState(false);

  const createVendor = async (formData: any) => {
    try {
      const response = await axios.post(`${vendorsAPI}`, formData);
      if (response?.status === 200) {
        setAnimation(true);
        setTimeout(() => {
          setAnimation(false);
          navigate("/vendors");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SecuredRoute>
      <NewVendorVariantA action={createVendor} animation={animation} />
    </SecuredRoute>
  );
}
