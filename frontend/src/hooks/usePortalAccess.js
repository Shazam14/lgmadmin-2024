import { usePortalAuth } from "../contexts/PortalAuthContext";

export const usePortalAccess = () => {
  const { isParent, isStudent } = usePortalAuth();

  const canEdit = (section) => {
    if (!isParent) return false; // Students can't edit anything

    // Even parents can't edit these sections
    const readOnlySections = ["grades", "tuition", "documents"];
    return !readOnlySections.includes(section);
  };

  const canView = (section) => {
    // Both parents and students can view all sections
    return true;
  };

  return {
    canEdit,
    canView,
    isParent,
    isStudent,
  };
};
