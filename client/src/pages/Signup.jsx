import { useState } from "react";
import { useSignup } from "../hooks/useSingup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const { signUp, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signUp(email, password);

    console.log(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>
      <label>Email: </label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password: </label>
      <input
        type="password"
        onChange={(e) => setPasword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading} type="submit">
        Sign Up
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
