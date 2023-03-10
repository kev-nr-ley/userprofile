import React from "react";
import {
  Heading,
  Link,
  Text,
  Flex,
  Box,
  Image,
  Button,
} from "@chakra-ui/react";
import user from "./UserJSON";

export default function UserInformation(props) {
  return (
    <Flex
      flexDirection='column'
      px={[8, 12, 24, 32]}
      w='full'
      h='auto'
      _after={{
        position: "absolute",
        left: "0",
        zIndex: "-1",
        content: '""',
        w: "full",
        h: "240",
        bgGradient: "linear(to-r, blue.100, white 80%)",
      }}>
      <Flex className='user-profile-ccontainer' flexDirection='column' p='4'>
        <Flex flexDirection='column' w='full' mt='14'>
          <Box
            className='user-image-flag-box'
            position='relative'
            width='fit-content'>
            <Image
              className='user-image'
              borderRadius='full'
              w={["40", "44", "48", "52"]}
              objectFit='cover'
              objectPosition={{ base: "top", md: "top" }}
              border='16px solid white'
              src={`${user.photo}`}
              alt='user headshot'
              style={{ aspectRatio: "1/1" }}
            />
            <Image
              className='user-flag'
              position='absolute'
              w={["14", "16", "18", "20"]}
              bottom='2'
              right='0'
              boxShadow='0px -0px 12px 2px #333'
              src={`${user.flag}`}
              alt='flaaag'
            />
          </Box>

          <Flex
            justifyContent='left'
            alignItems='left'
            flexDirection={["column", "row"]}
            width={["100%", "100%", "75%", "50%"]}
            p='0'
            gap='0'>
            {/* Name and Location */}
            <Box
              className='user-name-location-container'
              flexDirection='column'
              w='100%'
              minW='200px'>
              <Text className='user-name' fontSize='xl' fontWeight='bold'>
                {user.name}
              </Text>
              <Box className='user-location' w='100%'>
                <Text fontSize='lg' color='gray.500'>
                  {user.country}
                </Text>
              </Box>
            </Box>
            {/* Buttons */}
            <Flex gap='4'>
              <Button
                bg='transparent'
                color='gray.700'
                border='2px'
                borderColor='blue.200'
                borderRadius='full'
                fontWeight='semibold'
                w={["120px", "140px", "160px", "180px"]}
                h='40px'
                margin='auto'
                _hover={{ bg: "blue.400", color: "white" }}>
                <Link href={`mailTo:${user.email}`} target='_blank'
                textDecoration='none'
                style={{ textDecoration: 'none' }}
                  >
                  Email
                </Link>
              </Button>

              <Button
                bg='transparent'
                color='gray.700'
                border='2px'
                borderColor='blue.200'
                borderRadius='full'
                fontWeight='semibold'
                w={["120px", "140px", "160px", "180px"]}
                h='40px'
                margin='auto'
                _hover={{ bg: "blue.400", color: "white" }}>
                <Link
                  href={`https://${user.github}`}
                  target='_blank'
                  isExternal
                  style={{ textDecoration: 'none' }}
                  >
                  GitHub
                </Link>
              </Button>
            </Flex>
          </Flex>

          <Box className='user-description-container' w='100%' pt='8'>
            <Text fontSize='md'>
            {user.description}

            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
