import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Heading,
  Text,
  Avatar,
  Box,
  Center,
  Stack,
  Spinner,
  Select,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const UserDetails = ({ openModal, setOpenModal }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const user = openModal?.user;

  const getFollowers = async () => {
    try {
      const response = await axios.get(`${user.url}/followers?per_page=100`);
      setFollowers(response.data);
      console.log("Followers: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowing = async () => {
    try {
      const response = await axios.get(`${user.url}/following?per_page=100`);
      setFollowing(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRepos = async () => {
    try {
      const response = await axios.get(`${user.url}/repos?per_page=100`);
      setRepositories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (index, value) => {
    console.log("index, value: ", index, " ", value);
    const url = `https://github.com/${
      index === 0 || index === 1 ? value : user.login + "/" + value
    }`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    async function fetchData() {
      await Promise.all([getFollowers(), getFollowing(), getRepos()]);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const onClose = () => {
    setOpenModal({ state: false, user: null });
  };

  const dropDowns = [
    {
      dropDown: "Followers",
      data: followers,
    },
    {
      dropDown: "Following",
      data: following,
    },
    {
      dropDown: "Repos",
      data: repositories,
    },
  ];

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay
        bg="none"
        backdropFilter="auto"
        backdropInvert="10%"
        backdropBlur="4px"
      />
      <ModalContent>
        <ModalHeader>{user?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <Center minH={"50vh"}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          ) : (
            <Center>
              <Box p={6} textAlign={"center"}>
                <Avatar
                  size={"xl"}
                  src={user.avatar_url}
                  mb={4}
                  pos={"relative"}
                  _after={{
                    content: '""',
                    w: 4,
                    h: 4,
                    bg: "green.300",
                    border: "2px solid white",
                    rounded: "full",
                    pos: "absolute",
                    bottom: 0,
                    right: 3,
                  }}
                />
                <Heading fontSize={"2xl"} fontFamily={"body"}>
                  {user?.login}
                </Heading>
                <Text fontWeight={600} color={"gray.500"} mb={4}>
                  id: {user?.id}
                </Text>
                <Stack direction="row" justify="center" spacing={6}>
                  {dropDowns.map(({ dropDown, data }, index) => (
                    <Stack key={dropDown} spacing={0} align="center">
                      <Text fontWeight={600}>{data.length}</Text>
                      <Select
                        color={"gray.500"}
                        target="_blank"
                        variant="unstyled"
                        placeholder={dropDown}
                        size="sm"
                        w="94px"
                        value={""}
                        onChange={(e) => handleChange(index, e.target.value)}
                      >
                        {data.map((item) => (
                          <option key={item.id}>
                            {dropDown === "Repos"
                              ? item.name.trim()
                              : item.login}
                          </option>
                        ))}
                      </Select>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Center>
          )}
        </ModalBody>
        <ModalFooter>
          {!isLoading && (
            <Button
              as={"a"}
              href={`https://github.com/${user.login}`}
              target="_blank"
              flex={1}
              mb={"10"}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.600"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
            >
              Open Github Profile
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserDetails;
