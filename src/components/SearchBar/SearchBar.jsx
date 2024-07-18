import css from './SearchBar.module.css';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-hot-toast';

export default function SearchBar({ onSearch }) {
  return (
    <>
      <header className={css.header}>
        <Formik
          initialValues={{ photo: '' }}
          onSubmit={(values, actions) => {
            if (values.photo.trim() === '') {
              toast.error('Search field cannot be empty!');
            } else {
              onSearch(values.photo);
              actions.resetForm();
            }
          }}
        >
          <Form className={css.form}>
            <Field
              name="photo"
              className={css.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
            <button type="submit" className={css.button}>
              Search
            </button>
          </Form>
        </Formik>
      </header>
    </>
  );
}
