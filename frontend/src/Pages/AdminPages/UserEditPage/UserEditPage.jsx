import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import FormContainer from "../../../Components/FormContainer/FormContainer";
import Loader from "../../../Components/Loader/Loader";
import Message from "../../../Components/Message/Message";
import Meta from "../../../Components/meta/Meta";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../../slices/usersApiSlice";
import { getErrorMessage, showErrorToast } from "../../../utils/errorUtils";
import { userEditSchema } from "../../../validators/authValidators";

const UserEditPage = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading, error } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userEditSchema) });

  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email, isAdmin: user.isAdmin });
    }
  }, [user, reset]);

  const submitHandler = async (data) => {
    try {
      await updateUser({ userId, ...data }).unwrap();
      toast.success("User updated successfully");
      navigate("/admin/userlist");
    } catch (err) {
      showErrorToast(err);
    }
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        <Meta title="Edit User | TechShop Admin" />
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{getErrorMessage(error)}</Message>
        ) : (
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

            <Form.Group className="my-2" controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                isInvalid={!!errors.isAdmin}
                {...register("isAdmin")}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditPage;
