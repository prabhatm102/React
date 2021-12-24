import React, { Fragment, useState } from "react";

const Counter2 = () => {
  const [count, setCount] = useState(0);
  return (
    <Fragment>
      <div>Count:{count}</div>
      <button onClick={() => setCount(count + 1)}>Increase Functional</button>
    </Fragment>
  );
};

export default Counter2;
