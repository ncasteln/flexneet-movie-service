import { EventHandler } from "react";
import { Col, Row, Dropdown, Button } from "react-bootstrap"
import { TDisplayMode, TSort } from "./Movies";

interface IToolbar {
  title: string | null,
  text: string,
  setDisplayMode: React.Dispatch<React.SetStateAction<TDisplayMode>>,
  setSort: React.Dispatch<React.SetStateAction<TSort>>
}

export const Toolbar =({ title, text, setDisplayMode, setSort }: IToolbar) => {
  const renderSortOptions = () => {
    const sortOptions = Object.values(TSort);
    return (sortOptions.map((option, i) => {
      return (
        <Dropdown.Item as={Button}
          key={`sortOption-${i}`}
          onClick={handleSort}>
            {option}
        </Dropdown.Item>)
    }))
  }

  const handleSort = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (e.currentTarget.textContent) {
      const sortOptions = Object.values(TSort);
      const newSort = sortOptions.filter((value) => {
        return (value === e.currentTarget.textContent)
      })
      setSort(newSort[0]);
    }
  }

  const handleDisplayMode = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (e.currentTarget.id === "display-list" || e.currentTarget.id === "display-grid")
      setDisplayMode(e.currentTarget.id);
  }

  return (
      <Row className="mb-0">
        <Col>
          <h2 className="text-primary">{ title ? title : "My list" }</h2>
        </Col>
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              List by: { text }
            </Dropdown.Toggle>
            <Dropdown.Menu>
              { renderSortOptions() }
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="d-flex justify-content-end gap-2">
          <Button id="display-list" onClick={handleDisplayMode}>List</Button>
          <Button id="display-grid" onClick={handleDisplayMode}>Grid</Button>
        </Col>
    </Row>
  )
}
