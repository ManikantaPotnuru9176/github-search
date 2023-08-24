import { useState } from "react";
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import axios from "../../axiosConfig.js";
import UserCard from "@/cards/UserCard.js";
import ToggleColorMode from "./ToggleColorMode.js";

// const data = {
//   avatar_url: "https://avatars.githubusercontent.com/u/97650?v=4",
//   id: 97650,
//   login: "mani",
//   type: "User",
//   followers_url: "https://api.github.com/users/mani/followers",
//   following_url: "https://api.github.com/users/mani/following",
//   html_url: "https://github.com/mani",
//   repos_url: "https://api.github.com/users/mani/repos",
//   url: "https://api.github.com/users/mani",
// };

const Search = ({ openModal, setOpenModal }) => {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("initial");
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setState("submitting");
    setQuery("");
    try {
      const response = await axios.get(`/users?q=${query}&per_page=100`);
      setError(false);
      setState("success");
      setUsers(response.data.items);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      direction={"column"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <ToggleColorMode />
      <Container
        mt={10}
        maxW={"xl"}
        h={"140px"}
        bg={useColorModeValue("white", "whiteAlpha.100")}
        boxShadow={"xl"}
        rounded={"lg"}
        p={6}
      >
        <Heading
          as={"h2"}
          fontSize={{ base: "xl", sm: "2xl" }}
          textAlign={"center"}
          mb={5}
        >
          Search Your Github Query
        </Heading>
        <Stack
          direction={{ base: "column", md: "row" }}
          as={"form"}
          spacing={"12px"}
          onSubmit={(e) => handleSearch(e)}
        >
          <FormControl>
            <Input
              variant={"solid"}
              borderWidth={1}
              color={useColorModeValue("gray.800", "white")}
              _placeholder={{
                color: "gray.400",
              }}
              borderColor={useColorModeValue("gray.300", "gray.700")}
              id={"query"}
              type={"text"}
              required
              placeholder={"Enter your query"}
              aria-label={"Query"}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </FormControl>
          <FormControl w={{ base: "100%", md: "40%" }}>
            <Button
              colorScheme={"blue"}
              isLoading={state === "submitting"}
              loadingText="Searching"
              w="100%"
              type={"submit"}
            >
              {"Search"}
            </Button>
          </FormControl>
        </Stack>
        <Text
          mt={2}
          textAlign={"center"}
          color={error ? "red.500" : "gray.500"}
        >
          {error && "Oh no an error occured! 😢 Please try again later."}
        </Text>
      </Container>
      <Wrap spacing="10" mt={"10"} justify={"center"}>
        {users.map((user) => (
          <WrapItem key={user.id}>
            <UserCard
              user={user}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  );
};

export default Search;
