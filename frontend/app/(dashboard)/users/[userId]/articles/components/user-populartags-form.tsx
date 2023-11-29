import React from 'react';

const PopularTags = () => {
    const tags = [
        "Health",
        "Travels",
        "Programming",
        "Finance",
        "Style",
        "Figma",
        "JavaScript",
        // Add more tags as needed
    ];

    return (
        <div>
            <div className="mb-7 font-bold">
                <h1 className="text-3xl text-gray-800">Popular Tags</h1>
            </div>
            <div className="flex flex-wrap" style={{ maxWidth: '3in' }}>
                {tags.map((tag, index) => (
                    <div key={index} className="w-auto mb-2 mr-2" style={{ maxWidth: '3in' }}>
                    <span className="bg-gray-300 px-3 py-1 rounded-full text-sm">
                        {tag}
                    </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularTags;
