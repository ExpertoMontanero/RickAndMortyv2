import "../styles/button.css";
import { useNavigate } from "react-router-dom";
export default function BackButton({ props }) {
  const navigate = useNavigate();
  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      ↩ {props.name}
    </button>
  );
}
