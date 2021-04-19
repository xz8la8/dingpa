import React from "react";

export default () => {
  return (
    <div>
      <h4>child01-child</h4>
      <button
        onClick={() => {
          window.rspaHistory.push("/child02/child");
        }}
      >
        跳到child02-child
      </button>
    </div>
  );
};
