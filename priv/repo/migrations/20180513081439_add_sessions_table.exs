defmodule Tracker.Repo.Migrations.AddSessionsTable do
  use Ecto.Migration

  def change do
    create table(:sessions) do
      add(:book_id, references("books"))
      add(:started_at, :naive_datetime)
      add(:finished_at, :naive_datetime)
      add(:progress, :integer)

      timestamps()
    end
  end
end
