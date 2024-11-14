import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"

import { AppContext } from "../../contexts/app"
import { Box, Text, Touchable, Cover, Spacer } from ".."
import { useContext } from "react"

const Product = ({ product, selected = false }) => {
    const { removeFromCart } = useContext(AppContext)
    const { navigate } = useNavigation()

    return (
        <Touchable
            onPress={() => {

                if (!selected) {
                    navigate('Product', { product })
                } else {

                    Alert.alert(
                        'Sore abot that ?',
                        'This product will be removed from your cart',
                        [
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'Remove', style: 'destructive', onPress: () => removeFromCart(product?.id) }
                        ]
                    )
                }
            }}
            hasPadding={!selected}
            row
            background='light'
            spacing={selected ? '5px 0' : '0px 0px 1px 0px'}>
            <Cover
                width='80px'
                height='80px'
                image={product?.cover} />

            <Box hasPadding style={{ paddingTop: 0, paddingBottom: 0 }}>
                {!selected && <Text color='dark'>{product?.brand}</Text>}
                <Text color='dark' bold>
                    {product?.title}
                </Text>
                <Spacer />
                {selected && (
                    <Box>
                        <Text color='dark'>Size: {product?.size}</Text>
                    </Box>
                )}

                <Box row width='100%' justify='space-between'>
                    <Text color='dark'>{product?.price}</Text>
                    <Text color='danger'>
                        {selected ? 'remove' : 'Add to cart'}
                    </Text>
                </Box>
            </Box>
        </Touchable>
    )
}

export default Product