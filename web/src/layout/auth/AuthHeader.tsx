import Logo from "@/assets/logo.svg";
import { Link } from "@tanstack/react-router";

export const AuthHeader = () => {
  return (
    <div className="relative z-20">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="size-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center transition-transform group-hover:scale-105">
          <img src={Logo} alt="Prosper Logo" className="size-32" />
        </div>
        <span className="tracking-tighter uppercase font-bold text-2xl">
          Prosper
        </span>
      </Link>
    </div>
  );
};
