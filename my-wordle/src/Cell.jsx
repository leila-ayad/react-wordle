import "./cell.css";

export default function Cell({ letter = "" }) {
  return <div className="cell">{letter}</div>;
}
