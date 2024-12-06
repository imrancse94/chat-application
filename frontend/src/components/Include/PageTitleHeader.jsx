import React from 'react';

const PageTitleHeader = (props) => {
  const {title} = props;
    return (
        <h2
              className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
            >
              {title}
            </h2>
    );
}

export default PageTitleHeader;
