defmodule Tracker.BooksTest do
  alias Tracker.{Books,Books_Commands,Repo}
  use ExUnit.Case

  test "adding a book" do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
    previousCount = Books |> Repo.all |> Enum.count
    Books_Commands.create()
    newCount = Books |> Repo.all |> Enum.count
    assert newCount == previousCount + 1
  end
end
