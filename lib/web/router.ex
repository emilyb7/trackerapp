defmodule Router do
  use Plug.Router
  require Logger

  plug(CORSPlug)
  plug(Plug.Parsers, parsers: [:urlencoded, :json], json_decoder: Poison)
  plug(:match)
  plug(:dispatch)

  get "/" do
    send_resp(conn, 200, "Welcome")
  end

  get "/books" do
    books = Tracker.Book.get_books() |> Poison.encode!()

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, books)
  end

  get "/books/:id" do
    Tracker.Book.get_book(id)

    case Tracker.Book.get_book(id) do
      nil ->
        conn |> send_resp(404, "not found")

      book ->
        conn
        |> put_resp_content_type("application/json")
        |> send_resp(200, Poison.encode!(book))
    end
  end

  post "/books/create" do
    case conn.body_params do
      %{"title" => _, "author" => _} ->
        Tracker.Book.create(conn.params)
        send_resp(conn, 200, "thank you")

      _ ->
        send_resp(conn, 400, "invalid payload")
    end
  end

  post "/session" do
    case conn.body_params do
      %{"title" => _, "author" => _, "isbn" => isbn} ->
        book = Tracker.Book.get_by_isbn(isbn)

        case book do
          %{:id => book_id} ->
            s = Tracker.Session.create(%{book_id: book_id, started_at: NaiveDateTime.utc_now()})
            send_resp(conn, 201, Poison.encode!(%{id: s}))

          nil ->
            {:ok, b} = Tracker.Book.create(conn.body_params)
            s = Tracker.Session.create(%{book_id: b.id, started_at: NaiveDateTime.utc_now()})
            send_resp(conn, 201, Poison.encode!(%{id: s}))
        end

      _ ->
        send_resp(conn, 400, "invalid payload")
    end
  end

  get "/lookup/:isbn" do
    case conn.params do
      %{"isbn" => isbn} ->
        case Tracker.Library.fetch(isbn) do
          {:ok, data} ->
            conn
            |> put_resp_content_type("application/json")
            |> send_resp(200, Poison.encode!(data))

          _ ->
            send_resp(conn, 404, "not found")
        end

      _ ->
        send_resp(conn, 400, "invalid params")
    end
  end

  get "books/:book_id/sessions" do
    cond do
      Tracker.Book.check_book_exists(book_id) !== :ok ->
        conn |> send_resp(400, "book does not exist")

      true ->
        Tracker.Session.get_by_book_id(book_id) |> handle_sessions_result(conn)
    end
  end

  defp handle_sessions_result([], conn) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(404, "not found")
  end

  defp handle_sessions_result(sessions, conn) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Poison.encode!(sessions))
  end

  post "/books/:book_id/start" do
    cond do
      # get book first
      Tracker.Book.check_book_exists(book_id) !== :ok ->
        conn |> send_resp(400, "book does not exist found")

      # check for existing session
      Tracker.Session.get_by_book_id(book_id, %{finished: false}) |> Enum.count() > 0 ->
        conn |> send_resp(400, "session already exists")

      # create session
      Tracker.Session.start(book_id) |> is_integer ->
        conn |> send_resp(200, "ok")
    end
  end

  get "/session" do
    conn = fetch_query_params(conn)
    sessions = Tracker.Session.get_by_query(conn.params)
    book_ids = Enum.map(sessions, fn %{book_id: book_id} -> book_id end)

    book_lookup =
      Tracker.Book.get_by_ids(book_ids)
      |> Enum.reduce(%{}, fn x, acc -> Map.put(acc, x.id, x) end)

    sessions_with_books =
      Enum.map(sessions, fn s -> Map.put(s, "book", Map.fetch!(book_lookup, s.book_id)) end)

    conn |> send_resp(200, Poison.encode!(sessions_with_books))
  end

  put "/session/:session_id/finish" do
    case Tracker.Session.finish(String.to_integer(session_id)) do
      :ok -> conn |> send_resp(200, "ok")
      :not_found -> conn |> send_resp(404, "not found")
    end
  end

  match _ do
    send_resp(conn, 404, "oops")
  end
end
