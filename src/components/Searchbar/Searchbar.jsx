import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './SearchbarStyles.module.css';

class Searchbar extends Component {
  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const value = e.target.children[1].value;

    if (value) {
      onSubmit(value);
    }
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.searchform}>
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
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
