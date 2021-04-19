import React from "react";

export default () => {
  return (
    <div>
      <h4>child02-child</h4>
      <button
        onClick={() => {
          window.__history.push("/child01/child");
        }}
      >
        跳到child01-child
      </button>
    </div>
  );
};
