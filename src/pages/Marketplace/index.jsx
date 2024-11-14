import { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import Empty from '../../components/Empty'
import Header from "../../components/Header"
import { Text, Touchable } from "../../components"
import CategoryList from '../../components/Category/list'
import api from '../../services/api'

const Marketplace = ({ navigation }) => {

    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])

    const getCategories = async () => {
        try {
            setLoading(true)
            setTimeout(async () => {
                const { data: categoriesData } = await api.get('/categories')
                setCategories(categoriesData)
                setLoading(false)
            }, 1000 * 3)

        } catch (err) {
            setLoading(false)
            alert(err.message)
        }
    }

    //FOCUS
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getCategories()
        })

        return unsubscribe
    }, [navigation])

    return (
        <>
            <Header
                title='Categories'
                right={() => (
                    <Touchable hasPadding width='70px' onPress={() => navigation.navigate('Cart')}>
                        <Icon name='bag' size={20} />
                    </Touchable>
                )}
            />
            {loading && <Empty loading />}
            {!loading && (
                <CategoryList categories={categories} />
            )}
        </>
    )
}

export default Marketplace