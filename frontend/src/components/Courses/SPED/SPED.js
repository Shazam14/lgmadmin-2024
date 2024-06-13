import React, { useRef, useState } from "react";
import NavigationHome from "../../Navbar/NavigationHome";
import Footer from "../../Footer/Footer";
import SPEDHeroSection from "./SPEDHeroSection";
import SPEDAdmission from "./SPEDAdmission";
import SPEDCurriculum from "./SPEDCurriculum";
import ApplyForm from "../ApplyForm/ApplyForm";
import { handleApplyClick } from "../../../utils/applyFormUtils";
import AdmissionModal from "../ApplyForm/AdmissionModal";
import requirementsData from "../ApplyForm/requirementsData";

const SPED = () => {
  const program = "SPED Teach";
  const formRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequirements, setSelectedRequirements] = useState(
    requirementsData[program]
  );

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <NavigationHome />
      <SPEDHeroSection handleApplyClick={() => handleApplyClick(formRef)} />
      <SPEDCurriculum />
      <AdmissionModal
        show={showModal}
        handleClose={handleCloseModal}
        requirements={selectedRequirements}
      />
      <ApplyForm ref={formRef} program={program} />
      <Footer />
    </div>
  );
};

export default SPED;
