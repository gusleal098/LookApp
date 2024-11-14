import { ScrollView } from ".."

import OrderItem from "./index"

const OrderList = ({ orders }) => {
    return (
        <ScrollView fluid background='light' hasPadding>
            {orders.map((order, index) => (
                <OrderItem
                    order={order}
                    key={index}
                />
            ))}
        </ScrollView>
    )
}

export default OrderList