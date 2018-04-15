defmodule Tracker.BooksTest do
  alias Tracker.{Book, Repo}

  use ExUnit.Case

  test "adding a book" do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
    previousCount =
      Book
      |> Repo.all()
      |> Enum.count()
    assert Book.create(%{
                                   title: "Charlottes Web",
                                   isbn: "9780064400558",
                                   author: "E.B. White",
                                   cover: "https://covers.openlibrary.org/w/id/8156475-M.jpg",
                                 }) ==
             :ok
    newCount =
      Book
      |> Repo.all()
      |> Enum.count()
    assert newCount == previousCount + 1
  end
end
