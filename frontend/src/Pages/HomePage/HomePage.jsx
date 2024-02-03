import { Row, Col } from "react-bootstrap";
import Product from "../../Components/Product/Product";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

const HomePage = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  return (
    <div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <div>{isError.data?.message || isError.error}</div>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
      <h1>Latest Products</h1>
    </div>
  );
};

export default HomePage;
