import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <main className="container mb-7">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/blogs">Blog</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Blog Title
          </li>
        </ol>
      </nav>

      <section className="section-blog">
        <div
          className="blog-hero-img mb-7"
          style={{ backgroundImage: "url(/images/banner-4.jpeg)" }}
        ></div>
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="blog-body">
              <h1 className="blog-title fs-1 pb-1 text-capitalize">
                What You Need to Know When Picking Wooden Furniture
              </h1>
              <time>Last edited: 2024/09/01</time>
              <div className="blog-text">
                <p className="mt-4">
                  When it comes to choosing wooden furniture, there’s much more to consider than just aesthetics. At Carpento, we believe that understanding the qualities of wood and how they affect your selection can lead to a more satisfying purchase. Here are some key points to keep in mind when picking wooden furniture.
                </p>

                <h2 className="fs-5 mt-5 ps-1 border-start border-5 border-dark">Types of Wood</h2>
                <p className="mt-4">
                  Understanding the different types of wood is essential. Each variety has its own unique properties, appearance, and durability. Here are a few common types of wood used in furniture:
                </p>
                <ul className="ps-4 mt-4">
                  <li className="mt-1">
                    Hardwoods: Such as oak, walnut, and cherry, these woods are known for their strength and durability. They are perfect for items that will see heavy use, like dining tables or chairs.
                  </li>
                  <li className="mt-1">
                    Softwoods: Like pine, cedar, and fir, softwoods are generally lighter and more affordable. While they can be more susceptible to dents and scratches, they are also easier to work with and can be a great choice for casual furniture.
                  </li>
                  <li className="mt-1">
                    Engineered Wood: This includes plywood and MDF, which are made from wood fibers and adhesives. These materials can be more cost-effective and stable but may not have the same longevity as solid wood.
                  </li>
                </ul>

                <h2 className="fs-5 mt-5 ps-1 border-start border-5 border-dark">Grain and Texture</h2>
                <p className="mt-4">
                  The grain of the wood affects not only its appearance but also its texture. A tight, straight grain often indicates strength, while a more open grain can give furniture a rustic look. Pay attention to the finish as well—some woods look beautiful with a natural finish, while others may benefit from stains or paints that enhance their character.
                </p>

                <h2 className="fs-5 mt-5 ps-1 border-start border-5 border-dark">Sustainability</h2>
                <p className="mt-4">
                  At Carpento, we prioritize environmentally friendly practices. Look for furniture made from sustainably sourced wood, which ensures that the materials used are harvested responsibly. Certifications such as FSC (Forest Stewardship Council) can guide you in making eco-conscious choices.
                </p>

                <h2 className="fs-5 mt-5 ps-1 border-start border-5 border-dark">Construction Quality</h2>
                <p className="mt-4">
                  The way a piece of furniture is constructed plays a crucial role in its longevity. Look for solid joints, such as dovetail or mortise and tenon, rather than staples or nails, which can compromise strength. A well-constructed piece of furniture will withstand years of use and remain stable.
                </p>

                <h2 className="fs-5 mt-5 ps-1 border-start border-5 border-dark">Care and Maintenance</h2>
                <p className="mt-4">
                  Wooden furniture requires some level of maintenance to keep it looking its best. Regular dusting and occasional polishing with a lint-free cloth and tung oil can help maintain its luster and protect the wood. It’s also important to avoid placing hot or wet items directly on the surface to prevent damage.
                </p>

                <h2 className="fs-5 mt-5 ps-1 border-start border-5 border-dark">Style and Functionality</h2>
                <p className="mt-4">
                  Consider your personal style and how the furniture will fit into your space. Whether you prefer a modern minimalist look or a more traditional aesthetic, there are wooden furniture options to match your taste. Think about how you will use the piece—functionality is just as important as style.
                </p>

                <h2 className="fs-5 mt-5 ps-1 border-start border-5 border-dark">Budget Considerations</h2>
                <p className="mt-4">
                  Investing in wooden furniture can be a significant purchase, but it’s important to consider both quality and longevity. While it may be tempting to go for the cheapest option, investing in well-crafted pieces will save you money in the long run as they typically last longer and require less replacement.
                </p>

                <h2 className="fs-5 mt-5">Conclusion</h2>
                <p className="mt-4">
                  Choosing wooden furniture is an opportunity to bring warmth and character into your home. At Carpento, we offer a range of handcrafted, high-quality wooden pieces designed to enhance your living space. By understanding the types of wood, construction quality, and maintenance needs, you can make informed decisions that reflect your style and values.
                </p>
                <p className="mt-4">
                  Happy furniture shopping! If you have any questions or need assistance, feel free to reach out to our team. We’re here to help you find the perfect piece for your home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
