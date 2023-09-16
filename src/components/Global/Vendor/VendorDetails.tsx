/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import DeleteLottie from "../Lottie/DeleteLottie";
import SecuredRoute from "../SecureRoute/SecuredRoute";
import VendorDetailsVariantA from "../../VariantA/Vendors/VendorDetailsVariantA";

export default function VendorDetails() {
  const navigate = useNavigate();
  const { vendorId } = useParams();

  const vendorsAPI = process.env.REACT_APP_API_VENDORS;

  const [animation, setAnimation] = useState(false);
  const [animationType, setAnimationtype] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState <any>()
  // const [vendorDetails, setvendorDetails] = useState<any | undefined>(
  //   undefined
  // );

  const fetchVendorDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${vendorsAPI}/${vendorId}`);
      setData(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteVendor = async () => {
    setAnimationtype(<DeleteLottie />);
    try {
      const response = await axios.delete(`${vendorsAPI}/${vendorId}`);
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

  useEffect(() => {
    fetchVendorDetails();
  }, []);

  return (
    <SecuredRoute>
      <VendorDetailsVariantA
        vendorId={vendorId}
        // vendorDetails={vendorDetails}
        data={data}
        fetch={fetchVendorDetails}
        delete={deleteVendor}
        animation={animation}
        animationType={animationType}
        loading={loading}
      />
    </SecuredRoute>
  );
}
