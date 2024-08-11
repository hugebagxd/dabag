document.addEventListener("DOMContentLoaded", () => {
    createSquares();
    getNewWord();  // This will now correctly set the 'word' variable

    let guessedWords = [[]];
    let availableSpace = 1;
    let guessedWordCount = 0;
    let isWordSubmitted = false;  // Flag to track if the word has been submitted

    const keys = document.querySelectorAll(".keyboard-row button");

    function getNewWord() {
        // Define an array of custom 5-letter words
        const customWords = [
            'which', 'there', 'their', 'about', 'would', 'thesse', 'other', 'words',
            'could', 'write', 'first', 'water', 'after', 'where', 'right', 'think',
            'three', 'years', 'place', 'sound', 'great', 'again', 'still', 'every',
            'small', 'found', 'those', 'never', 'under', 'might', 'while', 'house',
            'world', 'below', 'asked', 'going', 'large', 'until', 'along', 'shall',
            'being', 'often', 'earth', 'began', 'since', 'study', 'night', 'light',
            'above', 'paper', 'parts', 'young', 'story', 'point', 'times', 'heard',
            'whole', 'white', 'given', 'means', 'music', 'miles', 'thing', 'today',
            'later', 'using', 'money', 'lines', 'order', 'group', 'among', 'learn',
            'known', 'space', 'table', 'early', 'trees', 'short', 'hands', 'state',
            'black', 'shown', 'stood', 'front', 'voice', 'kinds', 'makes', 'comes',
            'close', 'power', 'lived', 'vowel', 'taken', 'built', 'heart', 'ready',
            'quite', 'class', 'bring', 'round', 'horse', 'shows', 'piece', 'green',
            'stand', 'birds', 'start', 'river', 'tried', 'least', 'field', 'whose',
            'girls', 'leave', 'added', 'color', 'third', 'hours', 'moved', 'plant',
            'doing', 'names', 'forms', 'heavy', 'ideas', 'cried', 'check', 'floor',
            'begin', 'woman', 'alone', 'plane', 'spell', 'watch', 'carry', 'wrote',
            'clear', 'named', 'books', 'child', 'glass', 'human', 'takes', 'party',
            'build', 'seems', 'blood', 'sides', 'seven', 'mouth', 'solve', 'north',
            'value', 'death', 'maybe', 'happy', 'tells', 'gives', 'looks', 'shape',
            'lives', 'steps', 'areas', 'sense', 'speak', 'force', 'ocean', 'speed',
            'women', 'metal', 'south', 'grass', 'scale', 'cells', 'lower', 'sleep',
            'wrong', 'pages', 'ships', 'needs', 'rocks', 'eight', 'major', 'level',
            'total', 'ahead', 'reach', 'stars', 'store', 'sight', 'terms', 'catch',
            'works', 'board', 'cover', 'songs', 'equal', 'stone', 'waves', 'guess',
            'dance', 'spoke', 'break', 'cause', 'radio', 'weeks', 'lands', 'basic',
            'liked', 'trade', 'fresh', 'final', 'fight', 'meant', 'drive', 'spent',
            'local', 'waxes', 'knows', 'train', 'bread', 'homes', 'teeth', 'coast',
            'thick', 'brown', 'clean', 'quiet', 'sugar', 'facts', 'steel', 'forth',
            'rules', 'notes', 'units', 'peace', 'month', 'verbs', 'seeds', 'helps',
            'sharp', 'visit', 'woods', 'chief', 'walls', 'cross', 'wings', 'grown',
            'cases', 'foods', 'crops', 'fruit', 'stick', 'wants', 'stage', 'sheep',
            'nouns', 'plain', 'drink', 'bones', 'apart', 'turns', 'moves', 'touch',
            'angle', 'based', 'range', 'marks', 'tired', 'older', 'farms', 'spend',
            'shoes', 'goods', 'chair', 'twice', 'cents', 'empty', 'alike', 'style',
            'broke', 'pairs', 'count', 'enjoy', 'score', 'shore', 'roots', 'paint',
            'heads', 'shook', 'serve', 'angry', 'crowd', 'wheel', 'quick', 'dress',
            'share', 'alive', 'noise', 'solid', 'cloth', 'signs', 'hills', 'types',
            'drawn', 'worth', 'truck', 'piano', 'upper', 'loved', 'usual', 'faces',
            'drove', 'cabin', 'boats', 'towns', 'proud', 'court', 'model', 'prime',
            'fifty', 'plans', 'yards', 'prove', 'tools', 'price', 'sheet', 'smell',
            'boxes', 'raise', 'match', 'truth', 'roads', 'threw', 'enemy', 'lunch',
            'chart', 'scene', 'graph', 'doubt', 'guide', 'winds', 'block', 'grain',
            'smoke', 'mixed', 'games', 'wagon', 'sweet', 'topic', 'extra', 'plate',
            'title', 'knife', 'fence', 'falls', 'cloud', 'wheat', 'plays', 'enter',
            'broad', 'steam', 'atoms', 'press', 'lying', 'basis', 'clock', 'taste',
            'grows', 'thank', 'storm', 'agree', 'brain', 'track', 'smile', 'funny',
            'beach', 'stock', 'hurry', 'saved', 'sorry', 'giant', 'trail', 'offer',
            'ought', 'rough', 'daily', 'avoid', 'keeps', 'throw', 'allow', 'cream',
            'laugh', 'edges', 'teach', 'frame', 'bells', 'dream', 'magic', 'occur',
            'ended', 'chord', 'false', 'skill', 'holes', 'dozen', 'brave', 'apple',
            'climb', 'outer', 'pitch', 'ruler', 'holds', 'fixed', 'costs', 'calls',
            'blank', 'staff', 'labor', 'eaten', 'youth', 'tones', 'honor', 'globe',
            'gases', 'doors', 'poles', 'loose', 'apply', 'tears', 'exact', 'brush',
            'chest', 'layer', 'whale', 'minor', 'faith', 'tests', 'judge', 'items',
            'worry', 'waste', 'hoped', 'strip', 'begun', 'aside', 'lakes', 'bound',
            'depth', 'candy', 'event', 'worse', 'aware', 'shell', 'rooms', 'ranch',
            'image', 'snake', 'aloud', 'dried', 'likes', 'motor', 'pound', 'knees',
            'refer', 'fully', 'chain', 'shirt', 'flour', 'drops', 'spite', 'orbit',
            'banks', 'shoot', 'curve', 'tribe', 'tight', 'blind', 'slept', 'shade',
            'claim', 'flies', 'theme', 'queen', 'fifth', 'union', 'hence', 'straw',
            'entry', 'issue', 'birth', 'feels', 'anger', 'brief', 'rhyme', 'glory',
            'guard', 'flows', 'flesh', 'owned', 'trick', 'yours', 'sizes', 'noted',
            'width', 'burst', 'route', 'lungs', 'uncle', 'bears', 'royal', 'kings',
            'forty', 'trial', 'cards', 'brass', 'opera', 'chose', 'owner', 'vapor',
            'beats', 'mouse', 'tough', 'wires', 'meter', 'tower', 'finds', 'inner',
            'stuck', 'arrow', 'poems', 'label', 'swing', 'solar', 'truly', 'tense',
            'beans', 'split', 'rises', 'weigh', 'hotel', 'stems', 'pride', 'swung',
            'grade', 'digit', 'badly', 'boots', 'pilot', 'sales', 'swept', 'lucky',
            'prize', 'stove', 'tubes', 'acres', 'wound', 'steep', 'slide', 'trunk',
            'error', 'porch', 'slave', 'exist', 'faced', 'mines', 'marry', 'juice',
            'raced', 'waved', 'goose', 'trust', 'fewer', 'favor', 'mills', 'views',
            'joint', 'eager', 'spots', 'blend', 'rings', 'adult', 'index', 'nails',
            'horns', 'balls', 'flame', 'rates', 'drill', 'trace', 'skins', 'waxed',
            'seats', 'stuff', 'ratio', 'minds', 'dirty', 'silly', 'coins', 'hello',
            'trips', 'leads', 'rifle', 'hopes', 'bases', 'shine', 'bench', 'moral',
            'fires', 'meals', 'shake', 'shops', 'cycle', 'movie', 'slope', 'canoe',
            'teams', 'folks', 'fired', 'bands', 'thumb', 'shout', 'canal', 'habit',
            'reply', 'ruled', 'fever', 'crust', 'shelf', 'walks', 'midst', 'crack',
            'print', 'tales', 'coach', 'stiff', 'flood', 'verse', 'awake', 'rocky',
            'march', 'fault', 'swift', 'faint', 'civil', 'ghost', 'feast', 'blade',
            'limit', 'germs', 'reads', 'ducks', 'dairy', 'worst', 'gifts', 'lists',
            'stops', 'rapid', 'brick', 'claws', 'beads', 'beast', 'skirt', 'cakes',
            'lions', 'frogs', 'doubt', 'admin', 'beams', 'props', 'dried', 'brood',
            'jelly', 'grape', 'flown', 'jetty', 'crush', 'mover', 'latch', 'stove',
            'rocky', 'round', 'exams', 'stops', 'scout', 'winds', 'crush', 'acorn',
            'brand', 'order', 'slope', 'pools', 'shaft', 'heaps', 'falls', 'latch',
            'goods', 'poles', 'knobs', 'chase', 'throw', 'joins', 'gully', 'flown',
            'crush', 'whale', 'aided', 'trout', 'fifty', 'shame', 'exams', 'curve',
            'seeds', 'grape', 'float', 'woods', 'tract', 'souls', 'wedge', 'curbs',
            'throw', 'curbs', 'scout', 'rocks', 'tract', 'curve', 'truck', 'creek',
            'marsh', 'order', 'wedge', 'wider', 'scout', 'float', 'grape', 'latch',
            'throw', 'shaft', 'woods', 'knobs', 'order', 'souls', 'marsh', 'curve',
            'creek', 'creep', 'gully', 'wider', 'heaps', 'souls', 'shame', 'stops',
            'creep', 'gully', 'order', 'knobs', 'acorn', 'grape', 'wider', 'gully',
            'curve', 'creek', 'knobs', 'stops', 'heaps', 'order', 'marsh', 'shaft',
            'woods', 'acorn', 'order', 'shaft', 'woods', 'acorn', 'order', 'order',
            'order', 'which',
            'there', 'their', 'about', 'would', 'these', 'other', 'words', 'could',
            'write', 'first', 'water', 'after', 'where', 'right', 'think', 'three',
            'years', 'place', 'sound', 'great', 'again', 'still', 'every', 'small',
            'found', 'those', 'never', 'under', 'might', 'while', 'house', 'world',
            'below', 'asked', 'going', 'large', 'until', 'along', 'shall', 'being',
            'often', 'earth', 'began', 'since', 'study', 'night', 'light', 'above',
            'paper', 'parts', 'young', 'story', 'point', 'times', 'heard', 'whole',
            'white', 'given', 'means', 'music', 'miles', 'thing', 'today', 'later',
            'using', 'money', 'lines', 'order', 'group', 'among', 'learn', 'known',
            'space', 'table', 'early', 'trees', 'short', 'hands', 'state', 'black',
            'shown', 'stood', 'front', 'voice', 'kinds', 'makes', 'comes', 'close',
            'power', 'lived', 'vowel', 'taken', 'built', 'heart', 'ready', 'quite',
            'class', 'bring', 'round', 'horse', 'shows', 'piece', 'green', 'stand',
            'birds', 'start', 'river', 'tried', 'least', 'field', 'whose', 'girls',
            'leave', 'added', 'color', 'third', 'hours', 'moved', 'plant', 'doing',
            'names', 'forms', 'heavy', 'ideas', 'cried', 'check', 'floor', 'begin',
            'woman', 'alone', 'plane', 'spell', 'watch', 'carry', 'wrote', 'clear',
            'named', 'books', 'child', 'glass', 'human', 'takes', 'party', 'build',
            'seems', 'blood', 'sides', 'seven', 'mouth', 'solve', 'north', 'value',
            'death', 'maybe', 'happy', 'tells', 'gives', 'looks', 'shape', 'lives',
            'steps', 'areas', 'sense', 'speak', 'force', 'ocean', 'speed', 'women',
            'metal', 'south', 'grass', 'scale', 'cells', 'lower', 'sleep', 'wrong',
            'pages', 'ships', 'needs', 'rocks', 'eight', 'major', 'level', 'total',
            'ahead', 'reach', 'stars', 'store', 'sight', 'terms', 'catch', 'works',
            'board', 'cover', 'songs', 'equal', 'stone', 'waves', 'guess', 'dance',
            'spoke', 'break', 'cause', 'radio', 'weeks', 'lands', 'basic', 'liked',
            'trade', 'fresh', 'final', 'fight', 'meant', 'drive', 'spent', 'local',
            'waxes', 'knows', 'train', 'bread', 'homes', 'teeth', 'coast', 'thick',
            'brown', 'clean', 'quiet', 'sugar', 'facts', 'steel', 'forth', 'rules',
            'notes', 'units', 'peace', 'month', 'verbs', 'seeds', 'helps', 'sharp',
            'visit', 'woods', 'chief', 'walls', 'cross', 'wings', 'grown', 'cases',
            'foods', 'crops', 'fruit', 'stick', 'wants', 'stage', 'sheep', 'nouns',
            'plain', 'drink', 'bones', 'apart', 'turns', 'moves', 'touch', 'angle',
            'based', 'range', 'marks', 'tired', 'older', 'farms', 'spend', 'shoes',
            'goods', 'chair', 'twice', 'cents', 'empty', 'alike', 'style', 'broke',
            'pairs', 'count', 'enjoy', 'score', 'shore', 'roots', 'paint', 'heads',
            'shook', 'serve', 'angry', 'crowd', 'wheel', 'quick', 'dress', 'share',
            'alive', 'noise', 'solid', 'cloth', 'signs', 'hills', 'types', 'drawn',
            'worth', 'truck', 'piano', 'upper', 'loved', 'usual', 'faces', 'drove',
            'cabin', 'boats', 'towns', 'proud', 'court', 'model', 'prime', 'fifty',
            'plans', 'yards', 'prove', 'tools', 'price', 'sheet', 'smell', 'boxes',
            'raise', 'match', 'truth', 'roads', 'threw', 'enemy', 'lunch', 'chart',
            'scene', 'graph', 'doubt', 'guide', 'winds', 'block', 'grain', 'smoke',
            'mixed', 'games', 'wagon', 'sweet', 'topic', 'extra', 'plate', 'title',
            'knife', 'fence', 'falls', 'cloud', 'wheat', 'plays', 'enter', 'broad',
            'steam', 'atoms', 'press', 'lying', 'basis', 'clock', 'taste', 'grows',
            'thank', 'storm', 'agree', 'brain', 'track', 'smile', 'funny', 'beach',
            'stock', 'hurry', 'saved', 'sorry', 'giant', 'trail', 'offer', 'ought',
            'rough', 'daily', 'avoid', 'keeps', 'throw', 'allow', 'cream', 'laugh',
            'edges', 'teach', 'frame', 'bells', 'dream', 'magic', 'occur', 'ended',
            'chord', 'false', 'skill', 'holes', 'dozen', 'brave', 'apple', 'climb',
            'outer', 'pitch', 'ruler', 'holds', 'fixed', 'costs', 'calls', 'blank',
            'staff', 'labor', 'eaten', 'youth', 'tones', 'honor', 'globe', 'gases',
            'doors', 'poles', 'loose', 'apply', 'tears', 'exact', 'brush', 'chest',
            'layer', 'whale', 'minor', 'faith', 'tests', 'judge', 'items', 'worry',
            'waste', 'hoped', 'strip', 'begun', 'aside', 'lakes', 'bound', 'depth',
            'candy', 'event', 'worse', 'aware', 'shell', 'rooms', 'ranch', 'image',
            'snake', 'aloud', 'dried', 'likes', 'motor', 'pound', 'knees', 'refer',
            'fully', 'chain', 'shirt', 'flour', 'drops', 'spite', 'orbit', 'banks',
            'shoot', 'curve', 'tribe', 'tight', 'blind', 'slept', 'shade', 'claim',
            'flies', 'theme', 'queen', 'fifth', 'union', 'hence', 'straw', 'entry',
            'issue', 'birth', 'feels', 'anger', 'brief', 'rhyme', 'glory', 'guard',
            'flows', 'flesh', 'owned', 'trick', 'yours', 'sizes', 'noted', 'width',
            'burst', 'route', 'lungs', 'uncle', 'bears', 'royal', 'kings', 'forty',
            'trial', 'cards', 'brass', 'opera', 'chose', 'owner', 'vapor', 'beats',
            'mouse', 'tough', 'wires', 'meter', 'tower', 'finds', 'inner', 'stuck',
            'arrow', 'poems', 'label', 'swing', 'solar', 'truly', 'tense', 'beans',
            'split', 'rises', 'weigh', 'hotel', 'stems', 'pride', 'swung', 'grade',
            'digit', 'badly', 'boots', 'pilot', 'sales', 'swept', 'lucky', 'prize',
            'stove', 'tubes', 'acres', 'wound', 'steep', 'slide', 'trunk', 'error',
            'porch', 'slave', 'exist', 'faced', 'mines', 'marry', 'juice', 'raced',
            'waved', 'goose', 'trust', 'fewer', 'favor', 'mills', 'views', 'joint',
            'eager', 'spots', 'blend', 'rings', 'adult', 'index', 'nails', 'horns',
            'balls', 'flame', 'rates', 'drill', 'trace', 'skins', 'waxed', 'seats',
            'stuff', 'ratio', 'minds', 'dirty', 'silly', 'coins', 'hello', 'trips',
            'leads', 'rifle', 'hopes', 'bases', 'shine', 'bench', 'moral', 'fires',
            'meals', 'shake', 'shops', 'cycle', 'movie', 'slope', 'canoe', 'teams',
            'folks', 'fired', 'bands', 'thumb', 'shout', 'canal', 'habit', 'reply',
            'ruled', 'fever', 'crust', 'shelf', 'walks', 'midst', 'crack', 'print',
            'tales', 'coach', 'stiff', 'flood', 'verse', 'awake', 'rocky', 'march',
            'fault', 'swift', 'faint', 'civil', 'ghost', 'feast', 'blade', 'limit',
            'germs', 'reads', 'ducks', 'dairy', 'worst', 'gifts', 'lists', 'stops',
            'rapid', 'brick', 'claws', 'beads', 'beast', 'skirt', 'cakes', 'lions',
            'frogs', 'doubt', 'admin', 'beams', 'props', 'dried', 'brood', 'jelly',
            'grape', 'flown', 'jetty', 'crush', 'mover', 'latch', 'stove', 'rocky',
            'round', 'exams', 'stops', 'scout', 'winds', 'crush', 'acorn', 'brand',
            'order', 'slope', 'pools', 'shaft', 'heaps', 'falls', 'latch', 'goods',
            'poles', 'knobs', 'chase', 'throw', 'joins', 'gully', 'flown', 'crush',
            'whale', 'aided', 'trout', 'fifty', 'shame', 'exams', 'curve', 'seeds',
            'grape', 'float', 'woods', 'tract', 'souls', 'wedge', 'curbs', 'throw',
            'curbs', 'scout', 'rocks', 'tract', 'curve', 'truck', 'creek', 'marsh',
            'order', 'wedge', 'wider', 'scout', 'float', 'grape', 'latch', 'throw',
            'shaft', 'woods', 'knobs', 'order', 'souls', 'marsh', 'curve', 'creek',
            'creep', 'gully', 'wider', 'heaps', 'souls', 'shame', 'stops', 'creep',
            'gully', 'order', 'knobs', 'acorn', 'grape', 'wider', 'gully', 'curve',
            'creek', 'knobs', 'stops', 'heaps', 'order', 'marsh', 'shaft', 'woods',
            'acorn', 'order', 'order', 'order', 'which', 'there', 'their', 'about',
            'would', 'these', 'other', 'words', 'could', 'write', 'first', 'water',
            'after', 'where', 'right', 'think', 'three', 'years', 'place', 'sound',
            'great', 'again', 'still', 'every', 'small', 'found', 'those', 'never',
            'under', 'might', 'while', 'house', 'world', 'below', 'asked', 'going',
            'large', 'until', 'along', 'shall', 'being', 'often', 'earth', 'began',
            'since', 'study', 'night', 'light', 'above', 'paper', 'parts', 'young',
            'story', 'point', 'times', 'heard', 'whole', 'white', 'given', 'means',
            'music', 'miles', 'thing', 'today', 'later', 'using', 'money', 'lines',
            'order', 'group', 'among', 'learn', 'known', 'space', 'table', 'early',
            'trees', 'short', 'hands', 'state', 'black', 'shown', 'stood', 'front',
            'voice', 'kinds', 'makes', 'comes', 'close', 'power', 'lived', 'vowel',
            'taken', 'built', 'heart', 'ready', 'quite', 'class', 'bring', 'round',
            'horse', 'shows', 'piece', 'green', 'stand', 'birds', 'start', 'river',
            'tried', 'least', 'field', 'whose', 'girls', 'leave', 'added', 'color',
            'third', 'hours', 'moved', 'plant', 'doing', 'names', 'forms', 'heavy',
            'ideas', 'cried', 'check', 'floor', 'begin', 'woman', 'alone', 'plane',
            'spell', 'watch', 'carry', 'wrote', 'clear', 'named', 'books', 'child',
            'glass', 'human', 'takes', 'party', 'build', 'seems', 'blood', 'sides',
            'seven', 'mouth', 'solve', 'north', 'value', 'death', 'maybe', 'happy',
            'tells', 'gives', 'looks', 'shape', 'lives', 'steps', 'areas', 'sense',
            'speak', 'force', 'ocean', 'speed', 'women', 'metal', 'south', 'grass',
            'scale', 'cells', 'lower', 'sleep', 'wrong', 'pages', 'ships', 'needs',
            'rocks', 'eight', 'major', 'level', 'total', 'ahead', 'reach', 'stars',
            'store', 'sight', 'terms', 'catch', 'works', 'board', 'cover', 'songs',
            'equal', 'stone', 'waves', 'guess', 'dance', 'spoke', 'break', 'cause',
            'radio', 'weeks', 'lands', 'basic', 'liked', 'trade', 'fresh', 'final',
            'fight', 'meant', 'drive', 'spent', 'local', 'waxes', 'knows', 'train',
            'bread', 'homes', 'teeth', 'coast', 'thick', 'brown', 'clean', 'quiet',
            'sugar', 'facts', 'steel', 'forth', 'rules', 'notes', 'units', 'peace',
            'month', 'verbs', 'seeds', 'helps', 'sharp', 'visit', 'woods', 'chief',
            'walls', 'cross', 'wings', 'grown', 'cases', 'foods', 'crops', 'fruit',
            'stick', 'wants', 'stage', 'sheep', 'nouns', 'plain', 'drink', 'bones',
            'apart', 'turns', 'moves', 'touch', 'angle', 'based', 'range', 'marks',
            'tired', 'older', 'farms', 'spend', 'shoes', 'goods', 'chair', 'twice',
            'cents', 'empty', 'alike', 'style', 'broke', 'pairs', 'count', 'enjoy',
            'score', 'shore', 'roots', 'paint', 'heads', 'shook', 'serve', 'angry',
            'crowd', 'wheel', 'quick', 'dress', 'share', 'alive', 'noise', 'solid',
            'cloth', 'signs', 'hills', 'types', 'drawn', 'worth', 'truck', 'piano',
            'upper', 'loved', 'usual', 'faces', 'drove', 'cabin', 'boats', 'towns',
            'proud', 'court', 'model', 'prime', 'fifty', 'plans', 'yards', 'prove',
            'tools', 'price', 'sheet', 'smell', 'boxes', 'raise', 'match', 'truth',
            'roads', 'threw', 'enemy', 'lunch', 'chart', 'scene', 'graph', 'doubt',
            'guide', 'winds', 'block', 'grain', 'smoke', 'mixed', 'games', 'wagon',
            'sweet', 'topic', 'extra', 'plate', 'title', 'knife', 'fence', 'falls',
            'cloud', 'wheat', 'plays', 'enter', 'broad', 'steam', 'atoms', 'press',
            'lying', 'basis', 'clock', 'taste', 'grows', 'thank', 'storm', 'agree',
            'brain', 'track', 'smile', 'funny', 'beach', 'stock', 'hurry', 'saved',
            'sorry', 'giant', 'trail', 'offer', 'ought', 'rough', 'daily', 'avoid',
            'keeps', 'throw', 'allow', 'cream', 'laugh', 'edges', 'teach', 'frame',
            'bells', 'dream', 'magic', 'occur', 'ended', 'chord', 'false', 'skill',
            'holes', 'dozen', 'brave', 'apple', 'climb', 'outer', 'pitch', 'ruler',
            'holds', 'fixed', 'costs', 'calls', 'blank', 'staff', 'labor', 'eaten',
            'youth', 'tones', 'honor', 'globe', 'gases', 'doors', 'poles', 'loose',
            'apply', 'tears', 'exact', 'brush', 'chest', 'layer', 'whale', 'minor',
            'faith', 'tests', 'judge', 'items', 'worry', 'waste', 'hoped', 'strip',
            'begun', 'aside', 'lakes', 'bound', 'depth', 'candy', 'event', 'worse',
            'aware', 'shell', 'rooms', 'ranch', 'image', 'snake', 'aloud', 'dried',
            'likes', 'motor', 'pound', 'knees', 'refer', 'fully', 'chain', 'shirt',
            'flour', 'drops', 'spite', 'orbit', 'banks', 'shoot', 'curve', 'tribe',
            'tight', 'blind', 'slept', 'shade', 'claim', 'flies', 'theme', 'queen',
            'fifth', 'union', 'hence', 'straw', 'entry', 'issue', 'birth', 'feels',
            'anger', 'brief', 'rhyme', 'glory', 'guard', 'flows', 'flesh', 'owned',
            'trick', 'yours', 'sizes', 'noted', 'width', 'burst', 'route', 'lungs',
            'uncle', 'bears', 'royal', 'kings', 'forty', 'trial', 'cards', 'brass',
            'opera', 'chose', 'owner', 'vapor', 'beats', 'mouse', 'tough', 'wires',
            'meter', 'tower', 'finds', 'inner', 'stuck', 'arrow', 'poems', 'label',
            'swing', 'solar', 'truly', 'tense', 'beans', 'split', 'rises', 'weigh',
            'hotel', 'stems', 'pride', 'swung', 'grade', 'digit', 'badly', 'boots',
            'pilot', 'sales', 'swept', 'lucky', 'prize', 'stove', 'tubes', 'acres',
            'wound', 'steep', 'slide', 'trunk', 'error', 'porch', 'slave', 'exist',
            'faced', 'mines', 'marry', 'juice', 'raced', 'waved', 'goose', 'trust',
            'fewer', 'favor', 'mills', 'views', 'joint', 'eager', 'spots', 'blend',
            'rings', 'adult', 'index', 'nails', 'horns', 'balls', 'flame', 'rates',
            'drill', 'trace', 'skins', 'waxed', 'seats', 'stuff', 'ratio', 'minds',
            'dirty', 'silly', 'coins', 'hello', 'trips', 'leads', 'rifle', 'hopes',
            'bases', 'shine', 'bench', 'moral', 'fires', 'meals', 'shake', 'shops',
            'cycle', 'movie', 'slope', 'canoe', 'teams', 'folks', 'fired', 'bands',
            'thumb', 'shout', 'canal', 'habit', 'reply', 'ruled', 'fever', 'crust',
            'shelf', 'walks', 'midst', 'crack', 'print', 'tales', 'coach', 'stiff',
            'flood', 'verse', 'awake', 'rocky', 'march', 'fault', 'swift', 'faint',
            'civil', 'ghost', 'feast', 'blade', 'limit', 'germs', 'reads', 'ducks',
            'dairy', 'worst', 'gifts', 'lists', 'stops', 'rapid', 'brick', 'claws',
            'beads', 'beast', 'skirt', 'cakes', 'lions', 'frogs', 'doubt', 'admin',
            'beams', 'props', 'dried', 'brood', 'jelly', 'grape', 'flown', 'jetty',
            'crush', 'mover', 'latch', 'stove', 'rocky', 'round', 'exams', 'stops',
            'scout', 'winds', 'crush', 'acorn', 'brand', 'order', 'slope', 'pools',
            'shaft', 'heaps', 'falls', 'latch', 'goods', 'poles', 'knobs', 'chase',
            'throw', 'joins', 'gully', 'flown', 'crush', 'whale', 'aided', 'trout',
            'fifty', 'shame', 'exams', 'curve', 'seeds', 'grape', 'float', 'woods',
            'tract', 'souls', 'wedge', 'curbs', 'throw', 'curbs', 'scout', 'rocks',
            'tract', 'curve', 'truck', 'creek', 'marsh', 'order', 'wedge', 'wider',
            'scout', 'float', 'grape', 'latch', 'throw', 'shaft', 'woods', 'knobs',
            'order', 'souls', 'marsh', 'curve', 'creek', 'creep', 'gully', 'wider',
            'heaps', 'souls', 'shame', 'stops', 'creep', 'gully', 'order', 'knobs',
            'acorn', 'grape', 'wider', 'gully', 'curve', 'creek', 'knobs', 'stops',
            'heaps', 'order', 'marsh', 'shaft', 'woods', 'acorn', 'order', 'order',
            'order', 'which', 'there', 'their', 'about', 'would', 'these', 'other',
            'words', 'could', 'write', 'first', 'water', 'after', 'where', 'right',
            'think', 'three', 'years', 'place', 'sound', 'great', 'again', 'still',
            'every', 'small', 'found', 'those', 'never', 'under', 'might', 'while',
            'house', 'world', 'below', 'asked', 'going', 'large', 'until', 'along',
            'shall', 'being', 'often', 'earth', 'began', 'since', 'study', 'night',
            'light', 'above', 'paper', 'parts', 'young', 'story', 'point', 'times',
            'heard', 'whole', 'white', 'given', 'means', 'music', 'miles', 'thing',
            'today', 'later', 'using', 'money', 'lines', 'order', 'group', 'among',
            'learn', 'known', 'space', 'table', 'early', 'trees', 'short', 'hands',
            'state', 'black', 'shown', 'stood', 'front', 'voice', 'kinds', 'makes',
            'comes', 'close', 'power', 'lived', 'vowel', 'taken', 'built', 'heart',
            'ready', 'quite', 'class', 'bring', 'round', 'horse', 'shows', 'piece',
            'green', 'stand', 'birds', 'start', 'river', 'tried', 'least', 'field',
            'whose', 'girls', 'leave', 'added', 'color', 'third', 'hours', 'moved',
            'plant', 'doing', 'names', 'forms', 'heavy', 'ideas', 'cried', 'check',
            'floor', 'begin', 'woman', 'alone', 'plane', 'spell', 'watch', 'carry',
            'wrote', 'clear', 'named', 'books', 'child', 'glass', 'human', 'takes',
            'party', 'build', 'seems', 'blood', 'sides', 'seven', 'mouth', 'solve',
            'north', 'value', 'death', 'maybe', 'happy', 'tells', 'gives', 'looks',
            'shape', 'lives', 'steps', 'areas', 'sense', 'speak', 'force', 'ocean',
            'speed', 'women', 'metal', 'south', 'grass', 'scale', 'cells', 'lower',
            'sleep', 'wrong', 'pages', 'ships', 'needs', 'rocks', 'eight', 'major',
            'level', 'total', 'ahead', 'reach', 'stars', 'store', 'sight', 'terms',
            'catch', 'works', 'board', 'cover', 'songs', 'equal', 'stone', 'waves',
            'guess', 'dance', 'spoke', 'break', 'cause', 'radio', 'weeks', 'lands',
            'basic', 'liked', 'trade', 'fresh', 'final', 'fight', 'meant', 'drive',
            'spent', 'local', 'waxes', 'knows', 'train', 'bread', 'homes', 'teeth',
            'coast', 'thick', 'brown', 'clean', 'quiet', 'hairy', 'lover', 'adieu',
            'jeets'
        ];

        // Randomly select a word from the customWords array and assign it to the word variable
        word = "jeets";
        console.log("Selected word:", word);
    }

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    function updateGuessedWords(letter) {
        if (isWordSubmitted) return; // Prevent typing if a word is submitted

        const currentWordArr = getCurrentWordArr();

        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));

            availableSpace = availableSpace + 1;
            availableSpaceEl.textContent = letter;
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "rgb(58, 58, 60)";
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if (isCorrectPosition) {
            return "rgb(83, 141, 78)";
        }

        return "rgb(181, 159, 59)";
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !== 5) {
            window.alert("Word must be 5 letters");
            return;
        }

        const currentWord = currentWordArr.join("").toLowerCase(); // Convert to lowercase
        const customWords = [
            'which', 'there', 'their', 'about', 'would', 'these', 'other', 'words',
            'could', 'write', 'first', 'water', 'after', 'where', 'right', 'think',
            'three', 'years', 'place', 'sound', 'great', 'again', 'still', 'every',
            'small', 'found', 'those', 'never', 'under', 'might', 'while', 'house',
            'world', 'below', 'asked', 'going', 'large', 'until', 'along', 'shall',
            'being', 'often', 'earth', 'began', 'since', 'study', 'night', 'light',
            'above', 'paper', 'parts', 'young', 'story', 'point', 'times', 'heard',
            'whole', 'white', 'given', 'means', 'music', 'miles', 'thing', 'today',
            'later', 'using', 'money', 'lines', 'order', 'group', 'among', 'learn',
            'known', 'space', 'table', 'early', 'trees', 'short', 'hands', 'state',
            'black', 'shown', 'stood', 'front', 'voice', 'kinds', 'makes', 'comes',
            'close', 'power', 'lived', 'vowel', 'taken', 'built', 'heart', 'ready',
            'quite', 'class', 'bring', 'round', 'horse', 'shows', 'piece', 'green',
            'stand', 'birds', 'start', 'river', 'tried', 'least', 'field', 'whose',
            'girls', 'leave', 'added', 'color', 'third', 'hours', 'moved', 'plant',
            'doing', 'names', 'forms', 'heavy', 'ideas', 'cried', 'check', 'floor',
            'begin', 'woman', 'alone', 'plane', 'spell', 'watch', 'carry', 'wrote',
            'clear', 'named', 'books', 'child', 'glass', 'human', 'takes', 'party',
            'build', 'seems', 'blood', 'sides', 'seven', 'mouth', 'solve', 'north',
            'value', 'death', 'maybe', 'happy', 'tells', 'gives', 'looks', 'shape',
            'lives', 'steps', 'areas', 'sense', 'speak', 'force', 'ocean', 'speed',
            'women', 'metal', 'south', 'grass', 'scale', 'cells', 'lower', 'sleep',
            'wrong', 'pages', 'ships', 'needs', 'rocks', 'eight', 'major', 'level',
            'total', 'ahead', 'reach', 'stars', 'store', 'sight', 'terms', 'catch',
            'works', 'board', 'cover', 'songs', 'equal', 'stone', 'waves', 'guess',
            'dance', 'spoke', 'break', 'cause', 'radio', 'weeks', 'lands', 'basic',
            'liked', 'trade', 'fresh', 'final', 'fight', 'meant', 'drive', 'spent',
            'local', 'waxes', 'knows', 'train', 'bread', 'homes', 'teeth', 'coast',
            'thick', 'brown', 'clean', 'quiet', 'sugar', 'facts', 'steel', 'forth',
            'rules', 'notes', 'units', 'peace', 'month', 'verbs', 'seeds', 'helps',
            'sharp', 'visit', 'woods', 'chief', 'walls', 'cross', 'wings', 'grown',
            'cases', 'foods', 'crops', 'fruit', 'stick', 'wants', 'stage', 'sheep',
            'nouns', 'plain', 'drink', 'bones', 'apart', 'turns', 'moves', 'touch',
            'angle', 'based', 'range', 'marks', 'tired', 'older', 'farms', 'spend',
            'shoes', 'goods', 'chair', 'twice', 'cents', 'empty', 'alike', 'style',
            'broke', 'pairs', 'count', 'enjoy', 'score', 'shore', 'roots', 'paint',
            'heads', 'shook', 'serve', 'angry', 'crowd', 'wheel', 'quick', 'dress',
            'share', 'alive', 'noise', 'solid', 'cloth', 'signs', 'hills', 'types',
            'drawn', 'worth', 'truck', 'piano', 'upper', 'loved', 'usual', 'faces',
            'drove', 'cabin', 'boats', 'towns', 'proud', 'court', 'model', 'prime',
            'fifty', 'plans', 'yards', 'prove', 'tools', 'price', 'sheet', 'smell',
            'boxes', 'raise', 'match', 'truth', 'roads', 'threw', 'enemy', 'lunch',
            'chart', 'scene', 'graph', 'doubt', 'guide', 'winds', 'block', 'grain',
            'smoke', 'mixed', 'games', 'wagon', 'sweet', 'topic', 'extra', 'plate',
            'title', 'knife', 'fence', 'falls', 'cloud', 'wheat', 'plays', 'enter',
            'broad', 'steam', 'atoms', 'press', 'lying', 'basis', 'clock', 'taste',
            'grows', 'thank', 'storm', 'agree', 'brain', 'track', 'smile', 'funny',
            'beach', 'stock', 'hurry', 'saved', 'sorry', 'giant', 'trail', 'offer',
            'ought', 'rough', 'daily', 'avoid', 'keeps', 'throw', 'allow', 'cream',
            'laugh', 'edges', 'teach', 'frame', 'bells', 'dream', 'magic', 'occur',
            'ended', 'chord', 'false', 'skill', 'holes', 'dozen', 'brave', 'apple',
            'climb', 'outer', 'pitch', 'ruler', 'holds', 'fixed', 'costs', 'calls',
            'blank', 'staff', 'labor', 'eaten', 'youth', 'tones', 'honor', 'globe',
            'gases', 'doors', 'poles', 'loose', 'apply', 'tears', 'exact', 'brush',
            'chest', 'layer', 'whale', 'minor', 'faith', 'tests', 'judge', 'items',
            'worry', 'waste', 'hoped', 'strip', 'begun', 'aside', 'lakes', 'bound',
            'depth', 'candy', 'event', 'worse', 'aware', 'shell', 'rooms', 'ranch',
            'image', 'snake', 'aloud', 'dried', 'likes', 'motor', 'pound', 'knees',
            'refer', 'fully', 'chain', 'shirt', 'flour', 'drops', 'spite', 'orbit',
            'banks', 'shoot', 'curve', 'tribe', 'tight', 'blind', 'slept', 'shade',
            'claim', 'flies', 'theme', 'queen', 'fifth', 'union', 'hence', 'straw',
            'entry', 'issue', 'birth', 'feels', 'anger', 'brief', 'rhyme', 'glory',
            'guard', 'flows', 'flesh', 'owned', 'trick', 'yours', 'sizes', 'noted',
            'width', 'burst', 'route', 'lungs', 'uncle', 'bears', 'royal', 'kings',
            'forty', 'trial', 'cards', 'brass', 'opera', 'chose', 'owner', 'vapor',
            'beats', 'mouse', 'tough', 'wires', 'meter', 'tower', 'finds', 'inner',
            'stuck', 'arrow', 'poems', 'label', 'swing', 'solar', 'truly', 'tense',
            'beans', 'split', 'rises', 'weigh', 'hotel', 'stems', 'pride', 'swung',
            'grade', 'digit', 'badly', 'boots', 'pilot', 'sales', 'swept', 'lucky',
            'prize', 'stove', 'tubes', 'acres', 'wound', 'steep', 'slide', 'trunk',
            'error', 'porch', 'slave', 'exist', 'faced', 'mines', 'marry', 'juice',
            'raced', 'waved', 'goose', 'trust', 'fewer', 'favor', 'mills', 'views',
            'joint', 'eager', 'spots', 'blend', 'rings', 'adult', 'index', 'nails',
            'horns', 'balls', 'flame', 'rates', 'drill', 'trace', 'skins', 'waxed',
            'seats', 'stuff', 'ratio', 'minds', 'dirty', 'silly', 'coins', 'hello',
            'trips', 'leads', 'rifle', 'hopes', 'bases', 'shine', 'bench', 'moral',
            'fires', 'meals', 'shake', 'shops', 'cycle', 'movie', 'slope', 'canoe',
            'teams', 'folks', 'fired', 'bands', 'thumb', 'shout', 'canal', 'habit',
            'reply', 'ruled', 'fever', 'crust', 'shelf', 'walks', 'midst', 'crack',
            'print', 'tales', 'coach', 'stiff', 'flood', 'verse', 'awake', 'rocky',
            'march', 'fault', 'swift', 'faint', 'civil', 'ghost', 'feast', 'blade',
            'limit', 'germs', 'reads', 'ducks', 'dairy', 'worst', 'gifts', 'lists',
            'stops', 'rapid', 'brick', 'claws', 'beads', 'beast', 'skirt', 'cakes',
            'lions', 'frogs', 'doubt', 'admin', 'beams', 'props', 'dried', 'brood',
            'jelly', 'grape', 'flown', 'jetty', 'crush', 'mover', 'latch', 'stove',
            'rocky', 'round', 'exams', 'stops', 'scout', 'winds', 'crush', 'acorn',
            'brand', 'order', 'slope', 'pools', 'shaft', 'heaps', 'falls', 'latch',
            'goods', 'poles', 'knobs', 'chase', 'throw', 'joins', 'gully', 'flown',
            'crush', 'whale', 'aided', 'trout', 'fifty', 'shame', 'exams', 'curve',
            'seeds', 'grape', 'float', 'woods', 'tract', 'souls', 'wedge', 'curbs',
            'throw', 'curbs', 'scout', 'rocks', 'tract', 'curve', 'truck', 'creek',
            'marsh', 'order', 'wedge', 'wider', 'scout', 'float', 'grape', 'latch',
            'throw', 'shaft', 'woods', 'knobs', 'order', 'souls', 'marsh', 'curve',
            'creek', 'creep', 'gully', 'wider', 'heaps', 'souls', 'shame', 'stops',
            'creep', 'gully', 'order', 'knobs', 'acorn', 'grape', 'wider', 'gully',
            'curve', 'creek', 'knobs', 'stops', 'heaps', 'order', 'marsh', 'shaft',
            'woods', 'acorn', 'order', 'shaft', 'woods', 'acorn', 'order', 'order',
            'order', 'which',
            'there', 'their', 'about', 'would', 'these', 'other', 'words', 'could',
            'write', 'first', 'water', 'after', 'where', 'right', 'think', 'three',
            'years', 'place', 'sound', 'great', 'again', 'still', 'every', 'small',
            'found', 'those', 'never', 'under', 'might', 'while', 'house', 'world',
            'below', 'asked', 'going', 'large', 'until', 'along', 'shall', 'being',
            'often', 'earth', 'began', 'since', 'study', 'night', 'light', 'above',
            'paper', 'parts', 'young', 'story', 'point', 'times', 'heard', 'whole',
            'white', 'given', 'means', 'music', 'miles', 'thing', 'today', 'later',
            'using', 'money', 'lines', 'order', 'group', 'among', 'learn', 'known',
            'space', 'table', 'early', 'trees', 'short', 'hands', 'state', 'black',
            'shown', 'stood', 'front', 'voice', 'kinds', 'makes', 'comes', 'close',
            'power', 'lived', 'vowel', 'taken', 'built', 'heart', 'ready', 'quite',
            'class', 'bring', 'round', 'horse', 'shows', 'piece', 'green', 'stand',
            'birds', 'start', 'river', 'tried', 'least', 'field', 'whose', 'girls',
            'leave', 'added', 'color', 'third', 'hours', 'moved', 'plant', 'doing',
            'names', 'forms', 'heavy', 'ideas', 'cried', 'check', 'floor', 'begin',
            'woman', 'alone', 'plane', 'spell', 'watch', 'carry', 'wrote', 'clear',
            'named', 'books', 'child', 'glass', 'human', 'takes', 'party', 'build',
            'seems', 'blood', 'sides', 'seven', 'mouth', 'solve', 'north', 'value',
            'death', 'maybe', 'happy', 'tells', 'gives', 'looks', 'shape', 'lives',
            'steps', 'areas', 'sense', 'speak', 'force', 'ocean', 'speed', 'women',
            'metal', 'south', 'grass', 'scale', 'cells', 'lower', 'sleep', 'wrong',
            'pages', 'ships', 'needs', 'rocks', 'eight', 'major', 'level', 'total',
            'ahead', 'reach', 'stars', 'store', 'sight', 'terms', 'catch', 'works',
            'board', 'cover', 'songs', 'equal', 'stone', 'waves', 'guess', 'dance',
            'spoke', 'break', 'cause', 'radio', 'weeks', 'lands', 'basic', 'liked',
            'trade', 'fresh', 'final', 'fight', 'meant', 'drive', 'spent', 'local',
            'waxes', 'knows', 'train', 'bread', 'homes', 'teeth', 'coast', 'thick',
            'brown', 'clean', 'quiet', 'sugar', 'facts', 'steel', 'forth', 'rules',
            'notes', 'units', 'peace', 'month', 'verbs', 'seeds', 'helps', 'sharp',
            'visit', 'woods', 'chief', 'walls', 'cross', 'wings', 'grown', 'cases',
            'foods', 'crops', 'fruit', 'stick', 'wants', 'stage', 'sheep', 'nouns',
            'plain', 'drink', 'bones', 'apart', 'turns', 'moves', 'touch', 'angle',
            'based', 'range', 'marks', 'tired', 'older', 'farms', 'spend', 'shoes',
            'goods', 'chair', 'twice', 'cents', 'empty', 'alike', 'style', 'broke',
            'pairs', 'count', 'enjoy', 'score', 'shore', 'roots', 'paint', 'heads',
            'shook', 'serve', 'angry', 'crowd', 'wheel', 'quick', 'dress', 'share',
            'alive', 'noise', 'solid', 'cloth', 'signs', 'hills', 'types', 'drawn',
            'worth', 'truck', 'piano', 'upper', 'loved', 'usual', 'faces', 'drove',
            'cabin', 'boats', 'towns', 'proud', 'court', 'model', 'prime', 'fifty',
            'plans', 'yards', 'prove', 'tools', 'price', 'sheet', 'smell', 'boxes',
            'raise', 'match', 'truth', 'roads', 'threw', 'enemy', 'lunch', 'chart',
            'scene', 'graph', 'doubt', 'guide', 'winds', 'block', 'grain', 'smoke',
            'mixed', 'games', 'wagon', 'sweet', 'topic', 'extra', 'plate', 'title',
            'knife', 'fence', 'falls', 'cloud', 'wheat', 'plays', 'enter', 'broad',
            'steam', 'atoms', 'press', 'lying', 'basis', 'clock', 'taste', 'grows',
            'thank', 'storm', 'agree', 'brain', 'track', 'smile', 'funny', 'beach',
            'stock', 'hurry', 'saved', 'sorry', 'giant', 'trail', 'offer', 'ought',
            'rough', 'daily', 'avoid', 'keeps', 'throw', 'allow', 'cream', 'laugh',
            'edges', 'teach', 'frame', 'bells', 'dream', 'magic', 'occur', 'ended',
            'chord', 'false', 'skill', 'holes', 'dozen', 'brave', 'apple', 'climb',
            'outer', 'pitch', 'ruler', 'holds', 'fixed', 'costs', 'calls', 'blank',
            'staff', 'labor', 'eaten', 'youth', 'tones', 'honor', 'globe', 'gases',
            'doors', 'poles', 'loose', 'apply', 'tears', 'exact', 'brush', 'chest',
            'layer', 'whale', 'minor', 'faith', 'tests', 'judge', 'items', 'worry',
            'waste', 'hoped', 'strip', 'begun', 'aside', 'lakes', 'bound', 'depth',
            'candy', 'event', 'worse', 'aware', 'shell', 'rooms', 'ranch', 'image',
            'snake', 'aloud', 'dried', 'likes', 'motor', 'pound', 'knees', 'refer',
            'fully', 'chain', 'shirt', 'flour', 'drops', 'spite', 'orbit', 'banks',
            'shoot', 'curve', 'tribe', 'tight', 'blind', 'slept', 'shade', 'claim',
            'flies', 'theme', 'queen', 'fifth', 'union', 'hence', 'straw', 'entry',
            'issue', 'birth', 'feels', 'anger', 'brief', 'rhyme', 'glory', 'guard',
            'flows', 'flesh', 'owned', 'trick', 'yours', 'sizes', 'noted', 'width',
            'burst', 'route', 'lungs', 'uncle', 'bears', 'royal', 'kings', 'forty',
            'trial', 'cards', 'brass', 'opera', 'chose', 'owner', 'vapor', 'beats',
            'mouse', 'tough', 'wires', 'meter', 'tower', 'finds', 'inner', 'stuck',
            'arrow', 'poems', 'label', 'swing', 'solar', 'truly', 'tense', 'beans',
            'split', 'rises', 'weigh', 'hotel', 'stems', 'pride', 'swung', 'grade',
            'digit', 'badly', 'boots', 'pilot', 'sales', 'swept', 'lucky', 'prize',
            'stove', 'tubes', 'acres', 'wound', 'steep', 'slide', 'trunk', 'error',
            'porch', 'slave', 'exist', 'faced', 'mines', 'marry', 'juice', 'raced',
            'waved', 'goose', 'trust', 'fewer', 'favor', 'mills', 'views', 'joint',
            'eager', 'spots', 'blend', 'rings', 'adult', 'index', 'nails', 'horns',
            'balls', 'flame', 'rates', 'drill', 'trace', 'skins', 'waxed', 'seats',
            'stuff', 'ratio', 'minds', 'dirty', 'silly', 'coins', 'hello', 'trips',
            'leads', 'rifle', 'hopes', 'bases', 'shine', 'bench', 'moral', 'fires',
            'meals', 'shake', 'shops', 'cycle', 'movie', 'slope', 'canoe', 'teams',
            'folks', 'fired', 'bands', 'thumb', 'shout', 'canal', 'habit', 'reply',
            'ruled', 'fever', 'crust', 'shelf', 'walks', 'midst', 'crack', 'print',
            'tales', 'coach', 'stiff', 'flood', 'verse', 'awake', 'rocky', 'march',
            'fault', 'swift', 'faint', 'civil', 'ghost', 'feast', 'blade', 'limit',
            'germs', 'reads', 'ducks', 'dairy', 'worst', 'gifts', 'lists', 'stops',
            'rapid', 'brick', 'claws', 'beads', 'beast', 'skirt', 'cakes', 'lions',
            'frogs', 'doubt', 'admin', 'beams', 'props', 'dried', 'brood', 'jelly',
            'grape', 'flown', 'jetty', 'crush', 'mover', 'latch', 'stove', 'rocky',
            'round', 'exams', 'stops', 'scout', 'winds', 'crush', 'acorn', 'brand',
            'order', 'slope', 'pools', 'shaft', 'heaps', 'falls', 'latch', 'goods',
            'poles', 'knobs', 'chase', 'throw', 'joins', 'gully', 'flown', 'crush',
            'whale', 'aided', 'trout', 'fifty', 'shame', 'exams', 'curve', 'seeds',
            'grape', 'float', 'woods', 'tract', 'souls', 'wedge', 'curbs', 'throw',
            'curbs', 'scout', 'rocks', 'tract', 'curve', 'truck', 'creek', 'marsh',
            'order', 'wedge', 'wider', 'scout', 'float', 'grape', 'latch', 'throw',
            'shaft', 'woods', 'knobs', 'order', 'souls', 'marsh', 'curve', 'creek',
            'creep', 'gully', 'wider', 'heaps', 'souls', 'shame', 'stops', 'creep',
            'gully', 'order', 'knobs', 'acorn', 'grape', 'wider', 'gully', 'curve',
            'creek', 'knobs', 'stops', 'heaps', 'order', 'marsh', 'shaft', 'woods',
            'acorn', 'order', 'order', 'order', 'which', 'there', 'their', 'about',
            'would', 'these', 'other', 'words', 'could', 'write', 'first', 'water',
            'after', 'where', 'right', 'think', 'three', 'years', 'place', 'sound',
            'great', 'again', 'still', 'every', 'small', 'found', 'those', 'never',
            'under', 'might', 'while', 'house', 'world', 'below', 'asked', 'going',
            'large', 'until', 'along', 'shall', 'being', 'often', 'earth', 'began',
            'since', 'study', 'night', 'light', 'above', 'paper', 'parts', 'young',
            'story', 'point', 'times', 'heard', 'whole', 'white', 'given', 'means',
            'music', 'miles', 'thing', 'today', 'later', 'using', 'money', 'lines',
            'order', 'group', 'among', 'learn', 'known', 'space', 'table', 'early',
            'trees', 'short', 'hands', 'state', 'black', 'shown', 'stood', 'front',
            'voice', 'kinds', 'makes', 'comes', 'close', 'power', 'lived', 'vowel',
            'taken', 'built', 'heart', 'ready', 'quite', 'class', 'bring', 'round',
            'horse', 'shows', 'piece', 'green', 'stand', 'birds', 'start', 'river',
            'tried', 'least', 'field', 'whose', 'girls', 'leave', 'added', 'color',
            'third', 'hours', 'moved', 'plant', 'doing', 'names', 'forms', 'heavy',
            'ideas', 'cried', 'check', 'floor', 'begin', 'woman', 'alone', 'plane',
            'spell', 'watch', 'carry', 'wrote', 'clear', 'named', 'books', 'child',
            'glass', 'human', 'takes', 'party', 'build', 'seems', 'blood', 'sides',
            'seven', 'mouth', 'solve', 'north', 'value', 'death', 'maybe', 'happy',
            'tells', 'gives', 'looks', 'shape', 'lives', 'steps', 'areas', 'sense',
            'speak', 'force', 'ocean', 'speed', 'women', 'metal', 'south', 'grass',
            'scale', 'cells', 'lower', 'sleep', 'wrong', 'pages', 'ships', 'needs',
            'rocks', 'eight', 'major', 'level', 'total', 'ahead', 'reach', 'stars',
            'store', 'sight', 'terms', 'catch', 'works', 'board', 'cover', 'songs',
            'equal', 'stone', 'waves', 'guess', 'dance', 'spoke', 'break', 'cause',
            'radio', 'weeks', 'lands', 'basic', 'liked', 'trade', 'fresh', 'final',
            'fight', 'meant', 'drive', 'spent', 'local', 'waxes', 'knows', 'train',
            'bread', 'homes', 'teeth', 'coast', 'thick', 'brown', 'clean', 'quiet',
            'sugar', 'facts', 'steel', 'forth', 'rules', 'notes', 'units', 'peace',
            'month', 'verbs', 'seeds', 'helps', 'sharp', 'visit', 'woods', 'chief',
            'walls', 'cross', 'wings', 'grown', 'cases', 'foods', 'crops', 'fruit',
            'stick', 'wants', 'stage', 'sheep', 'nouns', 'plain', 'drink', 'bones',
            'apart', 'turns', 'moves', 'touch', 'angle', 'based', 'range', 'marks',
            'tired', 'older', 'farms', 'spend', 'shoes', 'goods', 'chair', 'twice',
            'cents', 'empty', 'alike', 'style', 'broke', 'pairs', 'count', 'enjoy',
            'score', 'shore', 'roots', 'paint', 'heads', 'shook', 'serve', 'angry',
            'crowd', 'wheel', 'quick', 'dress', 'share', 'alive', 'noise', 'solid',
            'cloth', 'signs', 'hills', 'types', 'drawn', 'worth', 'truck', 'piano',
            'upper', 'loved', 'usual', 'faces', 'drove', 'cabin', 'boats', 'towns',
            'proud', 'court', 'model', 'prime', 'fifty', 'plans', 'yards', 'prove',
            'tools', 'price', 'sheet', 'smell', 'boxes', 'raise', 'match', 'truth',
            'roads', 'threw', 'enemy', 'lunch', 'chart', 'scene', 'graph', 'doubt',
            'guide', 'winds', 'block', 'grain', 'smoke', 'mixed', 'games', 'wagon',
            'sweet', 'topic', 'extra', 'plate', 'title', 'knife', 'fence', 'falls',
            'cloud', 'wheat', 'plays', 'enter', 'broad', 'steam', 'atoms', 'press',
            'lying', 'basis', 'clock', 'taste', 'grows', 'thank', 'storm', 'agree',
            'brain', 'track', 'smile', 'funny', 'beach', 'stock', 'hurry', 'saved',
            'sorry', 'giant', 'trail', 'offer', 'ought', 'rough', 'daily', 'avoid',
            'keeps', 'throw', 'allow', 'cream', 'laugh', 'edges', 'teach', 'frame',
            'bells', 'dream', 'magic', 'occur', 'ended', 'chord', 'false', 'skill',
            'holes', 'dozen', 'brave', 'apple', 'climb', 'outer', 'pitch', 'ruler',
            'holds', 'fixed', 'costs', 'calls', 'blank', 'staff', 'labor', 'eaten',
            'youth', 'tones', 'honor', 'globe', 'gases', 'doors', 'poles', 'loose',
            'apply', 'tears', 'exact', 'brush', 'chest', 'layer', 'whale', 'minor',
            'faith', 'tests', 'judge', 'items', 'worry', 'waste', 'hoped', 'strip',
            'begun', 'aside', 'lakes', 'bound', 'depth', 'candy', 'event', 'worse',
            'aware', 'shell', 'rooms', 'ranch', 'image', 'snake', 'aloud', 'dried',
            'likes', 'motor', 'pound', 'knees', 'refer', 'fully', 'chain', 'shirt',
            'flour', 'drops', 'spite', 'orbit', 'banks', 'shoot', 'curve', 'tribe',
            'tight', 'blind', 'slept', 'shade', 'claim', 'flies', 'theme', 'queen',
            'fifth', 'union', 'hence', 'straw', 'entry', 'issue', 'birth', 'feels',
            'anger', 'brief', 'rhyme', 'glory', 'guard', 'flows', 'flesh', 'owned',
            'trick', 'yours', 'sizes', 'noted', 'width', 'burst', 'route', 'lungs',
            'uncle', 'bears', 'royal', 'kings', 'forty', 'trial', 'cards', 'brass',
            'opera', 'chose', 'owner', 'vapor', 'beats', 'mouse', 'tough', 'wires',
            'meter', 'tower', 'finds', 'inner', 'stuck', 'arrow', 'poems', 'label',
            'swing', 'solar', 'truly', 'tense', 'beans', 'split', 'rises', 'weigh',
            'hotel', 'stems', 'pride', 'swung', 'grade', 'digit', 'badly', 'boots',
            'pilot', 'sales', 'swept', 'lucky', 'prize', 'stove', 'tubes', 'acres',
            'wound', 'steep', 'slide', 'trunk', 'error', 'porch', 'slave', 'exist',
            'faced', 'mines', 'marry', 'juice', 'raced', 'waved', 'goose', 'trust',
            'fewer', 'favor', 'mills', 'views', 'joint', 'eager', 'spots', 'blend',
            'rings', 'adult', 'index', 'nails', 'horns', 'balls', 'flame', 'rates',
            'drill', 'trace', 'skins', 'waxed', 'seats', 'stuff', 'ratio', 'minds',
            'dirty', 'silly', 'coins', 'hello', 'trips', 'leads', 'rifle', 'hopes',
            'bases', 'shine', 'bench', 'moral', 'fires', 'meals', 'shake', 'shops',
            'cycle', 'movie', 'slope', 'canoe', 'teams', 'folks', 'fired', 'bands',
            'thumb', 'shout', 'canal', 'habit', 'reply', 'ruled', 'fever', 'crust',
            'shelf', 'walks', 'midst', 'crack', 'print', 'tales', 'coach', 'stiff',
            'flood', 'verse', 'awake', 'rocky', 'march', 'fault', 'swift', 'faint',
            'civil', 'ghost', 'feast', 'blade', 'limit', 'germs', 'reads', 'ducks',
            'dairy', 'worst', 'gifts', 'lists', 'stops', 'rapid', 'brick', 'claws',
            'beads', 'beast', 'skirt', 'cakes', 'lions', 'frogs', 'doubt', 'admin',
            'beams', 'props', 'dried', 'brood', 'jelly', 'grape', 'flown', 'jetty',
            'crush', 'mover', 'latch', 'stove', 'rocky', 'round', 'exams', 'stops',
            'scout', 'winds', 'crush', 'acorn', 'brand', 'order', 'slope', 'pools',
            'shaft', 'heaps', 'falls', 'latch', 'goods', 'poles', 'knobs', 'chase',
            'throw', 'joins', 'gully', 'flown', 'crush', 'whale', 'aided', 'trout',
            'fifty', 'shame', 'exams', 'curve', 'seeds', 'grape', 'float', 'woods',
            'tract', 'souls', 'wedge', 'curbs', 'throw', 'curbs', 'scout', 'rocks',
            'tract', 'curve', 'truck', 'creek', 'marsh', 'order', 'wedge', 'wider',
            'scout', 'float', 'grape', 'latch', 'throw', 'shaft', 'woods', 'knobs',
            'order', 'souls', 'marsh', 'curve', 'creek', 'creep', 'gully', 'wider',
            'heaps', 'souls', 'shame', 'stops', 'creep', 'gully', 'order', 'knobs',
            'acorn', 'grape', 'wider', 'gully', 'curve', 'creek', 'knobs', 'stops',
            'heaps', 'order', 'marsh', 'shaft', 'woods', 'acorn', 'order', 'order',
            'order', 'which', 'there', 'their', 'about', 'would', 'these', 'other',
            'words', 'could', 'write', 'first', 'water', 'after', 'where', 'right',
            'think', 'three', 'years', 'place', 'sound', 'great', 'again', 'still',
            'every', 'small', 'found', 'those', 'never', 'under', 'might', 'while',
            'house', 'world', 'below', 'asked', 'going', 'large', 'until', 'along',
            'shall', 'being', 'often', 'earth', 'began', 'since', 'study', 'night',
            'light', 'above', 'paper', 'parts', 'young', 'story', 'point', 'times',
            'heard', 'whole', 'white', 'given', 'means', 'music', 'miles', 'thing',
            'today', 'later', 'using', 'money', 'lines', 'order', 'group', 'among',
            'learn', 'known', 'space', 'table', 'early', 'trees', 'short', 'hands',
            'state', 'black', 'shown', 'stood', 'front', 'voice', 'kinds', 'makes',
            'comes', 'close', 'power', 'lived', 'vowel', 'taken', 'built', 'heart',
            'ready', 'quite', 'class', 'bring', 'round', 'horse', 'shows', 'piece',
            'green', 'stand', 'birds', 'start', 'river', 'tried', 'least', 'field',
            'whose', 'girls', 'leave', 'added', 'color', 'third', 'hours', 'moved',
            'plant', 'doing', 'names', 'forms', 'heavy', 'ideas', 'cried', 'check',
            'floor', 'begin', 'woman', 'alone', 'plane', 'spell', 'watch', 'carry',
            'wrote', 'clear', 'named', 'books', 'child', 'glass', 'human', 'takes',
            'party', 'build', 'seems', 'blood', 'sides', 'seven', 'mouth', 'solve',
            'north', 'value', 'death', 'maybe', 'happy', 'tells', 'gives', 'looks',
            'shape', 'lives', 'steps', 'areas', 'sense', 'speak', 'force', 'ocean',
            'speed', 'women', 'metal', 'south', 'grass', 'scale', 'cells', 'lower',
            'sleep', 'wrong', 'pages', 'ships', 'needs', 'rocks', 'eight', 'major',
            'level', 'total', 'ahead', 'reach', 'stars', 'store', 'sight', 'terms',
            'catch', 'works', 'board', 'cover', 'songs', 'equal', 'stone', 'waves',
            'guess', 'dance', 'spoke', 'break', 'cause', 'radio', 'weeks', 'lands',
            'basic', 'liked', 'trade', 'fresh', 'final', 'fight', 'meant', 'drive',
            'spent', 'local', 'waxes', 'knows', 'train', 'bread', 'homes', 'teeth',
            'coast', 'thick', 'brown', 'clean', 'quiet', 'hairy', 'lover', 'adieu',
            'jeets'
        ];

        if (!customWords.includes(currentWord)) {
            window.alert("The word you entered probably exist, but it's not in my database brah (i'm still learning)!");
            return;
        }

        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
        });

        guessedWordCount += 1;
        isWordSubmitted = true;  // Set flag to true when a word is submitted

        if (currentWord === word) {
            window.alert("Congratulations!");
            disableKeyboard();  // Disable keyboard after winning
            return;  // Exit the function early if the word is guessed correctly
        }

        if (guessedWords.length === 6) {
            window.alert(`Sorry, you have no more guesses! The word is ${word}.`);
            disableKeyboard();  // Disable keyboard after losing
            return;  // Exit the function early if no guesses are left
        }

        guessedWords.push([]);
        availableSpace = guessedWordCount * 5 + 1; // Update available space for the next guess
        isWordSubmitted = false;  // Reset flag for the next guess
    }

    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }

    function handleDeleteLetter() {
        if (isWordSubmitted) return; // Prevent deletion if a word is submitted

        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length > 0) {
            const removedLetter = currentWordArr.pop();
            guessedWords[guessedWords.length - 1] = currentWordArr;

            const lastLetterEl = document.getElementById(String(availableSpace - 1));

            lastLetterEl.textContent = "";
            availableSpace = availableSpace - 1;
        }
    }

    function disableKeyboard() {
        keys.forEach(key => key.disabled = true);
    }

    function enableKeyboard() {
        keys.forEach(key => key.disabled = false);
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            if (isWordSubmitted) return; // Prevent interaction if a word is submitted

            const letter = target.getAttribute("data-key");

            if (letter === "enter") {
                handleSubmitWord();
                return;
            }

            if (letter === "del") {
                handleDeleteLetter();
                return;
            }

            updateGuessedWords(letter);
        };
    }

    // Call this function to reset game state
    function resetGame() {
        guessedWords = [[]];
        availableSpace = 1;
        guessedWordCount = 0;
        isWordSubmitted = false;
        enableKeyboard();  // Re-enable keyboard for new game
        getNewWord();  // Get a new word
    }
});