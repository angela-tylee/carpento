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
          className="faq-hero-img mb-7"
          style={{ backgroundImage: 'url(/images/banner-8.jpeg)' }}
        ></div>
        <div className="row justify-content-center">
          <div className="col-8">
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
                          <li className="mt-1">Wood furniture: Wipe with a soft, damp cloth and avoid using harsh chemicals.</li>
                          <li className="mt-1">Upholstered items: Vacuum regularly and use mild cleaners for spot cleaning.</li>
                          <li className="mt-1">Avoid direct sunlight and excessive moisture to ensure longevity.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Additional accordion items follow the same structure */}

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
                        Yes, we offer custom furniture designs! Our team can collaborate with you to create a unique piece that fits your space and style. Contact our design team at{' '}
                        <a href="mailto:support@carpento.com" className="text-info">support@carpento.com</a> to get started on your custom project.
                      </div>
                    </div>
                  </div>

                  {/* Add other accordion items here following the same pattern */}
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
