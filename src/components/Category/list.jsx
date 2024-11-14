
import Category from "."
import { ScrollView, Text } from ".."

const CategoryList = ({ categories }) => {
    return (
        <ScrollView
            fluid
            style={{
                paddingTop: 20,
                paddingLeft: 20,
                paddingRight: 20
            }}
        >
            {categories?.map(category => (
                    <Category key={category.id} category={category} />
                ))}
        </ScrollView>
    )
}

export default CategoryList