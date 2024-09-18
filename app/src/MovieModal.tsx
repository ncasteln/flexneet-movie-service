import { Button, Image, Modal } from "react-bootstrap"
import { IMovie } from "./Movies"
import { useState } from "react"

interface IMovieModal {
  movie: IMovie | null,
  setMovieModal: React.Dispatch<React.SetStateAction<IMovie | null>>,
  setMyList: React.Dispatch<React.SetStateAction<IMovie[] | null>>
}

export const MovieModal = ({ movie, setMovieModal, setMyList }: IMovieModal) => {
  const [action, setAction] = useState<"Add to favourite" | "Remove from favourite">("Add to favourite")

  const handleClick = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    if (!movie) return;
    e.stopPropagation();
    if (e.currentTarget.textContent === "Add to favourite") {
      setMyList(prevState => {
        if (!prevState)
          return [movie]
        return [ ...prevState, movie ]
      })
      setAction("Remove from favourite");
    }
    else {
      setMyList(prevState => {
        if (!prevState)
          return (null);
        const newState = prevState.filter(element => {
          return (element !== movie);
        });
        if (newState.length === 0)
          return (null);
        return (newState);
      })
      setAction("Add to favourite");
    }
    setMovieModal(null);
  }

  return (
    <Modal className="" show={movie ? true : false} onHide={() => setMovieModal(null)}>
      <Modal.Header closeButton>
        <Modal.Title>{movie ? movie.title : null }</Modal.Title>
      </Modal.Header>
      <Image src={movie?.thumbnail} />
      <Modal.Body>{movie ? movie.extract : null }</Modal.Body>
      <Modal.Footer>
        <Button onClick={(e) => handleClick(e)} variant="primary">
          {action}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
