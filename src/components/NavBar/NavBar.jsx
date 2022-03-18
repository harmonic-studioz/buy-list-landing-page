import NavWeb from "./NavWeb";
import NavMobile from "./NavMobile";
//import NavM from './NavM'

const NavBar = (props) => {
  return (
    <>
      <NavWeb className={props.className} />
      <NavMobile className={props.className} />
    </>
  );
};

export default NavBar;
