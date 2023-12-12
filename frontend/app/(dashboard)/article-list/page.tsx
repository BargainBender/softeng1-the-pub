'use client'
import React, { useEffect, useState } from 'react';
import PostCard from '@/app/(dashboard)/articles/components/user-articles-form'; // Check if the import path is correct
import PopularTags from '@/app/(dashboard)/articles/components/user-populartags-form'; // Check if the import path is correct

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
        .then((data: Article[]) => {
            setArticles(data);
            console.log('Articles: ', data); // Logging 'data' instead of 'articles'
        })
        .catch((error) => console.error('Error fetching articles:', error));
    }, []);

    return (
        <div className="container mx-auto pb-9">
            <div className="mb-10">
                <h1 className="text-6xl font-bold">Browse the latest topics</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-5"> {/* Adjusted the grid layout classes */}
                <div className="flex flex-col gap-3 lg:w-3/4">
                {articles.map((article) => (
                    <PostCard key={article.id} article={article} isProfilePage={false} />
                ))}
                </div>
                
                <div className="lg:w-1/4">
                <PopularTags />
                </div>
            </div>
        </div>
    );
}
