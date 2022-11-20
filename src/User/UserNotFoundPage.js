import React from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";

const UserNotFoundPage = () => {
  return (
    <VStack justifyContent="center" height="80vh">
      <Text fontSize={"6xl"}>404</Text>
      <Text size="md">Page Not Found</Text>
    </VStack>
  );
};

export default UserNotFoundPage;
