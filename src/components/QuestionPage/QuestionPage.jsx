import "./QuestionPage.css"; // Import your CSS file

import { FormControl, FormLabel, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  updateIsSubmitted,
  updateQuestionColor,
  updateSelectedOption,
  updateUserTime,
} from "../../redux/userRedux";
import { useDispatch, useSelector } from "react-redux";

import FormControlLabel from "@mui/material/FormControlLabel";
import NavBar from "../NavBar";
import RadioGroup from "@mui/material/RadioGroup";
import { useNavigate } from "react-router-dom";

const QuestionPage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch(),
    navigate = useNavigate();
  const questions = user.questions;
  const [index, setIndex] = useState(0);
  const wrongOptions = questions[0].incorrect_answers;
  const initialOptions = wrongOptions.concat(questions[0].correct_answer);
  shuffleArray(initialOptions);
  const [options, setOptions] = useState(initialOptions);

  // At each second the component will be re-rendered
  // When timer becomes 0 then - automatically redirect to /report
  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (user.time > 0) {
        dispatch(updateUserTime(user.time - 1));
      } else {
        clearInterval(timeInterval);
        dispatch(updateIsSubmitted());
        navigate("/report");
      }
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [dispatch, user.time, navigate]);

  // Function to shuffle the options
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Handling the previous button
  const handlePrev = () => {
    if (index === 0) return;
    if (user.questionsColor[index - 1] === "red")
      dispatch(updateQuestionColor({ index: index - 1, color: "yellow" }));
    setIndex(index - 1);
    const wrongOptions = questions[index - 1].incorrect_answers;
    const totalOptions = wrongOptions.concat(
      questions[index - 1].correct_answer
    );
    shuffleArray(totalOptions);
    setOptions(totalOptions);
  };

  // Handling the next button
  const handleNext = () => {
    if (index === questions.length - 1) return;
    if (user.questionsColor[index + 1] === "red")
      dispatch(updateQuestionColor({ index: index + 1, color: "yellow" }));
    setIndex(index + 1);
    const wrongOptions = questions[index + 1].incorrect_answers;
    const totalOptions = wrongOptions.concat(
      questions[index + 1].correct_answer
    );
    shuffleArray(totalOptions);
    setOptions(totalOptions);
  };

  // On clicking on clear button, no options will be selected and
  // color of the question Box will be yellow, since it is visited but not attempted
  const handleClear = () => {
    dispatch(updateSelectedOption({ index: index, selectedOption: null }));
    dispatch(updateQuestionColor({ index: index, color: "yellow" }));
  };

  const handleBoxClick = (index) => {
    if (user.questionsColor[index] === "red")
      dispatch(updateQuestionColor({ index: index, color: "yellow" }));
    setIndex(index);
    const wrongOptions = questions[index].incorrect_answers;
    const totalOptions = wrongOptions.concat(questions[index].correct_answer);
    shuffleArray(totalOptions);
    setOptions(totalOptions);
  };

  const handleSubmit = () => {
    dispatch(updateUserTime(0));
    dispatch(updateIsSubmitted());
    navigate("/report");
  };

  return (
    <div className="main-div">
      <div className="question-page-container">
        <div className="question-section">
          <NavBar email={user.email} time={user.time} />
          <FormControl>
            <div className="question-content">
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginTop: "1%", marginLeft: "2%", fontSize: "20px" }}
              >
                Question {index + 1}:{" "}
              </FormLabel>
              <div className="scrollable-content">
                <div className="question">{questions[index].question}</div>
                <div className="options">
                  {/* ... (RadioGroup and FormControlLabel code) */}
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={user.response[index]}
                    onChange={(e) => {
                      dispatch(
                        updateSelectedOption({
                          index: index,
                          selectedOption: e.target.value,
                        })
                      );
                      dispatch(
                        updateQuestionColor({ index: index, color: "green" })
                      );
                    }}
                  >
                    {options.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        value={item}
                        control={<Radio />}
                        label={item}
                      />
                    ))}
                  </RadioGroup>
                </div>
              </div>
              <div className="buttons">
                <button
                  className="prev-button"
                  onClick={handlePrev}
                  disabled={index === 0}
                >
                  {"<<"} Prev
                </button>
                <button
                  className="next-button"
                  onClick={handleNext}
                  disabled={index === questions.length - 1}
                >
                  Next {">>"}
                </button>
                <button className="clear-button" onClick={handleClear}>
                  Clear
                </button>
              </div>
            </div>
          </FormControl>
        </div>
        <div className="right-panel">
          <div className="info">
            <p>
              <span style={{ color: "green" }}>Green</span> - Attempted
            </p>
            <p>
              <span style={{ color: "yellow" }}>Yellow</span> - Visited
            </p>
            <p>
              <span style={{ color: "red" }}>Red</span> - Not Visited
            </p>
          </div>
          <div className="questions-box-panel">
            {questions.map((item, index) => (
              <div
                className={`question-box ${user.questionsColor[index]}`}
                key={index}
                onClick={() => handleBoxClick(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
      <center>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </center>
    </div>
  );
};

export default QuestionPage;
