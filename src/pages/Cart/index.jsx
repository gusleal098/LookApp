import { useState, useContext } from "react"
import { ActivityIndicator } from "react-native"
import moment from "moment"

import { Box, Button, ScrollView, Spacer, Text, Title } from "../../components"
import Header from "../../components/Header"
import Tabs from "../../components/Tabs"
import Product from "../../components/Product"
import PaymentForm from "../../components/Forms/payment"
import CongratsModal from "../../components/Modals/congrats"

import { colors } from '../../styles/theme.json'
import util from "../../util"
import { AppContext } from "../../contexts/app"
import Empty from "../../components/Empty"
import api from "../../services/api"

const Cart = () => {

    const { user, cart, DISCOUNT_PORCENTAGE, DELIVERY_TAX, ORDER_NUMBER } = useContext(AppContext)

    const [showCongrats, setShowCongrats] = useState(false)
    const [loading, setLoading] = useState(false)
    const [creditCard, setCreditCard] = useState({})
    const [tab, setTab] = useState('cart')

    const cartIsEmpty = cart?.length === 0
    const orderPrice = cart?.reduce((acc, product) => {
        return (acc + product?.price)
    }, 0)
    const totalDiscount = (orderPrice * DISCOUNT_PORCENTAGE).toFixed(2)
    const totalOrderPrice = orderPrice + DELIVERY_TAX - totalDiscount

    const buyCart = async () => {
        try {
            setLoading(true)

            const creditCardValidation = util.isValidCreditCard(creditCard)
            if (creditCardValidation.error) {
                alert(creditCardValidation.message)
                return false
            }

            const { data: orderData } = await api.post('/orders', {
                userId: user.id,
                step: "waiting",
                createdAt: moment().format(),
                orderNumber: ORDER_NUMBER,
                trackingNumber: new Date().getTime(),
                totalValue: totalOrderPrice,
                totalItems: cart?.length

            })

            if (!orderData.id) {
                alert('Order creation error... try againd later...')
                setLoading(false)
                return false
            }

            setShowCongrats(true)

        } catch (err) {
            setLoading(false)
            alert(err.message)
        }
    }


    return (
        <>
            {showCongrats && <CongratsModal />}

            <Header title="Cart" goBack />

            {cartIsEmpty && <Empty message="Cart is empty..." />}
            {!cartIsEmpty && (

                <>
                    <Tabs tabs={[
                        { label: 'Cart', value: 'cart' },
                        { label: 'Payment', value: 'payment' }
                    ]}
                        active={tab}
                        onChange={(value) => setTab(value)}
                    />
                    <ScrollView hasPadding background='light'>

                        <Spacer size='20px' />

                        <Title variant='small'>Order number is {ORDER_NUMBER} </Title>

                        <Spacer size='20px' />

                        {tab === 'cart' && (
                            <>
                                {cart?.map(product => (
                                    <Product
                                        product={product}
                                        selected
                                        key={product?.id} />
                                ))}

                                <Spacer size='30px' />

                                <Box row width='100%' height='30px' justify='space-between'>
                                    <Text color='dark'>Order:</Text>
                                    <Text color='dark'>${orderPrice}</Text>
                                </Box>
                                <Box row width='100%' height='30px' justify='space-between'>
                                    <Text color='dark'>Discount:</Text>
                                    <Text color='secondary'>$-{totalDiscount}</Text>
                                </Box>
                                <Box row width='100%' height='30px' justify='space-between'>
                                    <Text color='dark'>Delivery:</Text>
                                    <Text color='dark'>${DELIVERY_TAX?.toFixed(2)}</Text>
                                </Box>
                                <Box row width='100%' height='30px' justify='space-between'>
                                    <Text color='dark' bold>Total Order:</Text>
                                    <Text color='dark' bold>${totalOrderPrice?.toFixed(2)}</Text>
                                </Box>

                                <Spacer size='30px' />

                                <Button block onPress={() => setTab('payment')}>
                                    <Text color='light'>Place Order</Text>
                                </Button>
                            </>
                        )}

                        {tab === 'payment' && (
                            <>
                                <Spacer size='20px' />
                                <Box
                                    row
                                    width='100%'
                                    justify='space-between'
                                    style={{
                                        borderBottomWidth: 0.5,
                                        borderBottomColor: util.toAlpha(colors.muted, 50),
                                        paddingBottom: 10
                                    }}
                                >
                                    <Text color='dark' bold>Shipping address</Text>
                                    <Text color='danger'>Change</Text>
                                </Box>
                                <Spacer />
                                <Text color='dark'>
                                    Tiana Rosser, 4517 Washington Ave Manchester, Kentucky 39495 United States
                                </Text>

                                <Spacer size='30px' />

                                <Box
                                    row
                                    width='100%'
                                    justify='space-between'
                                    style={{
                                        borderBottomWidth: 0.5,
                                        borderBottomColor: util.toAlpha(colors.muted, 50),
                                        paddingBottom: 10
                                    }}
                                >
                                    <Text color='dark' bold>Delivery details</Text>
                                    <Text color='danger'>Change</Text>
                                </Box>
                                <Spacer />
                                <Text color='dark'>Standard Delivery</Text>
                                <Text color='dark'>Saturday 27 - Tuesday 30</Text>
                                <Text color='dark'>Cost: $10</Text>

                                <Spacer size='30px' />

                                <PaymentForm onChange={(creditCardData) => setCreditCard(creditCardData)} />

                                <Spacer size='30px' />

                                <Button block onPress={() => buyCart(true)}>
                                    {!loading && (
                                        <Text color='light'>Confirmation</Text>
                                    )}
                                    {loading && <ActivityIndicator />}
                                </Button>
                            </>
                        )}

                        <Spacer size='50px' />
                    </ScrollView>
                </>
            )}
        </>
    )
}

export default Cart