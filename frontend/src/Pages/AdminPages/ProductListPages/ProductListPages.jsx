import { useState } from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";

import Loader from "../../../Components/Loader/Loader";
import Message from "../../../Components/Message/Message";
import Paginate from "../../../Components/Paginate/Paginate";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../slices/productsApiSlice";
import { getErrorMessage, showErrorToast } from "../../../utils/errorUtils";
import Meta from "../../../Components/meta/Meta";

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
      await deleteProduct(productIdToDelete).unwrap();
      refetch();
      setShowDeleteModal(false);
    } catch (err) {
      showErrorToast(err);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Row className="align-items-center mb-2">
        <Col>
          <Meta title="Products | TechShop Admin" />
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <LinkContainer to="/admin/product/create">
            <Button>
              <FaPlus /> Create Product
            </Button>
          </LinkContainer>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{getErrorMessage(error)}</Message>
      ) : (
        <>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <span className="id-cell">…{product._id.slice(-8)}</span>
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td className="text-end">
                    <div className="d-flex justify-content-end gap-2">
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" size="sm">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteModal(product._id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />

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
              <Button variant="danger" onClick={handleDeleteConfirm}>
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
