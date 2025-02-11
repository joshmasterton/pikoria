import { forwardRef, ReactElement, RefObject } from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

export const ScrollCard = forwardRef<
  HTMLDivElement,
  { children: ReactElement; scrollProgress: number }
>(({ children, scrollProgress }, ref) => {
  const refElement = ref as RefObject<HTMLDivElement>;

  return (
    <>
      <Stack
        ref={ref}
        position="relative"
        direction="row"
        overflow="auto"
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        gap={2}
      >
        <Stack
          height={400}
          sx={{
            mr: -8,
            position: "sticky",
            zIndex: 3,
            left: 0,
          }}
        >
          <Stack
            position="absolute"
            bgcolor="rgba(0, 0, 0, 0.5)"
            width={75}
            height="100%"
            sx={{
              maskImage:
                "linear-gradient(270deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))",
            }}
          />
          <Stack
            position="absolute"
            width={100}
            height="100%"
            sx={{
              backdropFilter: "blur(1rem)",
              webkitBackdropFilter: "blur(1rem)",
              maskImage:
                "linear-gradient(270deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 100%)",
            }}
          />
          <IconButton
            sx={{
              color: "white",
              height: "100%",
              borderRadius: 0,
              width: 50,
            }}
            onClick={() => {
              if (refElement.current) {
                refElement.current.scrollBy({
                  left: -350,
                  behavior: "smooth",
                });
              }
            }}
          >
            <ChevronLeftRoundedIcon />
          </IconButton>
        </Stack>
        {children}
        <Stack
          height={400}
          sx={{
            ml: -8,
            position: "sticky",
            zIndex: 3,
            right: 0,
          }}
        >
          <Stack
            position="absolute"
            bgcolor="rgba(0, 0, 0, 0.5)"
            width={75}
            right={0}
            height="100%"
            sx={{
              maskImage:
                "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)",
            }}
          />
          <Stack
            position="absolute"
            width={100}
            right={0}
            height="100%"
            sx={{
              backdropFilter: "blur(1rem)",
              webkitBackdropFilter: "blur(1rem)",
              maskImage:
                "linear-gradient(90deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 100%)",
            }}
          />
          <IconButton
            sx={{
              color: "white",
              height: "100%",
              borderRadius: 0,
              width: 50,
            }}
            onClick={() => {
              if (refElement.current) {
                refElement.current.scrollBy({
                  left: 350,
                  behavior: "smooth",
                });
              }
            }}
          >
            <ChevronRightRoundedIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Stack pt={2}>
        <LinearProgress
          sx={{
            width: "100%",
            zIndex: 3,
          }}
          variant="determinate"
          value={scrollProgress}
        />
      </Stack>
    </>
  );
});
