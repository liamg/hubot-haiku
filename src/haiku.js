// Description:
//   Allows hubot to craft dismal haiku.
// 
// Commands:
//   hubot haiku - Craft a dismal haiku.
//
// Author:
//   lgalvin
//
module.exports = function (robot) {
    robot.respond(/.*\bhaiku\b.*/i, function (res) {
        switch(robot.adapterName) {
            case 'slack':
                res.reply("\n```" + makeHaiku() + "```");
                break;
            case 'shell':
                res.reply("\n" + makeHaiku());
                break;
            default:
                res.reply(makeHaiku());
        }
    });
};


function makeHaiku() {
    return [
        makeLine(5),
        makeLine(7),
        makeLine(5)
    ].join(",\n");
};

function makeLine(syllableCount) {

    var line = [];

    var orders = [
        ['ADJECTIVE', 'NOUN', 'VERB', 'ADVERB'],
        ['ADJECTIVE', 'ADJECTIVE', 'NOUN', 'VERB'],
        ['NOUN', 'VERB', 'ADVERB', 'VERB'],
        ['ADJECTIVE', 'NOUN', 'ADJECTIVE'],
    ];

    var order = orders[Math.floor(Math.random() * orders.length)];

    var word;
    var index = 0;
    while (syllableCount > 0) {
        word = pickWord(order[index++], syllableCount > 4 ? 4 : syllableCount, line.length === order.length - 1 ? syllableCount : 1);
        syllableCount -= word.syllables;
        line.push(word.word);
    }

    return line.join(' ');
}

function pickWord(type, maxSyllables, minSyllables) {
    if (type === 'CONJUNCTION') {
        maxSyllables = minSyllables = 1;
    }
    var length = Math.floor(Math.random() * (maxSyllables - minSyllables)) + minSyllables;
    var wordsOfType = words[type][length];
    var selection = {
        word: wordsOfType[Math.floor(Math.random() * wordsOfType.length)],
        syllables: length
    };
    return selection;
}

var words = {
    NOUN: {
        1: [ // ~40 of each
            "ape",
            "ant",
            "art",
            "ash",
            "ale",
            "ark",
            "box",
            "bat",
            "bot",
            "broom",
            "bar",
            "bin",
            "beard",
            "boy",
            "bell",
            "brick",
            "bean",
            "boot",
            "bus",
            "car",
            "cat",
            "crow",
            "cup",
            "dog",
            "dart",
            "dirt",
            "edge",
            "elm",
            "escape",
            "filth",
            "fox",
            "girl",
            "goat",
            "grave",
            "hurt",
            "harm",
            "husk",
            "lamb",
            "life",
            "man",
            "mime",
            "night",
            "rain",
            "road",
            "side",
            "street",
            "time",
            "waste",
            "witch",
            "zoo"
        ],
        2: [
            "alfred",
            "\"alas!\"",
            "barman",
            "bastard",
            "bottle",
            "butcher",
            "captain",
            "cold wind",
            "donkey",
            "doorstop",
            "dark night",
            "echo",
            "earring",
            "flower",
            "fountain",
            "garage",
            "garbage",
            "gutter",
            "hospice",
            "hurdle",
            "hunter",
            "innard",
            "jumper",
            "killer",
            "llama",
            "loser",
            "lava",
            "lover",
            "mother",
            "monster",
            "number",
            "oval",
            "outside",
            "pirate",
            "panda",
            "razor",
            "robot",
            "sorrow",
            "summer",
            "terror",
            "titan",
            "turtle",
            "vandal",
            "woman",
            "zephyr"
        ],
        3: [
            "avatar",
            "attorney",
            "abacus",
            "barkeeper",
            "biscuit tin",
            "broken man",
            "believer",
            "charlatan",
            "coal miner",
            "champion",
            "circumstance",
            "defender",
            "denial",
            "designer",
            "divorcee",
            "endlessness",
            "exception",
            "family",
            "favourite",
            "fisherman",
            "gatekeeper",
            "gallbladder",
            "grandfather",
            "hangover",
            "humanoid",
            "idiot",
            "imposter",
            "journalist",
            "kidnapper",
            "luxury",
            "magician",
            "misanthrope",
            "misery",
            "neighbourhood",
            "newspaper",
            "onlooker",
            "oxygen",
            "paperweight",
            "pseudonym",
            "romantic",
            "rabbithole",
            "rotation",
            "sacrifice",
            "saxophone",
            "warrior"
        ],
        4: ["anomaly",
            "abandonment",
            "adolescent",
            "apology",
            "benefactor",
            "cold wind",
            "cuban cigar",
            "diabetic",
            "depravity",
            "dystopia",
            "edge of a knife",
            "end of the day",
            "fatality",
            "historian",
            "identity",
            "information",
            "kaleidoscope",
            "marijuana",
            "misbehaviour",
            "misconception",
            "nuclear winter",
            "observation",
            "only one left",
            "pistachio",
            "question of when",
            "retirement home",
            "shame of it all",
            "same as last time",
            "size of a fist",
            "suburbia",
            "summer night's air",
            "tranquilizer",
            "teaspoon of sugar",
            "watercolour"
        ]
    },
    ADJECTIVE: {
        1: [
            "burnt",
            "blue",
            "black",
            "bleak",
            "burst",
            "cold",
            "dead",
            "dull",
            "full",
            "flat",
            "fake",
            "gaunt",
            "grey",
            "green",
            "hurt",
            "huge",
            "lithe",
            "long",
            "main",
            "mad",
            "new",
            "near",
            "old",
            "pink",
            "pale",
            "real",
            "red",
            "rough",
            "sad",
            "scant",
            "same",
            "tall",
            "teal",
            "thin",
            "used",
            "vile",
            "wide",
            "weird"
        ],
        2: [
            "ample",
            "arid",
            "amber",
            "broken",
            "cautious",
            "chilling",
            "chronic",
            "decayed",
            "dying",
            "empty",
            "fragile",
            "frosted",
            "flailing",
            "ghostly",
            "gummy",
            "haggard",
            "hapless",
            "hazy",
            "heavy",
            "horrid",
            "icy",
            "idle",
            "little",
            "lowly",
            "lusty",
            "macabre",
            "massive",
            "measly",
            "nearby",
            "novel",
            "normal",
            "obscure",
            "painful",
            "plastic",
            "queasy",
            "rampant",
            "rigid",
            "shallow",
            "sharper",
            "turgid",
            "timeless",
            "tricky",
            "useless",
            "unspoiled",
            "valid",
            "wonky"
        ],

        3: [
            "abrasive",
            "ambient",
            "amazing",
            "beautiful",
            "billionth",
            "castrated",
            "ceramic",
            "cynical",
            "depressing",
            "decadent",
            "done over",
            "earliest",
            "ecstatic",
            "eventual",
            "flavourless",
            "groundbreaking",
            "generic",
            "heartbroken",
            "heartwarming",
            "icelandic",
            "illicit",
            "judgmental",
            "kafkaesque",
            "lacklustre",
            "laughable",
            "lebanese",
            "lethargic",
            "mad as hell",
            "majestic",
            "magical",
            "neighbouring",
            "newfangled",
            "obnoxious",
            "overwhelming",
            "obvious",
            "outlandish",
            "passionate",
            "perplexing",
            "quizzical",
            "retarded",
            "rapturous",
            "several",
            "sinister",
            "screaming",
            "wallowing",
            "yellow"
        ],
        4: [
            "ambiguous",
            "asynchronous",
            "calibrated",
            "cacophonous",
            "catatonic",
            "darwinian",
            "decentralised",
            "despicable",
            "disrespectful",
            "educated",
            "erroneous",
            "exploitative",
            "familiar",
            "fastidious",
            "fundamental",
            "godforsaken",
            "governmental",
            "hilarious",
            "identical",
            "idiotic",
            "irrational",
            "luminescent",
            "legendary",
            "mediocre",
            "malevolent",
            "masochistic",
            "nauseating",
            "nonsensical",
            "obedient",
            "petrifying",
            "particular",
            "ridiculous",
            "responsible",
            "saturated",
            "schizophrenic",
            "subordinate",
            "surmountable",
            "vulnerable"]
    },
    VERB: {
        1: [
            "asks",
            "acts",
            "bathes",
            "climbs",
            "cries",
            "claps",
            "cuts",
            "dies",
            "digs",
            "echoes",
            "fails",
            "finds",
            "frees",
            "gasps",
            "gains",
            "gives",
            "gnaws",
            "hacks",
            "hits",
            "hurts",
            "kicks",
            "kills",
            "kneels",
            "knows",
            "lives",
            "laughs",
            "lies",
            "met",
            "marks",
            "needs",
            "pays",
            "pales",
            "roars",
            "robs",
            "runs",
            "sang",
            "sings",
            "sobs",
            "screams",
            "spent",
            "spent",
            "used",
            "wept",
            "weeps"
        ],
        2: [
            "abducts",
            "acting",
            "begins",
            "climbing",
            "crying",
            "choking",
            "damning",
            "dangles",
            "edges",
            "ebbing",
            "fading",
            "frightens",
            "going",
            "growing",
            "hollers",
            "halting",
            "ignites",
            "inhales",
            "jolting",
            "killing",
            "kicking",
            "lingers",
            "mauling",
            "murmurs",
            "nurtures",
            "nearing",
            "obeys",
            "opens",
            "peeling",
            "pushes",
            "screaming",
            "scratching",
            "taunting",
            "thickens",
            "twitching"
        ],
        3: [
            "abandons",
            "accepting",
            "bewildered",
            "beckoning",
            "bullying",
            "celebrates",
            "crucifies",
            "echoing",
            "frightening",
            "generates",
            "hibernates",
            "hollering",
            "idolised",
            "maneuvers",
            "misjudges",
            "murmuring",
            "obsesses",
            "observing",
            "perseveres",
            "plummeting",
            "reacting",
            "reasoning",
            "serenades",
            "surrenders",
            "terrified",
            "torturing",
            "wallowing",
            "whispering"
        ],
        4: [
            "abandoning",
            "barricading",
            "cooperates",
            "dismembering",
            "elaborates",
            "falling over",
            "forgiving all",
            "going nowhere",
            "hesitating",
            "influences",
            "lacerated",
            "maneuvering",
            "realigning",
            "reassembled",
            "reconstructed",
            "reawakens",
            "reminisces",
            "retaliates",
            "romanticised",
            "trying to leave",
            "vandalising",
            "walking away"
        ]
    },
    ADVERB: {
        1: [
            "fast",
            "good",
            "well",
            "hard",
            "high",
            "late",
            "most",
            "near",
            "far",
            "short",
            "long",
            "low",
            "much",
            "soon",
            "once",
            "twice",
            "today"
        ],
        2: [
            "alone",
            "slowly",
            "quickly",
            "sadly",
            "furthest",
            "away",
            "coldly",
            "dearly",
            "calmly",
            "dimly",
            "fairly",
            "grimly",
            "darkly",
            "gently",
            "greatly",
            "hardly",
            "justly",
            "kindly",
            "lastly",
            "lately",
            "loudly",
            "madly",
            "mostly",
            "only",
            "poorly",
            "rarely",
            "today",
            "almost"
        ],
        3: [
            "tomorrow",
            "yesterday",
            "carefully",
            "greedily",
            "hastily",
            "quietly",
            "needlessly",
            "silently",
            "timelessly",
            "with regret",
            "anyhow",
            "already",
            "bitterly",
            "completely",
            "dreamily",
            "awkwardly",
            "exactly",
            "fervently",
            "fluently",
            "however",
            "hauntingly",
            "joylessly",
            "naughtily",
            "nowadays",
            "ruthlessly"
        ],
        4: [
            "amazingly",
            "believably",
            "beautifully",
            "desperately",
            "especially",
            "eternally",
            "furiously",
            "incessantly",
            "incorrectly",
            "magically",
            "nevertheless",
            "reluctantly",
            "repeatedly",
            "secretively"
        ]
    },
    CONJUNCTION: {
        1: [
            'and',
            'so',
            'but',
            'yet',
            'for'
        ]
    }
};
