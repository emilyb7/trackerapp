defmodule Tracker.BooksTest do
  import Ecto.Query

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

  test "check book exists - returns :ok when book exists" do
    test_book = %{
      title: "Charlottes Web",
      isbn: "9780064400558",
      author: "E.B. White",
      cover: "https://covers.openlibrary.org/w/id/8156475-M.jpg",
    }
    # create a book
    Book.create(test_book)
    test_book_id = Repo.one(from Book) |> Map.fetch!(:id)
    assert Book.check_book_exists(test_book_id) === :ok
  end

  test "check book exists - returns :not_found when no book exists" do
    assert Book.check_book_exists(999999) === :not_found

  end
end
