import { Box, Grid, GridItem, Heading, VStack, Spinner, Button, HStack, } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import ImageContainer from "./components/ImageContainer";
import { searchMixcloud } from "./api";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [flyImage, setFlyImage] = useState(null);
  const [playTrack, setPlayTrack] = useState(false);
  const [view, setView] = useState(() => localStorage.getItem("sound_search_view") || "list");
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recent_searches");
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);
    setOffset(0);
    setLoading(true);

    const updated = [newQuery, ...recentSearches.filter((q) => q !== newQuery)].slice(0, 5);
    localStorage.setItem("recent_searches", JSON.stringify(updated));
    setRecentSearches(updated);

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
    <Box bg="gray.100" minH="100vh" p={6}>
      {/* Flying image animation */}
      {flyImage && (
        <motion.img
          src={flyImage.src}
          initial={{
            position: "fixed",
            top: flyImage.top,
            left: flyImage.left,
            width: flyImage.width,
            height: flyImage.height,
            zIndex: 1000,
            borderRadius: "8px",
          }}
          animate={{
            top: 200,
            left: "50%",
            x: "-50%",
            width: 300,
            height: 300,
            opacity: 0,
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          onAnimationComplete={() => setFlyImage(null)}
          style={{ pointerEvents: "none" }}
        />
      )}

      {/* Three-column layout */}
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 2fr 1fr" }}
        gap={6}
        maxW="1200px"
        mx="auto"
      >
        {/* Left: Search + Results + Buttons */}
        <GridItem>
          <VStack align="stretch" spacing={4}>
            <Heading size="md">Sound Search</Heading>
            <SearchBar onSearch={handleSearch} />

            <HStack spacing={4} justify="center">
              <Button
                colorScheme={view === "list" ? "blue" : "gray"}
                onClick={() => changeView("list")}
              >
                List
              </Button>
              <Button
                colorScheme={view === "tile" ? "blue" : "gray"}
                onClick={() => changeView("tile")}
              >
                Tile
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
                    setPlayTrack(true);
                  }}
                  onFly={(imageData) => setFlyImage(imageData)}
                />

                {results.length === 6 && (
                  <Button onClick={handleNext} colorScheme="blue">
                    Next
                  </Button>
                )}
              </>
            )}
          </VStack>
        </GridItem>

        {/* Center: Image container */}
        <GridItem>
          <Heading size="md" mb={4}>Now Playing</Heading>
          <ImageContainer
            track={selectedTrack}
            playTrack={playTrack}
            onPlayClick={() => setPlayTrack(true)}
          />
        </GridItem>

        {/* Right: Recent Searches */}
        <GridItem>
          <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
            <Heading size="sm" mb={2}>Recent Searches</Heading>
            <VStack spacing={2} align="stretch">
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
            </VStack>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default App;
