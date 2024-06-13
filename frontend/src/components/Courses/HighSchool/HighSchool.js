import React, { useRef, useState } from "react";
import NavigationHome from "../../Navbar/NavigationHome";
import HighSchoolHeroSection from "../HighSchool/HighSchooHeroSection";
import HighSchoolAdmission from "../HighSchool/HighSchoolAdmission";
import HighSchoolCurriculum from "../HighSchool/HighSchoolCurriculum";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";
import { handleApplyClick } from "../../../utils/applyFormUtils";
import AdmissionModal from "../ApplyForm/AdmissionModal";
import requirementsData from "../ApplyForm/requirementsData";

const HighSchool = () => {
  const program = "HighSchool";
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

      <HighSchoolHeroSection
        handleApplyClick={() => handleApplyClick(formRef)}
      />
      <HighSchoolCurriculum />
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

export default HighSchool;
