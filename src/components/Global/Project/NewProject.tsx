import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import axios from "axios";
import SecuredRoute from "../SecureRoute/SecuredRoute";
import NewProjectVariantA from "../../VariantA/Projects/NewProjectVariantA";

export default function NewProject() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const projectsAPI = process.env.REACT_APP_API_PROJECTS;

  const [loading, setLoading] = useState(false);
  const [animation, setAnimation] = useState(false);

  const createProject = async (formData: any) => {
    try {
      const response = await axios.post(`${projectsAPI}`, formData);
      if (response?.status === 200) {
        setAnimation(true);
        setTimeout(() => {
          setAnimation(false);
          navigate("/projects");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <SecuredRoute>
      <NewProjectVariantA
        projectId={projectId}
        action={createProject}
        animation={animation}
        loading={loading}
      />
    </SecuredRoute>
  );
}
