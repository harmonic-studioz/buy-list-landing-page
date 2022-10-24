import NavWeb from "./NavWeb";
import NavMobile from "./NavMobile";
//import NavM from './NavM'

const NavBar = (props) => {
  return (
    <>
      <NavWeb className={props.className} handleSignUp={props.handleSignUp} showModal={props.showModal} />
      <NavMobile className={props.className} handleSignUp={props.handleSignUp} showModal={props.showModal} />
    </>
  );
};

export default NavBar;
