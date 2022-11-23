import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseDomain } from "../../Utills/BaseUrl";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const App = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const { mutate, isLoading } = useMutation(
    async () => {
      return await axios.post(
        baseDomain + "/admin/auth/login",
        {
          email: userEmail,
          password: userPassword,
        },
        { withCredentials: true }
      );
    },
    {
      onSuccess: (data) => {
        localStorage.clear();
        localStorage.setItem("accesstoken", data.data.token);
        localStorage.setItem("profileImg", data.data.profileImg);
        localStorage.setItem("userName", data.data.userName);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("role", data.data.role);
        toast({
          title: "Login Successfull",
          status: "success",
          duration: 2000,
          isClosable: false,
          position: "top",
        });
        setInterval(() => {
          navigate("/admin/dashboard");
        }, 2000);
      },
    }
  );

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="70vh"
      // backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar />
        <Heading>Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="email address"
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText
                  textAlign="right"
                  onClick={() => navigate("/admin/forgotpassword")}
                >
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                width="full"
                onClick={(e) => handleLoginSubmit(e)}
                isLoading={isLoading}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default App;
