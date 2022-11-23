import { background, Button, HStack, Image, VStack } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { AiOutlineFileText, AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { TfiWrite } from "react-icons/tfi";
import { useLocation, useNavigate } from "react-router-dom";
import { baseDomain } from "../../../Utills/BaseUrl";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const sendLogoutReq = () => {
    axios.get(baseDomain + "/user/auth/logout", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    });
    localStorage.clear();
  };
  return (
    <VStack
      textColor={"black"}
      // borderX={"0.2px solid black"}

      px={"10px"}
      height={"100vh"}
      py={"1vh"}
      alignItems={"start"}
      position="sticky"
      top={"0"}
    >
      <VStack
        bgColor={"white"}
        m="2vh"
        h="98vh"
        p="2vh"
        rounded="lg"
        justifyContent={"space-between"}
        shadow="base"
        alignItems={"start"}
      >
        <VStack alignItems={"start"}>
          <Image
            src="https://i.ibb.co/DzZKZHY/medium-icon-white-on-black.png"
            width={70}
          />
          <Button
            onClick={() => navigate("/admin/dashboard/")}
            w="full"
            textAlign={"left"}
            bg={location === "/admin/dashboard/" ? "gray.400" : null}
          >
            <AiOutlineHome />
            <h2>Home</h2>
          </Button>
          <Button
            bg={location === "/admin/dashboard/usersinfo" ? "gray.400" : null}
            onClick={() => navigate("/admin/dashboard/usersinfo")}
            w="full"
          >
            <FiUsers />
            <h2>Users</h2>
          </Button>
          <Button
            onClick={() => navigate("/admin/dashboard/blogs")}
            w="full"
            bg={location === "/admin/dashboard/blogs" ? "gray.400" : null}
          >
            <AiOutlineFileText />
            <h2>Blogs</h2>
          </Button>
          <Button
            bg={location === "/admin/dashboard/writeblog" ? "gray.400" : null}
            onClick={() => navigate("/admin/dashboard/writeblog")}
            w="full"
          >
            <TfiWrite />
            <h2>Write Article</h2>
          </Button>
        </VStack>
        {localStorage.getItem("role") === "admin" ? (
          <Button onClick={() => sendLogoutReq()} w="full">
            Logout
          </Button>
        ) : (
          <Button onClick={() => navigate("/admin/login")} w="full">
            Login
          </Button>
        )}
      </VStack>
    </VStack>
  );
};

export default SideBar;
