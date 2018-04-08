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

then `Library.Library.fetch($ISBN)`

## DB

Books:
- ID
- ISBN
- Title
- Image
- Author

## Setup

- Create a postgres database called 'tracker_repo'
- Run `mix ecto.gen.repo -r Tracker.Repo`
- Change DB credentials in config/config.exs as applicable
- Run `mix ecto.migrate`

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
