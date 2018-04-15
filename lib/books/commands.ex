defmodule Tracker.Books_Commands do
  alias Tracker.{Books, Repo}

  def create(book_params) do
    changeset =
      Books.changeset(%Books{},
                      %{
                        title: book_params["title"],
                        isbn: book_params["isbn"],
                        author: book_params["author"],
                        cover: book_params["cover"],
                      })
    case Repo.insert(changeset) do
      {:ok, _record} ->
        "ok"

      {:error, _changeset} ->
        "error"
    end
  end
end
