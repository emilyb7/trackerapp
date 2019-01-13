defmodule Router.Test do
  import Ecto.Query
  use ExUnit.Case
  use Plug.Test

  alias Router
  alias Tracker.{Book, Repo, Session}

  @opts Router.init([])
  setup do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
  end

  def get_test_book() do
    isbn = :rand.uniform(1000) |> Integer.to_string()

    %{
      title: "Charlottes Web",
      isbn: isbn,
      author: "E.B. White",
      cover: "https://covers.openlibrary.org/w/id/8156475-M.jpg"
    }
    |> Book.create()

    Repo.one(from(b in Book, where: b.isbn == ^isbn)) |> Map.fetch!(:id)
  end

  test "returns welcome" do
    conn =
      conn(:get, "/", "")
      |> Router.call(@opts)

    assert conn.state === :sent
    assert conn.status === 200
  end

  test "/books returns list of books" do
    test_book = %{
      title: "Charlottes Web",
      isbn: "9780064400558",
      author: "E.B. White",
      cover: "https://covers.openlibrary.org/w/id/8156475-M.jpg"
    }

    Book.create(test_book)

    conn =
      conn(:get, "/books", "")
      |> Router.call(@opts)

    res = Poison.Parser.parse!(conn.resp_body)
    assert conn.state === :sent
    assert conn.status === 200
    assert Enum.count(res) === 1

    assert res
           |> Enum.at(0)
           |> Map.get("title") === test_book.title
  end

  test "/book/:id returns a single book" do
    test_book_id = get_test_book() |> to_string
    url = "/books/" <> test_book_id

    conn =
      conn(:get, url, "")
      |> put_req_header("content-type", "application/json")
      |> Router.call(@opts)

    assert conn.state === :sent
    assert conn.status === 200

    res = Poison.Parser.parse!(conn.resp_body)
    assert Map.fetch!(res, "title") === "Charlottes Web"
  end

  test "/book/:id when book does not exist" do
    url = "/books/9999"

    conn =
      conn(:get, url, "")
      |> put_req_header("content-type", "application/json")
      |> Router.call(@opts)

    assert conn.state === :sent
    assert conn.status === 404
  end

  test "/books/create adds book to DB" do
    test_book = File.read!("test/test-data/example.json")

    conn =
      conn(:post, "/books/create", test_book)
      |> put_req_header("content-type", "application/json")
      |> Router.call(@opts)

    assert conn.state === :sent
    assert conn.status === 200
    [res] = Book.get_books()

    assert res.author ===
             Poison.decode!(test_book)
             |> Map.get("author")
  end

  test "/books/create throws 400 with invalid payload" do
    conn =
      conn(:post, "/books/create", "")
      |> Router.call(@opts)

    assert conn.state === :sent
    assert conn.status === 400
  end

  test "/lookup returns valid data from API" do
    isbn = "9780345505101"

    conn =
      conn(:get, "/lookup/" <> isbn, "")
      |> Router.call(@opts)

    assert conn.state === :sent
    assert conn.status === 200

    data = conn.resp_body |> Poison.decode!()
    assert Map.fetch!(data, "isbn") === isbn
  end

  test "/books/:book_id/sessions returns list of sessions for a given book" do
    test_book_id = get_test_book()
    Session.start(test_book_id)

    conn =
      conn(:get, Path.join(["books", Integer.to_string(test_book_id), "sessions"]), "")
      |> Router.call(@opts)

    assert conn.state === :sent
    assert conn.status === 200

    res = Poison.Parser.parse!(conn.resp_body)
    assert Enum.count(res) === 1
  end

  @tag :wip
  test "/session returns sessions matching the given query" do
    test_book_started = get_test_book()
    Session.start(test_book_started)

    test_book_finished = get_test_book()
    session_id = Session.start(test_book_finished)
    Session.finish(session_id)

    conn =
      conn(:get, "/session?finished=false&expand=BOOK", "")
      |> Router.call(@opts)

    assert conn.state === :sent
    assert conn.status === 200

    res = Poison.Parser.parse!(conn.resp_body)
    assert Enum.count(res) === 1

    [session] = res

    assert Map.fetch!(session, "book") |> Map.fetch!("id") === test_book_started
  end

  test "/book/:book_id/sessions returns 404 when no matching sessions found" do
    test_book_id = get_test_book()

    conn =
      conn(:get, Path.join(["books", Integer.to_string(test_book_id), "sessions"]), "")
      |> Router.call(@opts)

    assert conn.state === :sent
    assert conn.status === 404
  end

  test "/books/:book_id/sessions returns 400 when book doesnt exist" do
    book_id = "999999"
    conn = conn(:get, Path.join(["books", book_id, "sessions"]), "") |> Router.call(@opts)

    assert conn.state === :sent
    assert conn.status === 400
  end

  test "/books/:book_id/start returns 200" do
    test_book_id = get_test_book()

    conn =
      conn(:post, ~s(/books/#{test_book_id}/start), "")
      |> Router.call(@opts)

    assert conn.state === :sent
    assert conn.status === 200
  end

  test "/books/:book_id/start returns 400 when book does not exist" do
    conn =
      conn(:post, ~s(/books/#{999_999}/start), "")
      |> Router.call(@opts)

    assert conn.state === :sent
    assert conn.status === 400
  end

  test "/books/:book_id/start returns 400 when session already exists" do
    test_book_id = get_test_book()
    Session.start(test_book_id)

    conn =
      conn(:post, ~s(/books/#{test_book_id}/start), "")
      |> Router.call(@opts)

    assert conn.state === :sent
    assert conn.status === 400
  end

  test "/sessions/:session_id/finish returns 200" do
    session_id = Session.start(get_test_book())

    conn =
      conn(:post, ~s(/sessions/#{session_id}/finish), "")
      |> Router.call(@opts)

    assert conn.state === :sent
    assert conn.status === 200
  end
end
