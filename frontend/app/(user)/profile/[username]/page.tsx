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
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch(
          "https://localhost:8000/settings/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
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
              src={"user.profile"}
              alt="@shadcn"
              className="rounded-full "
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-3">
            {"user.name"}
          </h2>
          <h3 className="scroll-m-20 text-2xl font-normal tracking-tight">
            {"user.username"}
          </h3>
        </div>
        <div className="flex flex-row items-center justify-center mx-auto space-x-4">
          <div className="flex-1">
            <small>{"user.followers"}</small>
          </div>
          <div>
            <small className="flex-1">{"user.following"}</small>
          </div>
        </div>
      </div>

      <Separator className="w-max-prose mt-6" />

      <div className="max-w-2xl items-center space-x-2 justify-center space-y-2">
      <div className="flex items-center justify-center space-y-2 my-2">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Written Articles
        </h3>
        </div>
        <div className="flex flex-row items-center justify-center mx-auto space-x-4">
         
            {"user.articles.map()"}
         
        </div>
      </div>
    </div>
  );
};

export default Profile;
