/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import SecuredRoute from "../SecureRoute/SecuredRoute";
import EditVendorVariantA from "../../VariantA/Vendors/EditVendorVariantA";

export default function EditVendor() {
  const { vendorId } = useParams();
  const navigate = useNavigate();

  const vendorsAPI = process.env.REACT_APP_API_VENDORS;

  const [animation, setAnimation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vendorDetails, setvendorDetails] = useState<any | undefined>(
    undefined
  );

  const fetchVendorDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${vendorsAPI}/${vendorId}`);
      setvendorDetails(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const editVendor = async (formData: any) => {
    try {
      const response = await axios.patch(`${vendorsAPI}/${vendorId}`, formData);
      if (response?.status === 200) {
        setAnimation(true);
        setTimeout(() => {
          setAnimation(false);
          navigate(`/vendors/${vendorId}`);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVendorDetails();
  }, []);

  return (
    <SecuredRoute>
      <EditVendorVariantA
        vendorId={vendorId}
        vendorDetails={vendorDetails}
        fetch={fetchVendorDetails}
        action={editVendor}
        animation={animation}
        loading={loading}
      />
    </SecuredRoute>
  );
}
