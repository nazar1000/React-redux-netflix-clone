import { getAllByAltText, render, screen } from "@testing-library/react"
import AddButton from "./AddButton"
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import { store } from "../app/store";
import LikeButton from "./LikeButton";


describe("Testing buttons functionality", () => {
  const user = userEvent.setup()
  // Add button test
  test("Shoud have alt text changed after click", async () => {

    render(
      <Provider store={store}>
        <AddButton data={{ name: "testShow", id: 123 }} />
      </Provider>
    )
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument()

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "Add to my list");
    await user.click(button)
    expect(img).toHaveAttribute("alt", "Remove from my list");
    await user.click(button)
    expect(img).toHaveAttribute("alt", "Add to my list");

  })

})