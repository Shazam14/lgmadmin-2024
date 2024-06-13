import React, { useRef, useState } from "react";
import NavigationHome from "../../Navbar/NavigationHome";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";
import HomeStudyHeroSection from "./HomeStudyHeroSection";
import HomeStudyAdmission from "./HomeStudyAdmission";
import HomeStudyCurriculum from "./HomeStudyCurriculum";
import { handleApplyClick } from "../../../utils/applyFormUtils";
import AdmissionModal from "../ApplyForm/AdmissionModal";
import requirementsData from "../ApplyForm/requirementsData";

const HomeStudy = () => {
  const program = "Playgroup";
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
      <HomeStudyHeroSection
        handleApplyClick={() => handleApplyClick(formRef)}
      />
      {/* <HomeStudyCurriculum /> */}
      <ApplyForm ref={formRef} program={program} />
      <AdmissionModal
        show={showModal}
        handleClose={handleCloseModal}
        requirements={selectedRequirements}
      />
      <Footer />
    </div>
  );
};

export default HomeStudy;
