import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { fetchPhotos } from '../../photos-api';
import Loader from '../Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import LoadMoreBtn from '../LoadmoreBtn/LoadmoreBtn';
import ImageModal from '../ImageModal/ImageModal';

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleSearch = async (newPhoto) => {
    setPage(1);
    setPhotos([]);
    setTopic(newPhoto);
    setHasMore(true);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (topic === '') {
      return;
    }

    async function getPhotos() {
      try {
        setLoading(true);
        const data = await fetchPhotos(topic, page);
        if (data.length === 0) {
          toast.error('Nothing found!');
        } else {
          setPhotos((prevPhotos) => {
            return [...prevPhotos, ...data];
          });
        }
        if (data.length < 10) {
          setHasMore(false);
        }
      } catch (error) {
        toast.error('Failed to fetch photos. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    getPhotos();
  }, [page, topic]);

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage('');
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {photos.length > 0 && (
        <ImageGallery items={photos} onImageClick={openModal} />
      )}
      {loading && <Loader />}
      {photos.length > 0 && !loading && hasMore && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        imageUrl={selectedImage}
      />
      <Toaster position="bottom-center" />
    </div>
  );
}
