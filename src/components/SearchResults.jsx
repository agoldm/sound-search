import {
  Box,
  Image,
  Text,
  VStack,
  SimpleGrid,
  HStack,
  Button,
} from "@chakra-ui/react";
import TrackPlayer from "./TrackPlayer";
import { useState } from "react";

export default function SearchResults({ results, view, onSelect }) {
  const [playingTrackId, setPlayingTrackId] = useState(null);

  // Tile view
  if (view === "tile") {
    return (
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {results.map((item, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            p={2}
            textAlign="center"
            _hover={{ shadow: "md", cursor: "pointer" }}
          >
            <Image
              src={item.pictures?.medium}
              alt={item.name}
              width="100%"
              height="200px"
              objectFit="cover"
              borderRadius="md"
            />
            <Text mt={2} fontWeight="bold">
              {item.name}
            </Text>
            <Button
              mt={2}
              colorScheme="blue"
              size="sm"
              onClick={() => setPlayingTrackId(item.key)}
            >
              ▶ Play
            </Button>

            {playingTrackId === item.key && <TrackPlayer track={item} />}
          </Box>
        ))}
      </SimpleGrid>
    );
  }

  // List view
  return (
    <VStack spacing={4} align="stretch">
      {results.map((item, index) => (
        <HStack
          key={index}
          p={3}
          borderWidth="1px"
          borderRadius="md"
          justify="space-between"
        >
          <HStack>
            <Image
              src={item.pictures?.medium}
              alt={item.name}
              boxSize="50px"
              borderRadius="md"
            />
            <Text>{item.name}</Text>
          </HStack>
          <Button size="sm" colorScheme="blue" onClick={() => onSelect(item)}>
            ▶ Play
          </Button>
        </HStack>
      ))}
    </VStack>
  );
}
