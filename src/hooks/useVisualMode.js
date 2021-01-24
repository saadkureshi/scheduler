import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (!replace) {
      setHistory(prevHistory => [...prevHistory, newMode]);
    }
    setMode(() => newMode);
    // const newHistory = [...history];
    // newHistory.push(newMode);
    // setHistory(newHistory)

    // setHistory([...history].push(newMode));
    // setHistory(prev => [...prev, newMode]);
  }
  // function back() {
  //   setMode()
  //   setHistory(prevHistory => {
  //     prevHistory.pop();
  //     return prevHistory;
  //   })
  // }

  // function back() {
  //   console.log("history is >>", history);
  //   console.log("history length is >>", history.length)
  //   if (history.length === 1) {
  //     console.log("im in the IF")
  //     setMode(history[0]);
  //   } else {
  //     console.log("IM IN THE ELSE")
  //     history.pop();
  //     setMode(history.pop())
  //     // setMode(history[length - 1]);
  //   }
  // }

    const back = () => {
      if (history.length === 1) return;
      let newHistory = history.slice(0, history.length - 1)
      setHistory([...newHistory])
      setMode(history[history.length - 2])
    };

    // function back() { 
    //   if (history.length > 1) {
    //     setHistory(history.slice(0, -1))
    //     setMode(history[history.length - 2])
    //   } 
    // }

  return { mode, transition, back };
};

// function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);
//   const transition = (newMode, replace = false) => {
//     setMode(newMode);
//     if (!replace) {
//       const newHistory = [...history];
//       newHistory.push(newMode);
//       setHistory(newHistory)
//     }
//   };
//     const back = () => {
//       if (history.length > 1) {
//         history.pop();
//       }
//       setMode(history[history.length - 1]);
//     }
//     return { mode, transition, back }
//   }
//   export default useVisualMode