import { Toaster } from "@/components/ui/toaster";
import UserDropDownWrapper from "@/compounds/UserDropDown/UserDropDownWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh w-full flex-col">
      <div className="border-b border-gray-200 shadow">
        <UserDropDownWrapper />
      </div>
      <div className="flex grow flex-col overflow-y-auto">{children}</div>
      <Toaster />
    </div>
  );
}
