import { useEffect } from "react";
import { IMovie } from "./Movies"
import { Container } from "react-bootstrap";

interface IMyList {
  movies: IMovie[] | null
}

export const MyList = ({ movies } : IMyList) => {

  return (
    <Container>
      { movies ? "List has something" : "Empty list"}
    </Container>
  )
}
