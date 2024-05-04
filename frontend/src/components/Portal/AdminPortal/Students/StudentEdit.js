// StudentEdit.js
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  fetchStudentByStudentId,
  updateStudent,
} from "../../../../services/api";

// Rest of the component code...
