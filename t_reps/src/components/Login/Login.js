import { useState, useContext } from "react";
import AppContext from "../../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AppContext);

  const handleClick = () => {
    login(email, password);
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          type="text"
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleClick}>LOGIN</button>
    </div>
  );
};

export default Login;
