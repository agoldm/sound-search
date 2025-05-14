import { Box, List, ListItem, Text } from "@chakra-ui/react";

export default function RecentSearches({ searches }) {
  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Recent Searches
      </Text>
      <List spacing={2}>
        {searches.map((search, index) => (
          <ListItem key={index}>{search}</ListItem>
        ))}
      </List>
    </Box>
  );
}