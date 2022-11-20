import {
  Flex,
  Stack,
  useColorModeValue,
  Center,
  Heading,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

export default function VerifyEmailForm() {
  const [searchParams, setSearchParms] = useSearchParams();
  let email = searchParams.get("email");
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"sm"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Verify your Email
          </Heading>
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
          textAlign="center"
        >
          We have sent link to your email address, please click the link to
          verify
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          fontWeight="bold"
          color={useColorModeValue("gray.800", "gray.400")}
        >
          {email}
        </Center>
      </Stack>
    </Flex>
  );
}
