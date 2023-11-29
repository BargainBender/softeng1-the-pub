"use client";
import Image from "next/image";
import {FiBookmark} from 'react-icons/fi';
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
    content_preview: string;
    date_created: string;
    last_edited:string;
    url: string;
}

interface Props {
    article: Article;
}

const PostCard = ({ article }: Props) => {

    return (
        <div className="flex gap-2 w-[700px]">
            <div> 
                <Link href={{ pathname:"/article-view", query:{viewurl: article.url} }} key={article.id}>
                    <h1 className="font-bold text-2xl cursor-pointer">{article.title}</h1>
                </Link>
                <p className="text-gray-700 m-2">{article.content_preview}</p>

                <div className="flex gap-[0.4rem] my-3">
                    <div className="grid place-items-center rounded-full overflow-hidden h-[1.4rem] w-[1.4rem]">
                    <img
                        src={article.author.profile_picture}
                        alt={`${article.author.username}'s profile picture`}
                        className="object-cover"
                        width={40}
                        height={40}
                    />
                    </div>
                    
                    <div className="font-semibold">{article.author.username}</div>

                    <div className="flex items-center justify-between">
                        <p className="font-bold mr-2">·</p>
                        <span className="text-sm text-gray-400">{article.date_created}</span>
                    </div>

                    <span className="cursor-pointer ml-auto flex items-center px-2">
                        <FiBookmark className="h-5 w-5"/>
                    </span>
                </div>

                <span className="bg-gray-300 p-1.5 rounded-full text-[.7rem]">
                    Software Engineering
                </span>
            </div>

            <div className="object-cover min-w-[200px]">
                {/* <Image
                    src="/assets/Rick-PFP.jpg"
                    alt=""
                    className="object-cover"
                    width={200}
                    height={200}
                /> */}
                <img
                    src={article.author.profile_picture}
                    alt={`${article.author.username}'s profile picture`}
                    className="object-cover"
                    width={200}
                    height={200}
                />
            </div>
        </div>
    )
}

export default PostCard;
