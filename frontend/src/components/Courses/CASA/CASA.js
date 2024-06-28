// CASA.js
import React, { useRef, useState } from "react";
import NavigationHome from "../../Navbar/NavigationHome";
import CASAHeroSection from "../../Courses/CASA/CASAHeroSection";
import CASACurriculum from "../../Courses/CASA/CASACurriculum";
import CASAAdmission from "../../Courses/CASA/CASAAdmission";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";
import { handleApplyClick } from "../../../utils/applyFormUtils";
import AdmissionModal from "../ApplyForm/AdmissionModal";
import requirementsData from "../ApplyForm/requirementsData";
import useProgramData from "../ApplyForm/ProgramData";

const CASA = () => {
  const formRef = useRef(null);
  const { program } = useProgramData("CASA Program");
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <NavigationHome />
      <CASAHeroSection handleApplyClick={() => handleApplyClick(formRef)} />
      <CASACurriculum />
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

export default CASA;
