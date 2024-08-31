import { File, PiggyBank } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <File className="stroke h-11 w-11 stroke-amber-500 stroke-[1.5]" />
      <span className="bg-gradient-to-r from-amber-400 to-orange-800 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        WpAccPac
      </span>
    </div>
  );
};
