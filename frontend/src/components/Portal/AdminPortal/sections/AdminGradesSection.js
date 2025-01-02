import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { LoadingSpinner } from "../../common/LoadingSpinner";
import { AlertCircle, Save, Upload, Download } from "lucide-react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
} from "../../../ui/table";
import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";

export const AdminGradesSection = ({
  students,
  onUpdateGrades,
  onFetchGrades,
  loading,
  filters,
  setFilters,
  refreshData,
  programs,
}) => {
  console.log("AdminGradesSection rendered with:", {
    studentsCount: students?.length,
    programsCount: programs?.length,
    filters,
  });

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [grades, setGrades] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);

  // Filter options based on your student data
  // Get unique classes from students
  const classOptions = React.useMemo(() => {
    const options = [...new Set(students?.map((s) => s.grade))].sort();
    console.log("Generated class options:", options);
    return options;
  }, [students]);

  const defaultSubjects = [
    "Mathematics",
    "Science",
    "English",
    "Filipino",
    "MAPEH",
  ];

  const subjectMapping = {
    Mathematics: { id: 1, name: "Mathematics" },
    Science: { id: 2, name: "Science" },
    English: { id: 3, name: "English" },
    Filipino: { id: 4, name: "Filipino" },
    MAPEH: { id: 5, name: "MAPEH" },
  };

  const subjectIds = {
    Mathematics: 1,
    Science: 2,
    English: 3,
    Filipino: 4,
    MAPEH: 5,
  };
  const subjectOptions = React.useMemo(() => {
    let options = defaultSubjects;
    console.log("Creating subject options from programs:", programs);
    return options;
  }, []);

  const filteredStudents = React.useMemo(() => {
    if (!selectedClass) {
      return [];
    }

    const filtered =
      students?.filter((student) => student.grade === selectedClass) || [];

    console.log("Filtered students for class:", {
      class: selectedClass,
      count: filtered.length,
      students: filtered.map((s) => ({
        id: s.student_id,
        name: `${s.first_name} ${s.last_name}`,
      })),
    });

    return filtered;
  }, [students, selectedClass]);

  // In your AdminGradesSection component
  useEffect(() => {
    const loadGrades = async () => {
      if (!selectedClass || !selectedSubject) {
        console.log("Skipping grade fetch - missing selection:", {
          class: selectedClass,
          subject: selectedSubject,
        });
        return;
      }

      const subjectInfo = subjectMapping[selectedSubject];
      console.log("Fetching grades for:", {
        class: selectedClass,
        subject: selectedSubject,
        subjectId: subjectInfo.id,
      });

      try {
        const gradesData = await onFetchGrades({
          grade_level: selectedClass,
          subject_id: subjectInfo.id,
        });

        console.log("Raw grades response:", gradesData);

        // Create grade entries for all students in class
        const mappedGrades = filteredStudents.map((student) => {
          // Find existing grade for this student
          const matchingGrade = gradesData?.find((g) => {
            const studentMatch =
              `${g.student__first_name} ${g.student__last_name}` ===
              `${student.first_name} ${student.last_name}`;

            console.log("Checking grade match:", {
              studentId: student.student_id,
              studentName: `${student.first_name} ${student.last_name}`,
              gradeStudentName: `${g.student__first_name} ${g.student__last_name}`,
              matches: studentMatch,
            });

            return studentMatch;
          });

          return {
            student_id: student.student_id,
            name: `${student.first_name} ${student.last_name}`,
            subject_id: subjectInfo.id,
            written_work: matchingGrade?.written_work?.toString() || "-",
            performance_task:
              matchingGrade?.performance_task?.toString() || "-",
            quarterly_exam: matchingGrade?.quarterly_exam?.toString() || "-",
            final_grade:
              matchingGrade?.final_grade?.toString() || "Not yet computed",
          };
        });

        console.log("Mapped grades:", mappedGrades);
        setGrades(mappedGrades);
      } catch (error) {
        console.error("Failed to load grades:", error);
        setError("Failed to load grades");
      }
    };

    loadGrades();
  }, [selectedClass, selectedSubject, filteredStudents, onFetchGrades]);

  const handleClassChange = (e) => {
    const newClass = e.target.value;
    console.log("Class changed:", newClass);
    setSelectedClass(newClass);
    setSelectedSubject(""); // Clear subject when class changes
    setGrades([]); // Clear existing grades
  };

  const handleGradeChange = (studentId, field, value) => {
    setGrades((prev) =>
      (prev || []).map((grade) =>
        grade.student_id === studentId
          ? { ...grade, [field]: value || "-" }
          : grade
      )
    );
  };

  const handleSaveChanges = async () => {
    try {
      const subjectInfo = subjectMapping[selectedSubject];
      console.log("Preparing grades for save:", {
        class: selectedClass,
        subject: selectedSubject,
        subjectId: subjectInfo.id,
        grades: grades,
      });

      // Prepare grades for saving
      const gradesToSave = grades
        .filter(
          (grade) =>
            grade.written_work !== "-" ||
            grade.performance_task !== "-" ||
            grade.quarterly_exam !== "-"
        )
        .map((grade) => ({
          ...grade,
          subject_id: subjectInfo.id,
          written_work:
            grade.written_work === "-" ? null : Number(grade.written_work),
          performance_task:
            grade.performance_task === "-"
              ? null
              : Number(grade.performance_task),
          quarterly_exam:
            grade.quarterly_exam === "-" ? null : Number(grade.quarterly_exam),
        }));

      if (gradesToSave.length === 0) {
        setError("No grades to save");
        return;
      }

      console.log("Saving grades:", gradesToSave);
      await onUpdateGrades(gradesToSave);
      setEditMode(false);
      refreshData();
    } catch (error) {
      console.error("Error saving grades:", error);
      setError("Failed to save grades");
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const rows = text.split("\n");
        const headers = rows[0].split(",");

        const gradesData = rows
          .slice(1)
          .map((row) => {
            const values = row.split(",");
            return {
              student_id: values[0],
              subject_id: values[1],
              written_work: parseFloat(values[2]),
              performance_task: parseFloat(values[3]),
              quarterly_exam: parseFloat(values[4]),
            };
          })
          .filter((grade) => !isNaN(grade.written_work));

        await onUpdateGrades(gradesData);
        refreshData();
      };
      reader.readAsText(file);
    } catch (error) {
      console.error("Error uploading grades:", error);
    }
  };

  if (!students || students.length === 0) {
    return (
      <div className="p-4">
        <Alert>
          <AlertDescription>
            There are no students in the system yet.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Grade Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="px-3 py-2 border rounded-md"
            >
              <option value="">Select Class</option>
              {classOptions.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>

            <select
              value={selectedSubject}
              onChange={(e) => {
                const newSubject = e.target.value;
                console.log("Subject selected:", {
                  subject: newSubject,
                  currentClass: selectedClass,
                  currentGrades: grades,
                });
                setSelectedSubject(newSubject);

                // Only clear grades, don't reset everything
                if (newSubject !== selectedSubject) {
                  setGrades([]);
                }
              }}
              className="px-3 py-2 border rounded-md"
              disabled={!selectedClass} // Disable if no class selected
            >
              <option value="">Select Subject</option>
              {subjectOptions.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <Button
              onClick={() => setEditMode(!editMode)}
              variant="outline"
              className="ml-auto"
            >
              {editMode ? "Cancel" : "Edit Grades"}
            </Button>
            {editMode && (
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            )}
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>STUDENT ID</TableHeaderCell>
                  <TableHeaderCell>NAME</TableHeaderCell>
                  <TableHeaderCell>WRITTEN WORK (30%)</TableHeaderCell>
                  <TableHeaderCell>PERFORMANCE TASK (50%)</TableHeaderCell>
                  <TableHeaderCell>QUARTERLY EXAM (20%)</TableHeaderCell>
                  <TableHeaderCell>FINAL GRADE</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => {
                  // Add null check when finding the grade
                  const studentGrade =
                    grades?.find((g) => g.student_id === student.student_id) ||
                    {};

                  console.log("Rendering student row:", {
                    studentId: student.student_id,
                    name: `${student.first_name} ${student.last_name}`,
                    foundGrade: Boolean(studentGrade),
                    gradeData: studentGrade || {}, // Ensure we always have an object
                  });

                  return (
                    <TableRow key={student.student_id}>
                      <TableCell>{student.student_id}</TableCell>
                      <TableCell>{`${student.first_name} ${student.last_name}`}</TableCell>
                      <TableCell>
                        {editMode ? (
                          <Input
                            type="number"
                            value={
                              studentGrade?.written_work === "-"
                                ? ""
                                : studentGrade?.written_work
                            }
                            onChange={(e) =>
                              handleGradeChange(
                                student.student_id,
                                "written_work",
                                e.target.value
                              )
                            }
                            className="w-20"
                            min="0"
                            max="100"
                          />
                        ) : (
                          studentGrade?.written_work || "-"
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode ? (
                          <Input
                            type="number"
                            value={
                              studentGrade?.performance_task === "-"
                                ? ""
                                : studentGrade?.performance_task
                            }
                            onChange={(e) =>
                              handleGradeChange(
                                student.student_id,
                                "performance_task",
                                e.target.value
                              )
                            }
                            className="w-20"
                            min="0"
                            max="100"
                          />
                        ) : (
                          studentGrade?.performance_task || "-"
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode ? (
                          <Input
                            type="number"
                            value={
                              studentGrade?.quarterly_exam === "-"
                                ? ""
                                : studentGrade?.quarterly_exam
                            }
                            onChange={(e) =>
                              handleGradeChange(
                                student.student_id,
                                "quarterly_exam",
                                e.target.value
                              )
                            }
                            className="w-20"
                            min="0"
                            max="100"
                          />
                        ) : (
                          studentGrade?.quarterly_exam || "-"
                        )}
                      </TableCell>
                      <TableCell>
                        {studentGrade?.final_grade || "Not yet computed"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
