import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Center,
  Avatar,
  IconButton,
  AvatarBadge,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Select from "react-select";
import SyncLoader from "react-spinners/SyncLoader";
import { baseDomain } from "../../Utills/BaseUrl";

export default function SignupCard() {
  const [selectedValue, setSelectedValue] = useState({});
  const [image, setImage] = useState(null);
  const [addressInput, setAddressInput] = useState("");
  const [options, setOptions] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  let imgData = new FormData();

  const handeleFormDtata = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChanges = (e) => {
    const img = e.target.files[0];
    imgData.append("image", img);
    mutate();
  };
  const { mutate, isLoading: imageIsLoading } = useMutation(
    ["sendImagetoServer"],
    () => {
      return axios.post(
        baseDomain + "/imageUpload/imagaeUploadCloudniary",
        imgData
      );
    },
    {
      onSuccess: (res) => {
        setImage(res.data.image.src);
      },
    }
  );

  const { isLoading, mutate: mutateRegister } = useMutation(
    ["registerQuery"],
    () => {
      return axios.post(baseDomain + "/user/auth/register", {
        name: `${formData.firstName} ${formData.lastName}`,
        password: formData.password,
        email: formData.email,
        profileImg: image,
      });
    },
    {
      onSuccess: () => {
        toast({
          title: "Verification email sent, please verify",
          status: "success",
          isClosable: false,
          position: "top",
        });
        setTimeout(() => {
          navigate(`/verifyemail?email=${formData.email}`);
        }, 2000);
      },
      onError: () => {
        toast({
          title: "Something went wrong, Please try again",
          status: "error",
          isClosable: true,
          position: "top",
        });
      },
    }
  );

  const handleFormSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password doesn't match",
        status: "error",
        isClosable: false,
        position: "top",
      });
      return;
    }
    if (
      formData.email !== "" &&
      formData.firstName !== "" &&
      formData.lastName !== ""
    ) {
      mutateRegister();
    } else {
      toast({
        title: "Please fill all the fields",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const rawOptions = [];
  let cancelToken;
  const { refetch } = useQuery(
    ["fetchInputText"],
    () => {
      if (cancelToken) {
        cancelToken.cancel("Operation cancelled");
      }
      cancelToken = axios.CancelToken.source();
      return axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${addressInput}&apiKey=de8c9ba6d4a54eceb1ef0ed99adfd435`,
        { cancelToken: cancelToken.token }
      );
    },
    {
      enabled: false,
      onSuccess: (data) => {
        data.data.features.forEach((item) => {
          rawOptions.push({
            value: item.properties.formatted,
            label: item.properties.formatted,
          });
        });
        setOptions([...rawOptions]);
        console.log("Pushed");
      },
    }
  );

  const handleSlectInputChange = (inputData) => {
    setAddressInput(inputData);
    if (inputData.length <= 3) return;
    // console.log("Running");
    refetch();
    // console.log(addressInput);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={{ base: "12", md: "24" }}
        px={6}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl>
              <Center mb={"5"}>
                <FormLabel cursor={"pointer"}>
                  <Avatar
                    size="xl"
                    src={image ? image : "https://i.ibb.co/JQpgkZG/avatar.png"}
                    position={"relative"}
                  >
                    {imageIsLoading ? (
                      <Box position={"absolute"}>
                        <SyncLoader size={10} color="#319795" />
                      </Box>
                    ) : (
                      <AvatarBadge
                        as={IconButton}
                        size="sm"
                        rounded="full"
                        top="-10px"
                        colorScheme="red"
                        aria-label="remove Image"
                        icon={<SmallCloseIcon />}
                        onClick={() => setImage(null)}
                      />
                    )}
                  </Avatar>
                </FormLabel>
                <Input
                  type={"file"}
                  display={"none"}
                  onChange={(e) => handleImageChanges(e)}
                />
              </Center>
            </FormControl>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    onInput={(e) => handeleFormDtata(e)}
                    name="firstName"
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    onInput={(e) => handeleFormDtata(e)}
                    name="lastName"
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onInput={(e) => handeleFormDtata(e)}
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
            <FormControl id="ConfirmPassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  onInput={(e) => {
                    handeleFormDtata(e);
                    // checkConfirmPasswordMatch();
                  }}
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
            {/* <FormControl id="address" isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                onInput={(e) => handeleFormDtata(e)}
                name="address"
              />
            </FormControl> */}
            <FormControl id="address" isRequired>
              <FormLabel>Address</FormLabel>
              <Select
                onInputChange={(inputData) => handleSlectInputChange(inputData)}
                tabSelectsValue
                loadingMessage={"Please wait"}
                options={options}
                isLoading={isLoading}
                name="address"
                value={selectedValue.label}
              />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                isLoading={isLoading}
                onClick={() => handleFormSubmit()}
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} onClick={() => navigate("/login")}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
