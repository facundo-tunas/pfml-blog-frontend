import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ButtonLink = ({ link, text }) => {
  const navigate = useNavigate();
  function handleClick() {
    navigate(link);
  }

  return <button onClick={handleClick}>{text}</button>;
};

ButtonLink.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
};

export default ButtonLink;
