{
  description = "heim — Philip's portfolio site (Turborepo + bun + Next.js + Payload)";

  inputs = {
    lab.url = "github:phibkro/homelab";
    nixpkgs.follows = "lab/nixpkgs";
  };

  outputs =
    { lab, nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
        config.allowUnfree = true;
      };
    in
    {
      devShells.${system}.default = lab.lib.mkDevShell pkgs {
        modules = [
          "ts"
          "bun"
          "claude-code"
        ];
      };
    };
}
