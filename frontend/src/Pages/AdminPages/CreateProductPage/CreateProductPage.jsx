import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import FormContainer from "../../../Components/FormContainer/FormContainer";
import Loader from "../../../Components/Loader/Loader";
import Meta from "../../../Components/meta/Meta";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../../slices/productsApiSlice.js";
import { showErrorToast } from "../../../utils/errorUtils";
import { productSchema } from "../../../validators/productValidators";

const CreateProductPage = () => {
  const navigate = useNavigate();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      image: "",
      brand: "",
      category: "",
      countInStock: "",
      description: "",
    },
  });

  const submitHandler = async (data) => {
    try {
      await createProduct(data).unwrap();
      toast.success("Product created successfully");
      navigate("/admin/productlist");
    } catch (err) {
      showErrorToast(err);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message, { toastId: "image-uploaded" });
      // Update the image field value inside RHF
      setValue("image", res.image, { shouldValidate: true });
    } catch (err) {
      showErrorToast(err);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Product</h1>
        <Meta title="Create Product | TechShop Admin" />
        {loadingCreate && <Loader />}
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

          <Form.Group className="my-2" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Enter price"
              isInvalid={!!errors.price}
              {...register("price")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="my-2" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              isInvalid={!!errors.image}
              {...register("image")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.image?.message}
            </Form.Control.Feedback>
            <Form.Control
              type="file"
              onChange={uploadFileHandler}
              className="mt-2"
            />
            {loadingUpload && <Loader />}
            {/* Show the uploaded image URL as a read-only hint */}
            {watch("image") && (
              <Form.Text className="text-muted">{watch("image")}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="my-2" controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              isInvalid={!!errors.brand}
              {...register("brand")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.brand?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="my-2" controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter count in stock"
              isInvalid={!!errors.countInStock}
              {...register("countInStock")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.countInStock?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="my-2" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              isInvalid={!!errors.category}
              {...register("category")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.category?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="my-2" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              isInvalid={!!errors.description}
              {...register("description")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Create
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CreateProductPage;
