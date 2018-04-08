# Tracker

## Things to do
- Getting book details from third party API ✅
- Saving books to DB
- Saving sessions to DB
- API

## Open library API

Example url:

`http://openlibrary.org/api/books\?bibkeys\=ISBN:9780141439518\&format\=json\&jscmd\=data`

## Get data from API

Run `iex -S mix`

then `Tracker.Library.fetch($ISBN)`

## DB

Books:
- ID
- ISBN
- Title
- Image
- Author

## Setup
- Create `config/config.exs` with the following content:
```elixir
use Mix.Config

config :tracker, Tracker.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "tracker_repo",
  username: "$POSTGRES_USERNAME",
  password: "$PASSWORD",
  hostname: "localhost"

config :tracker, ecto_repos: [Tracker.Repo]
```

- Create a postgres database by running `mix ecto.create`
- Run `mix ecto.migrate`

When running in IEX, run `Tracker.Repo.start_link()` in order to be able to connect to postgres

## Installation

If [available in Hex](https://hex.pm/docs/publish), the package can be installed
by adding `tracker` to your list of dependencies in `mix.exs`:

```elixir
def deps do
  [
    {:tracker, "~> 0.1.0"}
  ]
end
```

Documentation can dbe generated with [ExDoc](https://github.com/elixir-lang/ex_doc)
and published on [HexDocs](https://hexdocs.pm). Once published, the docs can
be found at [https://hexdocs.pm/tracker](https://hexdocs.pm/tracker).
