# Elixir application

## Get some sample data from API

Run `PORT=8080 iex -S mix`

then `Tracker.Library.fetch($ISBN)`

## Create some data

Example of creating book data:

`curl -d '{"title":"Emma", "author":"Jane Austen"}' -H "Content-Type: application/json" -X POST http://localhost:8080/books/create`


## Schema

### Books:

- ID
- ISBN
- Title
- Image
- Author

## Setup

- Create `config/prod.exs` with the following structure:
```elixir
use Mix.Config

config :tracker,
       Tracker.Repo,
       adapter: Ecto.Adapters.Postgres,
       database: "",
       username: "",
       password: "",
       hostname: ""
```

- Create a postgres database locally by running `mix ecto.create`
- Run `mix ecto.migrate`

Do the same for test env

When running in IEX, run `Tracker.Repo.start_link()` in order to be able to connect to postgres

To run the app on localhost: `PORT=8080 mix run --no-halt`
