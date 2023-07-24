import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import { fetchMovieInfo } from 'redux/operations';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieInfo } from 'redux/selectors';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const  ModalMovieInfo = ({movieId}) =>  {
    const dispatch = useDispatch();
    const movieInfo = useSelector(getMovieInfo);
    const actors = movieInfo.actors;
    const actorsList = actors?.map(actor => actor.name).join(', ');

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    dispatch(fetchMovieInfo(movieId))
  };
  const handleClose = () => setOpen(false);



  return (
    <div>
      <Button onClick={handleOpen}>Інформація про фільм</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Інформація про фільм
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Назва фільму: {movieInfo.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Рік випуску: {movieInfo.year}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Формат: {movieInfo.format}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Актори: {actorsList}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}



            
            