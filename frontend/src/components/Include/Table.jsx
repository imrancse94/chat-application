import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({children,link,label,linkLabel}) => {
    return (
        <div className="rounded-sm bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="w-full inline-flex pb-4">
                <div className='w-full'>
                    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                        {label}
                    </h4>
                </div>
                <div className='w-full text-right'>
                    <Link
                        to={link}
                        className="rounded inline-flex items-right justify-right bg-primary py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        {linkLabel}
                    </Link>
                </div>
            </div>
            <div className="max-w-full overflow-x-auto">
                {children}
            </div>
        </div>
    );
}

export default Table;
