import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../slices/productsApiSlice";
import Loader from "../../../Components/Loader/Loader";
import Message from "../../../Components/Message/Message";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Paginate from "../../../Components/Paginate/Paginate";

const ProductListPage = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const handleDeleteModal = (id) => {
    setShowDeleteModal(true);
    setProductIdToDelete(id);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProduct(productIdToDelete);
      refetch();
      setShowDeleteModal(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <LinkContainer to={`/admin/product/create`}>
            <Button className="my-3">
              <FaPlus /> Create Product
            </Button>
          </LinkContainer>
        </Col>
      </Row>

      {loadingDelete && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleDeleteModal(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />

          {/* Delete Confirmation Modal */}
          <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this product?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="light" onClick={handleDeleteCancel}>
                Cancel
              </Button>
              <Button
                variant="danger"
                className="btn btn-danger"
                onClick={handleDeleteConfirm}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default ProductListPage;
