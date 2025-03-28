import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../../components/Pagination';
import FullPageLoader from '../../components/FullPageLoader';

const Blogs = () => {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);

  const getArticles = async (page = 1) => {
    setIsLoadingBlogs(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/articles?page=${page}`
      );
      setArticles(res.data.articles);
      setPagination(res.data.pagination);
      setIsLoadingBlogs(false);
    } catch (error) {
      setIsLoadingBlogs(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  if (isLoadingBlogs) {
    return (
      <main className="container mb-7">
        <FullPageLoader />
      </main>
    );
  }

  return (
    <main className="container mb-7">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Blog
          </li>
        </ol>
      </nav>

      <section className="section-blogs mt-3 mt-sm-5">
        {articles.map((article) => (
          <Link to={`/blog/${article.id}`} className="d-block" key={article.id}>
            <div className="row flex-column flex-md-row g-2 g-lg-4 mb-4">
              <div className="col-md-4">
                <img
                  src={article.image}
                  alt={article.title}
                  width="100%"
                  height="200px"
                  className="object-fit-cover"
                />
              </div>
              <div className="col-md-8">
                <div className="h-100 d-flex flex-column justify-content-between">
                  <div>
                    <h2 className="fs-4">{article.title}</h2>
                    <p
                      className="article-description mt-1 mt-sm-2 overflow-y-hidden"
                      dangerouslySetInnerHTML={{
                        __html: article.description,
                      }}
                    >
                    </p>
                  </div>
                  <p className="text-end text-decoration-underline mt-2">
                    Read More
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
      <Pagination pagination={pagination} changePage={getArticles} />
    </main>
  );
};

export default Blogs;
