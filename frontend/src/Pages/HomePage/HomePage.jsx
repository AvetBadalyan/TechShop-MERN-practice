import { Row, Col } from "react-bootstrap";
import Product from "../../Components/Product/Product";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../../Components/Loader/Loader";
import Message from "./../../Components/Message/Message";
import { useParams } from "react-router-dom";
import Paginate from "../../Components/Paginate/Paginate";

const HomePage = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, isError } = useGetProductsQuery({
    pageNumber,
  });
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
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} />
        </>
      )}
    </div>
  );
};

export default HomePage;
