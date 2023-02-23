import { Box, Center, Checkbox, Divider, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

function ProductPage() {
  return (
    <>
      <HStack alignItems={"flex-start"}>
        <VStack width={"200px"} gap="50px">
        <Box>
            <Box>
              <Text fontWeight={500}>BRAND</Text>
            </Box>
            <Stack spacing={0} direction="column">
              <Checkbox>Sony</Checkbox>
              <Checkbox>OnePlus</Checkbox>
              <Checkbox>Samsung</Checkbox>
              <Checkbox>Xiaomi</Checkbox>
              <Checkbox>Google</Checkbox>
              <Checkbox>Motorola</Checkbox>
              <Checkbox>Nokia</Checkbox>
              <Checkbox>Asus</Checkbox>
              <Checkbox>Apple</Checkbox>
              <Checkbox>LG</Checkbox>
              <Checkbox>Vivo</Checkbox>
              <Checkbox>Realme</Checkbox>
            </Stack>
          </Box>
          <Box>
            <Box>
              <Text fontWeight={500}>RAM</Text>
            </Box>
            <Stack spacing={0} direction="column">
              <Checkbox>4 GB</Checkbox>
              <Checkbox>6 GB</Checkbox>
              <Checkbox>8 GB</Checkbox>
              <Checkbox>12 GB</Checkbox>
              <Checkbox>16 GB</Checkbox>
            </Stack>
          </Box>
          <Box>
            <Box>
              <Text fontWeight={500}>STORAGE</Text>
            </Box>
            <Stack spacing={0} direction="column">
              <Checkbox>64 GB</Checkbox>
              <Checkbox>128 GB</Checkbox>
              <Checkbox>256 GB</Checkbox>
            </Stack>
          </Box>
        </VStack>
        <Box height="100vh" bgColor={"gray"}>
          <Divider orientation="vertical" />
        </Box>
        <Box>All products</Box>
      </HStack>
    </>
  );
}

export default ProductPage;
