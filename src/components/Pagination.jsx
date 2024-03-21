import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageLength, changePagination }) => {
    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        changePagination(selectedPage);
    };

    return (
        <div className="flex justify-center flex-wrap my-4 w-full">
            <div className="flex items-center -space-x-px h-10 text-base">
                <ReactPaginate
                    nextLabel=">"
                    previousLabel="<"
                    className="flex "
                    breakAriaLabels="..."
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageLength}
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageClassName="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    activeClassName="bg-blue-500 text-white"
                    previousClassName="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    nextClassName="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                />
            </div>
        </div>
    );
};

export default Pagination;
