import { useRef, useEffect } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ items = [], onImageClick }) {
  const lastElementRef = useRef(null);

  useEffect(() => {
    if (lastElementRef.current) {
      lastElementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [items]);

  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <ul className={css.list}>
      {items.map((item, index) => (
        <li
          className={css.item}
          key={item.id}
          ref={index === items.length - 1 ? lastElementRef : null}
          onClick={() => onImageClick(item.urls.regular)}
        >
          <ImageCard data={item} />
        </li>
      ))}
    </ul>
  );
}
