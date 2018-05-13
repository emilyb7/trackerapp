defmodule Tracker.Session do
  use Ecto.Schema

  import Ecto.Changeset
  import Ecto.Query

  alias Tracker.{Session, Repo}

  # This is the one that includes cast
  schema "sessions" do
    field :book_id, :integer
    field :started_at, :naive_datetime
    field :finished_at, :naive_datetime
    field :progress, :integer
    timestamps()
  end
  @required_fields ~w(book_id started_at)
  @optional_fields ~w()
  def changeset(session, params \\ :empty) do
    session
    |> cast(params, @required_fields, @optional_fields)
  end

  def create(session_params) do
    changeset = changeset(%Session{}, session_params)
    case Tracker.Repo.insert(changeset) do
      {:ok, _record} ->
        :ok

      {:error, _changeset} ->
        :error
    end
  end
end
