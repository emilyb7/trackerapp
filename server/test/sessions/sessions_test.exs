defmodule Tracker.SessionsTest do
  import Ecto.Query

  alias Tracker.{Book, Session, Repo}

  use ExUnit.Case

  setup do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
  end

  def get_test_book_id do
    {:ok, book} =
      Book.create(%{
        title: "Charlottes Web",
        isbn: "9780064400558",
        author: "E.B. White",
        cover: "https://covers.openlibrary.org/w/id/8156475-M.jpg"
      })

    Map.fetch!(book, :id)
  end

  test "creating a session" do
    test_book_id = get_test_book_id()

    Session.create(%{book_id: test_book_id, started_at: NaiveDateTime.utc_now()})

    assert Repo.one(from(s in Session, where: [book_id: ^test_book_id]))
  end

  test "starting a session" do
    book_id = get_test_book_id()
    session = Session.start(book_id)
    assert is_integer(session)
  end

  test "finishing a session" do
    Session.create(%{book_id: get_test_book_id(), started_at: NaiveDateTime.utc_now()})
    session_id = Repo.one(from(Session)) |> Map.fetch!(:id)
    assert Session.finish(session_id) == :ok
  end

  test "finishing a session - session does not exist" do
    assert Session.finish(999_999) == :not_found
  end

  test "get sessions by book id - book does not exist" do
    assert Session.get_by_book_id(999_999) == []
  end

  test "get sessions by book id - success" do
    test_book_id = get_test_book_id()
    Session.create(%{book_id: test_book_id, started_at: NaiveDateTime.utc_now()})
    assert Session.get_by_book_id(test_book_id) |> Enum.count() === 1
  end

  test "get sessions by book id - finished sessions only" do
    test_book_id = get_test_book_id()

    Session.create(%{
      book_id: test_book_id,
      started_at: NaiveDateTime.utc_now(),
      finished_at: NaiveDateTime.utc_now()
    })

    Session.create(%{
      book_id: test_book_id,
      started_at: NaiveDateTime.utc_now(),
      finished_at: NaiveDateTime.utc_now()
    })

    Session.create(%{book_id: test_book_id, started_at: NaiveDateTime.utc_now()})

    options = %{finished: true}
    assert Session.get_by_book_id(test_book_id, options) |> Enum.count() === 2
  end

  test "get sessions by book id - unfinished sessions only" do
    test_book_id = get_test_book_id()

    Session.create(%{
      book_id: test_book_id,
      started_at: NaiveDateTime.utc_now(),
      finished_at: NaiveDateTime.utc_now()
    })

    Session.create(%{
      book_id: test_book_id,
      started_at: NaiveDateTime.utc_now(),
      finished_at: NaiveDateTime.utc_now()
    })

    Session.create(%{book_id: test_book_id, started_at: NaiveDateTime.utc_now()})

    options = %{finished: false}
    assert Session.get_by_book_id(test_book_id, options) |> Enum.count() === 1
  end
end
