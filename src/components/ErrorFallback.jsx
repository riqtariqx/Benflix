import React from "react";

const ErrorFallback = ({ error, reset }) => (
  <div className="error-fallback">
    <h2>Oops! Something went wrong 😢</h2>
    <p>{error.message}</p>
    {reset && <button onClick={reset}>Try Again</button>}
  </div>
);

export default ErrorFallback;