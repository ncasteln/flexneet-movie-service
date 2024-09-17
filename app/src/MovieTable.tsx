import { Button, Table } from "react-bootstrap"
import { IMovie } from "./Movies"

interface IMovieTableProps {
  movies: IMovie[],
  myList: IMovie[] | null,
  setMovieModal: React.Dispatch<React.SetStateAction<IMovie | null>>,
  setMyList: React.Dispatch<React.SetStateAction<IMovie[] | null>>,
  isMyListRendered: boolean
}

export const MovieTable = ({ movies, myList, setMovieModal, setMyList, isMyListRendered }: IMovieTableProps) => {
  const isMovieInMyList = (currentMovie: IMovie) => {
    if (!myList)
      return (false);
    for (let i = 0; i < myList.length; i++) {
      if (myList[i] === currentMovie)
        return (true);
    }
    return (false);
  }

  const handleClick = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent>, movie: IMovie ) => {
    e.stopPropagation();

    /*
      MODIFY LOGIC TO ACHIEVE REMOVE OF AN ITEM
      Maybe use a reducer to simplify a bit
    */

    console.log("I ADD THE MOVIE: ", movie.title);
    setMyList(prevState => {
      if (!prevState)
        return [movie]
      return [ ...prevState, movie ]
    })
  }

  return (
    <Table striped hover variant="dark">
      <thead>
        <tr>
          <th className="text-primary">Year</th>
          <th className="text-primary">Title</th>
          <th className="text-primary">Genre</th>
          <th></th>
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
                <td>
                  <Button onClick={(e) => handleClick(e, movie)}>
                    {
                      isMyListRendered
                        ? "-"
                        : isMovieInMyList(movie)
                          ? "-"
                          : "+"
                    }
                  </Button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}
