import { useDispatch } from 'react-redux';
import { importMovies } from 'redux/operations';


export const ImportFromFileForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData();
    formData.append('movies', form.fileInput.files[0]);
    
    dispatch(
        importMovies(
        formData
        )
    );
    form.reset();
  };

  return (
    <div>
      <h3>Завантажте файл</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" name="movies" id="fileInput" />
        <button type="submit">Завантажити</button>
      </form>
    </div>
  );
};