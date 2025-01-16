import { Card, CardActions, CardContent, Skeleton, Stack } from "@mui/material";

export const SkeletonCard = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <Skeleton
        width={45}
        height={45}
        variant="rounded"
        sx={{
          position: "absolute",
          right: 0,
          p: 2,
          mt: 2,
          mr: 2,
        }}
      />
      <Skeleton height={300} variant="rounded" />
      <CardContent sx={{ height: 84 }}>
        <CardActions sx={{ p: 0, alignItems: "center" }}>
          <Stack width="100%" alignItems="start" gap={1}>
            <Skeleton height={10} variant="rounded" width="65%" />
            <Skeleton height={5} variant="rounded" width="35%" />
          </Stack>
          <Skeleton variant="circular" width={50} height={40} />
        </CardActions>
      </CardContent>
    </Card>
  );
};
