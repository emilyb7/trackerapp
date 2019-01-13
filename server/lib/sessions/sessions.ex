defmodule Tracker.Session do
  use Ecto.Schema

  import Ecto.Changeset
  import Ecto.Query

  alias Tracker.{Session, Book, Repo}

  # This is the one that includes cast
  schema "sessions" do
    field(:book_id, :integer)
    field(:started_at, :naive_datetime)
    field(:finished_at, :naive_datetime)
    field(:progress, :integer)
    timestamps()
  end

  @required_fields ~w(book_id started_at finished_at progress)
  @optional_fields ~w()
  def changeset(session, params \\ :empty) do
    session
    |> cast(params, @required_fields, @optional_fields)
  end

  def create(session_params) do
    changeset = changeset(%Session{}, session_params)

    case Tracker.Repo.insert(changeset) do
      {:ok, record} ->
        Map.fetch!(record, :id)

      {:error, _changeset} ->
        :error
    end
  end

  def start(book_id) do
    create(%{book_id: book_id, started_at: NaiveDateTime.utc_now()})
  end

  def finish(session_id) do
    updated =
      Tracker.Repo.update_all(
        from(
          s in "sessions",
          where: [id: ^session_id]
        ),
        set: [finished_at: NaiveDateTime.utc_now()]
      )

    case updated do
      {1, nil} -> :ok
      {0, nil} -> :not_found
      _ -> :error
    end
  end

  def get_by_query(query \\ :empty) do
    q =
      case query do
        :empty ->
          from(Session)

        %{"finished" => "false"} ->
          from(
            s in Session,
            where: is_nil(s.finished_at)
          )
      end

    Repo.all(q) |> Enum.map(&get_session_data(&1))
  end

  def get_by_book_id(book_id, params \\ :empty) do
    q =
      case params do
        :empty ->
          from(Session, where: [book_id: ^book_id])

        %{:finished => true} ->
          from(s in Session, where: s.book_id == ^book_id and not is_nil(s.finished_at))

        %{:finished => false} ->
          from(s in Session, where: s.book_id == ^book_id and is_nil(s.finished_at))
      end

    Repo.all(q) |> Enum.map(&get_session_data(&1))
  end

  defp get_session_data(session) do
    Map.drop(session, [:__meta__, :__struct__])
  end
end
