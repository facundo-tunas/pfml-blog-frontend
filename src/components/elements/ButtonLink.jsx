import PropTypes from "prop-types";

const ButtonLink = ({ link, text }) => {
  function handleClick() {
    window.location.href = link;
  }

  return <button onClick={handleClick}>{text}</button>;
};

ButtonLink.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
};

export default ButtonLink;
