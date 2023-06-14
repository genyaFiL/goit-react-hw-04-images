import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItemStyles.module.css';
import Modal from '../Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { webformatURL, largeImageURL, alt } = this.props;
    return (
      <>
        <li className={css.item}>
          <img
            className={css.item_image}
            src={webformatURL}
            alt={alt}
            onClick={this.toggleModal}
          />
          {this.state.showModal && (
            <Modal src={largeImageURL} alt={alt} toggle={this.toggleModal} />
          )}
        </li>
      </>
    );
  }
}
ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      webformatURL: PropTypes.string.isRequired,
      largeImageURLme: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ),
};
export default ImageGalleryItem;
