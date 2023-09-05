/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import SecuredRoute from "../SecureRoute/SecuredRoute";
import VendorsVariantA from "../../VariantA/Vendors/VendorsVariantA";

export default function Vendors() {
  const vendorsAPI = process.env.REACT_APP_API_Vendor_MockApi;

  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState<any>([]);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const apiResponse = await axios.get(`${vendorsAPI}`);
      setVendors(apiResponse.data);
      setLoading(false);
      // setVendors((res: any) => [...res, ...apiResponse.data]);
    } catch (error) {
      setLoading(false);
      setError(true);
      // console.log(error, "error");
    }
  };

  

  useEffect(() => {
    fetchVendors();
  }, []);

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
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);
  return (
    <SecuredRoute>
      <VendorsVariantA
        vendors={vendors}
        loading={loading}
        error={error}
        // refetch={fetchVendors}
      />
    </SecuredRoute>
  );
}
