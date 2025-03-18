import { Link } from 'react-router';

const ProductDescriptionCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="card product-card w-100 border-0 h-100 d-flex flex-column"
    >
      <div
        className="card-header px-0 border-0"
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
      </div>
      <div className="card-body p-0 mt-3 flex-grow-0 flex-sm-grow-1">
        <div className="d-flex flex-column h-100 justify-content-sm-between">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text overflow-hidden">
            {product.description}
          </p>
        </div>
      </div>
      <div className="card-footer bg-transparent p-0 border-0">
        <div className="text-decoration-underline mt-2 mt-sm-1">Shop Now</div>
      </div>
    </Link>
  );
};

export default ProductDescriptionCard;
