import  { useContext, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import { OrdersContext } from '../context/StateContext';
import api from '../utils/axiosInstance';
import { OrderGetAllDto } from '../types/OrderTypes';

function OrdersPage() {
    const { orders, setOrders } = useContext(OrdersContext);

    useEffect(() => {

        const fetchOrders = async () => {
            try {
                const response = await api.post<OrderGetAllDto[]>('/Orders/GetAll',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                setOrders(response.data);
            } catch (error) {
                console.log('Error fetching orders:', error);
            }
        };

        fetchOrders();

        return;

    }, []);



    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Product Crawl Type</Table.HeaderCell>
                    <Table.HeaderCell>Created On</Table.HeaderCell>
                    <Table.HeaderCell>Modified On</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {orders.map((order, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>{order.id}</Table.Cell>
                        <Table.Cell>{order.productCrawlType}</Table.Cell>
                        <Table.Cell>{order.createdOn}</Table.Cell>
                        <Table.Cell>{order.modifiedOn}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

export default OrdersPage;

