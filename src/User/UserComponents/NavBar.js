import { Button, HStack, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import DrawerComp from "./Drawer";
import { baseDomain } from "../../Utills/BaseUrl";

const NavBar = () => {
  const navigate = useNavigate();
  const [userExist, setUserExist] = useState(
    localStorage.getItem("accesstoken") ? true : false
  );

  const sendLogoutReq = () => {
    localStorage.clear();
    axios.get(baseDomain + "/user/auth/logout");
    setUserExist(false);
  };

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
        onClick={() => navigate("/")}
        cursor={"pointer"}
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
