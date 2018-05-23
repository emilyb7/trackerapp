defmodule Tracker.LibraryTest do
  alias Tracker.{Library}
  use ExUnit.Case
  import Mock

  defp succesful_response do
    test_data = Path.join(["test", "test-data", "open-library.json"]) |> File.read!
    {:ok, %{status_code: 200, body: test_data}}
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


end
