defmodule Router do
  use Plug.Router
  require Logger

  plug CORSPlug
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
    case conn.params do
      %{"title" => _, "author" => _} ->
        Tracker.Book.create conn.params
        send_resp conn, 200, "thank you"
      _ -> send_resp conn, 400, "invalid payload"
    end

  end
  get "/lookup" do
    case conn.params do
      %{"isbn" => isbn} ->
        case Tracker.Library.fetch(isbn) do
          {:ok, data} ->
            conn
            |> put_resp_content_type("application/json")
            |> send_resp(200, Poison.encode! data)
          _ -> send_resp conn, 404, "not found"
        end
        _ -> send_resp conn, 400, "invalid params"
    end
  end
  match _ do
    send_resp conn, 404, "oops"
  end

  def get_book_data(book) do
    Map.drop(book, [:__meta__, :__struct__])
  end
end
