import { Button, Table } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

import Loader from "../../../Components/Loader/Loader";
import Message from "../../../Components/Message/Message";
import { useGetOrdersQuery } from "../../../slices/orderApiSlice";
import { getErrorMessage } from "../../../utils/errorUtils";
import Meta from "../../../Components/meta/Meta";

const OrderListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  if (isLoading) return <Loader />;
  if (error)
    return <Message variant="danger">{getErrorMessage(error)}</Message>;

  return (
    <>
      <Meta title="Orders | TechShop Admin" />
      <h1>Orders</h1>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>
                <span className="id-cell">…{order._id.slice(-8)}</span>
              </td>
              <td>{order.user?.name ?? "—"}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>${order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  new Date(order.paidAt).toLocaleDateString()
                ) : (
                  <FaTimes className="text-danger" />
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  new Date(order.deliveredAt).toLocaleDateString()
                ) : (
                  <FaTimes className="text-danger" />
                )}
              </td>
              <td className="text-end">
                <LinkContainer to={`/order/${order._id}`}>
                  <Button variant="light" size="sm">
                    Details
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default OrderListPage;
