import { View } from "react-native"
import { ScrollView, Text, Touchable } from ".."
import { colors } from '../../styles/theme.json'

const Tabs = ({ tabs = [], active = '', onChange = (tab) => { } }) => {

    const totalTabs = tabs?.length
    // const activeTabStyle = {
    //     borderBottomWidth: 3,
    //     borderBottomColor: colors.danger,
    //     zIndex: 1
    // }

    return (
        <ScrollView
            horizontal
            style={{
                maxHeight: 60,
                backgroundColor: colors.light
            }}
        >
            {tabs?.map((tab, index) => (
                <Touchable
                    onPress={() => onChange(tab.value)}
                    hasPadding
                    style={{
                        minWidth: `${100 / totalTabs}%`,
                        alignItems: 'center'
                    }}
                    key={index}
                >
                    <View
                        style={{
                            borderBottomWidth: active === tab.value ? 3 : 0,
                            borderBottomColor: active === tab.value ? colors.danger : 'transparent',
                            width: '100%',
                            position: 'absolute',
                            bottom: 0,
                        }}
                    />
                    <Text color={active === tab.value ? 'danger' : undefined}>
                        {tab.label}
                    </Text>
                </Touchable>
            ))}
        </ScrollView>
    )
}

export default Tabs