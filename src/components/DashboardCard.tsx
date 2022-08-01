import React from 'react';

import { VStack, Text } from '@chakra-ui/react';

interface DashboardCardProps {
  type: "green" | "red";
  value: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ type, value }) => {
  const color = type == "green" ? "green" : "red"

  return (
    <VStack w={["100%", "50%"]} bg="lightBackground"
      px={12} py={8} 
      border="1px solid" borderColor={color} borderRadius="lg"
    >
      <Text>Total de {color.toUpperCase()}</Text>
      <Text fontSize="2xl" fontWeight="bold" 
        color={color}
      >{value}</Text>
    </VStack>
  );
}

export { DashboardCard };
