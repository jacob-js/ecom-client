import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { BsFillHandbagFill } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOrdersApi } from '../apis/orders';
import { ordersColumns } from '../Utils/columns';

function OrdersList() {
    const history = useHistory();
    const { data: user } = useSelector(({ users: { currUser } }) =>currUser);
    const limit = 5;
    const [offset, setoffset] = useState(0);
    const { isLoading, data, isFetching, refetch } = useQuery('orders', () =>getOrdersApi(user.id, limit, offset) );

    useEffect(() => {
        refetch();
        return () => {
            
        };
    }, [offset])
    const onViewOrder = (id) => {
        history.push(`/orders/${id}`);
    }

    return (
        <div className='orders-list'>
            <div className="title"><BsFillHandbagFill className='icon' /> Mes commandes</div>
            {isLoading && <div className="loading">Chargement...</div>}
            {!isLoading && <Table loading={isFetching} dataSource={data?.data?.rows} columns={ordersColumns(onViewOrder)} pagination={{
                pageSize: limit,
                onChange: (page, pageSize) => setoffset(page - 1),
                total: data?.data?.count
            }}
            onRow={(record) => {
                return {
                    onClick: () =>{
                        history.push(`/orders/${record.id}`)
                    }
                }
            }}
            />}
        </div>
    )
}

export default OrdersList
