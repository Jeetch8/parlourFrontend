import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  FormLabel,
  Box,
  InputGroup,
  Input,
  Stack,
  FormControl,
  Center,
  Avatar,
  AvatarBadge,
  IconButton,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SmallCloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
import { useMutation, useQuery } from "@tanstack/react-query";
import { baseDomain } from "../../Utills/BaseUrl";

export default function DrawerComp() {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    profileImg: image,
  });

  const handeleFormDtata = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChanges = (e) => {
    const img = e.target.files[0];
    let imgData = new FormData();
    imgData.append("image", img);
    axios
      .post(baseDomain + "/imageUpload/imagaeUploadCloudniary", imgData)
      .then((res) => setImage(res.data.image.src));
  };

  const { mutate } = useMutation(
    ["updateUserProfile"],
    () => {
      return axios.post(baseDomain + "/user/auth/updateprofile", formData, {
        withCredentials: true,
      });
    },
    {
      onSuccess: () => {
        toast({
          status: "success",
          duration: 2000,
          title: "Profile updated",
          isClosable: false,
          position: "top",
        });
        onClose();
      },
    }
  );

  const handleSubmit = () => {
    // if(   formData.name=== "",
    // formData.email==="",
    // formData.password=== "",
    // formData.address=== ""){
    //   toast({
    //     status:"error",
    //     duration:2000,
    //     title:"Fields cannot be empty"
    //   })
    // }
    mutate();
  };

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        <AiOutlineUser />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Edit Profile</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <FormControl pt={"3vh"}>
                <Center>
                  <FormLabel cursor={"pointer"}>
                    <Avatar size="xl" src={localStorage.getItem("profileImg")}>
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
                    </Avatar>
                  </FormLabel>
                  <Input
                    type={"file"}
                    display={"none"}
                    onChange={(e) => handleImageChanges(e)}
                  />
                </Center>
              </FormControl>
              <Box>
                <FormLabel htmlFor="username">Name</FormLabel>
                <Input
                  ref={firstField}
                  id="username"
                  placeholder={localStorage.getItem("userName")}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="url">Email</FormLabel>
                <Input
                  id="email"
                  placeholder={localStorage.getItem("email")}
                  onInput={(e) => handeleFormDtata(e)}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="url">Address</FormLabel>
                <Input
                  id="address"
                  placeholder={localStorage.getItem("address")}
                  onInput={(e) => handeleFormDtata(e)}
                />
              </Box>

              <Box>
                <FormControl id="password">
                  <FormLabel>New Password</FormLabel>
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
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={() => handleSubmit()}>
              Update
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
