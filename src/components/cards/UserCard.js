import React, { useEffect } from "react";
import {
  Button,
  Heading,
  Text,
  Avatar,
  Box,
  Center,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

const UserCard = ({ user, openModal, setOpenModal }) => {
  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        minW={"300px"}
        minH={"300px"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
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
          {user.login}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          id: {user.id}
        </Text>
        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            flex={1}
            mt={"5"}
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
            onClick={() => setOpenModal({ state: true, user: user })}
          >
            Details
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default UserCard;
