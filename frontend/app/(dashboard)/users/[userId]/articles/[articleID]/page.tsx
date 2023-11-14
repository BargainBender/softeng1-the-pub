
import { useRouter } from 'next/router';
import React from 'react';
import ArticleHeading from '../components/article-heading';

export default async function UserArticlePage({ params }: { params: {userId: string, articleId: string}}) {
    // Get the userID and artlcleID from the URL
    // const { userID, articleID } = useRouter().query; 

    // Fetch the user and article data from the API placeholder to JSON
    // const article = await fetch(`/api/articles/${articleID}`).then((response) => response.json());
    // Render the article data

    const data = {
        article: {
            title: "Hello World",
            content: "Lorem ipsum, dolor sit amet consectetur adi",
            category: "Programming",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.."
        },
    }

    return (
        <>
        <ArticleHeading 
        title={data.article.title}
        content={data.article.content}
        category={data.article.category}
        description={data.article.description}
        />
        </>
    )

}



