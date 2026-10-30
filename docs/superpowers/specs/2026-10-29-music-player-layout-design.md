# MusicPlayer layout and appearance design

The single public `MusicPlayer` keeps its playback behavior and two existing density variants. Its playing surface and playlist become sibling regions, so the playlist is no longer part of a player card. On wide screens they sit beside each other; on narrow screens they stack. The compact variant becomes a small horizontal player with a separately expandable queue.

`appearance` offers three original visual directions drawn from the supplied music-player reference board: `editorial` (restrained music-site red and spacious typography), `console` (dark controls and a record-like artwork treatment), and `minimal` (cool blue, light controls, fine rules). `theme` still follows the host app for editorial and minimal appearances; console is intentionally dark.

The component remains keyboard operable. Each range and control retains its accessible label. The queue is a named region, its selected track is clearly indicated, and the layout must fit the Storybook canvas at desktop and mobile widths without horizontal overflow.
