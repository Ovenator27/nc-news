export default function ChangePage({setPage, page}) {
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
          setPage((currPage) => {
            return (currPage = currPage + 1);
          });
        }}
      >
        Next page
      </button>
    </div>
  );
}
