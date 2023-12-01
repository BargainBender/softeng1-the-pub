"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile: React.FC = () => {
  const [user, setUser] = useState({});

  // Might be using axios to get userData
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(
          "https://api.instagram.com/oauth/authorize",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer ACCESS_TOKEN",
            },
          }
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  function handleUserData() {}

  return (
    <div className="prose mx-auto max-w-2xl mt-16">
      <div className="flex flex-col">
        <div className="flex items-center flex-col justify-center">
          <Avatar className="w-4/12 h-full">
            <AvatarImage
              // Change this to dynamic image
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="rounded-full "
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-3">
            {/* Name */}
            Jace L. Gonzales
          </h2>
          <h3 className="scroll-m-20 text-2xl font-normal tracking-tight">
            {/* Username */}
            @heyitsjace
          </h3>
        </div>
        <div className="flex flex-row items-center justify-center mx-auto space-x-4">
          <div className="flex-1">
            {/* Follwers count */}
            <small>281 followers</small>
          </div>
          <div>
            {/* Following count */}
            <small className="flex-1">0 following</small>
          </div>
        </div>
      </div>

      <Separator className="w-max-prose mt-6" />

      <div className="max-w-2xl items-center space-x-2 justify-center space-y-2">
        <Tabs defaultValue="account" className="">
          <TabsList>
            <TabsTrigger value="account">Article</TabsTrigger>
            <TabsTrigger value="password">Threads</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
