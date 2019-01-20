defmodule Tracker.Repo.Migrations.CreateSessionsAllBooks do
  use Ecto.Migration

  def change do
    execute "INSERT into sessions(book_id, started_at, inserted_at, updated_at) SELECT id, inserted_at, NOW(), NOW() FROM books WHERE id NOT IN SELECT book_id from sessions"
  end
end
