import { Form, Row, Col } from "react-bootstrap";
import { useGetCategoriesQuery } from "../../slices/productsApiSlice";

const SORT_OPTIONS = [
  { value: "", label: "Sort by" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

// Category + sort controls for the product list. Controlled by the parent,
// which owns the selected values and passes them to the products query.
const ProductFilters = ({
  category,
  sortBy,
  onCategoryChange,
  onSortChange,
}) => {
  const { data: categories = [] } = useGetCategoriesQuery();

  return (
    <Row className="mb-4 g-2">
      <Col xs={6} md={4} lg={3}>
        <Form.Select
          aria-label="Filter by category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col xs={6} md={4} lg={3}>
        <Form.Select
          aria-label="Sort products"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
};

export default ProductFilters;
