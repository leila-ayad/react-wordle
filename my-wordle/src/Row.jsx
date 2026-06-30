import Cell from "./Cell.jsx";
import "./Row.css";

export default function Row({ word = "" }) {
  return (
    <div className="row">
      {Array.from({ length: 5 }).map((_, i) => (
        <Cell key={i} letter={word[i]} />
      ))}
    </div>
  );
}
