import { useState } from "react";
import { Input, Button, HStack } from "@chakra-ui/react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <HStack spacing={4} mb={4}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a track"
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <Button colorScheme="blue" onClick={handleSearch}>
        Search
      </Button>
    </HStack>
  );
}