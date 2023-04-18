import './pagination.css';

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  // const POST_PER_PAGE = 3;
  const generatePages = [];
  for (let i = 1; i <= pages; i++) {
    generatePages.push(i);
  }

  return (
    <div className='pagination'>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        className='page previous'
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {generatePages.map((page) => (
        <div
          onClick={() => setCurrentPage(page)}
          key={page}
          className={currentPage === page ? 'page active-page' : 'page'}
        >
          {page}
        </div>
      ))}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        className='page next'
        disabled={currentPage === pages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
