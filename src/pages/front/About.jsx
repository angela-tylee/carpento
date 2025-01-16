import { Link } from 'react-router-dom';

const About = () => {
  return (
    <main className="container mb-7">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">About</li>
        </ol>
      </nav>

      <section className="section-about">
        <div
          className="about-hero-img mb-4 mb-sm-5 mb-lg-7"
          style={{ backgroundImage: 'url(./images/about-2-xl.jpeg)' }}
        ></div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-xl-8">
            <div className="about-body">
              <h1 className="about-title fs-2 text-center pb-1">About Us</h1>
              <div className="about-text">
                <p className="mt-4">
                  Carpento was founded with a clear vision: to bring high-quality, handcrafted furniture into modern homes while maintaining a strong commitment to sustainability. The idea for our brand emerged in a small workshop located near a lush forest, where the natural surroundings provided both inspiration and a practical setting for our work.
                </p>

                <p className="mt-4">
                  Our founder, an experienced craftsman with a keen eye for design, wanted to create furniture that combined durability and style with environmental responsibility. Starting with just a few pieces, the goal was to produce furniture that not only met high standards of quality but also respected the planet.
                </p>

                <img className="mt-4 w-100" src="./images/about-1.jpeg" alt="about-image-1" />

                <p className="mt-4">
                  As the brand developed, we focused on using eco-friendly materials and sustainable practices to minimize our environmental impact. Each piece of furniture is carefully crafted to offer a blend of modern design and warmth, aiming to improve the quality of life for our customers.
                </p>

                <p className="mt-4">
                  At Carpento, we pride ourselves on our small, close-knit team. Our colleagues are open-minded and enthusiastic, creating a friendly and engaging working environment. We embrace a flat organizational structure, which fosters collaboration and diverse perspectives. This supportive atmosphere encourages creativity and innovation, allowing us to continuously improve and deliver exceptional products.
                </p>

                <p className="mt-4">
                  Today, Carpento is known for its dedication to excellence and sustainability. Our furniture reflects our commitment to quality and the desire to enhance living spaces with products that are both beautiful and environmentally conscious.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;