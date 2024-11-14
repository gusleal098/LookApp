import { useContext, useEffect, useState } from "react"
import { StatusBar, ActivityIndicator } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { Box, Button, Spacer, Text, Title } from '../../components/index'

import { AppContext } from '../../contexts/app'

const Home = ({ navigation: { navigate, replace } }) => {

    // AsyncStorage.clear()
    const [loading, setLoading] = useState(true)
    const { setUser } = useContext(AppContext)

    const checkLogged = async () => {
        // AsyncStorage.clear()
        setLoading(true)

        const loggedUser = await AsyncStorage.getItem('@user')
        if (loggedUser) {
            setUser(JSON.parse(loggedUser))
            replace('DrawerFeed')
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkLogged()
    }, [])


    return (
        <>
            <StatusBar backgroundColor='#130F40' />
            <Box hasPadding align='center' background='dark'>
                <Box justify='center' align='center' fluid>
                    <Title color='light' variant='big' bold>
                        LOOKAPP
                    </Title>
                    <Spacer />
                    <Text align='center' spacing='0px 40px'>
                        Stay on top of the fashion world
                        and buy your favorite looks.
                    </Text>

                    {loading && (
                        <>
                            <Spacer size='40px' />
                            <ActivityIndicator size='large' />
                        </>
                    )}
                </Box>


                {!loading && (
                    <Box justify='flex-end' align='center'>
                        <Button block onPress={() => navigate('SignIn')}>
                            <Text color='light'>SigIn my account</Text>
                        </Button>
                        <Spacer size='20px' />
                        <Text underline color='light' onPress={() => navigate('SignUp')}>Create new account</Text>
                        <Spacer size='70px' />
                    </Box>
                )}
            </Box>
        </>
    )
}

export default Home