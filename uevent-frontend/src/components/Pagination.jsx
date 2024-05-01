import React from 'react';
import { Button } from 'react-bootstrap';
import styles from '../styles/Pagination.module.css';

const Pagination = ({
    currentPage,
    totalPages,
    prevPage,
    nextPage,
    setCurrentPage,
}) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <Button
                    key={i}
                    variant="primary"
                    className={`${styles.pageNumber} ${
                        currentPage === i ? styles.active : ''
                    }`}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </Button>,
            );
        }
        return pageNumbers;
    };

    return (
        <div
            className={`d-flex justify-content-center mt-4 ${styles.paginationContainer}`}
        >
            <Button
                variant="primary"
                className={`${styles.paginationButton}`}
                onClick={prevPage}
                disabled={currentPage === 1}
            >
                &lt;
            </Button>
            <div className="d-flex align-items-center">
                {renderPageNumbers()}
            </div>
            <Button
                variant="primary"
                className={`${styles.paginationButton}`}
                onClick={nextPage}
                disabled={currentPage === totalPages}
            >
                &gt;
            </Button>
        </div>
    );
};

export default Pagination;
