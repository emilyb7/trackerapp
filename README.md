# Tracker

🚧 🚧 🚧 Work in progress!

I'm building this app mostly for fun and to track books I've read.

The backend component is my first attempt to make something in Elixir.

The frontend is written in React, and is mostly just an unstructured explosion of my ideas. I've been refactoring and cleaning up the code recently, so the newest bits of code are in a much better state.

## Things to do
- Getting book details from third party API ✅
- Saving books to DB ✅
- API ✅
- Basic client-side app ✅
- UI improvements (ongoing)
- Add book by isbn (manual entry) 🚧
- Search for title
- Book page
- Track book progress
- Sorting
- Pagination
- Sessions API ✅


## Improvements

- Error handling in API
- Upgrade elixir version ✅
- Restructure routes?

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
