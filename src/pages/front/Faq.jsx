import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

const FAQ = () => {
  return (
    <main className="container mb-7">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">FAQ</li>
        </ol>
      </nav>
      <section className="section-faq">
        <div
          className="faq-hero-img mb-4 mb-sm-5 mb-lg-7"
          style={{ backgroundImage: 'url(/images/banner-8.jpeg)' }}
        ></div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-xl-8">
            <div className="faq-body">
              <h1 className="faq-title fs-2 pb-1 text-center">
                Frequently Asked Questions
              </h1>
              <p className="mt-3">
                Welcome to Carpento's FAQ page! We’ve compiled a list of our most commonly
                asked questions to help you get quick and accurate answers. If you don’t
                find what you’re looking for, feel free to reach out to our support team!
              </p>
              <div className="faq-text mt-4">
                <div className="accordion mt-4" id="accordionPanelsStayOpenExample">

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button fs-5 fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        1. What makes Carpento furniture unique?
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseOne"
                      className="accordion-collapse collapse show"
                    >
                      <div className="accordion-body">
                        At Carpento, each piece of furniture is handcrafted by our skilled artisans
                        using high-quality materials. Our designs combine modern aesthetics with a
                        warm, inviting feel, and we take pride in our environmentally friendly
                        practices. We strive to enhance the quality of life through sustainable,
                        long-lasting products.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fs-5 fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        2. Where is your furniture made?
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseTwo"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        All Carpento furniture is crafted locally in our workshop. Our small team
                        of passionate carpenters and designers works together to bring you
                        beautiful and durable pieces. We ensure every item meets our high
                        standards before it reaches your home.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fs-5 fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseThree"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseThree"
                      >
                        3. What materials do you use?
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseThree"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        We prioritize using sustainable, high-quality materials such as solid wood,
                        eco-friendly fabrics, and non-toxic finishes. We are committed to
                        environmentally responsible sourcing to minimize our carbon footprint
                        while providing you with products that last.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fs-5 fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseFour"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseFour"
                      >
                        4. How can I take care of my Carpento furniture?
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseFour"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        <p>Each piece of furniture comes with specific care instructions, but as a general rule:</p>
                        <ul className="ps-3">
                          <li className="mt-1">
                            <b>Wood furniture</b>: Wipe with a soft, damp cloth and avoid using harsh chemicals. For the best results and to maintain the natural finish, we recommend using our <Link to="/product/-OE_DuR3Zbl38dOyqSt_"><span className="text-decoration-underline text-info">Natural Wood Set</span></Link>, available in our shop.
                          </li>
                          <li className="mt-1"><b>Upholstered items</b>: Vacuum regularly and use mild cleaners for spot cleaning.</li>
                          <li className="mt-1">Avoid direct sunlight and excessive moisture to ensure longevity.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fs-5 fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseFive"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseFive"
                      >
                        5. Do you offer custom furniture options?
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseFive"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        Yes, we offer custom furniture designs! Our team can collaborate with you to create a unique piece that fits your space and style. Contact our design team at 
                        <a href="mailto:support@carpento.com" className="text-info">support@carpento.com</a> to get started on your custom project.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fs-5 fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseSix"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseSix"
                      >
                        6. How long does delivery take?
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseSix"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        <p>Delivery times vary depending on your location and whether the item is in stock or made-to-order:</p>
                        <ul className="ps-3">
                          <li className="mt-1"><b>In-stock items:</b> 24 hours.</li>
                          <li className="mt-1"><b>Custom or made-to-order items:</b> 4-6 weeks.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fs-5 fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseSeven"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseSeven"
                      >
                        7. Do you offer international shipping?
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseSeven"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        Currently, we offer shipping within Taiwan. We are working on expanding our shipping options. Please stay tuned for future updates.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fs-5 fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseEight"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseEight"
                      >
                        8. What is your return policy?
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseEight"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        We want you to love your Carpento furniture! If for any reason you’re not satisfied, we offer a <strong>30-day return policy</strong> on all non-custom items. Items must be in their original condition. Custom furniture is non-refundable due to its personalized nature.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fs-5 fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseNine"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseNine"
                      >
                        9. Do you have a showroom I can visit?
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseNine"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        Yes, you can visit our showroom at <strong>No. 123, Xinyi Road, Da’an District, Taipei, Taiwan</strong>. We are open Monday to Saturday from 10 AM to 6 PM. Please stop by to see our furniture in person and speak with our team about any questions or custom requests.
                        <img src="/images/showroom-1.jpeg" alt="showroom" className="w-100 mt-2" />
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fs-5 fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTen"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTen"
                      >
                        10. How do I contact customer service?
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseTen"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        For any additional questions, you can reach our customer service team by email at <a href="mailto:support@carpento.com" className="text-info">support@carpento.com</a>. We’re available <strong>Monday to Friday, 9 AM to 5 PM</strong>, and will respond within 24 hours.
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default FAQ;
