defmodule Tracker do
  @moduledoc """
  Documentation for Tracker.
  """

  use Application

  def start(_type, _args) do

    children = [
      Friends.Repo,
    ]

    opts = [strategy: :one_for_one, name: Tracker.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
