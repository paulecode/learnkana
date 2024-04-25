"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Prisma, User } from "@prisma/client";

export type SelectUser = Prisma.UserGetPayload<{
  select: { username: true; id: true };
}>;

const UserDropDown: React.FC<{
  user: SelectUser;
  outlogger: any;
  deleter: any;
}> = ({ user, outlogger, deleter }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{user.username}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Your account</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => outlogger()}>
            Log out
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => deleter()} className="text-red-400">
            Delete account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropDown;
