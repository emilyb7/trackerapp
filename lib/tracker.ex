defmodule Tracker do
  @moduledoc """
  Documentation for Tracker.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Tracker.hello
      :world

  """

  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    children = [
      supervisor(ExampleApp.Repo, [])
    ]

    opts = [strategy: :one_for_one, name: ExampleApp.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def main do
    :world
  end
end
