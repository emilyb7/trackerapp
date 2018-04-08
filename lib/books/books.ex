defmodule Tracker.Books do
  use Ecto.Schema
  import Ecto.Changeset # This is the one that includes cast

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

end
