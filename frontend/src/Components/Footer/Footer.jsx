import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <Container>
        <Row>
          <Col className="text-center py-3">
            <span className="footer-brand">
              Avet&apos;s <span className="brand-accent">TechShop</span>
            </span>
            <span className="footer-copy"> &copy; {currentYear}</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
