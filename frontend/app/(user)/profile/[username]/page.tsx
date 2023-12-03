"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface User {
  username: string;
  name: string;
  profile_picture: string;
  is_active: boolean;
  followers: string[]; // Change the type as needed
  following: string[]; // Change the type as needed
  bio: string;
  articles?: Article[]; // Assuming articles is an array of Article
}
interface Article {
  id: number;
  title: string;
  content_preview: string;
  date_created: string;
  last_edited: string;
  author: {
    id: number;
    username: string;
    name: string;
    profile_picture: string;
    is_active: boolean;
  };
  url: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User>({
    username: "",
    name: "",
    profile_picture: "",
    is_active: true,
    followers: [],
    following: [],
    bio: "",
    articles: [],
  });
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const getUserData = async () => {
      const authToken = localStorage.getItem("authToken");
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
        console.log(data);
        setUser(data);

        
        // Fetch user's articles
        const articlesResponse = await fetch(
          `https://localhost:8000/api/${data.username}/articles/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const articlesData = await articlesResponse.json();
        console.log(articlesData);
        setArticles(articlesData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  return (
    <div className="prose mx-auto max-w-2xl mt-16">
      <div className="flex flex-col">
        <div className="flex items-center flex-col justify-center">
          <Avatar className="w-4/12 h-full">
            <AvatarImage
              src={user.profile_picture}
              alt={`@%${user.name}`}
              className="rounded-full"
            />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-3">
            {user.name}
          </h2>
          <h3 className="scroll-m-20 text-2xl font-normal tracking-tight">
            {user.username}
          </h3>
        </div>
        <div className="flex flex-row items-center justify-center mx-auto space-x-4">
          <div className="flex-1">
            <small>{user.followers.length} Followers</small>
          </div>
          <div>
            <small className="flex-1">{user.following.length} Following</small>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p className="leading-7 [&:not(:first-child)]:mt-6">{user.bio}</p>
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
          {/* Map over user.articles and render each article */}
          {user.articles &&
            user.articles.map((article) => (
              <div key={article.id}>
                {/* Render the article details */}
                <h4>{article.title}</h4>
                <p>{article.content_preview}</p>
                {/* Add other article details as needed */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
