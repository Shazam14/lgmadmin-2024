import React from "react";
import "../../styles/about.css";
import schoolLogo from "../../assets/images/about_img/schoollogo.png";

const About = () => {
  return (
    <div className="about-us-section">
      <div className="about-card-container">
        <div
          className="about-school-logo-image"
          style={{ backgroundImage: `url(${schoolLogo})` }}
        />
        <div className="about-text-container">
          <h2 className="about-text-header">
            <span className="font-bold">L</span>earning{" "}
            <span className="font-bold">G</span>arden{" "}
            <span className="font-bold">M</span>ontessori
            <span className="font-bold">S</span>chool
          </h2>
          <h3 className="about-us-text">Privacy Policy</h3>
          <p className="terms-text-description">
            At Learning Garden Montessori School, we take your privacy
            seriously. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website.
            <br />
            <br />
            <h2 className="font-bold">Information We Collect</h2>
            We may collect personal information from you when you visit our
            website, such as your name, email address, phone number, and any
            other information you provide voluntarily.
            <br />
            <br />
            <h2 className="font-bold">How We Use Your Information</h2>
            We may use the information we collect from you to:
            <ul>
              <li>Provide, operate, and maintain our website;</li>
              <li>
                Improve, personalize, and expand our website's content and
                services;
              </li>
              <li>
                Communicate with you, including responding to your comments,
                questions, and requests;
              </li>
              <li>
                Send you administrative information, such as updates to our
                policies;
              </li>
              <li>
                Monitor and analyze trends, usage, and activities in connection
                with our website; and
              </li>
              <li>
                Detect, investigate, and prevent fraudulent or unauthorized
                activities.
              </li>
            </ul>
            <br />
            <h2 className="font-bold">Disclosure of Your Information</h2>
            We may disclose your personal information:
            <ul>
              <li>To comply with legal obligations;</li>
              <li>To protect and defend our rights and property;</li>
              <li>
                To prevent or investigate possible wrongdoing in connection with
                the website;
              </li>
              <li>
                To protect the personal safety of users of our website or the
                public;
              </li>
            </ul>
            <br />
            <h2 className="font-bold">Third-Party Links</h2>
            Our website may contain links to third-party websites. These
            third-party websites have their own privacy policies, and we are not
            responsible for their practices. We encourage you to review the
            privacy policies of these third-party websites.
            <br />
            <br />
            <h2 className="font-bold">Data Security</h2>
            We have implemented appropriate security measures to protect the
            confidentiality, integrity, and availability of your personal
            information.
            <br />
            <br />
            <h2 className="font-bold">Children's Privacy</h2>
            Our website is not directed to children under the age of 13, and we
            do not knowingly collect personal information from children under
            13. If you are a parent or guardian and believe that we have
            collected information from your child, please contact us
            immediately.
            <br />
            <br />
            <h2 className="font-bold">Changes to This Privacy Policy</h2>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            <br />
            <br />
            <h2 className="font-bold">Contact Us</h2>
            If you have any questions or concerns about our Privacy Policy,
            please contact us at lgmsmontessori@gmail.com.
          </p>
        </div>
      </div>
    </div>
  );
};
export default About;
