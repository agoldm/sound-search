import { Box, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);
const MotionImage = motion.img;

export default function ImageContainer({ track, playTrack, onPlayClick }) {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      textAlign="center"
      bg="gray.50"
      minH="360px"
    >
      <AnimatePresence mode="wait">
        {!track ? (
          <MotionBox
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            color="gray.500"
            fontSize="lg"
            borderStyle="dashed"
            borderRadius="md"
            p={6}
          >
            🎵 No track selected
          </MotionBox>
        ) : (
          <MotionBox
            key={track.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <MotionImage
              src={track.pictures?.extra_large}
              alt={track.name}
              style={{
                maxHeight: "300px",
                borderRadius: "12px",
                margin: "0 auto 16px",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.02 }}
              onClick={onPlayClick}
            />

            <Text fontWeight="bold" mb={2}>
              {track.name}
            </Text>

            {playTrack && (
              <Box mt={4}>
                <iframe
                  title="Mixcloud Player"
                  width="100%"
                  height="120"
                  allow="autoplay"
                  src={`https://www.mixcloud.com/widget/iframe/?feed=https://www.mixcloud.com${track.key}&hide_cover=1&light=1`}
                />
              </Box>
            )}
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}
