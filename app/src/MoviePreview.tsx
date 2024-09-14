import { Table } from "react-bootstrap"
import { IMovie } from "./Movies"

interface IMovieTableProps {
  movies: IMovie[]
}

export const MovieTable = ({ movies }: IMovieTableProps) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <th>Year</th>
          <th>Title</th>
          <th>Genre</th>
        </thead>
        <tbody>
          {
            movies.map((movie, i) => {
              return (
                <tr key={`movie-${i}`}>
                  <td>{movie.year}</td>
                  <td>{movie.title}</td>
                  <td>{movie.genres.length > 0 ? movie.genres[0] : "<Empty>"}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </>
  )
}
