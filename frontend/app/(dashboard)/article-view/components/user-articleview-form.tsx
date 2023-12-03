"use client";
import Image from "next/image";
import {FiBookmark} from 'react-icons/fi';
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
}

interface Props {
    article: Article;
}

interface postCardComponent {
    (props: Props): JSX.Element;
}
const ArticleView = ({ article }: Props) => {
    return(
        <div className="flex flex-col justify-start items-center min-h-screen mx-auto w-[700px] py-8 m-auto">
            <div className="container mx-auto">
                <h1 className="font-bold text-5xl mb-4">{article.title}</h1>
                <div className="flex gap-[0.4rem] items-center mb-3">
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
                    <div className="flex items-center">
                        <p className="font-bold mr-2">·</p>
                        <span className="text-sm text-gray-400">{article.date_created}</span>
                    </div>
                    <span className="cursor-pointer ml-auto flex items-center px-2">
                        <FiBookmark className="h-5 w-5" />
                    </span>
                </div>

                <img
                    src={article.author.profile_picture}
                    alt={`${article.author.username}'s profile picture`}
                    className="object-cover"
                    width={700}
                    height={700}
                />
                <p
                className="text-gray-700 mt-7 text-justify"
                dangerouslySetInnerHTML={{ __html: article.content }}
                ></p>
            </div>
        </div>
    )
}

export default ArticleView;