import {
  Button,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Select,
  Box,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import SideBar from "../AdminComponents/Dashboard/SideBar";
import { MdOutlineDelete } from "react-icons/md";
import { baseDomain } from "../../Utills/BaseUrl";

const AllUsers = () => {
  const [allUserData, setAllUsersData] = useState([]);
  const [toShowArray, setToShowArray] = useState([]);
  const [selectedVal, setSelectedVal] = useState("");
  const toast = useToast();

  const { isLoading, refetch: refetchAllData } = useQuery(
    ["fetchAllBlogs"],
    () => {
      return axios.get(baseDomain + "/admin/allusers");
    },
    {
      onSuccess: (data) => {
        setAllUsersData([...data.data.users]);
        setToShowArray([...data.data.users]);
      },
    }
  );

  const deleteUserReq = (userId) => {
    axios
      .get(`${baseDomain}/admin/deleteUser/${userId}`, {
        withCredentials: true,
      })
      .then((resp) => {
        resp.data.success
          ? toast({
              position: "top",
              duration: 3000,
              status: "success",
              isClosable: false,
              title: "User deleted",
            })
          : toast({
              position: "top",
              duration: 3000,
              status: "error",
              isClosable: false,
              title: "Somthing went wrong",
            });
      })
      .then(refetchAllData());
  };

  const handleGenderSelectChange = (e) => {
    if (e.target.value === "None") {
      setToShowArray([...allUserData]);
      return;
    }
    const filteredArray = allUserData.filter((user) => {
      return user.gender === e.target.value;
    });
    setToShowArray([...filteredArray]);
  };

  const searchQueryInput = (e) => {
    if (!e.target.value) {
      setToShowArray([...allUserData]);
    }
    const searched = allUserData.filter((user) => {
      return user[selectedVal].includes(e.target.value.toLowerCase());
    });
    setToShowArray([...searched]);
  };

  return (
    <HStack alignItems={"start"} bg="gray.100">
      <SideBar />
      <Box px="2vw" py="3vh" rounded={"lg"} fontSize={"10px"}>
        <Box bg="white" rounded={"lg"} px="3vw" py="4vh">
          <HStack maxW={"80vw"}>
            <Input
              isDisabled={selectedVal ? false : true}
              onInput={(e) => searchQueryInput(e)}
            />
            <Select
              placeholder="Select search type"
              onChange={(e) =>
                e.target.value ? setSelectedVal(e.target.value) : null
              }
              value={selectedVal}
            >
              <option value={"name"}>Name</option>
              <option value={"email"}>Email</option>
              <option value={"Name"}>Address</option>
            </Select>
            <Select
              placeholder="Gender"
              onChange={(e) =>
                e.target.value ? handleGenderSelectChange(e) : null
              }
            >
              <option>Male</option>
              <option>Female</option>
              <option>None</option>
            </Select>
          </HStack>
          <TableContainer pt="5vh">
            <Table variant="simple">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th isNumeric>Phone No.</Th>
                  <Th>Gender</Th>
                  <Th>Address</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {toShowArray.map((user) => {
                  return (
                    <Tr key={user._id}>
                      <Td>{user.name}</Td>
                      <Td>{user.email}</Td>
                      <Td isNumeric>{user.phoneNo}</Td>
                      <Td>{user.gender}</Td>
                      <Td>{user.address}</Td>
                      <Td>
                        <Button onClick={() => deleteUserReq(user._id)}>
                          <MdOutlineDelete />
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </HStack>
  );
};

export default AllUsers;
