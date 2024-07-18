import { MagnifyingGlass } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.container}>
      <MagnifyingGlass
        visible={true}
        height="90"
        width="90"
        glassColor="#c0efff"
        color="#4a90e2"
        position="center"
      />
    </div>
  );
}
