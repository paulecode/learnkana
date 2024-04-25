import { Toaster } from "@/components/ui/toaster";
import UserDropDownWrapper from "@/compounds/UserDropDown/UserDropDownWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full">
      <div>
        <UserDropDownWrapper />
      </div>
      {children}
      <Toaster />
    </div>
  );
}
