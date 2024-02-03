import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Game
      "x_games_in_list_one": "<0>{{count}}</0> game in list",
      "x_games_in_list_other": "<0>{{count}}</0> games in list",
      "x_games_in_list_zero": "No game in list",
      "i_like": "Like !",
      "not_interesting": "Not interesting",
      "click_to_remove_like": "Click on a game to remove it from your Likes",
      "game_instructions": "Like or ignore the games displayed. The first game that will have been liked by all the players of the room will be displayed, and you will know how to waste the next hours of your precious life.",
      "game_countdown": "The room will select a random game 10 minutes after its creation if no choice has been made ...",
      "not_enough_players": "There must be at least two players in the room to start",
      "start": "Start",
      "leave": "Leave",
      "not_in_common_games": "<0>{{player1}}</0> and <0>{{player2}}</0>'s games don't match !",
      "x_games_in_common_one": "{{count}} game in common",
      "x_games_in_common_other": "{{count}} games in common",
      "x_games_in_common_zero": "No game in common :(",
      "waiting_for_admin": "Waiting for <0>{{username}}</0> to start the room ...",
      "copied_to_clipboard": "Room link copied to clipboard !",
      "you_have_been_kicked": "You have been kicked from the room",
      "player_has_been_kicked": "Player has been kicked from the room",
      "room_begins": "The game has begun",
      "admin_closed_room": "The administrator has closed the room",

      // Library
      "library_heading": "Select the games that want to hide from other players when you enters a room.",
      "selected_info": "{{count}} selected game(s) ({{hiddenCount}} hidden(s), {{publicCount}} public(s))",
      "selected_info_zero": "No selected game",
      "confirm_library_changes": "Confirm changes",
      "no_changes_library": "No game selected",
      "library_updated": "Library updated !",
      "error_library_update": "An error occurred while updating the library ...",
      "all_games": "All games",
      "hidden_games": "Hidden games",
      "public_games": "Public games",
      "selected_games": "Selected games",

      // Login page
      "disclaimer": "This site is not associated with Valve Corp.",
      "motto": "Let's play together !",
      "subtitle": "What are we Going to Play?",

      // Loading
      "hello_username": "Hello <0>{{username}}</0> !",
      "preparing_library": "We are preparing everything you need, please wait a moment, it shouldn't take long!",

      // Homepage
      "homepage_subtitle": "Organize yourself and choose games with your friends !",
      "create": "Create",
      "welcome_username": "Welcome <0>{{username}}</0> !",

      // Modal join
      "room_id": "Room ID",
      "join": "Join",

      // 404
      "not_found_page_title": "The page you are looking for does not exist ...",
      "not_found_page_subtitle": "But never mind, one day it may exist.",
      "back_homepage": "Back to homepage",

      // Footer
      "footer": "This site <0>is not associated</0> with Valve Corp.",

      // Navbar
      "donate": "Donate",
      "actual_room": "Actual room",
      "logout": "Logout",
      "my_library": "My library",

      // Toast
      "kicked_player": "Player kicked",
    }
  },
  fr: {
    translation: {
      // Game
      "x_games_in_list_one": "<0>{{count}}</0> jeu dans la liste",
      "x_games_in_list_other": "<0>{{count}}</0> jeux dans la liste",
      "x_games_in_list_zero": "Aucun jeu dans la liste",
      "i_like": "J'aime !",
      "not_interesting": "Pas intéressant",
      "click_to_remove_like": "Cliquez sur un jeu pour le retirer de vos J'aimes",
      "game_instructions": "Aimez ou ignorez les jeux affichés. Le premier jeu qui aura été aimé par tout les joueurs de la room sera affiché, et vous saurez comment gaspiller les prochaines heures de votre précieuse vie.",
      "game_countdown": "La room sélectionnera un jeu aléatoire 10 minutes après sa création si aucun choix n'a pas été fait ...",
      "not_enough_players": "Il faut au moins deux joueurs dans la room pour commencer",
      "start": "Démarrer",
      "leave": "Quitter",
      "not_in_common_games": "Les jeux de <0>{{player1}}</0> et <0>{{player2}}</0> ne matchent pas !",
      "x_games_in_common_one": "{{count}} jeu en commun",
      "x_games_in_common_other": "{{count}} jeux en commun",
      "x_games_in_common_zero": "Aucun jeu en commun :(",
      "waiting_for_admin": "En attente de <0>{{username}}</0> pour démarrer la room ...",
      "copied_to_clipboard": "Lien de la room copié dans le presse-papier !",
      "you_have_been_kicked": "Vous avez été expulsé de la room",
      "player_has_been_kicked": "Un joueur a été expulsé de la room",
      "room_begins": "La partie a commencé",
      "admin_closed_room": "L'administrateur a fermé la room",

      // Library
      "library_heading": "Sélectionnez les jeux que vous souhaitez cacher des autres joueurs lorsque vous entrez dans une room.",
      "selected_info": "{{count}} jeu(x) sélectionné(s) ({{hiddenCount}} caché(s), {{publicCount}} public(s))",
      "selected_info_zero": "Aucun jeu sélectionné",
      "confirm_library_changes": "Confirmer les changements",
      "no_changes_library": "Aucun jeu sélectionné",
      "library_updated": "Bibliothèque mise à jour !",
      "error_library_update": "Une erreur est survenue lors de la mise à jour de la bibliothèque ...",
      "all_games": "Tous les jeux",
      "hidden_games": "Jeux cachés",
      "public_games": "Jeux publics",
      "selected_games": "Jeux sélectionnés",

      // Login
      "disclaimer": "Ce site n'est pas associé à Valve Corp.",
      "motto": "Jouons ensemble !",
      "subtitle": "A quoi on va jouer ?",

      // Loading
      "hello_username": "Bonjour <0>{{username}}</0> !",
      "preparing_library": "Nous préparons tout ce qu'il faut pour vous, merci de patienter un instant, ça ne devrait pas être long !",

      // Homepage
      "homepage_subtitle": "Organisez-vous et choisissez des jeux avec vos amis !",
      "create": "Créer",
      "welcome_username": "Bienvenue <0>{{username}}</0> !",

      // Modal join
      "room_id": "ID de la room",
      "join": "Rejoindre",

      // 404
      "not_found_page_title": "La page que vous recherchez n'existe pas ...",
      "not_found_page_subtitle": "Mais pas grave, un jour ça existera peut-être.",
      "back_homepage": "Retour à l'accueil",

      // Footer
      "footer": "Ce site <0>n'est pas associé</0> à Valve Corp.",

      // Navbar
      "donate": "Faire un don",
      "actual_room": "Room actuelle",
      "logout": "Déconnexion",
      "my_library": "Ma bibliothèque",

      // Toast
      "kicked_player": "Joueur expulsé",
    }
  },
  kr: {
    translation: {
      // Game
      "x_games_in_list_one": "<0>{{count}}</0> 게임 목록",
      "x_games_in_list_other": "<0>{{count}}</0> 게임 목록",
      "x_games_in_list_zero": "게임 목록 없음",
      "i_like": "좋아요 !",
      "not_interesting": "관심 없음",
      "click_to_remove_like": "게임을 클릭하여 좋아요에서 제거하십시오.",
      "game_instructions": "표시된 게임을 좋아하거나 무시하십시오. 방의 모든 플레이어가 좋아하는 첫 번째 게임이 표시되고 귀중한 생명의 다음 몇 시간을 어떻게 낭비할지 알 수 있습니다.",
      "game_countdown": "10 분 후에 랜덤 게임을 선택합니다 ...",
      "not_enough_players": "시작하려면 방에 최소한 두 명의 플레이어가 있어야합니다.",
      "start": "시작",
      "leave": "나가기",
      "not_in_common_games": "<0>{{player1}}</0>과 <0>{{player2}}</0>의 게임이 일치하지 않습니다!",
      "x_games_in_common_one": "{{count}} 공통 게임",
      "x_games_in_common_other": "{{count}} 공통 게임",
      "x_games_in_common_zero": "공통 게임 없음 :(",
      "waiting_for_admin": "<0>{{username}}</0>을 기다리는 중 ...",
      "copied_to_clipboard": "방 링크가 클립 보드에 복사되었습니다!",
      "you_have_been_kicked": "방에서 추방되었습니다.",
      "player_has_been_kicked": "플레이어가 방에서 추방되었습니다.",
      "room_begins": "게임이 시작되었습니다.",
      "admin_closed_room": "관리자가 방을 닫았습니다.",

      // Library
      "library_heading": "방에 들어갈 때 다른 플레이어에게 숨기고 싶은 게임을 선택하십시오.",
      "selected_info": "{{count}} 선택된 게임 ({{hiddenCount}} 숨겨진, {{publicCount}} 공개)",
      "selected_info_plural": "{{count}} 선택된 게임 ({{hiddenCount}} 숨겨진, {{publicCount}} 공개)",
      "selected_info_zero": "선택된 게임 없음",
      "confirm_library_changes": "변경 사항 확인",
      "no_changes_library": "선택된 게임 없음",
      "library_updated": "도서관이 업데이트되었습니다 !",
      "error_library_update": "도서관을 업데이트하는 동안 오류가 발생했습니다 ...",
      "all_games": "모든 게임",
      "hidden_games": "숨겨진 게임",
      "public_games": "공개 게임",
      "selected_games": "선택된 게임",

      // Login
      "disclaimer": "이 사이트는 Valve Corp.와 관련이 없습니다.",
      "motto": "함께 놀아요 !",
      "subtitle": "무엇을 할까요?",

      // Loading
      "hello_username": "안녕하세요 <0>{{username}}</0> !",
      "preparing_library": "모든 준비가 끝나면 알려드리겠습니다.",

      // Homepage
      "homepage_subtitle": "친구들과 함께 게임을 선택하고 조직하세요!",
      "create": "생성",
      "welcome_username": "환영합니다 <0>{{username}}</0> !",

      // Modal join
      "room_id": "방 ID",
      "join": "참여",

      // 404
      "not_found_page_title": "찾고있는 페이지가 없습니다 ...",
      "not_found_page_subtitle": "하지만 괜찮아요, 언젠가는 있을지도 모릅니다.",
      "back_homepage": "홈으로 돌아 가기",

      // Footer
      "footer": "이 사이트는 Valve Corp.와 관련이 없습니다.",

      // Navbar
      "donate": "기부",
      "actual_room": "현재 방",
      "logout": "로그 아웃",
      "my_library": "내 도서관",

      // Toast
      "kicked_player": "플레이어 추방"
    }
  },
  es: {
    translation: {
      // Game
      "x_games_in_list_one": "<0>{{count}}</0> juego en la lista",
      "x_games_in_list_other": "<0>{{count}}</0> juegos en la lista",
      "x_games_in_list_zero": "No hay juegos en la lista",
      "i_like": "¡Me gusta!",
      "not_interesting": "No interesante",
      "click_to_remove_like": "Haga clic en un juego para eliminarlo de sus Me gusta",
      "game_instructions": "Me gusta o ignora los juegos que se muestran. El primer juego que haya sido gustado por todos los jugadores de la sala se mostrará, y sabrás cómo desperdiciar las próximas horas de tu preciosa vida.",
      "game_countdown": "La sala seleccionará un juego aleatorio 10 minutos después de su creación si no se ha hecho ninguna elección ...",
      "not_enough_players": "Debe haber al menos dos jugadores en la sala para comenzar",
      "start": "Comienzo",
      "leave": "Dejar",
      "not_in_common_games": "¡Los juegos de <0>{{player1}}</0> y <0>{{player2}}</0> no coinciden!",
      "x_games_in_common_one": "{{count}} juego en común",
      "x_games_in_common_other": "{{count}} juegos en común",
      "x_games_in_common_zero": "No hay juegos en común :(",
      "waiting_for_admin": "Esperando a <0>{{username}}</0> para iniciar la sala ...",
      "copied_to_clipboard": "¡Enlace de sala copiado al portapapeles!",
      "you_have_been_kicked": "Has sido expulsado de la sala",
      "player_has_been_kicked": "El jugador ha sido expulsado de la sala",
      "room_begins": "El juego ha comenzado",
      "admin_closed_room": "El administrador ha cerrado la sala",

      // Library
      "library_heading": "Seleccione los juegos que desea ocultar a otros jugadores cuando ingrese a una sala.",
      "selected_info": "{{count}} juego seleccionado ({{hiddenCount}} oculto, {{publicCount}} público)",
      "selected_info_plural": "{{count}} juegos seleccionados ({{hiddenCount}} ocultos, {{publicCount}} públicos)",
      "selected_info_zero": "No hay juegos seleccionados",
      "confirm_library_changes": "Confirmar cambios",
      "no_changes_library": "No hay juegos seleccionados",
      "library_updated": "¡Biblioteca actualizada!",
      "error_library_update": "Se produjo un error al actualizar la biblioteca ...",
      "all_games": "Todos los juegos",
      "hidden_games": "Juegos ocultos",
      "public_games": "Juegos públicos",
      "selected_games": "Juegos seleccionados",

      // Login
      "disclaimer": "Este sitio no está asociado con Valve Corp.",
      "motto": "¡Juguemos juntos!",
      "subtitle": "¿A qué vamos a jugar?",

      // Loading
      "hello_username": "¡Hola <0>{{username}}</0>!",
      "preparing_library": "Estamos preparando todo lo que necesita, espere un momento, ¡no debería tardar mucho!",

      // Homepage
      "homepage_subtitle": "¡Organízate y elige juegos con tus amigos!",
      "create": "Crear",
      "welcome_username": "¡Bienvenido <0>{{username}}</0>!",

      // Modal join
      "room_id": "ID de sala",
      "join": "Unirse",

      // 404
      "not_found_page_title": "La página que está buscando no existe ...",
      "not_found_page_subtitle": "Pero no importa, algún día puede que exista.",
      "back_homepage": "Volver a la página de inicio",

      // Footer
      "footer": "Este sitio no está asociado con Valve Corp.",

      // Navbar
      "donate": "Donar",
      "actual_room": "Sala actual",
      "logout": "Cerrar sesión",
      "my_library": "Mi biblioteca",

      // Toast
      "kicked_player": "Jugador expulsado"
    }
  },
  jp: {
    translation: {
      // Game
      "x_games_in_list_one": "<0>{{count}}</0>ゲームリスト",
      "x_games_in_list_other": "<0>{{count}}</0>ゲームリスト",
      "x_games_in_list_zero": "ゲームリストなし",
      "i_like": "好き！",
      "not_interesting": "興味なし",
      "click_to_remove_like": "ゲームをクリックして、好きなものから削除します。",
      "game_instructions": "表示されるゲームを好きになるか無視します。部屋のすべてのプレイヤーが好きになった最初のゲームが表示され、貴重な生涯の次の数時間をどのように無駄にするかがわかります。",
      "game_countdown": "10分後にランダムなゲームが選択されます...",
      "not_enough_players": "開始するには部屋に少なくとも2人のプレイヤーがいる必要があります",
      "start": "開始",
      "leave": "去る",
      "not_in_common_games": "<0>{{player1}}</0>さんと<0>{{player2}}</0>さんのゲームが一致しません！",
      "x_games_in_common_one": "{{count}}共通ゲーム",
      "x_games_in_common_other": "{{count}}共通ゲーム",
      "x_games_in_common_zero": "共通のゲームはありません :(",
      "waiting_for_admin": "<0>{{username}}</0>さんがルームを開始するのを待っています...",
      "copied_to_clipboard": "ルームリンクがクリップボードにコピーされました！",
      "you_have_been_kicked": "あなたは部屋から追放されました",
      "player_has_been_kicked": "プレイヤーが部屋から追放されました",
      "room_begins": "ゲームが始まった",
      "admin_closed_room": "管理者が部屋を閉じました",

      // Library
      "library_heading": "部屋に入るときに他のプレイヤーに非表示にしたいゲームを選択してください。",
      "selected_info": "{{count}}選択されたゲーム（{{hiddenCount}}非表示、{{publicCount}}公開）",
      "selected_info_plural": "{{count}}選択されたゲーム（{{hiddenCount}}非表示、{{publicCount}}公開）",
      "selected_info_zero": "選択されたゲームはありません",
      "confirm_library_changes": "変更を確認",
      "no_changes_library": "選択されたゲームはありません",
      "library_updated": "ライブラリが更新されました！",
      "error_library_update": "ライブラリを更新する際にエラーが発生しました...",
      "all_games": "すべてのゲーム",
      "hidden_games": "非表示のゲーム",
      "public_games": "公開ゲーム",
      "selected_games": "選択されたゲーム",

      // Login
      "disclaimer": "このサイトはValve Corp.と関係ありません。",
      "motto": "一緒に遊ぼう！",
      "subtitle": "何をする？",

      // Loading
      "hello_username": "こんにちは<0>{{username}}さん</0>！",
      "preparing_library": "必要なすべてのものを準備しています。しばらくお待ちください。",

      // Homepage
      "homepage_subtitle": "友達と一緒にゲームを選んで組織してください！",
      "create": "作成",
      "welcome_username": "ようこそ<0>{{username}}さん</0>！",

      // Modal join
      "room_id": "部屋ID",
      "join": "参加する",

      // 404
      "not_found_page_title": "お探しのページは存在しません...",
      "not_found_page_subtitle": "でも心配しないでください、いつかは存在するかもしれません。",
      "back_homepage": "ホームページに戻る",

      // Footer
      "footer": "このサイトはValve Corp.と関係ありません。",

      // Navbar
      "donate": "寄付する",
      "actual_room": "現在の部屋",
      "logout": "ログアウト",
      "my_library": "私の図書館",

      // Toast
      "kicked_player": "プレイヤーが追放されました"
    }
  },
  de: {
    translation: {
      // Game
      "x_games_in_list_one": "<0>{{count}}</0> Spiel in der Liste",
      "x_games_in_list_other": "<0>{{count}}</0> Spiele in der Liste",
      "x_games_in_list_zero": "Kein Spiel in der Liste",
      "i_like": "Gefällt mir!",
      "not_interesting": "Nicht interessant",
      "click_to_remove_like": "Klicken Sie auf ein Spiel, um es aus Ihren Likes zu entfernen",
      "game_instructions": "Gefällt oder ignoriert die angezeigten Spiele. Das erste Spiel, das von allen Spielern des Raums gemocht wurde, wird angezeigt, und Sie wissen, wie Sie die nächsten Stunden Ihres kostbaren Lebens verschwenden können.",
      "game_countdown": "Der Raum wählt 10 Minuten nach seiner Erstellung ein zufälliges Spiel aus, wenn keine Auswahl getroffen wurde ...",
      "not_enough_players": "Es müssen mindestens zwei Spieler im Raum sein, um zu beginnen",
      "start": "Start",
      "leave": "Verlassen",
      "not_in_common_games": "Die Spiele von <0>{{player1}}</0> und <0>{{player2}}</0> passen nicht zusammen!",
      "x_games_in_common_one": "{{count}} gemeinsames Spiel",
      "x_games_in_common_other": "{{count}} gemeinsame Spiele",
      "x_games_in_common_zero": "Kein gemeinsames Spiel :(",
      "waiting_for_admin": "Warten auf <0>{{username}}</0>, um den Raum zu starten ...",
      "copied_to_clipboard": "Raumlink in die Zwischenablage kopiert!",
      "you_have_been_kicked": "Du wurdest aus dem Raum geworfen",
      "player_has_been_kicked": "Der Spieler wurde aus dem Raum geworfen",
      "room_begins": "Das Spiel hat begonnen",
      "admin_closed_room": "Der Administrator hat den Raum geschlossen",

      // Library
      "library_heading": "Wählen Sie die Spiele aus, die Sie verstecken möchten, wenn Sie einen Raum betreten.",
      "selected_info": "{{count}} ausgewähltes Spiel ({{hiddenCount}} versteckt, {{publicCount}} öffentlich)",
      "selected_info_plural": "{{count}} ausgewählte Spiele ({{hiddenCount}} versteckt, {{publicCount}} öffentlich)",
      "selected_info_zero": "Kein ausgewähltes Spiel",
      "confirm_library_changes": "Änderungen bestätigen",
      "no_changes_library": "Kein Spiel ausgewählt",
      "library_updated": "Bibliothek aktualisiert!",
      "error_library_update": "Beim Aktualisieren der Bibliothek ist ein Fehler aufgetreten ...",
      "all_games": "Alle Spiele",
      "hidden_games": "Versteckte Spiele",
      "public_games": "Öffentliche Spiele",
      "selected_games": "Ausgewählte Spiele",

      // Login
      "disclaimer": "Diese Seite ist nicht mit Valve Corp. verbunden.",
      "motto": "Lass uns zusammen spielen!",
      "subtitle": "Was werden wir spielen?",

      // Loading
      "hello_username": "Hallo <0>{{username}}</0>!",
      "preparing_library": "Wir bereiten alles vor, was Sie brauchen. Bitte warten Sie einen Moment, es sollte nicht lange dauern!",

      // Homepage
      "homepage_subtitle": "Organisieren Sie sich und wählen Sie Spiele mit Ihren Freunden aus!",
      "create": "Erstellen",
      "welcome_username": "Willkommen <0>{{username}}</0>!",

      // Modal join
      "room_id": "Raum-ID",
      "join": "Beitreten",

      // 404
      "not_found_page_title": "Die von Ihnen gesuchte Seite existiert nicht ...",
      "not_found_page_subtitle": "Aber egal, irgendwann könnte es existieren.",
      "back_homepage": "Zurück zur Startseite",

      // Footer
      "footer": "Diese Seite ist nicht mit Valve Corp. verbunden.",

      // Navbar
      "donate": "Spenden",
      "actual_room": "Aktueller Raum",
      "logout": "Ausloggen",
      "my_library": "Meine Bibliothek",

      // Toast
      "kicked_player": "Spieler gekickt"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    }
  }).then(() => {
    const detectedLng = i18n.language;
    const splitLng = detectedLng.split('-')[0];

    if (['fr', 'en'].includes(splitLng) && splitLng !== localStorage.getItem('i18nextLng')) {
      localStorage.setItem('i18nextLng', splitLng);
    }
  });

export default i18n;