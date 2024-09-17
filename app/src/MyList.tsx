import { IMovie } from "./Movies"
import { Container } from "react-bootstrap";

interface IMyList {
  myList: IMovie[] | null,
  setMyList: React.Dispatch<React.SetStateAction<IMovie[] | null>>
}

export const MyList = ({ myList, setMyList } : IMyList) => {

  return (
    <Container>
      { !myList
        ? "Empty list"
        : "Something----"
      }
    </Container>
  )
}
