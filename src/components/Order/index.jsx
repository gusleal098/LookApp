import moment from "moment"

import { Box, Spacer, Text, Title } from ".."
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import { colors } from '../../styles/theme.json'
import util from "../../util"

const OrderItem = ({ order }) => {

    const stepEnum = {
        waiting: {
            icon: 'clock',
            color: 'warning'
        },
        delivered: {
            icon: 'check',
            color: 'secondary'
        },
        canceled: {
            icon: 'close',
            color: 'danger'
        }
    }

    const stepData = stepEnum[order?.step]

    return (
        <Box
            radius='5px'
            spacing='0px 0px 10px 0px'
            border={`1px solid ${util.toAlpha(colors.muted, 70)}`}>
            <Box hasPadding row justify='space-between' width='100%'>
                <Box row align='center' >
                    <Icon name='check' size={20} color={colors[stepData.color]} />
                    <Text color={stepData.color} spacing='0px 0px 0px 7px'>
                        {order?.step?.toUpperCase()}
                    </Text>
                </Box>
                <Text>{moment(order?.createdAt).format('DD/MM/YYYY HH:mm')}</Text>
            </Box>
            <Box hasPadding width='100%'>
                <Title>Order №{order?.orderNumber}</Title>
                <Spacer />
                <Text>
                    Tracking number: <Text color='dark'>{order?.trackingNumber}</Text>
                </Text>
            </Box>
            <Box hasPadding row justify='space-between' width='100%' >
                <Text>
                    VALUE OF ITEMS: <Text color='dark' bold>${order?.totalValue}</Text>
                </Text>
                <Text>
                    QUANTITY <Text color='dark' bold>{order?.totalItems}</Text>
                </Text>
            </Box>
        </Box>
    )
}

export default OrderItem