import { useContext } from "react";
import AppContext from "../../context/AppContext";

const Logout = () => {
  const { logout } = useContext(AppContext);

  return (
    <div>
      <button onClick={logout}>LOGOUT</button>
    </div>
  );
};

export default Logout;
