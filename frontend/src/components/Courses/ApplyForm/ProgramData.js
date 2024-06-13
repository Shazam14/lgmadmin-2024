import { useState, useEffect } from "react";
import apiClient from "../../../services/apiClient";

const useProgramData = (programName) => {
  const [program, setProgram] = useState(null);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await apiClient.get("grades/programs/");
        const specificProgram = response.data.find(
          (program) => program.name === programName
        );
        setProgram(specificProgram);
      } catch (error) {
        console.error("Error fetching program data:", error);
      }
    };

    fetchProgramData();
  }, [programName]);

  return { program };
};

export default useProgramData;
