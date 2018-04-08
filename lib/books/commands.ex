defmodule Tracker.Books_Commands do
  alias Tracker.{Books, Repo}

  def create() do
    changeset =
      Books.changeset(%Books{},
                      %{title: "abc", isbn: "1234", author: "JB", cover: ""})

    case Repo.insert(changeset) do
     {:ok, _record} -> "ok"
     {:error, _changeset} -> "error"
    end
  end

end
