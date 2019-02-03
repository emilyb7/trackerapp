defmodule Tracker.Repo.Migrations.FillMissingSession do
  use Ecto.Migration

  def change do
    execute "UPDATE sessions s SET started_at = (SELECT inserted_at FROM books WHERE id = s.id) WHERE s.started_at IS NULL;"
  end
end
