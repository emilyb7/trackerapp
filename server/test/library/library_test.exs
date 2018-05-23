defmodule Tracker.LibraryTest do
  alias Tracker.{Library}
  use ExUnit.Case
  import Mock

  defp succesful_response do
    test_data = Path.join(["test", "test-data", "open-library.json"]) |> File.read!
    {:ok, %{status_code: 200, body: test_data}}
  end

  defp no_results_response do
    {:ok, %{status_code: 200, body: "{}"}}
  end

  defp error_response do
    {:ok, %{status_code: 404, body: "{\"error\": \"error\"}"}}
  end

  def mock_request(response) do
    with_mock HTTPoison, [get: fn(_a, _b, _url) -> response end] do
      Library.fetch("whatever")
    end
  end

  test "library fetch success case" do
    {:ok, %{
      :title => title,
      :author => _,
      :cover => _,
      :isbn => _}
    } = succesful_response() |> mock_request
    assert title === "Emma"
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
