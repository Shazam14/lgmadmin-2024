/**
 * Transforms raw student data from API into frontend format
 */
export const transformStudentData = (rawData) => {
  if (!rawData) return null;

  const studentData = rawData.student || rawData.personal || rawData;

  return {
    personal: {
      firstName: studentData.first_name || studentData.firstName || "",
      middleName: studentData.middle_name || studentData.middleName || "",
      lastName: studentData.last_name || studentData.lastName || "",
      birthday: studentData.birthday || "",
      gender: studentData.gender || "",
      email: studentData.email || "",
      studentId: studentData.student_id || "",
      nationality: "Filipino", // Default or from extended profile
    },
    characteristics: {
      // Map from extended profile/student profile data
      height: studentData.height || "",
      weight: studentData.weight || "",
      eyeColor: studentData.eye_color || "",
      hairColor: studentData.hair_color || "",
      distinguishingMarks: studentData.distinguishing_marks || "",
      temperament: studentData.temperament || "",
      interests: studentData.interests || "",
      strengths: studentData.strengths || "",
      challenges: studentData.challenges || "",
      selectedTraits: studentData.traits || [],
      customFields: studentData.custom_fields || {},
    },
    academic: {
      grade: rawData.academic?.grade || "",
      program: rawData.academic?.program || "",
      section: rawData.academic?.section || "",
      studentId: rawData.academic?.studentId || "",
      attendance: rawData.academic?.attendance || "0.0%",
    },
    medical: {
      bloodType: rawData.medical?.bloodType || "",
      allergies: rawData.medical?.allergies || "",
      medications: rawData.medical?.medications || "",
      conditions: rawData.medical?.conditions || "",
      immunizations: rawData.medical?.immunizations || "",
      immunizationHistory: rawData.medical?.immunization_history || "",
      specialNeeds: rawData.medical?.special_needs || "",
      medicalHistory: rawData.medical?.medical_history || "",
    },
    father: {
      firstName: rawData.father?.firstName || "",
      lastName: rawData.father?.lastName || "",
      email: rawData.father?.email || "",
      phone: rawData.father?.phone || "",
    },
    mother: {
      firstName: rawData.mother?.firstName || "",
      lastName: rawData.mother?.lastName || "",
      email: rawData.mother?.email || "",
      phone: rawData.mother?.phone || "",
    },
    guardian: {
      firstName: rawData.guardian?.firstName || "",
      lastName: rawData.guardian?.lastName || "",
      email: rawData.guardian?.email || "",
      phone: rawData.guardian?.phone || "",
    },
    living: {
      currentArrangement: determineLivingArrangement(rawData.parent_profiles),
      address: formatAddress(rawData),
      city: rawData.address_city || "",
      postalCode: rawData.address_postal_code || "",
      transportationMethod:
        rawData.extended_profile?.transportation_method || "School Bus",
      // Add other living arrangement fields
    },
  };
};

/**
    }
    }
    }
    }
      height: rawData.characteristics?.extended_profile?.height || "",
      weight: rawData.characteristics?.extended_profile?.weight || "",
      eyeColor: rawData.characteristics?.extended_profile?.eye_color || "",
      hairColor: rawData.characteristics?.extended_profile?.hair_color || "",
      distinguishingMarks:
        rawData.characteristics?.extended_profile?.distinguishing_marks || "",
      temperament: rawData.characteristics?.extended_profile?.temperament || "",
      interests: rawData.characteristics?.extended_profile?.interests || "",
      strengths: rawData.characteristics?.extended_profile?.strengths || "",
      challenges: rawData.characteristics?.extended_profile?.challenges || "",
      selectedTraits: rawData.characteristics?.extended_profile?.traits || [],
      customFields:
        rawData.characteristics?.extended_profile?.custom_fields || {},
    },
    academic: {
      grade: rawData.academic?.grade || "",
      section: rawData.academic?.section || "",
      program: rawData.program?.name || "",
      status: rawData.academic?.student_status || "",
      promoted: rawData.academic?.promoted || false,
      elementaryCertificate: rawData.academic?.elementary_certificate || false,
      juniorHighCertificate: rawData.academic?.junior_high_certificate || false,
      attendance: rawData.academic?.attendance_percentage || 0,
    },
    grades: {
      currentQuarter: determineCurrentQuarter(),
      subjects: transformGrades(rawData.student_grades || []),
    },
    father:
      rawData.parent_profiles?.find((p) => p.relationship === "Father") || {},
    mother:
      rawData.parent_profiles?.find((p) => p.relationship === "Mother") || {},
    medical: {
      // Map from medical records if they exist
      bloodType: rawData.extended_profile?.blood_type || "",
      allergies: rawData.extended_profile?.allergies || "None",
      currentMedications:
        rawData.extended_profile?.current_medications || "None",
      medicalConditions: rawData.extended_profile?.medical_conditions || "None",
      emergencyContact: formatEmergencyContact(rawData.parent_profiles),
      lastCheckupDate: rawData.extended_profile?.last_checkup_date || "",
      doctorName: rawData.extended_profile?.doctor_name || "",
      doctorContact: rawData.extended_profile?.doctor_contact || "",
    },
    living: {
      currentArrangement: determineLivingArrangement(rawData.parent_profiles),
      address: formatAddress(rawData),
      city: rawData.address_city || "",
      postalCode: rawData.address_postal_code || "",
      transportationMethod:
        rawData.extended_profile?.transportation_method || "School Bus",
      // Add other living arrangement fields
    },
  };
};

/**
 * Helper function to transform grades data
 */
const transformGrades = (grades) => {
  const transformedGrades = [];

  if (!Array.isArray(grades)) return transformedGrades;

  // Group grades by subject
  const gradesBySubject = grades.reduce((acc, grade) => {
    if (!acc[grade.subject.name]) {
      acc[grade.subject.name] = {};
    }

    // Map quarter number to grade
    if (grade.quarterly_grade) {
      acc[grade.subject.name][`q${determineCurrentQuarter(grade)}`] =
        grade.quarterly_grade;
    }

    if (grade.final_grade) {
      acc[grade.subject.name].final = grade.final_grade;
    }

    return acc;
  }, {});

  // Convert to array format
  Object.entries(gradesBySubject).forEach(([subject, grades]) => {
    transformedGrades.push({
      subject,
      q1: grades.q1 || null,
      q2: grades.q2 || null,
      q3: grades.q3 || null,
      q4: grades.q4 || null,
      final: grades.final || null,
    });
  });

  return transformedGrades;
};

/**
 * Helper function to determine current quarter based on date
 */
const determineCurrentQuarter = () => {
  const now = new Date();
  const month = now.getMonth();

  if (month >= 0 && month < 3) return "Q3";
  if (month >= 3 && month < 6) return "Q4";
  if (month >= 6 && month < 9) return "Q1";
  return "Q2";
};

/**
 * Helper function to format address
 */
const formatAddress = (data) => {
  const parts = [
    data.address_house_no,
    data.address_street,
    data.address_barangay,
  ].filter(Boolean);

  return parts.join(" ");
};

/**
 * Helper to determine living arrangement based on parent profiles
 */
const determineLivingArrangement = (parentProfiles) => {
  if (!parentProfiles?.length) return "Unknown";

  const hasfather = parentProfiles.some((p) => p.relationship === "Father");
  const hasmother = parentProfiles.some((p) => p.relationship === "Mother");

  if (hasfather && hasmother) return "With Both Parents";
  if (hasfather) return "With Father";
  if (hasmother) return "With Mother";
  return "With Guardian";
};

/**
 * Format emergency contact from parent profiles
 */
const formatEmergencyContact = (parentProfiles) => {
  if (!parentProfiles?.length) return "";

  const primary = parentProfiles.find((p) => p.contact_priority === "Primary");
  if (!primary) return "";

  return `${primary.first_name} ${primary.last_name} - ${primary.primary_contact_value}`;
};
