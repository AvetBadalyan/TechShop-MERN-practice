import { Alert } from "react-bootstrap";

// Default parameter instead of defaultProps, which is deprecated in React 19.
const Message = ({ variant = "info", children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
