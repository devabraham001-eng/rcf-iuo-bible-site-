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
          {PASSAGES.slice(0, 1).map((passage) => (
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
            {PASSAGES.slice(1).map((passage) => (
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
