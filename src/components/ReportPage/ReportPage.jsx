import "./ReportPage.css"; // Import your CSS file for styling

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import React from "react";
import { useSelector } from "react-redux";

const ReportPage = () => {
  const user = useSelector((state) => state.user);
  const data = [];
  for (let i = 0; i < 15; i++) {
    const obj = {
      question: user.questions[i].question,
      correctAnswer: user.questions[i].correct_answer,
      userAnswer: user.response[i],
    };
    data.push(obj);
  }

  return (
    <div>
      <NavBar email={user.email} time={user.time} />
      <TableContainer component={Paper} className="grid-container">
        <Table aria-label="Grid">
          <TableHead>
            <TableRow>
              <TableCell className="grid-header">S.No.</TableCell>
              <TableCell className="grid-header">Question</TableCell>
              <TableCell className="grid-header">Correct Answer</TableCell>
              <TableCell className="grid-header">User's Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.question}</TableCell>
                <TableCell>{row.correctAnswer}</TableCell>
                <TableCell>{row.userAnswer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <center>
        <Link to="/">Return Home</Link>
      </center>
      <br />
    </div>
  );
};

export default ReportPage;
