import { Row, Col } from "react-bootstrap";
import Product from "../../Components/Product/Product";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../../Components/Loader/Loader";
import Message from "./../../Components/Message/Message";

const HomePage = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  return (
    <div>
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : isError ? (
        <Message variant="danger">
          {isError.data?.message || isError.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default HomePage;
