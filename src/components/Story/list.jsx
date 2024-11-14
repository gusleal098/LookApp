import { Box, ScrollView, Text } from '../../components'
import Story from '.'

const StoryList = ({ stories }) => {
    return (
        <Box fluid height='260px'>
            <Box
                row
                fluid
                justify='space-between'
                height='60px'
                hasPadding
            >
                <Text bold color='black'>
                    Stories
                </Text>
                <Text color='danger' underline>
                    Show All
                </Text>
            </Box>
            <ScrollView horizontal
                style={{
                    paddingLeft: 20
                }}
            >
                {stories?.map(story => (
                    <Story key={story.id} story={story} />
                ))}
            </ScrollView>
        </Box>
    )
}

export default StoryList