import { addGameToLibraryOpts } from "./add.library.option"
import { deleteGameFromLibraryOpts } from "./delete.library.option"
import { getLibraryDashboardOpts } from "./get.library.option"
import { updateLibraryOpts } from "./put.library.option"
import { refreshSteamLibraryOpts } from "./refresh.library.option"

export const dashboardLibraryOpts = {
  addGame: addGameToLibraryOpts,
  deleteGame: deleteGameFromLibraryOpts,
  update: updateLibraryOpts,
  refreshSteam: refreshSteamLibraryOpts,
  get: getLibraryDashboardOpts
}