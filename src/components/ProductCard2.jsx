import { NavLink } from 'react-router';

const ProductCard2 = ({
  product,
  hasFooter,
  addToCart,
  isLoading: isLoadingItem,
}) => {
  return (
    <div className="card product-card-2 w-100 border-0 d-flex flex-column justify-content-between">
      <NavLink
        to={`/product/${product.id}`}
        className="card-header px-0 border-0 position-relative"
        style={{
          backgroundImage: `url(${product.imagesUrl[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
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
        className="card-body p-0 mt-2"
      >
        <div className="d-flex flex-column h-100 justify-content-between">
          <h5 className="card-title fs-6 fw-bold">{product.title}</h5>
          <div className="card-text d-flex align-items-center">
            <span className="text-primary me-1">
              ${product.price.toLocaleString()}
            </span>
            <del>${product.origin_price.toLocaleString()}</del>
          </div>
        </div>
      </NavLink>
      <div
        className={`card-footer w-100 mt-2 bg-transparent border-0 p-0 ${
          hasFooter ? 'd-flex' : 'd-none'
        }`}
      >
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={() => addToCart(product.id, 1)}
          disabled={isLoadingItem === product.id}
        >
          {isLoadingItem === product.id && (
            <div
              className={`spinner-border spinner-border-sm text-light opacity-50 me-1`}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard2;
