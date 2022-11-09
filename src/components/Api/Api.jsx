import axios from 'axios';
import { useState, useEffect } from 'react';

const API_KEY = '29396920-d4426056c3f6851287cd3980f';

export const useFetch = (query, page, perPage) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    if (query === '') return;
    setIsLoading(true);
    setError(false);
    try {
      const fetchImages = async () => {
        const result = await axios.get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}&safesearch=true`
        );
        setImages(oldImages => [...result.data.hits]);
        console.log(result.data.hits);
      };
      fetchImages();
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [query, page]);
  return { images, error, isLoading };
};
