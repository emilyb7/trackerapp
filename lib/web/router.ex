defmodule Router do
  use Plug.Router
  require Logger

  plug Plug.Parsers, parsers: [:urlencoded, :json], json_decoder: Poison
  plug :match
  plug :dispatch
  get "/" do
    send_resp conn, 200, "Welcome"
  end
  get "/books" do
    books =
      Tracker.Book.get_books() |> Enum.map(&(get_book_data &1)) |> Poison.encode!
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, books)
  end
  post "/books/create" do
    conn.params |> Tracker.Book.create
    send_resp conn, 200, "thank you"
  end
  match _ do
    send_resp conn, 404, "oops"
  end

  def get_book_data(book) do
    Map.drop(book, [:__meta__, :__struct__])
  end
end
