import { Card } from "react-bootstrap";
import "./ProductCardSkeleton.css";

// Placeholder card shown while products load, matching the Product card shape.
const ProductCardSkeleton = () => {
  return (
    <Card className="p-3 h-100 rounded">
      <div className="skeleton skeleton-image" />
      <Card.Body>
        <div className="skeleton skeleton-line skeleton-title" />
        <div className="skeleton skeleton-line skeleton-rating" />
        <div className="skeleton skeleton-line skeleton-price" />
      </Card.Body>
    </Card>
  );
};

export default ProductCardSkeleton;
