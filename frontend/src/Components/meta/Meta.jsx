import { Helmet } from "react-helmet-async";

const Meta = ({
  title = "Welcome To Avet's TechShop",
  description = "Here you find best electronics for you and your family",
  keywords = "electronics, buy electronics, best electronics",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default Meta;
