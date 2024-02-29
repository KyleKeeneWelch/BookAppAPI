if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected to Database");
}

const Book = require("./models/book");

Book.insertMany([
  {
    isbn: 9780002005883,
    title: "Gilead",
    subTitle: "",
    authors: ["Marilynne Robinson"],
    categories: ["Fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=KQZCPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "A NOVEL THAT READERS and critics have been eagerly anticipating for over a decade, Gilead is an astonishingly imagined story of remarkable lives. John Ames is a preacher, the son of a preacher and the grandson (both maternal and paternal) of preachers. It’s 1956 in Gilead, Iowa, towards the end of the Reverend Ames’s life, and he is absorbed in recording his family’s story, a legacy for the young son he will never see grow up. Haunted by his grandfather’s presence, John tells of the rift between his grandfather and his father: the elder, an angry visionary who fought for the abolitionist cause, and his son, an ardent pacifist. He is troubled, too, by his prodigal namesake, Jack (John Ames) Boughton, his best friend’s lost son who returns to Gilead searching for forgiveness and redemption. Told in John Ames’s joyous, rambling voice that finds beauty, humour and truth in the smallest of life’s details, Gilead is a song of celebration and acceptance of the best and the worst the world has to offer. At its heart is a tale of the sacred bonds between fathers and sons, pitch-perfect in style and story, set to dazzle critics and readers alike.",
    publishedYear: 2004,
    averageRating: 3.85,
    numPages: 247,
    createdAt: Date.now(),
  },
  {
    isbn: 9780002261982,
    title: "Spider's Web",
    subTitle: "A Novel",
    authors: ["Charles Osborne", "Agatha Christie"],
    categories: ["Detective and mystery stories"],
    thumbnail:
      "http://books.google.com/books/content?id=gA5GPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "A new 'Christie for Christmas' -- a full-length novel adapted from her acclaimed play by Charles Osborne Following BLACK COFFEE and THE UNEXPECTED GUEST comes the final Agatha Christie play novelisation, bringing her superb storytelling to a new legion of fans. Clarissa, the wife of a Foreign Office diplomat, is given to daydreaming. 'Supposing I were to come down one morning and find a dead body in the library, what should I do?' she muses. Clarissa has her chance to find out when she discovers a body in the drawing-room of her house in Kent. Desperate to dispose of the body before her husband comes home with an important foreign politician, Clarissa persuades her three house guests to become accessories and accomplices. It seems that the murdered man was not unknown to certain members of the house party (but which ones?), and the search begins for the murderer and the motive, while at the same time trying to persuade a police inspector that there has been no murder at all... SPIDER'S WEB was written in 1954 specifically for Margaret Lockwood and opened first at the Theatre Royal Nottingham before moving to the Savoy Theatre in London on 14 December 1954. With THE MOUSETRAP and WI",
    publishedYear: 2000,
    averageRating: 3.83,
    numPages: 241,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006163831,
    title: "The One Tree",
    subTitle: "",
    authors: ["Stephen R. Donaldson"],
    categories: ["American fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=OmQawwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "Volume Two of Stephen Donaldson's acclaimed second trilogy featuing the compelling anti-hero Thomas Covenant.",
    publishedYear: 1982,
    averageRating: 3.97,
    numPages: 479,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006178736,
    title: "Rage of angels",
    subTitle: "",
    authors: ["Sidney Sheldon"],
    categories: ["Fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=FKo2TgANz74C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "A memorable, mesmerizing heroine Jennifer -- brilliant, beautiful, an attorney on the way up until the Mafia's schemes win her the hatred of an implacable enemy -- and a love more destructive than hate. A dangerous, dramatic world The Dark Arena of organized crime and flashbulb lit courtrooms where ambitious prosecutors begin their climb to political power.",
    publishedYear: 1993,
    averageRating: 3.93,
    numPages: 512,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006280897,
    title: "The Four Loves",
    subTitle: "",
    authors: ["Clive Staples Lewis"],
    categories: ["Christian life"],
    thumbnail:
      "http://books.google.com/books/content?id=XhQ5XsFcpGIC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "Lewis' work on the nature of love divides love into four categories; Affection, Friendship, Eros and Charity. The first three come naturally to humanity. Charity, however, the Gift-love of God, is divine, and without this supernatural love, the natural loves become distorted and even dangerous.",
    publishedYear: 2002,
    averageRating: 4.15,
    numPages: 170,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006280934,
    title: "The Problem of Pain",
    subTitle: "",
    authors: ["Clive Staples Lewis"],
    categories: ["Christian life"],
    thumbnail:
      "http://books.google.com/books/content?id=Kk-uVe5QK-gC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "In The Problem of Pain, C.S. Lewis, one of the most renowned Christian authors and thinkers, examines a universally applicable question within the human condition: If God is good and all-powerful, why does he allow his creatures to suffer pain? With his signature wealth of compassion and insight, C.S. Lewis offers answers to these crucial questions and shares his hope and wisdom to help heal a world hungering for a true understanding of human nature.",
    publishedYear: 2002,
    averageRating: 4.09,
    numPages: 176,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006353287,
    title: "An Autobiography",
    subTitle: "",
    authors: ["Agatha Christie"],
    categories: ["Authors", "English"],
    thumbnail:
      "http://books.google.com/books/content?id=c49GQwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description: "",
    publishedYear: 1977,
    averageRating: 4.27,
    numPages: 560,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006380832,
    title: "Empires of the Monsoon",
    subTitle: "A History of the Indian Ocean and Its Invaders",
    authors: ["Richard Hall"],
    categories: ["Africa", "East"],
    thumbnail:
      "http://books.google.com/books/content?id=MuPEQgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "Until Vasco da Gama discovered the sea-route to the East in 1497-9 almost nothing was known in the West of the exotic cultures and wealth of the Indian Ocean and its peoples. It is this civilization and its destruction at the hands of the West that Richard Hall recreates in this book. Hall's history of the exploration and exploitation by Chinese and Arab travellers, and by the Portuguese, Dutch and British alike is one of brutality, betrayal and colonial ambition.",
    publishedYear: 1998,
    averageRating: 4.41,
    numPages: 608,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006470229,
    title: "The Gap Into Madness",
    subTitle: "Chaos and Order",
    authors: ["Stephen R. Donaldson"],
    categories: ["Hyland", "Fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=4oXavLNDWocC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "A new-cover reissue of the fourth book in the bestselling five-volume sf series created by the world-famous author of the Thomas Covenant chronicles -- and acclaimed as the 'best work of his career'. Events were not moving as the Amnion had intended. Once again humans had been false in their dealings with the aliens. As the planetoid Thanatos Minor exploded into atoms, the Trumpet hurtled into space only one step ahead of hostile pursuers. On board were Morn Hyland and her force-grown son Davies, cyborg Angus Thermopyle and Captain Nick Succorso -- old enemies thrown together in a desperate bid for survival. For both the Amnion and the UMCP, the immediate capture of the fleeing ship and the secrets it contained was imperative. But for Trumpet's exhausted crew the only hope lay in an illegal lab in the distant binary solar system of Valdor Industrial. It would be a journey of unpredictable danger -- from which not all would return...",
    publishedYear: 1994,
    averageRating: 4.15,
    numPages: 743,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006472612,
    title: "Master of the Game",
    subTitle: "",
    authors: ["Sidney Sheldon"],
    categories: ["Adventure stories"],
    thumbnail:
      "http://books.google.com/books/content?id=TkTYp-Tp6_IC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "Kate Blackwell is an enigma and one of the most powerful women in the world. But at her ninetieth birthday celebrations there are ghosts of absent friends and absent enemies.",
    publishedYear: 1982,
    averageRating: 4.11,
    numPages: 489,
    createdAt: Date.now(),
  },
]);

// 10

Book.insertMany([
  {
    isbn: 9780006479673,
    title: "If Tomorrow Comes",
    subTitle: "",
    authors: ["Sidney Sheldon"],
    categories: ["Adventure stories"],
    thumbnail:
      "http://books.google.com/books/content?id=l2tBi_jLuk8C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "One of Sidney Sheldon's most popular and bestselling titles, repackaged and reissued for a new generation of fans.",
    publishedYear: 1994,
    averageRating: 4.04,
    numPages: 501,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006480099,
    title: "Assassin's Apprentice",
    subTitle: "",
    authors: ["Robin Hobb"],
    categories: ["American fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=qTaGQgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description: "",
    publishedYear: 1996,
    averageRating: 4.15,
    numPages: 460,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006482079,
    title: "Warhost of Vastmark",
    subTitle: "",
    authors: ["Janny Wurts"],
    categories: ["Fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=uOL0fpS9WZkC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "Tricked once more by his wily half-brother, Lysaer, Lord of Light, arrives at the tiny harbor town of Merior to find that Arithon's ship yards have been abandoned and meticulously destroyed, and that the Master of Shadow has disappeared as if into thin air. Meanwhile Arithon and the Mad Prophet Dakar are traveling on foot through the treacherous Kelhorn Mountains towards the Vastmark clans, there to raise further support for his cause. But raising a warhost is a costly business. Is it mere coincidence that Princess Talith—Lysaer's beautiful, headstrong wife—is taken captive and held for a vast ransom by a master brigand? The forces of light and shadow circle and feint, drawing ever closer to a huge conflict. And in the background the Fellowship of Seven Sorcerers and the Koriani Enchantresses watch and plan, and wait.",
    publishedYear: 1995,
    averageRating: 4.03,
    numPages: 522,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006483014,
    title: "The Once and Future King",
    subTitle: "",
    authors: ["Terence Hanbury White"],
    categories: ["Arthurian romances"],
    thumbnail:
      "http://books.google.com/books/content?id=Jx6BvgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description: `An omnibus volume of the author's complete story of the Arthurian epic which includes: ""The sword in the stone"" (1939), ""The witch in the wood"" (1939), ""The ill-made knight"" (1940), ""The candle in the wind"" (published for the first time), and ""The book of Merlyn.`,
    publishedYear: 1996,
    averageRating: 4.04,
    numPages: 823,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006483892,
    title: "Murder in LaMut",
    subTitle: "",
    authors: ["Raymond E. Feist", "Joel Rosenberg"],
    categories: ["Adventure stories"],
    thumbnail:
      "http://books.google.com/books/content?id=I2jbBlMHlAMC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description: `Available in the U.S. for the first time, this is the second volume in the exceptional Legends of the Riftwar series from ""New York Times""-bestselling authors Feist and Rosenberg.`,
    publishedYear: 2003,
    averageRating: 3.7,
    numPages: 337,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006483908,
    title: "Jimmy the Hand",
    subTitle: "",
    authors: ["Raymond E. Feist", "S. M. Stirling"],
    categories: ["Fantasy fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=hV4-oITYFN8C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description: `Jimmy the Hand, boy thief of Krondor, lived in the shadows of the city. Though gifted beyond his peers, Jimmy is merely a pickpocket with potential--until he aids Prince Arutha in the rescue of Princess Anita from Duke Guy du Bas-Tyra, and runs afoul of ""Black Guy's"" secret police. Facing a choice between disappearing on his own or in a weighted barrel at the bottom of Krondor's harbor, Jimmy chooses the former. Forced to flee the only home he's ever known, Jimmy finds himself among the unsuspecting rural villagers of Land's End, where he hopes to prosper with his talents for con and thievery. But Land's End is home to many who tread the crooked path--and to a dark, dangerous presence even the local smugglers don't recognize. And suddenly Jimmy's youthful bravado and courage are leading him into the maw of chaos . . . and, quite possibly, to his doom.`,
    publishedYear: 2003,
    averageRating: 3.95,
    numPages: 368,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006486145,
    title: "Well of Darkness",
    subTitle: "",
    authors: ["Margaret Weis", "Tracy Hickman"],
    categories: ["Fantasy Fiction", "High Fantasy"],
    thumbnail:
      "http://books.google.com/books/content?id=XrwaAAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "Gareth is just a frightened young lad when he is drafted in to be the whipping-boy for the unruly Prince Dagnarus. Yet as they grow to be men, an unshakable bond is formed. And it is their destiny for them to become the two most powerful - and feared - men in the kingdom. But when Dagnarus decides to become a knight himself, he begins a chain of evil events that threaten to destroy the entire kingdom. Only by uniting the Sovereign Stone can peace be restored, and it is up to Dagnarus' brother Helmos to try to achieve this impossible task, using his father's soldiers against his brother's army. All the while, Gareth is gaining mastery over the sinister Void magic, and he is devoted to helping his childhood companion.. This gripping story of magical power and corruption takes the unique viewpoint of focusing on the evil characters, as we follow them from boys to men. Filled with action, suspense and wonderfully imaginative characters, Water From the Well of Darkness is set to elevate the careers of bestselling authors Weis & Hickman to spectacular new heights.",
    publishedYear: 2001,
    averageRating: 3.66,
    numPages: 599,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006490456,
    title: "Witness for the Prosecution & Selected Plays",
    subTitle: "",
    authors: ["Agatha Christie"],
    categories: ["English drama"],
    thumbnail:
      "http://books.google.com/books/content?id=_9u7AAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "Newly-Jacketed Edition Designed To Celebrate The 50Th Anniversary Of Christie S Faultlessly Plotted Witness For The Prosecution And Other Outstanding Plays. The Perfect Complement To The Latest Edition Of The Mousetrap And Selected Plays (50Th Aniversary Edition). Headlining This Book Is Witness For The Prosecution Christie S Highly Successful Stage Play Which Won The New York Drama Critics Circle Award For Best Foreign Play. A Stunning Courtroom Drama, It Tells The Story Of A Scheming Wife Testifying Against Her Husband In A Shocking Murder Trial. The Wild Beauty Of A Seaside House Perched High On The Devonshire River Tern Provides A Stunning Back-Drop In Towards Zero As A Psychopathic Murderer Homes In On The Unsuspecting Victims. Passion, Murder And Love Are The Deadly Ingredients In Verdict, Making It One Of Christie S More Unusual Thrillers And Prompting Her To Label It The Best Play I Have Written With The Exception Of Witness For The Prosecution . Go Back For Murder Tells The Story Of The Young And Feisty Carla Who, Orphaned At The Tender Age Of Five, Discovers Her Mother Was Imprisioned For Murdering Her Father And Determines To Prove Her Innocence.",
    publishedYear: 1995,
    averageRating: 4.05,
    numPages: 352,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006496434,
    title: "The Little House",
    subTitle: "",
    authors: ["Philippa Gregory"],
    categories: ["Country life"],
    thumbnail:
      "http://books.google.com/books/content?id=rbvUPps9vKsC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "It was easy for Elizabeth. She married the man she loved. It was harder for Ruth. She married Elizabeth's son and then found that, somehow, she could never quite measure up. This thriller examines what women want and what they fear, as Ruth confronts the shifting borders of her own sanity.",
    publishedYear: 1998,
    averageRating: 3.66,
    numPages: 368,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006496878,
    title: "Mystical Paths",
    subTitle: "",
    authors: ["Susan Howatch"],
    categories: ["English fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=by4ytBy63o0C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "1968 finds Nicholas Darrow wrestling with personal problems. How can he marry Rosalind when he is unable to avoid promiscuity? How can he become a priest when he finds it so difficult to live as one? And can he break his dangerous dependence on his father?",
    publishedYear: 1996,
    averageRating: 4.23,
    numPages: 576,
    createdAt: Date.now(),
  },
]);

// 20

Book.insertMany([
  {
    isbn: 9780006496892,
    title: "Glittering Images",
    subTitle: "",
    authors: ["Susan Howatch"],
    categories: ["English fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=rDHbn0ORKhQC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "1968 finds Nicholas Darrow wrestling with personal problems. How can he marry Rosalind when he is unable to avoid promiscuity? How can he become a priest when he finds it so difficult to live as one? And can he break his dangerous dependence on his father?",
    publishedYear: 1996,
    averageRating: 4.23,
    numPages: 576,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006496892,
    title: "Glittering Images",
    subTitle: "",
    authors: ["Susan Howatch"],
    categories: ["English fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=rDHbn0ORKhQC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "It is 1937, and Charles Ashworth, a Canon to the Archbishop of Canterbury, is sent to untangle a web of self-delusion and corruption at the episcopal palace of the charismatic Bishop of Starbridge.",
    publishedYear: 1996,
    averageRating: 4.07,
    numPages: 512,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006496922,
    title: "Glamorous Powers",
    subTitle: "",
    authors: ["Susan Howatch"],
    categories: ["Clergy"],
    thumbnail:
      "http://books.google.com/books/content?id=_bhPYWs6RrYC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "Reissue of the author's most famous and well-loved work, the Starbridge series, six self-contained yet interconnected novels that explore the history of the Church of England through the 20th century.",
    publishedYear: 1996,
    averageRating: 4.2,
    numPages: 512,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006498865,
    title: "The Mad Ship",
    subTitle: "",
    authors: ["Robin Hobb"],
    categories: ["Fantasy fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=2iWezkfdBE8C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "Fantasy master Robin Hobb delivers the stunning second volume of her Liveship Traders trilogy, returning to the timeless city of Bingtown, where pirates now plague the coasts and the dreaded slave trade flourishes. Althea Vestrit doesnt have time to be afraid, for her familys newly awakened Liveship, Vivacia, has been seized by the ruthless pirate Kennit. So Althea hatches a bold plan. But to carry it out, she must recruit a Liveship that has already slain two crews -- and is said to be insane.",
    publishedYear: 2000,
    averageRating: 4.24,
    numPages: 906,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006499169,
    title: "Post Captain",
    subTitle: "",
    authors: ["Patrick O'Brian"],
    categories: ["Fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=S761k-z51Q4C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "This tale begins with Jack Aubrey arriving home from his exploits in the Mediterranean to find England at peace following the Treaty of Amiens. He and his friend Stephen Maturin, surgeon and secret agent, begin to live the lives of country gentlemen, hunting, entertaining and enjoying more amorous adventures. Their comfortable existence, however, is cut short when Jack is overnight reduced to a pauper with enough debts to keep him in prison for life. He flees to the continent to seek refuge: instead he finds himself a hunted fugitive as Napoleon has ordered the internment of all Englishmen in France. Aubrey's adventures in escaping from France and the debtors' prison will grip the reader as fast as his unequalled actions at sea.",
    publishedYear: 1996,
    averageRating: 4.29,
    numPages: 474,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006499268,
    title: "The Reverse of the Medal",
    subTitle: "",
    authors: ["Patrick O'Brian"],
    categories: ["Adventure stories"],
    thumbnail:
      "http://books.google.com/books/content?id=YtjxFRb39Z4C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "In this book, Jack Aubrey returns from his duties protecting whalers off the South American coast and is persuaded by a casual acquaintance to make investments in the City on the strength of supposedly certain information. From there he is led into the half-worlds of the London criminal underground and of government espionage - the province of his friend, Stephen Maturin.",
    publishedYear: 1997,
    averageRating: 4.41,
    numPages: 261,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006499626,
    title: "Miss Marple",
    subTitle: "The Complete Short Stories",
    authors: ["Agatha Christie"],
    categories: ["Detective and mystery stories", "English"],
    thumbnail:
      "http://books.google.com/books/content?id=a96qPwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "Miss Marple featured in 20 short stories, published in a number of different collections in Britain and America. Presented here in their order of publication, Miss Marple uses her unique insight to deduce the truth about a series of unsolved crimes.",
    publishedYear: 1997,
    averageRating: 4.2,
    numPages: 359,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006511489,
    title: "The Years of Rice and Salt",
    subTitle: "",
    authors: ["Kim Stanley Robinson"],
    categories: ["Black Death"],
    thumbnail:
      "http://books.google.com/books/content?id=I38CFD1RnmsC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description: `Hailed by ""The New York Times Book Review"" as ""eye-opening, "" this alternative history of the last 600 years begins as the Black Death kills nearly everyone in Europe, and China, India, and the nations of Islam now control the world.`,
    publishedYear: 2003,
    averageRating: 3.73,
    numPages: 772,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006512677,
    title: "Spares",
    subTitle: "",
    authors: ["Michael Marshall Smith"],
    categories: ["Human cloning"],
    thumbnail:
      "http://books.google.com/books/content?id=83RrAdP9y5UC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "Spares - human clones, the ultimate health insurance. An eye for an eye - but some people are doing all the taking. The story of Jack Randall: burnt-out, dropped out, and way overdrawn at the luck bank. But as caretaker on a Spares Farm, he still has a choice, and it might make a difference.",
    publishedYear: 1998,
    averageRating: 4.13,
    numPages: 317,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006513087,
    title: "Gravity",
    subTitle: "",
    authors: ["Tess Gerritsen"],
    categories: ["Science fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=KI66cH39n6sC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "Emma Watson a research physician has been training for the mission of a lifetime: to study living organisms in the microgravity of space. But the true and lethal nature of the experiment has not been revealed to NASA and once aboard the space station things start to go wrong. A culture of single-celled Archaeons, gathered from the deep sea, begin to rapidly multiply and infect the crew - with deadly and agonising results. As her estranged husband and ground crew at NASA work against the clock to launch a rescue Emma stuggles to contain the lethal microbe. But with the contagion threatening Earth's population, there are those who would leave the astronauts stranded in orbit, quarantined aboard the station.",
    publishedYear: 2004,
    averageRating: 4.04,
    numPages: 342,
    createdAt: Date.now(),
  },
]);

// 30

Book.insertMany([
  {
    isbn: 9780006514640,
    title: "The Wise Woman",
    subTitle: "",
    authors: ["Philippa Gregory"],
    categories: ["Great Britain"],
    thumbnail:
      "http://books.google.com/books/content?id=BEr9wAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "Alone and vulnerable, Alys joins a nunnery in an attempt to escape poverty but finds herself thrown back into the outside world when Henry VIII's wreckers destroy her sanctuary. With nothing but her looks, her magic and her own instinctive cunning, Alys has to tread a perilous path between the faith of her childhood and her own female power. When she falls in love with Hugo, the feudal lord and another woman's husband, she dips into witchcraft to defeat her rival and to win her lover, only to find that magic makes a poor servant but a dominant master. Since heresy against the new church means the stake, and witchcraft the rope, Alys's danger is mortal. A woman's powers are not longer safe to use...",
    publishedYear: 2002,
    averageRating: 3.31,
    numPages: 640,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006514855,
    title: "Girls' Night in",
    subTitle: "",
    authors: ["Jessica Adams", "Chris Manby", "Fiona Walker"],
    categories: ["American fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=xLwHHQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "'Girls' Night In' features stories about growing up, growing out of, moving out, moving on, falling apart and getting it all together. So turn off your cell phone and curl up on the couch: this is one 'Girls' Night In' you won't want to miss.",
    publishedYear: 2000,
    averageRating: 3.26,
    numPages: 586,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006545866,
    title: "The White Album",
    subTitle: "",
    authors: ["Joan Didion"],
    categories: ["American essays"],
    thumbnail:
      "http://books.google.com/books/content?id=qauOPwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "This collection of essays recounts what took place on the long morning after the 1960s, when everyone was coming down from their particular bad trip. Didion observes the dramas that explode as America goes into collective detox: the mother abandoning her five-year-old daughter on the central reservation of Interstate 5; Huey Newton and the Black Panthers preaching from their cells; students, in unconscious parody, simulating the disaffection of the 1960s.",
    publishedYear: 1993,
    averageRating: 4.17,
    numPages: 224,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006550433,
    title: "The Bonesetter's Daughter",
    subTitle: "",
    authors: ["Amy Tan"],
    categories: ["China"],
    thumbnail:
      "http://books.google.com/books/content?id=4KHT6mIMDt4C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "Tells the story of three generations of Chinese women, beginning at the turn of the century.",
    publishedYear: 2001,
    averageRating: 3.98,
    numPages: 352,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006551393,
    title: "The Lexus and the Olive Tree",
    subTitle: "",
    authors: ["Thomas L. Friedman"],
    categories: ["Capitalism"],
    thumbnail:
      "http://books.google.com/books/content?id=u8zxpq6o7HYC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "Half of this new, post-Cold War world is intent on building a better Lexus, on streamlining their societies and economies for the global marketplace, while the other half is locked in elemental struggles over who owns which olive tree, which strip of land.",
    publishedYear: 2000,
    averageRating: 3.59,
    numPages: 352,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006551812,
    title: "'Tis",
    subTitle: "A Memoir",
    authors: ["Frank McCourt"],
    categories: ["Ireland"],
    thumbnail:
      "http://books.google.com/books/content?id=Q3BhQgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description: `FROM THE PULIZER PRIZE-WINNING AUTHOR OF THE #1 ""NEW YORK TIMES"" BESTSELLER ""ANGELA'S ASHES"" Frank McCourt's glorious childhood memoir, ""Angela's Ashes, "" has been loved and celebrated by readers everywhere. It won the National Book Critics Circle Award, the ""Los Angeles Times"" Book Award and the Pulitzer Prize. Rarely has a book so swiftly found its place on the literary landscape. And now we have ""'Tis, "" the story of Frank's American journey from impoverished immigrant to brilliant teacher and raconteur. Frank lands in New York at age nineteen and gets a job at the Biltmore Hotel, where he immediately encounters the vivid hierarchies of this ""classless country,"" and then is drafted into the army and is sent to Germany to train dogs and type reports. It is Frank's incomparable voice that renders these experiences spellbinding. When Frank returns to America in 1953, he works on the docks, always resisting what everyone tells him. He knows that he should be getting an education, and though he left school at fourteen, he talks his way into New York University. There, he falls in love with the quintessential Yankee and tries to live his dream. But it is not until he starts to teach that Frank finds his place in the world.`,
    publishedYear: 2000,
    averageRating: 3.68,
    numPages: 495,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006646006,
    title: "Ocean Star Express",
    subTitle: "",
    authors: ["Mark Haddon", "Peter Sutton"],
    categories: ["Juvenile Fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=I2QZAAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "Joe and his parents are enjoying a summer holiday by the sea at the Ocean Star Hotel. The sky is bright blue, the sun shines and Joe loves all that the seaside has to offer. But when the fog rolls in and rain falls Joe begins to wish that he was back at home again. Things change, however, when the owner of the hotel invites Joe to share in a magical world, only a few steps away. The loft is black as night but then above Joe's head a thousand tiny stars begin to sparkle and in the distance he hears the chug-chug-chug of a model train. A whole world is soon to open up before Joe's eyes, a world of snow-capped mountains, great deserts, and rocking fishing boats.",
    publishedYear: 2002,
    averageRating: 3.5,
    numPages: 32,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006754893,
    title: "A Small Pinch of Weather",
    subTitle: "And Other Stories",
    authors: ["Joan Aiken"],
    categories: ["Children's stories", "English"],
    thumbnail:
      "http://books.google.com/books/content?id=QiFhOBpYZoYC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "A magical and fantastic collection of early stories by one of the most original children's authors of the 20th century. For 8-11 year olds.",
    publishedYear: 2000,
    averageRating: 4.27,
    numPages: 239,
    createdAt: Date.now(),
  },
  {
    isbn: 9780006906018,
    title: "The Princess of the Chalet School",
    subTitle: "",
    authors: ["Elinor Mary Brent-Dyer"],
    categories: ["Juvenile Fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=EJcQPwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description: "",
    publishedYear: 2000,
    averageRating: 4.1,
    numPages: 159,
    createdAt: Date.now(),
  },
  {
    isbn: 9780007103676,
    title: "Koko",
    subTitle: "",
    authors: ["Peter Straub"],
    categories: ["Male friendship"],
    thumbnail:
      "http://books.google.com/books/content?id=QV_XQKj4OMkC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "Koko is Peter Straub's foray into the psychological horror of the Vietnam War.",
    publishedYear: 2001,
    averageRating: 3.56,
    numPages: 634,
    createdAt: Date.now(),
  },
]);

// 40

Book.insertMany([
  {
    isbn: 9780007105045,
    title: "Tree and Leaf",
    subTitle: "The Homecoming of Beorhtnoth : Beorhthelm's Son",
    authors: ["John Ronald Reuel Tolkien"],
    categories: ["Literary Collections"],
    thumbnail:
      "http://books.google.com/books/content?id=aPb_AAIcwZ0C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "The two works 'On fairy-stories' and 'Leaf by Niggle' were first brought together to form the book 'Tree and leaf' in 1964. In this new edition a third element is added: the poem Mythopoeia, the making of myths...",
    publishedYear: 2001,
    averageRating: 4.09,
    numPages: 176,
    createdAt: Date.now(),
  },
  {
    isbn: 9780007111503,
    title: "Partners in Crime",
    subTitle: "",
    authors: ["Agatha Christie"],
    categories: ["Fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=L0bfy0zgkegC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "The Famous Volume Of Tommy & Tuppence Linked Short Stories, Reissued In A New Look To Coincide With The Brand New Series Of Tommy & Tuppence Bbc Movies. Tommy And Tuppence Beresford Were Restless For Adventure, So When They Were Asked To Take Over Blunt S International Detective Agency, They Leapt At The Chance. After Their Triumphant Recovery Of A Pink Pearl, Intriguing Cases Kept On Coming Their Way: A Stabbing On Sunningdale Golf Course; Cryptic Messages In The Personal Columns Of Newspapers; And Even A Box Of Poisoned Chocolates.",
    publishedYear: 2001,
    averageRating: 3.77,
    numPages: 347,
    createdAt: Date.now(),
  },
  {
    isbn: 9780007113804,
    title: "Murder in Mesopotamia",
    subTitle: "",
    authors: ["Agatha Christie"],
    categories: ["Detective and mystery stories"],
    thumbnail:
      "http://books.google.com/books/content?id=oFkbc7BbYN0C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "An archaeologist's wife is murdered on the shores of the River Tigris in Iraq... It was clear to Amy Leatheran that something sinister was going on at the Hassanieh dig in Iraq; something associated with the presence of 'Lovely Louise', wife of celebrated archaeologist Dr Leidner. In a few days' time Hercule Poirot was due to drop in at the excavation site. But with Louise suffering from terrifying hallucinations, and tension within the group becoming almost unbearable, Poirot might just be too late...",
    publishedYear: 2001,
    averageRating: 3.89,
    numPages: 264,
    createdAt: Date.now(),
  },
  {
    isbn: 9780007116263,
    title: "The Lord of the Rings, the Return of the King",
    subTitle: "Visual Companion",
    authors: ["Jude Fisher"],
    categories: ["Imaginary wars and battles"],
    thumbnail:
      "http://books.google.com/books/content?id=kNBnQgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "A visual guide to the third in the Lord of the Rings movie trilogy. A large-format, full-colour guide to the characters, places, landscapes, artefacts, battles, and costumes as seen in the film, it features images, informative text and specially commissioned extras.",
    publishedYear: 2003,
    averageRating: 4.59,
    numPages: 72,
    createdAt: Date.now(),
  },
  {
    isbn: 9780007117536,
    title: "All Families are Psychotic",
    subTitle: "",
    authors: ["Douglas Coupland"],
    categories: ["Dysfunctional families"],
    thumbnail:
      "http://books.google.com/books/content?id=jYBsNp6NPVoC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "On the eve of the next Space Shuttle mission, a divided family comes together... Warm, witty and wise, All Families Are Psychotic is Coupland at the very top of his form: 'Irresistibly hilarious, unique and wonderful' Independent on Sunday In a cheap motel an hour from Cape Canaveral, Janet Drummond takes her medication, and does a rapid tally of the whereabouts of her children. Wade has spent the night in jail; suicidal Bryan is due to arrive at any moment with his vowel-free girlfriend, Shw; and then there is Sarah, 'a bolt of lightning frozen in midflash' -- here in Orlando to be the star of Friday's shuttle mission. With Janet's ex-husband and his trophy wife also in town, Janet spends a moment contemplating her family, and where it all went wrong. Or did it?",
    publishedYear: 2002,
    averageRating: 3.69,
    numPages: 279,
    createdAt: Date.now(),
  },
  {
    isbn: 9780007119332,
    title: "Death in the Clouds",
    subTitle: "",
    authors: ["Agatha Christie"],
    categories: ["Detective and mystery stories"],
    thumbnail:
      "http://books.google.com/books/content?id=M8iyckq4GQ0C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "A woman is killed by a poisoned dart in the enclosed confines of a commercial passenger plane... From seat No.9, Hercule Poirot was ideally placed to observe his fellow air passengers. Over to his right sat a pretty young woman, clearly infatuated with the man opposite; ahead, in seat No.13, sat a Countess with a poorly-concealed cocaine habit; across the gangway in seat No.8, a detective writer was being troubled by an aggressive wasp. What Poirot did not yet realize was that behind him, in seat No.2, sat the slumped, lifeless body of a woman.",
    publishedYear: 2001,
    averageRating: 3.8,
    numPages: 333,
    createdAt: Date.now(),
  },
  {
    isbn: 9780007119356,
    title: "Appointment with Death",
    subTitle: "",
    authors: ["Agatha Christie"],
    categories: ["Detective and mystery stories"],
    thumbnail:
      "http://books.google.com/books/content?id=lSYwsRkcw4YC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "A repugnant Amercian widow is killed during a trip to Petra... Among the towering red cliffs of Petra, like some monstrous swollen Buddha, sat the corpse of Mrs Boynton. A tiny puncture mark on her wrist was the only sign of the fatal injection that had killed her. With only 24 hours available to solve the mystery, Hercule Poirot recalled a chance remark he'd overheard back in Jerusalem: 'You see, don't you, that she's got to be killed?' Mrs Boynton was, indeed, the most detestable woman he'd ever met...",
    publishedYear: 2001,
    averageRating: 3.86,
    numPages: 303,
    createdAt: Date.now(),
  },
  {
    isbn: 9780007120680,
    title: "Hallowe'en Party",
    subTitle: "",
    authors: ["Agatha Christie"],
    categories: ["Poirot", "Fiction"],
    thumbnail:
      "http://books.google.com/books/content?id=Qlx98EGK_jMC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "No one believes a little girl when she insists that she has witnessed a murder until she herself turns up drowned, and Hercule Poirot sets out to catch the killer.",
    publishedYear: 2001,
    averageRating: 3.66,
    numPages: 336,
    createdAt: Date.now(),
  },
  {
    isbn: 9780007120697,
    title: "Hercule Poirot's Christmas",
    subTitle: "",
    authors: ["Agatha Christie"],
    categories: ["Christmas stories"],
    thumbnail:
      "http://books.google.com/books/content?id=EA0j4Jzn4vAC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "On the night before Christmas, cruel, tyrannical, filthy-rich Simeon Lee is found in his locked bedroom with his throat cut. Now Hercule Poirot must put his deductive powers to the test to solve one of his most chilling cases--and to prevent a clever killer from spilling more blood.",
    publishedYear: 2001,
    averageRating: 3.93,
    numPages: 335,
    createdAt: Date.now(),
  },
  {
    isbn: 9780007120819,
    title: "The Big Four",
    subTitle: "",
    authors: ["Agatha Christie"],
    categories: ["Detective and mystery stories"],
    thumbnail:
      "http://books.google.com/books/content?id=wcOQUSWQEdUC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description:
      "A ruthless international cartel seeks world domination... Framed in the doorway of Poirot's bedroom stood an uninvited guest, coated from head to foot in dust. The man's gaunt face stared for a moment, then he swayed and fell. Who was he? Was he suffering from shock or just exhaustion? Above all, what was the significance of the figure 4, scribbled over and over again on a sheet of paper? Poirot finds himself plunged into a world of international intrigue, risking his life to uncover the truth about 'Number Four'.",
    publishedYear: 2002,
    averageRating: 3.59,
    numPages: 272,
    createdAt: Date.now(),
  },
]);
