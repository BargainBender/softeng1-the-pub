"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import PostCard from '@/app/(dashboard)/articles/components/user-articles-form';

interface UserData {
  name: string;
  username: string;
  profile_picture: string;
  is_active: boolean;
  followers: [];
  following: [];
  bio: string;
  article: ArticleData;
}
interface ArticleData {
  id: number;
  title: string;
  content_preview: string;
  date_created: string;
  last_edited: string;
  author: Author;
  url: string;
}

interface Author {
  id: number;
  username: string;
  name: string;
  profile_picture: string;
  is_active: boolean;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [articleData, setArticleData] = useState<ArticleData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const userResponse = await axios.get<UserData>(
            'http://localhost:8000/settings/profile/',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setUserData(userResponse.data);

          // Fetch user's articles data after fetching user data
          const articlesResponse = await axios.get<ArticleData[]>(
            `http://localhost:8000/api/${userResponse.data.username}/articles/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setArticleData(articlesResponse.data);
          console.log("User Data:", userResponse.data);
          console.log("Article Data:", articlesResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    const intervalId = setInterval(fetchData, 1000); // Fetch data every 1 second

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [router]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="prose mx-auto max-w-2xl mt-16">
      <div className="flex flex-col">
        <div className="flex items-center flex-col justify-center">
          <Avatar className="w-4/12 h-full">
            <AvatarImage
              src={userData.profile_picture}
              alt={`@%${userData.name}`}
              className="rounded-full"
            />
            <AvatarFallback>{userData.name}</AvatarFallback>
          </Avatar>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-3">
            {userData.name}
          </h2>
          <h3 className="scroll-m-20 text-2xl font-normal tracking-tight">
            {userData.username}
          </h3>
        </div>
        <div className="flex flex-row items-center justify-center mx-auto space-x-4">
          <div className="flex-1">
            <small>{userData.followers.length} Followers</small>
          </div>
          <div>
            <small className="flex-1">{userData.following.length} Following</small>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p className="leading-7 [&:not(:first-child)]:mt-6">{userData.bio}</p>
        </div>
      </div>

      <Separator className="w-max-prose mt-6" />

      <div className="max-w-2xl items-center space-x-2 justify-center space-y-2">
        <div className="flex items-center justify-center space-y-2 my-2 bg-slate-100 rounded-ee-full rounded-es-full">
          <h3 className="scroll-m-20 text-4xl m-4 tracking-tight">
            My Articles
          </h3>
        </div>
        {/* </div><div className="flex flex-row items-center justify-center mx-auto space-x-4"> */}
        <div className="flex flex-col gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols items-center">
          {articleData.map((article) => (
            <PostCard key={article.id} article={article} isProfilePage={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
