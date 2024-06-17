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
import useProgramData from "../ApplyForm/ProgramData";

const HighSchool = () => {
  const formRef = useRef(null);
  const { program } = useProgramData("High School Program");
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <NavigationHome />
      <HighSchoolHeroSection
        handleApplyClick={() => handleApplyClick(formRef)}
      />
      <HighSchoolCurriculum />
      {program && <ApplyForm ref={formRef} program={program.name} />}
      <AdmissionModal
        show={showModal}
        handleClose={handleCloseModal}
        requirements={requirementsData}
        formRef={formRef}
      />
      <Footer />
    </div>
  );
};

export default HighSchool;
