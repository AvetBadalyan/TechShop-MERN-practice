import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../../Components/Loader/Loader";
import Message from "../../Components/Message/Message";
import Meta from "../../Components/meta/Meta";
import { setCredentials } from "../../slices/authSlice";
import { useGetMyOrdersQuery } from "../../slices/orderApiSlice";
import { useProfileMutation } from "../../slices/usersApiSlice";
import { getErrorMessage, showErrorToast } from "../../utils/errorUtils";
import { updateProfileSchema } from "../../validators/authValidators";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  // Populate form once userInfo is available (or if it changes)
  useEffect(() => {
    if (userInfo) {
      reset({
        name: userInfo.name,
        email: userInfo.email,
        password: "",
        confirmPassword: "",
      });
    }
  }, [userInfo, reset]);

  const submitHandler = async (data) => {
    try {
      const res = await updateProfile({
        name: data.name,
        email: data.email,
        // Only send password if the user actually typed one
        ...(data.password ? { password: data.password } : {}),
      }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Profile updated successfully");
      // Clear password fields after a successful update
      reset({
        name: res.name,
        email: res.email,
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      showErrorToast(err);
    }
  };

  return (
    <>
      <Meta title="My Profile | TechShop" />
      <h1>Profile</h1>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          <Form onSubmit={handleSubmit(submitHandler)} noValidate>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                isInvalid={!!errors.name}
                {...register("name")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                isInvalid={!!errors.email}
                {...register("email")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Leave blank to keep current"
                isInvalid={!!errors.password}
                {...register("password")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="my-2" controlId="confirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                isInvalid={!!errors.confirmPassword}
                {...register("confirmPassword")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="mt-3"
              disabled={loadingUpdateProfile}
            >
              Update
            </Button>
            {loadingUpdateProfile && <Loader />}
          </Form>
        </Col>

        <Col md={9}>
          <h2>My Orders</h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{getErrorMessage(error)}</Message>
          ) : orders.length === 0 ? (
            <Message>
              You haven&apos;t placed any orders yet.{" "}
              <Link to="/">Browse products</Link>
            </Message>
          ) : (
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <span className="id-cell">…{order._id.slice(-8)}</span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        new Date(order.paidAt).toLocaleDateString()
                      ) : (
                        <FaTimes className="text-danger" />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        new Date(order.deliveredAt).toLocaleDateString()
                      ) : (
                        <FaTimes className="text-danger" />
                      )}
                    </td>
                    <td className="text-end">
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant="light" size="sm">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
