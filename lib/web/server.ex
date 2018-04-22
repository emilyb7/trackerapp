defmodule Server do
  use Application
  require Logger

  def start(_type, _args) do
    port = System.get_env("PORT") |> String.to_integer

    children = [Plug.Adapters.Cowboy.child_spec(scheme: :http, plug: Router, options: [port: port]), Tracker.Repo]

    Logger.info(inspect Tracker.Repo)

    Logger.info("started application")
    Supervisor.start_link(children, strategy: :one_for_one)

  end

end
