use Mix.Config

config :tracker, Tracker.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "tracker_repo",
  username: "emilybertwistle",
  password: "pass",
  hostname: "localhost"
