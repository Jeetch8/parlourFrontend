import { Button, Drawer, HStack, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import DrawerComp from "./Drawer";
import { baseDomain } from "../../Utills/BaseUrl";

const NavBar = () => {
  const [userExist, setUserExist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accesstoken")) {
      setUserExist(true);
    }
  }, []);

  const sendLogoutReq = () => {
    localStorage.clear();
    axios.get(baseDomain + "/user/auth/logout");
    setUserExist(false);
  };

  console.log(userExist.authenticated);
  return (
    <HStack
      justifyContent={"space-between"}
      py="2"
      // position={"sticky"}
      top="0"
      bg={"gray.50"}
    >
      <Image
        src="https://i.ibb.co/DzZKZHY/medium-icon-white-on-black.png"
        width={"60px"}
      />
      {userExist ? (
        <HStack pr={"5"}>
          <Button onClick={() => navigate("/savedblogs")}>
            <BsHeart />
          </Button>
          <Button onClick={() => sendLogoutReq()}>Logout</Button>
          <DrawerComp />
        </HStack>
      ) : (
        <HStack pr={"5"}>
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/register")}>Register</Button>
        </HStack>
      )}
    </HStack>
  );
};

export default NavBar;
