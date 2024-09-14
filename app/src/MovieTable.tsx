import { Table } from "react-bootstrap"
import { IMovie } from "./Movies"

interface IMovieTableProps {
  movies: IMovie[],
  setMovieModal: React.Dispatch<React.SetStateAction<IMovie | null>>
}

export const MovieTable = ({ movies, setMovieModal }: IMovieTableProps) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Year</th>
          <th>Title</th>
          <th>Genre</th>
        </tr>
      </thead>
      <tbody>
        {
          movies.map((movie, i) => {
            return (
              <tr role="button" key={`movie-${i}`} onClick={() => setMovieModal(movie)}>
                <td>{movie.year}</td>
                <td>{movie.title}</td>
                <td>{movie.genres.length > 0 ? movie.genres[0] : "<Empty>"}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}
