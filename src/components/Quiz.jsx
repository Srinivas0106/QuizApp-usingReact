import React, { useState, useRef } from "react";
import "./Quiz.css";
import data from "../assets/data";

export default function Quiz() {
    let [index,setIndex] = useState(0);
    let [ques,setQuestion] = useState(data[index]);
    let [lock,setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result,setResult] = useState(false);
    // Creating useRef for each option
    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);

    let option_array =  [option1,option2,option3,option4];

    const checkAns = (e, ans) => {
        if (lock === false) {
            if (ques.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev+1);
            } else {
                e.target.classList.add("wrong");
                option_array[ques.ans - 1].current.classList.add("correct"); // Now correct answer is highlighted
                setLock(true);

            }
            
        }
    };


    const next = () => {
        if(lock === true) {
            if(index === data.length-1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index])
            setLock(false)
            option_array.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion[data[0]]
        setScore(0)
        setLock(false)
        setResult(false)

    }
    
  return (
    <>
      <div className="container">
        <h1> QUIZ APP</h1>
        <hr />

        {result?<></> : <> 
        <h2>{index+1} . {ques.question} </h2>

        <ul>
          <li ref = {option1} onClick={(e) => {checkAns(e,1)}} >{ques.option1}</li>
          <li ref = {option2} onClick={(e) => {checkAns(e,2)}}>{ques.option2}</li>
          <li ref = {option3} onClick={(e) => {checkAns(e,3)}}>{ques.option3}</li>
          <li ref = {option4} onClick={(e) => {checkAns(e,4)}}>{ques.option4}</li>
        </ul>

        <button onClick={next}>Next</button>
        <div className="index"> {index+1} of {data.length} questions</div>

        </>}

        {result ? <>
            <h2> Your scored {score} out of {data.length}</h2>
            <button onClick={reset}>Reset</button>
        </>:<></>}
      </div>
    </>
  );
}
