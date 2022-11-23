import React from "react";
import { Box, HStack, Image, Text } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";
import AutoPLay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const Carousel2 = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, speed: 5, startIndex: 0 }, [
    AutoPLay(),
  ]);
  const testtemonialsList = [
    {
      img: "https://cdn2.stylecraze.com/wp-content/uploads/2015/05/220-10-best-indian-hairstyles_132172781.jpg",
      customerName: "Nikita B",
      experience:
        "I really love the hair cut which I took in the pearl family Solon and spa souch a good experience and i would like to tell know computation is going on from one parlour to other parlour somepeople simple they give fake reviews so no need to follow souch aake reviews believe me I souch a good service tq ma'am",
    },
    {
      img: "https://cdn2.stylecraze.com/wp-content/uploads/2012/12/11.-Curled-Edges.jpg",
      customerName: "Anamika S",
      experience:
        "One of the finest salons I have found at very affordable rates. The hairdresser is polite and customer friendly. Also the ambience is well maintained you'd feel you've entered the right place also the rates are very much affordable. It's a win win everywhere. 😍",
    },
    {
      img: "https://images.bewakoof.com/utter/content/3613/content_Simple-hairstyle_1.jpg",
      customerName: "Manreet Kaur",
      experience:
        "When I went to visit the salon for my bridal make up i was a little worried as I had scars on my face. But the expert Suman assured me about the quality of products and I absolutely loved the end result.",
    },
    {
      img: "https://www.beyoung.in/blog/wp-content/uploads/2020/01/Smooth_and_shiny_curl_bridal_hairstyle-853x1024.jpg",
      customerName: "Nigamruthu V",
      experience:
        "The facial and detan done by kanchana was mind blowing. Though i wanted to get a head massage too, due to facial i was not able to take one… Knowing my face, she exceptionally did an amazing facial along with a quick massage",
    },
    {
      img: "https://i0.wp.com/www.hadviser.com/wp-content/uploads/2020/02/1-trending-hairstyle-for-women-CNfIfNdDDYf.jpg?resize=1012%2C1264&ssl=1",
      customerName: "Anita Balchander",
      experience:
        " We chose Nadiya mam for my sister’s wedding for bride, groom and bridesmaid make-up and were really happy with the outcome. It was just as we expected. Not too much not less but was perfect. Very glad that we chose her. Prices are not too high. Value for money. Excellent quality of work. ",
    },
  ];
  return (
    <Box
      w={{ lg: "49.4%", base: "100%" }}
      bg="black"
      height={"full"}
      py="10vh"
      px={{ md: "10vw", sm: "0", lg: "3vw" }}
    >
      <Box
        fontFamily={"Ubuntu"}
        height={"100%"}
        width={"full"}
        color="ghostwhite"
        overflow={"hidden"}
        textAlign="center"
      >
        <Text fontSize={"30px"}>"Your experience matters"</Text>
        <Text fontSize={"25px"} mb="20px">
          Testemonials
        </Text>
        <Box ref={emblaRef}>
          <HStack as={motion.div}>
            {testtemonialsList.map((item, index) => {
              return (
                <Box
                  key={index}
                  flex={"0 0 100%"}
                  top={"0"}
                  color={"gold"}
                  textAlign={"center"}
                >
                  <Box
                    display={"flex"}
                    justifyContent="end"
                    mr="40px"
                    mb="40px"
                    position={"relative"}
                  >
                    <Box
                      border={"1px solid gold"}
                      width="200px"
                      position={"absolute"}
                      height="full"
                      transform={"rotate(20deg)"}
                    ></Box>
                    <Image src={item.img} width="200px" />
                  </Box>
                  <Text w={{ lg: "30vw", base: "60vw" }}>
                    {`"${item.experience}"`}
                  </Text>
                  <Text color={"white"} fontStyle="italic">
                    {item.customerName}
                  </Text>
                </Box>
              );
            })}
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Carousel2;
