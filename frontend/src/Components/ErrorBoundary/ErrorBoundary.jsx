import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        // Reuses .not-found / .not-found-code / .not-found-message from
        // index.css — shared with NotFoundPage for consistent error styling.
        <div className="not-found" role="alert">
          <h1 className="not-found-code">Oops!</h1>
          <p className="not-found-message">
            Something went wrong. Please try refreshing the page.
          </p>
          {/* Plain anchor: this boundary renders outside the router and a
              full reload also clears the error state. */}
          <a href="/" className="btn btn-primary">
            Go Back Home
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
