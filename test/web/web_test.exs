defmodule Router.Test do
  use ExUnit.Case
  use Plug.Test

  alias Router
  alias Tracker.{Book, Repo}

  @opts Router.init([])
  setup do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
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
    Book.create(test_book)
    conn =
      conn(:get, "/books", "")
      |> Router.call(@opts)
    assert conn.state === :sent
    assert conn.status === 200
    # res = Poison.Parser.parse!(conn.resp_body)
    # IO.inspect(is_binary res)
  end
end
