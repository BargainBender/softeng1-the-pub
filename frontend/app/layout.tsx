"use client"
import './globals.css'
import type { Metadata } from 'next'
import NavigationMenuBar from '@/components/ui/navigation/nav-bar'
import { Toaster } from "@/components/ui/toaster"
import axios from 'axios';

import merriWeather from './fonts/merriweather'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/ui/navigation/footer'


// export const metadata: Metadata = {
//   title: 'The Pub',
//   description: 'Come for the Stories, Stay for the Community!',
// }

interface UserData {
  name: string;
  username: string;
  profile_picture: string;
  is_active: boolean;
  followers: number;
  following: number;
  bio: string;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await axios.get<UserData>(
            'http://localhost:8000/settings/profile/',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserData(response.data);
          setIsLoggedIn(true);
          console.log('User Data:', response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setIsLoggedIn(false);
          router.push('/sign-in');
        }
      } else {
        setIsLoggedIn(false);
        console.log('No authentication token found.');
        router.push('/sign-in');
      }
    };

    fetchData();
  }, [router]);

  return (
    <html lang="en">
      <body className={merriWeather.className}>
        <NavigationMenuBar userData={userData}/>
          {children}
          
        <Toaster />
      </body>
      <footer>
      <Footer />
      </footer>
      
    </html>
  )
}