import React, { useState, useEffect } from "react";
import "./app.css";

const Quiz = () => {
  // Quiz state
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(60).fill(null));
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds

  // Sample questions - replace with actual questions
  const questions = [
    {
      question: "What is the simplified form of (3x + 2) - (2x - 5)?",
      options: ["x + 7", "5x - 3", "x - 3", "x + 3"],
    },
    {
      question: "Solve for x: 5x - 3 = 2x + 6",
      options: ["x = 3", "x = 1", "x = -3", "x = 2"],
    },
    {
      question: "Which of the following is a factor of x² - 9?",
      options: ["x + 3", "x + 9", "x - 1", "x² - 3"],
    },
    {
      question: "If f(x) = 2x² - 3x + 1, what is f(2)?",
      options: ["3", "7", "2", "5"],
    },
    {
      question: "Simplify: (x² - 9)/(x + 3)",
      options: ["x - 3", "x + 3", "x² - 3", "x² + 3"],
    },
    {
      question: "What is the vertex of the parabola y = x² - 4x + 3?",
      options: ["(2, -1)", "(1, 2)", "(-2, 1)", "(2, 1)"],
    },
    {
      question: "Which of the following is equivalent to x⁻²?",
      options: ["1/x²", "x²", "-x²", "1/x"],
    },
    {
      question: "Simplify √(49x²)",
      options: ["7x", "49x", "x√7", "7√x"],
    },
    {
      question: "Rationalize the denominator of 5 / √2",
      options: ["(5√2)/2", "5√2", "√10", "10/√2"],
    },
    {
      question: "Which expression is undefined when x = 0?",
      options: ["1/x", "x²", "x + 1", "x³"],
    },
    {
      question: "Solve: √(x + 4) = 3",
      options: ["x = 5", "x = -1", "x = 9", "x = -5"],
    },
    {
      question: "What is the domain of f(x) = 1/(x - 2)?",
      options: ["x ≠ 2", "x ≠ 0", "x > 2", "x < 2"],
    },
    {
      question: "What is the inverse of f(x) = 2x + 3?",
      options: [
        "f⁻¹(x) = (x - 3)/2",
        "f⁻¹(x) = 2x - 3",
        "f⁻¹(x) = x/2 + 3",
        "f⁻¹(x) = 3x - 2",
      ],
    },
    {
      question: "Which graph represents y = log(x)?",
      options: [
        "A curve that increases and passes through (1,0)",
        "A straight line",
        "A circle",
        "A horizontal line",
      ],
    },
    {
      question: "Simplify: log(100) / log(10)",
      options: ["2", "10", "1", "0.5"],
    },
    {
      question: "What is sin(90°)?",
      options: ["1", "0", "0.5", "√2/2"],
    },
    {
      question: "What is the period of y = sin(2x)?",
      options: ["π", "2π", "4π", "π/2"],
    },
    {
      question: "What is cos(0)?",
      options: ["1", "0", "-1", "0.5"],
    },
    {
      question: "Evaluate: tan(45°)",
      options: ["1", "0", "√3", "∞"],
    },
    {
      question: "Convert π/3 radians to degrees.",
      options: ["60°", "90°", "45°", "30°"],
    },
    {
      question: "Find the limit: lim(x→2) (x² - 4)/(x - 2)",
      options: ["4", "2", "∞", "Does not exist"],
    },
    {
      question: "What is lim(x→0) sin(x)/x?",
      options: ["1", "0", "∞", "Undefined"],
    },
    {
      question: "Differentiate: f(x) = x³",
      options: ["3x²", "x²", "3x", "x³"],
    },
    {
      question: "Find the derivative of f(x) = e^x",
      options: ["e^x", "ln(x)", "x*e^x", "1/x"],
    },
    {
      question: "What is the integral of 1/x dx?",
      options: ["ln|x| + C", "1/x + C", "x + C", "x²/2 + C"],
    },
    {
      question: "Find the integral of f(x) = x²",
      options: ["x³/3 + C", "2x + C", "x²/2 + C", "x + C"],
    },
    {
      question: "Differentiate: f(x) = ln(x)",
      options: ["1/x", "x", "ln(x)", "e^x"],
    },
    {
      question: "Solve for x: 2^(x+1) = 16",
      options: ["3", "4", "5", "2"],
    },
    {
      question: "Find the domain of f(x) = √(x - 3)",
      options: ["x ≥ 3", "x > 3", "x ≤ 3", "All real numbers"],
    },
    {
      question: "If f(x) = x² and g(x) = √x, what is f(g(4))?",
      options: ["4", "16", "2", "8"],
    },
    {
      question: "If f(x) = 3x + 1, what is f⁻¹(x)?",
      options: ["(x - 1)/3", "x/3 + 1", "3x - 1", "1 - x/3"],
    },
    {
      question:
        "Which of the following is a horizontal asymptote of f(x) = 1/(x + 1)?",
      options: ["y = 0", "y = 1", "x = 0", "x = 1"],
    },
    {
      question: "Factor completely: x² + 5x + 6",
      options: [
        "(x + 2)(x + 3)",
        "(x - 2)(x - 3)",
        "(x + 1)(x + 6)",
        "(x + 1)(x + 5)",
      ],
    },
    {
      question: "Solve for x: log₂(x) = 5",
      options: ["32", "25", "10", "16"],
    },
    {
      question: "Find dy/dx if y = x⁴ - 3x² + 2",
      options: ["4x³ - 6x", "x³ - 6x", "3x² - 2", "4x² - 6"],
    },
    {
      question: "What is the slope of the tangent line to y = x² at x = 2?",
      options: ["4", "2", "8", "1"],
    },
    {
      question: "Evaluate: ∫ (3x² + 2x) dx",
      options: ["x³ + x² + C", "x² + x + C", "3x + 2 + C", "3x³ + 2x² + C"],
    },
    {
      question: "What is the limit as x→∞ of 1/x?",
      options: ["0", "∞", "1", "Undefined"],
    },
    {
      question: "Simplify: (x³y⁻²)²",
      options: ["x⁶/y⁴", "x⁶y²", "x⁹/y⁴", "x⁵/y²"],
    },
    {
      question: "Convert 270° to radians.",
      options: ["3π/2", "π", "π/2", "2π"],
    },
    {
      question: "What is sin²(x) + cos²(x)?",
      options: ["1", "0", "2", "sin(x)"],
    },
    {
      question: "Find the derivative of f(x) = cos(x)",
      options: ["-sin(x)", "sin(x)", "cos(x)", "-cos(x)"],
    },
    {
      question: "Evaluate ∫ e^x dx",
      options: ["e^x + C", "x*e^x + C", "ln|x| + C", "1/x + C"],
    },
    {
      question: "Find the x-intercepts of y = x² - 4",
      options: ["x = ±2", "x = 0", "x = 4", "x = -4"],
    },
    {
      question: "Differentiate: f(x) = x^½",
      options: ["1/(2√x)", "2√x", "√x", "1/x"],
    },
    {
      question: "What is the integral of cos(x)?",
      options: ["sin(x) + C", "-sin(x) + C", "cos(x) + C", "-cos(x) + C"],
    },
    {
      question: "What is the solution to e^x = 1?",
      options: ["x = 0", "x = 1", "x = -1", "x = e"],
    },
    {
      question: "Solve for x: ln(x) = 2",
      options: ["x = e²", "x = 2e", "x = ln(2)", "x = 1"],
    },
    {
      question: "If y = x⁵, what is dy/dx?",
      options: ["5x⁴", "x⁴", "5x", "x⁵"],
    },
    {
      question: "Find the domain of f(x) = ln(x - 1)",
      options: ["x > 1", "x ≥ 1", "x > 0", "x ≥ 0"],
    },
    {
      question: "What is the range of y = log(x)?",
      options: ["All real numbers", "x > 0", "x ≠ 0", "x ≥ 0"],
    },
    {
      question: "Evaluate lim(x→3) (x² - 9)/(x - 3)",
      options: ["6", "3", "9", "0"],
    },
    {
      question: "What is the derivative of f(x) = tan(x)?",
      options: ["sec²(x)", "-sin(x)", "sec(x)", "cos²(x)"],
    },
    {
      question: "Find ∫ sec²(x) dx",
      options: ["tan(x) + C", "sec(x) + C", "-tan(x) + C", "cot(x) + C"],
    },
    {
      question: "What is the value of log₁₀(1)?",
      options: ["0", "1", "10", "Undefined"],
    },
    {
      question: "Simplify: (x⁴)^(1/2)",
      options: ["x²", "x", "x⁸", "x⁶"],
    },
    {
      question: "Solve: 3x² = 12",
      options: ["x = ±2", "x = ±4", "x = 2", "x = -2"],
    },
    {
      question: "What is the derivative of f(x) = ln(3x)?",
      options: ["1/x", "1/(3x)", "3/x", "ln(3)"],
    },
    {
      question: "Solve for x: √(2x + 3) = 5",
      options: ["x = 11", "x = 10", "x = 9", "x = 12"],
    },
    {
      question: "What’s the integral of 2x·e^(x²) dx?",
      options: ["e^(x²) + C", "2x·e^(x²) + C", "x²·e^(x²) + C", "ln|x²| + C"],
    },
  ];

  // Start the quiz
  const handleStartQuiz = () => {
    setStarted(true);
    setVisitedQuestions([0]); // Mark first question as visited when starting
  };

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && started && !quizCompleted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && started && !quizCompleted) {
      setQuizCompleted(true);
    }
  }, [timeLeft, started, quizCompleted]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle option selection
  const handleOptionSelect = (optionIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      const nextQuestionIndex = currentQuestion + 1;
      setCurrentQuestion(nextQuestionIndex);

      // Add to visited questions if not already visited
      if (!visitedQuestions.includes(nextQuestionIndex)) {
        setVisitedQuestions([...visitedQuestions, nextQuestionIndex]);
      }
    }
  };

  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Navigate to specific question
  const handleQuestionButtonClick = (questionIndex) => {
    setCurrentQuestion(questionIndex);

    // Add to visited questions if not already visited
    if (!visitedQuestions.includes(questionIndex)) {
      setVisitedQuestions([...visitedQuestions, questionIndex]);
    }
  };

  // Handle quiz submission
  const handleFinishQuiz = () => {
    setQuizCompleted(true);
  };

  // Render timer with appropriate styling
  const renderTimer = () => {
    const isWarning = timeLeft < 300; // Warning when less than 5 minutes

    return (
      <div className="timer-container">
        <span className={`timer-text ${isWarning ? "timer-warning" : ""}`}>
          Time Remaining: {formatTime(timeLeft)}
        </span>
      </div>
    );
  };

  // Render question navigation buttons
  const renderQuestionButtons = () => {
    return (
      <div className="questions-grid">
        {questions.map((question, index) => (
          <button
            key={index}
            className={`question-button 
              ${visitedQuestions.includes(index) ? "visited" : ""} 
              ${selectedAnswers[index] !== null ? "answered" : ""}
              ${currentQuestion === index ? "current" : ""}`}
            onClick={() => handleQuestionButtonClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  // Render start screen
  if (!started) {
    return (
      <div className="quiz-container start-screen">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/6/6a/KUSTAR_Logo.jpg"
          alt="Khalifa University Logo"
          className="university-logo"
        />
        <h1 className="quiz-title">Khalifa University Admission Test</h1>
        <p className="quiz-subtitle">
          You will have 90 minutes to complete 60 questions.
        </p>
        <button className="start-button" onClick={handleStartQuiz}>
          Start Test
        </button>
      </div>
    );
  }

  // Render quiz completion screen
  if (quizCompleted) {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/6/6a/KUSTAR_Logo.jpg"
            alt="Khalifa University Logo"
            className="university-logo"
          />
          <h1 className="quiz-title">Khalifa University Admission Test</h1>
        </div>

        <div className="quiz-completed">
          <h2 className="completion-message">Test Completed!</h2>
          <p className="completion-details">
            The test results will be sent after 10 working days.
          </p>
          <p className="completion-details">
            Thank you for taking the Khalifa University Admission Test.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/6/6a/KUSTAR_Logo.jpg"
          alt="Khalifa University Logo"
          className="university-logo"
        />
        <h1 className="quiz-title">Khalifa University Admission Test</h1>
        <p className="quiz-subtitle">
          Please answer all 60 questions within the given time.
        </p>
        {renderTimer()}
      </div>

      <div className="question-container">
        <div className="question-number">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className="question-text">
          {questions[currentQuestion].question}
        </div>

        <div className="options-container">
          {questions[currentQuestion].options.map((option, index) => (
            <div
              key={index}
              className={`option ${
                selectedAnswers[currentQuestion] === index ? "selected" : ""
              }`}
              onClick={() => handleOptionSelect(index)}
            >
              <div className="option-label">
                {String.fromCharCode(65 + index)}
              </div>
              <div className="option-text">{option}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="navigation-container">
        <button
          className="nav-button"
          onClick={handlePrevQuestion}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>

        <button className="finish-button" onClick={handleFinishQuiz}>
          Finish Test
        </button>

        <button
          className="nav-button"
          onClick={handleNextQuestion}
          disabled={currentQuestion === questions.length - 1}
        >
          Next
        </button>
      </div>

      {renderQuestionButtons()}
    </div>
  );
};

export default Quiz;
