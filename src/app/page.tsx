import { Container, Box } from "@chakra-ui/react";
import NostrSync from "@/container/NostrSync";

export default function Page() {
  return (
    <>
      <Container maxW="container.md" centerContent py={12}>
        <Box w="100%">
          <NostrSync />
        </Box>
      </Container>
    </>
  );
}
