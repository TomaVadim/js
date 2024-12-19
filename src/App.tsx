import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { motion, useScroll } from "framer-motion";
import { css } from "@emotion/css";

interface Area {
  item: string;
  isCompleted?: boolean;
}

interface Elements {
  [key: string]: Area;
}

const elements: Elements = {
  area_1: {
    item: "item1",
    isCompleted: true,
  },
  area_2: {
    item: "item2",
    isCompleted: false,
  },
  area_3: {
    item: "item3",
    isCompleted: true,
  },
  area_4: {
    item: "item4",
    isCompleted: true,
  },
};

function App() {
  const [count, setCount] = useState(0);
  const { scrollYProgress } = useScroll();

  const checkIfAllAreasIsCompleted = (elements: Elements) => {
    return Object.values(elements).every((area) => {
      return area.isCompleted;
    });
  };

  // const checkIfSomeAreasIsCompleted = (elements: Elements) => {
  //   return Object.values(elements).some((area) => {
  //     return area.isCompleted;
  //   });
  // };

  function checkTimeExecution(cb: () => void): number {
    const start = new Date().getTime();
    for (let i = 0; i < 1_000_000; i++) {
      cb();
    }
    const end = new Date().getTime();

    return end - start;
  }

  const timeExecution = checkTimeExecution(() => {
    checkIfAllAreasIsCompleted(elements);
  });

  console.log(`Time execution: ${timeExecution}ms`);

  return (
    <>
      <motion.div
        className={css({
          backgroundColor: "red",
          height: "10px",
          position: "fixed",
          width: "200%",
          right: 0,
          top: 0,
        })}
        style={{ scaleX: scrollYProgress }}
      />

      <div
        className={css({
          height: "300vh",
        })}
      >
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
