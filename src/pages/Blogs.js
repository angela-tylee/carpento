import { Routes, Route, Link } from 'react-router-dom';

const Blogs = () => {
  return (
    <main className="container mb-7">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Blog
          </li>
        </ol>
      </nav>

      <section className="section-blogs mt-5">
        {[...Array(3)].map((_, index) => (
          <div className="d-flex mb-4" key={index}>
            <div className="flex-shrink-0">
              <img src="/images/workspace-1.jpeg" alt="Blog workspace" width="200px" />
            </div>
            <div className="flex-grow-1 ms-3">
              <div className="h-100 d-flex flex-column justify-content-between">
                <div>
                  <h2 className="fs-4">Blog Title</h2>
                  <p className="mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit quod alias minima dolorem aspernatur. Non officiis repellendus facilis odio, et blanditiis voluptas corporis ex doloribus, voluptatibus eligendi incidunt maiores labore possimus libero exercitationem! Expedita doloremque esse, quam distinctio iusto quis delectus quo reprehenderit repellendus placeat. Dicta nesciunt eaque omnis voluptas?
                  </p>
                </div>
                <a href="./blog.html" className="text-end text-decoration-underline">
                  <Link to='blog'>
                    Read More
                  </Link>
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Blogs;