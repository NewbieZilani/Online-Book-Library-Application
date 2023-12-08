import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const footerStyle = {
    width: "100%",
    backgroundColor: "#343a40",
    color: "white",
    padding: "20px",
  };

  return (
    <footer style={footerStyle}>
      <Container>
        <Row>
          <Col md={4}>
            <h4>Contact Information</h4>
            <p>Dhaka, Bangladesh</p>
            <p>example@gmail.com</p>
            <p>544464564</p>
          </Col>
          <Col md={4}>
            <h4>Social Media</h4>
            <ul className="list-unstyled">
              <li>
                <a href="https://www.facebook.com">
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com">
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com">
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>{/* Your content for the third column goes here */}</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
