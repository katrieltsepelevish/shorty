import React from 'react'
import { Helmet } from 'react-helmet'
import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <Box w="100%" mt="5" textAlign="center">
            <Helmet>
                <title>Shorty :: 404</title>
                <meta name="description" content="Page not found" />
            </Helmet>
            <Heading w="100%" as="h1" fontSize="6xl">
                404
            </Heading>
            <Text fontSize="xl" color="gray.500">
                Page not found
            </Text>
            <Link to="/">
                <Button
                    display="block"
                    borderRadius="0"
                    mt="4"
                    w="100%"
                    colorScheme="teal"
                    type="submit"
                    boxShadow="-5px 5px #2CCFCC"
                >
                    RETURN HOME
                </Button>
            </Link>
        </Box>
    )
}

export default NotFound
