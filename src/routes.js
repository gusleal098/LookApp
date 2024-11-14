import React from "react"
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Feed from "./pages/Feed"
import Marketplace from "./pages/Marketplace"
import Category from "./pages/Marketplace/category"
import Product from "./pages/Marketplace/product"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"

import { colors } from './styles/theme.json'
import util from "./util"
import { Title } from "./components"

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const CustomDrawerComponent = props => {
    return (
        <DrawerContentScrollView {...props}>
            <Title bold color='light' variant='big' hasPadding>
                LOOKAPP
            </Title>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}


const DrawerComponent = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Feed"
            drawerContent={props => <CustomDrawerComponent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: colors.primary,
                drawerActiveTintColor: colors.light,
                drawerInactiveTintColor: util.toAlpha(colors.light, 60),
                drawerStyle: {
                    backgroundColor: colors.black,
                }
            }}
        >
            <Drawer.Screen
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name='people' color={color} />
                    ),
                }}
                name="Feed" component={Feed} />
            <Drawer.Screen
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name='tag' color={color} />
                    ),
                }}
                name="Marketplace" component={Marketplace} />
            <Drawer.Screen
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name='basket' color={color} />
                    ),
                }}
                name="Orders" component={Orders} />
        </Drawer.Navigator>
    )
}

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name='Home'
                    component={Home}
                />
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name='SignIn'
                    component={SignIn}
                />
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name='SignUp'
                    component={SignUp}
                />
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name='DrawerFeed'
                    component={DrawerComponent}
                />
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name='Category'
                    component={Category}
                />
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name='Product'
                    component={Product}
                />
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name='Cart'
                    component={Cart}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes