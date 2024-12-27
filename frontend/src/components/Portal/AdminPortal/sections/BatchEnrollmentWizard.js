import React, { useState, useMemo } from "react";
import { Search, Check, AlertCircle } from "lucide-react";
import { Input } from "../../../ui/input";
import { Select } from "../../../ui/select";
import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";
import { Label } from "../../../ui/label";
import { Modal } from "../../../ui/modal";
import { Alert, AlertDescription } from "../../../ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { CustomTabs, TabContent } from "../../../ui/CustomTabs";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
} from "../../../ui/table";
import { Dropdown, DropdownItem } from "../../../ui/dropdown";

const BatchEnrollmentWizard = ({
  isOpen,
  onClose,
  eligibleApplicants = [],
  programs = [],
  academicYear,
  onEnroll,
}) => {
  // States
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [step, setStep] = useState(1);
  const [batchSettings, setBatchSettings] = useState({
    program: "",
    gradeLevel: "",
    section: "",
    academicYear,
  });
  const [error, setError] = useState(null);

  // Filtered applicants based on search
  const filteredApplicants = useMemo(() => {
    return eligibleApplicants.filter((app) =>
      `${app.first_name} ${app.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [eligibleApplicants, searchTerm]);

  // Selection handlers
  const toggleSelectAll = () => {
    if (selectedIds.size === filteredApplicants.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredApplicants.map((a) => a.id)));
    }
  };

  const toggleSelect = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // Render Step 1: Applicant Selection
  const renderApplicantSelection = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search applicants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <Button variant="secondary" onClick={toggleSelectAll}>
          {selectedIds.size === filteredApplicants.length
            ? "Deselect All"
            : "Select All"}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell className="w-12">
                  <Checkbox
                    checked={selectedIds.size === filteredApplicants.length}
                    onChange={toggleSelectAll}
                  />
                </TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Program</TableHeaderCell>
                <TableHeaderCell>Applied Date</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredApplicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(applicant.id)}
                      onChange={() => toggleSelect(applicant.id)}
                    />
                  </TableCell>
                  <TableCell>
                    {applicant.first_name} {applicant.last_name}
                  </TableCell>
                  <TableCell>{applicant.program_option}</TableCell>
                  <TableCell>
                    {new Date(applicant.applied_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          •••
                        </Button>
                      }
                      menu={
                        <>
                          <DropdownItem
                            onClick={() => toggleSelect(applicant.id)}
                          >
                            {selectedIds.has(applicant.id)
                              ? "Deselect"
                              : "Select"}
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => console.log("View details")}
                          >
                            View Details
                          </DropdownItem>
                        </>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  // Render Step 2: Batch Settings
  const renderBatchSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enrollment Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Program</Label>
              <Select
                value={batchSettings.program}
                onChange={(e) =>
                  setBatchSettings((prev) => ({
                    ...prev,
                    program: e.target.value,
                  }))
                }
              >
                <option value="">Select Program</option>
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Grade Level</Label>
              <Select
                value={batchSettings.gradeLevel}
                onChange={(e) =>
                  setBatchSettings((prev) => ({
                    ...prev,
                    gradeLevel: e.target.value,
                  }))
                }
              >
                <option value="">Select Grade Level</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Section</Label>
              <Select
                value={batchSettings.section}
                onChange={(e) =>
                  setBatchSettings((prev) => ({
                    ...prev,
                    section: e.target.value,
                  }))
                }
              >
                <option value="">Select Section</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Academic Year</Label>
              <Input
                type="text"
                value={batchSettings.academicYear}
                onChange={(e) =>
                  setBatchSettings((prev) => ({
                    ...prev,
                    academicYear: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="text-sm">
            <p className="font-medium">Summary</p>
            <p className="text-gray-600">
              Selected Students: {selectedIds.size}
            </p>
            <p className="text-gray-600">
              Program: {batchSettings.program || "Not selected"}
            </p>
            <p className="text-gray-600">
              Grade Level: {batchSettings.gradeLevel || "Not selected"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        step === 1
          ? "Select Students for Enrollment"
          : "Configure Batch Settings"
      }
    >
      <div className="py-4">
        {error && (
          <Alert variant="error" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === 1 ? renderApplicantSelection() : renderBatchSettings()}

        <div className="flex justify-between mt-6">
          {step === 2 && (
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          )}

          {step === 1 ? (
            <Button
              className="ml-auto"
              onClick={() => setStep(2)}
              disabled={selectedIds.size === 0}
            >
              Continue with {selectedIds.size} selected
            </Button>
          ) : (
            <Button
              className="ml-auto"
              onClick={() => {
                if (
                  !batchSettings.program ||
                  !batchSettings.gradeLevel ||
                  !batchSettings.section
                ) {
                  setError("Please fill in all required fields");
                  return;
                }
                onEnroll(Array.from(selectedIds), batchSettings);
              }}
            >
              <Check className="h-4 w-4 mr-2" />
              Complete Batch Enrollment
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BatchEnrollmentWizard;
