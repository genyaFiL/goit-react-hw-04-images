import PropTypes from 'prop-types';
import css from './SearchbarStyles.module.css';

export default function Searchbar({ onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();

    const value = e.target.children[1].value;

    if (value) {
      onSubmit(value);
    }
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.searchform}>
        <button type="submit" className={css.searchform_button}>
          <span className={css.searchform_button_label}>Search</span>
        </button>

        <input
          className={css.searchform_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
