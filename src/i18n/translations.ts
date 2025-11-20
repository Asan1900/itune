import { SupportedLanguage } from '@/hooks/useLanguage';

export const translations: Record<SupportedLanguage, Record<string, string>> = {
  ru: {
    // Header
    'app.title': 'iTuneNote',
    'app.subtitle': 'Умный гитарный тюнер для браузера',

    // Navigation
    'nav.tuner': 'Тюнер',
    'nav.tabs': 'Табы',
    'nav.library': 'Библиотека',
    'nav.editor': 'Редактор',
    'nav.settings': 'Настройки',
    'nav.history': 'История',

    // Tuner
    'tuner.start': 'Начать настройку',
    'tuner.stop': 'Остановить',
    'tuner.listening': 'Слушаю...',
    'tuner.status.accurate': 'Точно!',
    'tuner.status.close': 'Близко',
    'tuner.status.off': 'Не точно',
    'tuner.hint.raise': 'Натяните струну',
    'tuner.hint.lower': 'Ослабьте струну',

    // Instruments
    'instrument.title': 'Инструмент',
    'instrument.guitar': 'Гитара 6-струнная',
    'instrument.guitar-12': 'Гитара 12-струнная',
    'instrument.ukulele': 'Укулеле',
    'instrument.mandolin': 'Мандолина',
    'instrument.banjo': 'Банджо',
    'instrument.strings.6': '6 струн',
    'instrument.strings.12': '12 струн',
    'instrument.strings.4': '4 струны',
    'instrument.strings.8': '8 струн',
    'instrument.strings.5': '5 струн',
    'instrument.desc.guitar': 'Классическая гитара',
    'instrument.desc.guitar-12': 'Удвоенные струны',
    'instrument.desc.ukulele': 'Гавайский инструмент',
    'instrument.desc.mandolin': 'Парные струны',
    'instrument.desc.banjo': 'Американский инструмент',

    // Tunings
    'tuning.title': 'Строи',
    'tuning.select': 'Выберите строй',
    'tuning.custom': 'Кастом',
    'tuning.alt': 'Альт',
    'tuning.available': 'доступных строев',

    // Theme
    'theme.title': 'Тема оформления',
    'theme.dark': 'Тёмная',
    'theme.retro': 'Ретро-усилитель',
    'theme.amoled': 'AMOLED',
    'theme.neon': 'Неон',
    'theme.forest': 'Лес',
    'theme.sunset': 'Закат',
    'theme.ocean': 'Океан',
    'theme.vintage': 'Винтаж',
    'theme.desc.dark': 'Современная тёмная тема',
    'theme.desc.retro': 'Винтажный стиль усилителя',
    'theme.desc.amoled': 'Глубокий чёрный для OLED',
    'theme.desc.neon': 'Яркие киберпанк цвета',
    'theme.desc.forest': 'Природные зелёные тона',
    'theme.desc.sunset': 'Тёплые оранжевые градиенты',
    'theme.desc.ocean': 'Прохладные синие глубины',
    'theme.desc.vintage': 'Классические сепия тона',

    // Language
    'language.title': 'Язык',
    'language.select': 'Выберите язык',

    // Tabs
    'tab.load': 'Загрузите таб для начала',
    'tab.load.desc': 'Перейдите в библиотеку для загрузки табов или создайте новый в редакторе',
    'tab.create': 'Создайте новый таб',
    'tab.create.desc': 'Выберите таб из библиотеки или создайте новый для редактирования',
    'tab.new': 'Новый таб',
    'tab.create.button': 'Создать новый таб',

    // Footer
    'footer.tunings': 'Поддерживаются все популярные строи • Кастомные настройки',
    'footer.environment': 'Лучше всего работает в тихой обстановке',

    // Common
    'common.string': 'струна',

    // Tuner components
    'tuner.loading': 'Загрузка настройки инструмента...',
    'tuner.mode.auto': 'Автоматический режим',
    'tuner.mode.auto.desc': 'Автоматическое определение струн',
    'tuner.mode.manual': 'Ручной режим',
    'tuner.mode.manual.desc': 'Выберите струну вручную',
    'tuner.headstock': 'Головка грифа',
    'tuner.waiting': 'Ожидание сигнала...',

    // Library
    'library.search.placeholder': 'Поиск по названию, исполнителю, жанру...',
    'library.import': 'Импорт',
    'library.folder': 'Папка',
    'library.folder.createTitle': 'Создать папку',
    'library.folder.namePlaceholder': 'Название папки',
    'library.create': 'Создать',
    'library.allFolders': 'Все папки',
    'library.allTabs': 'Все табы',
    'library.sort.title': 'По названию',
    'library.sort.artist': 'По исполнителю',
    'library.sort.date': 'По дате изменения',
    'library.sort.progress': 'По прогрессу',
    'library.empty.title': 'Табы не найдены',
    'library.empty.subtitle': 'Импортируйте или создайте новый таб',
    'library.actions.duplicate': 'Дублировать',
    'library.actions.delete': 'Удалить',
    'library.progress.learned': 'изучено',
    'library.stats.totalTabs': 'Всего табов',
    'library.stats.folders': 'Папок',
    'library.stats.inLearning': 'В изучении',
    'library.stats.practiceHours': 'Часов практики',

    // Not Found page
    'notfound.title': 'Страница не найдена',
    'notfound.message': 'Упс! Страница не найдена',
    'notfound.back': 'Вернуться на главную',
    // Custom Tuning Editor
    'tuning.editor.title': 'Создать кастомный строй',
    'tuning.editor.name': 'Название строя',
    'tuning.editor.namePlaceholder': 'Например: My Custom Tuning',
    'tuning.editor.description': 'Описание (необязательно)',
    'tuning.editor.descPlaceholder': 'Описание строя',
    'tuning.editor.instrumentType': 'Тип инструмента',
    'tuning.editor.strings': 'Струны (от самой толстой к самой тонкой)',
    'tuning.editor.addString': '+ Струна',
    'tuning.editor.cancel': 'Отмена',
    'tuning.editor.save': 'Сохранить строй',
    'tuning.editor.error.name': 'Введите название строя',
    'tuning.editor.success': 'Строй сохранён!',
    'tuning.editor.defaultDesc': 'Кастомный строй',

    // Tab Editor
    'editor.fretboard': 'Гриф',
    'editor.tablature': 'Табулатура',
    'editor.measure': 'Такт',
    'editor.section': 'Секция',
    'editor.tools.select': 'Выбор',
    'editor.tools.note': 'Нота',
    'editor.tools.chord': 'Аккорд',
    'editor.tools.text': 'Текст',
    'editor.metadata.edit': 'Редактировать информацию',
    'editor.save': 'Сохранить',
    'editor.metadata.title': 'Информация о табе',
    'editor.metadata.name': 'Название',
    'editor.metadata.artist': 'Исполнитель',
    'editor.metadata.album': 'Альбом',
    'editor.metadata.genre': 'Жанр',
    'editor.metadata.tempo': 'Темп (BPM)',
    'editor.metadata.difficulty': 'Сложность',
    'editor.difficulty.beginner': 'Начинающий',
    'editor.difficulty.intermediate': 'Средний',
    'editor.difficulty.advanced': 'Продвинутый',
    'editor.difficulty.expert': 'Эксперт',
    'editor.properties.string': 'Струна',
    'editor.properties.technique': 'Техника',
    'editor.technique.normal': 'Обычная',
    'editor.technique.bend': 'Бенд',
    'editor.technique.slide': 'Слайд',
    'editor.technique.hammer': 'Хаммер-он',
    'editor.technique.pull': 'Пулл-офф',
    'editor.technique.vibrato': 'Вибрато',
    'editor.technique.palmmute': 'Пальм-мьют',
    'editor.properties.duration': 'Длительность',
    'editor.duration.16': '1/16',
    'editor.duration.8': '1/8',
    'editor.duration.4': '1/4',
    'editor.duration.2': '1/2',
    'editor.duration.1': 'Целая',

    // Tab Viewer
    'viewer.autoscroll': 'Авто-прокрутка',
    'viewer.chords': 'Аккорды',
    'viewer.lyrics': 'Текст',
    'viewer.highlight': 'Подсветка',
    'viewer.measure': 'Такт',
    'viewer.playing': 'Воспроизведение',
  },

  en: {
    // Header
    'app.title': 'iTuneNote',
    'app.subtitle': 'Smart guitar tuner for your browser',

    // Navigation
    'nav.tuner': 'Tuner',
    'nav.tabs': 'Tabs',
    'nav.library': 'Library',
    'nav.editor': 'Editor',
    'nav.settings': 'Settings',
    'nav.history': 'History',

    // Tuner
    'tuner.start': 'Start tuning',
    'tuner.stop': 'Stop',
    'tuner.listening': 'Listening...',
    'tuner.status.accurate': 'Perfect!',
    'tuner.status.close': 'Close',
    'tuner.status.off': 'Off',
    'tuner.hint.raise': 'Tighten string',
    'tuner.hint.lower': 'Loosen string',

    // Instruments
    'instrument.title': 'Instrument',
    'instrument.guitar': '6-String Guitar',
    'instrument.guitar-12': '12-String Guitar',
    'instrument.ukulele': 'Ukulele',
    'instrument.mandolin': 'Mandolin',
    'instrument.banjo': 'Banjo',
    'instrument.strings.6': '6 strings',
    'instrument.strings.12': '12 strings',
    'instrument.strings.4': '4 strings',
    'instrument.strings.8': '8 strings',
    'instrument.strings.5': '5 strings',
    'instrument.desc.guitar': 'Classic guitar',
    'instrument.desc.guitar-12': 'Doubled strings',
    'instrument.desc.ukulele': 'Hawaiian instrument',
    'instrument.desc.mandolin': 'Paired strings',
    'instrument.desc.banjo': 'American instrument',

    // Tunings
    'tuning.title': 'Tunings',
    'tuning.select': 'Select tuning',
    'tuning.custom': 'Custom',
    'tuning.alt': 'Alt',
    'tuning.available': 'available tunings',

    // Theme
    'theme.title': 'Theme',
    'theme.dark': 'Dark',
    'theme.retro': 'Retro Amp',
    'theme.amoled': 'AMOLED',
    'theme.neon': 'Neon',
    'theme.forest': 'Forest',
    'theme.sunset': 'Sunset',
    'theme.ocean': 'Ocean',
    'theme.vintage': 'Vintage',
    'theme.desc.dark': 'Modern dark theme',
    'theme.desc.retro': 'Vintage amplifier style',
    'theme.desc.amoled': 'Deep black for OLED',
    'theme.desc.neon': 'Bright cyberpunk vibes',
    'theme.desc.forest': 'Natural green tones',
    'theme.desc.sunset': 'Warm orange gradients',
    'theme.desc.ocean': 'Cool blue depths',
    'theme.desc.vintage': 'Classic sepia tones',

    // Language
    'language.title': 'Language',
    'language.select': 'Select language',

    // Tabs
    'tab.load': 'Load a tab to start',
    'tab.load.desc': 'Go to library to load tabs or create a new one in editor',
    'tab.create': 'Create new tab',
    'tab.create.desc': 'Select a tab from library or create new one for editing',
    'tab.new': 'New Tab',
    'tab.create.button': 'Create new tab',

    // Footer
    'footer.tunings': 'All popular tunings supported • Custom settings',
    'footer.environment': 'Works best in quiet environment',

    // Common
    'common.string': 'string',

    // Tuner components
    'tuner.loading': 'Loading instrument tuning...',
    'tuner.mode.auto': 'Auto mode',
    'tuner.mode.auto.desc': 'Automatic string detection',
    'tuner.mode.manual': 'Manual mode',
    'tuner.mode.manual.desc': 'Select string manually',
    'tuner.headstock': 'Headstock',
    'tuner.waiting': 'Waiting for signal...',

    // Library
    'library.search.placeholder': 'Search by title, artist, genre...',
    'library.import': 'Import',
    'library.folder': 'Folder',
    'library.folder.createTitle': 'Create folder',
    'library.folder.namePlaceholder': 'Folder name',
    'library.create': 'Create',
    'library.allFolders': 'All folders',
    'library.allTabs': 'All tabs',
    'library.sort.title': 'By title',
    'library.sort.artist': 'By artist',
    'library.sort.date': 'By last updated',
    'library.sort.progress': 'By progress',
    'library.empty.title': 'No tabs found',
    'library.empty.subtitle': 'Import or create a new tab',
    'library.actions.duplicate': 'Duplicate',
    'library.actions.delete': 'Delete',
    'library.progress.learned': 'learned',
    'library.stats.totalTabs': 'Total tabs',
    'library.stats.folders': 'Folders',
    'library.stats.inLearning': 'In learning',
    'library.stats.practiceHours': 'Practice hours',

    // Not Found page
    'notfound.title': 'Page not found',
    'notfound.message': 'Oops! Page not found',
    'notfound.back': 'Return to Home',
    // Custom Tuning Editor
    'tuning.editor.title': 'Create Custom Tuning',
    'tuning.editor.name': 'Tuning Name',
    'tuning.editor.namePlaceholder': 'E.g. My Custom Tuning',
    'tuning.editor.description': 'Description (optional)',
    'tuning.editor.descPlaceholder': 'Tuning description',
    'tuning.editor.instrumentType': 'Instrument Type',
    'tuning.editor.strings': 'Strings (thickest to thinnest)',
    'tuning.editor.addString': '+ String',
    'tuning.editor.cancel': 'Cancel',
    'tuning.editor.save': 'Save Tuning',
    'tuning.editor.error.name': 'Enter tuning name',
    'tuning.editor.success': 'Tuning saved!',
    'tuning.editor.defaultDesc': 'Custom tuning',

    // Tab Editor
    'editor.fretboard': 'Fretboard',
    'editor.tablature': 'Tablature',
    'editor.measure': 'Measure',
    'editor.section': 'Section',
    'editor.tools.select': 'Select',
    'editor.tools.note': 'Note',
    'editor.tools.chord': 'Chord',
    'editor.tools.text': 'Text',
    'editor.metadata.edit': 'Edit Info',
    'editor.save': 'Save',
    'editor.metadata.title': 'Tab Information',
    'editor.metadata.name': 'Title',
    'editor.metadata.artist': 'Artist',
    'editor.metadata.album': 'Album',
    'editor.metadata.genre': 'Genre',
    'editor.metadata.tempo': 'Tempo (BPM)',
    'editor.metadata.difficulty': 'Difficulty',
    'editor.difficulty.beginner': 'Beginner',
    'editor.difficulty.intermediate': 'Intermediate',
    'editor.difficulty.advanced': 'Advanced',
    'editor.difficulty.expert': 'Expert',
    'editor.properties.string': 'String',
    'editor.properties.technique': 'Technique',
    'editor.technique.normal': 'Normal',
    'editor.technique.bend': 'Bend',
    'editor.technique.slide': 'Slide',
    'editor.technique.hammer': 'Hammer-on',
    'editor.technique.pull': 'Pull-off',
    'editor.technique.vibrato': 'Vibrato',
    'editor.technique.palmmute': 'Palm Mute',
    'editor.properties.duration': 'Duration',
    'editor.duration.16': '1/16',
    'editor.duration.8': '1/8',
    'editor.duration.4': '1/4',
    'editor.duration.2': '1/2',
    'editor.duration.1': 'Whole',

    // Tab Viewer
    'viewer.autoscroll': 'Auto-scroll',
    'viewer.chords': 'Chords',
    'viewer.lyrics': 'Lyrics',
    'viewer.highlight': 'Highlight',
    'viewer.measure': 'Measure',
    'viewer.playing': 'Playing',
  },

  es: {
    // Header
    'app.title': 'iTuneNote',
    'app.subtitle': 'Afinador inteligente para tu navegador',

    // Navigation
    'nav.tuner': 'Afinador',
    'nav.tabs': 'Tabs',
    'nav.library': 'Biblioteca',
    'nav.editor': 'Editor',
    'nav.settings': 'Ajustes',
    'nav.history': 'Historial',

    // Tuner
    'tuner.start': 'Comenzar afinación',
    'tuner.stop': 'Parar',
    'tuner.listening': 'Escuchando...',
    'tuner.status.accurate': '¡Perfecto!',
    'tuner.status.close': 'Cerca',
    'tuner.status.off': 'Desafinado',
    'tuner.hint.raise': 'Tensar cuerda',
    'tuner.hint.lower': 'Aflojar cuerda',

    // Instruments
    'instrument.title': 'Instrumento',
    'instrument.guitar': 'Guitarra 6 cuerdas',
    'instrument.guitar-12': 'Guitarra 12 cuerdas',
    'instrument.ukulele': 'Ukelele',
    'instrument.mandolin': 'Mandolina',
    'instrument.banjo': 'Banjo',
    'instrument.strings.6': '6 cuerdas',
    'instrument.strings.12': '12 cuerdas',
    'instrument.strings.4': '4 cuerdas',
    'instrument.strings.8': '8 cuerdas',
    'instrument.strings.5': '5 cuerdas',
    'instrument.desc.guitar': 'Guitarra clásica',
    'instrument.desc.guitar-12': 'Cuerdas dobladas',
    'instrument.desc.ukulele': 'Instrumento hawaiano',
    'instrument.desc.mandolin': 'Cuerdas pareadas',
    'instrument.desc.banjo': 'Instrumento americano',

    // Tunings
    'tuning.title': 'Afinaciones',
    'tuning.select': 'Seleccionar afinación',
    'tuning.custom': 'Personal',
    'tuning.alt': 'Alt',
    'tuning.available': 'afinaciones disponibles',

    // Theme
    'theme.title': 'Tema',
    'theme.dark': 'Oscuro',
    'theme.retro': 'Amplificador Retro',
    'theme.amoled': 'AMOLED',
    'theme.desc.dark': 'Tema oscuro moderno',
    'theme.desc.retro': 'Estilo amplificador vintage',
    'theme.desc.amoled': 'Negro profundo para OLED',

    // Language
    'language.title': 'Idioma',
    'language.select': 'Seleccionar idioma',

    // Tabs
    'tab.load': 'Cargar una tab para empezar',
    'tab.load.desc': 'Ve a la biblioteca para cargar tabs o crea una nueva en el editor',
    'tab.create': 'Crear nueva tab',
    'tab.create.desc': 'Selecciona una tab de la biblioteca o crea una nueva para editar',
    'tab.new': 'Nueva Tab',
    'tab.create.button': 'Crear nueva tab',

    // Footer
    'footer.tunings': 'Todas las afinaciones populares • Configuraciones personalizadas',
    'footer.environment': 'Funciona mejor en ambiente silencioso',

    // Common
    'common.string': 'cuerda',
  },

  fr: {
    // Header
    'app.title': 'iTuneNote',
    'app.subtitle': 'Accordeur intelligent pour votre navigateur',

    // Navigation
    'nav.tuner': 'Accordeur',
    'nav.tabs': 'Tablatures',
    'nav.library': 'Bibliothèque',
    'nav.editor': 'Éditeur',
    'nav.settings': 'Paramètres',
    'nav.history': 'Historique',

    // Tuner
    'tuner.start': 'Commencer accordage',
    'tuner.stop': 'Arrêter',
    'tuner.listening': 'Écoute...',
    'tuner.status.accurate': 'Parfait!',
    'tuner.status.close': 'Proche',
    'tuner.status.off': 'Désaccordé',
    'tuner.hint.raise': 'Tendre la corde',
    'tuner.hint.lower': 'Détendre la corde',

    // Instruments
    'instrument.title': 'Instrument',
    'instrument.guitar': 'Guitare 6 cordes',
    'instrument.guitar-12': 'Guitare 12 cordes',
    'instrument.ukulele': 'Ukulélé',
    'instrument.mandolin': 'Mandoline',
    'instrument.banjo': 'Banjo',
    'instrument.strings.6': '6 cordes',
    'instrument.strings.12': '12 cordes',
    'instrument.strings.4': '4 cordes',
    'instrument.strings.8': '8 cordes',
    'instrument.strings.5': '5 cordes',
    'instrument.desc.guitar': 'Guitare classique',
    'instrument.desc.guitar-12': 'Cordes doublées',
    'instrument.desc.ukulele': 'Instrument hawaïen',
    'instrument.desc.mandolin': 'Cordes appariées',
    'instrument.desc.banjo': 'Instrument américain',

    // Tunings
    'tuning.title': 'Accordages',
    'tuning.select': 'Sélectionner accordage',
    'tuning.custom': 'Personnalisé',
    'tuning.alt': 'Alt',
    'tuning.available': 'accordages disponibles',

    // Theme
    'theme.title': 'Thème',
    'theme.dark': 'Sombre',
    'theme.retro': 'Ampli Rétro',
    'theme.amoled': 'AMOLED',
    'theme.desc.dark': 'Thème sombre moderne',
    'theme.desc.retro': 'Style amplificateur vintage',
    'theme.desc.amoled': 'Noir profond pour OLED',

    // Language
    'language.title': 'Langue',
    'language.select': 'Sélectionner langue',

    // Tabs
    'tab.load': 'Charger une tablature pour commencer',
    'tab.load.desc': 'Allez à la bibliothèque pour charger des tablatures ou créez-en une nouvelle dans l\'éditeur',
    'tab.create': 'Créer nouvelle tablature',
    'tab.create.desc': 'Sélectionnez une tablature de la bibliothèque ou créez-en une nouvelle pour éditer',
    'tab.new': 'Nouvelle Tablature',
    'tab.create.button': 'Créer nouvelle tablature',

    // Footer
    'footer.tunings': 'Tous les accordages populaires • Paramètres personnalisés',
    'footer.environment': 'Fonctionne mieux dans un environnement silencieux',

    // Common
    'common.string': 'corde',
  },

  de: {
    // Header
    'app.title': 'iTuneNote',
    'app.subtitle': 'Intelligenter Gitarrenstimmer für deinen Browser',

    // Navigation
    'nav.tuner': 'Stimmer',
    'nav.tabs': 'Tabs',
    'nav.library': 'Bibliothek',
    'nav.editor': 'Editor',
    'nav.settings': 'Einstellungen',
    'nav.history': 'Verlauf',

    // Tuner
    'tuner.start': 'Stimmen beginnen',
    'tuner.stop': 'Stoppen',
    'tuner.listening': 'Höre zu...',
    'tuner.status.accurate': 'Perfekt!',
    'tuner.status.close': 'Nah',
    'tuner.status.off': 'Verstimmt',
    'tuner.hint.raise': 'Saite spannen',
    'tuner.hint.lower': 'Saite lockern',

    // Instruments
    'instrument.title': 'Instrument',
    'instrument.guitar': '6-saitige Gitarre',
    'instrument.guitar-12': '12-saitige Gitarre',
    'instrument.ukulele': 'Ukulele',
    'instrument.mandolin': 'Mandoline',
    'instrument.banjo': 'Banjo',
    'instrument.strings.6': '6 Saiten',
    'instrument.strings.12': '12 Saiten',
    'instrument.strings.4': '4 Saiten',
    'instrument.strings.8': '8 Saiten',
    'instrument.strings.5': '5 Saiten',
    'instrument.desc.guitar': 'Klassische Gitarre',
    'instrument.desc.guitar-12': 'Doppelte Saiten',
    'instrument.desc.ukulele': 'Hawaiianisches Instrument',
    'instrument.desc.mandolin': 'Gepaarte Saiten',
    'instrument.desc.banjo': 'Amerikanisches Instrument',

    // Tunings
    'tuning.title': 'Stimmungen',
    'tuning.select': 'Stimmung wählen',
    'tuning.custom': 'Benutzer',
    'tuning.alt': 'Alt',
    'tuning.available': 'verfügbare Stimmungen',

    // Theme
    'theme.title': 'Design',
    'theme.dark': 'Dunkel',
    'theme.retro': 'Retro-Verstärker',
    'theme.amoled': 'AMOLED',
    'theme.desc.dark': 'Modernes dunkles Design',
    'theme.desc.retro': 'Vintage-Verstärker-Stil',
    'theme.desc.amoled': 'Tiefes Schwarz für OLED',

    // Language
    'language.title': 'Sprache',
    'language.select': 'Sprache wählen',

    // Tabs
    'tab.load': 'Tab laden um zu beginnen',
    'tab.load.desc': 'Gehe zur Bibliothek um Tabs zu laden oder erstelle eine neue im Editor',
    'tab.create': 'Neue Tab erstellen',
    'tab.create.desc': 'Wähle eine Tab aus der Bibliothek oder erstelle eine neue zum Bearbeiten',
    'tab.new': 'Neue Tab',
    'tab.create.button': 'Neue Tab erstellen',

    // Footer
    'footer.tunings': 'Alle beliebten Stimmungen • Benutzerdefinierte Einstellungen',
    'footer.environment': 'Funktioniert am besten in ruhiger Umgebung',

    // Common
    'common.string': 'Saite',
  },

  pt: {
    // Header
    'app.title': 'iTuneNote',
    'app.subtitle': 'Afinador inteligente para seu navegador',

    // Navigation
    'nav.tuner': 'Afinador',
    'nav.tabs': 'Tabs',
    'nav.library': 'Biblioteca',
    'nav.editor': 'Editor',
    'nav.settings': 'Configurações',
    'nav.history': 'Histórico',

    // Tuner
    'tuner.start': 'Começar afinação',
    'tuner.stop': 'Parar',
    'tuner.listening': 'Ouvindo...',
    'tuner.status.accurate': 'Perfeito!',
    'tuner.status.close': 'Perto',
    'tuner.status.off': 'Desafinado',
    'tuner.hint.raise': 'Esticar corda',
    'tuner.hint.lower': 'Afrouxar corda',

    // Instruments
    'instrument.title': 'Instrumento',
    'instrument.guitar': 'Violão 6 cordas',
    'instrument.guitar-12': 'Violão 12 cordas',
    'instrument.ukulele': 'Ukulele',
    'instrument.mandolin': 'Bandolim',
    'instrument.banjo': 'Banjo',
    'instrument.strings.6': '6 cordas',
    'instrument.strings.12': '12 cordas',
    'instrument.strings.4': '4 cordas',
    'instrument.strings.8': '8 cordas',
    'instrument.strings.5': '5 cordas',
    'instrument.desc.guitar': 'Violão clássico',
    'instrument.desc.guitar-12': 'Cordas dobradas',
    'instrument.desc.ukulele': 'Instrumento havaiano',
    'instrument.desc.mandolin': 'Cordas pareadas',
    'instrument.desc.banjo': 'Instrumento americano',

    // Tunings
    'tuning.title': 'Afinações',
    'tuning.select': 'Selecionar afinação',
    'tuning.custom': 'Personalizada',
    'tuning.alt': 'Alt',
    'tuning.available': 'afinações disponíveis',

    // Theme
    'theme.title': 'Tema',
    'theme.dark': 'Escuro',
    'theme.retro': 'Amplificador Retrô',
    'theme.amoled': 'AMOLED',
    'theme.desc.dark': 'Tema escuro moderno',
    'theme.desc.retro': 'Estilo amplificador vintage',
    'theme.desc.amoled': 'Preto profundo para OLED',

    // Language
    'language.title': 'Idioma',
    'language.select': 'Selecionar idioma',

    // Tabs
    'tab.load': 'Carregar uma tab para começar',
    'tab.load.desc': 'Vá para a biblioteca para carregar tabs ou crie uma nova no editor',
    'tab.create': 'Criar nova tab',
    'tab.create.desc': 'Selecione uma tab da biblioteca ou crie uma nova para editar',
    'tab.new': 'Nova Tab',
    'tab.create.button': 'Criar nova tab',

    // Footer
    'footer.tunings': 'Todas as afinações populares • Configurações personalizadas',
    'footer.environment': 'Funciona melhor em ambiente silencioso',

    // Common
    'common.string': 'corda',
  },

  it: {
    // Header
    'app.title': 'iTuneNote',
    'app.subtitle': 'Accordatore intelligente per il tuo browser',

    // Navigation
    'nav.tuner': 'Accordatore',
    'nav.tabs': 'Tablature',
    'nav.library': 'Libreria',
    'nav.editor': 'Editor',
    'nav.settings': 'Impostazioni',
    'nav.history': 'Cronologia',

    // Tuner
    'tuner.start': 'Inizia accordatura',
    'tuner.stop': 'Ferma',
    'tuner.listening': 'Ascolto...',
    'tuner.status.accurate': 'Perfetto!',
    'tuner.status.close': 'Vicino',
    'tuner.status.off': 'Scordato',
    'tuner.hint.raise': 'Tendere corda',
    'tuner.hint.lower': 'Allentare corda',

    // Instruments
    'instrument.title': 'Strumento',
    'instrument.guitar': 'Chitarra 6 corde',
    'instrument.guitar-12': 'Chitarra 12 corde',
    'instrument.ukulele': 'Ukulele',
    'instrument.mandolin': 'Mandolino',
    'instrument.banjo': 'Banjo',
    'instrument.strings.6': '6 corde',
    'instrument.strings.12': '12 corde',
    'instrument.strings.4': '4 corde',
    'instrument.strings.8': '8 corde',
    'instrument.strings.5': '5 corde',
    'instrument.desc.guitar': 'Chitarra classica',
    'instrument.desc.guitar-12': 'Corde doppie',
    'instrument.desc.ukulele': 'Strumento hawaiano',
    'instrument.desc.mandolin': 'Corde accoppiate',
    'instrument.desc.banjo': 'Strumento americano',

    // Tunings
    'tuning.title': 'Accordature',
    'tuning.select': 'Seleziona accordatura',
    'tuning.custom': 'Personalizzata',
    'tuning.alt': 'Alt',
    'tuning.available': 'accordature disponibili',

    // Theme
    'theme.title': 'Tema',
    'theme.dark': 'Scuro',
    'theme.retro': 'Amplificatore Retrò',
    'theme.amoled': 'AMOLED',
    'theme.desc.dark': 'Tema scuro moderno',
    'theme.desc.retro': 'Stile amplificatore vintage',
    'theme.desc.amoled': 'Nero profondo per OLED',

    // Language
    'language.title': 'Lingua',
    'language.select': 'Seleziona lingua',

    // Tabs
    'tab.load': 'Carica una tablatura per iniziare',
    'tab.load.desc': 'Vai alla libreria per caricare tablature o creane una nuova nell\'editor',
    'tab.create': 'Crea nuova tablatura',
    'tab.create.desc': 'Seleziona una tablatura dalla libreria o creane una nuova per modificare',
    'tab.new': 'Nuova Tablatura',
    'tab.create.button': 'Crea nuova tablatura',

    // Footer
    'footer.tunings': 'Tutte le accordature popolari • Impostazioni personalizzate',
    'footer.environment': 'Funziona meglio in ambiente silenzioso',

    // Common
    'common.string': 'corda',
  },

  ja: {
    // Header
    'app.title': 'iTuneNote',
    'app.subtitle': 'ブラウザー用スマートギターチューナー',

    // Navigation
    'nav.tuner': 'チューナー',
    'nav.tabs': 'タブ',
    'nav.library': 'ライブラリ',
    'nav.editor': 'エディタ',
    'nav.settings': '設定',
    'nav.history': '履歴',

    // Library
    'library.search.placeholder': 'タイトル、アーティスト、ジャンルで検索...',
    'library.import': 'インポート',
    'library.folder': 'フォルダ',
    'library.folder.createTitle': 'フォルダを作成',
    'library.folder.namePlaceholder': 'フォルダ名',
    'library.create': '作成',
    'library.allFolders': 'すべてのフォルダ',
    'library.allTabs': 'すべてのタブ',
    'library.sort.title': 'タイトル順',
    'library.sort.artist': 'アーティスト順',
    'library.sort.date': '日付順',
    'library.sort.progress': '進捗順',
    'library.empty.title': 'タブが見つかりません',
    'library.empty.subtitle': 'インポートするか、新しいタブを作成してください',
    'library.progress.learned': '習得',
    'library.actions.duplicate': '複製',
    'library.actions.delete': '削除',
    'library.stats.totalTabs': '総タブ数',
    'library.stats.folders': 'フォルダ数',
    'library.stats.inLearning': '練習中',
    'library.stats.practiceHours': '練習時間',

    // Tuner
    'tuner.start': 'チューニング開始',
    'tuner.stop': '停止',
    'tuner.listening': '聞いています...',
    'tuner.status.accurate': '完璧！',
    'tuner.status.close': '近い',
    'tuner.status.off': 'ずれています',
    'tuner.hint.raise': '弦を張る',
    'tuner.hint.lower': '弦を緩める',
    'tuner.mode.auto': '自動モード',
    'tuner.mode.manual': '手動モード',
    'tuner.mode.auto.desc': '自動弦検出',
    'tuner.mode.manual.desc': '手動で弦を選択',
    'tuner.waiting': '信号を待っています...',
    'tuner.direction.sharp': 'シャープ',
    'tuner.direction.flat': 'フラット',

    // Instruments
    'instrument.title': '楽器',
    'instrument.guitar': '6弦ギター',
    'instrument.guitar-12': '12弦ギター',
    'instrument.ukulele': 'ウクレレ',
    'instrument.mandolin': 'マンドリン',
    'instrument.banjo': 'バンジョー',
    'instrument.strings.6': '6弦',
    'instrument.strings.12': '12弦',
    'instrument.strings.4': '4弦',
    'instrument.strings.8': '8弦',
    'instrument.strings.5': '5弦',
    'instrument.desc.guitar': 'クラシックギター',
    'instrument.desc.guitar-12': '複弦',
    'instrument.desc.ukulele': 'ハワイの楽器',
    'instrument.desc.mandolin': 'ペア弦',
    'instrument.desc.banjo': 'アメリカの楽器',

    // Tunings
    'tuning.title': 'チューニング',
    'tuning.select': 'チューニングを選択',
    'tuning.custom': 'カスタム',
    'tuning.alt': 'オルト',
    'tuning.available': '利用可能なチューニング',

    // Theme
    'theme.title': 'テーマ',
    'theme.dark': 'ダーク',
    'theme.retro': 'レトロアンプ',
    'theme.amoled': 'AMOLED',
    'theme.desc.dark': 'モダンダークテーマ',
    'theme.desc.retro': 'ヴィンテージアンプスタイル',
    'theme.desc.amoled': 'OLED用ディープブラック',

    // Language
    'language.title': '言語',
    'language.select': '言語を選択',

    // Tabs
    'tab.load': '開始するにはタブを読み込んでください',
    'tab.load.desc': 'ライブラリでタブを読み込むか、エディタで新しいタブを作成してください',
    'tab.create': '新しいタブを作成',
    'tab.create.desc': 'ライブラリからタブを選択するか、編集用に新しいタブを作成してください',
    'tab.new': '新しいタブ',
    'tab.create.button': '新しいタブを作成',

    // Footer
    'footer.tunings': 'すべての人気チューニングをサポート • カスタム設定',
    'footer.environment': '静かな環境で最高の動作',

    // Common
    'common.string': '弦',
  },

  ko: {
    // Header
    'app.title': 'iTuneNote',
    'app.subtitle': '브라우저용 스마트 기타 튜너',

    // Navigation
    'nav.tuner': '튜너',
    'nav.tabs': '탭',
    'nav.library': '라이브러리',
    'nav.editor': '편집기',
    'nav.settings': '설정',
    'nav.history': '기록',

    // Tuner
    'tuner.start': '튜닝 시작',
    'tuner.stop': '정지',
    'tuner.listening': '듣는 중...',
    'tuner.status.accurate': '완벽!',
    'tuner.status.close': '가까움',
    'tuner.status.off': '어긋남',
    'tuner.hint.raise': '줄 조이기',
    'tuner.hint.lower': '줄 풀기',

    // Instruments
    'instrument.title': '악기',
    'instrument.guitar': '6현 기타',
    'instrument.guitar-12': '12현 기타',
    'instrument.ukulele': '우쿨렐레',
    'instrument.mandolin': '만돌린',
    'instrument.banjo': '밴조',
    'instrument.strings.6': '6현',
    'instrument.strings.12': '12현',
    'instrument.strings.4': '4현',
    'instrument.strings.8': '8현',
    'instrument.strings.5': '5현',
    'instrument.desc.guitar': '클래식 기타',
    'instrument.desc.guitar-12': '복현',
    'instrument.desc.ukulele': '하와이 악기',
    'instrument.desc.mandolin': '쌍현',
    'instrument.desc.banjo': '미국 악기',

    // Tunings
    'tuning.title': '튜닝',
    'tuning.select': '튜닝 선택',
    'tuning.custom': '사용자 정의',
    'tuning.alt': '대체',
    'tuning.available': '사용 가능한 튜닝',

    // Theme
    'theme.title': '테마',
    'theme.dark': '다크',
    'theme.retro': '레트로 앰프',
    'theme.amoled': 'AMOLED',
    'theme.desc.dark': '모던 다크 테마',
    'theme.desc.retro': '빈티지 앰프 스타일',
    'theme.desc.amoled': 'OLED용 딥 블랙',

    // Language
    'language.title': '언어',
    'language.select': '언어 선택',

    // Tabs
    'tab.load': '시작하려면 탭을 로드하세요',
    'tab.load.desc': '라이브러리에서 탭을 로드하거나 편집기에서 새로 만드세요',
    'tab.create': '새 탭 만들기',
    'tab.create.desc': '라이브러리에서 탭을 선택하거나 편집할 새 탭을 만드세요',
    'tab.new': '새 탭',
    'tab.create.button': '새 탭 만들기',

    // Audio Settings
    'settings.audio.title': 'Audio Settings',
    'settings.audio.input': 'Input Device',
    'settings.audio.sensitivity': 'Microphone Sensitivity',
    'settings.audio.sensitivity.desc': 'Adjust input gain. Increase if tuner doesn\'t pick up sound.',
    'settings.audio.threshold': 'Noise Gate Threshold',
    'settings.audio.threshold.desc': 'Minimum volume level to detect. Increase to ignore background noise.',

    // Footer
    'footer.tunings': '모든 인기 튜닝 지원 • 사용자 정의 설정',
    'footer.environment': '조용한 환경에서 최적 작동',

    // Common
    'common.string': '현',
  },

  zh: {
    // Header
    'app.title': 'iTuneNote',
    'app.subtitle': '浏览器智能吉他调音器',

    // Navigation
    'nav.tuner': '调音器',
    'nav.tabs': '谱子',
    'nav.library': '音库',
    'nav.editor': '编辑器',
    'nav.settings': '设置',
    'nav.history': '历史',

    // Tuner
    'tuner.start': '开始调音',
    'tuner.stop': '停止',
    'tuner.listening': '正在监听...',
    'tuner.status.accurate': '完美！',
    'tuner.status.close': '接近',
    'tuner.status.off': '偏差',
    'tuner.hint.raise': '拧紧琴弦',
    'tuner.hint.lower': '放松琴弦',

    // Instruments
    'instrument.title': '乐器',
    'instrument.guitar': '6弦吉他',
    'instrument.guitar-12': '12弦吉他',
    'instrument.ukulele': '尤克里里',
    'instrument.mandolin': '曼陀林',
    'instrument.banjo': '班卓琴',
    'instrument.strings.6': '6弦',
    'instrument.strings.12': '12弦',
    'instrument.strings.4': '4弦',
    'instrument.strings.8': '8弦',
    'instrument.strings.5': '5弦',
    'instrument.desc.guitar': '经典吉他',
    'instrument.desc.guitar-12': '双弦',
    'instrument.desc.ukulele': '夏威夷乐器',
    'instrument.desc.mandolin': '成对弦',
    'instrument.desc.banjo': '美国乐器',

    // Tunings
    'tuning.title': '调音',
    'tuning.select': '选择调音',
    'tuning.custom': '自定义',
    'tuning.alt': '替代',
    'tuning.available': '可用调音',

    // Theme
    'theme.title': '主题',
    'theme.dark': '深色',
    'theme.retro': '复古放大器',
    'theme.amoled': 'AMOLED',
    'theme.desc.dark': '现代深色主题',
    'theme.desc.retro': '复古放大器风格',
    'theme.desc.amoled': 'OLED深黑色',

    // Language
    'language.title': '语言',
    'language.select': '选择语言',

    // Tabs
    'tab.load': '加载谱子开始',
    'tab.load.desc': '到音库加载谱子或在编辑器中创建新的',
    'tab.create': '创建新谱子',
    'tab.create.desc': '从音库选择谱子或创建新的编辑',
    'tab.new': '新谱子',
    'tab.create.button': '创建新谱子',

    // Footer
    'footer.tunings': '支持所有流行调音 • 自定义设置',
    'footer.environment': '在安静环境中效果最佳',

    // Common
    'common.string': '弦',
  },
};