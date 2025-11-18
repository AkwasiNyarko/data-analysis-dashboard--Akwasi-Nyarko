import React from "react";
import MockAIChatSolution from "../MockAIChatSolution";
import { BrokenNullProperty, BrokenFailedFetch } from "../broken/BrokenExamples";
import ErrorBoundary from "../ErrorBoundary";
import LoadingExample from "../LoadingExample";
import Performance from "../Performance";


const Week6Live = () => {
    return (
        <div>
            <h1>Week 6 Live Demo</h1>
            <p>This is the content for Week 6 Live Demo.</p>
             <MockAIChatSolution />
        <ErrorBoundary>
            {/* <BrokenNullProperty/> */}
            <BrokenFailedFetch/>
        </ErrorBoundary>
        <LoadingExample />
        <Performance />
        </div>
    );
}
export default Week6Live;