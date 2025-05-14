import { useState } from "react";
import { Container, Heading, VStack, Spinner, Button, Box, Text, HStack} from "@chakra-ui/react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import { searchMixcloud } from "./api";
import ImageContainer from "./components/ImageContainer";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [playTrack, setPlayTrack] = useState(false);
  const [view, setView] = useState(() => {
    return localStorage.getItem("sound_search_view") || "list";
  });
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recent_searches");
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);
    setOffset(0);
    setLoading(true);

    // Save new recent search
    setRecentSearches((prev) => {
      const updated = [newQuery, ...prev.filter((q) => q !== newQuery)].slice(0, 5);
      localStorage.setItem("recent_searches", JSON.stringify(updated));
      return updated;
    });

    const data = await searchMixcloud(newQuery, 0);
    setResults(data);
    setLoading(false);
    setSelectedTrack(null);
  };

  const changeView = (newView) => {
    setView(newView);
    localStorage.setItem("sound_search_view", newView);
  };

  const handleNext = async () => {
    const newOffset = offset + 6;
    setOffset(newOffset);
    setLoading(true);
    const data = await searchMixcloud(query, newOffset);
    setResults(data);
    setLoading(false);
    setSelectedTrack(null);
  };

  return (
    <Container maxW="container.md" py={6}>
      <VStack spacing={6} align="stretch">
        <Heading>Sound Search</Heading>

        <SearchBar onSearch={handleSearch} />

        <HStack spacing={4} justify="center">
          <Button
            colorScheme={view === "list" ? "blue" : "gray"}
            onClick={() => changeView("list")}
          >
            List View
          </Button>
          <Button
            colorScheme={view === "tile" ? "blue" : "gray"}
            onClick={() => changeView("tile")}
          >
            Tile View
          </Button>
        </HStack>
        {loading ? (
          <Spinner alignSelf="center" />
        ) : (
          <>
            <SearchResults
              results={results}
              view={view}
              onSelect={(track) => {
                setSelectedTrack(track);
                setPlayTrack(false);
              }} />
            {view === "list" && (
              <ImageContainer
                track={selectedTrack}
                playTrack={playTrack}
                onPlayClick={() => setPlayTrack(true)}
              />
            )}
            {results.length === 6 && (
              <Button onClick={handleNext} colorScheme="blue">
                Next
              </Button>
            )}
          </>
        )}

        {recentSearches.length > 0 && (
          <Box>
            <Text fontWeight="bold" mb={2}>Recent Searches:</Text>
            <HStack spacing={2} wrap="wrap">
              {recentSearches.map((item) => (
                <Button
                  key={item}
                  size="sm"
                  variant="outline"
                  onClick={() => handleSearch(item)}
                >
                  {item}
                </Button>
              ))}
            </HStack>
          </Box>
        )}
      </VStack>
    </Container>
  );
}

export default App;