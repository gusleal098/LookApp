import { Box, Button, Cover, Spacer, Text, Title } from ".."
import { useNavigation } from "@react-navigation/native"

const CongratsModal = () => {

    const { navigate } = useNavigation()

    return (
        <Box
            background='light'
            hasPadding
            justify='center'
            align='center'
            style={{
                position: 'absolute',
                zIndex: 1,
                width: '100%',
                height: '100%'
            }}
        >
            <Cover
                width='200px'
                height='200px'
                background='transparent'
                source={
                    require('../../assets/check-circle.png')
                } />
            <Spacer size='50px' />
            <Title>Congratulations!</Title>
            <Spacer />
            <Text variant='small'>
                Your items are on the way
                and should arrive shortly
            </Text>
            <Spacer size='50px' />
            <Button block onPress={() => navigate('Orders')}>
                <Text color='light'>Track your order</Text>
            </Button>
        </Box>
    )
}

export default CongratsModal