import { useNavigation } from '@react-navigation/native'

import { Box, Text, Touchable, Cover, Title, Spacer } from ".."

import util from "../../util"
import { colors } from '../../styles/theme.json'

const Category = ({ category }) => {

    const { navigate } = useNavigation()

    return (
        <Touchable
            onPress={() => navigate('Category', { category })}
            width='100%'
            height='180px'
            radius='10px'
            spacing='10px 0px'>

            <Cover
                width='100%'
                height='100%'
                image={category?.cover}
            >

                <Box
                    width='100%'
                    justify='center'
                    align='center'
                    hasPadding
                    background={util.toAlpha(colors.black, 70)}>

                    <Title color='light' bold>
                        {category?.title}
                    </Title>
                    <Text color='light'>{category?.items} ITEMS</Text>
                </Box>

            </Cover>
        </Touchable>
    )
}

export default Category