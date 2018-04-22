defmodule Server do
  use Application
  require Logger

  def start(_type, _args) do
<<<<<<< HEAD
    port = Application.get_env(:tracker, :cowboy_port, 8080)
=======
    Logger.info("STARTING!")
    import Supervisor.Spec

    port = System.get_env("PORT")

    Logger.info(port)
>>>>>>> c370474... get_env
    children = [Plug.Adapters.Cowboy.child_spec(:http, Router, [], port: port), Tracker.Repo]

    Logger.info("started application")
    Supervisor.start_link(children, strategy: :one_for_one)

  end

end
