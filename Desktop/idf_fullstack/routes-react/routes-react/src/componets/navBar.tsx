import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/sports">sports</Link>
      <Link to="/economy">economy</Link>
      <Link to="/login">login</Link>
    </nav>
  );
}