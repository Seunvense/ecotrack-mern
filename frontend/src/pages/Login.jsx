import AuthForm from "../components/AuthForm";
import axios from "axios";

export default function Login({ setUser }) {
  const handleLogin = async (data) => {
    const res = await axios.post(
      "https://ecotrack-mern.onrender.com/api/auth/login",
      data,
      { withCredentials: true }
    );
    setUser(res.data.user);
  };

  return (
    <AuthForm
      title="Welcome Back"
      fields={[
        {
          label: "Email",
          name: "email",
          type: "email",
          placeholder: "you@example.com",
        },
        {
          label: "Password",
          name: "password",
          type: "password",
          placeholder: "••••••••",
        },
      ]}
      onSubmit={handleLogin}
      buttonText="Login"
      link={{
        text: "Don't have an account?",
        label: "Register",
        to: "/register",
      }}
    />
  );
}
