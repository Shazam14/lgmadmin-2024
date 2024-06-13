// src/utils/applyFormUtils.js

const handleApplyClick = (ref) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
};

export { handleApplyClick };
