import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItemStyles.module.css';
import Modal from '../Modal/Modal';

export default function ImageGalleryItem({ webformatURL, largeImageURL, alt }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <li className={css.item}>
        <img
          className={css.item_image}
          src={webformatURL}
          alt={alt}
          onClick={toggleModal}
        />
        {showModal && (
          <Modal src={largeImageURL} alt={alt} toggle={toggleModal} />
        )}
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.exact({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
};
