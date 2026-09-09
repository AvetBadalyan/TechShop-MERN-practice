import { Card, Col, Row, Table } from "react-bootstrap";
import {
  FaBoxOpen,
  FaDollarSign,
  FaShoppingBag,
  FaUsers,
} from "react-icons/fa";

import Loader from "../../../Components/Loader/Loader";
import Message from "../../../Components/Message/Message";
import { useGetDashboardStatsQuery } from "../../../slices/orderApiSlice";
import { getErrorMessage } from "../../../utils/errorUtils";
import "./DashboardPage.css";

const StatCard = ({ icon, label, value, variant }) => (
  <Card className="dashboard-stat-card h-100">
    <Card.Body className="d-flex align-items-center">
      <div className={`dashboard-stat-icon bg-${variant}`}>{icon}</div>
      <div className="ms-3">
        <div className="dashboard-stat-value">{value}</div>
        <div className="dashboard-stat-label">{label}</div>
      </div>
    </Card.Body>
  </Card>
);

const DashboardPage = () => {
  const { data, isLoading, error } = useGetDashboardStatsQuery();

  if (isLoading) return <Loader />;

  if (error) {
    return <Message variant="danger">{getErrorMessage(error)}</Message>;
  }

  const maxDayTotal = Math.max(...data.salesByDay.map((d) => d.total), 1);

  return (
    <>
      <h1>Dashboard</h1>

      {/* Summary stat cards */}
      <Row className="g-3 mb-4">
        <Col sm={6} lg={3}>
          <StatCard
            icon={<FaDollarSign />}
            label="Total Sales"
            value={`$${data.totalSales.toFixed(2)}`}
            variant="success"
          />
        </Col>
        <Col sm={6} lg={3}>
          <StatCard
            icon={<FaShoppingBag />}
            label="Orders"
            value={data.orderCount}
            variant="primary"
          />
        </Col>
        <Col sm={6} lg={3}>
          <StatCard
            icon={<FaBoxOpen />}
            label="Products"
            value={data.productCount}
            variant="warning"
          />
        </Col>
        <Col sm={6} lg={3}>
          <StatCard
            icon={<FaUsers />}
            label="Customers"
            value={data.userCount}
            variant="info"
          />
        </Col>
      </Row>

      <Row className="g-4">
        {/* Sales over the last 7 days — simple CSS bar chart */}
        <Col lg={7}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Sales — Last 7 Days</Card.Title>
              {data.salesByDay.length === 0 ? (
                <Message>No sales in this period yet.</Message>
              ) : (
                <div className="dashboard-chart">
                  {data.salesByDay.map((day) => (
                    <div key={day._id} className="dashboard-bar-wrap">
                      <div
                        className="dashboard-bar"
                        style={{
                          height: `${(day.total / maxDayTotal) * 100}%`,
                        }}
                        title={`$${day.total.toFixed(2)}`}
                      />
                      <div className="dashboard-bar-label">
                        {day._id.slice(5)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Top selling products */}
        <Col lg={5}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Top Selling Products</Card.Title>
              {data.topProducts.length === 0 ? (
                <Message>No sales yet.</Message>
              ) : (
                <Table striped hover responsive size="sm" className="mb-0">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th className="text-end">Units Sold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topProducts.map((p) => (
                      <tr key={p._id}>
                        <td>{p._id}</td>
                        <td className="text-end">{p.unitsSold}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;
