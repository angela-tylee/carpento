// import React from 'react';

const Warranty = () => {
  return (
    <main className="container mb-7">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item active" aria-current="page">Warranty</li>
        </ol>
      </nav>
      <section className="section-warranty">
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="warranty-body">
              <h1 className="warranty-title fs-2 pb-1 text-center">Warranty</h1>
              <div className="warranty-text">
                <p className="mt-4">
                  At Carpento, we take pride in the craftsmanship and quality of our furniture. Each piece is thoughtfully designed and carefully built to ensure durability and long-lasting performance. We are committed to delivering products that enhance your living spaces and stand the test of time. To support our commitment, we offer the following warranty to give you peace of mind with your purchase.
                </p>
                <h2 className="fs-3 mt-5">1-Year Limited Warranty</h2>
                <p className="mt-4">
                  Carpento provides a 1-year limited warranty from the date of purchase on all furniture products. This warranty covers manufacturing defects in materials and workmanship under normal residential use.
                </p>
                <h3 className="fs-4 mt-5">What Does the Warranty Cover?</h3>
                <p className="mt-4">Our limited warranty applies to the following:</p>
                <ul className="mt-2 ps-4">
                  <li className="mt-1"><strong>Structural defects</strong>: Frame or joinery failure due to manufacturing.</li>
                  <li className="mt-1"><strong>Material defects</strong>: Issues with the wood, fabric, or finishing due to craftsmanship or material flaws.</li>
                  <li className="mt-1"><strong>Hardware</strong>: Defects in drawer slides, hinges, or other mechanical parts.</li>
                </ul>
                <h3 className="fs-4 mt-5">What Is Not Covered?</h3>
                <p className="mt-4">Our warranty does not cover:</p>
                <ul className="mt-2 ps-4">
                  <li className="mt-1"><strong>Normal wear and tear</strong>: Including scratches, stains, or natural fading of materials.</li>
                  <li className="mt-1"><strong>Misuse or abuse</strong>: Damage caused by improper use, accidents, or negligence.</li>
                  <li className="mt-1"><strong>Environmental damage</strong>: Exposure to extreme heat, humidity, or moisture that causes warping or damage to wood and materials.</li>
                  <li className="mt-1"><strong>Unauthorized repairs or modifications</strong>: Any alteration of the product without Carpento's approval.</li>
                  <li className="mt-1"><strong>Commercial use</strong>: The warranty is valid for residential use only and does not cover products used in a commercial setting.</li>
                </ul>
                <h3 className="fs-4 mt-5">Warranty Claim Process</h3>
                <p className="mt-4">If you believe your product has a defect covered under this warranty, please follow these steps:</p>
                <ol className="mt-2">
                  <li className="mt-1"><strong>Contact Customer Service</strong>: Email us at <a href="mailto:support@carpento.com" className="text-decoration-underline text-info">support@carpento.com</a> with your order number, a detailed description of the issue, and any relevant photos.</li>
                  <li className="mt-1"><strong>Assessment</strong>: Our team will review your claim and may request further information or schedule an inspection to assess the damage.</li>
                  <li className="mt-1"><strong>Resolution</strong>: If the issue is covered under the warranty, we will either repair or replace the defective item at no charge. If the exact model is no longer available, we will offer a similar replacement.</li>
                </ol>
                <h3 className="fs-4 mt-5">Limitation</h3>
                <p className="mt-4">
                  The 1-year limited warranty is non-transferable and applies only to the original purchaser with valid proof of purchase. Carpento reserves the right to determine if the warranty claim is valid based on the terms stated.
                </p>
                <h3 className="fs-4 mt-5">Care and Maintenance</h3>
                <p className="mt-4">To ensure the longevity of your Carpento furniture, we recommend following our care and maintenance guidelines:</p>
                <ul className="mt-2 ps-4">
                  <li className="mt-1">Wood: Wipe with a dry or slightly damp cloth. Avoid using harsh chemicals or abrasive cleaners.</li>
                  <li className="mt-1">Upholstery: Vacuum regularly and spot-clean stains with a mild detergent and water.</li>
                  <li className="mt-1">Metal and Hardware: Use a soft cloth to clean and polish. Avoid excess moisture or exposure to corrosive elements.</li>
                </ul>
                <p className="mt-2">
                  By maintaining your furniture properly, you can extend its life and enjoy the beauty and comfort of Carpento products for years to come.
                </p>
                <h2 className="fs-3 mt-5">Contact Us</h2>
                <p className="mt-2">
                  We’re here to help! If you have any questions or need assistance with your warranty claim, please don’t hesitate to reach out to our customer service team at <a href="mailto:support@carpento.com" className="text-decoration-underline text-info">support@carpento.com</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Warranty;
