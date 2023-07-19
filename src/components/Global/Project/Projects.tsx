/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import SecuredRoute from "../SecureRoute/SecuredRoute";
import ProjectsVariantA from "../../VariantA/Projects/ProjectsVariantA";

export default function Projects() {
  const vendorsAPI = process.env.REACT_APP_API_VENDORS;
  const projectsAPI = process.env.REACT_APP_API_PROJECTS;
  const deviceGroupsAPI = process.env.REACT_APP_API_DEVICE_GROUPS;

  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState<any>([]);
  const [projects, setProjects] = useState<any>([]);
  const [deviceGroups, setDeviceGroups] = useState<any>([]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${projectsAPI}?page=${page}&limit=20`);
      setError(false);
      setProjects(response?.data);
      setLoading(false);
    } catch (error) {
      // console.log(error, "error");
      setError(true);
    }
  };

  const fetchDeviceGroups = async () => {
    const response = await axios.get(`${deviceGroupsAPI}`);
    setDeviceGroups(response.data);
  };

  const fetchVendors = async () => {
    const apiResponse = await axios.get(`${vendorsAPI}`);
    setVendors(apiResponse.data);
  };

  const projectList = projects?.map((project: any) => ({
    value: project?.projectId,
    label: project?.data?.projectName || "Unknown",
  }));

  const vendorList = vendors.map((vendor: any) => ({
    value: vendor.data.vendorName,
    label: vendor.data.vendorName || "Unknown",
  }));

  const deviceGroupList = deviceGroups?.map((deviceGroup: any) => ({
    value: deviceGroup.deviceGroupId,
    label: deviceGroup.data.deviceGroupName || "Unknown",
  }));

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

  useEffect(() => {
    fetchProjects();
    fetchDeviceGroups();
    fetchVendors();
  }, []);

  return (
    <SecuredRoute>
      <ProjectsVariantA
        projects={projects}
        projectList={projectList}
        deviceGroupList={deviceGroupList}
        vendorList={vendorList}
        loading={loading}
        error={error}
        refetch={fetchProjects}
      />
    </SecuredRoute>
  );
}
