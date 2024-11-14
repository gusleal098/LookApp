import { Box, ScrollView, Text } from '../../components'
import Post from '.'
const PostList = ({ posts }) => {
    return (

            <Box
                style={{
                    minWidth: '100%'
                }}
            >
                {posts?.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </Box>
    )
}

export default PostList