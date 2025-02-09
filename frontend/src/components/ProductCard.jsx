import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Heading, Image, Text, HStack, IconButton, useColorMode } from '@chakra-ui/react'
import React from 'react'

export const ProductCard = ({product}) => {
    const textColor = useColorMode("gray,600", "gray.200")
    const bg = useColorMode("white", "gray.800")
  return (
    <Box
     shadow='lg'
     rounded='lg'
     overflow='hidden'
     transition='all 0.3s'
     _hover={{transform:"translateY(-5px)", shadow:"xl"}}
     bg={bg}
    >
        <Image scr={product.image} alt={product.name} h={48} w={'full'} objectFit='cover' />

        <Box p={4}>
            <Heading as='h3' size='md' mb={2} >
                {product.name}
            </Heading>

            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                ${product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                <IconButton icon={<DeleteIcon />} onClick={() => {handleDelete(product._id)}} colorScheme='red' />
            </HStack>

        </Box>
        
    </Box>
  )
}
