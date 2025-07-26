import mongoose from 'mongoose';
import Grammar from './Grammar.js';

// !! IMPORTANT !! Use the same MongoDB connection string as in server.js
const dbURI = 'mongodb+srv://Mukshith:123@cluster0.aivozly.mongodb.net/grammar-hub?retryWrites=true&w=majority&appName=Cluster0';

// --- DATA MERGED INTO SINGLE STRINGS ---
const initialData = [
    // Tenses
    { 
        category: 'tense', 
        title: "Simple Present", 
        definition: "Used for habits, general truths, repeated actions or unchanging situations, emotions and wishes./பழக்கங்கள், பொதுவான உண்மைகள், மீண்டும் மீண்டும் நடக்கும் செயல்கள், மாறாத நிலைகள், உணர்ச்சிகள் மற்றும் ஆசைகளுக்கு பயன்படுத்தப்படுகிறது.", 
        examples: [
            "I work in London. /நான் லண்டனில் வேலை செய்கிறேன்.",
            "The sun rises in the east. /சூரியன் கிழக்கில் உதிக்கிறது.",
            "She loves chocolate. /அவள் சாக்லேட்டை விரும்புகிறாள்."
        ], 
        notes: "Often used with adverbs of frequency like always, usually, often, sometimes, rarely, never."
    },
    { 
        category: 'tense', 
        title: "Present Continuous", 
        definition: "Used for actions happening now or around now, and for future arrangements./இப்போது அல்லது இப்போது நடைபெறும் செயல்களுக்கு மற்றும் எதிர்கால ஏற்பாடுகளுக்கு பயன்படுத்தப்படுகிறது.", 
        examples: [
            "I am studying English now. /நான் இப்போது ஆங்கிலம் படித்து கொண்டிருக்கிறேன்.", 
            "They are playing football at the moment. /அவர்கள் இப்போது கால்பந்து விளையாடி கொண்டிருக்கிறார்கள்.", 
            "She is meeting her friends tomorrow. /அவள் நாளை தன் நண்பர்களை சந்தித்து கொண்டிருப்பாள்."
        ], 
        notes: "Formed with am/is/are + present participle (-ing form)."
    },
    { 
        category: 'tense', 
        title: "Present Perfect", 
        definition: "Used for actions that happened at an unspecified time before now, or actions that started in the past and continue to the present./குறிப்பிடப்படாத நேரத்தில் நடந்த செயல்களுக்கு அல்லது கடந்த காலத்தில் தொடங்கி இப்போது வரை தொடரும் செயல்களுக்கு பயன்படுத்தப்படுகிறது.", 
        examples: [
            "I have seen that movie twenty times. /நான் அந்த திரைப்படத்தை இருபது முறை பார்த்திருக்கிறேன்.", 
            "She has lived in Berlin for five years. /அவள் பெர்லினில் ஐந்து ஆண்டுகளாக வாழ்ந்து வருகிறாள்.", 
            "We have known each other since childhood. /நாங்கள் சிறு வயதிலிருந்து ஒருவரையொருவர் அறிந்திருக்கிறோம்."
        ], 
        notes: "Formed with have/has + past participle."
    },
    { 
        category: 'tense', 
        title: "Present Perfect Continuous", 
        definition: "Used for actions that started in the past and continue to the present, or recently stopped actions with visible results./கடந்த காலத்தில் தொடங்கி இப்போது வரை தொடரும் செயல்களுக்கு அல்லது புலப்படும் முடிவுகளுடன் சமீபத்தில் நிறுத்தப்பட்ட செயல்களுக்கு பயன்படுத்தப்படுகிறது.", 
        examples: [
            "I have been working here for two years. /நான் இங்கு இரண்டு ஆண்டுகளாக பணிபுரிந்து கொண்டிருக்கிறேன்.", 
            "She has been studying all day. /அவள் முழு நாளும் படித்து கொண்டிருக்கிறாள்.", 
            "Your eyes are red. Have you been crying? /உங்கள் கண்கள் சிவந்துள்ளன. நீங்கள் அழுது கொண்டிருந்தீர்களா?"
        ], 
        notes: "Formed with have/has + been + present participle."
    },
    { 
        category: 'tense', 
        title: "Simple Past", 
        definition: "Used for completed actions in the past at a specific time./கடந்த காலத்தில் குறிப்பிட்ட நேரத்தில் முடிந்த செயல்களுக்கு பயன்படுத்தப்படுகிறது.", 
        examples: [
            "I saw a movie yesterday. /நான் நேற்று ஒரு திரைப்படம் பார்த்தேன்.", 
            "She didn't go to the party last night. /அவள் நேற்று இரவு விருந்துக்கு செல்லவில்லை.", 
            "They lived in Paris for five years. /அவர்கள் பாரிஸில் ஐந்து ஆண்டுகள் வாழ்ந்தார்கள்."
        ], 
        notes: "Regular verbs add -ed, irregular verbs have special past forms."
    },
    { 
        category: 'tense', 
        title: "Past Continuous", 
        definition: "Used for actions that were in progress at a specific time in the past, or interrupted actions./கடந்த காலத்தில் குறிப்பிட்ட நேரத்தில் நடந்து கொண்டிருந்த செயல்களுக்கு அல்லது தடைபட்ட செயல்களுக்கு பயன்படுத்தப்படுகிறது.", 
        examples: [
            "I was reading when she arrived. /அவள் வந்தபோது நான் படித்து கொண்டிருந்தேன்.", 
            "At 8 PM last night, we were having dinner. /நேற்று இரவு 8 மணிக்கு, நாங்கள் இரவு உணவு சாப்பிட்டு கொண்டிருந்தோம்.", 
            "While I was working, the phone rang. /நான் வேலை செய்து கொண்டிருக்கும்போது, தொலைபேசி ஒலித்தது."
        ], 
        notes: "Formed with was/were + present participle."
    },
    { 
        category: 'tense', 
        title: "Past Perfect", 
        definition: "Used for actions that were completed before another action in the past./கடந்த காலத்தில் மற்றொரு செயலுக்கு முன் முடிந்த செயல்களுக்கு பயன்படுத்தப்படுகிறது.", 
        examples: [
            "I had finished my homework before I went out. /நான் வெளியே செல்வதற்கு முன் என் வீட்டுப்பாடத்தை முடித்திருந்தேன்.", 
            "She had never seen such a beautiful beach before she went to Hawaii. /அவள் ஹவாய் செல்வதற்கு முன் இவ்வளவு அழகான கடற்கரையை பார்த்ததில்லை.", 
            "By the time we arrived, the movie had already started. /நாங்கள் வந்தபோது, திரைப்படம் ஏற்கனவே தொடங்கியிருந்தது."
        ], 
        notes: "Formed with had + past participle."
    },
    { 
        category: 'tense', 
        title: "Past Perfect Continuous", 
        definition: "Used for actions that were in progress before another action in the past, emphasizing duration./கடந்த காலத்தில் மற்றொரு செயலுக்கு முன் நடந்து கொண்டிருந்த செயல்களுக்கு, கால அளவை வலியுறுத்துவதற்கு பயன்படுத்தப்படுகிறது.", 
        examples: [
            "I had been waiting for two hours when she finally arrived. /அவள் இறுதியாக வந்தபோது நான் இரண்டு மணி நேரமாக காத்திருந்தேன்.", 
            "They had been playing tennis when it started to rain. /மழை பெய்யத் தொடங்கியபோது அவர்கள் டென்னிஸ் விளையாடி கொண்டிருந்தார்கள்.", 
            "She was tired because she had been working all day. /அவள் முழு நாளும் வேலை செய்து கொண்டிருந்ததால் களைத்திருந்தாள்."
        ], 
        notes: "Formed with had + been + present participle."
    },
    { 
        category: 'tense', 
        title: "Simple Future", 
        definition: "Used for predictions, spontaneous decisions, and future facts./கணிப்புகள், தற்காலிக முடிவுகள் மற்றும் எதிர்கால உண்மைகளுக்கு பயன்படுத்தப்படுகிறது.", 
        examples: [
            "I will call you tomorrow. /நான் நாளை உன்னை அழைப்பேன்.", 
            "She will be 30 next month. /அவள் அடுத்த மாதம் 30 வயதாக இருப்பாள்.", 
            "I think it will rain later. /பின்னர் மழை பெய்யும் என்று நினைக்கிறேன்."
        ], 
        notes: "Formed with will + base verb."
    },
    { 
        category: 'tense', 
        title: "Future Continuous", 
        definition: "Used for actions that will be in progress at a specific time in the future./எதிர்காலத்தில் குறிப்பிட்ட நேரத்தில் நடந்து கொண்டிருக்கும் செயல்களுக்கு பயன்படுத்தப்படுகிறது.", 
        examples: [
            "This time tomorrow, I will be flying to New York. /நாளை இந்த நேரத்தில், நான் நியூயார்க்கிற்கு பறந்து கொண்டிருப்பேன்.", 
            "At 8 PM tonight, we will be having dinner. /இன்று இரவு 8 மணிக்கு, நாங்கள் இரவு உணவு சாப்பிட்டு கொண்டிருப்போம்.", 
            "Don't call at 9; I'll be studying. /9 மணிக்கு அழைக்காதே; நான் படித்து கொண்டிருப்பேன்."
        ], 
        notes: "Formed with will + be + present participle."
    },
    { 
        category: 'tense', 
        title: "Future Perfect", 
        definition: "Used for actions that will be completed before a specific time in the future./எதிர்காலத்தில் குறிப்பிட்ட நேரத்திற்கு முன் முடிந்த செயல்களுக்கு பயன்படுத்தப்படுகிறது.", 
        examples: [
            "By next November, I will have received my promotion. /அடுத்த நவம்பருக்கு முன், நான் பதவி உயர்வு பெற்றிருப்பேன்.", 
            "By the time you arrive, we will have prepared dinner. /நீங்கள் வந்தபோது, நாங்கள் இரவு உணவை தயார் செய்திருப்போம்.", 
            "She will have finished her report by Friday. /அவள் வெள்ளிக்கிழமைக்குள் தன் அறிக்கையை முடித்திருப்பாள்."
        ], 
        notes: "Formed with will + have + past participle."
    },
    { 
        category: 'tense', 
        title: "Future Perfect Continuous", 
        definition: "Used for actions that will have been in progress for some time by a future time./எதிர்காலத்தில் ஒரு குறிப்பிட்ட நேரத்திற்கு முன் ஒரு குறிப்பிட்ட காலம் நடந்து கொண்டிருக்கும் செயல்களுக்கு பயன்படுத்தப்படுகிறது.", 
        examples: [
            "By next month, I will have been working here for five years. /அடுத்த மாதத்திற்கு முன், நான் இங்கு ஐந்து ஆண்டுகளாக வேலை செய்து கொண்டிருப்பேன்.", 
            "They will have been traveling for 24 hours when they arrive. /அவர்கள் வந்து சேரும்போது, 24 மணி நேரமாக பயணித்து கொண்டிருப்பார்கள்.", 
            "In June, we will have been living here for ten years. /ஜூன் மாதத்தில், நாங்கள் இங்கு பத்து ஆண்டுகளாக வாழ்ந்து கொண்டிருப்போம்."
        ], 
        notes: "Formed with will + have + been + present participle."
    },
    // Parts of Speech
    { 
        category: 'part-of-speech', 
        title: "Noun", 
        definition: "A word that names a person, place, thing, or idea./ஒரு நபர், இடம், பொருள் அல்லது கருத்தை பெயரிடும் ஒரு சொல்.", 
        examples: [
            "dog (common noun) /நாய் (பொதுவான பெயர்ச்சொல்)", 
            "London (proper noun) /லண்டன் (தனிப்பட்ட பெயர்ச்சொல்)", 
            "happiness (abstract noun) /மகிழ்ச்சி (புலப்படாத பெயர்ச்சொல்)", 
            "team (collective noun) /குழு (கூட்டு பெயர்ச்சொல்)"
        ], 
        notes: "Can be singular or plural, and can be countable or uncountable."
    },
    { 
        category: 'part-of-speech', 
        title: "Pronoun", 
        definition: "A word used in place of a noun to avoid repetition./மீண்டும் மீண்டும் பயன்படுத்துவதை தவிர்க்க ஒரு பெயர்ச்சொல்லுக்கு பதிலாக பயன்படுத்தப்படும் சொல்.", 
        examples: [
            "I, you, he, she, it (personal pronouns) /நான், நீ, அவன், அவள், அது (தனிப்பட்ட பிரதிபெயர்கள்)", 
            "myself, yourself (reflexive pronouns) /நானே, நீயே (தன்மை பிரதிபெயர்கள்)", 
            "this, that, these, those (demonstrative pronouns) /இது, அது, இவை, அவை (காட்டு பிரதிபெயர்கள்)", 
            "who, which, that (relative pronouns) /யார், எது, அது (தொடர்பு பிரதிபெயர்கள்)"
        ], 
        notes: "Pronouns must agree with their antecedents in number and gender."
    },
    { 
        category: 'part-of-speech', 
        title: "Verb", 
        definition: "A word that expresses an action, occurrence, or state of being./ஒரு செயல், நிகழ்வு அல்லது இருப்பு நிலையை வெளிப்படுத்தும் சொல்.", 
        examples: [
            "run (action verb) /ஓடு (செயல் வினைச்சொல்)", 
            "become (linking verb) /ஆகு (இணைப்பு வினைச்சொல்)", 
            "must (modal verb) /வேண்டும் (முறை வினைச்சொல்)", 
            "have (auxiliary verb) /இரு (துணை வினைச்சொல்)"
        ], 
        notes: "Verbs change form to indicate tense, person, number, etc."
    },
    { 
        category: 'part-of-speech', 
        title: "Adjective", 
        definition: "A word that describes or modifies a noun or pronoun./ஒரு பெயர்ச்சொல் அல்லது பிரதிபெயரை விவரிக்கும் அல்லது மாற்றியமைக்கும் சொல்.", 
        examples: [
            "happy (She is happy.) /மகிழ்ச்சியான (அவள் மகிழ்ச்சியாக இருக்கிறாள்.)", 
            "blue (the blue sky) /நீலம் (நீல வானம்)", 
            "three (three books) /மூன்று (மூன்று புத்தகங்கள்)", 
            "this (this house) /இந்த (இந்த வீடு)"
        ], 
        notes: "Adjectives usually come before the noun they modify."
    },
    { 
        category: 'part-of-speech', 
        title: "Adverb", 
        definition: "A word that modifies a verb, adjective, or other adverb./ஒரு வினைச்சொல், பெயரெச்சம் அல்லது மற்றொரு வினையுரிச்சொல்லை மாற்றியமைக்கும் சொல்.", 
        examples: [
            "quickly (She runs quickly.) /விரைவாக (அவள் விரைவாக ஓடுகிறாள்.)", 
            "very (very happy) /மிகவும் (மிகவும் மகிழ்ச்சியாக)", 
            "often (I often go there) /அடிக்கடி (நான் அடிக்கடி அங்கு செல்கிறேன்)", 
            "here (Come here.) /இங்கே (இங்கே வா.)"
        ], 
        notes: "Many adverbs end in -ly, but not all."
    },
    { 
        category: 'part-of-speech', 
        title: "Preposition", 
        definition: "A word that shows the relationship between a noun (or pronoun) and other words in a sentence./ஒரு பெயர்ச்சொல் (அல்லது பிரதிபெயர்) மற்றும் வாக்கியத்தில் உள்ள மற்ற சொற்களுக்கு இடையேயான உறவைக் காட்டும் சொல்.", 
        examples: [
            "in (in the house) /இல் (வீட்டில்)", 
            "on (on the table) /மீது (மேஜையின் மீது)", 
            "with (with a friend) /உடன் (நண்பருடன்)", 
            "about (about the weather) /பற்றி (வானிலை பற்றி)"
        ], 
        notes: "Prepositions are usually followed by nouns or pronouns."
    },
    { 
        category: 'part-of-speech', 
        title: "Conjunction", 
        definition: "A word that connects words, phrases, or clauses./சொற்கள், சொற்றொடர்கள் அல்லது உட்பிரிவுகளை இணைக்கும் சொல்.", 
        examples: [
            "and (bread and butter) /மற்றும் (ரொட்டி மற்றும் வெண்ணெய்)", 
            "but (tall but weak) /ஆனால் (உயரமான ஆனால் பலவீனமான)", 
            "because (I stayed because it was raining) /ஏனெனில் (மழை பெய்ததால் நான் தங்கினேன்)", 
            "if (I'll go if you come) /என்றால் (நீ வந்தால் நான் செல்வேன்)"
        ], 
        notes: "Coordinating conjunctions join equal elements; subordinating conjunctions join dependent clauses."
    },
    { 
        category: 'part-of-speech', 
        title: "Interjection", 
        definition: "A word or phrase that expresses strong emotion./வலுவான உணர்ச்சியை வெளிப்படுத்தும் சொல் அல்லது சொற்றொடர்.", 
        examples: [
            "Wow! (Wow! That's amazing!) /வாவ்! (வாவ்! அது ஆச்சரியமாக இருக்கிறது!)", 
            "Ouch! (Ouch! That hurt!) /ஐயோ! (ஐயோ! அது வலிக்கிறது!)", 
            "Hey! (Hey! Stop that!) /ஹேய்! (ஹேய்! அதை நிறுத்து!)", 
            "Oh no! (Oh no! I forgot my keys!) /ஓ இல்லை! (ஓ இல்லை! நான் என் சாவியை மறந்துவிட்டேன்!)"
        ], 
        notes: "Interjections often stand alone and are followed by exclamation points."
    },
    // Be Verbs
    { 
        category: 'be-verb', 
        title: "Present Tense - Be Verbs", 
        definition: "Forms of 'be' in the present tense: am, is, are./நிகழ்காலத்தில் 'be' இன் வடிவங்கள்: am, is, are.", 
        examples: [
            "I am a student. /நான் ஒரு மாணவன்.", 
            "She is a doctor. /அவள் ஒரு மருத்துவர்.", 
            "They are my friends. /அவர்கள் என் நண்பர்கள்.", 
            "We are happy. /நாங்கள் மகிழ்ச்சியாக இருக்கிறோம்."
        ], 
        notes: "Used as main verbs and auxiliary verbs."
    },
    { 
        category: 'be-verb', 
        title: "Past Tense - Be Verbs", 
        definition: "Forms of 'be' in the past tense: was, were./கடந்த காலத்தில் 'be' இன் வடிவங்கள்: was, were.", 
        examples: [
            "I was tired yesterday. /நான் நேற்று களைத்திருந்தேன்.", 
            "She was at home last night. /அவள் நேற்று இரவு வீட்டில் இருந்தாள்.", 
            "They were late for the meeting. /அவர்கள் கூட்டத்திற்கு தாமதமாக வந்தார்கள்.", 
            "We were in Paris last summer. /நாங்கள் கடந்த கோடையில் பாரிஸில் இருந்தோம்."
        ], 
        notes: "Used as main verbs and auxiliary verbs."
    },
    { 
        category: 'be-verb', 
        title: "Future Tense - Be Verbs", 
        definition: "Forms of 'be' in the future tense: will be./எதிர்காலத்தில் 'be' இன் வடிவங்கள்: will be.", 
        examples: [
            "I will be there tomorrow. /நான் நாளை அங்கு இருப்பேன்.", 
            "She will be happy to see you. /அவள் உன்னைப் பார்க்க மகிழ்ச்சியாக இருப்பாள்.", 
            "They will be at the party. /அவர்கள் விருந்தில் இருப்பார்கள்.", 
            "We will be ready soon. /நாங்கள் விரைவில் தயாராக இருப்போம்."
        ], 
        notes: "Always uses 'will be' regardless of subject."
    },
    { 
        category: 'be-verb', 
        title: "Perfect Tenses - Be Verbs", 
        definition: "Forms of 'be' in perfect tenses: been (as past participle)./முழுமையான காலங்களில் 'be' இன் வடிவங்கள்: been (கடந்த கால பயன்பாடு).", 
        examples: [
            "I have been here before. /நான் முன்பு இங்கு இருந்திருக்கிறேன்.", 
            "She had been waiting for hours. /அவள் மணிக்கணக்காக காத்திருந்திருந்தாள்.", 
            "They will have been married for 10 years by then. /அவர்கள் அப்போது 10 ஆண்டுகளாக திருமணமாகியிருப்பார்கள்.", 
            "We have been friends since childhood. /நாங்கள் சிறு வயதிலிருந்து நண்பர்களாக இருந்திருக்கிறோம்."
        ], 
        notes: "Used with have/has/had/will have to form perfect tenses."
    },
    { 
        category: 'be-verb', 
        title: "Continuous Tenses - Be Verbs", 
        definition: "Forms of 'be' in continuous tenses: being (as present participle)./தொடர்ச்சியான காலங்களில் 'be' இன் வடிவங்கள்: being (நிகழ்கால பயன்பாடு).", 
        examples: [
            "I am being careful. /நான் கவனமாக இருக்கிறேன்.", 
            "She was being silly. /அவள் முட்டாள்தனமாக இருந்தாள்.", 
            "They will be being interviewed at this time tomorrow. /நாளை இந்த நேரத்தில் அவர்கள் நேர்காணல் செய்யப்படுவார்கள்.", 
            "We have been being patient. /நாங்கள் பொறுமையாக இருந்து கொண்டிருக்கிறோம்."
        ], 
        notes: "Used with auxiliary 'be' verbs to form continuous tenses."
    },
    // Prepositions
    { 
        category: 'preposition', 
        title: "Time Prepositions", 
        definition: "Prepositions that indicate when something happens./எப்போது ஒரு நிகழ்வு நடக்கிறது என்பதைக் காட்டும் முன்னிடைச்சொற்கள்.", 
        examples: [
            "at (at 5 o'clock, at noon) /இல் (5 மணியில், மதியத்தில்)", 
            "on (on Monday, on July 4th) /அன்று (திங்கட்கிழமை அன்று, ஜூலை 4 அன்று)", 
            "in (in June, in 2023, in the morning) /இல் (ஜூன் மாதத்தில், 2023 இல், காலையில்)", 
            "for (for two hours, for a week) /காலம் (இரண்டு மணி நேரமாக, ஒரு வாரமாக)", 
            "since (since yesterday, since 2010) /முதல் (நேற்று முதல், 2010 முதல்)"
        ], 
        notes: "Different prepositions are used for different time expressions."
    },
    { 
        category: 'preposition', 
        title: "Place Prepositions", 
        definition: "Prepositions that indicate where something is located./ஒரு பொருள் எங்கு இருக்கிறது என்பதைக் காட்டும் முன்னிடைச்சொற்கள்.", 
        examples: [
            "in (in the room, in the box) /இல் (அறையில், பெட்டியில்)", 
            "on (on the table, on the wall) /மீது (மேஜையின் மீது, சுவரின் மீது)", 
            "at (at the station, at home) /இல் (நிலையத்தில், வீட்டில்)", 
            "under (under the bed, under the tree) /கீழே (படுக்கையின் கீழே, மரத்தின் கீழே)", 
            "between (between the houses, between you and me) /இடையே (வீடுகளுக்கு இடையே, உனக்கும் எனக்கும் இடையே)"
        ], 
        notes: "Choice depends on whether something is enclosed, on a surface, at a point, etc."
    },
    { 
        category: 'preposition', 
        title: "Direction Prepositions", 
        definition: "Prepositions that indicate movement from one place to another./ஒரு இடத்திலிருந்து மற்றொரு இடத்திற்கு இயக்கத்தைக் காட்டும் முன்னிடைச்சொற்கள்.", 
        examples: [
            "to (go to school, walk to the park) /நோக்கி (பள்ளிக்கு செல், பூங்காவிற்கு நட)", 
            "into (jump into the pool, go into the room) /உள்ளே (குளத்தில் குதி, அறைக்குள் செல்)", 
            "toward (walk toward me, move toward the light) /நோக்கி (என்னை நோக்கி நட, ஒளியை நோக்கி நகர்)", 
            "through (walk through the tunnel, read through the book) /வழியாக (சுரங்க வழியாக நட, புத்தகத்தை வழியாக படி)", 
            "across (swim across the river, walk across the street) /குறுக்கே (ஆற்றைக் குறுக்கே நீந்து, தெருவைக் குறுக்கே நட)"
        ], 
        notes: "These show movement with a destination or path."
    },
    { 
        category: 'preposition', 
        title: "Other Common Prepositions", 
        definition: "Prepositions that show other relationships./பிற உறவுகளைக் காட்டும் முன்னிடைச்சொற்கள்.", 
        examples: [
            "of (a cup of tea, the capital of France) /இன் (ஒரு கோப்பை தேநீர், பிரான்ஸின் தலைநகரம்)", 
            "with (go with me, a book with pictures) /உடன் (என்னுடன் செல், படங்களுடன் ஒரு புத்தகம்)", 
            "about (talk about the weather, a story about love) /பற்றி (வானிலை பற்றி பேசு, காதல் பற்றிய கதை)", 
            "by (written by Shakespeare, travel by train) /ஆல் (ஷேக்ஸ்பியரால் எழுதப்பட்டது, ரயிலில் பயணி)", 
            "for (a gift for you, study for the test) /காக (உனக்கு ஒரு பரிசு, தேர்வுக்காக படி)"
        ], 
        notes: "These show possession, accompaniment, topic, means, purpose, etc."
    },
    // Either/Neither
    { 
        category: 'either-neither', 
        title: "Either...or", 
        definition: "Used to present two alternatives, indicating that one of the two is possible or true./இரண்டு மாற்று வழிகளை முன்வைக்க பயன்படுத்தப்படுகிறது, இரண்டில் ஒன்று சாத்தியமானது அல்லது உண்மையானது என்பதைக் குறிக்கிறது.", 
        examples: [
            "You can either come with me or stay here. /நீங்கள் என்னுடன் வரலாம் அல்லது இங்கேயே இருக்கலாம்.", 
            "Either John or Mary will help you. /ஜான் அல்லது மேரி உங்களுக்கு உதவுவார்கள்.", 
            "We can go to either Italy or Spain for our vacation. /நாங்கள் எங்கள் விடுமுறைக்கு இத்தாலி அல்லது ஸ்பெயினுக்கு செல்லலாம்.", 
            "She is either at home or at work. /அவள் வீட்டில் அல்லது வேலையில் இருக்கிறாள்."
        ], 
        notes: "The verb agrees with the subject closer to it (proximity rule)."
    },
    { 
        category: 'either-neither', 
        title: "Neither...nor", 
        definition: "Used to indicate that neither of two alternatives is possible or true./இரண்டு மாற்று வழிகளில் எதுவுமே சாத்தியமில்லை அல்லது உண்மையில்லை என்பதைக் குறிக்க பயன்படுத்தப்படுகிறது.", 
        examples: [
            "Neither John nor Mary is coming to the party. /ஜான் அல்லது மேரி எவரும் விருந்துக்கு வரவில்லை.", 
            "I neither smoke nor drink. /நான் புகைப்பதில்லை அல்லது குடிப்பதில்லை.", 
            "She speaks neither French nor Spanish. /அவள் பிரெஞ்சு அல்லது ஸ்பானிஷ் பேசுவதில்லை.", 
            "Neither the blue shirt nor the red one fits me. /நீல சட்டை அல்லது சிவப்பு சட்டை எதுவும் எனக்கு பொருந்தவில்லை."
        ], 
        notes: "The verb agrees with the subject closer to it (proximity rule)."
    },
    { 
        category: 'either-neither', 
        title: "Either (alone)", 
        definition: "Used to indicate one or the other of two people or things./இரண்டு நபர்கள் அல்லது பொருட்களில் ஒன்று அல்லது மற்றொன்றைக் குறிக்க பயன்படுத்தப்படுகிறது.", 
        examples: [
            "You can take either book. (one of two books) /நீங்கள் எந்த புத்தகத்தையும் எடுக்கலாம். (இரண்டு புத்தகங்களில் ஒன்று)", 
            "There are two ways to the station; you can take either. /நிலையத்திற்கு இரண்டு வழிகள் உள்ளன; நீங்கள் எதையாவது எடுக்கலாம்.", 
            "Either answer is correct. /எந்த பதிலும் சரியானது.", 
            "I don't like either of them. /எனக்கு அவர்களில் எதுவும் பிடிக்கவில்லை."
        ], 
        notes: "Used with singular nouns when referring to one of two items."
    },
    { 
        category: 'either-neither', 
        title: "Neither (alone)", 
        definition: "Used to indicate not one nor the other of two people or things./இரண்டு நபர்கள் அல்லது பொருட்களில் ஒன்றும் இல்லை, மற்றொன்றும் இல்லை என்பதைக் குறிக்க பயன்படுத்தப்படுகிறது.", 
        examples: [
            "Neither parent came to the meeting. (not the mother and not the father) /எந்த பெற்றோரும் கூட்டத்திற்கு வரவில்லை. (தாயும் இல்லை, தந்தையும் இல்லை)", 
            "I asked two people, but neither knew the answer. /நான் இருவரிடம் கேட்டேன், ஆனால் எவருக்கும் பதில் தெரியவில்லை.", 
            "Neither of my friends is coming. /என் நண்பர்கள் எவரும் வரவில்லை.", 
            "Neither solution is ideal. /எந்த தீர்வும் சிறந்ததல்ல."
        ], 
        notes: "Used with singular nouns when referring to none of two items."
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB for seeding...');
        await Grammar.deleteMany({});
        console.log('Cleared existing data.');
        await Grammar.insertMany(initialData);
        console.log('Database seeded successfully with initial data!');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
};

seedDatabase();