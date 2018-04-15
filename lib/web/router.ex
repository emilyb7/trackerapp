defmodule Router do
  use Plug.Router

  plug Plug.Parsers, parsers: [:urlencoded, :multipart]
  plug :match
  plug :dispatch
  get "/" do
    send_resp conn, 200, "Welcome"
  end
  get "/books" do
    books =
      Tracker.Book.get_books()
      # |> Enum.map(fn map ->
      #               Map.drop(map,
      #                        [
      #                          :__meta__,
      #                          :__struct__
      #                        ])
      #             end)
      # |> inspect()
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, books)
  end
  match _ do
    send_resp conn, 404, "oops"
  end
end
