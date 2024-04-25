import { Toaster } from "@/components/ui/toaster";
import UserDropDown from "@/compounds/UserDropDown/UserDropDown";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full">
      <div>
        <UserDropDown />
      </div>
      {children}
      <Toaster />
    </div>
  );
}
