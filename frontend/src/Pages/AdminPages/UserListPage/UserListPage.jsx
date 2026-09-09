import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

import Loader from "../../../Components/Loader/Loader";
import Message from "../../../Components/Message/Message";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../slices/usersApiSlice";
import { getErrorMessage, showErrorToast } from "../../../utils/errorUtils";

const UserListPage = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const handleDeleteModal = (id) => {
    setShowDeleteModal(true);
    setUserIdToDelete(id);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(userIdToDelete).unwrap();
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
      <h1>Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{getErrorMessage(error)}</Message>
      ) : (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Admin</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <span className="id-cell">…{user._id.slice(-8)}</span>
                </td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className="text-center">
                  {user.isAdmin ? (
                    <FaCheck className="text-success" />
                  ) : (
                    <FaTimes className="text-danger" />
                  )}
                </td>
                <td className="text-end">
                  {!user.isAdmin && (
                    <div className="d-flex justify-content-end gap-2">
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant="light" size="sm">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteModal(user._id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
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
  );
};

export default UserListPage;
