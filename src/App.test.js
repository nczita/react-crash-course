import React from "react";
import axios from "axios";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

jest.mock("axios");

describe("App", () => {

  let getPromise, postPromise, deletePromise;

  beforeEach(async () => {
    const todos = [
      { id: 1, title: "React testing", completed: false },
      { id: 2, title: "This is awesome", completed: true },
    ];

    getPromise = Promise.resolve({ data: todos }); 

    axios.get.mockImplementationOnce(() => getPromise);

    postPromise = Promise.resolve({ data: [] }); 

    axios.post.mockImplementationOnce(() => postPromise);

    deletePromise = Promise.resolve({data: [] });

    axios.delete.mockImplementationOnce(() => deletePromise);

    render(<App />);

    await act(() => getPromise);
  })

  test("renders App component", async () => {
    expect(screen.getByText("TodoList")).toBeInTheDocument();
  });

  test("shows todo items", async () => {
    expect(screen.getByRole("list")).toBeInTheDocument();

    const listItems = await screen.findAllByRole("listitem");

    expect(listItems).toHaveLength(2);
  });

  test("add todo item", async () => {
    const addItemTextbox = screen.getByRole("textbox");
    expect(addItemTextbox).toBeInTheDocument();

    const addItemSubmit = screen.getByText("Submit");
    expect(addItemSubmit).toBeInTheDocument();

    userEvent.type(addItemTextbox, "JavaScript");
    userEvent.click(addItemSubmit);

    await act(() => postPromise);

    const listItems = await screen.findAllByRole("listitem"); 
    expect(listItems).toHaveLength(3);
    // expect(listItems[2].textContent).toMatch(/JavaScript/)
  });

  test("remove existing todo item", async () => {
    const listItemsBefore = await screen.findAllByRole("listitem");
    expect(listItemsBefore).toHaveLength(2);

    const listRemoveBtns = await screen.findAllByText("x");
    userEvent.click(listRemoveBtns[0]);

    await act(() => deletePromise);

    const listItemsAfter = await screen.findAllByRole("listitem");
    expect(listItemsAfter).toHaveLength(1);
  });

  test("mark todo item as completed", async () => {
    const checkBoxesBefore = await screen.findAllByRole("checkbox");
    expect(checkBoxesBefore).toHaveLength(2);

    expect(checkBoxesBefore[0]).not.toBeChecked();
    expect(checkBoxesBefore[1]).toBeChecked();

    userEvent.click(checkBoxesBefore[0]);

    const checkBoxesAfter = await screen.findAllByRole("checkbox");
    expect(checkBoxesAfter).toHaveLength(2);

    expect(checkBoxesAfter[0]).toBeChecked();
    expect(checkBoxesAfter[1]).toBeChecked();
  });

  test("shows About page", async () => {
    const aboutLink = screen.getByText("About");
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);

    const appDescription = await screen.findByText("This is a the TodoList app v1.0.0 is part of a React Crash Course");
    expect(appDescription).toBeInTheDocument();    
  });
});
