"use client";

import type { FC } from "react";
import { memo, useState } from "react";

const TARGETS = ["20", "19", "18", "17", "16", "15", "bull"] as const;
type Target = (typeof TARGETS)[number];

const Presenter: FC = () => {
  const [scores, setScores] = useState<{
    [key in Target]: { marksCount: number; throwsCount: number };
  }>({
    20: { marksCount: 0, throwsCount: 0 },
    19: { marksCount: 0, throwsCount: 0 },
    18: { marksCount: 0, throwsCount: 0 },
    17: { marksCount: 0, throwsCount: 0 },
    16: { marksCount: 0, throwsCount: 0 },
    15: { marksCount: 0, throwsCount: 0 },
    bull: { marksCount: 0, throwsCount: 0 },
  });

  const handleChange = (
    target: Target,
    difference: number,
    mode: "increment" | "decrement" = "increment"
  ) => {
    setScores((prevScores) => ({
      ...prevScores,
      [target]: {
        marksCount:
          mode === "increment"
            ? prevScores[target].marksCount + difference
            : prevScores[target].marksCount - difference,
        throwsCount: prevScores[target].throwsCount + 1,
      },
    }));
  };

  return (
    <div>
      <style>
        {`
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: center;
          }
          th {
            background-color: #f2f2f2;
          }
        `}
      </style>
      <table>
        <thead>
          <tr>
            <th>TARGET</th>
            <th>CURRENT MARK</th>
            <th>CURRENT FORK</th>
            <th>1MARK</th>
            <th>2MARK</th>
            <th>3MARK</th>
            <th>MISS</th>
          </tr>
        </thead>
        <tbody>
          {TARGETS.map((target) => (
            <tr key={target}>
              <td>{target}</td>
              <td>{scores[target].marksCount}</td>
              <td>{scores[target].throwsCount}</td>
              <td>
                <button
                  disabled={!(scores[target].marksCount < 10)}
                  onClick={() => handleChange(target, 1)}
                >
                  Count!
                </button>
              </td>
              <td>
                <button
                  disabled={!(scores[target].marksCount < 10)}
                  onClick={() => handleChange(target, 2)}
                >
                  Count!
                </button>
              </td>
              <td>
                <button
                  disabled={!(scores[target].marksCount < 10)}
                  onClick={() => handleChange(target, 3)}
                >
                  Count!
                </button>
              </td>
              <td>
                <button
                  disabled={!(scores[target].marksCount < 10)}
                  onClick={() => handleChange(target, 0)}
                >
                  Count!
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form>
        <input type="number" name="target-20" value={scores[20].throwsCount} />
        <input type="number" name="target-19" value={scores[19].throwsCount} />
        <input type="number" name="target-18" value={scores[18].throwsCount} />
        <input type="number" name="target-17" value={scores[17].throwsCount} />
        <input type="number" name="target-16" value={scores[16].throwsCount} />
        <input type="number" name="target-15" value={scores[15].throwsCount} />
        <input
          type="number"
          name="target-bull"
          value={scores.bull.throwsCount}
        />
        <input type="submit" value="Submit!" />
      </form>
    </div>
  );
};

export const InGamePage = memo(Presenter);
