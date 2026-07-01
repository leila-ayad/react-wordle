import "./Cell.css";

export default function Cell({ letter = "", letterState = "" }) {
  return <div className={`cell ${letterState}`}>{letter}</div>;
}
