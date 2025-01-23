import { deleteSteamderOpts } from "./delete.steamder.option";
import { getSteamderOpts } from "./get.steamder.options";
import { getAllSteamdersOpts } from "./get.steamders.option";
import { kickSteamderOpts } from "./kick.steamder.option";
import { promoteSteamderOpts } from "./promote.steamder.option";
import { updateSteamderOpts } from "./put.steamder.option";

export const dashboardSteamderOpts = {
  delete: deleteSteamderOpts,
  get: getSteamderOpts,
  list: getAllSteamdersOpts,
  kick: kickSteamderOpts,
  promote: promoteSteamderOpts,
  update: updateSteamderOpts
}