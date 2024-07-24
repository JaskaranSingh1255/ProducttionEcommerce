import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy ShopWhiz"}>
      <div className="row policy-page">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="privacy policy"
            style={{ width: "100%",borderRadius: "10px",marginTop:150,marginLeft:10, // Add border radius for rounded corners
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="mt-4">Privacy Policy</h2>
          <p className="text-justify mt-2">
            At ShopWhiz, we value your privacy and are committed to protecting
            your personal information. This Privacy Policy outlines the types of
            information we collect, how we use it, and the measures we take to
            safeguard it.
          </p>
          <h4>Information We Collect</h4>
          <p className="text-justify">
            We collect information that you provide to us directly, such as when
            you create an account, make a purchase, or contact our customer
            service. This may include your name, email address, phone number,
            and payment information.
          </p>
          <h4>How We Use Your Information</h4>
          <p className="text-justify">
            We use the information we collect to process your orders, improve
            our services, and communicate with you. We may also use your
            information to send you promotional materials and updates about our
            products and services.
          </p>
          <h4>Sharing Your Information</h4>
          <p className="text-justify">
            We do not sell or rent your personal information to third parties.
            We may share your information with trusted partners who assist us
            in operating our website, conducting our business, or serving our
            users, so long as those parties agree to keep this information
            confidential.
          </p>
          <h4>Data Security</h4>
          <p className="text-justify">
            We implement a variety of security measures to maintain the safety
            of your personal information. Your personal information is contained
            behind secured networks and is only accessible by a limited number
            of persons who have special access rights to such systems.
          </p>
          <h4>Changes to This Policy</h4>
          <p className="text-justify">
            ShopWhiz reserves the right to update or change our Privacy Policy
            at any time. We will notify you of any changes by posting the new
            Privacy Policy on this page. You are advised to review this Privacy
            Policy periodically for any changes.
          </p>
          <h4>Contact Us</h4>
          <p className="text-justify">
            If you have any questions about this Privacy Policy, please contact
            us at privacy@shopwhiz.com.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
