import React from 'react';

const HeadingTitle = ({ title }) => {
    return (
        <h2
            className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
        >
            {title}
        </h2>
    );
}

export default HeadingTitle;
