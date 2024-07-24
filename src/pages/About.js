import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About ShopWhiz"}>
      <div className="row about-us">
        <div className="col-md-6">
          <img
            src="/images/about.jpeg"
            alt="about-us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Welcome to ShopWhiz, your number one source for all things shopping.
            We're dedicated to providing you the best of products, with a focus
            on dependability, customer service, and uniqueness.
          </p>
          <p className="text-justify mt-2">
            Founded in 2024, ShopWhiz has come a long way from its beginnings.
            When we first started out, our passion for providing the best
            products drove us to start our own business.
          </p>
          <p className="text-justify mt-2">
            We hope you enjoy our products as much as we enjoy offering them to
            you. If you have any questions or comments, please don't hesitate
            to contact us.
          </p>
          <p className="text-justify mt-2">
            Sincerely, <br />
            The ShopWhiz Team
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
