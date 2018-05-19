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

  def get_test_book_id do
    Repo.one(from b in Book) |> Map.fetch!(:id)
  end

  test "creating a session" do
    previousCount =
      Session
      |> Repo.all()
      |> Enum.count()

    test_book_id = Repo.one(from b in Book) |> Map.fetch!(:id)

    assert is_integer(Session.create(%{ book_id: get_test_book_id(), started_at: NaiveDateTime.utc_now }))
    assert(Session |> Repo.all() |> Enum.count === previousCount + 1)
    assert(Repo.all(from s in Session, where: [book_id: ^(test_book_id)]) |> Enum.count == 1)
  end

  test "starting a session" do
    assert is_integer Session.start(get_test_book_id())
  end

  test "finishing a session" do
    Session.create(%{ book_id: get_test_book_id(), started_at: NaiveDateTime.utc_now })
    session_id = Repo.one(from Session) |> Map.fetch!(:id)
    assert Session.finish(session_id) == :ok
  end

  test "finishing a session - session does not exist" do
    assert Session.finish(999999) == :not_found
  end

  test "get sessions by book id - book does not exist" do
    assert Session.get_by_book_id(999999) == []
  end

  test "get sessions by book id - success" do
    test_book_id = get_test_book_id()
    Session.create(%{ book_id: get_test_book_id(), started_at: NaiveDateTime.utc_now })
    assert Session.get_by_book_id(test_book_id) |> Enum.count === 1
  end
end
