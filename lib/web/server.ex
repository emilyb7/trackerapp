defmodule Server do
  use Application
  require Logger

  def start(_type, _args) do
    port = Application.get_env(:tracker, :cowboy_port, 8080)
    children = [Plug.Adapters.Cowboy.child_spec(:http, Router, [], port: port), Tracker.Repo]

    Logger.info("started application")
    Supervisor.start_link(children, strategy: :one_for_one)

  end

end
