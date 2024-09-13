import { useState, useEffect } from "react";
import { Box, Button, VStack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";

function Library() {
  const [codes, setCodes] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Fetch user's code from the database
    const fetchCodes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/library");
        setCodes(response.data.codes);
      } catch (error) {
        toast({ title: "Failed to fetch codes.", status: "error" });
      }
    };
    fetchCodes();
  }, []);

  const downloadCode = (code) => {
    const blob = new Blob([code.content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${code.title}.txt`;
    link.click();
  };

  return (
    <Box p={8}>
      <VStack>
        {codes.slice(0, showAll ? codes.length : 5).map((code) => (
          <Box key={code.id} p={4} shadow="md" borderWidth="1px">
            <Text>{code.title}</Text>
            <Button onClick={() => downloadCode(code)}>Download Code</Button>
          </Box>
        ))}
        {!showAll && <Button onClick={() => setShowAll(true)}>Show All</Button>}
      </VStack>
    </Box>
  );
}

export default Library;
