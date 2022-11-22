import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const slides = [
  "https://i.ibb.co/V2wLDhY/woman-doing-facial-mask-321217.jpg",
  "https://i.ibb.co/0hcyF9M/manicure-nail-polish.jpg",
  "https://i.ibb.co/VVrggd4/best-facials-for-acne-1080x628.jpg",
  "https://i.ibb.co/TMBCLrt/Blog3-Best-Acne-Treatmentfor-Scars.jpg",
  "https://i.ibb.co/6tTkhCj/file-3.png",
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };
  const SLIDES_INTERVAL_TIME = 5000;
  const ANIMATION_DIRECTION = "right";
  useEffect(() => {
    const prevSlide = () => {
      setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };

    const nextSlide = () => {
      setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };

    const automatedSlide = setInterval(() => {
      ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
    }, SLIDES_INTERVAL_TIME);
    return () => clearInterval(automatedSlide);
  }, [slidesCount]);
  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
      px={{ base: 0, lg: 10 }}
      alignItems="center"
      justifyContent="center"
    >
      <Flex w="full" overflow="hidden" position={"relative"}>
        <Flex pos="relative" h="80vh" w="full" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} flex="none" boxSize="full" shadow="md">
              <Text
                color="white"
                fontSize="xs"
                // p="8px 12px"
                pos="absolute"
                top="0"
                whiteSpace="nowrap"
              >
                {sid + 1} / {slidesCount}
              </Text>
              <Image
                src={slide}
                alt="carousel image"
                boxSize="full"
                backgroundSize="cover"
                backgroundPosition={"center"}
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Carousel;
