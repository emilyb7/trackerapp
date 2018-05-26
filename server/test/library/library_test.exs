defmodule Tracker.LibraryTest do
  alias Tracker.{Library}
  use ExUnit.Case
  import Mock

  defp succesful_response do
    test_data = read_example_data("charlottes-web")
    {:ok, %{status_code: 200, body: test_data}}
  end

  defp no_image_response do
    test_data = read_example_data("emma")
    {:ok, %{status_code: 200, body: test_data}}
  end

  defp no_results_response do
    {:ok, %{status_code: 200, body: "{}"}}
  end

  defp error_response do
    {:ok, %{status_code: 404, body: "{\"error\": \"error\"}"}}
  end

  defp read_example_data(book_title) do
    (Path.join(["test", "test-data", book_title]) <> ".json") |> File.read!()
  end

  def mock_request(response) do
    with_mock HTTPoison, get: fn _a, _b, _url -> response end do
      Library.fetch("whatever")
    end
  end

  test "library fetch success case" do
    {:ok, %{:title => title, :author => author, :cover => cover, :isbn => _}} =
      succesful_response() |> mock_request

    assert title === "Charlotte's Web"
    assert cover === "https://covers.openlibrary.org/b/id/8140481-M.jpg"
    assert author === "E. B. White"
  end

  test "library fetch success case when no image available" do
    {:ok, %{:title => title, :author => _, :cover => cover, :isbn => _}} =
      no_image_response() |> mock_request

    assert title === "Emma"
    assert cover === nil
  end

  test "library fetch no results" do
    assert no_results_response()
           |> mock_request()
           |> Tuple.to_list()
           |> Enum.at(0) === :nothing
  end

  test "library fetch API returns error" do
    assert error_response()
           |> mock_request() === {:error, %{"error" => "error"}}
  end
end
