import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  const paginationItems = [];

  for (let i = 1; i <= pages; i++) {
    paginationItems.push(
      <LinkContainer
        key={i}
        to={
          !isAdmin
            ? keyword
              ? `/search/${keyword}/page/${i}`
              : `/page/${i}`
            : `/admin/productlist/${i}`
        }
      >
        <Pagination.Item active={i === page}>{i}</Pagination.Item>
      </LinkContainer>
    );
  }

  return (
    pages > 1 && (
      <Pagination>
        <Pagination>{paginationItems}</Pagination>
      </Pagination>
    )
  );
};

export default Paginate;
