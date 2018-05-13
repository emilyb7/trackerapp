defmodule Tracker.Library do

  @user_agent [{"User-agent", "example.com"}]
  @headers ["Accept": "Application/json; Charset=utf-8"]

  def fetch(isbn) do
    library_url(isbn)
    |> HTTPoison.get(@headers, @user_agent)
    |> handle_response
  end


  def library_url(isbn) do
    "http://openlibrary.org/api/books\?bibkeys\=ISBN:#{isbn}\&format\=json\&jscmd\=data"
  end

  def handle_response({:ok, %{status_code: 200, body: "{}"}}) do
    {:nothing, "nowt here"}
  end

  def handle_response({:ok, %{status_code: 200, body: body}}) do
    body = Poison.decode!(body) |> Map.values |> Enum.at(0)
    title = Map.fetch!(body, "title")
    author = Map.fetch!(body, "authors") |> Enum.at(0) |> Map.fetch!("name")
    cover = get_cover(body)
    isbn = Map.fetch!(body, "identifiers") |> Map.fetch!("isbn_13") |> Enum.at(0)

    response = %{
      :title => title,
      :author => author,
      :cover => cover,
      :isbn => isbn
    }

    {:ok, response}
  end

  def handle_response({_, %{status_code: _, body: body}}) do
    {:error, Poison.Parser.parse!(body)}
  end

  def get_cover(book_data) do
    case Map.fetch(book_data, "cover") do
      {:ok, cover} ->
         Map.fetch!(cover, "medium")
      :error -> nil
    end
  end
end
