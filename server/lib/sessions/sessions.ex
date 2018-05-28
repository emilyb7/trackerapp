defmodule Tracker.Session do
  use Ecto.Schema

  import Ecto.Changeset
  import Ecto.Query

  alias Tracker.{Session, Repo}

  # This is the one that includes cast
  schema "sessions" do
    field(:book_id, :integer)
    field(:started_at, :naive_datetime)
    field(:finished_at, :naive_datetime)
    field(:progress, :integer)
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

  def finish(session_id) do
    updated =
      Tracker.Repo.update_all(
        from(s in "sessions", where: [id: ^session_id]),
        set: [finished_at: NaiveDateTime.utc_now()]
      )

    case updated do
      {1, nil} -> :ok
      {0, nil} -> :not_found
      _ -> :error
    end
  end

  def get_by_book_id(book_id) do
    Repo.all(from(Session, where: [book_id: ^book_id]))
  end
end
