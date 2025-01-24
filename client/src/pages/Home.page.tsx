import { Nav } from "../comp/Nav.comp";
import { Side } from "../comp/Side.comp";
import { CustomBreadCrumbs } from "../comp/CustomBreadCrumbs.comp";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";

export const Home = () => {
  return (
    <>
      <Nav />
      <Side />
      <Stack p={2} gap={2} flexGrow={1} mt={8} ml={{ xs: 0, sm: 31 }}>
        <CustomBreadCrumbs />
        <Card variant="outlined" sx={{ width: "100%", height: 400 }}></Card>
      </Stack>
    </>
  );
};
