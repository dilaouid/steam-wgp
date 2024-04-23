# Legal Notices

## General information

**Main Maintainer**: Diyaeddine LAOUID  
**Project Type**: Open source project under GPLv3 license  
**Development and Hosting Platform**: GitHub  
**Project URL**: [GitHub SteamWGP](https://github.com/dilaouid/steam-wgp)

## Service description

SteamWGP is an open source project designed to enable Steam users to connect via OpenID with their Steam accounts. The project facilitates the aggregation and use of user account information such as nicknames, profile URLs, avatars, digital IDs, and game libraries. SteamWGP is not affiliated with Steam or Valve Corporation or any other third party.

### Data collection

The project collects the following information:

- **Steam Nickname**: Used to identify users on the platform.
- **Profile URL**: Publicly accessible and used for redirecting to the Steam profile.
- **Avatar Hash**: Used to display the user's avatar.
- **Steam Digital ID**: Used as a unique identifier for each user.
- **Game Library**:
  - If public, all games are collected to enable effective participation in "steamders."
  - If private, no games are collected, thus limiting the platform's utility for the concerned user.
  - Games remain recorded in our database even if a user’s library turns private after their retrieval, even if the user deletes their account, or if the account is suspended or banned. Similarly, if a user deletes a game from their library, it remains recorded in our database. Games are used to identify common games among users and to facilitate the search for gaming partners.

### Steamders functionality

"Steamders" are virtual spaces where players can gather to choose together which game to play. The system can retrieve multiplayer games common among all players in a steamder or all multiplayer games of the participants.

### Data management

- Data related to steamders is indefinitely retained in the database.
- Information about the participants of a steamder is deleted once it is concluded, except for the selected games and persistent information about the steamder itself.

### Data deletion

Users can delete their account at any time, which will result in the deletion of all their data, including their game library stored in the database. However, once an account is deleted, it will be possible for the user to restore it only **2 days** after deletion. This is to prevent the abuse of server resources during the synchronization of Steam data.

## Usage rights

As the project is under the GPLv3 license, it is prohibited to sell it. Any direct commercial use of this project is strictly prohibited. This project is strictly non-profit: it is free, contains no advertising, and uses no tracking cookies, except for JWT tokens for user authentication. However, donations are welcome to support the project maintainer without any direct reciprocation.

## License

This project is published under the [GNU General Public License v3 (GPLv3)](https://www.gnu.org/licenses/gpl-3.0.html), which guarantees users the freedom to share and modify the software as long as all modified copies are also shared under the same license.

## Responsibilities

The project maintainer cannot be held responsible for service interruptions or data loss. Users use the service at their own risk. The reliability of the data retrieved via Steam and their integrity are not guaranteed by the project maintainer.

---

These legal notices aim to provide complete transparency about the project's operation and its implications for users. For any additional questions or concerns, please contact the project maintainer through the communication channels listed on the GitHub project page.
