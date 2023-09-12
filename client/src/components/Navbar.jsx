import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>
            Fitness Freak &nbsp; &nbsp;
            <FontAwesomeIcon icon={faDumbbell} />
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
