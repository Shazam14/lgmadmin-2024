import React, { useRef, useState } from "react";
import NavigationHome from "../../Navbar/NavigationHome";
import Footer from "../../Footer/Footer";
import SPEDHeroSection from "./SPEDHeroSection";
import SPEDCurriculum from "./SPEDCurriculum";
import ApplyForm from "../ApplyForm/ApplyForm";
import { handleApplyClick } from "../../../utils/applyFormUtils";
import AdmissionModal from "../ApplyForm/AdmissionModal";
import useProgramData from "../ApplyForm/ProgramData";
import requirementsData from "../ApplyForm/requirementsData";

const SPED = () => {
  const formRef = useRef(null);
  const { program } = useProgramData("LGMS T.E.A.C.H. Program");
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <NavigationHome />
      <SPEDHeroSection handleApplyClick={() => handleApplyClick(formRef)} />
      <SPEDCurriculum />
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

export default SPED;
