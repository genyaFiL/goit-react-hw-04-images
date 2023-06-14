import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { PixabayAPI } from '../services/Pixabay';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import Notiflix from 'notiflix';
import css from './AppStyles.module.css';

const pixabayAPI = new PixabayAPI();

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    loading: false,
    endTotalHits: false,
    showModal: false,
    page: 1,
  };

  async searchPhotos() {
    this.setState({ loading: true });
    try {
      if (!pixabayAPI.q) {
        Notiflix.Notify.warning(
          `The field cannot be empty. Please enter a search query`
        );
        return;
      }

      const { page } = this.state;
      const { data } = await pixabayAPI.fetchPhotos(page);

      if (!data.hits.length) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        return;
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
      }));
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);

      if (data.totalHits <= this.state.page * pixabayAPI.perPage) {
        this.setState({ endTotalHits: true });

        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      } else {
        this.setState({ endTotalHits: false });
      }
    } catch (err) {
    } finally {
      this.setState({ loading: false });
    }
  }

  onSubmit = value => {
    if (value === this.state.searchQuery) {
      return Notiflix.Notify.info(
        `You are currently viewing this query "${this.state.searchQuery}", try another query `
      );
    }

    this.setState({ images: [], searchQuery: value, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate = async (_, prevState) => {
    pixabayAPI.q = this.state.searchQuery.trim();
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      this.state.page !== prevState.page
    )
      this.searchPhotos();
  };

  render() {
    const { loading, images, endTotalHits } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.images && <ImageGallery images={images} />}
        {loading && <Loader />}
        {images.length > 0 && !endTotalHits && !loading && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}

export default App;
