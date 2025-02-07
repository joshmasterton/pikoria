import Stack from "@mui/material/Stack";
import { Nav } from "../comp/Nav.comp";
import { Side } from "../comp/Side.comp";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <>
      <Nav />
      <Side />
      <Stack />
    </>
  );
};
