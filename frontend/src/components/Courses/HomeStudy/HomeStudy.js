import React, { useRef, useState } from "react";
import NavigationHome from "../../Navbar/NavigationHome";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";
import HomeStudyHeroSection from "./HomeStudyHeroSection";
import { handleApplyClick } from "../../../utils/applyFormUtils";
import AdmissionModal from "../ApplyForm/AdmissionModal";
import requirementsData from "../ApplyForm/requirementsData";
import useProgramData from "../ApplyForm/ProgramData";

const HomeStudy = () => {
  const formRef = useRef(null);
  const { program } = useProgramData("Playgroup Program");
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <NavigationHome />
      <HomeStudyHeroSection
        handleApplyClick={() => handleApplyClick(formRef)}
      />
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

export default HomeStudy;
