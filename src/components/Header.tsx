import React from 'react';

import { Divider, HStack, Text } from '@chakra-ui/react';

const Header: React.FC = () => {
  return (
    <>
      <HStack as="header"
        maxW="1120" h="4.5rem" w="100%" mx="auto" px={30}
        align="center" justify={["center", "left"]}
      >
        <Text
          color="primary" fontWeight="bold" fontSize="xl"
        >
          WinBlaze {" "}
          <Text as="span" color="white">Pro</Text>
        </Text>
      </HStack>
      <Divider bgColor="divider" opacity="0.2" />
    </>
  );
}

export { Header };
