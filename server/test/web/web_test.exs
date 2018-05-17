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
    %{
      title: "Charlottes Web",
      isbn: "9780064400558",
      author: "E.B. White",
      cover: "https://covers.openlibrary.org/w/id/8156475-M.jpg",
    } |> Book.create()

    Repo.one(from b in Book) |> Map.fetch!(:id)
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
      cover: "https://covers.openlibrary.org/w/id/8156475-M.jpg",
    }
    Book.create test_book
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
  test "/books/create adds book to DB" do
    test_book = File.read!("test/test-data/example.json")
    conn =
      conn(:post, "/books/create", test_book)
      |> put_req_header("content-type", "application/json")
      |> Router.call(@opts)
    assert conn.state === :sent
    assert conn.status === 200
    [res] = Book.get_books()
    assert res.author === Poison.decode!(test_book)
             |> Map.get("author")
  end
  test "/books/create throws 400 with invalid payload" do
    conn =
      conn(:post, "/books/create", "")
      |> put_req_header("content-type", "application/json")
      |> Router.call(@opts)
    assert conn.state === :sent
    assert conn.status === 400
  end
  test "/lookup returns valid data from API" do
    isbn = "9780345505101"
    conn =
      conn(:get, "/lookup?isbn=" <> isbn, "")
      |> Router.call(@opts)
    assert conn.state === :sent
    assert conn.status === 200

    data = conn.resp_body |> Poison.decode!
    assert Map.fetch!(data, "isbn") === isbn
  end

  test "/books:book_id/start returns 200" do
    test_book_id = get_test_book()

    conn =
      conn(:get, ~s(/books/#{test_book_id}/start), "")
      |> Router.call(@opts)
    assert conn.state === :sent
    assert conn.status === 200
  end

  test "/books/:book_id/start returns 404 when book does not exist" do
    conn =
      conn(:get, ~s(/books/#{999999}/start), "")
      |> Router.call(@opts)
    assert conn.state === :sent
    assert conn.status === 404
  end

  test "/sessions/:session_id/finish returns 200" do
    session_id = Tracker.Session.finish(get_test_book())
    conn = conn(:get, ~s(/sessions/#{session_id}/finish), "")
    |> Router.call(@opts)

    assert conn.state === :sent
    assert conn.status === 200
  end
end
