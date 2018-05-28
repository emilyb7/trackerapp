defmodule Tracker.Book do
  use Ecto.Schema

  import Ecto.Changeset
  import Ecto.Query

  alias Tracker.{Book, Repo}

  # This is the one that includes cast
  schema "books" do
    field(:title, :string)
    field(:isbn, :string)
    field(:author, :string)
    field(:cover, :string)
    timestamps()
  end

  @required_fields ~w(title isbn author cover)
  @optional_fields ~w()
  def changeset(book, params \\ :empty) do
    book
    |> cast(params, @required_fields, @optional_fields)
    |> unique_constraint(:isbn)
  end

  def get_books(limit \\ 20) do
    q = from(b in Book, limit: ^limit)
    Repo.all(q)
  end

  def create(book_params) do
    changeset = changeset(%Book{}, book_params)

    case Tracker.Repo.insert(changeset) do
      {:ok, _record} ->
        :ok

      {:error, _changeset} ->
        :error
    end
  end
end
