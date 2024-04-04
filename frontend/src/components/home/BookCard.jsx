
import PropTypes from "prop-types";
import BookSingalCard from "./BookSingalCard";

const BookCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((item) => (
        <BookSingalCard  
            key={item._id}
            book={item}
        />
      ))}
    </div>
  );
};

BookCard.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      publishYear: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BookCard;
