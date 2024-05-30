// src/utils/applyFormUtils.js

const handleApplyClick = (formRef) => {
  if (formRef.current) {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  }
};

export { handleApplyClick };
