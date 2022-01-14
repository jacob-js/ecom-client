import { Tag } from "atomize"
import moment from 'moment'
import { HiOutlineArrowRight } from "react-icons/hi"
import fr from 'moment/locale/fr'

export const ordersColumns = () =>{
    return[
        {
            title: 'Order ID',
            dataIndex: 'ref',
            key: 'ref'
        },
        {
            title: 'Status',
            key: 'status',
            render: (record) => (
                record.status === 'pending' ?
                <Tag p={{ x: "20px", y: "5px" }} bg="gray400" rounded="circle">{record.status}</Tag> :
                record.status === 'delivered' ?
                <Tag textColor="success700" bg="success400" p={{ x: "20px", y: "5px" }} rounded="circle">{record.status}</Tag> :
                <Tag textColor="danger700" bg="danger200" p={{ x: "20px", y: "5px" }} rounded="circle">{record.status}</Tag>
            )
        },
        {
            title: 'Date',
            key: 'createdAt',
            render: (record) => (
                <span> {moment(record.createdAt).locale('fr', fr).format('ll')} </span>
            )
        },
        {
            title: 'Total',
            key: 'total',
            render: (record) => {
                const usdItems = record?.Items?.filter(item => item.currency === 'USD' || item.currency === 'usd');
                const cdfItems = record?.Items?.filter(item => item.currency === 'CDF' || item.currency === 'cdf');
                const totalUsd = usdItems?.reduce((acc, item) => acc + item.unitAmount * item.quantity, 0);
                const totalCdf = cdfItems?.reduce((acc, item) => acc + item.unitAmount * item.quantity, 0);
                return (
                    <span> {totalUsd}$, {totalCdf}FC </span>
                )
            }
        },
        {
            title: '',
            key: 'action',
            render: (record) => (
                <button className="view-detail-btn"><HiOutlineArrowRight className="icon" /></button>
            )
        }
    ]
}