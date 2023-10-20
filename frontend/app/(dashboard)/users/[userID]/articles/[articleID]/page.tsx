
import { useRouter } from 'next/router';
import React from 'react';

export default async function UserArticlePage() {
    // Get the userID and artlcleID from the URL
    const { userID, articleID } = useRouter().query; 

    // Fetch the user and article data from the API placeholder to JSON
    const article = await fetch(`/api/articles/${articleID}`).then((response) => response.json());
    // Render the article data

    return (
        <div>
            <h1>{article.title}</h1>
            



            <p>{article.content}</p>

        </div>
    )

}



