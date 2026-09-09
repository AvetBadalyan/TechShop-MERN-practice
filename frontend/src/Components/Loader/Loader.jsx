import { Spinner } from "react-bootstrap";

/**
 * Full-page centered loading spinner.
 * Wrap with conditional rendering: {isLoading && <Loader />}
 */
const Loader = () => {
  return (
    <div className="loader-container">
      <Spinner
        animation="border"
        role="status"
        aria-label="Loading"
        className="loader-spinner"
      />
    </div>
  );
};

export default Loader;
