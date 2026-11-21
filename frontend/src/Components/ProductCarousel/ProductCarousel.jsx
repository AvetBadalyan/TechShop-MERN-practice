import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../../slices/productsApiSlice";
import { getErrorMessage } from "../../utils/errorUtils";
import { handleImageError } from "../../utils/imageUtils";
import Message from "../Message/Message";
import "./ProductCarousel.css";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return null;
  if (error)
    return <Message variant="danger">{getErrorMessage(error)}</Message>;

  return (
    <section className="hero-carousel mb-5" aria-label="Featured products">
      <Carousel
        pause="hover"
        interval={4500}
        fade
        indicators={true}
        controls={true}
        prevLabel="Previous product"
        nextLabel="Next product"
      >
        {products.map((product, index) => (
          <Carousel.Item key={product._id}>
            <Link
              to={`/product/${product._id}`}
              className="hero-slide"
              aria-label={`View ${product.name} - $${product.price}`}
            >
              <div className="hero-content">
                <span className="hero-eyebrow">Featured · Top Rated</span>
                <h2 className="hero-title">{product.name}</h2>
                <span
                  className="hero-price"
                  aria-label={`Price: $${product.price}`}
                >
                  ${product.price}
                </span>
                <span className="hero-cta" aria-hidden="true">
                  Shop now &rarr;
                </span>
              </div>
              <div className="hero-image-wrap">
                <img
                  className="hero-image"
                  src={product.image}
                  alt=""
                  aria-hidden="true"
                  onError={handleImageError}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default ProductCarousel;
