defmodule Tracker.Library do

  @user_agent [{"User-agent", "example.com"}]
  @headers ["Accept": "Application/json; Charset=utf-8"]

  def fetch(isbn) do
    library_url(isbn)
    |> HTTPoison.get(@headers, @user_agent)
    |> handle_response(isbn)
  end

  defp library_url(isbn) do
    "http://openlibrary.org/api/books\?bibkeys\=ISBN:#{isbn}\&format\=json\&jscmd\=data"
  end

  # no matching book
  defp handle_response({:ok, %{status_code: 200, body: "{}"}}, _isbn) do
    {:nothing, "nowt here"}
  end

  # success case
  defp handle_response({:ok, %{status_code: 200, body: body}}, isbn) do
    book_data = fetch_request_body_data(body)

    response = %{
      :title => get_title(book_data),
      :author => get_author(book_data),
      :cover => get_cover(book_data),
      :isbn => isbn
    }

    {:ok, response}
  end

  # error case
  defp handle_response({_, %{status_code: _, body: body}}, _isbn) do
    {:error, Poison.Parser.parse!(body)}
  end

  defp fetch_request_body_data(body) do
    Poison.decode!(body) |> Map.values |> Enum.at(0)
  end

  defp get_cover(book_data) do
    get_in(book_data, ["cover", "medium"])
  end

  defp get_title(book_data) do
    Map.fetch!(book_data, "title")
  end

  defp get_author(book_data) do
    book_data |> Map.fetch!("authors") |> Enum.at(0) |> Map.fetch!("name")
  end
end
