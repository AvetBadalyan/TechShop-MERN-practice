import { Suspense } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Loader from "./Components/Loader/Loader";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <main className="py-3">
        <Container>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
