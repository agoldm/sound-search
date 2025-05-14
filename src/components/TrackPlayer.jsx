import { Box } from "@chakra-ui/react";

export default function TrackPlayer({ track }) {
  if (!track) return null;

  return (
    <Box mt={4}>
      <iframe
        title="Mixcloud Player"
        width="100%"
        height="120"
        allow="autoplay"
        src={`https://www.mixcloud.com/widget/iframe/?feed=https://www.mixcloud.com${track.key}&hide_cover=1&light=1`}
      />
    </Box>
  );
}
