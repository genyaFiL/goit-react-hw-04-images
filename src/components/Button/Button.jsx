import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ButtonStyles.module.css';

class Button extends Component {
  render() {
    const { handleLoadMore } = this.props;
    return (
      <button type="button" className={css.button} onClick={handleLoadMore}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
export default Button;
