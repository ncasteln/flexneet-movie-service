# flexneet-movie-service

The pourpose of this project is to re-achieve frontend knowledge using React. The tech stack used to build it is quite simple: React as framework, Typescript, React-Bootstrap to style. The state is handled without any state mangaement tool, since it's not too big. The database is emulated using json data collected by [prust](https://github.com/prust/wikipedia-movie-data).

The project emulates a blockbuster service in which is possible to list movies, add to a list of favourites, sort in different ways (alphabetical, year, genre), see the descriptions and their data.

## Reviewed concepts
### useEffect()
What is a _side-effect_? Any operations or behaviors that occur in a component **after** rendering, and that don't directly impact the current component render cycle.

List of potential side-effects:
- Data Fetching
- DOM manipulation
- External interactions (local storage, API calls etc.)
- Timers and scheduling
- Global objects (like window)
- Clean-up functions
- Authentications
- Accessibility features

[Pure function](https://en.wikipedia.org/wiki/Pure_function): no side-effects (means, no mutation of data outside its scope) and, identical return values given the same input. The `useEffect()` is the hook to place side-effects and calculations, like fetch requests, direct DOM manipulation, use of timer functions.
In simple words: if the calculations affect the state of the component, this calculation should be inside the `useEffect()`.

Example: data fetching.
In a component, the data fethcing goes into the `useEffect()` hook. The component renders the page when no data is fetched, with a loading page, and when this is rendered, the hook is called. The hook fetches the data, modifies the state and the component re-render accordingly.

Clean-up function: in `useEffect()` we can provide a clean-up function which is executed when the component unmounts. The miss use of a clean-up function could cause potential memory leaks.

Example: data fetching.
In the following example, when the data is fecthed a timer to simulate a delay is used. Let's suppose that in this 3 seconds, the user causes the component to unmount, like changing page or performing actions which force the component to re-mount (in our case, changing the year of movies to display); if the clean-up function is not set correctly, the unmounted component fetching function would continue to execute its job. So if the user forces 10 times the component to re-mount, all the 10 data fetching would be performed, but what we want, is just one, the last one. In code snippet this clean-up calls just `clearTimout(timerId)` because the delay of the data fetch is emulated through `setTimeout()`. In real world examples, for example by using [AbortController API](https://developer.mozilla.org/en-US/docs/Web/API/AbortController), it could be necessary additional clean-ups.
```js
useEffect(() => {
	async function fetchData() {
		const response = await fetch(`../data/movies-${year}s.json`);
		const newMovies: IMovie[] = await response.json();
		setMovies(newMovies);
		console.log(newMovies);
	}

	let timerId = setTimeout(() => {
		console.log("Fetching data...")
		fetchData();
	}, 3000);

	return () => {
		console.log("! FETCHING ABORTED !");
		clearTimeout(timerId); }
}, [year])
```

## Try it out!
The project uses a docker container. After cloning just `make` and access it thorugh http://localhost:8080.
```bash
git clone https://github.com/ncasteln/flexneet-movie-service;
cd flexneet-movie-service && make;
```
