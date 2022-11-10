import axios from 'axios';
import { useState, useEffect } from 'react';

const API_KEY = '29396920-d4426056c3f6851287cd3980f';

export const useFetch = (query, page, perPage) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingTrue = () => setIsLoading(true);
  const handleLoadingFalse = () => setIsLoading(false);
  const handleError = () => setError(true);
  const clearImages = () => setImages([]);

  useEffect(() => {
    if (query === '') return;
    handleLoadingTrue();
    setError(false);
    try {
      const fetchImages = async () => {
        const result = await axios.get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}&safesearch=true`
        );
        setImages(oldImages => [...oldImages, ...result.data.hits]);
      };
      fetchImages();
    } catch (error) {
      handleError();
    } finally {
      handleLoadingFalse();
    }
  }, [query, page, perPage]);

  return {
    images,
    error,
    isLoading,
    handleLoadingTrue,
    handleLoadingFalse,
    handleError,
    clearImages,
  };
};
