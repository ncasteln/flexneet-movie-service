import { EventHandler, ReactElement } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

interface INavigationProps {
	onClick: React.MouseEventHandler<HTMLElement>
}

export default function Navigation({ onClick }: INavigationProps) {
	const years: ReactElement[] = [];
	for (let i = 1960; i <= 2020; i+=10) {
		years.push(<NavDropdown.Item
			key={"DropdownYear-" + i}
			href={"year-" + i}
			onClick={(e) => onClick(e)}>
				{i}
			</NavDropdown.Item>)
	}

	return (
	<Navbar fixed="top" expand="sm" className="bg-body-tertiary">
	<Container>
		<Navbar.Brand href="#">
		<img
			alt=""
			src="../public/vite.svg"
			width="30"
			height="30"
			className="d-inline-block align-top" />{' '}
				Flexneet
		</Navbar.Brand>

		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		<Navbar.Collapse id="basic-navbar-nav">
			<Nav className="me-auto">
				<Nav.Link onClick={(e) => onClick(e)} href="#">My list</Nav.Link>
				<NavDropdown title="Year" id="basic-nav-dropdown">
					{years}
				</NavDropdown>
			</Nav>
		</Navbar.Collapse>
	</Container>
	</Navbar>
	);
}
