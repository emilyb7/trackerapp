defmodule Tracker.BooksTest do
  alias Tracker.{Book, Repo}

  use ExUnit.Case

  setup do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
  end
  test "create adds a new book to DB" do
    previousCount =
      Book
      |> Repo.all()
      |> Enum.count()
    assert Book.create(%{
                         title: "Charlottes Web",
                         isbn: "9780064400558",
                         author: "E.B. White",
                         cover: "https://covers.openlibrary.org/w/id/8156475-M.jpg",
                       }) ===
             :ok
    newCount =
      Book
      |> Repo.all()
      |> Enum.count()
    assert newCount === previousCount + 1
  end
  test "get_books returns empty list when no books available" do
    # no books yet
    assert Book.get_books(0) === []
    assert Book.get_books(1) === []
  end
  test "get_books returns list of available books" do
    test_book = %{
      title: "Charlottes Web",
      isbn: "9780064400558",
      author: "E.B. White",
      cover: "https://covers.openlibrary.org/w/id/8156475-M.jpg",
    }
    # create a book
    Book.create(test_book)
    assert Book.get_books(0) === []
    assert Book.get_books()
             |> Enum.count() === 1
  end
end
