use Mix.Config

config :tracker,
       Tracker.Repo,
       adapter: Ecto.Adapters.Postgres,
       database: "tracker_test",
       username: "emilybertwistle",
       password: "pass",
       hostname: "localhost",
       pool: Ecto.Adapters.SQL.Sandbox
