import ButtonLink from "../../elements/ButtonLink";

const AuthButtons = () => (
  <>
    <ButtonLink text={"Log In"} link={"/login"} />
    <ButtonLink text={"Sign Up"} link={"/signup"} />
  </>
);

export default AuthButtons;
