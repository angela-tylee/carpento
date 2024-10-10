import { Link } from 'react-router-dom';

const Products = () => {
  return (
    <main className="container mb-6">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Products</li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-3">
          <div className="list-group pe-3">
            <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
              Living Room
            </a>
            <a href="#" className="list-group-item list-group-item-action">Bedroom</a>
            <a href="#" className="list-group-item list-group-item-action">Dining</a>
            <a href="#" className="list-group-item list-group-item-action">Workspace</a>
            <a href="#" className="list-group-item list-group-item-action">Decoration</a>
            <a className="list-group-item list-group-item-action disabled" aria-disabled="true">Others</a>
          </div>
        </div>
        <div className="col-9">
          <h1 className="fs-2 mb-3">Living Room</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vitae voluptatum consequuntur expedita in minima.</p>
          <div>
            <div className="mt-4 mb-2 d-flex justify-content-between align-items-center">
              <p><span>41</span> items</p>
              <div className="d-flex align-items-center">
                <p className="me-1">Sort by:</p>
                <div className="dropdown">
                  <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Select
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Name (A-Z)</a></li>
                    <li><a className="dropdown-item" href="#">Name (Z-A)</a></li>
                    <li><a className="dropdown-item" href="#">Price (high-low)</a></li>
                    <li><a className="dropdown-item" href="#">Price (low-high)</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="col-3">
                  <div className="card w-100 border-0">
                    <img src="../assets/images/products/living-room/cabinet-3.jpeg" className="card-img-top" alt="..." />
                    <div className="card-body p-0 mt-2">
                      <h5 className="card-title fs-6 fw-bold">Card title</h5>
                      <div className="card-text">
                        <span className="text-primary">$1,500</span>
                        <del>$2,000</del>
                      </div>
                      <div className="d-flex w-100 mt-2">
                        <input type="number" className="form-control w-25 text-center" />
                        <button type="button" className="btn btn-primary text-white ms-1 w-75">Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <nav aria-label="..." className="mt-4">
              <ul className="pagination fw-bold justify-content-end">
                <li className="page-item disabled">
                  <a className="page-link">&lt;</a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item active" aria-current="page">
                  <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">&gt;</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Products;