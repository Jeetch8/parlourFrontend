import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import SideBar from "../AdminComponents/Dashboard/SideBar";
import { BsGlobe } from "react-icons/bs";
import PieChart from "../AdminComponents/Dashboard/Graphs/PieChart";
import SingleLineChart from "../AdminComponents/Dashboard/Graphs/SingleLineChart";
import RadialBar from "../AdminComponents/Dashboard/Graphs/RadialBar";
import MapGraph from "../AdminComponents/Dashboard/Graphs/MapsGraph";

const Dashboard = () => {
  return (
    <HStack bgColor={"gray.50"} alignItems="start">
      <SideBar />
      <Box w="88vw" h="100vw" pt="3vh" px="2vw" pb="5vh">
        <HStack rowGap={"5vw"} spacing="8vw" w="80vw">
          <HStack
            bg="white"
            w="fit-content"
            p="2vh"
            rounded={"2xl"}
            rowGap="2vw"
            spacing={2}
          >
            <VStack alignItems={"start"} fontWeight="bold" spacing={0} mr="1vw">
              <Text color={"gray.400"}>Month's Traffic</Text>
              <Text>1346</Text>
            </VStack>
            <Button bg="blue.100">
              <BsGlobe />
            </Button>
          </HStack>
          <HStack
            bg="white"
            w="fit-content"
            p="2vh"
            rounded={"2xl"}
            rowGap="2vw"
            spacing={2}
          >
            <VStack alignItems={"start"} fontWeight="bold" spacing={0} mr="1vw">
              <Text color={"gray.400"}>Today's Traffic</Text>
              <Text>423</Text>
            </VStack>
            <Button bg="blue.100">
              <BsGlobe />
            </Button>
          </HStack>
          <HStack
            bg="white"
            w="fit-content"
            p="2vh"
            rounded={"2xl"}
            rowGap="2vw"
            spacing={2}
          >
            <VStack alignItems={"start"} fontWeight="bold" spacing={0} mr="1vw">
              <Text color={"gray.400"}>Likes Toady</Text>
              <Text>322</Text>
            </VStack>
            <Button bg="blue.100">
              <BsGlobe />
            </Button>
          </HStack>
          <HStack
            bg="white"
            w="fit-content"
            p="2vh"
            rounded={"2xl"}
            rowGap="2vw"
            spacing={2}
          >
            <VStack alignItems={"start"} fontWeight="bold" spacing={0} mr="1vw">
              <Text color={"gray.400"}>Comments Today</Text>
              <Text>43</Text>
            </VStack>
            <Button bg="blue.100">
              <BsGlobe />
            </Button>
          </HStack>
        </HStack>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          rowGap={{ base: "8", md: "12" }}
          columnGap="8"
          pt="3vh"
          px="2vw"
          pb="5vh"
        >
          <Box w="500px" bg="white" shadow={"base"} p="1vw" rounded={"lg"}>
            <Text fontSize={"20px"} fontWeight="bold">
              Traffic Chart
            </Text>
            <SingleLineChart />
          </Box>
          <Box
            w="500px"
            bg="white"
            shadow={"base"}
            p="1vw"
            rounded={"lg"}
            // ml="200px"
          >
            <Text fontSize={"20px"} fontWeight="bold" mb="40px">
              Traffic sources
            </Text>
            <PieChart />
          </Box>
          <Box w="500px" bg="white" shadow={"base"} p="1vw" rounded={"lg"}>
            <Text fontSize={"20px"} fontWeight="bold">
              User Gender ratio
            </Text>
            <RadialBar />
          </Box>
          <Box w="500px" bg="white" shadow={"base"} p="1vw" rounded={"lg"}>
            <Text fontSize={"20px"} fontWeight="bold">
              Social Sources
            </Text>
            <MapGraph />
          </Box>
        </SimpleGrid>
      </Box>
    </HStack>
  );
};

export default Dashboard;
