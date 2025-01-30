import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import { CustomTooltip } from "../CustomTooltip.comp";
import Skeleton from "@mui/material/Skeleton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const SkeletonMoviesSeriesBigCard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <CardContent sx={{ width: "100%" }}>
        <Stack gap={2} direction="row">
          <Stack gap={2} flexGrow={1}>
            <Stack direction="row" flexWrap="wrap" gap={2}>
              <Skeleton height={150} width={115} variant="rounded" />
              <Stack overflow="hidden" flexGrow={1} gap={1}>
                <Skeleton variant="rounded" height={20} width="75%" />
                <Skeleton variant="rounded" height={10} width="50%" />
                {!isSmallScreen ? (
                  <Rating
                    size="small"
                    max={10}
                    readOnly
                    precision={0.25}
                    sx={{ pt: 0.5, overflow: "hidden" }}
                  />
                ) : (
                  <Skeleton variant="rounded" width={30} />
                )}
                <Stack
                  direction="row"
                  flexGrow={1}
                  pt={2}
                  justifyContent="end"
                  alignItems="end"
                >
                  <CustomTooltip title="Add to watch later">
                    <Checkbox
                      color="success"
                      inputProps={{ "aria-label": "Add to watch later" }}
                      icon={<AddToQueueIcon />}
                      checkedIcon={<AddToQueueIcon />}
                    />
                  </CustomTooltip>
                  <CustomTooltip title="Add to favourites">
                    <Checkbox
                      color="error"
                      inputProps={{ "aria-label": "Favourite" }}
                      icon={<FavoriteBorderIcon />}
                      checkedIcon={<FavoriteIcon />}
                    />
                  </CustomTooltip>
                </Stack>
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <Skeleton variant="rounded" width="100%" height={15} />
              <Skeleton variant="rounded" width="75%" height={15} />
              <Skeleton variant="rounded" width="85%" height={15} />
              <Skeleton variant="rounded" width="95%" height={15} />
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
      <Stack
        width={{ sx: "100%", sm: 2000 }}
        maxWidth={{ xs: "100%", sm: 300 }}
      >
        <Skeleton
          variant="rounded"
          height="100%"
          sx={{ maxHeight: { xs: 300, sm: "100%" } }}
        />
      </Stack>
    </Card>
  );
};
