import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './ModalStyles.module.css';

export default function Modal({ src, alt, toggle }) {
  const overlayClickRef = useRef();

  // //cdm
  // useEffect(() => {
  //   document.addEventListener('keydown', handleKeyDown);
  // }, []);
  // //cwu
  // useEffect(() => {
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);

  //cdm+cdu
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      toggle();
    }
  };

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      toggle();
    }
  };

  return (
    <div
      ref={overlayClickRef}
      className={css.overlay}
      onClick={handleOverlayClick}
    >
      <div className={css.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  toggle: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
