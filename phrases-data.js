const PHRASE_DATA = {
  "order": {
    "0": "phrase-day",
    "1": "phrase-family",
    "2": "phrase-food",
    "3": "phrase-animals",
    "4": "phrase-weather",
    "5": "phrase-emotions",
    "6": "phrase-prepositions",
    "7": "phrase-travel",
    "8": "phrase-adverbs",
    "9": "phrase-agreement",
    "10": "phrase-reactions",
    "11": "phrase-support",
    "12": "phrase-everyday",
    "13": "phrase-appraisal",
    "14": "phrase-tenses"
  },
  "categories": {
    "phrase-day": {
      "title": "Мій день — My Day",
      "phrases": [
        { "en": "I get up and wash my face.", "uk": "Я встаю і мию обличчя." },
        { "en": "I eat breakfast and drink milk.", "uk": "Я їм сніданок і п'ю молоко." },
        { "en": "I go to school with my friend.", "uk": "Я йду до школи з другом." },
        { "en": "I read and write at school.", "uk": "Я читаю і пишу у школі." },
        { "en": "I play and run in the park.", "uk": "Я граю і бігаю в парку." },
        { "en": "In the evening I cook dinner.", "uk": "Увечері я готую вечерю." },
        { "en": "At night I sleep in my bed.", "uk": "Уночі я сплю у своєму ліжку." }
      ]
    },
    "phrase-family": {
      "title": "Моя сім'я — My Family",
      "phrases": [
        { "en": "I love my mother and father.", "uk": "Я люблю маму і тата." },
        { "en": "My sister is happy today.", "uk": "Моя сестра сьогодні щаслива." },
        { "en": "My brother plays with the dog.", "uk": "Мій брат грає з собакою." },
        { "en": "Grandmother cooks tasty food.", "uk": "Бабуся готує смачну їжу." },
        { "en": "Grandfather reads a book.", "uk": "Дідусь читає книгу." },
        { "en": "We are a big family.", "uk": "Ми велика сім'я." },
        { "en": "I hug my baby brother.", "uk": "Я обіймаю свого братика." }
      ]
    },
    "phrase-food": {
      "title": "Їжа та напої — Food and Drinks",
      "phrases": [
        { "en": "I am hungry and want to eat.", "uk": "Я голодний і хочу їсти." },
        { "en": "I like apples and bananas.", "uk": "Мені подобаються яблука і банани." },
        { "en": "Mother makes soup in the kitchen.", "uk": "Мама готує суп на кухні." },
        { "en": "I drink water and juice.", "uk": "Я п'ю воду і сік." },
        { "en": "The bread is fresh and warm.", "uk": "Хліб свіжий і теплий." },
        { "en": "We eat fish and rice for dinner.", "uk": "Ми їмо рибу і рис на вечерю." },
        { "en": "I love sweet cake and tea.", "uk": "Я люблю солодкий торт і чай." }
      ]
    },
    "phrase-animals": {
      "title": "Тварини — Animals",
      "phrases": [
        { "en": "The cat sleeps on the chair.", "uk": "Кіт спить на стільці." },
        { "en": "The dog runs in the garden.", "uk": "Собака бігає в саду." },
        { "en": "A bird sings in the tree.", "uk": "Пташка співає на дереві." },
        { "en": "The cow and horse live on a farm.", "uk": "Корова і кінь живуть на фермі." },
        { "en": "Fish swim in the river.", "uk": "Риби плавають у річці." },
        { "en": "The lion is big and strong.", "uk": "Лев великий і сильний." },
        { "en": "I see a small rabbit.", "uk": "Я бачу маленького кролика." }
      ]
    },
    "phrase-weather": {
      "title": "Погода та пори року — Weather and Seasons",
      "phrases": [
        { "en": "Today the sun is warm.", "uk": "Сьогодні сонце тепле." },
        { "en": "In winter we play with snow.", "uk": "Взимку ми граємо зі снігом." },
        { "en": "In spring the flowers grow.", "uk": "Навесні ростуть квіти." },
        { "en": "In summer we swim in the sea.", "uk": "Влітку ми плаваємо в морі." },
        { "en": "In autumn the wind is cold.", "uk": "Восени вітер холодний." },
        { "en": "It is raining, take an umbrella.", "uk": "Йде дощ, візьми парасольку." },
        { "en": "I like a sunny day.", "uk": "Мені подобається сонячний день." }
      ]
    },
    "phrase-emotions": {
      "title": "Емоції — Emotions",
      "phrases": [
        { "en": "I feel overwhelmed when I have too much work.", "uk": "Я почуваюся приголомшеним, коли маю забагато роботи." },
        { "en": "She was relieved when the exam was over.", "uk": "Вона відчула полегшення, коли іспит закінчився." },
        { "en": "He felt guilty for forgetting her birthday.", "uk": "Він почувався винним за те, що забув про її день народження." },
        { "en": "I am grateful for your help.", "uk": "Я вдячний за вашу допомогу." },
        { "en": "She was embarrassed when she fell in public.", "uk": "Вона збентежилася, коли впала на людях." },
        { "en": "He is confident about his skills.", "uk": "Він впевнений у своїх навичках." },
        { "en": "We are all enthusiastic about the new project.", "uk": "Ми всі сповнені ентузіазму щодо нового проєкту." },
        { "en": "She feels content with her life.", "uk": "Вона задоволена своїм життям." }
      ]
    },
    "phrase-prepositions": {
      "title": "Прийменники — Prepositions",
      "phrases": [
        { "en": "Despite the rain, we went for a walk.", "uk": "Незважаючи на дощ, ми пішли на прогулянку." },
        { "en": "Throughout the year she studied hard.", "uk": "Протягом року вона наполегливо навчалася." },
        { "en": "He walked towards the door.", "uk": "Він пішов у напрямку до дверей." },
        { "en": "This is beyond my understanding.", "uk": "Це за межами мого розуміння." },
        { "en": "The cat hid beneath the table.", "uk": "Кіт сховався під столом." },
        { "en": "She stood among her friends.", "uk": "Вона стояла серед своїх друзів." },
        { "en": "Please stay within the marked area.", "uk": "Будь ласка, залишайтеся в межах позначеної зони." },
        { "en": "Unlike her sister, she loves sports.", "uk": "На відміну від сестри, вона любить спорт." }
      ]
    },
    "phrase-travel": {
      "title": "Подорож та відпочинок — Travel and Vacation",
      "phrases": [
        { "en": "The beach was peaceful and warm.", "uk": "Пляж був спокійним і теплим." },
        { "en": "The trip was exciting and memorable.", "uk": "Поїздка була захопливою і незабутньою." },
        { "en": "The hotel room was comfortable and clean.", "uk": "Номер у готелі був комфортним і чистим." },
        { "en": "The city is amazing — there is so much to see.", "uk": "Місто дивовижне — тут так багато всього побачити." },
        { "en": "We had an enjoyable evening at the restaurant.", "uk": "Ми провели приємний вечір у ресторані." },
        { "en": "The mountain air was refreshing and cool.", "uk": "Гірське повітря було освіжаючим і прохолодним." },
        { "en": "It is safe to travel alone here.", "uk": "Тут безпечно подорожувати наодинці." },
        { "en": "We had so much fun on the trip.", "uk": "Ми так гарно провели час у подорожі." }
      ]
    },
    "phrase-adverbs": {
      "title": "Прислівники — Adverbs",
      "phrases": [
        { "en": "I was tired. Nevertheless, I finished the work.", "uk": "Я втомився. Тим не менш, я закінчив роботу." },
        { "en": "She gradually learned to speak English well.", "uk": "Вона поступово навчилася добре говорити англійською." },
        { "en": "He barely had time to catch the train.", "uk": "Він ледве встиг на потяг." },
        { "en": "The two things happened simultaneously.", "uk": "Дві речі сталися одночасно." },
        { "en": "He undoubtedly made the right decision.", "uk": "Він безсумнівно прийняв правильне рішення." },
        { "en": "She reluctantly agreed to help.", "uk": "Вона неохоче погодилася допомогти." },
        { "en": "He consistently gets good results at school.", "uk": "Він послідовно отримує хороші результати у школі." },
        { "en": "The report was thoroughly checked before sending.", "uk": "Звіт був ретельно перевірений перед відправленням." }
      ]
    },
    "phrase-agreement": {
      "title": "Згода та розуміння — Agreement",
      "phrases": [
        { "en": "Fair enough.", "uk": "Справедливо." },
        { "en": "That makes sense.", "uk": "Логічно." },
        { "en": "I'm with you.", "uk": "Я з тобою згоден." },
        { "en": "Good point.", "uk": "Гарне зауваження." },
        { "en": "I hear you.", "uk": "Я тебе розумію." },
        { "en": "Exactly!", "uk": "Саме так." },
        { "en": "You got it.", "uk": "Саме так / Домовились." },
        { "en": "That's fair.", "uk": "Це чесно." },
        { "en": "Works for me.", "uk": "Мене влаштовує." },
        { "en": "You bet.", "uk": "Авжеж." },
        { "en": "Sounds good!", "uk": "Звучить добре! / Домовилися!" },
        { "en": "That's a good point.", "uk": "Це слушна думка." },
        { "en": "I don't mind.", "uk": "Я не проти." },
        { "en": "You've got a point.", "uk": "У ваших словах є сенс." },
        { "en": "I couldn't agree more.", "uk": "Повністю погоджуюся." },
        { "en": "It's worth it.", "uk": "Це того варте." },
        { "en": "Never mind.", "uk": "Неважливо. / Забудьте." },
        { "en": "That's enough.", "uk": "Цього достатньо." }
      ]
    },
    "phrase-reactions": {
      "title": "Короткі реакції — Quick Reactions",
      "phrases": [
        { "en": "No kidding!", "uk": "Та ну!" },
        { "en": "No way!", "uk": "Та ну!" },
        { "en": "You wish.", "uk": "Ага, мрій." },
        { "en": "Not a chance.", "uk": "Навіть не думай." },
        { "en": "Here we go.", "uk": "Ну, почалося." },
        { "en": "There you go.", "uk": "Ось бачиш / Тримай." },
        { "en": "That figures.", "uk": "Цього й варто було чекати." },
        { "en": "Tell me about it!", "uk": "Та не кажи!" },
        { "en": "Don't get me started.", "uk": "Навіть не починай." },
        { "en": "It rings a bell.", "uk": "Звучить знайомо." },
        { "en": "What do you mean?", "uk": "Що ви маєте на увазі?" },
        { "en": "What a pity!", "uk": "Як шкода!" },
        { "en": "I didn't catch that.", "uk": "Я не розчув / не розчула." },
        { "en": "Could you repeat that?", "uk": "Можете повторити?" },
        { "en": "How come?", "uk": "Як так? / Чому?" },
        { "en": "What's the matter?", "uk": "Що сталося?" },
        { "en": "Don't get me wrong.", "uk": "Не зрозумійте мене неправильно." },
        { "en": "That's not fair.", "uk": "Це несправедливо." },
        { "en": "I'm kidding!", "uk": "Я жартую!" },
        { "en": "That's a relief!", "uk": "Яке полегшення!" }
      ]
    },
    "phrase-support": {
      "title": "Підтримка та вибір — Support and Choice",
      "phrases": [
        { "en": "I'm in.", "uk": "Я в справі." },
        { "en": "Count me in.", "uk": "Розраховуй на мене." },
        { "en": "I'm on it.", "uk": "Уже займаюся." },
        { "en": "You got this!", "uk": "У тебе вийде." },
        { "en": "Suit yourself.", "uk": "Як знаєш." },
        { "en": "Be my guest.", "uk": "Будь ласка, не соромся." },
        { "en": "It's up to you.", "uk": "Вирішуй сам." },
        { "en": "You do you.", "uk": "Роби так, як вважаєш за потрібне." },
        { "en": "Give it a shot.", "uk": "Спробуй." },
        { "en": "Fingers crossed!", "uk": "Тримаймо кулаки." },
        { "en": "Let me think.", "uk": "Дайте мені подумати." },
        { "en": "I'm not sure.", "uk": "Я не впевнений / не впевнена." },
        { "en": "It depends.", "uk": "Це залежить від обставин." },
        { "en": "I have no idea.", "uk": "Я не маю уявлення." },
        { "en": "I'll think about it.", "uk": "Я про це подумаю." },
        { "en": "Let's figure it out.", "uk": "Давайте розберемося." },
        { "en": "You never know.", "uk": "Ніколи не знаєш." },
        { "en": "It's up to me.", "uk": "Це залежить від мене." }
      ]
    },
    "phrase-everyday": {
      "title": "Побутове спілкування — Everyday Talk",
      "phrases": [
        { "en": "No worries.", "uk": "Не проблема." },
        { "en": "My bad.", "uk": "Моя вина." },
        { "en": "Hang on.", "uk": "Зачекай." },
        { "en": "Hold on.", "uk": "Секунду." },
        { "en": "Take your time.", "uk": "Не поспішай." },
        { "en": "After you.", "uk": "Після вас." },
        { "en": "Help yourself.", "uk": "Пригощайся." },
        { "en": "I'm starving.", "uk": "Я страшенно голодний." },
        { "en": "I'm beat.", "uk": "Я виснажений." },
        { "en": "Easy does it.", "uk": "Обережніше." },
        { "en": "Here you go.", "uk": "Ось, будь ласка." },
        { "en": "I'm on my way.", "uk": "Я вже в дорозі." },
        { "en": "Give me a second.", "uk": "Дайте мені хвилинку." },
        { "en": "I'll be right back.", "uk": "Я зараз повернуся." },
        { "en": "I'm in a hurry.", "uk": "Я поспішаю." },
        { "en": "How does it work?", "uk": "Як це працює?" },
        { "en": "Can I try it on?", "uk": "Можна це приміряти?" },
        { "en": "Keep the change.", "uk": "Решти не потрібно." },
        { "en": "I'm just looking.", "uk": "Я просто дивлюся." },
        { "en": "I'll keep in touch.", "uk": "Я буду на зв'язку." }
      ]
    },
    "phrase-appraisal": {
      "title": "Оцінка та побажання — Praise and Wishes",
      "phrases": [
        { "en": "Lucky you!", "uk": "Пощастило ж тобі." },
        { "en": "Good for you!", "uk": "Молодець! / Класно!" },
        { "en": "You nailed it.", "uk": "Ти чудово впорався." },
        { "en": "That's the spirit!", "uk": "Оце правильний настрій!" },
        { "en": "Close enough.", "uk": "Майже." },
        { "en": "What a relief!", "uk": "Яке полегшення." },
        { "en": "So far, so good.", "uk": "Поки що все добре." },
        { "en": "No big deal.", "uk": "Дрібниці." },
        { "en": "I'm good.", "uk": "Ні, дякую / У мене все є." },
        { "en": "I'm all set.", "uk": "Усе готово / Мені більше нічого не потрібно." },
        { "en": "It's not a big deal.", "uk": "Нічого страшного." },
        { "en": "I'm used to it.", "uk": "Я до цього звик / звикла." },
        { "en": "I can't wait!", "uk": "Не можу дочекатися!" },
        { "en": "I'm all ears.", "uk": "Я уважно слухаю." },
        { "en": "Take it easy.", "uk": "Не хвилюйтеся. / Розслабтеся." },
        { "en": "Let's call it a day.", "uk": "На сьогодні досить." }
      ]
    },
    "phrase-tenses": {
      "title": "Таблиця часів — Tenses Table",
      "phrases": [
        { "en": "I ate an apple.", "uk": "Я з'їв яблуко." },
        { "en": "I eat an apple.", "uk": "Я їм яблуко (регулярно)." },
        { "en": "I will eat an apple.", "uk": "Я з'їм яблуко." },
        { "en": "I was eating an apple.", "uk": "Я їв яблуко (у той момент)." },
        { "en": "I am eating an apple.", "uk": "Я їм яблуко (зараз)." },
        { "en": "I will be eating an apple.", "uk": "Я їстиму яблуко (у той момент)." },
        { "en": "I had eaten an apple.", "uk": "Я з'їв яблуко (до іншої дії в минулому)." },
        { "en": "I have eaten an apple.", "uk": "Я вже з'їв яблуко." },
        { "en": "I will have eaten an apple.", "uk": "Я вже з'їм яблуко (до моменту в майбутньому)." },
        { "en": "I had been eating an apple.", "uk": "Я їв яблуко певний час (до моменту в минулому)." },
        { "en": "I have been eating an apple.", "uk": "Я їм яблуко вже певний час." },
        { "en": "I will have been eating an apple.", "uk": "Я їстиму яблуко вже певний час." }
      ]
    }
  }
};
