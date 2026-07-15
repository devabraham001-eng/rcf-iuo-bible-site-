import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Sun,
  Moon,
  BookOpen,
  Maximize2,
  Minimize2,
  Loader2,
  X,
} from "lucide-react";

type Verse = { book: string; chapter: number; verse: number; text: string };
type Theme = "light" | "sepia" | "dark";

type PassageData = { reference: string; verses: Verse[] };

const PASSAGES: PassageData[] = [
  {
    reference: "Romans 5 (KJV)",
    verses: [
      { book: "Romans", chapter: 5, verse: 1, text: "Therefore being justified by faith, we have peace with God through our Lord Jesus Christ:" },
      { book: "Romans", chapter: 5, verse: 2, text: "By whom also we have access by faith into this grace wherein we stand, and rejoice in hope of the glory of God." },
      { book: "Romans", chapter: 5, verse: 3, text: "And not only so, but we glory in tribulations also: knowing that tribulation worketh patience;" },
      { book: "Romans", chapter: 5, verse: 4, text: "And patience, experience; and experience, hope:" },
      { book: "Romans", chapter: 5, verse: 5, text: "And hope maketh not ashamed; because the love of God is shed abroad in our hearts by the Holy Ghost which is given unto us." },
      { book: "Romans", chapter: 5, verse: 6, text: "For when we were yet without strength, in due time Christ died for the ungodly." },
      { book: "Romans", chapter: 5, verse: 7, text: "For scarcely for a righteous man will one die: yet peradventure for a good man some would even dare to die." },
      { book: "Romans", chapter: 5, verse: 8, text: "But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us." },
      { book: "Romans", chapter: 5, verse: 9, text: "Much more then, being now justified by his blood, we shall be saved from wrath through him." },
      { book: "Romans", chapter: 5, verse: 10, text: "For if, when we were enemies, we were reconciled to God by the death of his Son, much more, being reconciled, we shall be saved by his life." },
      { book: "Romans", chapter: 5, verse: 11, text: "And not only so, but we also joy in God through our Lord Jesus Christ, by whom we have now received the atonement." },
      { book: "Romans", chapter: 5, verse: 12, text: "Wherefore, as by one man sin entered into the world, and death by sin; and so death passed upon all men, for that all have sinned:" },
      { book: "Romans", chapter: 5, verse: 13, text: "(For until the law sin was in the world: but sin is not imputed when there is no law." },
      { book: "Romans", chapter: 5, verse: 14, text: "Nevertheless death reigned from Adam to Moses, even over them that had not sinned after the similitude of Adam's transgression, who is the figure of him that was to come." },
      { book: "Romans", chapter: 5, verse: 15, text: "But not as the offence, so also is the free gift. For if through the offence of one many be dead, much more the grace of God, and the gift by grace, which is by one man, Jesus Christ, hath abounded unto many." },
      { book: "Romans", chapter: 5, verse: 16, text: "And not as it was by one that sinned, so is the gift: for the judgment was by one to condemnation, but the free gift is of many offences unto justification." },
      { book: "Romans", chapter: 5, verse: 17, text: "For if by one man's offence death reigned by one; much more they which receive abundance of grace and of the gift of righteousness shall reign in life by one, Jesus Christ.)" },
      { book: "Romans", chapter: 5, verse: 18, text: "Therefore as by the offence of one judgment came upon all men to condemnation; even so by the righteousness of one the free gift came upon all men unto justification of life." },
      { book: "Romans", chapter: 5, verse: 19, text: "For as by one man's disobedience many were made sinners, so by the obedience of one shall many be made righteous." },
      { book: "Romans", chapter: 5, verse: 20, text: "Moreover the law entered, that the offence might abound. But where sin abounded, grace did much more abound:" },
      { book: "Romans", chapter: 5, verse: 21, text: "That as sin hath reigned unto death, even so might grace reign through righteousness unto eternal life by Jesus Christ our Lord." },
    ],
  },
  {
    reference: "Luke 15 (KJV)",
    verses: [
      { book: "Luke", chapter: 15, verse: 1, text: "Then drew near unto him all the publicans and sinners for to hear him." },
      { book: "Luke", chapter: 15, verse: 2, text: "And the Pharisees and scribes murmured, saying, This man receiveth sinners, and eateth with them." },
      { book: "Luke", chapter: 15, verse: 3, text: "And he spake this parable unto them, saying," },
      { book: "Luke", chapter: 15, verse: 4, text: "What man of you, having an hundred sheep, if he lose one of them, doth not leave the ninety and nine in the wilderness, and go after that which is lost, until he find it?" },
      { book: "Luke", chapter: 15, verse: 5, text: "And when he hath found it, he layeth it on his shoulders, rejoicing." },
      { book: "Luke", chapter: 15, verse: 6, text: "And when he cometh home, he calleth together his friends and neighbours, saying unto them, Rejoice with me; for I have found my sheep which was lost." },
      { book: "Luke", chapter: 15, verse: 7, text: "I say unto you, that likewise joy shall be in heaven over one sinner that repenteth, more than over ninety and nine just persons, which need no repentance." },
      { book: "Luke", chapter: 15, verse: 8, text: "Either what woman having ten pieces of silver, if she lose one piece, doth not light a candle, and sweep the house, and seek diligently till she find it?" },
      { book: "Luke", chapter: 15, verse: 9, text: "And when she hath found it, she calleth her friends and her neighbours together, saying, Rejoice with me; for I have found the piece which I had lost." },
      { book: "Luke", chapter: 15, verse: 10, text: "Likewise, I say unto you, there is joy in the presence of the angels of God over one sinner that repenteth." },
      { book: "Luke", chapter: 15, verse: 11, text: "And he said, A certain man had two sons:" },
      { book: "Luke", chapter: 15, verse: 12, text: "And the younger of them said to his father, Father, give me the portion of goods that falleth to me. And he divided unto them his living." },
      { book: "Luke", chapter: 15, verse: 13, text: "And not many days after the younger son gathered all together, and took his journey into a far country, and there wasted his substance with riotous living." },
      { book: "Luke", chapter: 15, verse: 14, text: "And when he had spent all, there arose a mighty famine in that land; and he began to be in want." },
      { book: "Luke", chapter: 15, verse: 15, text: "And he went and joined himself to a citizen of that country; and he sent him into his fields to feed swine." },
      { book: "Luke", chapter: 15, verse: 16, text: "And he would fain have filled his belly with the husks that the swine did eat: and no man gave unto him." },
      { book: "Luke", chapter: 15, verse: 17, text: "And when he came to himself, he said, How many hired servants of my father's have bread enough and to spare, and I perish with hunger!" },
      { book: "Luke", chapter: 15, verse: 18, text: "I will arise and go to my father, and will say unto him, Father, I have sinned against heaven, and before thee," },
      { book: "Luke", chapter: 15, verse: 19, text: "And am no more worthy to be called thy son: make me as one of thy hired servants." },
      { book: "Luke", chapter: 15, verse: 20, text: "And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him." },
      { book: "Luke", chapter: 15, verse: 21, text: "And the son said unto him, Father, I have sinned against heaven, and in thy sight, and am no more worthy to be called thy son." },
      { book: "Luke", chapter: 15, verse: 22, text: "But the father said to his servants, Bring forth the best robe, and put it on him; and put a ring on his hand, and shoes on his feet:" },
      { book: "Luke", chapter: 15, verse: 23, text: "And bring hither the fatted calf, and kill it; and let us eat, and be merry:" },
      { book: "Luke", chapter: 15, verse: 24, text: "For this my son was dead, and is alive again; he was lost, and is found. And they began to be merry." },
      { book: "Luke", chapter: 15, verse: 25, text: "Now his elder son was in the field: and as he came and drew nigh to the house, he heard musick and dancing." },
      { book: "Luke", chapter: 15, verse: 26, text: "And he called one of the servants, and asked what these things meant." },
      { book: "Luke", chapter: 15, verse: 27, text: "And he said unto him, Thy brother is come; and thy father hath killed the fatted calf, because he hath received him safe and sound." },
      { book: "Luke", chapter: 15, verse: 28, text: "And he was angry, and would not go in: therefore came his father out, and intreated him." },
      { book: "Luke", chapter: 15, verse: 29, text: "And he answering said to his father, Lo, these many years do I serve thee, neither transgressed I at any time thy commandment: and yet thou never gavest me a kid, that I might make merry with my friends:" },
      { book: "Luke", chapter: 15, verse: 30, text: "But as soon as this thy son was come, which hath devoured thy living with harlots, thou hast killed for him the fatted calf." },
      { book: "Luke", chapter: 15, verse: 31, text: "And he said unto him, Son, thou art ever with me, and all that I have is thine." },
      { book: "Luke", chapter: 15, verse: 32, text: "It was meet that we should make merry, and be glad: for this thy brother was dead, and is alive again; and was lost, and is found." },
    ],
  },
  {
    reference: "Hosea 3 (NKJV)",
    verses: [
      { book: "Hosea", chapter: 3, verse: 1, text: "Then the LORD said to me, \"Go again, love a woman who is loved by a lover and is committing adultery, just like the love of the LORD for the children of Israel, who look to other gods and love the raisin cakes of the pagans.\"" },
      { book: "Hosea", chapter: 3, verse: 2, text: "So I bought her for myself for fifteen shekels of silver, and one and one-half homers of barley." },
      { book: "Hosea", chapter: 3, verse: 3, text: "And I said to her, \"You shall stay with me many days; you shall not play the harlot, nor shall you have a man—so, too, will I be toward you.\"" },
      { book: "Hosea", chapter: 3, verse: 4, text: "For the children of Israel shall abide many days without king or prince, without sacrifice or sacred pillar, without ephod or teraphim." },
      { book: "Hosea", chapter: 3, verse: 5, text: "Afterward the children of Israel shall return and seek the LORD their God and David their king. They shall fear the LORD and His goodness in the latter days." },
    ],
  },
  {
    reference: "John 3 (KJV)",
    verses: [
      { book: "John", chapter: 3, verse: 1, text: "There was a man of the Pharisees, named Nicodemus, a ruler of the Jews:" },
      { book: "John", chapter: 3, verse: 2, text: "The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him." },
      { book: "John", chapter: 3, verse: 3, text: "Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God." },
      { book: "John", chapter: 3, verse: 4, text: "Nicodemus saith unto him, How can a man be born when he is old? can he enter the second time into his mother's womb, and be born?" },
      { book: "John", chapter: 3, verse: 5, text: "Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God." },
      { book: "John", chapter: 3, verse: 6, text: "That which is born of the flesh is flesh; and that which is born of the Spirit is spirit." },
      { book: "John", chapter: 3, verse: 7, text: "Marvel not that I said unto thee, Ye must be born again." },
      { book: "John", chapter: 3, verse: 8, text: "The wind bloweth where it listeth, and thou hearest the sound thereof, but canst not tell whence it cometh, and whither it goeth: so is every one that is born of the Spirit." },
      { book: "John", chapter: 3, verse: 9, text: "Nicodemus answered and said unto him, How can these things be?" },
      { book: "John", chapter: 3, verse: 10, text: "Jesus answered and said unto him, Art thou a master of Israel, and knowest not these things?" },
      { book: "John", chapter: 3, verse: 11, text: "Verily, verily, I say unto thee, We speak that we do know, and testify that we have seen; and ye receive not our witness." },
      { book: "John", chapter: 3, verse: 12, text: "If I have told you earthly things, and ye believe not, how shall ye believe, if I tell you of heavenly things?" },
      { book: "John", chapter: 3, verse: 13, text: "And no man hath ascended up to heaven, but he that came down from heaven, even the Son of man which is in heaven." },
      { book: "John", chapter: 3, verse: 14, text: "And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up:" },
      { book: "John", chapter: 3, verse: 15, text: "That whosoever believeth in him should not perish, but have eternal life." },
      { book: "John", chapter: 3, verse: 16, text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." },
      { book: "John", chapter: 3, verse: 17, text: "For God sent not his Son into the world to condemn the world; but that the world through him might be saved." },
      { book: "John", chapter: 3, verse: 18, text: "He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God." },
      { book: "John", chapter: 3, verse: 19, text: "And this is the condemnation, that light is come into the world, and men loved darkness rather than light, because their deeds were evil." },
      { book: "John", chapter: 3, verse: 20, text: "For every one that doeth evil hateth the light, neither cometh to the light, lest his deeds should be reproved." },
      { book: "John", chapter: 3, verse: 21, text: "But he that doeth truth cometh to the light, that his deeds may be made manifest, that they are wrought in God." },
      { book: "John", chapter: 3, verse: 22, text: "After these things came Jesus and his disciples into the land of Judaea; and there he tarried with them, and baptized." },
      { book: "John", chapter: 3, verse: 23, text: "And John also was baptizing in Aenon near to Salim, because there was much water there: and they came, and were baptized." },
      { book: "John", chapter: 3, verse: 24, text: "For John was not yet cast into prison." },
      { book: "John", chapter: 3, verse: 25, text: "Then there arose a question between some of John's disciples and the Jews about purifying." },
      { book: "John", chapter: 3, verse: 26, text: "And they came unto John, and said unto him, Rabbi, he that was with thee beyond Jordan, to whom thou barest witness, behold, the same baptizeth, and all men come to him." },
      { book: "John", chapter: 3, verse: 27, text: "John answered and said, A man can receive nothing, except it be given him from heaven." },
      { book: "John", chapter: 3, verse: 28, text: "Ye yourselves bear me witness, that I said, I am not the Christ, but that I am sent before him." },
      { book: "John", chapter: 3, verse: 29, text: "He that hath the bride is the bridegroom: but the friend of the bridegroom, which standeth and heareth him, rejoiceth greatly because of the bridegroom's voice: this my joy therefore is fulfilled." },
      { book: "John", chapter: 3, verse: 30, text: "He must increase, but I must decrease." },
      { book: "John", chapter: 3, verse: 31, text: "He that cometh from above is above all: he that is of the earth is earthly, and speaketh of the earth: he that cometh from heaven is above all." },
      { book: "John", chapter: 3, verse: 32, text: "And what he hath seen and heard, that he testifieth; and no man receiveth his testimony." },
      { book: "John", chapter: 3, verse: 33, text: "He that hath received his testimony hath set to his seal that God is true." },
      { book: "John", chapter: 3, verse: 34, text: "For he whom God hath sent speaketh the words of God: for God giveth not the Spirit by measure unto him." },
      { book: "John", chapter: 3, verse: 35, text: "The Father loveth the Son, and hath given all things into his hand." },
      { book: "John", chapter: 3, verse: 36, text: "He that believeth on the Son hath everlasting life: and he that believeth not the Son shall not see life; but the wrath of God abideth on him." },
    ],
  },
];

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove("dark", "sepia");
  if (theme === "dark") root.classList.add("dark");
  if (theme === "sepia") root.classList.add("sepia");
}

function ScriptureCards() {
  const [verses, setVerses] = useState<Verse[]>(PASSAGES[0].verses);
  const [reference, setReference] = useState<string>(PASSAGES[0].reference);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [presenting, setPresenting] = useState(false);
  const [started, setStarted] = useState(false);
  const [showPrevious, setShowPrevious] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("sc-theme")) as Theme | null;
    if (saved === "dark" || saved === "sepia" || saved === "light") setTheme(saved);
  }, []);

  useEffect(() => {
    applyTheme(theme);
    if (typeof window !== "undefined") localStorage.setItem("sc-theme", theme);
  }, [theme]);

  const total = verses.length;
  const current = verses[index];

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => {
        const next = Math.min(Math.max(i + delta, 0), Math.max(total - 1, 0));
        if (next !== i) setDirection(delta > 0 ? 1 : -1);
        return next;
      });
    },
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); go(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      else if (e.key === "Escape" && presenting) setPresenting(false);
      else if (e.key.toLowerCase() === "p") setPresenting((p) => !p);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, presenting]);

  const search = useCallback(async (raw: string) => {
    const passage = raw.trim();
    if (!passage) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(passage)}`);
      if (!res.ok) throw new Error("Passage not found");
      const data = await res.json();
      if (!data.verses || !Array.isArray(data.verses) || data.verses.length === 0) {
        throw new Error("No verses returned");
      }
      const mapped: Verse[] = data.verses.map((v: any) => ({
        book: v.book_name,
        chapter: v.chapter,
        verse: v.verse,
        text: String(v.text).replace(/\s+/g, " ").trim(),
      }));
      setVerses(mapped);
      setReference(data.reference || passage);
      setIndex(0);
      setDirection(1);
      setQuery("");
    } catch (e: any) {
      setError(e?.message || "Could not load passage. Try 'John 1' or 'Romans 8'.");
    } finally {
      setLoading(false);
    }
  }, []);

  const startWith = useCallback((passage: PassageData) => {
    setVerses(passage.verses);
    setReference(passage.reference);
    setIndex(0);
    setDirection(1);
    setStarted(true);
  }, []);

  const progress = total > 0 ? ((index + 1) / total) * 100 : 0;

  // Dynamic font size based on verse length
  const verseFontClass = useMemo(() => {
    const len = current?.text.length ?? 0;
    if (len < 90) return "text-4xl md:text-6xl leading-[1.2]";
    if (len < 180) return "text-3xl md:text-5xl leading-[1.25]";
    if (len < 300) return "text-2xl md:text-4xl leading-[1.3]";
    if (len < 450) return "text-xl md:text-3xl leading-[1.35]";
    return "text-lg md:text-2xl leading-[1.45]";
  }, [current?.text]);

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchStart.current = null;
  };

  const verseRef = current ? `${current.book} ${current.chapter}:${current.verse}` : reference;

  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 text-center">
        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
          <BookOpen className="h-7 w-7 text-primary" />
        </div>
        <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-4">RCF IUO</div>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight max-w-[16ch] leading-[1.05]">
          Bible Study Plan
        </h1>
        <p className="mt-6 max-w-md text-muted-foreground">
          One verse at a time. Choose a passage to start reading:
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          {PASSAGES.slice(0, 2).map((passage) => (
            <button
              key={passage.reference}
              onClick={() => startWith(passage)}
              className="h-14 px-8 rounded-full bg-primary text-primary-foreground text-sm font-medium tracking-wide hover:opacity-90 transition shadow-lg"
            >
              {passage.reference}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={() => setShowPrevious(!showPrevious)}
            className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition flex items-center gap-2 mx-auto"
          >
            <ChevronRight className={`h-3 w-3 transition-transform ${showPrevious ? "rotate-90" : ""}`} />
            {showPrevious ? "Hide Previous" : "Read Previous"}
          </button>
        </div>

        {showPrevious && (
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            {PASSAGES.slice(2).map((passage) => (
              <button
                key={passage.reference}
                onClick={() => startWith(passage)}
                className="h-12 px-6 rounded-full border border-border text-foreground text-sm font-medium tracking-wide hover:bg-accent transition"
              >
                {passage.reference}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      {/* Progress */}
      <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-border/40">
        <div
          className="h-full bg-primary transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      {!presenting && (
        <header className="pt-6 px-4 md:px-8 flex items-center gap-3 md:gap-6">
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setStarted(false)}
              className="h-9 w-9 rounded-full border border-border hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition"
              aria-label="Back to home"
              title="Back to home"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div className="hidden sm:block">
              <div className="font-serif text-lg leading-none tracking-tight">ScriptureCards</div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mt-1">One verse at a time</div>
            </div>
          </div>

          <form
            className="flex-1 max-w-xl mx-auto relative"
            onSubmit={(e) => { e.preventDefault(); search(query); }}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search a passage — e.g. "Genesis 1" or "Romans 8"'
              className="w-full h-11 pl-10 pr-24 rounded-full bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring/50 text-sm placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 px-4 rounded-full bg-primary text-primary-foreground text-xs font-medium disabled:opacity-40 hover:opacity-90 transition"
            >
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Go"}
            </button>
          </form>

          <div className="flex items-center gap-1 shrink-0">
            <ThemeButton active={theme === "light"} onClick={() => setTheme("light")} label="Light">
              <Sun className="h-4 w-4" />
            </ThemeButton>
            <ThemeButton active={theme === "sepia"} onClick={() => setTheme("sepia")} label="Sepia">
              <BookOpen className="h-4 w-4" />
            </ThemeButton>
            <ThemeButton active={theme === "dark"} onClick={() => setTheme("dark")} label="Dark">
              <Moon className="h-4 w-4" />
            </ThemeButton>
            <button
              onClick={() => setPresenting(true)}
              className="ml-2 h-9 w-9 rounded-full border border-border hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition"
              aria-label="Presentation mode"
              title="Presentation mode (P)"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </header>
      )}

      {presenting && (
        <button
          onClick={() => setPresenting(false)}
          className="fixed top-4 right-4 z-50 h-10 w-10 rounded-full bg-card/60 backdrop-blur border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground opacity-30 hover:opacity-100 transition"
          aria-label="Exit presentation"
        >
          <Minimize2 className="h-4 w-4" />
        </button>
      )}

      {/* Error */}
      {error && !presenting && (
        <div className="mx-auto mt-4 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm flex items-center gap-2">
          <X className="h-4 w-4" /> {error}
        </div>
      )}

      {/* Card area */}
      <main
        className="flex-1 flex items-center justify-center px-4 md:px-8 py-8 md:py-12 relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {!presenting && (
          <button
            onClick={() => go(-1)}
            disabled={index === 0}
            className="hidden md:flex absolute left-6 lg:left-12 h-12 w-12 rounded-full border border-border bg-card hover:bg-accent items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition shadow-sm"
            aria-label="Previous verse"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        <div className="w-full max-w-3xl">
          {presenting ? (
            <PresentationCard verse={current} verseRef={verseRef} direction={direction} fontClass={verseFontClass} />
          ) : (
            <Card verse={current} verseRef={verseRef} reference={reference} direction={direction} fontClass={verseFontClass} index={index} total={total} />
          )}

          {/* Mobile nav */}
          {!presenting && (
            <div className="mt-6 flex md:hidden items-center justify-between">
              <button
                onClick={() => go(-1)}
                disabled={index === 0}
                className="h-11 w-11 rounded-full border border-border bg-card flex items-center justify-center disabled:opacity-30"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">
                Verse {index + 1} of {total}
              </div>
              <button
                onClick={() => go(1)}
                disabled={index >= total - 1}
                className="h-11 w-11 rounded-full border border-border bg-card flex items-center justify-center disabled:opacity-30"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {!presenting && (
          <button
            onClick={() => go(1)}
            disabled={index >= total - 1}
            className="hidden md:flex absolute right-6 lg:right-12 h-12 w-12 rounded-full border border-border bg-card hover:bg-accent items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition shadow-sm"
            aria-label="Next verse"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </main>

      {!presenting && (
        <footer className="pb-6 text-center text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          Space / → next · ← previous · P present
        </footer>
      )}

      {presenting && (
        <div className="fixed bottom-6 left-0 right-0 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground/60">
          {index + 1} / {total}
        </div>
      )}
    </div>
  );
}

function ThemeButton({
  active, onClick, label, children,
}: { active: boolean; onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`h-9 w-9 rounded-full flex items-center justify-center transition ${
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Card({
  verse, verseRef, reference, direction, fontClass, index, total,
}: {
  verse: Verse | undefined; verseRef: string; reference: string;
  direction: 1 | -1; fontClass: string; index: number; total: number;
}) {
  return (
    <article
      key={`${verseRef}-${index}`}
      className="relative rounded-3xl bg-card text-card-foreground border border-border/60 px-8 py-12 md:px-16 md:py-20 min-h-[60vh] md:min-h-[64vh] flex flex-col"
      style={{ boxShadow: "var(--card-shadow)", animation: `slideIn${direction > 0 ? "R" : "L"} 0.45s cubic-bezier(0.22,1,0.36,1)` }}
    >
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>{reference}</span>
        <span>Verse {index + 1} of {total}</span>
      </div>

      <div className="flex-1 flex items-center justify-center py-8">
        <p className={`font-serif ${fontClass} text-center text-card-foreground max-w-[36ch] mx-auto`}
           style={{ fontFeatureSettings: '"liga","dlig"' }}>
          {verse?.text}
        </p>
      </div>

      <div className="flex justify-center">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wide">
          {verseRef}
        </span>
      </div>

      <style>{keyframes}</style>
    </article>
  );
}

function PresentationCard({
  verse, verseRef, direction, fontClass,
}: { verse: Verse | undefined; verseRef: string; direction: 1 | -1; fontClass: string }) {
  return (
    <div
      key={verseRef}
      className="min-h-[80vh] flex flex-col items-center justify-center text-center"
      style={{ animation: `slideIn${direction > 0 ? "R" : "L"} 0.55s cubic-bezier(0.22,1,0.36,1)` }}
    >
      <p className={`font-serif ${fontClass} max-w-[34ch]`}>{verse?.text}</p>
      <div className="mt-10 text-xs uppercase tracking-[0.28em] text-muted-foreground">{verseRef}</div>
      <style>{keyframes}</style>
    </div>
  );
}

const keyframes = `
@keyframes slideInR { from { opacity: 0; transform: translateX(24px) } to { opacity: 1; transform: translateX(0) } }
@keyframes slideInL { from { opacity: 0; transform: translateX(-24px) } to { opacity: 1; transform: translateX(0) } }
`;

export default ScriptureCards;
