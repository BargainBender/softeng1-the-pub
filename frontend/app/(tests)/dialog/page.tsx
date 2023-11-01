"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InputForm } from "@/components/ui/dialogues/components/profile-edit-form";
import { useState } from "react";




export default function DialogTest() {
  let [open, setOpen ] = useState(false);


  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="pub">Profile Information</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Profile Information</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you{"'"}re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 mx-7">
              <div className="grid grid-rows-2 grid-flow-col gap-4">
                <div className="row-span-2">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="rounded-full"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="col-span-2">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium leading-none text-pub hover:text-pub-darker hover:bg-pub"
                  >
                    Update
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-sm font-medium leading-none text-red-500 hover:text-white hover:bg-destructive"
                  >
                    Remove
                  </Button>
                </div>
                <div className="row-span-1 col-span-2">
                    <p className="text-sm text-muted-foreground">
                        Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side
                    </p>
                </div>
              </div>
              <DialogClose>
             
              </DialogClose>
              <InputForm/> 
            </div>
            
              
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
