import Image from "next/image";
import { FiBookmark, FiEdit, FiTrash2, FiMoreVertical } from 'react-icons/fi';
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
    last_edited: string;
    url: string;
}

interface Props {
    article: Article;
}

interface PostCardProps extends Props {
    isProfilePage: boolean; // Prop indicating if it's a profile page
}

const PostCard = ({ article, isProfilePage }: PostCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleUnhover = () => {
        setIsHovered(false);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };

    const deleteArticle = async () => {
        try {
            const token = localStorage.getItem("authToken");

            const response = await fetch(`http://localhost:8000${article.url}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                console.log('Article deleted successfully');
            } else {
                const errorData = await response.json();
                console.error('Failed to delete the article:', response.status, errorData);
            }
        } catch (error) {
            console.error('Error deleting the article:', error);
        }
    };

    return (
        <div
            className={`flex gap-2 p-4 w-[700px] hover: ${isHovered ? 'transform scale-110' : ''}`}
            onMouseEnter={handleHover}
            onMouseLeave={handleUnhover}
            style={{
                boxShadow: isHovered ? '0px 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            }}
        >
            <div className="w-full grid grid-cols-[1fr,auto] gap-4">
            <div className="col-span-1">
                <Link href={{ pathname: "/article-view", query: { viewurl: article.url } }} key={article.id}>
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

                    <span className="cursor-pointer ml-auto flex items-center px-2 gap-2">
                        <FiBookmark className="h-5 w-5" />
                        {isProfilePage && (
                            <FiMoreVertical className="h-5 w-5" onClick={toggleDropdown} />
                        )}
                        {showDropdown && isProfilePage && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                {/* Dropdown content */}
                                <div className="py-2 px-4">
                                    {/* Your dropdown items */}
                                    <span className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded">
                                        <FiEdit />
                                        <Link href={{ pathname: "/articles/edit", query: { viewurl: article.url } }} key={article.id}>
                                            <p>Edit post</p>
                                        </Link>
                                    </span>
                                    <span className="flex items-center gap-2 cursor-pointer hover:bg-gray-100" onClick={deleteArticle}>
                                        <FiTrash2 />
                                        <p>Delete article</p>
                                    </span>
                                </div>
                            </div>
                        )}
                    </span>

                </div>

                <span className="bg-gray-300 p-1.5 rounded-full text-[.7rem]">
                    Software Engineering
                </span>
            </div>
            </div>

            <div className="object-cover min-w-[200px] col-span-1">
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
