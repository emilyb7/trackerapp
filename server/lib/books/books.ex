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
    Repo.all(q) |> Enum.map(&get_book_data(&1))
  end

  def get_book(book_id), do: Repo.one(from(b in Book, where: [id: ^book_id])) |> get_book_data

  def get_by_isbn(isbn), do: Repo.one(from(b in Book, where: [isbn: ^isbn])) |> get_book_data

  def get_by_ids(ids),
    do: Repo.all(from(b in Book, where: b.id in ^ids)) |> Enum.map(&get_book_data(&1))

  def check_book_exists(book_id) do
    case Repo.one(from(b in Book, where: [id: ^book_id])) do
      nil -> :not_found
      book -> :ok
    end
  end

  def create(book_params) do
    changeset = changeset(%Book{}, book_params)
    Tracker.Repo.insert(changeset)
  end

  defp get_book_data(book) do
    unless book === nil do
      Map.drop(book, [:__meta__, :__struct__])
    end
  end
end
