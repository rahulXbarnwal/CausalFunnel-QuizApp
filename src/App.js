import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import QuestionPage from "./components/QuestionPage/QuestionPage";
import ReportPage from "./components/ReportPage/ReportPage";
import StartPage from "./components/StartPage/StartPage";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route
            path="/questions"
            element={user.email === "" ? <Navigate to="/" /> : <QuestionPage />}
          />
          <Route
            path="/report"
            element={
              user.isSubmitted === true ? (
                <ReportPage />
              ) : (
                <Navigate to="/questions" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
