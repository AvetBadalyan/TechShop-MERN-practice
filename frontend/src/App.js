import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import HomePage from "./Pages/HomePage/HomePage";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Welcome to Avet's TechShop</h1>
          <HomePage />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
