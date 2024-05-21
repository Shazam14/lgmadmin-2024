import React from "react";
import "../../styles/generic-header.css";
import schoolLogo from "../../assets/images/about_img/schoollogo.png";

const Terms = () => {
  return (
    <div className="generic-section">
      <div className="generic-card-container">
        <div
          className="generic-school-logo-image"
          style={{ backgroundImage: `url(${schoolLogo})` }}
        />
        <div className="generic-text-container">
          <h2 className="generic-text-header">
            <span className="font-bold">L</span>earning{" "}
            <span className="font-bold">G</span>arden{" "}
            <span className="font-bold">M</span>ontessori
            <span className="font-bold">S</span>chool
          </h2>
          <h3 className="generic-textname-text">Terms of Service</h3>
        </div>
        <p className="terms-text-description">
          By accessing this website, you agree to be bound by these Terms of
          Service, all applicable laws, and regulations, and agree that you are
          responsible for compliance with any applicable local laws. If you do
          not agree with any of these terms, you are prohibited from using or
          accessing this site. The materials contained on this website are
          protected by applicable copyright and trademark law.
          <br />
          <br />
          <h3 className="font-bold">Use License</h3>
          <br />
          <br />
          Permission is granted to temporarily download one copy of the
          materials (information or software) on Learning Garden Montessori
          School website for personal, non-commercial transitory viewing only.
          This is the grant of a license, not a transfer of title, and under
          this license, you may not:
          <br />
          <br />
          1. Modify or copy the materials;
          <br />
          2. Use the materials for any commercial purpose or for any public
          display (commercial or non-commercial);
          <br />
          3. Attempt to decompile or reverse engineer any software contained on
          Learning Garden Montessori School website;
          <br />
          4. Remove any copyright or other proprietary notations from the
          materials; or
          <br />
          5. Transfer the materials to another person or "mirror" the materials
          on any other server.
          <br />
          <br />
          This license shall automatically terminate if you violate any of these
          restrictions and may be terminated by Learning Garden Montessori
          School at any time. Upon terminating your viewing of these materials
          or upon the termination of this license, you must destroy any
          downloaded materials in your possession whether in electronic or
          printed format.
          <br />
          <br />
          <h3 className="font-bold">Disclaimer</h3>
          <br />
          <br />
          The materials on Learning Garden Montessori School website are
          provided on an 'as is' basis. Learning Garden Montessori School makes
          no warranties, expressed or implied, and hereby disclaims and negates
          all other warranties, including without limitation, implied warranties
          or conditions of merchantability, fitness for a particular purpose, or
          non-infringement of intellectual property or other violation of
          rights.
          <br />
          <br />
          Further, Learning Garden Montessori School does not warrant or make
          any representations concerning the accuracy, likely results, or
          reliability of the use of the materials on its website or otherwise
          relating to such materials or on any sites linked to this site.
          <br />
          <br />
          <h3 className="font-bold">Limitations</h3>
          <br />
          <br />
          In no event shall Learning Garden Montessori School or its suppliers
          be liable for any damages (including, without limitation, damages for
          loss of data or profit, or due to business interruption) arising out
          of the use or inability to use the materials on Learning Garden
          Montessori School website, even if Learning Garden Montessori School
          authorized representative has been notified orally or in writing of
          the possibility of such damage. Because some jurisdictions do not
          allow limitations on implied warranties, or limitations of liability
          for consequential or incidental damages, these limitations may not
          apply to you.
          <br />
          <br />
          <h3 className="font-bold">Accuracy of materials</h3>
          <br />
          <br />
          The material appearing on Learning Garden Montessori School website
          could include technical, typographical, or photographic errors.
          Learning Garden Montessori School does not warrant that any of the
          materials on its website are accurate, complete, or current. Learning
          Garden Montessori School may make changes to the materials contained
          on its website at any time without notice. However, Learning Garden
          Montessori School does not make any commitment to update the
          materials.
          <br />
          <br />
          <h3 className="font-bold">Links</h3>
          <br />
          <br />
          Learning Garden Montessori School has not reviewed all of the sites
          linked to its website and is not responsible for the contents of any
          such linked site. The inclusion of any link does not imply endorsement
          by Learning Garden Montessori School of the site. Use of any such
          linked website is at the user's own risk.
          <br />
          <br />
          <h3 className="font-bold">Modifications</h3>
          <br />
          Learning Garden Montessori School may revise these terms of service
          for its website at any time without notice. By using this website, you
          are agreeing to be bound by the then current version of these Terms of
          Service.
          <br />
          <br />
          <h3 className="font-bold">Governing Law</h3>
          <br />
          <br />
          These terms and conditions are governed by and construed in accordance
          with the laws of the Philippines, and you irrevocably submit to the
          exclusive jurisdiction of the courts in that State or location.
        </p>
      </div>
    </div>
  );
};
export default Terms;
