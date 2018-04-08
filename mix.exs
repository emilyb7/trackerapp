defmodule Tracker.Mixfile do
  use Mix.Project

  def project do
    [
      app: :tracker,
      version: "0.1.0",
      elixir: "~> 1.5",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
    ]
  end


  # Run "mix help compile.app" to learn about applications.
  def application do
    [extra_applications: [:logger, :httpoison]]
  end


  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      exfmt: [github: "lpil/exfmt"],
      httpoison: "~> 0.9",
      poison: "~>2.2",
      ecto: "~> 2.2",
      postgrex: ">= 0.0.0",
    ]
  end
end
# {:dep_from_hexpm, "~> 0.3.0"},
# {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"},
