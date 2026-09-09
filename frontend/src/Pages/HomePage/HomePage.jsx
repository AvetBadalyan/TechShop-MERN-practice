import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Message from "../../Components/Message/Message";
import Paginate from "../../Components/Paginate/Paginate";
import Product from "../../Components/Product/Product";
import ProductCardSkeleton from "../../Components/ProductCardSkeleton/ProductCardSkeleton";
import ProductCarousel from "../../Components/ProductCarousel/ProductCarousel";
import ProductFilters from "../../Components/ProductFilters/ProductFilters";
import Meta from "../../Components/meta/Meta";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { getErrorMessage } from "../../utils/errorUtils";

const HomePage = () => {
  const { pageNumber, keyword } = useParams();

  // Filter/sort state lives here and is passed to the products query.
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
    category,
    sortBy,
  });

  return (
    <div>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
      )}

      <Meta />
      <h1>{keyword ? `Results for "${keyword}"` : "Latest Products"}</h1>

      <ProductFilters
        category={category}
        sortBy={sortBy}
        onCategoryChange={setCategory}
        onSortChange={setSortBy}
      />

      {isLoading ? (
        <Row>
          {[...Array(8)].map((_, i) => (
            <Col key={i} sm={12} md={6} lg={4} xl={3}>
              <ProductCardSkeleton />
            </Col>
          ))}
        </Row>
      ) : error ? (
        <Message variant="danger">{getErrorMessage(error)}</Message>
      ) : data.products.length === 0 ? (
        <Message>No products match your filters.</Message>
      ) : (
        <>
          <Row className="g-4">
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
