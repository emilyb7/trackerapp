defmodule Server do
  use Application
  require Logger

  def start(_type, _args) do
    cowboy_options = [
      keyfile: "priv/keys/localhost.key",
      certfile: "priv/keys/localhost.cert",
      otp_app: :tracker,
      port: System.get_env("PORT") |> String.to_integer()
    ]

    children = [
      Plug.Adapters.Cowboy.child_spec(scheme: :https, plug: Router, options: cowboy_options),
      Tracker.Repo
    ]

    Logger.info(inspect(Tracker.Repo))

    Logger.info("started application")
    Supervisor.start_link(children, strategy: :one_for_one)
  end
end
