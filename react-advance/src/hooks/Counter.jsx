import React, { Fragment, useState } from "react";
import useDocumentTitle from "./useDocumentTitle";

const Counter = () => {
  const result = useState(0); // Index 0 of useState contains value and Index 1 contains fuunction
  const count = result[0];
  const setCount = result[1];

  const [name, setName] = useState("");

  useDocumentTitle(`${name} has clicked ${count} times.`);
  // useEffect(() => {
  //   document.title = `${name} has clicked ${count} times.`;
  //   return () => {
  //     console.log("Cleanup!");
  //   };
  // }, [count, name]);

  return (
    <Fragment>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      {name} has clicked {count} times.
      <br />
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </Fragment>
  );
};

export default Counter;
