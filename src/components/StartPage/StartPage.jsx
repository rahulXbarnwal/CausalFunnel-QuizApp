import "./StartPage.css";

import React, { useState } from "react";
import { fetchFailure, fetchStart, fetchSuccess } from "../../redux/userRedux";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function StartPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const getQuestions = async (dispatch, email) => {
      dispatch(fetchStart());
      try {
        // Fetching the data from the API
        const res = await axios.get("https://opentdb.com/api.php?amount=15");
        const initialResponse = [],
          initialColor = [];
        for (let i = 0; i < 15; i++) {
          initialResponse.push(null);
          if (i === 0) initialColor.push("yellow");
          else initialColor.push("red");
        }

        // Setting the Redux state after the fetching is successful
        dispatch(
          fetchSuccess({
            questions: res.data.results,
            email: email,
            response: initialResponse,
            questionsColor: initialColor,
          })
        );
        console.log(res);
        console.log(`Email submitted: ${email}`);
        navigate("/questions");
      } catch (err) {
        dispatch(fetchFailure());
      }
    };
    getQuestions(dispatch, email);
  };

  return (
    <div className="start-page">
      <div className="content">
        <h1>Enter Your E-mail to Start the Quiz</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="submit" disabled={isFetching}>
            Start
          </button>
          {error && (
            <span style={{ color: "red" }}>Something went wrong...</span>
          )}
        </form>
      </div>
    </div>
  );
}

export default StartPage;
