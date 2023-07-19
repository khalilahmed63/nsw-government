/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import SecuredRoute from "../SecureRoute/SecuredRoute";
import ReportDetailsVariantA from "../../VariantA/Reports/ReportDetailsVariantA";

export default function ReportDetails() {
  const reportsAPI = process.env.REACT_APP_API_REPORTS;

  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<any>([]);

  async function fetchReports() {
    const response = await fetch(`${reportsAPI}`);
    const data = await response.json();
    setReports(data.projects);
    setLoading(false);
  }

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <SecuredRoute>
      <ReportDetailsVariantA reports={reports} loading={loading} />
    </SecuredRoute>
  );
}
