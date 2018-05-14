defmodule Tracker.SessionsTest do
  import Ecto.Query

  alias Tracker.{Book, Session, Repo}

  use ExUnit.Case

  setup do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
    %{
      title: "Charlottes Web",
      isbn: "9780064400558",
      author: "E.B. White",
      cover: "https://covers.openlibrary.org/w/id/8156475-M.jpg",
    } |> Book.create()
  end

  test "creating a session in DB" do
    previousCount =
      Session
      |> Repo.all()
      |> Enum.count()

    test_book_id = Repo.one(from b in Book) |> Map.fetch!(:id)

    assert Session.create(%{ book_id: test_book_id, started_at: NaiveDateTime.utc_now }) == :ok
    assert(Session |> Repo.all() |> Enum.count === previousCount + 1)
    assert(Repo.all(from s in Session, where: [book_id: ^(test_book_id)]) |> Enum.count) === 1

  end
end
