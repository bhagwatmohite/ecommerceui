/* eslint-disable react/no-unescaped-entities */
import { Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container>
        <div className="text-center">
          <h2 className="display-1">404</h2>
          <h3 className="display-4">UH OH! You're lost.</h3>
          <p className="lead">
            The page you are looking for does not exist. How you got here is a mystery. But you can click the button below to go back to the homepage.
          </p>

          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Button variant="primary" size="lg">Go Back to Home</Button>
          </NavLink>
        </div>
      </Container>
    </div>
  );
};

export default ErrorPage;
