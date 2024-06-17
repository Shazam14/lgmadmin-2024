import React, { useRef, useState } from "react";
import NavigationHome from "../../Navbar/NavigationHome";
import GradeSchoolHeroSection from "./GradeSchoolHeroSection";
import GradeSchoolCurriculum from "./GradeSchoolCurriculum";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";
import AdmissionModal from "../ApplyForm/AdmissionModal";
import requirementsData from "../ApplyForm/requirementsData";
import useProgramData from "../ApplyForm/ProgramData";
import { handleApplyClick } from "../../../utils/applyFormUtils";

const GradeSchool = () => {
  const formRef = useRef(null);
  const { program } = useProgramData("Elementary Program");
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <NavigationHome />
      <GradeSchoolHeroSection
        handleApplyClick={() => handleApplyClick(formRef)}
      />
      <GradeSchoolCurriculum />
      {program && <ApplyForm ref={formRef} program={program.name} />}
      <Footer />
      <AdmissionModal
        show={showModal}
        handleClose={handleCloseModal}
        requirements={requirementsData}
        formRef={formRef}
      />
    </div>
  );
};

export default GradeSchool;
