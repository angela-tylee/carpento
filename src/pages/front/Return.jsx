import { Link } from 'react-router-dom';

const Return = () => {
  return (
    <main className="container mb-7">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Return</li>
        </ol>
      </nav>
      <section className="section-return">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-xl-8">
            <div className="return-body">
              <h1 className="return-title fs-2 pb-1 text-center">Return</h1>
              <div className="return-text">
                <p className="mt-4">
                  At Carpento, your satisfaction is our priority. We take pride in handcrafting high-quality furniture that enhances your home, but we understand that sometimes things don’t work out. If you’re not completely happy with your purchase, we’re here to help.
                </p>
                <h2 className="fs-4 mt-5">How to Return an Item</h2>
                <p className="mt-4">
                  If you would like to return a non-custom item, simply follow these steps:
                </p>
                <ol className="mt-2">
                  <li className="mt-1">
                    <strong>Contact Us</strong>: Email our customer service team at <a href="mailto:support@carpento.com" className="text-decoration-underline text-info">support@carpento.com</a> within 30 days of receiving your order. Please provide your order number and the reason for your return.
                  </li>
                  <li className="mt-1">
                    <strong>Prepare the Item</strong>: Ensure the item is in its original, undamaged condition and packaging. We can only accept returns that are in like-new condition.
                  </li>
                  <li className="mt-1">
                    <strong>Ship the Item Back</strong>: Our customer service team will provide instructions on how to return the item. Return shipping costs are the responsibility of the customer unless the item is defective or damaged upon arrival.
                  </li>
                  <li className="mt-1">
                    <strong>Receive a Refund</strong>: Once we receive and inspect the returned item, we’ll process your refund. Refunds will be issued to the original form of payment within 7-10 business days.
                  </li>
                </ol>
                <img src="./images/return-flowchart-light.svg" alt="return-flowchart" width="100%" />
                <h2 className="fs-4 mt-5">Non-Refundable Items</h2>
                <ul className="mt-2 ps-4">
                  <li className="mt-1">
                    <strong>Custom Furniture</strong>: Due to the personalized nature of custom furniture, we cannot accept returns or exchanges on these pieces.
                  </li>
                  <li className="mt-1">
                    <strong>Damaged or Altered Items</strong>: Items that have been used, damaged, or altered from their original condition are not eligible for returns.
                  </li>
                </ul>
                <h2 className="fs-4 mt-5">Return Shipping</h2>
                <p className="mt-1">
                  Return shipping fees are non-refundable, unless the return is due to a defect or an error on our part.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Return;
