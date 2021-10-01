import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import {
    Box,
    FormControl,
    FormErrorMessage,
    InputGroup,
    InputRightElement,
    Input,
    Button,
    useClipboard,
} from '@chakra-ui/react'

const CreateUrl = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [urlInput, setUrlInput] = useState('')
    const [hash, setHash] = useState()

    // Copy to clipboard statements
    const [copyInput, setCopyInput] = useState('')
    const { hasCopied, onCopy } = useClipboard(copyInput)

    const handleSubmit = async (event) => {
        event.preventDefault()

        setIsLoading(true)
        try {
            const config = {
                header: {
                    'Content-Type': 'applications/json',
                },
            }

            const urlRequested = await axios.post(
                '/api/url',
                { url: urlInput },
                config
            )

            const requestHash = urlRequested.data.data.hash

            setHash(requestHash)

            setCopyInput(window.location.href + requestHash)

            setError(false)
            setIsLoading(false)
        } catch (error) {
            setError(error.response.data.message)
            setIsLoading(false)
        }
    }

    return (
        <Box>
            <Helmet>
                <title>Shorty :: Create Url</title>
                <meta name="description" content="Creating shorten URL" />
            </Helmet>
            <form onSubmit={handleSubmit}>
                <Box borderWidth="1px" w="100%" mt="10" p="5" shadow="md">
                    <FormControl isInvalid={error}>
                        <Input
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            borderRadius="0"
                            type="string"
                            placeholder="Enter 'URL' to short..."
                        />
                        <FormErrorMessage>{error}</FormErrorMessage>
                    </FormControl>
                    <Button
                        borderRadius="0"
                        mt="4"
                        w="100%"
                        colorScheme="teal"
                        type="submit"
                        boxShadow="-5px 5px #2CCFCC"
                        isLoading={isLoading}
                    >
                        SHORT
                    </Button>
                </Box>
                {hash && (
                    <InputGroup mt="5" size="md">
                        <Input
                            value={copyInput}
                            isReadOnly
                            borderRadius="0"
                            pr="5rem"
                        />
                        <InputRightElement width="5rem">
                            <Button
                                onClick={onCopy}
                                borderRadius="0"
                                h="1.75rem"
                                size="sm"
                            >
                                {hasCopied ? 'Copied' : 'Copy'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                )}
            </form>
        </Box>
    )
}

export default CreateUrl
