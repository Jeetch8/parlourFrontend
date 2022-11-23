import React from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import SideBar from "../AdminComponents/Dashboard/SideBar";
import { useNavigate } from "react-router-dom";

const AdminNotFound = () => {
  const navigate = useNavigate();
  return (
    <HStack bg="gray.100" alignItems={"start"}>
      <SideBar />
      <Box
        display={"flex"}
        alignItems="center"
        justifyContent={"center"}
        w="80vw"
        h="100vh"
      >
        <Box textAlign={"center"}>
          <Text fontWeight={"medium"}>
            Please login first to access all routes
          </Text>
          <br />
          <Button bg="gray.300" onClick={() => navigate("/admin/login")}>
            Login
          </Button>
        </Box>
      </Box>
    </HStack>
  );
};

export default AdminNotFound;
