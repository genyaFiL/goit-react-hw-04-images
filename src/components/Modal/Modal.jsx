import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ModalStyles.module.css';

class Modal extends Component {
  componentDidMount = () => {
    document.addEventListener('keydown', this.handleKeyDown);
  };
  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggle();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.toggle();
    }
  };

  render() {
    const { src, alt } = this.props;
    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}
export default Modal;

Modal.propTypes = {
  toggle: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
