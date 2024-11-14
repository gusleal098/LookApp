import { Box, ScrollView, Text } from ".."

import Product from "."

const ProductList = ({ products }) => {
    return (
        <ScrollView fluid>
            {products?.map(product => (
                <Product
                    product={product}
                    key={product?.id} />
            ))}
        </ScrollView>
    )
}

export default ProductList