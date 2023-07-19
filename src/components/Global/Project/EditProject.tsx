/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import EditLottie from "../Lottie/EditLottie";
import SecuredRoute from "../SecureRoute/SecuredRoute";
import EditProjectVariantA from "../../VariantA/Projects/EditProjectVariantA";

export default function EditProject() {
  const projectsAPI = process.env.REACT_APP_API_PROJECTS;

  const navigate = useNavigate();
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState(false);
  const [animationType, setAnimationType] = useState<any>(false);
  const [projectData, setProjectData] = useState<any | null>(null);

  const fetchProjectDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${projectsAPI}/${projectId}`);
      setProjectData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const editProject = async (formData: any) => {
    setAnimationType(<EditLottie />);
    try {
      const response = await axios.patch(
        `${projectsAPI}/${projectId}`,
        formData
      );
      if (response?.status === 200) {
        setAnimation(true);
        setTimeout(() => {
          setAnimation(false);
          navigate("/projects");
        }, 2000);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  return (
    <SecuredRoute>
      <EditProjectVariantA
        projectId={projectId}
        data={projectData}
        fetch={fetchProjectDetails}
        action={editProject}
        loading={loading}
        animation={animation}
        animationType={animationType}
      />
    </SecuredRoute>
  );
}
