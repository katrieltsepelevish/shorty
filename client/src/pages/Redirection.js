import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { Box, Heading, Text } from '@chakra-ui/react'
import axios from 'axios'

const Redirection = ({ match, history }) => {
    const hash = match.params.hash

    useEffect(() => {
        const getRedirection = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }

                const requestedUrl = await axios.get(`/api/url/${hash}`, config)

                if (requestedUrl)
                    window.location.replace(requestedUrl.data.data.url)
            } catch (error) {
                history.push('/404')
            }
        }

        getRedirection()
    }, [hash])

    return (
        <Box w="100%" mt="5" textAlign="center">
            <Helmet>
                <title>Shorty :: Redirecting...</title>
                <meta name="description" content="Redirecting to saved Url" />
            </Helmet>
            <Heading w="100%" as="h1" fontSize="4xl">
                Redirecting
            </Heading>
            <Text fontSize="xl" color="gray.500">
                It could take several moments...
            </Text>
        </Box>
    )
}

export default withRouter(Redirection)
