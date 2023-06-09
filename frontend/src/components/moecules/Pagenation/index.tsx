import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

type PagenationProps = {
  size: number;
  initialPage: number;
  onPageChange: (page: number) => void;
};

export const Pagenation = ({
  size,
  initialPage,
  onPageChange,
}: PagenationProps) => {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <PagenationContainer initialPage={initialPage}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        forcePage={initialPage - 1}
        marginPagesDisplayed={1}
        pageCount={size}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
      />
    </PagenationContainer>
  );
};

type PagenationContainerProps = {
  initialPage: number;
};

const PagenationContainer = styled.div<PagenationContainerProps>`
  display: flex;
  .selected > a {
    color: #4fafb1;
    :hover {
      border: 1px solid #d8d9da;
    }
  }
  > ul {
    display: flex;
    .previous {
      display: ${(props) => props.initialPage === 1 && 'none'};
    }
  }
  > div {
    margin: 0px 10px;
    display: flex;
    align-items: end;
    padding-bottom: 7px;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 8px;
    height: 27px;
    font-size: 0.9rem;
    border: 1px solid #d8d9da;
    border-radius: 4px;
    margin: 0px 3px;
    cursor: pointer;
    :hover {
      background-color: #cccdce;
    }
  }
`;
