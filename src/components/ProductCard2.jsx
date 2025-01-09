import { NavLink } from 'react-router-dom';

const ProductCard2 = ({ product, hasFooter, addToCart }) => {
  return (
    <div className="card product-card-2 w-100 border-0 d-flex flex-column h-100 justify-content-between">
      <NavLink
        to={`/product/${product.id}`}
        className="card-header px-0 border-0"
        style={{
          backgroundImage: `url(${product.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          // height: '240px',
        }}
      >
        <span
          className={`badge ${
            product.tag === 'sale' || product.tag === 'hot'
              ? 'bg-danger'
              : product.tag === 'new'
              ? 'bg-warning'
              : ''
          }`}
        >
          {product.tag}
        </span>
      </NavLink>
      <NavLink
        to={`/product/${product.id}`}
        className="card-body p-0 mt-2 flex-grow-1"
      >
        <div className="d-flex flex-column h-100 justify-content-between">
          <h5 className="card-title fs-6 fw-bold">{product.title}</h5>
          <div className="card-text">
            <span className="text-primary me-1">
              ${product.price.toLocaleString()}
            </span>
            <del>${product.origin_price.toLocaleString()}</del>
          </div>
        </div>
      </NavLink>
      <div className={`card-footer w-100 mt-2 bg-transparent border-0 p-0 ${hasFooter ? 'd-flex' : 'd-none'}`}>
        {/* <input
            type="text"
            className="form-control w-25 me-1 text-center"
            value="1"
            readOnly
          /> */}
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={() => addToCart(product.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard2;