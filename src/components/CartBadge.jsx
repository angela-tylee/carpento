import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartBadge = ({ size }) => {
  const { cart } = useContext(CartContext);
  console.log(cart);

  return (
    <div className="card-badge position-relative">
      <i className={`bi bi-bag ${size}`}></i>
      <span
        className={`position-absolute start-100 translate-middle badge rounded-pill bg-danger ${cart?.carts?.length === 0 ? 'd-none' : ''}`}
        style={{
          padding: '3px 3px 3px 5px',
          fontSize: '10px',
          top: '10%',
        }}
      >
        {cart.carts?.reduce((total, cartItem) => total + cartItem.qty, 0)}
        <span className="visually-hidden">New alerts</span>
      </span>
    </div>
  );
};

export default CartBadge;
