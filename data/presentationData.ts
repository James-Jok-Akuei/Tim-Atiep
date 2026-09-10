/**
 * Single source of content for the TIM ATIEP launch presentation.
 *
 * Guest names and roles come from the official invitation flyer
 * (public/images/speakers/img13.jpeg); author details from the book's back
 * cover (public/images/books/tiem-atiep/IMG_4994.JPG); poems, praise and
 * foreword from the book as supplied by the author.
 */

// ─── Types ────────────────────────────────────────────────────────────────

export type SpeakerRole =
  | "moderator"
  | "author"
  | "speaker"
  | "keynote"
  | "guest-of-honour"
  | "chief-guest"
  | "performer";

export const SPEAKER_ROLE_LABEL: Record<SpeakerRole, string> = {
  moderator: "Moderator",
  author: "The Author",
  speaker: "Speaker",
  keynote: "Keynote Speaker",
  "guest-of-honour": "Guest of Honour",
  "chief-guest": "Chief Guest",
  performer: "Performance",
};

export interface Speaker {
  id: string;
  name: string;
  role: SpeakerRole;
  avatar: string;
  /** CSS object-position for the portrait crop, e.g. "center 25%". */
  avatarPosition?: string;
  title?: string;
  affiliation?: string;
  speechTopic?: string;
  /** Short line on how this person is a "Tree of Shade" — shown on stage. */
  tribute?: string;
  /** Two-sentence profile for the stage card and attendee guide. */
  bio?: string;
  isPlaceholder?: boolean;
}

export interface Price {
  usd: number;
  ssp: number;
}

export interface Stockist {
  name: string;
  location: string;
  phone: string;
  /** Pre-formatted for display, e.g. "+211 929 996 503". */
  phoneDisplay: string;
  whatsapp: string;
}

export interface Book {
  title: string;
  subtitle: string;
  fullTitle: string;
  author: string;
  publisher: string;
  genre: string;
  language: string;
  cover: string;
  /** From the launch invitation. */
  tagline: string;
  description: string;
  themes: string[];
  price: Price;
  purchaseLink: string;
  stockist: Stockist;
}

export interface Honour {
  title: string;
  by?: string;
  year: string;
}

export interface Author {
  name: string;
  portrait: string;
  portraitAlt: string;
  portraitPosition?: string;
  summary: string;
  bio: string[];
  honours: Honour[];
  featuredIn: string[];
}

export interface AuthorBook {
  id: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  image: string;
  imageAlt: string;
  /** Extra photos of the book, used in the attendee guide. */
  photos?: string[];
  badge?: string;
}

export type MilestoneIcon = "tree" | "graduation" | "users" | "award" | "trophy" | "feather" | "book";

export interface Milestone {
  id: string;
  title: string;
  place: string;
  period?: string;
  description: string;
  icon: MilestoneIcon;
}

export interface Poem {
  id: string;
  title: string;
  /** Stanzas of lines — kept separate so the reader view can pace them. */
  stanzas: string[][];
  /** Slowly zooming backdrop behind the verse. */
  image?: string;
  isPlaceholder?: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

/** A quotation shown on stage: optional context, then the line to show large. */
export interface BookQuote {
  eyebrow: string;
  lead?: string;
  highlight: string;
  author: string;
  role: string;
}

/** Foreword text: prose paragraphs, with quoted verse kept line by line. */
export type ForewordBlock = string | { verse: string[] };

export interface Foreword {
  author: string;
  role: string;
  blocks: ForewordBlock[];
  /** The passage lifted onto the stage slide. */
  excerpt: BookQuote;
}

export interface EventInfo {
  name: string;
  venue: string;
  city: string;
  /** ISO 8601 with Juba offset (CAT, UTC+2). */
  startsAt: string;
  endsAt: string;
  timezone: string;
}

export interface PresentationData {
  event: EventInfo;
  book: Book;
  author: Author;
  authorBooks: AuthorBook[];
  speakers: Speaker[];
  milestones: Milestone[];
  endorsement: BookQuote;
  foreword: Foreword;
  poems: Poem[];
  gallery: GalleryImage[];
}

// ─── Event ────────────────────────────────────────────────────────────────

export const event: EventInfo = {
  name: "Official Book Launch",
  venue: "Unipod Hall, University of Juba",
  city: "Juba, South Sudan",
  startsAt: "2026-09-12T14:00:00+02:00",
  endsAt: "2026-09-12T17:00:00+02:00",
  timezone: "Africa/Juba",
};

// ─── Invitation (the official flyer) ─────────────────────────────────────

export const invitation = {
  image: "/images/speakers/img13.jpeg",
  width: 1280,
  height: 1280,
  alt: "Official invitation to the TIM ATIEP book launch, listing the chief guest, guest of honour, keynote speaker, speakers, moderator and author",
};

/** Guests named first on the invitation, in order of precedence. */
export const HONOURED_ROLES: SpeakerRole[] = ["chief-guest", "guest-of-honour", "keynote"];

// ─── Book ─────────────────────────────────────────────────────────────────

const BOOKSTORE_PHONE = "+211929996503";

export const book: Book = {
  title: "TIM ATIEP",
  subtitle: "The Tree of Shade",
  fullTitle: "TIM ATIEP - The Tree of Shade",
  author: "Adut Loi Akok",
  publisher: "Africa World Books",
  genre: "Poetry",
  language: "Title in Dinka (Jieng)",
  cover: "/images/books/tiem-atiep/cover.jpg",
  tagline:
    "Every poem is a leaf from a tree grown from lives and moments, and every reader is invited to find a little shade beneath its branches.",
  description:
    "Poems of gratitude and witness. TIM ATIEP unfolds in two movements: the first honours Reeta Roy, " +
    "former CEO of the Mastercard Foundation, as a tree of shade for many; the second turns inward, to a " +
    "lone boy seeking shelter, healing and a place of rest beneath the tree.",
  themes: ["Gratitude", "Resilience", "Healing", "Mental Health", "Memory", "Becoming"],
  price: { usd: 20, ssp: 150_000 },
  purchaseLink: `https://wa.me/${BOOKSTORE_PHONE.replace("+", "")}?text=${encodeURIComponent(
    "Hello Ubuntu Bookstore, I would like to order a copy of TIM ATIEP - The Tree of Shade by Adut Loi Akok.",
  )}`,
  stockist: {
    name: "Ubuntu Bookstore",
    location: "Thongpiny, Juba — next to Catholic University",
    phone: BOOKSTORE_PHONE,
    phoneDisplay: "+211 929 996 503",
    whatsapp: `https://wa.me/${BOOKSTORE_PHONE.replace("+", "")}`,
  },
};

// ─── Author (from the back cover) ─────────────────────────────────────────

export const author: Author = {
  name: "Adut Loi Akok",
  portrait: "/images/gallery/IMG_5021.JPG",
  portraitAlt: "Portrait of Adut Loi Akok",
  portraitPosition: "center 20%",
  summary:
    "South Sudanese award-winning poet and author, Mastercard Foundation Scholar at the University of Rwanda, and founder of the Dream-led Youth Fellowship.",
  bio: [
    "Adut Loi Akok is a South Sudanese award-winning poet and author. He is a Mastercard Foundation Scholar at the University of Rwanda, pursuing a Bachelor's degree in Food Science and Technology. His previous books include The Beauty Within Us (chapbook) and If Only the City Cries.",
    "He is a mental health advocate and the founder of the Dream-led Youth Fellowship, a peer support club at the University of Rwanda. Adut is a member of the Pan-African Youth Parliament and the PLO Lumumba Foundation, and serves as a Youth Fellow at the African United Nations Youth Delegates Program.",
  ],
  honours: [
    { title: "Youth Leadership & Civic Impact Award", by: "Scholar Media Africa", year: "2026" },
    { title: "Best African Writer of the Year", by: "Radiate Rwanda Literary Excellence Award", year: "2025" },
    { title: "Shabab Le Shabab Second Poetry Prize", by: "UNFPA", year: "2022" },
  ],
  featuredIn: [
    "Brittle Paper",
    "Kalahari Review",
    "Best New African Poets Anthology",
    "Afritondo Press",
    "World Poetry Year Book 2025",
  ],
};

export const authorBooks: AuthorBook[] = [
  {
    id: "if-only-the-city-cries",
    title: "If Only the City Cries",
    subtitle: "Poems from the Theatre of Miseries",
    image: "/images/books/featured-book/IMG_5038.JPG",
    imageAlt: "A hand holding If Only the City Cries by Adut Loi Akok",
    photos: ["/images/books/featured-book/IMG_5030.JPG", "/images/books/featured-book/IMG_5039.JPG"],
  },
  {
    id: "the-beauty-within-us",
    title: "The Beauty Within Us",
    subtitle: "Chapbook",
    tagline: "A beauty that never fades, but is passed down from generation to generation.",
    image: "/images/books/featured-book/IMG_5041.JPG",
    imageAlt: "The Beauty Within Us by Adut Loi Akok",
    photos: ["/images/books/featured-book/IMG_5040.JPG"],
  },
  {
    id: "tim-atiep",
    title: "TIM ATIEP",
    subtitle: "Tree of Shade — launching today",
    image: "/images/books/tiem-atiep/IMG_4992.JPG",
    imageAlt: "Front and back cover of TIM ATIEP by Adut Loi Akok",
    badge: "New",
  },
];

// ─── Speakers (from the invitation flyer, in order of appearance) ────────
// Names follow each guest's own public spelling where it differs from the flyer.
// Bios were checked against public sources in September 2026; Kenyatta Kozzie's
// comes from the organisers (no public record found). Photos under speakers/flyer
// are the organisers' full-resolution portraits for guests not in speakers/imgN.

export const speakers: Speaker[] = [
  {
    id: "kenyatta-kozzie",
    name: "Kenyatta Kozzie",
    role: "moderator",
    avatar: "/images/speakers/flyer/kenyatta-kozzie.jpg",
    avatarPosition: "center 30%",
    title: "Media Personality & Host",
    bio: "A seasoned South Sudanese media personality and event host, known for moderating political and cultural forums.",
  },
  {
    id: "adut-loi-akok",
    name: "Adut Loi Akok",
    role: "author",
    avatar: "/images/gallery/IMG_5032.JPG",
    avatarPosition: "center 18%",
    title: "Poet & Author",
    affiliation: "Mastercard Foundation Scholar, University of Rwanda",
    tribute:
      "Founder of the Dream-led Youth Fellowship, a peer support club at the University of Rwanda, and a mental health advocate.",
  },
  {
    id: "john-gai-yoh",
    name: "Dr. John Gai Yoh",
    role: "speaker",
    avatar: "/images/speakers/img2.jpeg",
    title: "Founder & Chairman",
    affiliation: "South Sudan Center for Strategic and Policy Studies (CSPS)",
    bio: "Former Minister of Education, Science and Technology (2013–2016), South Sudan's first Ambassador to Turkey, and later Presidential Advisor on Education. He holds a PhD in International Politics from the University of South Africa and is the author of The Idea of South Sudan.",
  },
  {
    id: "david-de-dau",
    name: "Hon. David De Dau",
    role: "speaker",
    avatar: "/images/speakers/img1.jpeg",
    avatarPosition: "center 15%",
    title: "Executive Director",
    affiliation: "Agency for Independent Media (AIM)",
    bio: "A leading civil society voice for press freedom and peace, and spokesperson of the South Sudan Civil Society Alliance, known for his work in media development, community dialogue and peacebuilding.",
  },
  {
    id: "rebecca-joshua",
    name: "Hon. Rebecca Joshua Okwaci",
    role: "speaker",
    avatar: "/images/speakers/img6.jpeg",
    avatarPosition: "52% center",
    title: "Veteran Journalist & Former Minister",
    bio: "Remembered as the “voice of the liberation struggle” on SPLA Radio, she has served as Minister of Telecommunications and Postal Services, Minister of Roads and Bridges, and SPLM Chief Whip in the national parliament. She is Secretary General of Women Action for Development.",
  },
  {
    id: "rebecca-lorins",
    name: "Prof. Rebecca Lorins",
    role: "speaker",
    avatar: "/images/speakers/img5.jpeg",
    // Keeps face and cap in frame and crops the photographer's watermark (bottom right).
    avatarPosition: "center 20%",
    title: "University of Juba",
    affiliation: "Co-founder, Likikiri Collective",
    bio: "An educator and researcher who has lived in South Sudan since 2014. Her PhD in Comparative Literature (University of Texas at Austin) followed Kwoto, a South Sudanese popular theatre troupe, and she uses theatre and multimedia to share knowledge.",
  },
  {
    id: "john-akech",
    name: "Prof. John Apuruot Akec",
    role: "speaker",
    avatar: "/images/speakers/img14.jpeg",
    avatarPosition: "60% center",
    title: "Vice-Chancellor",
    affiliation: "University of Juba",
    bio: "Led the University of Juba from 2014 and was reappointed Vice-Chancellor in 2025, after serving as Vice-Chancellor of the newly established University of Northern Bahr el Ghazal. An engineer with an MSc from Cardiff and a PhD from the University of Birmingham, he is a leading voice on higher-education reform.",
  },
  {
    id: "francis-buk",
    name: "Hon. Francis Buk",
    role: "keynote",
    avatar: "/images/speakers/img3.jpeg",
    title: "Human Rights Advocate & Author",
    affiliation: "Escape from Slavery (2003)",
    bio: "Abducted into slavery as a child during Sudan's civil war, he escaped after ten years and in 2000 became the first escaped slave to testify before the US Senate Committee on Foreign Relations. His memoir and advocacy have made him an international voice for freedom and resilience.",
  },
  {
    id: "taban-abel-guek",
    name: "Hon. Taban Abel Aguek",
    role: "guest-of-honour",
    avatar: "/images/speakers/img7.jpeg",
    title: "Public Official & Writer",
    bio: "A former Minister of Information who has also served as Deputy Commissioner General of the South Sudan Revenue Authority, and a long-time writer and commentator on youth, national unity and civic engagement.",
  },
  {
    id: "hussein-abdelbagi-akol",
    name: "H.E. Hussein Abdelbagi Akol",
    role: "chief-guest",
    avatar: "/images/speakers/flyer/hussein-abdelbagi-akol.jpg",
    title: "Vice President of the Republic of South Sudan",
    affiliation: "Service Cluster",
    bio: "First appointed Vice President in 2020, he served as Minister of Agriculture and Food Security (2025–2026) before returning as Vice President for the Service Cluster in February 2026. A leader in the South Sudan Opposition Alliance (SSOA).",
  },
  {
    id: "arizona-jj",
    name: "Arizona JJ'",
    role: "performer",
    avatar: "/images/speakers/flyer/arizona-jj.jpg",
    // Low enough to crop out the photographer's watermark at the top.
    avatarPosition: "center 70%",
    title: "Singer & Songwriter",
    bio: "A popular South Sudanese musician who performs across South Sudan, Kenya and Uganda and has toured Australia and Egypt. His songs include “Thiëëk” and “Piondie”.",
  },
];

// ─── Journey Milestones ───────────────────────────────────────────────────

export const milestones: Milestone[] = [
  {
    id: "under-the-tree",
    title: "Learning Under the Shade",
    place: "South Sudan",
    description: "Education began beneath a tree — no walls, no roof, only shade, a teacher, and the will to learn.",
    icon: "tree",
  },
  {
    id: "unfpa-prize",
    title: "Shabab Le Shabab Poetry Prize",
    place: "UNFPA",
    period: "2022",
    description: "Second prize for poetry in the Shabab Le Shabab competition.",
    icon: "feather",
  },
  {
    id: "mastercard-scholar",
    title: "Mastercard Foundation Scholar",
    place: "University of Rwanda",
    description: "Studying Food Science and Technology, carrying the lessons of the tree into higher education.",
    icon: "graduation",
  },
  {
    id: "dream-led-fellowship",
    title: "Dream-led Youth Fellowship",
    place: "University of Rwanda",
    description:
      "Founded a peer support club offering shade to young people affected by early marriage, child labour, and stigma.",
    icon: "users",
  },
  {
    id: "radiate-rwanda",
    title: "Best African Writer of the Year",
    place: "Radiate Rwanda",
    period: "2025",
    description: "Honoured with the Radiate Rwanda Literary Excellence Award.",
    icon: "trophy",
  },
  {
    id: "smega-award",
    title: "Youth Leadership & Civic Impact Award",
    place: "SMEGA, Nairobi",
    period: "2026",
    description: "Honoured by Scholar Media Africa, with the award presented by Prof. PLO Lumumba.",
    icon: "award",
  },
  {
    id: "book-launch",
    title: "TIM ATIEP Launches",
    place: "Unipod Hall, University of Juba",
    period: "2026",
    description: "The new poetry collection, published by Africa World Books, comes home to Juba.",
    icon: "book",
  },
];

// ─── Praise and Foreword (from the book) ──────────────────────────────────

export const endorsement: BookQuote = {
  eyebrow: "Praise for TIM ATIEP",
  lead:
    "Dear Adut Loi Akok, first, allow me to congratulate you on the work you have done in crystallizing your poems. " +
    "I have read some good poems in your work, including ‘The Girl at the Rwandan Genocide Memorial Center’, " +
    "‘The Beautiful Thing about Resilience’, ‘If my Sister was an Educated Woman’, and ‘Some Beautiful People We are Becoming’.",
  highlight:
    "TIM ATIEP (The Tree of Shade) is a beautiful collection of thought provoking and enlightening poems covering diverse experiences which the discerning reader will find energizing and enriching at once.",
  author: "Prof. PLO Lumumba",
  role: "Chairman and Founder, PLO Lumumba Foundation",
};

export const foreword: Foreword = {
  author: "Moses Makuei",
  role: "Editor, Literary Critic/Essayist and Book Reviewer",
  blocks: [
    "Those familiar with Adut Loi will quickly come to notice that the themes in this work present a slight departure from the style the author has come to be associated with. Unlike with The Beauty Within Us and the more celebrated If Only the City Cries, the poems in this collection resist a single introduction, because they arise from more than one impulse and serve more than one purpose. They are an act of gratitude and an act of witness: a gesture turned outward in recognition, and inward in retrospection.",
    "This book unfolds in two distinct but deeply connected movements. The first movement stands in the tradition of a Festschrift—not in the narrow academic sense, but in its truer spirit: a gathering of voices that acknowledge a life whose influence has extended quietly and decisively into the lives of others. With Adut’s poetic eloquence, one cannot help but come to admire the figure at its centre—Reeta Roy, the highly garlanded global leader and philanthropist, former CEO of MasterCard Foundation.",
    "This opening movement is remarkable not simply because it praises its subject, but because of the unusual intensity with which it does so. Poets often approach the temptation of revealing the full measure of their admiration, only to temper it with artistic distance. Adut does not. He allows his enthusiasm to remain visible, even vulnerable, giving the work a rare emotional transparency. It is this openness that lends the first part its distinctive charm, finding expression in lines such as, “My children shall be born holding flowers for you,” and:",
    { verse: ["Hello, mama Reeta,", "The thoughts of you are louder than the morning drums of my village."] },
    "And if the first movement is an act of gratitude offered without reservation, the second turns inward. The exuberance of praise gives way to a quieter, more solitary voice—a voice that is no longer celebrating another life, but searching for its own place of rest. In one of its most moving moments, Adut writes:",
    { verse: ["We can drown but not in the same rivers we belong,", "We can mourn but not during the festive season"] },
    "The image is unmistakable: a lone boy, seeking not triumph but shelter; not acclaim but a place where the heart may recover. The tree of shade, then, becomes more than the title of the collection. It becomes a symbol of refuge, of the grace that receives without asking, and of the quiet healing every pilgrim longs for. What else would a lone boy need? What place would he rather be than beneath the ever-comforting shadow of the tree of shade?",
  ],
  excerpt: {
    eyebrow: "Foreword",
    lead: "They are an act of gratitude and an act of witness: a gesture turned outward in recognition, and inward in retrospection.",
    highlight:
      "The tree of shade, then, becomes more than the title of the collection. It becomes a symbol of refuge, of the grace that receives without asking, and of the quiet healing every pilgrim longs for.",
    author: "Moses Makuei",
    role: "Editor, Literary Critic/Essayist and Book Reviewer",
  },
};

// ─── Poems: notable lines from the collection ─────────────────────────────

// One backdrop for every verse: the book's first pages.
const POEM_BACKDROP = "/images/gallery/IMG_5018.JPG";

const excerpt = (id: string, title: string, lines: string[]): Poem => ({
  id,
  title,
  stanzas: [lines],
  image: POEM_BACKDROP,
});

export const poems: Poem[] = [
  excerpt("beautiful-people-we-are-becoming", "The Beautiful People We Are Becoming", [
    "When we find ourselves under one umbrella",
    "in the shelters of friends who bring",
    "us together for healing, we dance and tell",
    "the stories of the beautiful people we are becoming",
    "So now a collection of our smiles",
    "now defines mental health",
  ]),
  excerpt("girl-at-rwandas-genocide-memorial", "The Girl at Rwanda’s Genocide Memorial", [
    "I heard the girl at Rwanda’s",
    "Genocide Memorial speak with a familiar voice",
    "She screamed like my sister in pain",
    "when the sun was afraid to rise in the day",
    "and light was a dream for children in the war fields",
    "I will be watching this",
    "for the histories of other nations are",
    "my country’s living moment",
  ]),
  excerpt("healing-memories", "Healing Memories", [
    "Someone is still listening",
    "to the music you once played",
    "when they were beside you.",
    "The words you said with a warm",
    "heart and love and affectionate laughter",
    "The same bright eyes in your face",
    "and soft hands you held them",
    "in dark and mornings of anxiety",
  ]),
  excerpt("hold-my-hands", "Hold My Hands", [
    "Hold my hands",
    "and let's redefine our worlds",
    "The masks on our faces are made of anxiety",
    "and anxiety is a boring texture when placed against",
    "your skin",
    "Beautiful girl of melanin",
    "Beautiful girl of melancholy",
  ]),
  excerpt("for-my-love", "For My Love, There is a Poem I Know", [
    "My pride is poetry",
    "the only colour I wear over my skin",
    "My love—",
    "You asked me to take you back to South Sudan",
    "There is a poem I know",
    "I will tell you—through the story",
    "of an uncle in between terror and hope",
  ]),
  excerpt("freedom", "Freedom", [
    "I’m free when my mind is free",
    "from cloudy thoughts, abstraction",
    "and the numbing whips of depression",
    "All the awful nightmares evoking haunting memories",
    "My mental health is my treasure chest",
    "where my charms bloom and my right conscience is as clear as",
    "calm streams",
  ]),
  excerpt("her-words-in-despair", "Her Words in Despair", [
    "To die is never the end",
    "It’s the first norm of our shared",
    "tales of life across the river",
    "Maybe we end in flesh and blood",
    "to become the sudd",
    "and keep the Nile standing as a symbol",
    "of our long endurance",
  ]),
  excerpt("beautiful-people-we-are-becoming-ii", "The Beautiful People We Are Becoming", [
    "Nobody loves cemetery flowers",
    "We don’t welcome wars",
    "But still, they are",
    "the centre of our memories",
    "We cry",
    "But nobody loves to see teardrops",
    "of misery",
    "We embrace silence",
    "But silence is a stabbing sword",
  ]),
  excerpt("solid-minds", "Solid Minds", [
    "We are an anthology of dreams",
    "from broken homes and deserted streets",
    "See how beautifully we smile together",
    "and dance with our feet above the",
    "water, to drain the rivers that drown us",
    "Watch the long walk and resilience",
    "of peers who rise from the depths of darkness",
  ]),
  excerpt("to-those-who-knew-my-name", "To Those Who Knew My Name", [
    "My skin is made of open scars",
    "and this is a portrait of my",
    "country’s citizens",
    "Walking down the street in Kigali",
    "the ghost of my depression follows",
    "through the city to the last open bar.",
  ]),
  excerpt("as-only-a-mother-can", "As Only a Mother Can", [
    "Before I ever opened my mouth",
    "the sound of guns filled my silence",
    "The only way to comfort me was to hold",
    "my hands tightly and whisper",
    "the secret wishes of children in war zones",
    "My father bought a gun before paying",
    "my school fees",
  ]),
  excerpt("spirits-of-those-i-lost", "The Spirits of Those I Lost", [
    "I am never lonely",
    "the spirits of those I lost",
    "surround me",
    "This is the language",
    "of my heart to a passing",
    "stranger who wonders",
    "why the world all around never",
    "accompanies me through the nights of grief",
  ]),
  excerpt("a-promise-of-safety", "A Promise of Safety", [
    "Peace is the water that my dry veins need",
    "with the Nile in sight, I am still thirsty.",
    "I stand on these streets",
    "Like any child in distress",
    "I stand on the broken bridges",
    "Between starving home and the palace.",
  ]),
  excerpt("pien-thuk-rot-wut", "Pien thük röt Wut", [
    "To rebuild the remains of our broken",
    "bridges",
    "They were never broken in the first place",
    "It’s only spirits in our hearts",
    "that never were holding each other by hand",
    "and walk together like family",
    "crossing the river together",
    "when the nights were dark",
    "and the road unclear",
  ]),
  excerpt("beautiful-resilience", "Beautiful Resilience", [
    "The world knows us for spearing",
    "a smile forever, just to tell a tale of",
    "kinsfolk who smile with wounds on their skin",
    "Believe me or not",
    "the beautiful thing about resilience",
    "is having the courage to break through",
    "tenfold in the forest of those with open",
    "claws and beaks",
  ]),
];

// ─── Gallery ──────────────────────────────────────────────────────────────
// Only photos sharp enough for a large screen; low-resolution shots were left out.

const photo = (src: string, width: number, height: number, caption: string, alt = caption): GalleryImage => ({
  id: src.split("/").pop()!.replace(/\.\w+$/, "").toLowerCase(),
  src: `/images/${src}`,
  width,
  height,
  caption,
  alt,
});

export const gallery: GalleryImage[] = [
  // The book
  photo("books/tiem-atiep/IMG_4992.JPG", 1170, 1137, "TIM ATIEP — front and back cover"),
  photo("books/tiem-atiep/IMG_5010.JPG", 1152, 2048, "TIM ATIEP — Tree of Shade, in hand"),
  photo("gallery/IMG_5018.JPG", 1808, 2048, "First pages — TIM ATIEP, A Tree of Shade"),
  photo("books/tiem-atiep/IMG_4993.JPG", 1536, 2048, "A quiet afternoon with TIM ATIEP"),
  photo("gallery/IMG_5017.JPG", 1536, 2048, "TIM ATIEP in the open air"),
  photo("books/tiem-atiep/IMG_4994.JPG", 1536, 2048, "The back cover — about the author"),
  photo("speakers/img13.jpeg", 1280, 1280, "The invitation — guests of the launch"),
  photo("gallery/IMG_5019.JPG", 1290, 1790, "Now available at Ubuntu Book Store, Thongpiny"),
  // The author
  photo("gallery/IMG_5021.JPG", 1170, 1512, "Adut Loi Akok — poet and author", "Portrait of Adut Loi Akok"),
  photo("gallery/IMG_5023.JPG", 1448, 2048, "Adut Loi Akok", "Portrait of Adut Loi Akok"),
  photo("gallery/IMG_5037.JPG", 1744, 2048, "Performing poetry live"),
  // Honours
  photo("gallery/IMG_4995.JPG", 2048, 1878, "Youth Leadership & Civic Impact Award — Scholar Media Africa, Nairobi 2026"),
  photo("gallery/IMG_4998.JPG", 1536, 2048, "Receiving the award at Scholar Media Africa, Nairobi"),
  photo("gallery/IMG_4999.JPG", 1536, 2048, "On the red carpet at Scholar Media Africa, Nairobi"),
  photo("gallery/IMG_5001.JPG", 2048, 1536, "Honours at Scholar Media Africa, Nairobi"),
  photo("gallery/IMG_4996.JPG", 1800, 2048, "Celebrating with mentors and friends"),
  photo("gallery/IMG_4997.JPG", 1536, 2048, "Between sessions"),
  photo("gallery/IMG_5028.JPG", 900, 1600, "Radiate Rwanda Literary Excellence Award — Best African Writer of the Year 2025"),
  // Sharing the book
  photo("gallery/IMG_5002.JPG", 2048, 1536, "Sharing TIM ATIEP"),
  photo("gallery/IMG_5003.JPG", 2048, 1536, "Sharing TIM ATIEP with leaders and mentors"),
  photo("gallery/IMG_5004.JPG", 1536, 2048, "A copy for a friend"),
  photo("gallery/IMG_5005.JPG", 1536, 2048, "Finding shade in its pages"),
  photo("gallery/IMG_5013.JPG", 1536, 2048, "Presenting TIM ATIEP"),
  photo("gallery/IMG_5014.JPG", 1536, 2048, "A copy handed over"),
  photo("gallery/IMG_5015.JPG", 1536, 2048, "Presenting TIM ATIEP"),
  photo("gallery/IMG_5016.JPG", 1029, 1280, "Two copies, two readers"),
  photo("gallery/IMG_5007.JPG", 1536, 2048, "Sharing TIM ATIEP with fellow delegates"),
  photo("gallery/IMG_5008.JPG", 1536, 2048, "TIM ATIEP among young leaders"),
  photo("gallery/IMG_5011.JPG", 1152, 2048, "At an international gathering"),
  // Leadership and advocacy
  photo("gallery/IMG_5029.JPG", 1536, 2048, "Representing the SDG 7 Youth Constituency"),
  photo("gallery/IMG_5033.JPG", 1170, 1461, "Speaking to young audiences"),
  photo("gallery/IMG_5034.JPG", 960, 1280, "Mentorship moments"),
  photo("gallery/IMG_5024.JPG", 1600, 1067, "With fellow young leaders"),
  photo("gallery/IMG_5025.JPG", 1600, 1067, "In dialogue with young leaders"),
  photo("gallery/IMG_5020.JPG", 1600, 1066, "At the table"),
  photo("gallery/IMG_5026.JPG", 1542, 2048, "Journeys across Africa"),
];

// ─── Aggregate ────────────────────────────────────────────────────────────

export const presentationData: PresentationData = {
  event,
  book,
  author,
  authorBooks,
  speakers,
  milestones,
  endorsement,
  foreword,
  poems,
  gallery,
};

export default presentationData;
