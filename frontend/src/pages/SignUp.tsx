import { useState } from "react";
import { LuLink } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Signup successful! Please login.");
          navigate("/login");
        } else {
          alert("Signup failed: " + data.message);
        }
      })
      .catch((err) => {
        console.error("Signup error:", err);
        alert("Signup failed. Please try again.");
      });
  };

  return (
    <div className="flex items-center justify-center h-full flex-col gap-4">
      <nav className="fixed top-0 bg-white/10 h-14 w-full flex items-center justify-between px-4">
        <div className="flex items-center">
          <div className="bg-white/70 size-9 rounded-full flex items-center justify-center mr-2">
            <LuLink className="size-4 text-black/80" />
          </div>
          <span className="font-semibold tracking-wider">Secure Vault</span>
        </div>
      </nav>
      <main>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold font-sans text-black mb-6">
            Create Your Account
          </h1>
          <form className="flex flex-col gap-4 w-80">
            <input
              type="text"
              placeholder="Username"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              type="submit"
              className="bg-black/80 text-white px-4 py-2 rounded-md hover:bg-black transition-colors duration-300 font-semibold tracking-wider"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </form>
          <div>
            <p className="text-sm text-gray-900 mt-4">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-black font-semibold hover:underline"
              >
                Login here
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
