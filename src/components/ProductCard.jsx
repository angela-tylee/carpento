import { Link } from 'react-router-dom';

const ProductCard = ({ product, colNum }) => {
  return (
    // <div className={`col-${12 / colNum}`} key={product.id}>
      <div
        className="card product-card w-100 border-0 h-100 d-flex flex-column"
        style={{ width: '18rem' }}
      >
        {/* <img
            src={product.imageUrl}
            className="card-img-top"
            alt="..."
          /> */}
        <div
          className="card-header px-0 border-0"
          style={{
            backgroundImage: `url(${product.imagesUrl[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            // height: '300px',
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
        <div className="card-body p-0 mt-3 flex-grow-1">
          <div className="d-flex flex-column h-100 justify-content-between">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text overflow-hidden" style={{ height: '50px' }}>
              {product.description}
            </p>
          </div>
        </div>
        <div className="card-footer bg-transparent p-0 border-0">
          <Link
            to={`/product/${product.id}`}
            className="text-decoration-underline mt-1"
          >
            Shop Now
          </Link>
        </div>
      </div>
    // </div>
  );
};

export default ProductCard;
