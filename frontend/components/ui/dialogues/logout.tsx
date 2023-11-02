import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../button";

export default function Logout() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"pub"}>Open</Button>
        </DialogTrigger>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to Logout?
          </DialogDescription>
        </DialogHeader>
        <Button variant={"destructive"}>
            Confirm
        </Button>
        <Button variant={"secondary"}>
            Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
}
