export const defaultSteamderStore = {
    steamder: {
      id: 'ac2e8e2d-3f7c-4c5e-8d6b-1c4b2c3b8c6d',
      name: 'Steamder Name',

      admin_id: '76561198065059816',
      all_games: [10, 20, 30, 40, 50, 60, 70, 80, 240, 300, 320, 360],
      common_games: [10, 20, 30, 40, 50, 60, 240, 300, 360],
      swiped_games: [10, 320, 360],
      choosed_game: 320,

      display_all_games: true,
      private: false,
      started: false,

      complete: false,
       // Date in 10 minutes
      endTime: Date.now() + 600000,
      players: [
        {
          player_id: '76561198065059816',
          username: 'yedine',
          avatar_hash: 'e845df84cbc6129696ec1d96282aa7413597bc18',
          profile_url: 'https://steamcommunity.com/id/yedine/',
          games: [10, 20, 30, 40, 50, 60, 240, 300, 360]
        },
        {
          player_id: '76561198086333519',
          username: 'kilo',
          avatar_hash: '9f2736a2dd3a5fdd07132eef1c4150d85a121980',
          profile_url: 'https://steamcommunity.com/id/Kiloutre/',
          games: [10, 20, 30, 40, 50, 60, 80, 240, 300, 320, 360]
        }
      ],
      created_at: new Date(),
      updated_at: new Date()
    }
}