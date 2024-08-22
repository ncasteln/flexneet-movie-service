import { Container } from "react-bootstrap"

interface IMovie {
	title: string,
	year: number,
	cast: string[],
	genres: string[],
	href: string,
	extract: string,
	thumbnail: URL, //"https://upload.wikimedia.org/wikipedia/en/3/34/The_Grudge_2020_Poster.jpeg"
	thumbnail_width: number,
	thumbnail_height: number
}

interface IContentProps {
	data: IMovie[] | null
}

export const Content = ({ data }: IContentProps) => {
	return (
	<Container>
		<h1>Content to place</h1>
		{
			data
				? data[0].title
				: "Loading animation..."
		}
	</Container>
	)
}
