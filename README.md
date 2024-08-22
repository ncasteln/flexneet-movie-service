# flexneet-movie-service

The pourpose of this project is to re-achieve frontend knowledge using React. The tech stack used to build it is quite simple: React as framework, Typescript, React-Bootstrap to style. The state is handled without any state mangaement tool, since it's not too big. The database is emulated using json data collected by [prust](https://github.com/prust/wikipedia-movie-data).

The project emulates a blockbuster service in which is possible to list movies, add to a list of favourites, sort in different ways (alphabetical, year, genre), see the descriptions and their data.

## Reviewed concepts
### useEffect()
[Pure function](https://en.wikipedia.org/wiki/Pure_function): no side-effects (means, no mutation of data outside its scope) and, identical return values given the same input. The `useEffect()` is the hook to place side-effects and calculations, like fetch requests, direct DOM manipulation, use of timer functions.
In simple words: if the calculations affect the state of the component, this calculation should be inside the `useEffect()`.

## Try it out!

## To do
1) Not sure about logic between App and Movies, in relation to the random movies, why more than one console.log ?
2) clean-up for useEffect still not properly clear
