import {
  Box,
  Image,
  Text,
  VStack,
  SimpleGrid,
  HStack,
  Button,
} from "@chakra-ui/react";

export default function SearchResults({ results, view, onSelect }) {

  if (view === "tile") {
    return (
      <VStack spacing={6} align="stretch">
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
                aspectRatio={1}
                objectFit="cover"
                width="100%"
                borderRadius="md"
              />
              <Text mt={2} fontWeight="bold">
                {item.name}
              </Text>
              <Button
                mt={2}
                colorScheme="blue"
                size="sm"
                onClick={() => onSelect(item)}
              >
                ▶ Play
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    );
  }

  // List view (unchanged)
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