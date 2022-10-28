import { getAllByAltText, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { store } from "../app/store";



const user = userEvent.setup()


const testHighlight = async (link) => {
  await user.click(link)
  let highlight = screen.getByTestId("highlight")
  expect(highlight).toBeInTheDocument()
}

const testNamedLists = async (link) => {
  await user.click(link)
  let namedLists = screen.getAllByTestId("named-lists");
  expect(namedLists.length).toBeGreaterThanOrEqual(1)
}

const testTiledList = async (link) => {
  await user.click(link)
  let tiledList = screen.getByTestId("tiled-list");
  expect(tiledList).toBeInTheDocument()
}


describe("Testing app", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )

  it("1) Test starting pages", async () => {

    //Landing page
    const signInLink = screen.getByText(/Sign In/i);
    expect(signInLink).toBeInTheDocument()
    await user.click(signInLink)

    //Login page
    const signInButton = screen.getByTestId("sign-in")
    expect(signInButton).toBeInTheDocument()

    await user.click(signInButton) // goes to browse page

    //nav links
    const homeLink = screen.getAllByText(/home/i)[0]
    const tvLink = screen.getAllByText(/tv shows/i)[0]
    const movieLink = screen.getAllByText(/movies/i)[0]
    const newPopularLink = screen.getAllByText(/new & popular/i)[0]
    const myListLink = screen.getAllByText(/my list/i)[0]
    const browseByLangLink = screen.getAllByText(/browse by language/i)[0]

    //testing for highlight
    await testHighlight(homeLink)
    await testHighlight(tvLink)
    await testHighlight(movieLink)

    //testing for named lists
    await testNamedLists(homeLink)
    await testNamedLists(tvLink)
    await testNamedLists(movieLink)
    await testNamedLists(newPopularLink)

    await testTiledList(browseByLangLink)


    // screen.debug()

    //home page
    // let highlight = screen.getByTestId("highlight")
    // expect(highlight).toBeInTheDocument()

    // let namedLists = screen.getAllByTestId("named-lists");
    // expect(namedLists.length).toBeGreaterThanOrEqual(1)

    //tv
    // await testLink(homeLink)
    // await testLink(tvLink)
    // await testLink(movieLink)
    // await testLink(newPopularLink)
    // await user.click(tvLink)
    // highlight = screen.getByTestId("highlight")
    // expect(highlight).toBeInTheDocument()

    // namedLists = screen.getAllByTestId("named-lists");
    // expect(namedLists.length).toBeGreaterThanOrEqual(1)

  })



})