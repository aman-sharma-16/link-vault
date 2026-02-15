import { LuLink } from "react-icons/lu";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-full flex-col gap-4">
      <nav className="fixed top-0 bg-white/10 h-14 w-full flex items-center justify-between px-4">
        <div className="flex items-center">
          <div className="bg-white/70 size-9 rounded-full flex items-center justify-center mr-2">
            <LuLink className="size-4 text-black/80" />
          </div>
          <span className="font-semibold tracking-wider">Secure Vault</span>
        </div>
        <Link to={localStorage.getItem("token") ? "/upload" : "/login"}>
          <button className="bg-black/80 text-white px-4 py-1 rounded-md w-24 h-7 hover:bg-black transition-colors duration-300 flex items-center justify-center text-xs font-semibold tracking-wider">
            Login
          </button>
        </Link>
      </nav>
      <h1 className="text-6xl font-bold font-sans text-black">
        Welcome to Secure Vault
      </h1>
      <h3 className="text-center text-lg font-semibold">
        Your one-stop solution for secure password management. Store, manage,{" "}
        <br />
        and access your passwords with ease and confidence.
      </h3>
    </div>
  );
};

export default Home;
