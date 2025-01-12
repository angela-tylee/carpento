const Pagination = ({ pagination, changePage }) => {
  return (
    <nav aria-label="..." className="mt-4">
      <ul className="pagination fw-bold justify-content-end">
        <li className={`page-item disabled=${!pagination.has_pre}`}>
          <a
            className="page-link"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              changePage(pagination.current_page - 1);
            }}
          >
            &lt;
          </a>
        </li>
        {[...Array(pagination.total_pages)].map((_, index) => (
          <li
            key={index}
            className={`page-item ${
              pagination.current_page === index + 1 ? 'active' : ''
            }`}
            aria-current={
              pagination.current_page === index + 1 ? 'page' : undefined
            }
          >
            <a
              className="page-link"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                changePage(index + 1);
              }}
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li className={`page-item disabled=${!pagination.has_next}`}>
          <a
            className="page-link"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              changePage(pagination.current_page + 1);
            }}
          >
            &gt;
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
