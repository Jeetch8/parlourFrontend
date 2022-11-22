import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { baseDomain } from "../../Utills/BaseUrl";

export default function SimpleCard() {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const handeleFormDtata = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const { isLoading, mutate } = useMutation(
    ["postDataForLogin"],
    () => {
      return axios.post(baseDomain + "/user/auth/login", {
        email: formData.email,
        password: formData.password,
      });
    },
    {
      onSuccess: (data) => {
        localStorage.clear();
        localStorage.setItem("accesstoken", data.data.token);
        localStorage.setItem("profileImg", data.data.profileImg);
        localStorage.setItem("userName", data.data.userName);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("address", data.data.address);
        localStorage.setItem("role", data.data.role);
        localStorage.setItem("userId", data.data.userId);
        toast({
          status: "success",
          duration: 3000,
          title: "Login successful",
          isClosable: false,
          position: "top",
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      },
      onError: (error) => {
        if (
          error.response.data.msg === "Password was incorrect" ||
          "Email not found"
        ) {
          toast({
            status: "error",
            duration: 3000,
            title: "Wrong Credentials",
            isClosable: false,
            position: "top",
          });
          return;
        }
        toast({
          status: "error",
          duration: 3000,
          title: "Something went wrong, please try again",
          isClosable: false,
          position: "top",
        });
      },
    }
  );

  const loginHandler = () => {
    mutate();
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => handeleFormDtata(e)}
                name="email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onInput={(e) => handeleFormDtata(e)}
                  name="password"
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link
                  color={"blue.400"}
                  onClick={() => navigate("/forgotpassword")}
                >
                  Forgot password?
                </Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                isLoading={isLoading}
                onClick={() => loginHandler()}
              >
                Sign in
              </Button>
              <Text align={"center"}>
                Don't have a account?{" "}
                <Link color={"blue.400"} onClick={() => navigate("/register")}>
                  Register
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
