/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SecuredRoute(props: any) {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("expired")) {
      navigate("/");
    }
  }, []);

  return <div>{props.children}</div>;
}
