import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { PixabayAPI } from '../services/Pixabay';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Notiflix from 'notiflix';
import css from './AppStyles.module.css';

const pixabayAPI = new PixabayAPI();

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [endTotalHits, setEndTotalHits] = useState(false);
  const [page, setPage] = useState(1);

  const onSubmit = value => {
    if (value === searchQuery) {
      return Notiflix.Notify.info(
        `You are currently viewing this query "${searchQuery}", try another query`
      );
    }
    setImages([]);
    setSearchQuery(value);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    pixabayAPI.q = searchQuery.trim();
    const searchPhotos = async () => {
      setLoading(true);
      console.log(pixabayAPI.q);
      try {
        if (!pixabayAPI.q) {
          Notiflix.Notify.warning(
            `The field cannot be empty. Please enter a search query`
          );
          return;
        }

        const { data } = await pixabayAPI.fetchPhotos(page);

        if (!data.hits.length) {
          Notiflix.Notify.failure(
            `Sorry, there are no images matching your search query. Please try again.`
          );
          return;
        }

        setImages(prevImages => [...prevImages, ...data.hits]);

        if (page === 1)
          Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);

        if (data.totalHits <= page * pixabayAPI.perPage) {
          setEndTotalHits(true);
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        } else {
          setEndTotalHits(false);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    searchPhotos();
  }, [searchQuery, page]);

  return (
    <div className={css.app}>
      <Searchbar onSubmit={onSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {loading && <Loader />}
      {!endTotalHits && !loading && images.length > 0 && (
        <Button handleLoadMore={handleLoadMore} />
      )}
    </div>
  );
}
