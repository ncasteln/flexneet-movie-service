import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { calculateYears } from './utils';

interface INavigationProps {
	onClick: React.MouseEventHandler<HTMLElement>
}

export default function Navigation({ onClick }: INavigationProps) {
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
						{calculateYears(onClick)}
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar>
	);
}
