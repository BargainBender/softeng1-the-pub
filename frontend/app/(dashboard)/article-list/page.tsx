"use client";

import { useEffect, useState } from 'react';
import PostCard from '@/app/(dashboard)/articles/components/user-articles-form';
import PopularTags from "@/app/(dashboard)/articles/components/user-populartags-form";

interface Author {
    id: number;
    username: string;
    name: string;
    profile_picture: string;
    is_active: boolean;
}

interface Article {
    id: number;
    title: string;
    author: Author;
    content_preview: string;
    date_created: string;
    last_edited: string;
    url: string;
}

export default function Articles() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/articles')
        .then((response) => response.json())
        .then((data: Article[]) => setArticles(data))
        .catch((error) => console.error('Error fetching articles:', error));
    }, []);



    return (
        <div className="container m-auto pb-48">
        <div className="mb-10">
            <h1 className="text-6xl font-bold">Browse the latest topics</h1>
        </div>

        <div className="flex h-screen gap-52">
            <div className="flex flex-col gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols">
            {articles.map((article) => (
                <PostCard key={article.id} article={article} />
            ))}
            </div>

            <div className="">
            <PopularTags/>
            </div>
        </div>
        </div>
    );
}
