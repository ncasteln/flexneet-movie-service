import { Container, Row } from "react-bootstrap"

export const Sidebar = () => {
  return (
    <Container className="pt-5 position-absolute d-flex">
      { "#0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((char) => {
        return (
            <a href={`#category-${char}`} className="border">
                {char}
            </a>
        )})
      }
    </Container>
  )
}
