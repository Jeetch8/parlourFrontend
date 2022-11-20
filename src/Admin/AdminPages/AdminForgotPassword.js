import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { baseDomain } from "../../Utills/BaseUrl";

const AdminForgotPassword = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const { mutate, isLoading } = useMutation(
    ["reqToChangePass"],
    () => {
      return axios.post(baseDomain + "/admin/auth/forgotPassword", {
        email,
      });
    },
    {
      onSuccess: () => {
        toast({
          position: "top",
          duration: 3000,
          status: "success",
          title: "Email Sent with link",
          isClosable: false,
        });
      },
      onError: () => {
        toast({
          position: "top",
          duration: 3000,
          status: "error",
          title: "Something went wrong, please try again",
          isClosable: false,
        });
      },
    }
  );
  const handleSubmit = () => {
    if (email.length === 0) {
      toast({
        position: "top",
        duration: 3000,
        status: "error",
        title: "Email field can't be empty",
        isClosable: false,
      });
      return;
    }
    mutate();
  };
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Forgot your password Admin?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an email with a Link if email exist
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button isLoading={isLoading} onClick={() => handleSubmit()}>
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default AdminForgotPassword;
