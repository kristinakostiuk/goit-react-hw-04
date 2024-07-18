import css from './LoadmoreBtn.module.css';

export default function LoadMoreBtn({ onClick }) {
  return (
    <div className={css.container}>
      <button className={css.button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
