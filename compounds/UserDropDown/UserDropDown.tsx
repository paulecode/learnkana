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
          <Button className="min-w-32" variant="outline">
            <span>{user.username}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-32">
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
