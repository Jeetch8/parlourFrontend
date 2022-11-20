import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import React from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { baseDomain } from "../../Utills/BaseUrl";

const AdminPasswordChange = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const toast = useToast();
  const { uuid } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isLoading } = useMutation(
    ["changePassword"],
    () => {
      return axios.post(`${baseDomain}/user/auth/forgotPassword2/${uuid}`, {
        password,
      });
    },
    {
      onSuccess: () => {
        toast({
          position: "top",
          duration: 3000,
          status: "success",
          title: "Passowrd change successfull",
          isClosable: false,
        });
        setPassword("");
        navigate("/admin/login");
      },
      onError: (error) => {
        if (error.response.data.msg === "Link is not valid") {
          toast({
            position: "top",
            duration: 3000,
            status: "error",
            title: "Link is not valid, please request again",
            isClosable: false,
          });
          return;
        }
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
    if (password.length === 0) {
      toast({
        position: "top",
        duration: 3000,
        status: "error",
        title: "Please enter new Password",
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
          Enter New Password
        </Heading>
        <FormControl id="password" isRequired>
          <FormLabel>New Password</FormLabel>
          <InputGroup>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              placeholder="New Password"
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack spacing={6}>
          <Button isLoading={isLoading} onClick={() => handleSubmit()}>
            Reset Password
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default AdminPasswordChange;
