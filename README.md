# React-redux-netflix-clone
Improved version of my other project React-Netflix-Clone, this time using Redux with general code improvements.
Use can check out the original here: [React Netflix clone]()


# Netflix copy created with React App

This project uses	**React**, **Typescript**, **Sass**, **React Redux** and **Axios**.
In terms of the content, it uses [The Movie DB](https://www.themoviedb.org/documentation/api) to get the data and fill up the page.


## Setup

In order for everything to work, you are going to need an API key from [The Movie DB](https://www.themoviedb.org/documentation/api), and insert it in a file "src/hooks/useAxiosAll.ts"

![Code preview](/Readme/apikey.JPG)

Dependencies : 
- "react-router-dom": "^6.4.1",
- "react-redux": "^8.0.4",
- "typescript": "^4.8.4",
- "sass": "^1.54.4",


## Project structure

![Sitemap](/Readme/full-structure-redux.png)


## Abstract structure
This layout contains all the unique sequences of components. It also shows where Redux slices are being used.

![Abstract structure](/Readme/abstract-structure-redux.png)

In this clone of Netflix uses Redux, here is description of what each slice does.
- myListSlice
  - This is slice that is used for anything to do with the my list, it keeps track of shows in my list, as well as rating status or like status for all the shows that were given a rating.
  - It is used mainly inside My List page, AddButton and LikeButton
- filterSlice
  - Keeps track of filters that use has selected, this is used mainly in subNavigation tab, on Tv and Movie pages, but also inside tiledList component.
  - It also keep track of the view mode that user is currently using.
- globalSlice
  - This slice keeps track of global states, such as the status of preview and its data, but also global tile animation. (Only one tile preview should be active at a time).

## Components list

![Components list](/Readme/components.png)

### Components description
- **Highlight** - | Main show display found in Home, Tv shows, and Movies pages. Takes a show information and displays general information about it.
- **ListDistributor** - | Distributes different lists of shows for different pages. Takes an array of lists.
- **List** - A list of shows with interactive back and forward button which allows horizontal scrolling for different shows. takes list of shows.
- **ListPreview** - Window that displays a list of shows through the title link of list component. Takes list of shows.
- **TiledList** - List of shows in tiled view, which supports filtering.
- **Tile** - An image tile for a show with hover animation that expands it.
- **Nav** - Navigation bar with different links
- **NavSub** - 2 level of navigation that contains different genre options and view mode selection.
- **Preview** - Displays a detailed information's about a show, its episodes, cast, and similar/recommended shows.
- **EpisodeTile** - Tile used to displays season episode inside preview component.
- **RecommendationTile** - Tile used to display recommended shows inside preview component.
- **Loading** - Displays Netflix loading animation while the data is being loaded to the page.
- **Dropdown** - Different reusable dropdowns for filters
- **PlayButton** - Plays the current element (Not implemented)
- **AddButton** - Adds current show to my list
- **PreviewButton** - Shows preview for the current show
- **LikeButton** - Adds like to status to the show

## Data Flow

![Data flow](/Readme/data-flow.png)

The data starts in the Global level, goes through a sorting function that arranges it into more functional way. It then goes to individual pages where it is split across more components.

# Site Map
![Sitemap](/Readme/sitemap.png)


## Limitations
 - Filter settings are based on the source database therefore, different lists of shows might be displayed each time.
 - No playback window, [The Movie DB](https://www.themoviedb.org/documentation/api) does not support direct clips.

## Improvements
- [ ] Tile Animation stops working sometimes,
- [ ] ListPreview currently shows only the list that user clicks on, and not all, and no filter option.
- [ ] Custom filter functions 


