defmodule Server do
  use Application
  require Logger

  def get_protocol(:prod), do: :http
  def get_protocol(_env), do: :https

  def get_options(:prod) do
    [
      otp_app: :tracker,
      port: System.get_env("PORT") |> String.to_integer()
    ]
  end

  def get_options(_env) do
    [
      keyfile: "priv/keys/server.key",
      certfile: "priv/keys/server.crt",
      otp_app: :tracker,
      port: System.get_env("PORT") |> String.to_integer()
    ]
  end

  def start(_type, _args) do
    env = Mix.env()

    children = [
      Plug.Adapters.Cowboy.child_spec(
        scheme: get_protocol(env),
        plug: Router,
        options: get_options(env)
      ),
      Tracker.Repo
    ]

    Logger.info(inspect(Tracker.Repo))

    Logger.info("started application")
    Supervisor.start_link(children, strategy: :one_for_one)
  end
end
