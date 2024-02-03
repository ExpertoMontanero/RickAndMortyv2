import "../styles/button.css";
import { useNavigate } from "react-router-dom";
interface ButtonProps {
  name: string;
}
export default function Button({ name }: ButtonProps) {
  const navigate = useNavigate();
  return (
    <button className="button" onClick={() => navigate(-1)}>
      ↩ {name}
    </button>
  );
}
