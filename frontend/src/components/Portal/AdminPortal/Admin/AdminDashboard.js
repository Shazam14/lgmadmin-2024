import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import api from "../../../../services/api";

const AdminDashboard = () => {
  const [applicantsCount, setApplicantsCount] = useState(0);
  const [enrollmentsCount, setEnrollmentsCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const applicantsData = await api.fetchData("applicants/");
        setApplicantsCount(applicantsData.length);

        const enrollmentsData = await api.fetchData("enrollments/");
        setEnrollmentsCount(enrollmentsData.length);

        const studentsData = await api.fetchData("students/");
        setStudentsCount(studentsData.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div>
      <h3>Admin Dashboard</h3>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          
            <CardContent>
              <Typography variant="h5" component="div">
                Applicants
              </Typography>
              <Typography variant="h3" color="text.secondary">
                {applicantsCount}
              </Typography>
            </CardContent>
          
        </Grid>

        <Grid item xs={12} sm={4}>
          
            <CardContent>
              <Typography variant="h5" component="div">
                Enrollments
              </Typography>
              <Typography variant="h3" color="text.secondary">
                {enrollmentsCount}
              </Typography>
            </CardContent>
          
        </Grid>

        <Grid item xs={12} sm={4}>
          
            <CardContent>
              <Typography variant="h5" component="div">
                Students
              </Typography>
              <Typography variant="h3" color="text.secondary">
                {studentsCount}
              </Typography>
            </CardContent>
          
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
