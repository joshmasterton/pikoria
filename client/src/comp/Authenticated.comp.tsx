import { ReactElement, useEffect } from "react";
import { useAppSelector } from "../redux/store.redux";
import { useNavigate } from "react-router-dom";

export const Authenticated = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return children;
};
