defmodule Tracker.Repo.Migrations.Books do
  use Ecto.Migration

  def change do
    create table(:books) do
      add(:isbn, :string, unique: true)
      add(:title, :string)
      add(:author, :string)
      add(:cover, :string)

      timestamps
    end
  end

end
