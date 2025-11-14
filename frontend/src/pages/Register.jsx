import AuthForm from "../components/AuthForm";
import axios from "axios";

export default function Register({ setUser }) {
  const handleRegister = async (data) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      data,
      {
        withCredentials: true,
      }
    );
    setUser(res.data.user);
  };

  return (
    <AuthForm
      title="Create Account"
      fields={[
        { label: "Name", name: "name", type: "text", placeholder: "John Doe" },
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
      onSubmit={handleRegister}
      buttonText="Register"
      link={{ text: "Already have an account?", label: "Login", to: "/login" }}
    />
  );
}
