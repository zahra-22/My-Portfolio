import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Contact from "../pages/Contact.js";
import { AuthContext } from "../context/AuthContext.jsx";

// Mock apiRequest
jest.mock("../api.js", () => ({
  apiRequest: jest.fn(),
}));
import { apiRequest } from "../api.js";

const renderWithAuth = (user) => {
  return render(
    <AuthContext.Provider value={{ user }}>
      <Contact />
    </AuthContext.Provider>
  );
};

describe("Contact Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows success message after sending a message", async () => {
    apiRequest.mockResolvedValueOnce({});

    renderWithAuth({ role: "user" });

    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Hello there" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(screen.getByText(/Saved successfully!/i)).toBeInTheDocument()
    );
  });

  test("loads and displays contact messages when admin", async () => {
    const mockContacts = [
      {
        _id: "1",
        firstname: "Alice",
        lastname: "Brown",
        email: "alice@example.com",
        phone: "123",
        message: "Hi!",
      },
    ];

    apiRequest.mockResolvedValueOnce(mockContacts);

    renderWithAuth({ role: "admin" });

    await waitFor(() =>
      expect(screen.getByText(/Alice Brown/i)).toBeInTheDocument()
    );
  });

  test("editing a message pre-fills the form", async () => {
    const mockContacts = [
      {
        _id: "1",
        firstname: "Bob",
        lastname: "Stone",
        email: "bob@mail.com",
        phone: "999",
        message: "Fix this",
      },
    ];

    apiRequest.mockResolvedValueOnce(mockContacts);
    renderWithAuth({ role: "admin" });

    await screen.findByText(/Bob Stone/i);
    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByLabelText(/Full Name/i)).toHaveValue("Bob Stone");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("bob@mail.com");
    expect(screen.getByLabelText(/Phone/i)).toHaveValue("999");
    expect(screen.getByLabelText(/Message/i)).toHaveValue("Fix this");
  });

  test("shows error when API fails", async () => {
    apiRequest.mockRejectedValueOnce();

    renderWithAuth({ role: "user" });

    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "Error User" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "err@mail.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/Action failed — Admin required for changes./i)
      ).toBeInTheDocument()
    );
  });
});
