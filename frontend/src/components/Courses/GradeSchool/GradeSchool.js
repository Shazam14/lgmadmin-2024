import React, { useRef, useState } from "react";
import NavigationHome from "../../Navbar/NavigationHome";
import GradeSchoolHeroSection from "./GradeSchoolHeroSection";
import GradeSchoolAdmission from "./GradeSchoolAdmission";
import GradeSchoolCurriculum from "./GradeSchoolCurriculum";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";
import AdmissionModal from "../ApplyForm/AdmissionModal";
import requirementsData from "../ApplyForm/requirementsData";

import { handleApplyClick } from "../../../utils/applyFormUtils";

const GradeSchool = () => {
  const program = "GradeSchool";
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
      <GradeSchoolHeroSection
        handleApplyClick={() => handleApplyClick(formRef)}
      />
      <GradeSchoolCurriculum />
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

export default GradeSchool;
