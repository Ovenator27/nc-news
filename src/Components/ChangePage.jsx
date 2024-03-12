export default function ChangePage({ setPage, page, pageCount }) {
  return (
    <div>
      <button
        onClick={() => {
          if (page > 1) {
            setPage((currPage) => {
              return (currPage = currPage - 1);
            });
          }
        }}
      >
        Previous page
      </button>
      <button
        onClick={() => {
          if (page < pageCount) {
            setPage((currPage) => {
              return (currPage = currPage + 1);
            });
          }
        }}
      >
        Next page
      </button>
    </div>
  );
}
