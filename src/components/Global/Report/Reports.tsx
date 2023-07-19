/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import SecuredRoute from "../SecureRoute/SecuredRoute";
import WorkInProgress from "../WorkInProgress/WorkInProgress";
import ReportsVariantA from "../../VariantA/Reports/ReportsVariantA";

export default function Reports() {
  const WIP = process.env.REACT_APP_WIP;
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
      {WIP === "true" ? (
        <WorkInProgress />
      ) : (
        <ReportsVariantA reports={reports} loading={loading} />
      )}
    </SecuredRoute>
  );
}
