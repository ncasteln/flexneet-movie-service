import { Button, Image, Modal } from "react-bootstrap"
import { IMovie } from "./Movies"

interface IMovieModal {
  movie: IMovie | null,
  setMovieModal: React.Dispatch<React.SetStateAction<IMovie | null>>
}

export const MovieModal = ({ movie, setMovieModal }: IMovieModal) => {
  const handleClick = (e: Event) => {
    // add
    setMovieModal(null);
  }

  return (
    <Modal show={movie ? true : false} onHide={() => setMovieModal(null)}>
      <Modal.Header closeButton>
        <Modal.Title>{movie ? movie.title : null }</Modal.Title>
      </Modal.Header>
      <Image src={movie?.thumbnail} />
      <Modal.Body>{movie ? movie.extract : null }</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={(e) => handleClick(e)}>Add to favourite</Button>
      </Modal.Footer>
    </Modal>
  )
}
