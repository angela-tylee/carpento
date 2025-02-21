import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FullPageLoader from '../../components/FullPageLoader';

const Blog = () => {
  const [article, setArticle] = useState({});
  const { id } = useParams();
  const [isLoadingBlog, setIsLoadingBlog] = useState(false);

  const getArticle = async (id) => {
    setIsLoadingBlog(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/article/${id}`
      );
      setArticle(res.data.article);
      setIsLoadingBlog(false);
    } catch (error) {
      setIsLoadingBlog(false);
    }
  };

  useEffect(() => {
    getArticle(id);
  }, [id]);

  if (isLoadingBlog) {
    return (
      <main className="blog container mb-7">
        <FullPageLoader />
      </main>
    );
  }

  return (
    <main className="blog container mb-7">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item mt-1 mt-sm-2">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item mt-1 mt-sm-2">
            <Link to="/blogs">Blog</Link>
          </li>
          <li
            className="breadcrumb-item mt-1 mt-sm-2 active"
            aria-current="page"
          >
            {article.title}
          </li>
        </ol>
      </nav>

      <section className="section-blog">
        <div
          className="blog-hero-img mb-4 mb-sm-5 mb-lg-7"
          style={{ backgroundImage: `url(${article.image})` }}
        ></div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-xl-8">
            <div className="blog-body">
              <h1 className="blog-title fs-1 pb-1 text-capitalize">
                {article.title}
              </h1>
              <time>
                Published:{' '}
                {(() => {
                  const date = new Date(article.create_at);

                  const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  };

                  return date.toLocaleString('en-US', options);
                })()}
              </time>
              <div className="blog-text">
                <p
                  className="mt-4 article-description"
                  dangerouslySetInnerHTML={{ __html: article.description }}
                >
                </p>
                <p
                  className="mt-4 article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                >
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
