defmodule Tracker.Mixfile do
  use Mix.Project

  def project do
    [
      app: :tracker,
      version: "0.1.0",
      elixir: "~> 1.6",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger, :httpoison],
      mod: {Server, []},
      build_embedded: Mix.env() == :prod,
      start_permanent: Mix.env() == :prod
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:httpoison, "~> 0.9"},
      {:poison, "~>2.2"},
      {:ecto, "~> 2.2"},
      {:postgrex, ">= 0.0.0"},
      {:cowboy, "~> 1.0.0"},
      {:plug, "~> 1.0"},
      {:cors_plug, "~> 1.5"},
      {:mock, "~> 0.3.0", [only: :test]}
    ]
  end
end

# {:dep_from_hexpm, "~> 0.3.0"},
# {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"},
