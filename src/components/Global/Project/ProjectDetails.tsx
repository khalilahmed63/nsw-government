/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import SecuredRoute from "../SecureRoute/SecuredRoute";
import ProjectDetailsVariantA from "../../VariantA/Projects/ProjectDetailsVariantA";

export default function ProjectDetails() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const projectsAPI = process.env.REACT_APP_API_PROJECTS;

  const [loading, setLoading] = useState(true);
  // const [status, setStatus] = useState(0);
  const [data, setData] = useState<any> ([]);
  // const [animation, setAnimation] = useState(false);
  // const [animationType, setAnimationType] = useState<any>(false);

  const fetchProjectDetails = async () => {
    setLoading(true);
    try {
      // const response = await axios.get(`${projectsAPI}/${projectId}`);
      const response = await axios.get(`${projectsAPI}/${projectId}`);
      setData(response?.data);
      console.log(response?.data)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // const deleteProject = async () => {
  //   setAnimationType(<DeleteLottie />);
  //   try {
  //     await axios.delete(`${projectsAPI}/${projectId}`);
  //     setAnimation(true);
  //     setTimeout(() => {
  //       setAnimation(false);
  //       navigate("/projects");
  //     }, 2000);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  return (
    <SecuredRoute>
      <ProjectDetailsVariantA
        projectId={projectId}
        // status={status}
        data={data}
        fetch={fetchProjectDetails}
        // delete={deleteProject}
        loading={loading}
        // animation={animation}
        // animationType={animationType}
      />
    </SecuredRoute>
  );
}
