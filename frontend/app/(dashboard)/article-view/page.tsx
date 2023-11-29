"use client";
import Image from "next/image";
import { FiBookmark } from 'react-icons/fi';
import ArticleView from '@/app/(dashboard)/users/[userId]/articles/components/user-articleview-form';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
    content: string;
    date_created: string;
    last_edited:string;
    url: string;
}

interface Props {
    article: Article;
}


export default function ArticlesView({
    searchParams,}:{
        searchParams:{
            viewurl: string;
        };
    }
) {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000' + searchParams.viewurl)
            .then((response) => response.json())
            .then((data: Article | Article[]) => {
                if (Array.isArray(data)) {
                    setArticles(data);
                } else {
                    setArticles([data]);
                }
            })
            .catch((error) => console.error('Error fetching articles:', error));
    }, []);

    return (
        <div className="container m-auto pb-48">
            
            <div className="">
                <div className="flex flex-col gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols">
                    {articles.map((article: Article) => (
                        <ArticleView key={article.id} article={article} />
                    ))}
            </div>

            </div>
        </div>
    );
}
