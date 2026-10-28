// Add a game by adding one object here. The Servers page and home page update automatically.
// Ports below are each game's defaults. Change them to match your setup.
// status: 'minecraft' shows live online/offline + player count. 'none' shows no live status.

export interface Server {
  game: string;
  host: string;
  port?: number;      // leave out if players don't need to type one (e.g. Minecraft on 25565)
  status: 'minecraft' | 'none';
  blurb: string;
  rules?: string[];
}

export const servers: Server[] = [
  {
    game: 'Palworld',
    host: 'palworld.calibanhq.com',
    port: 8211,
    status: 'none',
    blurb: 'Dedicated Palworld server.',
    rules: ['Be decent to other players.'],
  },
  {
    game: 'Minecraft',
    host: 'minecraft.calibanhq.com',
    status: 'minecraft',
    blurb: 'Minecraft Java server.',
    rules: ['Be decent to other players.'],
  },
  {
    game: 'Valheim',
    host: 'valheim.calibanhq.com',
    port: 2456,
    status: 'none',
    blurb: 'Dedicated Valheim server.',
    rules: ['Be decent to other players.'],
  },
  {
    game: 'Terraria',
    host: 'terraria.calibanhq.com',
    port: 7777,
    status: 'none',
    blurb: 'Dedicated Terraria server.',
    rules: ['Be decent to other players.'],
  },
];

export const address = (s: Server) => (s.port ? `${s.host}:${s.port}` : s.host);
