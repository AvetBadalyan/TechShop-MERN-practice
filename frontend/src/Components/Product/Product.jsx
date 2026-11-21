import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { handleImageError } from "../../utils/imageUtils";
import Rating from "../Rating/Rating";
import "./Product.css";

const Product = ({ product }) => {
  const outOfStock = product.countInStock === 0;
  const lowStock = product.countInStock > 0 && product.countInStock <= 5;

  return (
    <Card className="p-3 product-card h-100">
      <Link
        to={`/product/${product._id}`}
        className="product-image-wrap d-block"
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          onError={handleImageError}
          loading="lazy"
        />
        {outOfStock && (
          <span className="product-stock-badge badge-out">Out of Stock</span>
        )}
        {lowStock && (
          <span className="product-stock-badge badge-low">
            Only {product.countInStock} left
          </span>
        )}
      </Link>

      <Card.Body className="d-flex flex-column">
        <div className="product-category">{product.category}</div>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            {product.name}
          </Card.Title>
        </Link>
        <Card.Text as="div" className="mb-3">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <p className="product-price mt-auto">${product.price}</p>
      </Card.Body>
    </Card>
  );
};

export default Product;
