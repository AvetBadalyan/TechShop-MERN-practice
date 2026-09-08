import { Badge, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { handleImageError } from "../../utils/imageUtils";
import Rating from "../Rating/Rating";
import "./Product.css";

const Product = ({ product }) => {
  const outOfStock = product.countInStock === 0;
  const lowStock = product.countInStock > 0 && product.countInStock <= 5;

  return (
    <Card className="my-3 p-3 rounded product-card h-100">
      <Link to={`/product/${product._id}`} className="position-relative">
        <Card.Img
          src={product.image}
          alt={product.name}
          variant="top"
          className="product-image"
          onError={handleImageError}
        />
        {outOfStock && (
          <Badge bg="secondary" className="product-stock-badge">
            Out of Stock
          </Badge>
        )}
        {lowStock && (
          <Badge bg="danger" className="product-stock-badge">
            Only {product.countInStock} left
          </Badge>
        )}
      </Link>

      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <div className="text-muted small mb-2">{product.category}</div>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3" className="mt-auto mb-0">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
