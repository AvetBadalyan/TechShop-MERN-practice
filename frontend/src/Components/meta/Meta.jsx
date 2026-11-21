import { Helmet } from "react-helmet-async";

const Meta = ({
  title = "Welcome To Avet's TechShop",
  description = "Shop the latest electronics, gadgets, and tech accessories. Find smartphones, laptops, gaming gear, and more at competitive prices.",
  keywords = "electronics, buy electronics, tech shop, smartphones, laptops, gaming, headphones, accessories",
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
