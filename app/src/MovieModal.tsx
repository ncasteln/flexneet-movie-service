import { Button, Modal } from "react-bootstrap"
import { IMovie } from "./Movies"

interface IMovieModal {
	movie: IMovie | null,
	setMovieModal: React.Dispatch<React.SetStateAction<IMovie | null>>
}

export const MovieModal = ({ movie, setMovieModal }: IMovieModal) => {
	return (
	<Modal show={movie ? true : false} onHide={() => setMovieModal(null)}>
		<Modal.Header closeButton>
		  <Modal.Title>{movie ? movie.title : null }</Modal.Title>
		</Modal.Header>
		<Modal.Body>{movie ? movie.extract : null }</Modal.Body>
		<Modal.Footer>
		  <Button variant="secondary" onClick={() => setMovieModal(null)}>Action_1_to_define</Button>
		  <Button variant="primary" onClick={() => setMovieModal(null)}>Action_2_to_define</Button>
		</Modal.Footer>
	</Modal>
	)
}
