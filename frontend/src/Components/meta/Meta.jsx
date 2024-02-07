import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To Avet's TechShop",
  description: "Here you find best electronics for you and your family",
  keywords: "electronics, buy electronics, best electronics",
};

export default Meta;
