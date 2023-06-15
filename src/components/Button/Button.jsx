import PropTypes from 'prop-types';
import css from './ButtonStyles.module.css';

export default function Button({ handleLoadMore }) {
  return (
    <button type="button" className={css.button} onClick={handleLoadMore}>
      Load more
    </button>
  );
}

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
