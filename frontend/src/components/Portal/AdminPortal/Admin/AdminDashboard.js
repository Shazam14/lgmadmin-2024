import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import {
  fetchStudents,
  fetchApplicants,
  fetchEnrollments,
} from "../../../../services/studentApi";

const AdminDashboard = () => {
  const [applicantsCount, setApplicantsCount] = useState(0);
  const [enrollmentsCount, setEnrollmentsCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);

  useEffect(() => {
    fetchApplicants()
      .then((data) => setApplicantsCount(data.length))
      .catch((error) => console.error("Error fetching applicants:", error));

    fetchEnrollments()
      .then((data) => setEnrollmentsCount(data.length))
      .catch((error) => console.error("Error fetching enrollments:", error));

    fetchStudents()
      .then((data) => setStudentsCount(data.length))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  return (
    <div>
      <h3>Admin Dashboard</h3>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Applicants
              </Typography>
              <Typography variant="h3" color="text.secondary">
                {applicantsCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Enrollments
              </Typography>
              <Typography variant="h3" color="text.secondary">
                {enrollmentsCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Students
              </Typography>
              <Typography variant="h3" color="text.secondary">
                {studentsCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default AdminDashboard;
