defmodule Tracker.Library do

  @user_agent [{"User-agent", "example.com"}]

  def fetch(isbn) do
    library_url(isbn)
    |> HTTPoison.get(@user_agent)
    |> handle_response
  end


  def library_url(isbn) do
    IO.puts "getting url"
    "http://openlibrary.org/api/books\?bibkeys\=ISBN:#{isbn}\&format\=json\&jscmd\=data"
  end

  def handle_response({:ok, %{status_code: 200, body: "{}"}}) do
    {:nothing, "nowt here"}
  end

  def handle_response({:ok, %{status_code: 200, body: body}}) do
    {:ok, Poison.Parser.parse!(body)}
  end

  def handle_response({_, %{status_code: _, body: body}}) do
    {:error, Poison.Parser.parse!(body)}
  end
end
