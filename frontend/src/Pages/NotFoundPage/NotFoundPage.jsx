import { Link } from "react-router-dom";
import Meta from "../../Components/meta/Meta";

const NotFoundPage = () => {
  return (
    <>
      <Meta title="Page Not Found | TechShop" />
      <div className="not-found">
        <h1 className="not-found-code">404</h1>
        <p className="not-found-message">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link to="/" className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
