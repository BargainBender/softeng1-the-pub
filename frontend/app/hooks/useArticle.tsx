import { useState, useEffect } from 'react';


interface ArticleProps {
    title: string;
    content: string;
    date_created: string;
    last_edited: string;
    author: ArticleUserProps
}

interface ArticleUserProps {
    username: string;
    name: string;
    profile_picture: string;
    is_active: boolean;
}

export function useArticle(articleId: string, userId: string): { article: ArticleProps | null; author: ArticleUserProps | null; } {
    const [article, setArticle] = useState<ArticleProps | null>(null);
    const [author, setAuthor] = useState<ArticleUserProps | null>(null);
  
    useEffect(() => {
      async function fetchArticle() {
        const articleResponse = await fetch(`/api/articles/${articleId}`);
        const authorResponse = await fetch(`/api/users/${userId}`);
  
        const articleData = await articleResponse.json();
        const authorData = await authorResponse.json();
  
        setArticle(articleData);
        setAuthor(authorData);

        console.log(articleData);
        console.log(authorData);

      }
  
      fetchArticle();
    }, [articleId, userId]);
  
    return { article, author };
}

