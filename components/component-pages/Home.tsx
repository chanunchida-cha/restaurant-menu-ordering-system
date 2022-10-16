import React from "react";
import {
  Badge,
  Box,
  Image,
  Input,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";
import { InfoFoods } from "@/models/types/TypesFood";
import ButtonAdd from "../utility/ButtonAdd";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
function Home() {
  const [isMaxWidth767, isMinToMAX, isDisplay] = useMediaQuery([
    "(max-width: 767px)",
    "(min-width: 767px) and (max-width: 1279px)",
    "(min-width: 1279px)",
  ]);
  const urlFoods = process.env.NEXT_PUBLIC_GET_FOODS;
  const {
    data: food,
    error,
    isValidating: loading,
  } = useSWR(`${urlFoods}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Input placeholder="ค้นหา" focusBorderColor="#EC9191" />
      <Tabs>
        <TabList>
          <Tab>ทั้งหมด</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Text>เนื้อหมู</Text>
            <SimpleGrid columns={{ base: 1, sm: 1, md: 1, xl: 3 }} spacing={5}>
              {food
                .filter((data: InfoFoods) => {
                  return data.category === "pork";
                })
                .map((data: InfoFoods) => {
                  return (
                    <>
                      <Box
                        // maxW="xl"

                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        display={{
                          base: "flex",
                          sm: "flex",
                          md: "flex",
                          xl: "block",
                        }}
                        alignItems="center"
                      >
                        <SimpleGrid columns={{ base: 2, sm: 2, md: 3, xl: 1 }}>
                          <Image
                            display={{ xl: "block" }}
                            mx={{ base: "auto", sm: 2, xl: "auto" }}
                            src={`/images/${data.src}`}
                            alt={data.i18n}
                            textAlign="center"
                            width={{
                              base: "80%",
                              sm: "60%",
                              md: "50%",
                              xl: "50%",
                            }}
                          />
                          <Box p="6">
                            <Box display="flex" alignItems="baseline">
                              <Badge
                                borderRadius="full"
                                px="2"
                                colorScheme="teal"
                              >
                                เนื้อหมู
                              </Badge>
                            </Box>

                            <Box
                              mt="1"
                              fontWeight="semibold"
                              as="h4"
                              lineHeight="tight"
                              noOfLines={1}
                            >
                              {data.i18n}
                              {isDisplay ? (
                                <Box
                                  pr="10px"
                                  display={"center"}
                                  alignItems="center"
                                  justifyContent={"center"}
                                >
                                  <ButtonAdd />
                                </Box>
                              ) : null}
                            </Box>
                            {isMaxWidth767 ? (
                              <Box
                                pr="10px"
                                display={"center"}
                                alignItems="center"
                                justifyContent={"center"}
                              >
                                <ButtonAdd />
                              </Box>
                            ) : null}
                          </Box>
                          {isMinToMAX ? (
                            <Box
                              pr="10px"
                              display={"center"}
                              alignItems="center"
                              justifyContent={"center"}
                            >
                              <ButtonAdd />
                            </Box>
                          ) : null}
                        </SimpleGrid>
                      </Box>
                    </>
                  );
                })}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Home;
