import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../../components/Pagination';

const Blogs = () => {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState([]);

  const getArticles = async (page = 1) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/articles?page=${page}`
    );
    console.log(res);
    setArticles(res.data.articles);
  };

  useEffect(() => {
    getArticles();
  }, []);

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

      <section className="section-blogs mt-5">
        {articles.map((article) => (
          <Link to={`/blog/${article.id}`} className="d-block" key={article.id}>
            <div className="d-flex mb-4">
              <div className="flex-shrink-0">
                <img src={article.image} alt="Blog workspace" width="200px" />
              </div>
              <div className="flex-grow-1 ms-3">
                <div className="h-100 d-flex flex-column justify-content-between">
                  <div>
                    <h2 className="fs-4">{article.title}</h2>
                    <p className="mt-2" dangerouslySetInnerHTML={{ __html: article.description }}>
                      {/* {article.description} */}
                    </p>
                  </div>
                  <p className="text-end text-decoration-underline">
                    Read More
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
      <Pagination pagination={pagination} changePage={getArticles}/>
    </main>
  );
};

export default Blogs;
