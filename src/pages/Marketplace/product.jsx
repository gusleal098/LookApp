import { useEffect, useState, useContext } from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { StretchyScrollView } from 'react-native-stretchy'

import { Box, Button, Spacer, Text, Title, Touchable } from "../../components"
import Header from "../../components/Header"
import { colors } from '../../styles/theme.json'
import util from '../../util'
import Picker from '../../components/Picker'
import { AppContext } from "../../contexts/app"

const Product = ({ navigation, route }) => {

    const { cart, addToCart } = useContext(AppContext)

    const { product } = route?.params
    const [size, setSize] = useState(null)

    useEffect(() => {
        setSize(product?.sizes?.[0]?.value)
    }, [product])



    return (
        <>
            <Header
                title={product?.title}
                goBack
                right={() => (
                    <Touchable hasPadding width='70px' onPress={() => navigation.navigate('Cart')}>
                        <Icon name='bag' size={20} />
                    </Touchable>
                )} />
            <StretchyScrollView
                image={{
                    uri: product?.cover
                }}
                imageOverlay={
                    <Box background={util.toAlpha(colors.dark, 40)}></Box>
                }
                foreground={
                    <Box hasPadding justify='flex-end'>
                        <Title bold color='light' variant='big'>
                            ${product?.price}
                        </Title>
                    </Box>
                }
            >
                <Box hasPadding background='light'>
                    <Text color='black'>{product?.type}</Text>
                    <Spacer size='20px' />
                    <Title color='black'>{product?.title}</Title>
                    <Spacer size='30px' />
                    <Text color='dark'>
                        {product?.description}
                    </Text>
                    <Spacer size='30px' />
                    <Picker
                        title='Size'
                        options={product?.sizes}
                        initialValue={product?.sizes?.[0]?.value}
                        onChange={value => setSize(value)}
                    />
                    <Spacer size='30px' />
                    <Button block onPress={() => {
                        addToCart({ ...product, size })
                        navigation.navigate('Cart')
                    }}>
                        <Text color='light'>Add to Card</Text>
                    </Button>
                </Box>
            </StretchyScrollView>
        </>
    )
}

export default Product