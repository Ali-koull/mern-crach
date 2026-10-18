import {
  Button,
  Container,
  Flex,
  HStack,
  Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SquarePlus } from "lucide-react";
import { ColorModeButton } from "./ui/color-mode";
const Navbar = () => {
  return (
    <Container maxW="1140px" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip="text"
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>

        <HStack gap={2} alignItems="center">
          <Button asChild>
            <Link to="/create" aria-label="Create product">
              <SquarePlus size={20} />
            </Link>
          </Button>
          <ColorModeButton />
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
