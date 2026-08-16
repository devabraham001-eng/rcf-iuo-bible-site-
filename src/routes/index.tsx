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
    reference: "John 8 (KJV)",
    verses: [
      { book: "John", chapter: 8, verse: 1, text: "Jesus went unto the mount of Olives." },
      { book: "John", chapter: 8, verse: 2, text: "And early in the morning he came again into the temple, and all the people came unto him; and he sat down, and taught them." },
      { book: "John", chapter: 8, verse: 3, text: "And the scribes and Pharisees brought unto him a woman taken in adultery; and when they had set her in the midst," },
      { book: "John", chapter: 8, verse: 4, text: "They say unto him, Master, this woman was taken in adultery, in the very act." },
      { book: "John", chapter: 8, verse: 5, text: "Now Moses in the law commanded us, that such should be stoned: but what sayest thou?" },
      { book: "John", chapter: 8, verse: 6, text: "This they said, tempting him, that they might have to accuse him. But Jesus stooped down, and with his finger wrote on the ground, as though he heard them not." },
      { book: "John", chapter: 8, verse: 7, text: "So when they continued asking him, he lifted up himself, and said unto them, He that is without sin among you, let him first cast a stone at her." },
      { book: "John", chapter: 8, verse: 8, text: "And again he stooped down, and wrote on the ground." },
      { book: "John", chapter: 8, verse: 9, text: "And they which heard it, being convicted by their own conscience, went out one by one, beginning at the eldest, even unto the last: and Jesus was left alone, and the woman standing in the midst." },
      { book: "John", chapter: 8, verse: 10, text: "When Jesus had lifted up himself, and saw none but the woman, he said unto her, Woman, where are those thine accusers? hath no man condemned thee?" },
      { book: "John", chapter: 8, verse: 11, text: "She said, No man, Lord. And Jesus said unto her, Neither do I condemn thee: go, and sin no more." },
      { book: "John", chapter: 8, verse: 12, text: "Then spake Jesus again unto them, saying, I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life." },
      { book: "John", chapter: 8, verse: 13, text: "The Pharisees therefore said unto him, Thou bearest record of thyself; thy record is not true." },
      { book: "John", chapter: 8, verse: 14, text: "Jesus answered and said unto them, Though I bear record of myself, yet my record is true: for I know whence I came, and whither I go; but ye cannot tell whence I come, and whither I go." },
      { book: "John", chapter: 8, verse: 15, text: "Ye judge after the flesh; I judge no man." },
      { book: "John", chapter: 8, verse: 16, text: "And yet if I judge, my judgment is true: for I am not alone, but I and the Father that sent me." },
      { book: "John", chapter: 8, verse: 17, text: "It is also written in your law, that the testimony of two men is true." },
      { book: "John", chapter: 8, verse: 18, text: "I am one that bear witness of myself, and the Father that sent me beareth witness of me." },
      { book: "John", chapter: 8, verse: 19, text: "Then said they unto him, Where is thy Father? Jesus answered, Ye neither know me, nor my Father: if ye had known me, ye should have known my Father also." },
      { book: "John", chapter: 8, verse: 20, text: "These words spake Jesus in the treasury, as he taught in the temple: and no man laid hands on him; for his hour was not yet come." },
      { book: "John", chapter: 8, verse: 21, text: "Then said Jesus again unto them, I go my way, and ye shall seek me, and shall die in your sins: whither I go, ye cannot come." },
      { book: "John", chapter: 8, verse: 22, text: "Then said the Jews, Will he kill himself? because he saith, Whither I go, ye cannot come." },
      { book: "John", chapter: 8, verse: 23, text: "And he said unto them, Ye are from beneath; I am from above: ye are of this world; I am not of this world." },
      { book: "John", chapter: 8, verse: 24, text: "I said therefore unto you, that ye shall die in your sins: for if ye believe not that I am he, ye shall die in your sins." },
      { book: "John", chapter: 8, verse: 25, text: "Then said they unto him, Who art thou? And Jesus saith unto them, Even the same that I said unto you from the beginning." },
      { book: "John", chapter: 8, verse: 26, text: "I have many things to say and to judge of you: but he that sent me is true; and I speak to the world those things which I have heard of him." },
      { book: "John", chapter: 8, verse: 27, text: "They understood not that he spake to them of the Father." },
      { book: "John", chapter: 8, verse: 28, text: "Then said Jesus unto them, When ye have lifted up the Son of man, then shall ye know that I am he, and that I do nothing of myself; but as my Father hath taught me, I speak these things." },
      { book: "John", chapter: 8, verse: 29, text: "And he that sent me is with me: the Father hath not left me alone; for I do always those things that please him." },
      { book: "John", chapter: 8, verse: 30, text: "As he spake these words, many believed on him." },
      { book: "John", chapter: 8, verse: 31, text: "Then said Jesus to those Jews which believed on him, If ye continue in my word, then are ye my disciples indeed;" },
      { book: "John", chapter: 8, verse: 32, text: "And ye shall know the truth, and the truth shall make you free." },
      { book: "John", chapter: 8, verse: 33, text: "They answered him, We be Abraham's seed, and were never in bondage to any man: how sayest thou, Ye shall be made free?" },
      { book: "John", chapter: 8, verse: 34, text: "Jesus answered them, Verily, verily, I say unto you, Whosoever committeth sin is the servant of sin." },
      { book: "John", chapter: 8, verse: 35, text: "And the servant abideth not in the house for ever: but the Son abideth ever." },
      { book: "John", chapter: 8, verse: 36, text: "If the Son therefore shall make you free, ye shall be free indeed." },
      { book: "John", chapter: 8, verse: 37, text: "I know that ye are Abraham's seed; but ye seek to kill me, because my word hath no place in you." },
      { book: "John", chapter: 8, verse: 38, text: "I speak that which I have seen with my Father: and ye do that which ye have seen with your father." },
      { book: "John", chapter: 8, verse: 39, text: "They answered and said unto him, Abraham is our father. Jesus saith unto them, If ye were Abraham's children, ye would do the works of Abraham." },
      { book: "John", chapter: 8, verse: 40, text: "But now ye seek to kill me, a man that hath told you the truth, which I have heard of God: this did not Abraham." },
      { book: "John", chapter: 8, verse: 41, text: "Ye do the deeds of your father. Then said they to him, We be not born of fornication; we have one Father, even God." },
      { book: "John", chapter: 8, verse: 42, text: "Jesus said unto them, If God were your Father, ye would love me: for I proceeded forth and came from God; neither came I of myself, but he sent me." },
      { book: "John", chapter: 8, verse: 43, text: "Why do ye not understand my speech? even because ye cannot hear my word." },
      { book: "John", chapter: 8, verse: 44, text: "Ye are of your father the devil, and the lusts of your father ye will do. He was a murderer from the beginning, and abode not in the truth, because there is no truth in him. When he speaketh a lie, he speaketh of his own: for he is a liar, and the father of it." },
      { book: "John", chapter: 8, verse: 45, text: "And because I tell you the truth, ye believe me not." },
      { book: "John", chapter: 8, verse: 46, text: "Which of you convinceth me of sin? And if I say the truth, why do ye not believe me?" },
      { book: "John", chapter: 8, verse: 47, text: "He that is of God heareth God's words: ye therefore hear them not, because ye are not of God." },
      { book: "John", chapter: 8, verse: 48, text: "Then answered the Jews, and said unto him, Say we not well that thou art a Samaritan, and hast a devil?" },
      { book: "John", chapter: 8, verse: 49, text: "Jesus answered, I have not a devil; but I honour my Father, and ye do dishonour me." },
      { book: "John", chapter: 8, verse: 50, text: "And I seek not mine own glory: there is one that seeketh and judgeth." },
      { book: "John", chapter: 8, verse: 51, text: "Verily, verily, I say unto you, If a man keep my saying, he shall never see death." },
      { book: "John", chapter: 8, verse: 52, text: "Then said the Jews unto him, Now we know that thou hast a devil. Abraham is dead, and the prophets; and thou sayest, If a man keep my saying, he shall never taste of death." },
      { book: "John", chapter: 8, verse: 53, text: "Art thou greater than our father Abraham, which is dead? and the prophets are dead: whom makest thou thyself?" },
      { book: "John", chapter: 8, verse: 54, text: "Jesus answered, If I honour myself, my honour is nothing: it is my Father that honoureth me; of whom ye say, that he is your God:" },
      { book: "John", chapter: 8, verse: 55, text: "Yet ye have not known him; but I know him: and if I should say, I know him not, I shall be a liar like unto you: but I know him, and keep his saying." },
      { book: "John", chapter: 8, verse: 56, text: "Your father Abraham rejoiced to see my day: and he saw it, and was glad." },
      { book: "John", chapter: 8, verse: 57, text: "Then said the Jews unto him, Thou art not yet fifty years old, and hast thou seen Abraham?" },
      { book: "John", chapter: 8, verse: 58, text: "Jesus said unto them, Verily, verily, I say unto you, Before Abraham was, I am." },
      { book: "John", chapter: 8, verse: 59, text: "Then took they up stones to cast at him: but Jesus hid himself, and went out of the temple, going through the midst of them, and so passed by." },
    ],
  },
  {
    reference: "2 Samuel 9 (KJV)",
    verses: [
      { book: "2 Samuel", chapter: 9, verse: 1, text: "And David said, Is there yet any that is left of the house of Saul, that I may shew him kindness for Jonathan's sake?" },
      { book: "2 Samuel", chapter: 9, verse: 2, text: "And there was of the house of Saul a servant whose name was Ziba. And when they had called him unto David, the king said unto him, Art thou Ziba? And he said, Thy servant is he." },
      { book: "2 Samuel", chapter: 9, verse: 3, text: "And the king said, Is there not yet any of the house of Saul, that I may shew the kindness of God unto him? And Ziba said unto the king, Jonathan hath yet a son, which is lame on his feet." },
      { book: "2 Samuel", chapter: 9, verse: 4, text: "And the king said unto him, Where is he? And Ziba said unto the king, Behold, he is in the house of Machir, the son of Ammiel, in Lo-debar." },
      { book: "2 Samuel", chapter: 9, verse: 5, text: "Then king David sent, and fetched him out of the house of Machir, the son of Ammiel, from Lo-debar." },
      { book: "2 Samuel", chapter: 9, verse: 6, text: "Now when Mephibosheth, the son of Jonathan, the son of Saul, was come unto David, he fell on his face, and did reverence. And David said, Mephibosheth. And he answered, Behold thy servant!" },
      { book: "2 Samuel", chapter: 9, verse: 7, text: "And David said unto him, Fear not: for I will surely shew thee kindness for Jonathan thy father's sake, and will restore thee all the land of Saul thy father; and thou shalt eat bread at my table continually." },
      { book: "2 Samuel", chapter: 9, verse: 8, text: "And he bowed himself, and said, What is thy servant, that thou shouldest look upon such a dead dog as I am?" },
      { book: "2 Samuel", chapter: 9, verse: 9, text: "Then the king called to Ziba, Saul's servant, and said unto him, I have given unto thy master's son all that pertained to Saul and to all his house." },
      { book: "2 Samuel", chapter: 9, verse: 10, text: "Thou therefore, and thy sons, and thy servants, shall till the land for him, and thou shalt bring in the fruits, that thy master's son may have food to eat: but Mephibosheth thy master's son shall eat bread alway at my table. Now Ziba had fifteen sons and twenty servants." },
      { book: "2 Samuel", chapter: 9, verse: 11, text: "Then said Ziba unto the king, According to all that my lord the king hath commanded his servant, so shall thy servant do. As for Mephibosheth, said the king, he shall eat at my table, as one of the king's sons." },
      { book: "2 Samuel", chapter: 9, verse: 12, text: "And Mephibosheth had a young son, whose name was Micha. And all that dwelt in the house of Ziba were servants unto Mephibosheth." },
      { book: "2 Samuel", chapter: 9, verse: 13, text: "So Mephibosheth dwelt in Jerusalem: for he did eat continually at the king's table; and was lame on both his feet." },
    ],
  },
  {
    reference: "2 Corinthians 10 (KJV)",
    verses: [
      { book: "2 Corinthians", chapter: 10, verse: 1, text: "Now I Paul myself beseech you by the meekness and gentleness of Christ, who in presence am base among you, but being absent am bold toward you:" },
      { book: "2 Corinthians", chapter: 10, verse: 2, text: "But I beseech you, that I may not be bold when I am present with that confidence, wherewith I think to be bold against some, which think of us as if we walked according to the flesh." },
      { book: "2 Corinthians", chapter: 10, verse: 3, text: "For though we walk in the flesh, we do not war after the flesh:" },
      { book: "2 Corinthians", chapter: 10, verse: 4, text: "(For the weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds;)" },
      { book: "2 Corinthians", chapter: 10, verse: 5, text: "Casting down imaginations, and every high thing that exalteth itself against the knowledge of God, and bringing into captivity every thought to the obedience of Christ;" },
      { book: "2 Corinthians", chapter: 10, verse: 6, text: "And having in a readiness to revenge all disobedience, when your obedience is fulfilled." },
      { book: "2 Corinthians", chapter: 10, verse: 7, text: "Do ye look on things after the outward appearance? If any man trust to himself that he is Christ's, let him of himself think this again, that, as he is Christ's, even so are we Christ's." },
      { book: "2 Corinthians", chapter: 10, verse: 8, text: "For though I should boast somewhat more of our authority, which the Lord hath given us for edification, and not for your destruction, I should not be ashamed:" },
      { book: "2 Corinthians", chapter: 10, verse: 9, text: "That I may not seem as if I would terrify you by letters." },
      { book: "2 Corinthians", chapter: 10, verse: 10, text: "For his letters, say they, are weighty and powerful; but his bodily presence is weak, and his speech contemptible." },
      { book: "2 Corinthians", chapter: 10, verse: 11, text: "Let such an one think this, that, such as we are in word by letters when we are absent, such will we be also in deed when we are present." },
      { book: "2 Corinthians", chapter: 10, verse: 12, text: "For we dare not make ourselves of the number, or compare ourselves with some that commend themselves: but they measuring themselves by themselves, and comparing themselves among themselves, are not wise." },
      { book: "2 Corinthians", chapter: 10, verse: 13, text: "But we will not boast of things without our measure, but according to the measure of the rule which God hath distributed to us, a measure to reach even unto you." },
      { book: "2 Corinthians", chapter: 10, verse: 14, text: "For we stretch not ourselves beyond our measure, as though we reached not unto you: for we are come as far as to you also in preaching the gospel of Christ:" },
      { book: "2 Corinthians", chapter: 10, verse: 15, text: "Not boasting of things without our measure, that is, of other men's labours; but having hope, when your faith is increased, that we shall be enlarged by you according to our rule abundantly," },
      { book: "2 Corinthians", chapter: 10, verse: 16, text: "To preach the gospel in the regions beyond you, and not to boast in another man's line of things made ready to our hand." },
      { book: "2 Corinthians", chapter: 10, verse: 17, text: "But he that glorieth, let him glory in the Lord." },
      { book: "2 Corinthians", chapter: 10, verse: 18, text: "For not he that commendeth himself is approved, but whom the Lord commendeth." },
    ],
  },
  {
    reference: "Philippians 4 (KJV)",
    verses: [
      { book: "Philippians", chapter: 4, verse: 1, text: "Therefore, my brethren dearly beloved and longed for, my joy and crown, so stand fast in the Lord, my dearly beloved." },
      { book: "Philippians", chapter: 4, verse: 2, text: "I beseech Euodias, and beseech Syntyche, that they be of the same mind in the Lord." },
      { book: "Philippians", chapter: 4, verse: 3, text: "And I intreat thee also, true yokefellow, help those women which laboured with me in the gospel, with Clement also, and with other my fellowlabourers, whose names are in the book of life." },
      { book: "Philippians", chapter: 4, verse: 4, text: "Rejoice in the Lord alway: and again I say, Rejoice." },
      { book: "Philippians", chapter: 4, verse: 5, text: "Let your moderation be known unto all men. The Lord is at hand." },
      { book: "Philippians", chapter: 4, verse: 6, text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God." },
      { book: "Philippians", chapter: 4, verse: 7, text: "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus." },
      { book: "Philippians", chapter: 4, verse: 8, text: "Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things." },
      { book: "Philippians", chapter: 4, verse: 9, text: "Those things, which ye have both learned, and received, and heard, and seen in me, do: and the God of peace shall be with you." },
      { book: "Philippians", chapter: 4, verse: 10, text: "But I rejoiced in the Lord greatly, that now at the last your care of me hath flourished again; wherein ye were also careful, but ye lacked opportunity." },
      { book: "Philippians", chapter: 4, verse: 11, text: "Not that I speak in respect of want: for I have learned, in whatsoever state I am, therewith to be content." },
      { book: "Philippians", chapter: 4, verse: 12, text: "I know both how to be abased, and I know how to abound: every where and in all things I am instructed both to be full and to be hungry, both to abound and to suffer need." },
      { book: "Philippians", chapter: 4, verse: 13, text: "I can do all things through Christ which strengtheneth me." },
      { book: "Philippians", chapter: 4, verse: 14, text: "Notwithstanding ye have well done, that ye did communicate with my affliction." },
      { book: "Philippians", chapter: 4, verse: 15, text: "Now ye Philippians know also, that in the beginning of the gospel, when I departed from Macedonia, no church communicated with me as concerning giving and receiving, but ye only." },
      { book: "Philippians", chapter: 4, verse: 16, text: "For even in Thessalonica ye sent once and again unto my necessity." },
      { book: "Philippians", chapter: 4, verse: 17, text: "Not because I desire a gift: but I desire fruit that may abound to your account." },
      { book: "Philippians", chapter: 4, verse: 18, text: "But I have all, and abound: I am full, having received of Epaphroditus the things which were sent from you, an odour of a sweet smell, a sacrifice acceptable, wellpleasing to God." },
      { book: "Philippians", chapter: 4, verse: 19, text: "But my God shall supply all your need according to his riches in glory by Christ Jesus." },
      { book: "Philippians", chapter: 4, verse: 20, text: "Now unto God and our Father be glory for ever and ever. Amen." },
      { book: "Philippians", chapter: 4, verse: 21, text: "Salute every saint in Christ Jesus. The brethren which are with me greet you." },
      { book: "Philippians", chapter: 4, verse: 22, text: "All the saints salute you, chiefly they that are of Caesar's household." },
      { book: "Philippians", chapter: 4, verse: 23, text: "The grace of our Lord Jesus Christ be with you all. Amen." },
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
    reference: "Colossians 3 (KJV)",
    verses: [
      { book: "Colossians", chapter: 3, verse: 1, text: "If ye then be risen with Christ, seek those things which are above, where Christ sitteth on the right hand of God." },
      { book: "Colossians", chapter: 3, verse: 2, text: "Set your affection on things above, not on things on the earth." },
      { book: "Colossians", chapter: 3, verse: 3, text: "For ye are dead, and your life is hid with Christ in God." },
      { book: "Colossians", chapter: 3, verse: 4, text: "When Christ, who is our life, shall appear, then shall ye also appear with him in glory." },
      { book: "Colossians", chapter: 3, verse: 5, text: "Mortify therefore your members which are upon the earth; fornication, uncleanness, inordinate affection, evil concupiscence, and covetousness, which is idolatry:" },
      { book: "Colossians", chapter: 3, verse: 6, text: "For which things' sake the wrath of God cometh on the children of disobedience:" },
      { book: "Colossians", chapter: 3, verse: 7, text: "In the which ye also walked some time, when ye lived in them." },
      { book: "Colossians", chapter: 3, verse: 8, text: "But now ye also put off all these; anger, wrath, malice, blasphemy, filthy communication out of your mouth." },
      { book: "Colossians", chapter: 3, verse: 9, text: "Lie not one to another, seeing that ye have put off the old man with his deeds;" },
      { book: "Colossians", chapter: 3, verse: 10, text: "And have put on the new man, which is renewed in knowledge after the image of him that created him:" },
      { book: "Colossians", chapter: 3, verse: 11, text: "Where there is neither Greek nor Jew, circumcision nor uncircumcision, Barbarian, Scythian, bond nor free: but Christ is all, and in all." },
      { book: "Colossians", chapter: 3, verse: 12, text: "Put on therefore, as the elect of God, holy and beloved, bowels of mercies, kindness, humbleness of mind, meekness, longsuffering;" },
      { book: "Colossians", chapter: 3, verse: 13, text: "Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye." },
      { book: "Colossians", chapter: 3, verse: 14, text: "And above all these things put on charity, which is the bond of perfectness." },
      { book: "Colossians", chapter: 3, verse: 15, text: "And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful." },
      { book: "Colossians", chapter: 3, verse: 16, text: "Let the word of Christ dwell in you richly in all wisdom; teaching and admonishing one another in psalms and hymns and spiritual songs, singing with grace in your hearts to the Lord." },
      { book: "Colossians", chapter: 3, verse: 17, text: "And whatsoever ye do in word or deed, do all in the name of the Lord Jesus, giving thanks to God and the Father by him." },
      { book: "Colossians", chapter: 3, verse: 18, text: "Wives, submit yourselves unto your own husbands, as it is fit in the Lord." },
      { book: "Colossians", chapter: 3, verse: 19, text: "Husbands, love your wives, and be not bitter against them." },
      { book: "Colossians", chapter: 3, verse: 20, text: "Children, obey your parents in all things: for this is well pleasing unto the Lord." },
      { book: "Colossians", chapter: 3, verse: 21, text: "Fathers, provoke not your children to anger, lest they be discouraged." },
      { book: "Colossians", chapter: 3, verse: 22, text: "Servants, obey in all things your masters according to the flesh; not with eyeservice, as menpleasers; but in singleness of heart, fearing God:" },
      { book: "Colossians", chapter: 3, verse: 23, text: "And whatsoever ye do, do it heartily, as to the Lord, and not unto men;" },
      { book: "Colossians", chapter: 3, verse: 24, text: "Knowing that of the Lord ye shall receive the reward of the inheritance: for ye serve the Lord Christ." },
      { book: "Colossians", chapter: 3, verse: 25, text: "But he that doeth wrong shall receive for the wrong which he hath done: and there is no respect of persons." },
    ],
  },
  {
    reference: "Matthew 18 (KJV)",
    verses: [
      { book: "Matthew", chapter: 18, verse: 1, text: "At the same time came the disciples unto Jesus, saying, Who is the greatest in the kingdom of heaven?" },
      { book: "Matthew", chapter: 18, verse: 2, text: "And Jesus called a little child unto him, and set him in the midst of them," },
      { book: "Matthew", chapter: 18, verse: 3, text: "And said, Verily I say unto you, Except ye be converted, and become as little children, ye shall not enter into the kingdom of heaven." },
      { book: "Matthew", chapter: 18, verse: 4, text: "Whosoever therefore shall humble himself as this little child, the same is greatest in the kingdom of heaven." },
      { book: "Matthew", chapter: 18, verse: 5, text: "And whoso shall receive one such little child in my name receiveth me." },
      { book: "Matthew", chapter: 18, verse: 6, text: "But whoso shall offend one of these little ones which believe in me, it were better for him that a millstone were hanged about his neck, and that he were drowned in the depth of the sea." },
      { book: "Matthew", chapter: 18, verse: 7, text: "Woe unto the world because of offences! for it must needs be that offences come; but woe to that man by whom the offence cometh!" },
      { book: "Matthew", chapter: 18, verse: 8, text: "Wherefore if thy hand or thy foot offend thee, cut them off, and cast them from thee: it is better for thee to enter into life halt or maimed, rather than having two hands or two feet to be cast into everlasting fire." },
      { book: "Matthew", chapter: 18, verse: 9, text: "And if thine eye offend thee, pluck it out, and cast it from thee: it is better for thee to enter into life with one eye, rather than having two eyes to be cast into hell fire." },
      { book: "Matthew", chapter: 18, verse: 10, text: "Take heed that ye despise not one of these little ones; for I say unto you, That in heaven their angels do always behold the face of my Father which is in heaven." },
      { book: "Matthew", chapter: 18, verse: 11, text: "For the Son of man is come to save that which was lost." },
      { book: "Matthew", chapter: 18, verse: 12, text: "How think ye? if a man have an hundred sheep, and one of them be gone astray, doth he not leave the ninety and nine, and goeth into the mountains, and seeketh that which is gone astray?" },
      { book: "Matthew", chapter: 18, verse: 13, text: "And if so be that he find it, verily I say unto you, he rejoiceth more of that sheep, than of the ninety and nine which went not astray." },
      { book: "Matthew", chapter: 18, verse: 14, text: "Even so it is not the will of your Father which is in heaven, that one of these little ones should perish." },
      { book: "Matthew", chapter: 18, verse: 15, text: "Moreover if thy brother shall trespass against thee, go and tell him his fault between thee and him alone: if he shall hear thee, thou hast gained thy brother." },
      { book: "Matthew", chapter: 18, verse: 16, text: "But if he will not hear thee, then take with thee one or two more, that in the mouth of two or three witnesses every word may be established." },
      { book: "Matthew", chapter: 18, verse: 17, text: "And if he shall neglect to hear them, tell it unto the church: but if he neglect to hear the church, let him be unto thee as an heathen man and a publican." },
      { book: "Matthew", chapter: 18, verse: 18, text: "Verily I say unto you, Whatsoever ye shall bind on earth shall be bound in heaven: and whatsoever ye shall loose on earth shall be loosed in heaven." },
      { book: "Matthew", chapter: 18, verse: 19, text: "Again I say unto you, That if two of you shall agree on earth as touching any thing that they shall ask, it shall be done for them of my Father which is in heaven." },
      { book: "Matthew", chapter: 18, verse: 20, text: "For where two or three are gathered together in my name, there am I in the midst of them." },
      { book: "Matthew", chapter: 18, verse: 21, text: "Then came Peter to him, and said, Lord, how oft shall my brother sin against me, and I forgive him? till seven times?" },
      { book: "Matthew", chapter: 18, verse: 22, text: "Jesus saith unto him, I say not unto thee, Until seven times: but, Until seventy times seven." },
      { book: "Matthew", chapter: 18, verse: 23, text: "Therefore is the kingdom of heaven likened unto a certain king, which would take account of his servants." },
      { book: "Matthew", chapter: 18, verse: 24, text: "And when he had begun to reckon, one was brought unto him, which owed him ten thousand talents." },
      { book: "Matthew", chapter: 18, verse: 25, text: "But forasmuch as he had not to pay, his lord commanded him to be sold, and his wife, and children, and all that he had, and payment to be made." },
      { book: "Matthew", chapter: 18, verse: 26, text: "The servant therefore fell down, and worshipped him, saying, Lord, have patience with me, and I will pay thee all." },
      { book: "Matthew", chapter: 18, verse: 27, text: "Then the lord of that servant was moved with compassion, and loosed him, and forgave him the debt." },
      { book: "Matthew", chapter: 18, verse: 28, text: "But the same servant went out, and found one of his fellowservants, which owed him an hundred pence: and he laid hands on him, and took him by the throat, saying, Pay me that thou owest." },
      { book: "Matthew", chapter: 18, verse: 29, text: "And his fellowservant fell down at his feet, and besought him, saying, Have patience with me, and I will pay thee all." },
      { book: "Matthew", chapter: 18, verse: 30, text: "And he would not: but went and cast him into prison, till he should pay the debt." },
      { book: "Matthew", chapter: 18, verse: 31, text: "So when his fellowservants saw what was done, they were very sorry, and came and told unto their lord all that was done." },
      { book: "Matthew", chapter: 18, verse: 32, text: "Then his lord, after that he had called him, said unto him, O thou wicked servant, I forgave thee all that debt, because thou desiredst me:" },
      { book: "Matthew", chapter: 18, verse: 33, text: "Shouldest not thou also have had compassion on thy fellowservant, even as I had pity on thee?" },
      { book: "Matthew", chapter: 18, verse: 34, text: "And his lord was wroth, and delivered him to the tormentors, till he should pay all that was due unto him." },
      { book: "Matthew", chapter: 18, verse: 35, text: "So likewise shall my heavenly Father do also unto you, if ye from your hearts forgive not every one his brother their trespasses." },
    ],
  },
  {
    reference: "Psalm 103 (KJV)",
    verses: [
      { book: "Psalms", chapter: 103, verse: 1, text: "Bless the LORD, O my soul: and all that is within me, bless his holy name." },
      { book: "Psalms", chapter: 103, verse: 2, text: "Bless the LORD, O my soul, and forget not all his benefits:" },
      { book: "Psalms", chapter: 103, verse: 3, text: "Who forgiveth all thine iniquities; who healeth all thy diseases;" },
      { book: "Psalms", chapter: 103, verse: 4, text: "Who redeemeth thy life from destruction; who crowneth thee with lovingkindness and tender mercies;" },
      { book: "Psalms", chapter: 103, verse: 5, text: "Who satisfieth thy mouth with good things; so that thy youth is renewed like the eagle's." },
      { book: "Psalms", chapter: 103, verse: 6, text: "The LORD executeth righteousness and judgment for all that are oppressed." },
      { book: "Psalms", chapter: 103, verse: 7, text: "He made known his ways unto Moses, his acts unto the children of Israel." },
      { book: "Psalms", chapter: 103, verse: 8, text: "The LORD is merciful and gracious, slow to anger, and plenteous in mercy." },
      { book: "Psalms", chapter: 103, verse: 9, text: "He will not always chide: neither will he keep his anger for ever." },
      { book: "Psalms", chapter: 103, verse: 10, text: "He hath not dealt with us after our sins; nor rewarded us according to our iniquities." },
      { book: "Psalms", chapter: 103, verse: 11, text: "For as the heaven is high above the earth, so great is his mercy toward them that fear him." },
      { book: "Psalms", chapter: 103, verse: 12, text: "As far as the east is from the west, so far hath he removed our transgressions from us." },
      { book: "Psalms", chapter: 103, verse: 13, text: "Like as a father pitieth his children, so the LORD pitieth them that fear him." },
      { book: "Psalms", chapter: 103, verse: 14, text: "For he knoweth our frame; he remembereth that we are dust." },
      { book: "Psalms", chapter: 103, verse: 15, text: "As for man, his days are as grass: as a flower of the field, so he flourisheth." },
      { book: "Psalms", chapter: 103, verse: 16, text: "For the wind passeth over it, and it is gone; and the place thereof shall know it no more." },
      { book: "Psalms", chapter: 103, verse: 17, text: "But the mercy of the LORD is from everlasting to everlasting upon them that fear him, and his righteousness unto children's children;" },
      { book: "Psalms", chapter: 103, verse: 18, text: "To such as keep his covenant, and to those that remember his commandments to do them." },
      { book: "Psalms", chapter: 103, verse: 19, text: "The LORD hath prepared his throne in the heavens; and his kingdom ruleth over all." },
      { book: "Psalms", chapter: 103, verse: 20, text: "Bless the LORD, ye his angels, that excel in strength, that do his commandments, hearkening unto the voice of his word." },
      { book: "Psalms", chapter: 103, verse: 21, text: "Bless ye the LORD, all ye his hosts; ye ministers of his, that do his pleasure." },
      { book: "Psalms", chapter: 103, verse: 22, text: "Bless the LORD, all his works in all places of his dominion: bless the LORD, O my soul." },
    ],
  },
  {
    reference: "2 Samuel 12 (KJV)",
    verses: [
      { book: "2 Samuel", chapter: 12, verse: 1, text: "And the LORD sent Nathan unto David. And he came unto him, and said unto him, There were two men in one city; the one rich, and the other poor." },
      { book: "2 Samuel", chapter: 12, verse: 2, text: "The rich man had exceeding many flocks and herds:" },
      { book: "2 Samuel", chapter: 12, verse: 3, text: "But the poor man had nothing, save one little ewe lamb, which he had bought and nourished up: and it grew up together with him, and with his children; it did eat of his own meat, and drank of his own cup, and lay in his bosom, and was unto him as a daughter." },
      { book: "2 Samuel", chapter: 12, verse: 4, text: "And there came a traveller unto the rich man, and he spared to take of his own flock and of his own herd, to dress for the wayfaring man that was come unto him; but took the poor man's lamb, and dressed it for the man that was come to him." },
      { book: "2 Samuel", chapter: 12, verse: 5, text: "And David's anger was greatly kindled against the man; and he said to Nathan, As the LORD liveth, the man that hath done this thing shall surely die:" },
      { book: "2 Samuel", chapter: 12, verse: 6, text: "And he shall restore the lamb fourfold, because he did this thing, and because he had no pity." },
      { book: "2 Samuel", chapter: 12, verse: 7, text: "And Nathan said to David, Thou art the man. Thus saith the LORD God of Israel, I anointed thee king over Israel, and I delivered thee out of the hand of Saul;" },
      { book: "2 Samuel", chapter: 12, verse: 8, text: "And I gave thee thy master's house, and thy master's wives into thy bosom, and gave thee the house of Israel and of Judah; and if that had been too little, I would moreover have given unto thee such and such things." },
      { book: "2 Samuel", chapter: 12, verse: 9, text: "Wherefore hast thou despised the commandment of the LORD, to do evil in his sight? thou hast killed Uriah the Hittite with the sword, and hast taken his wife to be thy wife, and hast slain him with the sword of the children of Ammon." },
      { book: "2 Samuel", chapter: 12, verse: 10, text: "Now therefore the sword shall never depart from thine house; because thou hast despised me, and hast taken the wife of Uriah the Hittite to be thy wife." },
      { book: "2 Samuel", chapter: 12, verse: 11, text: "Thus saith the LORD, Behold, I will raise up evil against thee out of thine own house, and I will take thy wives before thine eyes, and give them unto thy neighbour, and he shall lie with thy wives in the sight of this sun." },
      { book: "2 Samuel", chapter: 12, verse: 12, text: "For thou didst it secretly: but I will do this thing before all Israel, and before the sun." },
      { book: "2 Samuel", chapter: 12, verse: 13, text: "And David said unto Nathan, I have sinned against the LORD. And Nathan said unto David, The LORD also hath put away thy sin; thou shalt not die." },
      { book: "2 Samuel", chapter: 12, verse: 14, text: "Howbeit, because by this deed thou hast given great occasion to the enemies of the LORD to blaspheme, the child also that is born unto thee shall surely die." },
      { book: "2 Samuel", chapter: 12, verse: 15, text: "And Nathan departed unto his house. And the LORD struck the child that Uriah's wife bare unto David, and it was very sick." },
      { book: "2 Samuel", chapter: 12, verse: 16, text: "David therefore besought God for the child; and David fasted, and went in, and lay all night upon the earth." },
      { book: "2 Samuel", chapter: 12, verse: 17, text: "And the elders of his house arose, and went to him, to raise him up from the earth: but he would not, neither did he eat bread with them." },
      { book: "2 Samuel", chapter: 12, verse: 18, text: "And it came to pass on the seventh day, that the child died. And the servants of David feared to tell him that the child was dead: for they said, Behold, while the child was yet alive, we spake unto him, and he would not hearken unto our voice: how will he then vex himself, if we tell him that the child is dead?" },
      { book: "2 Samuel", chapter: 12, verse: 19, text: "But when David saw that his servants whispered, David perceived that the child was dead: therefore David said unto his servants, Is the child dead? And they said, He is dead." },
      { book: "2 Samuel", chapter: 12, verse: 20, text: "Then David arose from the earth, and washed, and anointed himself, and changed his apparel, and came into the house of the LORD, and worshipped: then he came to his own house; and when he required, they set bread before him, and he did eat." },
      { book: "2 Samuel", chapter: 12, verse: 21, text: "Then said his servants unto him, What thing is this that thou hast done? thou didst fast and weep for the child, while it was alive; but when the child was dead, thou didst rise and eat bread." },
      { book: "2 Samuel", chapter: 12, verse: 22, text: "And he said, While the child was yet alive, I fasted and wept: for I said, Who can tell whether GOD will be gracious to me, that the child may live?" },
      { book: "2 Samuel", chapter: 12, verse: 23, text: "But now he is dead, wherefore should I fast? can I bring him back again? I shall go to him, but he shall not return to me." },
      { book: "2 Samuel", chapter: 12, verse: 24, text: "And David comforted Bath-sheba his wife, and went in unto her, and lay with her: and she bare a son, and he called his name Solomon: and the LORD loved him." },
      { book: "2 Samuel", chapter: 12, verse: 25, text: "And he sent by the hand of Nathan the prophet; and he called his name Jedidiah, because of the LORD." },
      { book: "2 Samuel", chapter: 12, verse: 26, text: "And Joab fought against Rabbah of the children of Ammon, and took the royal city." },
      { book: "2 Samuel", chapter: 12, verse: 27, text: "And Joab sent messengers to David, and said, I have fought against Rabbah, and have taken the city of waters." },
      { book: "2 Samuel", chapter: 12, verse: 28, text: "Now therefore gather the rest of the people together, and encamp against the city, and take it: lest I take the city, and it be called after my name." },
      { book: "2 Samuel", chapter: 12, verse: 29, text: "And David gathered all the people together, and went to Rabbah, and fought against it, and took it." },
      { book: "2 Samuel", chapter: 12, verse: 30, text: "And he took their king's crown from off his head, the weight whereof was a talent of gold with the precious stones: and it was set on David's head. And he brought forth the spoil of the city in great abundance." },
      { book: "2 Samuel", chapter: 12, verse: 31, text: "And he brought forth the people that were therein, and put them under saws, and under harrows of iron, and under axes of iron, and made them pass through the brickkiln: and thus did he unto all the cities of the children of Ammon. So David and all the people returned unto Jerusalem." },
    ],
  },
  {
    reference: "Psalm 32 (KJV)",
    verses: [
      { book: "Psalms", chapter: 32, verse: 1, text: "Blessed is he whose transgression is forgiven, whose sin is covered." },
      { book: "Psalms", chapter: 32, verse: 2, text: "Blessed is the man unto whom the LORD imputeth not iniquity, and in whose spirit there is no guile." },
      { book: "Psalms", chapter: 32, verse: 3, text: "When I kept silence, my bones waxed old through my roaring all the day long." },
      { book: "Psalms", chapter: 32, verse: 4, text: "For day and night thy hand was heavy upon me: my moisture is turned into the drought of summer. Selah." },
      { book: "Psalms", chapter: 32, verse: 5, text: "I acknowledged my sin unto thee, and mine iniquity have I not hid. I said, I will confess my transgressions unto the LORD; and thou forgavest the iniquity of my sin. Selah." },
      { book: "Psalms", chapter: 32, verse: 6, text: "For this shall every one that is godly pray unto thee in a time when thou mayest be found: surely in the floods of great waters they shall not come nigh unto him." },
      { book: "Psalms", chapter: 32, verse: 7, text: "Thou art my hiding place; thou shalt preserve me from trouble; thou shalt compass me about with songs of deliverance. Selah." },
      { book: "Psalms", chapter: 32, verse: 8, text: "I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye." },
      { book: "Psalms", chapter: 32, verse: 9, text: "Be ye not as the horse, or as the mule, which have no understanding: whose mouth must be held in with bit and bridle, lest they come near unto thee." },
      { book: "Psalms", chapter: 32, verse: 10, text: "Many sorrows shall be to the wicked: but he that trusteth in the LORD, mercy shall compass him about." },
      { book: "Psalms", chapter: 32, verse: 11, text: "Be glad in the LORD, and rejoice, ye righteous: and shout for joy, all ye that are upright in heart." },
    ],
  },
  {
    reference: "Philemon 1 (KJV)",
    verses: [
      { book: "Philemon", chapter: 1, verse: 1, text: "Paul, a prisoner of Jesus Christ, and Timothy our brother, unto Philemon our dearly beloved, and fellowlabourer," },
      { book: "Philemon", chapter: 1, verse: 2, text: "And to our beloved Apphia, and Archippus our fellowsoldier, and to the church in thy house:" },
      { book: "Philemon", chapter: 1, verse: 3, text: "Grace to you, and peace, from God our Father and the Lord Jesus Christ." },
      { book: "Philemon", chapter: 1, verse: 4, text: "I thank my God, making mention of thee always in my prayers," },
      { book: "Philemon", chapter: 1, verse: 5, text: "Hearing of thy love and faith, which thou hast toward the Lord Jesus, and toward all saints;" },
      { book: "Philemon", chapter: 1, verse: 6, text: "That the communication of thy faith may become effectual by the acknowledging of every good thing which is in you in Christ Jesus." },
      { book: "Philemon", chapter: 1, verse: 7, text: "For we have great joy and consolation in thy love, because the bowels of the saints are refreshed by thee, brother." },
      { book: "Philemon", chapter: 1, verse: 8, text: "Wherefore, though I might be much bold in Christ to enjoin thee that which is convenient," },
      { book: "Philemon", chapter: 1, verse: 9, text: "Yet for love's sake I rather beseech thee, being such an one as Paul the aged, and now also a prisoner of Jesus Christ." },
      { book: "Philemon", chapter: 1, verse: 10, text: "I beseech thee for my son Onesimus, whom I have begotten in my bonds:" },
      { book: "Philemon", chapter: 1, verse: 11, text: "Which in time past was to thee unprofitable, but now profitable to thee and to me:" },
      { book: "Philemon", chapter: 1, verse: 12, text: "Whom I have sent again: thou therefore receive him, that is, mine own bowels:" },
      { book: "Philemon", chapter: 1, verse: 13, text: "Whom I would have retained with me, that in thy stead he might have ministered unto me in the bonds of the gospel:" },
      { book: "Philemon", chapter: 1, verse: 14, text: "But without thy mind would I do nothing; that thy benefit should not be as it were of necessity, but willingly." },
      { book: "Philemon", chapter: 1, verse: 15, text: "For perhaps he therefore departed for a season, that thou shouldest receive him for ever;" },
      { book: "Philemon", chapter: 1, verse: 16, text: "Not now as a servant, but above a servant, a brother beloved, specially to me, but how much more unto thee, both in the flesh, and in the Lord?" },
      { book: "Philemon", chapter: 1, verse: 17, text: "If thou count me therefore a partner, receive him as myself." },
      { book: "Philemon", chapter: 1, verse: 18, text: "If he hath wronged thee, or oweth thee ought, put that on mine account;" },
      { book: "Philemon", chapter: 1, verse: 19, text: "I Paul have written it with mine own hand, I will repay it: albeit I do not say to thee how thou owest unto me even thine own self besides." },
      { book: "Philemon", chapter: 1, verse: 20, text: "Yea, brother, let me have joy of thee in the Lord: refresh my bowels in the Lord." },
      { book: "Philemon", chapter: 1, verse: 21, text: "Having confidence in thy obedience I wrote unto thee, knowing that thou wilt also do more than I say." },
      { book: "Philemon", chapter: 1, verse: 22, text: "But withal prepare me also a lodging: for I trust that through your prayers I shall be given unto you." },
      { book: "Philemon", chapter: 1, verse: 23, text: "There salute thee Epaphras, my fellowprisoner in Christ Jesus;" },
      { book: "Philemon", chapter: 1, verse: 24, text: "Marcus, Aristarchus, Demas, Lucas, my fellowlabourers." },
      { book: "Philemon", chapter: 1, verse: 25, text: "The grace of our Lord Jesus Christ be with your spirit. Amen." },
    ],
  },
  {
    reference: "James 2 (KJV)",
    verses: [
      { book: "James", chapter: 2, verse: 1, text: "My brethren, have not the faith of our Lord Jesus Christ, the Lord of glory, with respect of persons." },
      { book: "James", chapter: 2, verse: 2, text: "For if there come unto your assembly a man with a gold ring, in goodly apparel, and there come in also a poor man in vile raiment;" },
      { book: "James", chapter: 2, verse: 3, text: "And ye have respect to him that weareth the gay clothing, and say unto him, Sit thou here in a good place; and say to the poor, Stand thou there, or sit here under my footstool:" },
      { book: "James", chapter: 2, verse: 4, text: "Are ye not then partial in yourselves, and are become judges of evil thoughts?" },
      { book: "James", chapter: 2, verse: 5, text: "Hearken, my beloved brethren, Hath not God chosen the poor of this world rich in faith, and heirs of the kingdom which he hath promised to them that love him?" },
      { book: "James", chapter: 2, verse: 6, text: "But ye have despised the poor. Do not rich men oppress you, and draw you before the judgment seats?" },
      { book: "James", chapter: 2, verse: 7, text: "Do not they blaspheme that worthy name by the which ye are called?" },
      { book: "James", chapter: 2, verse: 8, text: "If ye fulfil the royal law according to the scripture, Thou shalt love thy neighbour as thyself, ye do well:" },
      { book: "James", chapter: 2, verse: 9, text: "But if ye have respect to persons, ye commit sin, and are convinced of the law as transgressors." },
      { book: "James", chapter: 2, verse: 10, text: "For whosoever shall keep the whole law, and yet offend in one point, he is guilty of all." },
      { book: "James", chapter: 2, verse: 11, text: "For he that said, Do not commit adultery, said also, Do not kill. Now if thou commit no adultery, yet if thou kill, thou art become a transgressor of the law." },
      { book: "James", chapter: 2, verse: 12, text: "So speak ye, and so do, as they that shall be judged by the law of liberty." },
      { book: "James", chapter: 2, verse: 13, text: "For he shall have judgment without mercy, that hath shewed no mercy; and mercy rejoiceth against judgment." },
      { book: "James", chapter: 2, verse: 14, text: "What doth it profit, my brethren, though a man say he hath faith, and have not works? can faith save him?" },
      { book: "James", chapter: 2, verse: 15, text: "If a brother or sister be naked, and destitute of daily food," },
      { book: "James", chapter: 2, verse: 16, text: "And one of you say unto them, Depart in peace, be ye warmed and filled; notwithstanding ye give them not those things which are needful to the body; what doth it profit?" },
      { book: "James", chapter: 2, verse: 17, text: "Even so faith, if it hath not works, is dead, being alone." },
      { book: "James", chapter: 2, verse: 18, text: "Yea, a man may say, Thou hast faith, and I have works: shew me thy faith without thy works, and I will shew thee my faith by my works." },
      { book: "James", chapter: 2, verse: 19, text: "Thou believest that there is one God; thou doest well: the devils also believe, and tremble." },
      { book: "James", chapter: 2, verse: 20, text: "But wilt thou know, O vain man, that faith without works is dead?" },
      { book: "James", chapter: 2, verse: 21, text: "Was not Abraham our father justified by works, when he had offered Isaac his son upon the altar?" },
      { book: "James", chapter: 2, verse: 22, text: "Seest thou how faith wrought with his works, and by works was faith made perfect?" },
      { book: "James", chapter: 2, verse: 23, text: "And the scripture was fulfilled which saith, Abraham believed God, and it was imputed unto him for righteousness: and he was called the Friend of God." },
      { book: "James", chapter: 2, verse: 24, text: "Ye see then how that by works a man is justified, and not by faith only." },
      { book: "James", chapter: 2, verse: 25, text: "Likewise also was not Rahab the harlot justified by works, when she had received the messengers, and had sent them out another way?" },
      { book: "James", chapter: 2, verse: 26, text: "For as the body without the spirit is dead, so faith without works is dead also." },
    ],
  },
  {
    reference: "Hebrews 11 (KJV)",
    verses: [
      { book: "Hebrews", chapter: 11, verse: 1, text: "Now faith is the substance of things hoped for, the evidence of things not seen." },
      { book: "Hebrews", chapter: 11, verse: 2, text: "For by it the elders obtained a good report." },
      { book: "Hebrews", chapter: 11, verse: 3, text: "Through faith we understand that the worlds were framed by the word of God, so that things which are seen were not made of things which do appear." },
      { book: "Hebrews", chapter: 11, verse: 4, text: "By faith Abel offered unto God a more excellent sacrifice than Cain, by which he obtained witness that he was righteous, God testifying of his gifts: and by it he being dead yet speaketh." },
      { book: "Hebrews", chapter: 11, verse: 5, text: "By faith Enoch was translated that he should not see death; and was not found, because God had translated him: for before his translation he had this testimony, that he pleased God." },
      { book: "Hebrews", chapter: 11, verse: 6, text: "But without faith it is impossible to please him: for he that cometh to God must believe that he is, and that he is a rewarder of them that diligently seek him." },
      { book: "Hebrews", chapter: 11, verse: 7, text: "By faith Noah, being warned of God of things not seen as yet, moved with fear, prepared an ark to the saving of his house; by the which he condemned the world, and became heir of the righteousness which is by faith." },
      { book: "Hebrews", chapter: 11, verse: 8, text: "By faith Abraham, when he was called to go out into a place which he should after receive for an inheritance, obeyed; and he went out, not knowing whither he went." },
      { book: "Hebrews", chapter: 11, verse: 9, text: "By faith he sojourned in the land of promise, as in a strange country, dwelling in tabernacles with Isaac and Jacob, the heirs with him of the same promise:" },
      { book: "Hebrews", chapter: 11, verse: 10, text: "For he looked for a city which hath foundations, whose builder and maker is God." },
      { book: "Hebrews", chapter: 11, verse: 11, text: "Through faith also Sara herself received strength to conceive seed, and was delivered of a child when she was past age, because she judged him faithful who had promised." },
      { book: "Hebrews", chapter: 11, verse: 12, text: "Therefore sprang there even of one, and him as good as dead, so many as the stars of the sky in multitude, and as the sand which is by the sea shore innumerable." },
      { book: "Hebrews", chapter: 11, verse: 13, text: "These all died in faith, not having received the promises, but having seen them afar off, and were persuaded of them, and embraced them, and confessed that they were strangers and pilgrims on the earth." },
      { book: "Hebrews", chapter: 11, verse: 14, text: "For they that say such things declare plainly that they seek a country." },
      { book: "Hebrews", chapter: 11, verse: 15, text: "And truly, if they had been mindful of that country from whence they came out, they might have had opportunity to have returned." },
      { book: "Hebrews", chapter: 11, verse: 16, text: "But now they desire a better country, that is, an heavenly: wherefore God is not ashamed to be called their God: for he hath prepared for them a city." },
      { book: "Hebrews", chapter: 11, verse: 17, text: "By faith Abraham, when he was tried, offered up Isaac: and he that had received the promises offered up his only begotten son," },
      { book: "Hebrews", chapter: 11, verse: 18, text: "Of whom it was said, That in Isaac shall thy seed be called:" },
      { book: "Hebrews", chapter: 11, verse: 19, text: "Accounting that God was able to raise him up, even from the dead; from whence also he received him in a figure." },
      { book: "Hebrews", chapter: 11, verse: 20, text: "By faith Isaac blessed Jacob and Esau concerning things to come." },
      { book: "Hebrews", chapter: 11, verse: 21, text: "By faith Jacob, when he was a dying, blessed both the sons of Joseph; and worshipped, leaning upon the top of his staff." },
      { book: "Hebrews", chapter: 11, verse: 22, text: "By faith Joseph, when he died, made mention of the departing of the children of Israel; and gave commandment concerning his bones." },
      { book: "Hebrews", chapter: 11, verse: 23, text: "By faith Moses, when he was born, was hid three months of his parents, because they saw he was a proper child; and they were not afraid of the king's commandment." },
      { book: "Hebrews", chapter: 11, verse: 24, text: "By faith Moses, when he was come to years, refused to be called the son of Pharaoh's daughter;" },
      { book: "Hebrews", chapter: 11, verse: 25, text: "Choosing rather to suffer affliction with the people of God, than to enjoy the pleasures of sin for a season;" },
      { book: "Hebrews", chapter: 11, verse: 26, text: "Esteeming the reproach of Christ greater riches than the treasures in Egypt: for he had respect unto the recompence of the reward." },
      { book: "Hebrews", chapter: 11, verse: 27, text: "By faith he forsook Egypt, not fearing the wrath of the king: for he endured, as seeing him who is invisible." },
      { book: "Hebrews", chapter: 11, verse: 28, text: "Through faith he kept the passover, and the sprinkling of blood, lest he that destroyed the firstborn should touch them." },
      { book: "Hebrews", chapter: 11, verse: 29, text: "By faith they passed through the Red sea as by dry land: which the Egyptians assaying to do were drowned." },
      { book: "Hebrews", chapter: 11, verse: 30, text: "By faith the walls of Jericho fell down, after they were compassed about seven days." },
      { book: "Hebrews", chapter: 11, verse: 31, text: "By faith the harlot Rahab perished not with them that believed not, when she had received the spies with peace." },
      { book: "Hebrews", chapter: 11, verse: 32, text: "And what shall I more say? for the time would fail me to tell of Gedeon, and of Barak, and of Samson, and of Jephthae; of David also, and Samuel, and of the prophets:" },
      { book: "Hebrews", chapter: 11, verse: 33, text: "Who through faith subdued kingdoms, wrought righteousness, obtained promises, stopped the mouths of lions," },
      { book: "Hebrews", chapter: 11, verse: 34, text: "Quenched the violence of fire, escaped the edge of the sword, out of weakness were made strong, waxed valiant in fight, turned to flight the armies of the aliens." },
      { book: "Hebrews", chapter: 11, verse: 35, text: "Women received their dead raised to life again: and others were tortured, not accepting deliverance; that they might obtain a better resurrection:" },
      { book: "Hebrews", chapter: 11, verse: 36, text: "And others had trial of cruel mockings and scourgings, yea, moreover of bonds and imprisonment:" },
      { book: "Hebrews", chapter: 11, verse: 37, text: "They were stoned, they were sawn asunder, were tempted, were slain with the sword: they wandered about in sheepskins and goatskins; being destitute, afflicted, tormented;" },
      { book: "Hebrews", chapter: 11, verse: 38, text: "(Of whom the world was not worthy:) they wandered in deserts, and in mountains, and in dens and caves of the earth." },
      { book: "Hebrews", chapter: 11, verse: 39, text: "And these all, having obtained a good report through faith, received not the promise:" },
      { book: "Hebrews", chapter: 11, verse: 40, text: "God having provided some better thing for us, that they without us should not be made perfect." },
    ],
  },
  {
    reference: "Romans 4 (KJV)",
    verses: [
      { book: "Romans", chapter: 4, verse: 1, text: "What shall we say then that Abraham our father, as pertaining to the flesh, hath found?" },
      { book: "Romans", chapter: 4, verse: 2, text: "For if Abraham were justified by works, he hath whereof to glory; but not before God." },
      { book: "Romans", chapter: 4, verse: 3, text: "For what saith the scripture? Abraham believed God, and it was counted unto him for righteousness." },
      { book: "Romans", chapter: 4, verse: 4, text: "Now to him that worketh is the reward not reckoned of grace, but of debt." },
      { book: "Romans", chapter: 4, verse: 5, text: "But to him that worketh not, but believeth on him that justifieth the ungodly, his faith is counted for righteousness." },
      { book: "Romans", chapter: 4, verse: 6, text: "Even as David also describeth the blessedness of the man, unto whom God imputeth righteousness without works," },
      { book: "Romans", chapter: 4, verse: 7, text: "Saying, Blessed are they whose iniquities are forgiven, and whose sins are covered." },
      { book: "Romans", chapter: 4, verse: 8, text: "Blessed is the man to whom the Lord will not impute sin." },
      { book: "Romans", chapter: 4, verse: 9, text: "Cometh this blessedness then upon the circumcision only, or upon the uncircumcision also? for we say that faith was reckoned to Abraham for righteousness." },
      { book: "Romans", chapter: 4, verse: 10, text: "How was it then reckoned? when he was in circumcision, or in uncircumcision? Not in circumcision, but in uncircumcision." },
      { book: "Romans", chapter: 4, verse: 11, text: "And he received the sign of circumcision, a seal of the righteousness of the faith which he had yet being uncircumcised: that he might be the father of all them that believe, though they be not circumcised; that righteousness might be imputed unto them also:" },
      { book: "Romans", chapter: 4, verse: 12, text: "And the father of circumcision to them who are not of the circumcision only, but who also walk in the steps of that faith of our father Abraham, which he had being yet uncircumcised." },
      { book: "Romans", chapter: 4, verse: 13, text: "For the promise, that he should be the heir of the world, was not to Abraham, or to his seed, through the law, but through the righteousness of faith." },
      { book: "Romans", chapter: 4, verse: 14, text: "For if they which are of the law be heirs, faith is made void, and the promise made of none effect:" },
      { book: "Romans", chapter: 4, verse: 15, text: "Because the law worketh wrath: for where no law is, there is no transgression." },
      { book: "Romans", chapter: 4, verse: 16, text: "Therefore it is of faith, that it might be by grace; to the end the promise might be sure to all the seed; not to that only which is of the law, but to that also which is of the faith of Abraham; who is the father of us all," },
      { book: "Romans", chapter: 4, verse: 17, text: "(As it is written, I have made thee a father of many nations,) before him whom he believed, even God, who quickeneth the dead, and calleth those things which be not as though they were." },
      { book: "Romans", chapter: 4, verse: 18, text: "Who against hope believed in hope, that he might become the father of many nations, according to that which was spoken, So shall thy seed be." },
      { book: "Romans", chapter: 4, verse: 19, text: "And being not weak in faith, he considered not his own body now dead, when he was about an hundred years old, neither yet the deadness of Sarah's womb:" },
      { book: "Romans", chapter: 4, verse: 20, text: "He staggered not at the promise of God through unbelief; but was strong in faith, giving glory to God;" },
      { book: "Romans", chapter: 4, verse: 21, text: "And being fully persuaded that, what he had promised, he was able also to perform." },
      { book: "Romans", chapter: 4, verse: 22, text: "And therefore it was imputed to him for righteousness." },
      { book: "Romans", chapter: 4, verse: 23, text: "Now it was not written for his sake alone, that it was imputed to him;" },
      { book: "Romans", chapter: 4, verse: 24, text: "But for us also, to whom it shall be imputed, if we believe on him that raised up Jesus our Lord from the dead;" },
      { book: "Romans", chapter: 4, verse: 25, text: "Who was delivered for our offences, and was raised again for our justification." },
    ],
  },
  {
    reference: "Mark 5 (KJV)",
    verses: [
      { book: "Mark", chapter: 5, verse: 1, text: "And they came over unto the other side of the sea, into the country of the Gadarenes." },
      { book: "Mark", chapter: 5, verse: 2, text: "And when he was come out of the ship, immediately there met him out of the tombs a man with an unclean spirit," },
      { book: "Mark", chapter: 5, verse: 3, text: "Who had his dwelling among the tombs; and no man could bind him, no, not with chains:" },
      { book: "Mark", chapter: 5, verse: 4, text: "Because that he had been often bound with fetters and chains, and the chains had been plucked asunder by him, and the fetters broken in pieces: neither could any man tame him." },
      { book: "Mark", chapter: 5, verse: 5, text: "And always, night and day, he was in the mountains, and in the tombs, crying, and cutting himself with stones." },
      { book: "Mark", chapter: 5, verse: 6, text: "But when he saw Jesus afar off, he ran and worshipped him," },
      { book: "Mark", chapter: 5, verse: 7, text: "And cried with a loud voice, and said, What have I to do with thee, Jesus, thou Son of the most high God? I adjure thee by God, that thou torment me not." },
      { book: "Mark", chapter: 5, verse: 8, text: "For he said unto him, Come out of the man, thou unclean spirit." },
      { book: "Mark", chapter: 5, verse: 9, text: "And he asked him, What is thy name? And he answered, saying, My name is Legion: for we are many." },
      { book: "Mark", chapter: 5, verse: 10, text: "And he besought him much that he would not send them away out of the country." },
      { book: "Mark", chapter: 5, verse: 11, text: "Now there was there nigh unto the mountains a great herd of swine feeding." },
      { book: "Mark", chapter: 5, verse: 12, text: "And all the devils besought him, saying, Send us into the swine, that we may enter into them." },
      { book: "Mark", chapter: 5, verse: 13, text: "And forthwith Jesus gave them leave. And the unclean spirits went out, and entered into the swine: and the herd ran violently down a steep place into the sea, (they were about two thousand;) and were choked in the sea." },
      { book: "Mark", chapter: 5, verse: 14, text: "And they that fed the swine fled, and told it in the city, and in the country. And they went out to see what it was that was done." },
      { book: "Mark", chapter: 5, verse: 15, text: "And they come to Jesus, and see him that was possessed with the devil, and had the legion, sitting, and clothed, and in his right mind: and they were afraid." },
      { book: "Mark", chapter: 5, verse: 16, text: "And they that saw it told them how it befell to him that was possessed with the devil, and also concerning the swine." },
      { book: "Mark", chapter: 5, verse: 17, text: "And they began to pray him to depart out of their coasts." },
      { book: "Mark", chapter: 5, verse: 18, text: "And when he was come into the ship, he that had been possessed with the devil prayed him that he might be with him." },
      { book: "Mark", chapter: 5, verse: 19, text: "Howbeit Jesus suffered him not, but saith unto him, Go home to thy friends, and tell them how great things the Lord hath done for thee, and hath had compassion on thee." },
      { book: "Mark", chapter: 5, verse: 20, text: "And he departed, and began to publish in Decapolis how great things Jesus had done for him: and all men did marvel." },
      { book: "Mark", chapter: 5, verse: 21, text: "And when Jesus was passed over again by ship unto the other side, much people gathered unto him: and he was nigh unto the sea." },
      { book: "Mark", chapter: 5, verse: 22, text: "And, behold, there cometh one of the rulers of the synagogue, Jairus by name; and when he saw him, he fell at his feet," },
      { book: "Mark", chapter: 5, verse: 23, text: "And besought him greatly, saying, My little daughter lieth at the point of death: I pray thee, come and lay thy hands on her, that she may be healed; and she shall live." },
      { book: "Mark", chapter: 5, verse: 24, text: "And Jesus went with him; and much people followed him, and thronged him." },
      { book: "Mark", chapter: 5, verse: 25, text: "And a certain woman, which had an issue of blood twelve years," },
      { book: "Mark", chapter: 5, verse: 26, text: "And had suffered many things of many physicians, and had spent all that she had, and was nothing bettered, but rather grew worse," },
      { book: "Mark", chapter: 5, verse: 27, text: "When she had heard of Jesus, came in the press behind, and touched his garment." },
      { book: "Mark", chapter: 5, verse: 28, text: "For she said, If I may touch but his clothes, I shall be whole." },
      { book: "Mark", chapter: 5, verse: 29, text: "And straightway the fountain of her blood was dried up; and she felt in her body that she was healed of that plague." },
      { book: "Mark", chapter: 5, verse: 30, text: "And Jesus, immediately knowing in himself that virtue had gone out of him, turned him about in the press, and said, Who touched my clothes?" },
      { book: "Mark", chapter: 5, verse: 31, text: "And his disciples said unto him, Thou seest the multitude thronging thee, and sayest thou, Who touched me?" },
      { book: "Mark", chapter: 5, verse: 32, text: "And he looked round about to see her that had done this thing." },
      { book: "Mark", chapter: 5, verse: 33, text: "But the woman fearing and trembling, knowing what was done in her, came and fell down before him, and told him all the truth." },
      { book: "Mark", chapter: 5, verse: 34, text: "And he said unto her, Daughter, thy faith hath made thee whole; go in peace, and be whole of thy plague." },
      { book: "Mark", chapter: 5, verse: 35, text: "While he yet spake, there came from the ruler of the synagogue's house certain which said, Thy daughter is dead: why troublest thou the Master any further?" },
      { book: "Mark", chapter: 5, verse: 36, text: "As soon as Jesus heard the word that was spoken, he saith unto the ruler of the synagogue, Be not afraid, only believe." },
      { book: "Mark", chapter: 5, verse: 37, text: "And he suffered no man to follow him, save Peter, and James, and John the brother of James." },
      { book: "Mark", chapter: 5, verse: 38, text: "And he cometh to the house of the ruler of the synagogue, and seeth the tumult, and them that wept and wailed greatly." },
      { book: "Mark", chapter: 5, verse: 39, text: "And when he was come in, he saith unto them, Why make ye this ado, and weep? the damsel is not dead, but sleepeth." },
      { book: "Mark", chapter: 5, verse: 40, text: "And they laughed him to scorn. But when he had put them all out, he taketh the father and the mother of the damsel, and them that were with him, and entereth in where the damsel was lying." },
      { book: "Mark", chapter: 5, verse: 41, text: "And he took the damsel by the hand, and said unto her, Talitha cumi; which is, being interpreted, Damsel, I say unto thee, arise." },
      { book: "Mark", chapter: 5, verse: 42, text: "And straightway the damsel arose, and walked; for she was of the age of twelve years. And they were astonished with a great astonishment." },
      { book: "Mark", chapter: 5, verse: 43, text: "And he charged them straitly that no man should know it; and commanded that something should be given her to eat." },
    ],
  },
  {
    reference: "Genesis 15 (KJV)",
    verses: [
      { book: "Genesis", chapter: 15, verse: 1, text: "After these things the word of the LORD came unto Abram in a vision, saying, Fear not, Abram: I am thy shield, and thy exceeding great reward." },
      { book: "Genesis", chapter: 15, verse: 2, text: "And Abram said, Lord GOD, what wilt thou give me, seeing I go childless, and the steward of my house is this Eliezer of Damascus?" },
      { book: "Genesis", chapter: 15, verse: 3, text: "And Abram said, Behold, to me thou hast given no seed: and, lo, one born in my house is mine heir." },
      { book: "Genesis", chapter: 15, verse: 4, text: "And, behold, the word of the LORD came unto him, saying, This shall not be thine heir; but he that shall come forth out of thine own bowels shall be thine heir." },
      { book: "Genesis", chapter: 15, verse: 5, text: "And he brought him forth abroad, and said, Look now toward heaven, and tell the stars, if thou be able to number them: and he said unto him, So shall thy seed be." },
      { book: "Genesis", chapter: 15, verse: 6, text: "And he believed in the LORD; and he counted it to him for righteousness." },
      { book: "Genesis", chapter: 15, verse: 7, text: "And he said unto him, I am the LORD that brought thee out of Ur of the Chaldees, to give thee this land to inherit it." },
      { book: "Genesis", chapter: 15, verse: 8, text: "And he said, Lord GOD, whereby shall I know that I shall inherit it?" },
      { book: "Genesis", chapter: 15, verse: 9, text: "And he said unto him, Take me an heifer of three years old, and a she goat of three years old, and a ram of three years old, and a turtledove, and a young pigeon." },
      { book: "Genesis", chapter: 15, verse: 10, text: "And he took unto him all these, and divided them in the midst, and laid each piece one against another: but the birds divided he not." },
      { book: "Genesis", chapter: 15, verse: 11, text: "And when the fowls came down upon the carcases, Abram drove them away." },
      { book: "Genesis", chapter: 15, verse: 12, text: "And when the sun was going down, a deep sleep fell upon Abram; and, lo, an horror of great darkness fell upon him." },
      { book: "Genesis", chapter: 15, verse: 13, text: "And he said unto Abram, Know of a surety that thy seed shall be a stranger in a land that is not theirs, and shall serve them; and they shall afflict them four hundred years;" },
      { book: "Genesis", chapter: 15, verse: 14, text: "And also that nation, whom they shall serve, will I judge: and afterward shall they come out with great substance." },
      { book: "Genesis", chapter: 15, verse: 15, text: "And thou shalt go to thy fathers in peace; thou shalt be buried in a good old age." },
      { book: "Genesis", chapter: 15, verse: 16, text: "But in the fourth generation they shall come hither again: for the iniquity of the Amorites is not yet full." },
      { book: "Genesis", chapter: 15, verse: 17, text: "And it came to pass, that, when the sun went down, and it was dark, behold a smoking furnace, and a burning lamp that passed between those pieces." },
      { book: "Genesis", chapter: 15, verse: 18, text: "In the same day the LORD made a covenant with Abram, saying, Unto thy seed have I given this land, from the river of Egypt unto the great river, the river Euphrates:" },
      { book: "Genesis", chapter: 15, verse: 19, text: "The Kenites, and the Kenizzites, and the Kadmonites," },
      { book: "Genesis", chapter: 15, verse: 20, text: "And the Hittites, and the Perizzites, and the Rephaims," },
      { book: "Genesis", chapter: 15, verse: 21, text: "And the Amorites, and the Canaanites, and the Girgashites, and the Jebusites." },
    ],
  },
  {
    reference: "Matthew 8 (KJV)",
    verses: [
      { book: "Matthew", chapter: 8, verse: 1, text: "When he was come down from the mountain, great multitudes followed him." },
      { book: "Matthew", chapter: 8, verse: 2, text: "And, behold, there came a leper and worshipped him, saying, Lord, if thou wilt, thou canst make me clean." },
      { book: "Matthew", chapter: 8, verse: 3, text: "And Jesus put forth his hand, and touched him, saying, I will; be thou clean. And immediately his leprosy was cleansed." },
      { book: "Matthew", chapter: 8, verse: 4, text: "And Jesus saith unto him, See thou tell no man; but go thy way, shew thyself to the priest, and offer the gift that Moses commanded, for a testimony unto them." },
      { book: "Matthew", chapter: 8, verse: 5, text: "And when Jesus was entered into Capernaum, there came unto him a centurion, beseeching him," },
      { book: "Matthew", chapter: 8, verse: 6, text: "And saying, Lord, my servant lieth at home sick of the palsy, grievously tormented." },
      { book: "Matthew", chapter: 8, verse: 7, text: "And Jesus saith unto him, I will come and heal him." },
      { book: "Matthew", chapter: 8, verse: 8, text: "The centurion answered and said, Lord, I am not worthy that thou shouldest come under my roof: but speak the word only, and my servant shall be healed." },
      { book: "Matthew", chapter: 8, verse: 9, text: "For I am a man under authority, having soldiers under me: and I say to this man, Go, and he goeth; and to another, Come, and he cometh; and to my servant, Do this, and he doeth it." },
      { book: "Matthew", chapter: 8, verse: 10, text: "When Jesus heard it, he marvelled, and said to them that followed, Verily I say unto you, I have not found so great faith, no, not in Israel." },
      { book: "Matthew", chapter: 8, verse: 11, text: "And I say unto you, That many shall come from the east and west, and shall sit down with Abraham, and Isaac, and Jacob, in the kingdom of heaven." },
      { book: "Matthew", chapter: 8, verse: 12, text: "But the children of the kingdom shall be cast out into outer darkness: there shall be weeping and gnashing of teeth." },
      { book: "Matthew", chapter: 8, verse: 13, text: "And Jesus said unto the centurion, Go thy way; and as thou hast believed, so be it done unto thee. And his servant was healed in the selfsame hour." },
      { book: "Matthew", chapter: 8, verse: 14, text: "And when Jesus was come into Peter's house, he saw his wife's mother laid, and sick of a fever." },
      { book: "Matthew", chapter: 8, verse: 15, text: "And he touched her hand, and the fever left her: and she arose, and ministered unto them." },
      { book: "Matthew", chapter: 8, verse: 16, text: "When the even was come, they brought unto him many that were possessed with devils: and he cast out the spirits with his word, and healed all that were sick:" },
      { book: "Matthew", chapter: 8, verse: 17, text: "That it might be fulfilled which was spoken by Esaias the prophet, saying, Himself took our infirmities, and bare our sicknesses." },
      { book: "Matthew", chapter: 8, verse: 18, text: "Now when Jesus saw great multitudes about him, he gave commandment to depart unto the other side." },
      { book: "Matthew", chapter: 8, verse: 19, text: "And a certain scribe came, and said unto him, Master, I will follow thee whithersoever thou goest." },
      { book: "Matthew", chapter: 8, verse: 20, text: "And Jesus saith unto him, The foxes have holes, and the birds of the air have nests; but the Son of man hath not where to lay his head." },
      { book: "Matthew", chapter: 8, verse: 21, text: "And another of his disciples said unto him, Lord, suffer me first to go and bury my father." },
      { book: "Matthew", chapter: 8, verse: 22, text: "But Jesus said unto him, Follow me; and let the dead bury their dead." },
      { book: "Matthew", chapter: 8, verse: 23, text: "And when he was entered into a ship, his disciples followed him." },
      { book: "Matthew", chapter: 8, verse: 24, text: "And, behold, there arose a great tempest in the sea, insomuch that the ship was covered with the waves: but he was asleep." },
      { book: "Matthew", chapter: 8, verse: 25, text: "And his disciples came to him, and awoke him, saying, Lord, save us: we perish." },
      { book: "Matthew", chapter: 8, verse: 26, text: "And he saith unto them, Why are ye fearful, O ye of little faith? Then he arose, and rebuked the winds and the sea; and there was a great calm." },
      { book: "Matthew", chapter: 8, verse: 27, text: "But the men marvelled, saying, What manner of man is this, that even the winds and the sea obey him!" },
      { book: "Matthew", chapter: 8, verse: 28, text: "And when he was come to the other side into the country of the Gergesenes, there met him two possessed with devils, coming out of the tombs, exceeding fierce, so that no man might pass by that way." },
      { book: "Matthew", chapter: 8, verse: 29, text: "And, behold, they cried out, saying, What have we to do with thee, Jesus, thou Son of God? art thou come hither to torment us before the time?" },
      { book: "Matthew", chapter: 8, verse: 30, text: "And there was a good way off from them an herd of many swine feeding." },
      { book: "Matthew", chapter: 8, verse: 31, text: "So the devils besought him, saying, If thou cast us out, suffer us to go away into the herd of swine." },
      { book: "Matthew", chapter: 8, verse: 32, text: "And he said unto them, Go. And when they were come out, they went into the herd of swine: and, behold, the whole herd of swine ran violently down a steep place into the sea, and perished in the waters." },
      { book: "Matthew", chapter: 8, verse: 33, text: "And they that kept them fled, and went their ways into the city, and told every thing, and what was befallen to the possessed of the devils." },
      { book: "Matthew", chapter: 8, verse: 34, text: "And, behold, the whole city came out to meet Jesus: and when they saw him, they besought him that he would depart out of their coasts." },
    ],
  },
  {
    reference: "Ephesians 2 (KJV)",
    verses: [
      { book: "Ephesians", chapter: 2, verse: 1, text: "And you hath he quickened, who were dead in trespasses and sins;" },
      { book: "Ephesians", chapter: 2, verse: 2, text: "Wherein in time past ye walked according to the course of this world, according to the prince of the power of the air, the spirit that now worketh in the children of disobedience:" },
      { book: "Ephesians", chapter: 2, verse: 3, text: "Among whom also we all had our conversation in times past in the lusts of our flesh, fulfilling the desires of the flesh and of the mind; and were by nature the children of wrath, even as others." },
      { book: "Ephesians", chapter: 2, verse: 4, text: "But God, who is rich in mercy, for his great love wherewith he loved us," },
      { book: "Ephesians", chapter: 2, verse: 5, text: "Even when we were dead in sins, hath quickened us together with Christ, (by grace ye are saved;)" },
      { book: "Ephesians", chapter: 2, verse: 6, text: "And hath raised us up together, and made us sit together in heavenly places in Christ Jesus:" },
      { book: "Ephesians", chapter: 2, verse: 7, text: "That in the ages to come he might shew the exceeding riches of his grace in his kindness toward us through Christ Jesus." },
      { book: "Ephesians", chapter: 2, verse: 8, text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God:" },
      { book: "Ephesians", chapter: 2, verse: 9, text: "Not of works, lest any man should boast." },
      { book: "Ephesians", chapter: 2, verse: 10, text: "For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them." },
      { book: "Ephesians", chapter: 2, verse: 11, text: "Wherefore remember, that ye being in time past Gentiles in the flesh, who are called Uncircumcision by that which is called the Circumcision in the flesh made by hands;" },
      { book: "Ephesians", chapter: 2, verse: 12, text: "That at that time ye were without Christ, being aliens from the commonwealth of Israel, and strangers from the covenants of promise, having no hope, and without God in the world:" },
      { book: "Ephesians", chapter: 2, verse: 13, text: "But now in Christ Jesus ye who sometimes were far off are made nigh by the blood of Christ." },
      { book: "Ephesians", chapter: 2, verse: 14, text: "For he is our peace, who hath made both one, and hath broken down the middle wall of partition between us;" },
      { book: "Ephesians", chapter: 2, verse: 15, text: "Having abolished in his flesh the enmity, even the law of commandments contained in ordinances; for to make in himself of twain one new man, so making peace;" },
      { book: "Ephesians", chapter: 2, verse: 16, text: "And that he might reconcile both unto God in one body by the cross, having slain the enmity thereby:" },
      { book: "Ephesians", chapter: 2, verse: 17, text: "And came and preached peace to you which were afar off, and to them that were nigh." },
      { book: "Ephesians", chapter: 2, verse: 18, text: "For through him we both have access by one Spirit unto the Father." },
      { book: "Ephesians", chapter: 2, verse: 19, text: "Now therefore ye are no more strangers and foreigners, but fellowcitizens with the saints, and of the household of God;" },
      { book: "Ephesians", chapter: 2, verse: 20, text: "And are built upon the foundation of the apostles and prophets, Jesus Christ himself being the chief corner stone;" },
      { book: "Ephesians", chapter: 2, verse: 21, text: "In whom all the building fitly framed together groweth unto an holy temple in the Lord:" },
      { book: "Ephesians", chapter: 2, verse: 22, text: "In whom ye also are builded together for an habitation of God through the Spirit." },
    ],
  },
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
    reference: "Luke 7 (KJV)",
    verses: [
      { book: "Luke", chapter: 7, verse: 1, text: "Now when he had ended all his sayings in the audience of the people, he entered into Capernaum." },
      { book: "Luke", chapter: 7, verse: 2, text: "And a certain centurion's servant, who was dear unto him, was sick, and ready to die." },
      { book: "Luke", chapter: 7, verse: 3, text: "And when he heard of Jesus, he sent unto him the elders of the Jews, beseeching him that he would come and heal his servant." },
      { book: "Luke", chapter: 7, verse: 4, text: "And when they came to Jesus, they besought him instantly, saying, That he was worthy for whom he should do this:" },
      { book: "Luke", chapter: 7, verse: 5, text: "For he loveth our nation, and he hath built us a synagogue." },
      { book: "Luke", chapter: 7, verse: 6, text: "Then Jesus went with them. And when he was now not far from the house, the centurion sent friends to him, saying unto him, Lord, trouble not thyself: for I am not worthy that thou shouldest enter under my roof:" },
      { book: "Luke", chapter: 7, verse: 7, text: "Wherefore neither thought I myself worthy to come unto thee: but say in a word, and my servant shall be healed." },
      { book: "Luke", chapter: 7, verse: 8, text: "For I also am a man set under authority, having under me soldiers, and I say unto one, Go, and he goeth; and to another, Come, and he cometh; and to my servant, Do this, and he doeth it." },
      { book: "Luke", chapter: 7, verse: 9, text: "When Jesus heard these things, he marvelled at him, and turned him about, and said unto the people that followed him, I say unto you, I have not found so great faith, no, not in Israel." },
      { book: "Luke", chapter: 7, verse: 10, text: "And they that were sent, returning to the house, found the servant whole that had been sick." },
      { book: "Luke", chapter: 7, verse: 11, text: "And it came to pass the day after, that he went into a city called Nain; and many of his disciples went with him, and much people." },
      { book: "Luke", chapter: 7, verse: 12, text: "Now when he came nigh to the gate of the city, behold, there was a dead man carried out, the only son of his mother, and she was a widow: and much people of the city was with her." },
      { book: "Luke", chapter: 7, verse: 13, text: "And when the Lord saw her, he had compassion on her, and said unto her, Weep not." },
      { book: "Luke", chapter: 7, verse: 14, text: "And he came and touched the bier: and they that bare him stood still. And he said, Young man, I say unto thee, Arise." },
      { book: "Luke", chapter: 7, verse: 15, text: "And he that was dead sat up, and began to speak. And he delivered him to his mother." },
      { book: "Luke", chapter: 7, verse: 16, text: "And there came a fear on all: and they glorified God, saying, That a great prophet is risen up among us; and, That God hath visited his people." },
      { book: "Luke", chapter: 7, verse: 17, text: "And this rumour of him went forth throughout all Judaea, and throughout all the region round about." },
      { book: "Luke", chapter: 7, verse: 18, text: "And the disciples of John shewed him of all these things." },
      { book: "Luke", chapter: 7, verse: 19, text: "And John calling unto him two of his disciples sent them to Jesus, saying, Art thou he that should come? or look we for another?" },
      { book: "Luke", chapter: 7, verse: 20, text: "When the men were come unto him, they said, John Baptist hath sent us unto thee, saying, Art thou he that should come? or look we for another?" },
      { book: "Luke", chapter: 7, verse: 21, text: "And in that same hour he cured many of their infirmities and plagues, and of evil spirits; and unto many that were blind he gave sight." },
      { book: "Luke", chapter: 7, verse: 22, text: "Then Jesus answering said unto them, Go your way, and tell John what things ye have seen and heard; how that the blind see, the lame walk, the lepers are cleansed, the deaf hear, the dead are raised, to the poor the gospel is preached." },
      { book: "Luke", chapter: 7, verse: 23, text: "And blessed is he, whosoever shall not be offended in me." },
      { book: "Luke", chapter: 7, verse: 24, text: "And when the messengers of John were departed, he began to speak unto the people concerning John, What went ye out into the wilderness for to see? A reed shaken with the wind?" },
      { book: "Luke", chapter: 7, verse: 25, text: "But what went ye out for to see? A man clothed in soft raiment? Behold, they which are gorgeously apparelled, and live delicately, are in kings courts." },
      { book: "Luke", chapter: 7, verse: 26, text: "But what went ye out for to see? A prophet? Yea, I say unto you, and much more than a prophet." },
      { book: "Luke", chapter: 7, verse: 27, text: "This is he, of whom it is written, Behold, I send my messenger before thy face, which shall prepare thy way before thee." },
      { book: "Luke", chapter: 7, verse: 28, text: "For I say unto you, Among those that are born of women there is not a greater prophet than John the Baptist: but he that is least in the kingdom of God is greater than he." },
      { book: "Luke", chapter: 7, verse: 29, text: "And all the people that heard him, and the publicans, justified God, being baptized with the baptism of John." },
      { book: "Luke", chapter: 7, verse: 30, text: "But the Pharisees and lawyers rejected the counsel of God against themselves, being not baptized of him." },
      { book: "Luke", chapter: 7, verse: 31, text: "And the Lord said, Whereunto then shall I liken the men of this generation? and to what are they like?" },
      { book: "Luke", chapter: 7, verse: 32, text: "They are like unto children sitting in the marketplace, and calling one to another, and saying, We have piped unto you, and ye have not danced; we have mourned to you, and ye have not wept." },
      { book: "Luke", chapter: 7, verse: 33, text: "For John the Baptist came neither eating bread nor drinking wine; and ye say, He hath a devil." },
      { book: "Luke", chapter: 7, verse: 34, text: "The Son of man is come eating and drinking; and ye say, Behold a gluttonous man, and a winebibber, a friend of publicans and sinners!" },
      { book: "Luke", chapter: 7, verse: 35, text: "But wisdom is justified of all her children." },
      { book: "Luke", chapter: 7, verse: 36, text: "And one of the Pharisees desired him that he would eat with him. And he went into the Pharisee's house, and sat down to meat." },
      { book: "Luke", chapter: 7, verse: 37, text: "And, behold, a woman in the city, which was a sinner, when she knew that Jesus sat at meat in the Pharisee's house, brought an alabaster box of ointment," },
      { book: "Luke", chapter: 7, verse: 38, text: "And stood at his feet behind him weeping, and began to wash his feet with tears, and did wipe them with the hairs of her head, and kissed his feet, and anointed them with the ointment." },
      { book: "Luke", chapter: 7, verse: 39, text: "Now when the Pharisee which had bidden him saw it, he spake within himself, saying, This man, if he were a prophet, would have known who and what manner of woman this is that toucheth him: for she is a sinner." },
      { book: "Luke", chapter: 7, verse: 40, text: "And Jesus answering said unto him, Simon, I have somewhat to say unto thee. And he saith, Master, say on." },
      { book: "Luke", chapter: 7, verse: 41, text: "There was a certain creditor which had two debtors: the one owed five hundred pence, and the other fifty." },
      { book: "Luke", chapter: 7, verse: 42, text: "And when they had nothing to pay, he frankly forgave them both. Tell me therefore, which of them will love him most?" },
      { book: "Luke", chapter: 7, verse: 43, text: "Simon answered and said, I suppose that he, to whom he forgave most. And he said unto him, Thou hast rightly judged." },
      { book: "Luke", chapter: 7, verse: 44, text: "And he turned to the woman, and said unto Simon, Seest thou this woman? I entered into thine house, thou gavest me no water for my feet: but she hath washed my feet with tears, and wiped them with the hairs of her head." },
      { book: "Luke", chapter: 7, verse: 45, text: "Thou gavest me no kiss: but this woman since the time I came in hath not ceased to kiss my feet." },
      { book: "Luke", chapter: 7, verse: 46, text: "My head with oil thou didst not anoint: but this woman hath anointed my feet with ointment." },
      { book: "Luke", chapter: 7, verse: 47, text: "Wherefore I say unto thee, Her sins, which are many, are forgiven; for she loved much: but to whom little is forgiven, the same loveth little." },
      { book: "Luke", chapter: 7, verse: 48, text: "And he said unto her, Thy sins are forgiven." },
      { book: "Luke", chapter: 7, verse: 49, text: "And they that sat at meat with him began to say within themselves, Who is this that forgiveth sins also?" },
      { book: "Luke", chapter: 7, verse: 50, text: "And he said to the woman, Thy faith hath saved thee; go in peace." },
    ],
  },
  {
    reference: "John 8 (KJV)",
    verses: [
      { book: "John", chapter: 8, verse: 1, text: "Jesus went unto the mount of Olives." },
      { book: "John", chapter: 8, verse: 2, text: "And early in the morning he came again into the temple, and all the people came unto him; and he sat down, and taught them." },
      { book: "John", chapter: 8, verse: 3, text: "And the scribes and Pharisees brought unto him a woman taken in adultery; and when they had set her in the midst," },
      { book: "John", chapter: 8, verse: 4, text: "They say unto him, Master, this woman was taken in adultery, in the very act." },
      { book: "John", chapter: 8, verse: 5, text: "Now Moses in the law commanded us, that such should be stoned: but what sayest thou?" },
      { book: "John", chapter: 8, verse: 6, text: "This they said, tempting him, that they might have to accuse him. But Jesus stooped down, and with his finger wrote on the ground, as though he heard them not." },
      { book: "John", chapter: 8, verse: 7, text: "So when they continued asking him, he lifted up himself, and said unto them, He that is without sin among you, let him first cast a stone at her." },
      { book: "John", chapter: 8, verse: 8, text: "And again he stooped down, and wrote on the ground." },
      { book: "John", chapter: 8, verse: 9, text: "And they which heard it, being convicted by their own conscience, went out one by one, beginning at the eldest, even unto the last: and Jesus was left alone, and the woman standing in the midst." },
      { book: "John", chapter: 8, verse: 10, text: "When Jesus had lifted up himself, and saw none but the woman, he said unto her, Woman, where are those thine accusers? hath no man condemned thee?" },
      { book: "John", chapter: 8, verse: 11, text: "She said, No man, Lord. And Jesus said unto her, Neither do I condemn thee: go, and sin no more." },
      { book: "John", chapter: 8, verse: 12, text: "Then spake Jesus again unto them, saying, I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life." },
      { book: "John", chapter: 8, verse: 13, text: "The Pharisees therefore said unto him, Thou bearest record of thyself; thy record is not true." },
      { book: "John", chapter: 8, verse: 14, text: "Jesus answered and said unto them, Though I bear record of myself, yet my record is true: for I know whence I came, and whither I go; but ye cannot tell whence I come, and whither I go." },
      { book: "John", chapter: 8, verse: 15, text: "Ye judge after the flesh; I judge no man." },
      { book: "John", chapter: 8, verse: 16, text: "And yet if I judge, my judgment is true: for I am not alone, but I and the Father that sent me." },
      { book: "John", chapter: 8, verse: 17, text: "It is also written in your law, that the testimony of two men is true." },
      { book: "John", chapter: 8, verse: 18, text: "I am one that bear witness of myself, and the Father that sent me beareth witness of me." },
      { book: "John", chapter: 8, verse: 19, text: "Then said they unto him, Where is thy Father? Jesus answered, Ye neither know me, nor my Father: if ye had known me, ye should have known my Father also." },
      { book: "John", chapter: 8, verse: 20, text: "These words spake Jesus in the treasury, as he taught in the temple: and no man laid hands on him; for his hour was not yet come." },
      { book: "John", chapter: 8, verse: 21, text: "Then said Jesus again unto them, I go my way, and ye shall seek me, and shall die in your sins: whither I go, ye cannot come." },
      { book: "John", chapter: 8, verse: 22, text: "Then said the Jews, Will he kill himself? because he saith, Whither I go, ye cannot come." },
      { book: "John", chapter: 8, verse: 23, text: "And he said unto them, Ye are from beneath; I am from above: ye are of this world; I am not of this world." },
      { book: "John", chapter: 8, verse: 24, text: "I said therefore unto you, that ye shall die in your sins: for if ye believe not that I am he, ye shall die in your sins." },
      { book: "John", chapter: 8, verse: 25, text: "Then said they unto him, Who art thou? And Jesus saith unto them, Even the same that I said unto you from the beginning." },
      { book: "John", chapter: 8, verse: 26, text: "I have many things to say and to judge of you: but he that sent me is true; and I speak to the world those things which I have heard of him." },
      { book: "John", chapter: 8, verse: 27, text: "They understood not that he spake to them of the Father." },
      { book: "John", chapter: 8, verse: 28, text: "Then said Jesus unto them, When ye have lifted up the Son of man, then shall ye know that I am he, and that I do nothing of myself; but as my Father hath taught me, I speak these things." },
      { book: "John", chapter: 8, verse: 29, text: "And he that sent me is with me: the Father hath not left me alone; for I do always those things that please him." },
      { book: "John", chapter: 8, verse: 30, text: "As he spake these words, many believed on him." },
      { book: "John", chapter: 8, verse: 31, text: "Then said Jesus to those Jews which believed on him, If ye continue in my word, then are ye my disciples indeed;" },
      { book: "John", chapter: 8, verse: 32, text: "And ye shall know the truth, and the truth shall make you free." },
      { book: "John", chapter: 8, verse: 33, text: "They answered him, We be Abraham's seed, and were never in bondage to any man: how sayest thou, Ye shall be made free?" },
      { book: "John", chapter: 8, verse: 34, text: "Jesus answered them, Verily, verily, I say unto you, Whosoever committeth sin is the servant of sin." },
      { book: "John", chapter: 8, verse: 35, text: "And the servant abideth not in the house for ever: but the Son abideth ever." },
      { book: "John", chapter: 8, verse: 36, text: "If the Son therefore shall make you free, ye shall be free indeed." },
      { book: "John", chapter: 8, verse: 37, text: "I know that ye are Abraham's seed; but ye seek to kill me, because my word hath no place in you." },
      { book: "John", chapter: 8, verse: 38, text: "I speak that which I have seen with my Father: and ye do that which ye have seen with your father." },
      { book: "John", chapter: 8, verse: 39, text: "They answered and said unto him, Abraham is our father. Jesus saith unto them, If ye were Abraham's children, ye would do the works of Abraham." },
      { book: "John", chapter: 8, verse: 40, text: "But now ye seek to kill me, a man that hath told you the truth, which I have heard of God: this did not Abraham." },
      { book: "John", chapter: 8, verse: 41, text: "Ye do the deeds of your father. Then said they to him, We be not born of fornication; we have one Father, even God." },
      { book: "John", chapter: 8, verse: 42, text: "Jesus said unto them, If God were your Father, ye would love me: for I proceeded forth and came from God; neither came I of myself, but he sent me." },
      { book: "John", chapter: 8, verse: 43, text: "Why do ye not understand my speech? even because ye cannot hear my word." },
      { book: "John", chapter: 8, verse: 44, text: "Ye are of your father the devil, and the lusts of your father ye will do. He was a murderer from the beginning, and abode not in the truth, because there is no truth in him. When he speaketh a lie, he speaketh of his own: for he is a liar, and the father of it." },
      { book: "John", chapter: 8, verse: 45, text: "And because I tell you the truth, ye believe me not." },
      { book: "John", chapter: 8, verse: 46, text: "Which of you convinceth me of sin? And if I say the truth, why do ye not believe me?" },
      { book: "John", chapter: 8, verse: 47, text: "He that is of God heareth God's words: ye therefore hear them not, because ye are not of God." },
      { book: "John", chapter: 8, verse: 48, text: "Then answered the Jews, and said unto him, Say we not well that thou art a Samaritan, and hast a devil?" },
      { book: "John", chapter: 8, verse: 49, text: "Jesus answered, I have not a devil; but I honour my Father, and ye do dishonour me." },
      { book: "John", chapter: 8, verse: 50, text: "And I seek not mine own glory: there is one that seeketh and judgeth." },
      { book: "John", chapter: 8, verse: 51, text: "Verily, verily, I say unto you, If a man keep my saying, he shall never see death." },
      { book: "John", chapter: 8, verse: 52, text: "Then said the Jews unto him, Now we know that thou hast a devil. Abraham is dead, and the prophets; and thou sayest, If a man keep my saying, he shall never taste of death." },
      { book: "John", chapter: 8, verse: 53, text: "Art thou greater than our father Abraham, which is dead? and the prophets are dead: whom makest thou thyself?" },
      { book: "John", chapter: 8, verse: 54, text: "Jesus answered, If I honour myself, my honour is nothing: it is my Father that honoureth me; of whom ye say, that he is your God:" },
      { book: "John", chapter: 8, verse: 55, text: "Yet ye have not known him; but I know him: and if I should say, I know him not, I shall be a liar like unto you: but I know him, and keep his saying." },
      { book: "John", chapter: 8, verse: 56, text: "Your father Abraham rejoiced to see my day: and he saw it, and was glad." },
      { book: "John", chapter: 8, verse: 57, text: "Then said the Jews unto him, Thou art not yet fifty years old, and hast thou seen Abraham?" },
      { book: "John", chapter: 8, verse: 58, text: "Jesus said unto them, Verily, verily, I say unto you, Before Abraham was, I am." },
      { book: "John", chapter: 8, verse: 59, text: "Then took they up stones to cast at him: but Jesus hid himself, and went out of the temple, going through the midst of them, and so passed by." },
    ],
  },
  {
    reference: "Song of Solomon 2",
    verses: [
      { book: "Song of Solomon", chapter: 2, verse: 1, text: "I am a rose of Sharon, a lily of the valleys." },
      { book: "Song of Solomon", chapter: 2, verse: 2, text: "As a lily among thorns, so is my love among the daughters." },
      { book: "Song of Solomon", chapter: 2, verse: 3, text: "As the apple tree among the trees of the wood, so is my beloved among the sons. I sat down under his shadow with great delight, his fruit was sweet to my taste." },
      { book: "Song of Solomon", chapter: 2, verse: 4, text: "He brought me to the banquet hall. His banner over me is love." },
      { book: "Song of Solomon", chapter: 2, verse: 5, text: "Strengthen me with raisins, refresh me with apples; For I am faint with love." },
      { book: "Song of Solomon", chapter: 2, verse: 6, text: "His left hand is under my head. His right hand embraces me." },
      { book: "Song of Solomon", chapter: 2, verse: 7, text: "I adjure you, daughters of Jerusalem, by the roes, or by the hinds of the field, that you not stir up, nor awaken love, until it so desires." },
      { book: "Song of Solomon", chapter: 2, verse: 8, text: "The voice of my beloved! Behold, he comes, leaping on the mountains, skipping on the hills." },
      { book: "Song of Solomon", chapter: 2, verse: 9, text: "My beloved is like a roe or a young deer. Behold, he stands behind our wall! He looks in at the windows. He glances through the lattice." },
      { book: "Song of Solomon", chapter: 2, verse: 10, text: "My beloved spoke, and said to me, Rise up, my love, my beautiful one, and come away." },
      { book: "Song of Solomon", chapter: 2, verse: 11, text: "For, behold, the winter is past. The rain is over and gone." },
      { book: "Song of Solomon", chapter: 2, verse: 12, text: "The flowers appear on the earth. The time of the singing has come, and the voice of the turtledove is heard in our land." },
      { book: "Song of Solomon", chapter: 2, verse: 13, text: "The fig tree ripens her green figs. The vines are in blossom. They give out their fragrance. Arise, my love, my beautiful one, and come away." },
      { book: "Song of Solomon", chapter: 2, verse: 14, text: "My dove in the clefts of the rock, In the hiding places of the mountainside, Let me see your face. Let me hear your voice; for your voice is sweet, and your face is lovely." },
      { book: "Song of Solomon", chapter: 2, verse: 15, text: "Catch for us the foxes, the little foxes that plunder the vineyards; for our vineyards are in blossom." },
      { book: "Song of Solomon", chapter: 2, verse: 16, text: "My beloved is mine, and I am his. He browses among the lilies." },
      { book: "Song of Solomon", chapter: 2, verse: 17, text: "Until the day is cool, and the shadows flee away, turn, my beloved, and be like a roe or a young deer on the mountains of Bether." },
    ],
  },
  {
    reference: "Ephesians 3 (KJV)",
    verses: [
      { book: "Ephesians", chapter: 3, verse: 1, text: "For this cause I Paul, the prisoner of Jesus Christ for you Gentiles," },
      { book: "Ephesians", chapter: 3, verse: 2, text: "If ye have heard of the dispensation of the grace of God which is given me to youward:" },
      { book: "Ephesians", chapter: 3, verse: 3, text: "How that by revelation he made known unto me the mystery; (as I wrote afore in few words," },
      { book: "Ephesians", chapter: 3, verse: 4, text: "Whereby, when ye read, ye may understand my knowledge in the mystery of Christ)" },
      { book: "Ephesians", chapter: 3, verse: 5, text: "Which in other ages was not made known unto the sons of men, as it is now revealed unto his holy apostles and prophets by the Spirit;" },
      { book: "Ephesians", chapter: 3, verse: 6, text: "That the Gentiles should be fellowheirs, and of the same body, and partakers of his promise in Christ by the gospel:" },
      { book: "Ephesians", chapter: 3, verse: 7, text: "Whereof I was made a minister, according to the gift of the grace of God given unto me by the effectual working of his power." },
      { book: "Ephesians", chapter: 3, verse: 8, text: "Unto me, who am less than the least of all saints, is this grace given, that I should preach among the Gentiles the unsearchable riches of Christ;" },
      { book: "Ephesians", chapter: 3, verse: 9, text: "And to make all men see what is the fellowship of the mystery, which from the beginning of the world hath been hid in God, who created all things by Jesus Christ:" },
      { book: "Ephesians", chapter: 3, verse: 10, text: "To the intent that now unto the principalities and powers in heavenly places might be known by the church the manifold wisdom of God," },
      { book: "Ephesians", chapter: 3, verse: 11, text: "According to the eternal purpose which he purposed in Christ Jesus our Lord:" },
      { book: "Ephesians", chapter: 3, verse: 12, text: "In whom we have boldness and access with confidence by the faith of him." },
      { book: "Ephesians", chapter: 3, verse: 13, text: "Wherefore I desire that ye faint not at my tribulations for you, which is your glory." },
      { book: "Ephesians", chapter: 3, verse: 14, text: "For this cause I bow my knees unto the Father of our Lord Jesus Christ," },
      { book: "Ephesians", chapter: 3, verse: 15, text: "Of whom the whole family in heaven and earth is named," },
      { book: "Ephesians", chapter: 3, verse: 16, text: "That he would grant you, according to the riches of his glory, to be strengthened with might by his Spirit in the inner man;" },
      { book: "Ephesians", chapter: 3, verse: 17, text: "That Christ may dwell in your hearts by faith; that ye, being rooted and grounded in love," },
      { book: "Ephesians", chapter: 3, verse: 18, text: "May be able to comprehend with all saints what is the breadth, and length, and depth, and height;" },
      { book: "Ephesians", chapter: 3, verse: 19, text: "And to know the love of Christ, which passeth knowledge, that ye might be filled with all the fulness of God." },
      { book: "Ephesians", chapter: 3, verse: 20, text: "Now unto him that is able to do exceeding abundantly above all that we ask or think, according to the power that worketh in us," },
      { book: "Ephesians", chapter: 3, verse: 21, text: "Unto him be glory in the church by Christ Jesus throughout all ages, world without end. Amen." },
    ],
  },
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
