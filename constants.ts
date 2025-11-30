import { Subject, SyllabusData, PredictionQuestion } from './types';

export const MOTIVATIONAL_QUOTES = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts. – Winston Churchill",
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Believe you can and you're halfway there. – Theodore Roosevelt",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn’t just find you. You have to go out and get it.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "Little things make big days.",
  "It’s going to be hard, but hard does not mean impossible.",
  "Don’t wait for opportunity. Create it.",
  "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
  "The key to success is to focus on goals, not obstacles.",
  "Dream it. Believe it. Build it.",
  "Your potential is endless. Go do what you were created to do."
];

export const SUBJECTS: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    color: 'bg-blue-600',
    icon: 'Calculator',
    description: 'Standard Mathematics (041)',
    topics: [
      { title: 'Real Numbers', description: 'Fundamental Theorem & Irrationals' },
      { title: 'Polynomials', description: 'Zeros, Coefficients & Graphs' },
      { title: 'Pair of Linear Equations in Two Variables', description: 'Substitution & Elimination Methods' },
      { title: 'Quadratic Equations', description: 'Roots & Quadratic Formula' },
      { title: 'Arithmetic Progressions', description: 'nth Term & Sum of Series' },
      { title: 'Triangles', description: 'BPT & Similarity Criteria' },
      { title: 'Coordinate Geometry', description: 'Distance & Section Formula' },
      { title: 'Introduction to Trigonometry', description: 'Ratios & Identities' },
      { title: 'Some Applications of Trigonometry', description: 'Heights & Distances' },
      { title: 'Circles', description: 'Tangents & Properties' },
      { title: 'Areas Related to Circles', description: 'Sectors & Segments' },
      { title: 'Surface Areas and Volumes', description: 'Combinations of Solids' },
      { title: 'Statistics', description: 'Mean, Median & Mode' },
      { title: 'Probability', description: 'Events & Outcomes' }
    ],
    references: [
      { title: 'NCERT Mathematics Textbook', url: 'https://ncert.nic.in/textbook.php?jemh1=0-15' },
      { title: 'Khan Academy Class 10 Math', url: 'https://www.khanacademy.org/math/in-in-grade-10-ncert' },
      { title: 'CBSE Academic Website', url: 'https://cbseacademic.nic.in/' },
      { title: 'GeoGebra Math Simulations', url: 'https://www.geogebra.org/' },
      { title: 'Cuemath Concept Guides', url: 'https://www.cuemath.com/ncert-solutions/class-10-maths/' }
    ]
  },
  {
    id: 'science',
    name: 'Science',
    color: 'bg-emerald-600',
    icon: 'FlaskConical',
    description: 'Physics, Chemistry, and Biology (086)',
    topics: [
      { title: 'Chemical Reactions and Equations', description: 'Balancing & Types of Reactions' },
      { title: 'Acids, Bases and Salts', description: 'pH Scale & Chemical Properties' },
      { title: 'Metals and Non-metals', description: 'Reactivity Series & Extraction' },
      { title: 'Carbon and its Compounds', description: 'Bonding & Homologous Series' },
      { title: 'Life Processes', description: 'Nutrition to Excretion' },
      { title: 'Control and Coordination', description: 'Nerves, Brain & Hormones' },
      { title: 'How do Organisms Reproduce?', description: 'Asexual & Sexual Modes' },
      { title: 'Heredity', description: 'Mendel’s Laws & Evolution Basics' },
      { title: 'Light – Reflection and Refraction', description: 'Mirrors, Lenses & Formulas' },
      { title: 'The Human Eye and the Colourful World', description: 'Defects, Prism & Scattering' },
      { title: 'Electricity', description: 'Ohm’s Law & Circuits' },
      { title: 'Magnetic Effects of Electric Current', description: 'Fields, Induction & Solenoids' },
      { title: 'Our Environment', description: 'Ecosystem & Waste Management' }
    ],
    references: [
      { title: 'NCERT Science Textbook', url: 'https://ncert.nic.in/textbook.php?jesc1=0-13' },
      { title: 'Khan Academy Class 10 Physics', url: 'https://www.khanacademy.org/science/class-10-physics-india' },
      { title: 'PhET Interactive Simulations', url: 'https://phet.colorado.edu/' },
      { title: 'National Geographic Education', url: 'https://education.nationalgeographic.org/' },
      { title: 'NASA STEM Engagement', url: 'https://www.nasa.gov/stem' }
    ]
  },
  {
    id: 'social',
    name: 'Social Science',
    color: 'bg-amber-600',
    icon: 'Globe',
    description: 'History, Geography, Pol. Science, Economics (087)',
    topics: [
      { title: 'History: The Rise of Nationalism in Europe', description: 'Nation-states & Revolution' },
      { title: 'History: Nationalism in India', description: 'Gandhian Era & Movements' },
      { title: 'History: The Making of a Global World (Sec 1-1.3)', description: 'Trade Routes & Exchange' },
      { title: 'History: Print Culture and the Modern World', description: 'Reading Mania & Revolution' },
      { title: 'Geography: Resources and Development', description: 'Types, Planning & Conservation' },
      { title: 'Geography: Forest and Wildlife Resources', description: 'Flora, Fauna & Protection' },
      { title: 'Geography: Water Resources', description: 'Dams & Scarcity' },
      { title: 'Geography: Agriculture', description: 'Crops, Seasons & Reforms' },
      { title: 'Geography: Minerals and Energy Resources', description: 'Ores & Conventional Energy' },
      { title: 'Geography: Manufacturing Industries', description: 'Economy & Pollution' },
      { title: 'Geography: Lifelines of National Economy', description: 'Transport & Communication' },
      { title: 'Civics: Power Sharing', description: 'Belgium & Sri Lanka Models' },
      { title: 'Civics: Federalism', description: 'Center-State Relations' },
      { title: 'Civics: Gender, Religion and Caste', description: 'Social Divisions & Politics' },
      { title: 'Civics: Political Parties', description: 'Roles & Challenges' },
      { title: 'Civics: Outcomes of Democracy', description: 'Accountable Government' },
      { title: 'Economics: Development', description: 'Income & Public Facilities' },
      { title: 'Economics: Sectors of the Indian Economy', description: 'Primary to Tertiary' },
      { title: 'Economics: Money and Credit', description: 'Banks, Loans & SHGs' },
      { title: 'Economics: Globalization (What is & Factors)', description: 'MNCs & Integration' }
    ],
    references: [
      { title: 'NCERT Social Science Textbooks', url: 'https://ncert.nic.in/textbook.php' },
      { title: 'Maps of India', url: 'https://www.mapsofindia.com/' },
      { title: 'United Nations Global Issues', url: 'https://www.un.org/en/global-issues' },
      { title: 'World History Encyclopedia', url: 'https://www.worldhistory.org/' },
      { title: 'Constitution of India', url: 'https://www.india.gov.in/my-government/constitution-india' }
    ]
  },
  {
    id: 'english',
    name: 'English',
    color: 'bg-rose-600',
    icon: 'BookOpen',
    description: 'Language and Literature (184)',
    topics: [
      { title: 'A Letter to God', description: 'Lencho\'s Faith' },
      { title: 'Nelson Mandela: Long Walk to Freedom', description: 'Apartheid & Courage' },
      { title: 'Two Stories about Flying', description: 'Seagull & Black Aeroplane' },
      { title: 'From the Diary of Anne Frank', description: 'Life in Hiding' },
      { title: 'Glimpses of India', description: 'Goa, Coorg & Assam' },
      { title: 'Mijbil the Otter', description: 'Bond with a Pet' },
      { title: 'Madam Rides the Bus', description: 'Valli\'s First Journey' },
      { title: 'The Sermon at Benares', description: 'Buddha\'s Wisdom on Death' },
      { title: 'The Proposal', description: 'Chekhov\'s One-act Play' },
      { title: 'Poem: Dust of Snow', description: 'Nature\'s Healing Power' },
      { title: 'Poem: Fire and Ice', description: 'Desire vs Hate' },
      { title: 'Poem: A Tiger in the Zoo', description: 'Captivity vs Wild' },
      { title: 'Poem: How to Tell Wild Animals', description: 'Humorous Identification' },
      { title: 'Poem: The Ball Poem', description: 'Loss & Responsibility' },
      { title: 'Poem: Amanda!', description: 'Freedom of a Child' },
      { title: 'Poem: The Trees', description: 'Nature Breaking Free' },
      { title: 'Poem: Fog', description: 'Silent Arrival' },
      { title: 'Poem: The Tale of Custard the Dragon', description: 'Bravery in Disguise' },
      { title: 'Poem: For Anne Gregory', description: 'Inner vs Outer Beauty' },
      { title: 'Footprints: A Triumph of Surgery', description: 'Tricki\'s Cure' },
      { title: 'Footprints: The Thief\'s Story', description: 'Trust & Reformation' },
      { title: 'Footprints: The Midnight Visitor', description: 'Ausable\'s Wit' },
      { title: 'Footprints: A Question of Trust', description: 'Horace Danby' },
      { title: 'Footprints: Footprints without Feet', description: 'Griffin the Scientist' },
      { title: 'Footprints: The Making of a Scientist', description: 'Richard Ebright' },
      { title: 'Footprints: The Necklace', description: 'Mathilde\'s Pride' },
      { title: 'Footprints: Bholi', description: 'From Stammer to Strength' },
      { title: 'Footprints: The Book That Saved the Earth', description: 'Nursery Rhymes' },
      { title: 'Grammar: Tenses', description: 'Time & Action Rules' },
      { title: 'Grammar: Modals', description: 'Possibility & Duty' },
      { title: 'Grammar: Subject - verb concord', description: 'Agreement Rules' },
      { title: 'Grammar: Reported speech', description: 'Direct to Indirect' },
      { title: 'Grammar: Determiners', description: 'Quantifiers & Articles' }
    ],
    references: [
      { title: 'British Council LearnEnglish', url: 'https://learnenglish.britishcouncil.org/' },
      { title: 'Purdue OWL Grammar Guide', url: 'https://owl.purdue.edu/owl/general_writing/index.html' },
      { title: 'SparkNotes Literature Guides', url: 'https://www.sparknotes.com/' },
      { title: 'Oxford Learner\'s Dictionaries', url: 'https://www.oxfordlearnersdictionaries.com/' },
      { title: 'Project Gutenberg (E-books)', url: 'https://www.gutenberg.org/' }
    ]
  },
  {
    id: 'sanskrit',
    name: 'Sanskrit',
    color: 'bg-orange-600',
    icon: 'Languages',
    description: 'Shemushi (Code 122)',
    topics: [
      { title: 'Suchiparyavaranam', description: 'Purity of Environment' },
      { title: 'Buddhirbalavati Sada', description: 'Wit over Strength' },
      { title: 'Shishulalanam', description: 'Affection for Child' },
      { title: 'Janani Tulyavatsala', description: 'Mother\'s Equal Love' },
      { title: 'Subhashitani', description: 'Wise Sayings' },
      { title: 'Sauhardam Prakriteh Shobha', description: 'Nature\'s Harmony' },
      { title: 'Vichitra Sakshi', description: 'The Strange Witness' },
      { title: 'Suktayah', description: 'Good Quotes' },
      { title: 'Bhukampavibhishika', description: 'Terror of Earthquake' },
      { title: 'Anyoktayah', description: 'Metaphorical Sayings' },
      { title: 'Grammar: Sandhi', description: 'Joining Words' },
      { title: 'Grammar: Samas', description: 'Compound Words' },
      { title: 'Grammar: Pratyaya', description: 'Suffixes' },
      { title: 'Grammar: Avyaya', description: 'Indeclinables' },
      { title: 'Grammar: Vachya Parivartan', description: 'Voice Change' }
    ],
    references: [
      { title: 'NCERT Sanskrit Textbooks', url: 'https://ncert.nic.in/textbook.php' },
      { title: 'Sanskrit Documents', url: 'https://sanskritdocuments.org/' },
      { title: 'Spoken Sanskrit Dictionary', url: 'https://spokensanskrit.org/' },
      { title: 'DD News Sanskrit (YouTube)', url: 'https://www.youtube.com/user/DDNewsOfficial' },
      { title: 'CBSE Sanskrit Resources', url: 'https://cbseacademic.nic.in/' }
    ]
  },
  {
    id: 'cs',
    name: 'Information Technology',
    color: 'bg-violet-600',
    icon: 'Monitor',
    description: 'Code 402',
    topics: [
      { title: 'Employability: Communication Skills', description: 'Verbal & Non-verbal' },
      { title: 'Employability: Self-Management', description: 'Stress & Regulation' },
      { title: 'Employability: ICT Skills', description: 'OS Basics & Maintenance' },
      { title: 'Employability: Entrepreneurial Skills', description: 'Roles & Qualities' },
      { title: 'Employability: Green Skills', description: 'Sustainable Development' },
      { title: 'Digital Documentation (Advanced)', description: 'Styles, TOC & Mail Merge' },
      { title: 'Electronic Spreadsheet (Advanced)', description: 'Scenarios, Solver & Macros' },
      { title: 'DBMS (Basic)', description: 'Tables, Keys & Queries' },
      { title: 'Web Applications: Accessibility', description: 'Options & Networking' },
      { title: 'Web Applications: Security', description: 'Workplace Safety & Health' }
    ],
    references: [
      { title: 'CBSE IT Code 402 Handbook', url: 'https://cbseacademic.nic.in/web_material/Curriculum21/publication/secondary/IT402_ClassX.pdf' },
      { title: 'OpenOffice/LibreOffice Docs', url: 'https://documentation.libreoffice.org/en/english-documentation/' },
      { title: 'W3Schools (Web Apps)', url: 'https://www.w3schools.com/' },
      { title: 'Khan Academy Computing', url: 'https://www.khanacademy.org/computing' },
      { title: 'Codecademy', url: 'https://www.codecademy.com/' }
    ]
  }
];

export const SYLLABUS_DATA: SyllabusData[] = [
  {
    subjectId: 'math',
    units: [
      {
        title: 'Unit I: Number Systems',
        marks: 6,
        topics: ['Real Numbers: Fundamental Theorem of Arithmetic, Proofs of irrationality of √2, √3, √5.']
      },
      {
        title: 'Unit II: Algebra',
        marks: 20,
        topics: [
          'Polynomials: Zeros of a polynomial, Relationship between zeros and coefficients.',
          'Pair of Linear Equations: Graphical and Algebraic methods (Substitution, Elimination), Simple situational problems.',
          'Quadratic Equations: Standard form, Factorization, Quadratic Formula, Nature of roots.',
          'Arithmetic Progressions: nth term and sum of first n terms.'
        ]
      },
      {
        title: 'Unit III: Coordinate Geometry',
        marks: 6,
        topics: ['Lines (In two-dimensions): Graphs of linear equations, Distance formula, Section formula.']
      },
      {
        title: 'Unit IV: Geometry',
        marks: 15,
        topics: [
          'Triangles: Basic Proportionality Theorem, Criteria for Similarity.',
          'Circles: Tangent to a circle, Length of tangents from an external point.'
        ]
      },
      {
        title: 'Unit V: Trigonometry',
        marks: 12,
        topics: [
          'Introduction: Ratios of acute angles (30°, 45°, 60°), Relationships.',
          'Identities: Proof and application of sin²A + cos²A = 1.',
          'Heights and Distances: Angles of elevation and depression.'
        ]
      },
      {
        title: 'Unit VI: Mensuration',
        marks: 10,
        topics: [
          'Areas Related to Circles: Area of sectors and segments.',
          'Surface Areas and Volumes: Combinations of solids (Cubes, Cuboids, Spheres, Hemispheres, Cylinders, Cones).'
        ]
      },
      {
        title: 'Unit VII: Statistics and Probability',
        marks: 11,
        topics: [
          'Statistics: Mean, median and mode of grouped data.',
          'Probability: Classical definition, Simple problems.'
        ]
      }
    ]
  },
  {
    subjectId: 'science',
    units: [
      {
        title: 'Unit I: Chemical Substances',
        marks: 25,
        topics: [
            'Chemical Reactions: Types of reactions, Oxidation/Reduction.',
            'Acids, Bases and Salts: pH scale, properties, common salts.',
            'Metals and Non-metals: Properties, Reactivity series, Ionic compounds.',
            'Carbon compounds: Covalent bonding, Versatile nature, Homologous series, Functional groups.'
        ]
      },
      {
        title: 'Unit II: World of Living',
        marks: 25,
        topics: [
            'Life Processes: Nutrition, Respiration, Transport, Excretion.', 
            'Control and Coordination: Plants and Animals (Hormones, Nervous system).',
            'Reproduction: Asexual and Sexual, Health.', 
            'Heredity: Mendel’s contribution, Sex determination.'
        ]
      },
      {
        title: 'Unit III: Natural Phenomena',
        marks: 12,
        topics: ['Reflection and Refraction: Mirrors, Lenses, Formulas.', 'The Human Eye: Defects, Prism, Dispersion, Scattering.']
      },
      {
        title: 'Unit IV: Effects of Current',
        marks: 13,
        topics: ['Electricity: Ohm\'s law, Series/Parallel, Heating effect.', 'Magnetic Effects: Field lines, Current carrying conductor, Solenoid.']
      },
      {
        title: 'Unit V: Natural Resources',
        marks: 5,
        topics: ['Our Environment: Ecosystem, Food chains, Ozone depletion, Waste management.']
      }
    ]
  },
  {
    subjectId: 'social',
    units: [
      {
        title: 'Unit I: India and the Contemporary World - II (History)',
        marks: 20,
        topics: [
            'Rise of Nationalism in Europe', 
            'Nationalism in India', 
            'Making of a Global World (Sub-topics 1 to 1.3 only)', 
            'Print Culture and the Modern World'
        ]
      },
      {
        title: 'Unit II: Contemporary India - II (Geography)',
        marks: 20,
        topics: [
            'Resources and Development', 'Forest and Wildlife', 'Water Resources', 
            'Agriculture', 'Minerals and Energy', 'Manufacturing Industries', 
            'Lifelines of National Economy'
        ]
      },
      {
        title: 'Unit III: Democratic Politics - II (Civics)',
        marks: 20,
        topics: [
            'Power Sharing', 'Federalism', 'Gender, Religion and Caste', 
            'Political Parties', 'Outcomes of Democracy'
        ]
      },
      {
        title: 'Unit IV: Understanding Economic Development',
        marks: 20,
        topics: [
            'Development', 'Sectors of the Indian Economy', 'Money and Credit', 
            'Globalization and the Indian Economy (What is Globalization + Factors only)'
        ]
      }
    ]
  },
  {
    subjectId: 'english',
    units: [
      {
        title: 'Section A: Reading Skills',
        marks: 20,
        topics: ['Discursive Passage (10 marks)', 'Case-based Factual Passage (10 marks)']
      },
      {
        title: 'Section B: Grammar and Creative Writing',
        marks: 20,
        topics: [
            'Grammar: Tenses, Modals, Subject-verb concord, Reported speech, Determiners.',
            'Writing: Formal Letter (5 marks), Analytical Paragraph (5 marks).'
        ]
      },
      {
        title: 'Section C: Literature Textbook and Supp. Reading',
        marks: 40,
        topics: [
            'First Flight (Prose & Poetry): Extracts and Q&A.', 
            'Footprints Without Feet: Extracts and Q&A.'
        ]
      }
    ]
  },
  {
    subjectId: 'sanskrit',
    units: [
      {
        title: 'Section A: Unseen Passage (Apathit Avabodhanam)',
        marks: 10,
        topics: ['Comprehension of 80-100 words passage']
      },
      {
        title: 'Section B: Creative Writing (Rachanatmakam)',
        marks: 15,
        topics: ['Letter writing', 'Picture description', 'Translation (Hindi/Eng to Sanskrit)']
      },
      {
        title: 'Section C: Applied Grammar (Anuprayukt Vyakaranam)',
        marks: 25,
        topics: ['Sandhi', 'Samas', 'Pratyaya', 'Vachya Parivartan', 'Samaya', 'Avyaya', 'Ashudhi Sanshodhan']
      },
      {
        title: 'Section D: Literature (Pathit Avabodhanam)',
        marks: 30,
        topics: ['Shemushi Textbook: Passage comprehension, Shloka Anvay, Meaning, Event sequencing']
      }
    ]
  },
  {
    subjectId: 'cs',
    units: [
      {
        title: 'Part A: Employability Skills',
        marks: 10,
        topics: ['Communication Skills-II', 'Self-management Skills-II', 'ICT Skills-II', 'Entrepreneurial Skills-II', 'Green Skills-II']
      },
      {
        title: 'Part B: Subject Specific Skills',
        marks: 40,
        topics: [
            'Digital Documentation (Advanced) - LibreOffice Writer',
            'Electronic Spreadsheet (Advanced) - LibreOffice Calc',
            'Database Management System - LibreOffice Base',
            'Web Applications and Security'
        ]
      },
      {
        title: 'Part C: Practical Work',
        marks: 35,
        topics: ['Advanced Documentation', 'Advanced Spreadsheets', 'Database Queries', 'Viva Voce']
      },
      {
        title: 'Part D: Project Work/Field Visit',
        marks: 15,
        topics: ['Practical File', 'Student Portfolio', 'Viva Voce']
      }
    ]
  }
];

export const MOCK_NOTE_CONTENT = {
  summary: "Welcome to Note4Afsheen! You are currently viewing sample content because the app is running in offline mode. Connect a valid API Key to generate real-time AI summaries for this chapter.",
  keyConcepts: [
    "Fundamental Definition: Understand the core concept first.",
    "Real-world Application: How is this used in daily life?",
    "Critical Analysis: Pros, cons, and limitations.",
    "Important Terminology: Memorize the bold terms in your textbook."
  ],
  formulas: [
    "General Formula: A + B = C",
    "Area of Circle: A = πr²",
    "Force: F = ma"
  ],
  importantQuestions: [
    { question: "What is the primary definition of this topic?", answer: "The primary definition refers to the core principle described in the NCERT textbook introduction." },
    { question: "Explain one major application with an example.", answer: "One major application is in industrial processes, such as the example given in the chapter case study." },
    { question: "Differentiate between Type A and Type B.", answer: "Type A focuses on structure, while Type B focuses on function. See table 2.1 in your book." }
  ]
};

// Curated Expected Questions for 2026 Board Exams
export const PREDICTED_QUESTIONS_2026: PredictionQuestion[] = [
  // --- MATHEMATICS (30 Questions) ---
  { id: 'm1', subjectId: 'math', chapter: 'Quadratic Equations', type: 'Long', marks: 5, question: 'A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less for the same journey. Find the speed of the train.', answer: 'Let original speed be x km/h. \nTime taken = 360/x. \nNew speed = (x+5) km/h. New time = 360/(x+5). \nEquation: 360/x - 360/(x+5) = 1. \nSolving: x² + 5x - 1800 = 0. \nFactors: (x+45)(x-40)=0. \nSpeed cannot be negative, so x = 40 km/h.' },
  { id: 'm2', subjectId: 'math', chapter: 'Triangles', type: 'Long', marks: 5, question: 'State and prove the Basic Proportionality Theorem (Thales Theorem). Using it, prove that the line joining the mid-points of any two sides of a triangle is parallel to the third side.', answer: 'Statement: If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, the other two sides are divided in the same ratio. \nProof requires constructing perpendiculars and joining vertices to calculate Area ratios. \nPart 2: If D and E are midpoints, AD/DB = 1 and AE/EC = 1. By converse of BPT, DE || BC.' },
  { id: 'm3', subjectId: 'math', chapter: 'Surface Areas and Volumes', type: 'Case Study', marks: 4, question: 'Case Study: A tent is in the shape of a cylinder surmounted by a conical top. If the height and diameter of the cylindrical part are 2.1 m and 4 m respectively, and the slant height of the top is 2.8 m, find the area of the canvas used for making the tent.', answer: 'Radius r = 2m. Cylinder Height h = 2.1m. Cone Slant Height l = 2.8m. \nCanvas Area = CSA of Cylinder + CSA of Cone. \nCSA Cylinder = 2πrh = 2 × 22/7 × 2 × 2.1 = 26.4 m². \nCSA Cone = πrl = 22/7 × 2 × 2.8 = 17.6 m². \nTotal Area = 26.4 + 17.6 = 44 m².' },
  { id: 'm4', subjectId: 'math', chapter: 'Statistics', type: 'Long', marks: 3, question: 'If the median of the distribution is 28.5, find the values of x and y. Total frequency is 60. Class intervals: 0-10, 10-20... etc.', answer: 'Construct cumulative frequency table. \nMedian is 28.5, so median class is 20-30. \nEquation 1: 45 + x + y = 60 => x + y = 15. \nEquation 2 (Median Formula): 28.5 = 20 + [(30 - (5+x))/20] × 10. \nSolving gives x = 8. \nSubstituting x in Eq 1, y = 7.' },
  { id: 'm5', subjectId: 'math', chapter: 'Trigonometry', type: 'Short', marks: 3, question: 'Prove that (sin A + cosec A)² + (cos A + sec A)² = 7 + tan²A + cot²A.', answer: 'LHS = sin²A + cosec²A + 2sinAcosecA + cos²A + sec²A + 2cosAsecA. \n= (sin²A + cos²A) + (1 + cot²A) + (1 + tan²A) + 2(1) + 2(1). \n= 1 + 1 + cot²A + 1 + tan²A + 4. \n= 7 + tan²A + cot²A = RHS.' },
  { id: 'm6', subjectId: 'math', chapter: 'Real Numbers', type: 'Short', marks: 3, question: 'Prove that √3 is an irrational number.', answer: 'Assumption: √3 is rational, i.e., √3 = a/b (a, b co-prime). \n3 = a²/b² => 3b² = a². 3 divides a², so 3 divides a. \nLet a = 3c. Then 3b² = (3c)² => b² = 3c². 3 divides b², so 3 divides b. \nContradiction: a and b have common factor 3. \nHence, √3 is irrational.' },
  { id: 'm7', subjectId: 'math', chapter: 'Polynomials', type: 'Short', marks: 2, question: 'If α and β are the zeros of the quadratic polynomial f(x) = x² - x - 4, find the value of 1/α + 1/β - αβ.', answer: 'α + β = -(-1)/1 = 1. \nαβ = -4/1 = -4. \n1/α + 1/β - αβ = (α + β)/αβ - αβ \n= 1/(-4) - (-4) = -0.25 + 4 = 3.75.' },
  { id: 'm8', subjectId: 'math', chapter: 'Pair of Linear Equations', type: 'Long', marks: 5, question: 'A boat goes 30 km upstream and 44 km downstream in 10 hours. In 13 hours, it can go 40 km upstream and 55 km downstream. Determine the speed of the stream and that of the boat in still water.', answer: 'Let speed of boat = u, stream = v. \nUpstream = u-v, Downstream = u+v. \nEq 1: 30/(u-v) + 44/(u+v) = 10. \nEq 2: 40/(u-v) + 55/(u+v) = 13. \nLet 1/(u-v) = x and 1/(u+v) = y. \nSolve 30x + 44y = 10 and 40x + 55y = 13. \nResult: u = 8 km/h, v = 3 km/h.' },
  { id: 'm9', subjectId: 'math', chapter: 'Arithmetic Progressions', type: 'Short', marks: 3, question: 'The sum of the 4th and 8th terms of an AP is 24 and the sum of the 6th and 10th terms is 44. Find the first three terms of the AP.', answer: 'a₄ + a₈ = 24 => (a+3d) + (a+7d) = 24 => 2a + 10d = 24. \na₆ + a₁₀ = 44 => (a+5d) + (a+9d) = 44 => 2a + 14d = 44. \nSubtracting Eq 1 from Eq 2: 4d = 20 => d = 5. \nSubstitute d=5 in Eq 1: 2a + 50 = 24 => 2a = -26 => a = -13. \nTerms: -13, -8, -3.' },
  { id: 'm10', subjectId: 'math', chapter: 'Circles', type: 'Long', marks: 4, question: 'Prove that the lengths of tangents drawn from an external point to a circle are equal.', answer: 'Given: Circle with center O, point P outside, tangents PQ and PR. \nTo Prove: PQ = PR. \nConstruction: Join OP, OQ, OR. \nProof: In triangles OQP and ORP: \nOQ = OR (Radii), OP = OP (Common), ∠OQP = ∠ORP = 90° (Radius ⊥ Tangent). \nBy RHS Congruence, ΔOQP ≅ ΔORP. \nBy CPCT, PQ = PR.' },
  { id: 'm11', subjectId: 'math', chapter: 'Areas Related to Circles', type: 'Short', marks: 3, question: 'Find the area of the shaded region where a circular arc of radius 6 cm has been drawn with vertex O of an equilateral triangle OAB of side 12 cm as centre.', answer: 'Area = Area of Circle - Area of Sector (60°) + Area of Triangle. \nArea Circle = π(6)² = 36π. \nArea Sector = (60/360) × 36π = 6π. \nArea Triangle = (√3/4) × 12² = 36√3. \nTotal Area = (36π - 6π) + 36√3 = 30π + 36√3 cm².' },
  { id: 'm12', subjectId: 'math', chapter: 'Coordinate Geometry', type: 'Short', marks: 2, question: 'Find the ratio in which the line segment joining the points (-3, 10) and (6, -8) is divided by (-1, 6).', answer: 'Use Section Formula: x = (m₁x₂ + m₂x₁)/(m₁ + m₂). \nLet ratio be k:1. \n-1 = (k(6) + 1(-3))/(k+1). \n-k - 1 = 6k - 3. \n2 = 7k => k = 2/7. \nRatio is 2:7.' },
  { id: 'm13', subjectId: 'math', chapter: 'Probability', type: 'Short', marks: 2, question: 'Find the probability that a leap year selected at random will contain 53 Sundays.', answer: 'A leap year has 366 days = 52 weeks + 2 days. \nThe remaining 2 days can be (Sun,Mon), (Mon,Tue)... (Sat,Sun). \nTotal outcomes = 7. \nOutcomes with Sunday = (Sun,Mon), (Sat,Sun) = 2. \nProbability = 2/7.' },
  { id: 'm14', subjectId: 'math', chapter: 'Applications of Trigonometry', type: 'Long', marks: 5, question: 'The angle of elevation of a cloud from a point 60m above a lake is 30° and the angle of depression of the reflection of the cloud in the lake is 60°. Find the height of the cloud.', answer: 'Let cloud height be h. Point A is 60m above lake. \nHeight of cloud above A = h-60. Depth of reflection = h. \nTan 30° = (h-60)/x => x = (h-60)√3. \nTan 60° = (h+60)/x => x = (h+60)/√3. \nEquate x: 3(h-60) = h+60. \n3h - 180 = h + 60 => 2h = 240 => h = 120m.' },
  { id: 'm15', subjectId: 'math', chapter: 'Surface Areas and Volumes', type: 'Short', marks: 3, question: 'A metallic sphere of radius 4.2 cm is melted and recast into the shape of a cylinder of radius 6 cm. Find the height of the cylinder.', answer: 'Volume of Sphere = Volume of Cylinder. \n(4/3)πr₁³ = πr₂²h. \n(4/3) × (4.2)³ = (6)² × h. \n4 × 1.4 × 4.2 × 4.2 = 36h. \nh = (4 × 1.4 × 4.2 × 4.2) / 36 = 2.744 cm.' },
  { id: 'm16', subjectId: 'math', chapter: 'Statistics', type: 'Short', marks: 3, question: 'Find the mode of the following distribution: Class: 0-20, 20-40, 40-60... Frequency: 10, 35, 52...', answer: 'Look for highest frequency. Max freq = 52, so Modal Class is 40-60. \nl = 40, f1 = 52, f0 = 35, f2 = (next freq), h = 20. \nMode = l + [(f1-f0)/(2f1-f0-f2)] × h. \nSubstitute values to solve.' },
  { id: 'm17', subjectId: 'math', chapter: 'Triangles', type: 'Short', marks: 2, question: 'ABC is an isosceles triangle right angled at C. Prove that AB² = 2AC².', answer: 'In ΔABC, ∠C = 90° and AC = BC (Isosceles). \nBy Pythagoras Theorem: AB² = AC² + BC². \nSince AC = BC, AB² = AC² + AC². \nTherefore, AB² = 2AC².' },
  { id: 'm18', subjectId: 'math', chapter: 'Circles', type: 'Short', marks: 3, question: 'A quadrilateral ABCD is drawn to circumscribe a circle. Prove that AB + CD = AD + BC.', answer: 'Tangents from external points are equal. \nAP=AS, BP=BQ, CR=CQ, DR=DS. \nAB+CD = (AP+PB) + (CR+RD) = AS+BQ+CQ+DS \n= (AS+DS) + (BQ+CQ) = AD + BC. \nHence Proved.' },
  { id: 'm19', subjectId: 'math', chapter: 'Pair of Linear Equations', type: 'Short', marks: 3, question: 'Five years hence, the age of Jacob will be three times that of his son. Five years ago, Jacob\'s age was seven times that of his son. What are their present ages?', answer: 'Let Jacob = x, Son = y. \nEq 1: (x+5) = 3(y+5) => x - 3y = 10. \nEq 2: (x-5) = 7(y-5) => x - 7y = -30. \nSubtract Eq 2 from Eq 1: 4y = 40 => y = 10. \nSubstitute y=10 in Eq 1: x - 30 = 10 => x = 40. \nJacob is 40, Son is 10.' },
  { id: 'm20', subjectId: 'math', chapter: 'Arithmetic Progressions', type: 'Short', marks: 2, question: 'How many terms of the AP: 9, 17, 25... must be taken to give a sum of 636?', answer: 'a = 9, d = 8, Sn = 636. \nSn = n/2 [2a + (n-1)d]. \n636 = n/2 [18 + (n-1)8] = n/2 [8n + 10] = 4n² + 5n. \n4n² + 5n - 636 = 0. \nUsing quadratic formula, n = 12 (ignoring negative fraction). \n12 terms.' },
  { id: 'm21', subjectId: 'math', chapter: 'Real Numbers', type: 'Case Study', marks: 4, question: 'A seminar is being conducted. The number of participants in Hindi, English and Maths are 60, 84 and 108. Find the min number of rooms required if in each room same number of participants are to be seated.', answer: 'Find HCF of 60, 84, 108. \n60 = 12×5, 84 = 12×7, 108 = 12×9. HCF = 12. \nMax participants per room = 12. \nTotal participants = 60+84+108 = 252. \nMin rooms = 252/12 = 21.' },
  { id: 'm22', subjectId: 'math', chapter: 'Polynomials', type: 'Competency', marks: 3, question: 'Obtain all other zeroes of 3x^4 + 6x^3 - 2x^2 - 10x - 5, if two of its zeroes are √(5/3) and -√(5/3).', answer: 'Zeroes are ±√(5/3) => factor is (x² - 5/3) or (3x² - 5). \nDivide polynomial by (3x² - 5). \nQuotient is x² + 2x + 1 = (x+1)². \nZeroes of quotient are -1, -1. \nAll zeroes: √(5/3), -√(5/3), -1, -1.' },
  { id: 'm23', subjectId: 'math', chapter: 'Quadratic Equations', type: 'Short', marks: 2, question: 'Find the values of k for which the quadratic equation 2x² + kx + 3 = 0 has two real equal roots.', answer: 'For equal roots, Discriminant D = 0. \nb² - 4ac = 0. \nk² - 4(2)(3) = 0. \nk² - 24 = 0 => k² = 24. \nk = ±√24 = ±2√6.' },
  { id: 'm24', subjectId: 'math', chapter: 'Coordinate Geometry', type: 'Short', marks: 3, question: 'Find the value of k if the points A(2, 3), B(4, k) and C(6, -3) are collinear.', answer: 'Area of triangle formed by collinear points is 0. \n1/2 [x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)] = 0. \n2(k - (-3)) + 4(-3 - 3) + 6(3 - k) = 0. \n2k + 6 - 24 + 18 - 6k = 0. \n-4k = 0 => k = 0.' },
  { id: 'm25', subjectId: 'math', chapter: 'Trigonometry', type: 'Short', marks: 2, question: 'If tan (A+B) = √3 and tan (A-B) = 1/√3, find A and B.', answer: 'tan(A+B) = tan 60° => A+B = 60. \ntan(A-B) = tan 30° => A-B = 30. \nAdding: 2A = 90 => A = 45°. \nSubtracting: 2B = 30 => B = 15°.' },
  { id: 'm26', subjectId: 'math', chapter: 'Applications of Trigonometry', type: 'Long', marks: 5, question: 'As observed from the top of a 75m high lighthouse, the angles of depression of two ships are 30° and 45°. If one ship is exactly behind the other, find the distance between the two ships.', answer: 'Let height h = 75m. \nShip 1 (45°): distance y = h/tan45 = 75m. \nShip 2 (30°): distance x+y = h/tan30 = 75√3. \nDistance between ships x = (x+y) - y \n= 75√3 - 75 = 75(√3 - 1)m.' },
  { id: 'm27', subjectId: 'math', chapter: 'Probability', type: 'Short', marks: 1, question: 'One card is drawn from a well-shuffled deck of 52 cards. Calculate the probability that the card will be an ace.', answer: 'Number of aces in a deck = 4. \nTotal cards = 52. \nProbability = 4/52 = 1/13.' },
  { id: 'm28', subjectId: 'math', chapter: 'Statistics', type: 'Short', marks: 3, question: 'The mean of the following distribution is 50. Find the value of p. (Classes: 0-20, 20-40..., Frequency: 17, p, 32...)', answer: 'Use Mean formula: Mean = Σfixi / Σfi. \nConstruct table with mid-points (xi). \nMultiply fi*xi. \nSolve 50 = (Sum of fixi including p) / (Sum of fi including p). \nSolve linear equation for p.' },
  { id: 'm29', subjectId: 'math', chapter: 'Surface Areas and Volumes', type: 'Long', marks: 5, question: 'Water in a canal, 6m wide and 1.5m deep, is flowing with a speed of 10 km/h. How much area will it irrigate in 30 minutes, if 8cm of standing water is needed?', answer: 'Volume flow in 30 mins = Area of cross section × Length. \nLength = 10 km/h × 0.5 h = 5 km = 5000 m. \nVolume = (6 × 1.5) × 5000 = 45000 m³. \nArea Irrigated × height = Volume. \nArea × 0.08m = 45000. \nArea = 45000 / 0.08 = 5,62,500 m².' },
  { id: 'm30', subjectId: 'math', chapter: 'Triangles', type: 'Short', marks: 2, question: 'A vertical pole of length 6m casts a shadow 4m long on the ground and at the same time a tower casts a shadow 28m long. Find the height of the tower.', answer: 'Triangles formed by pole/shadow and tower/shadow are similar (Sun\'s altitude). \nRatio: Height/Shadow = constant. \n6/4 = h/28. \nh = (6 × 28) / 4 = 6 × 7 = 42m.' },

  // --- SCIENCE (30 Questions) ---
  { id: 'sc1', subjectId: 'science', chapter: 'Light - Reflection and Refraction', type: 'Long', marks: 5, question: 'An object 5 cm in length is held 25 cm away from a converging lens of focal length 10 cm. Draw the ray diagram and find the position, size and the nature of the image formed.', answer: 'u = -25cm, f = +10cm. Lens Formula: 1/v - 1/u = 1/f. \n1/v = 1/10 + 1/(-25) = 1/10 - 1/25 = (5-2)/50 = 3/50. \nv = 50/3 = +16.67 cm (Real, Right side). \nm = v/u = (50/3)/(-25) = -2/3. \nhi = m × ho = -2/3 × 5 = -3.33 cm. \nImage is Real, Inverted, Diminished.' },
  { id: 'sc2', subjectId: 'science', chapter: 'Carbon and its Compounds', type: 'Short', marks: 3, question: 'Explain the formation of scum when hard water is treated with soap. Why are detergents preferred over soaps for washing clothes in hard water?', answer: 'Soap reacts with Calcium and Magnesium ions in hard water to form insoluble precipitates called Scum (RCOO)2Ca. \nThis wastes soap and sticks to clothes. \nDetergents have charged ends that do not form insoluble precipitates with Ca/Mg ions, hence they clean effectively in hard water.' },
  { id: 'sc3', subjectId: 'science', chapter: 'Heredity', type: 'Short', marks: 3, question: 'A violet flower plant was crossed with a white flower plant. All the F1 progeny were violet. Give the genetic makeup of the parents and the F1 generation. What is the percentage of white flowers in F2?', answer: 'Parents: Violet (VV) x White (vv). \nF1 Gen: All Vv (Violet). \nSelfing F1 (Vv x Vv) gives F2: VV, Vv, Vv, vv. \nRatio 3:1 (Violet:White). \nPercentage of white flowers = 25%.' },
  { id: 'sc4', subjectId: 'science', chapter: 'Electricity', type: 'Competency', marks: 4, question: 'Two lamps, one rated 100 W at 220 V, and the other 60 W at 220 V, are connected in parallel to electric mains supply. What current is drawn from the line if the supply voltage is 220 V?', answer: 'Current I = P/V. \nI1 = 100/220 = 0.45 A. \nI2 = 60/220 = 0.27 A. \nTotal Current I = I1 + I2 = 160/220 = 0.727 A. \n(Or Total Power = 160W, I = 160/220).' },
  { id: 'sc5', subjectId: 'science', chapter: 'Chemical Reactions', type: 'Short', marks: 2, question: 'Why does the color of copper sulphate solution change when an iron nail is dipped in it? Write the balanced chemical equation.', answer: 'Iron is more reactive than Copper. It displaces Copper from CuSO4 solution. \nBlue color fades to light green (FeSO4). \nEquation: Fe(s) + CuSO4(aq) -> FeSO4(aq) + Cu(s).' },
  { id: 'sc6', subjectId: 'science', chapter: 'Light - Reflection and Refraction', type: 'Short', marks: 2, question: 'Refractive index of diamond with respect to glass is 1.6 and absolute refractive index of glass is 1.5. Find out the absolute refractive index of diamond.', answer: 'n_dg = n_d / n_g. \n1.6 = n_d / 1.5. \nn_d = 1.6 × 1.5 = 2.4.' },
  { id: 'sc7', subjectId: 'science', chapter: 'Human Eye', type: 'Short', marks: 3, question: 'A person cannot see objects distinctly beyond 2m. State the nature of this defect. Name the type of lens used to correct it and calculate its power.', answer: 'Defect: Myopia (Near-sightedness). Far point is 2m instead of infinity. \nCorrection: Concave Lens. \nFocal length f = -distance = -2m. \nPower P = 1/f = 1/(-2) = -0.5 Diopter.' },
  { id: 'sc8', subjectId: 'science', chapter: 'Electricity', type: 'Short', marks: 3, question: 'State Joule\'s law of heating. Derive the expression for heat H = I²Rt.', answer: 'Law: Heat produced in a resistor is directly proportional to square of current (I²), resistance (R), and time (t). \nDerivation: Work done W = V × Q. Since I = Q/t, Q = It. \nW = VIt. By Ohm\'s law V=IR. \nW = (IR)It = I²Rt. \nThis work is converted to Heat (H).' },
  { id: 'sc9', subjectId: 'science', chapter: 'Magnetic Effects', type: 'Short', marks: 3, question: 'Draw the pattern of magnetic field lines around a current carrying solenoid. How does it behave like a bar magnet?', answer: 'Diagram: Parallel lines inside, curved loops outside N to S. \nBehavior: One end acts as North Pole, other as South. Field lines are similar to a bar magnet. \nField is uniform inside.' },
  { id: 'sc10', subjectId: 'science', chapter: 'Magnetic Effects', type: 'Competency', marks: 2, question: 'An electron enters a magnetic field at right angles to it. State the direction of force acting on the electron using Fleming\'s Left Hand Rule.', answer: 'Fleming\'s LHR uses current direction. Electron moves, say, Right -> Current is Left. \nIf Field is Down, Current Left -> Force is Out of page. \n(Note: Always reverse electron direction to get conventional current).' },
  { id: 'sc11', subjectId: 'science', chapter: 'Chemical Reactions', type: 'Short', marks: 2, question: 'Identify the substance oxidized and reduced in the reaction: MnO2 + 4HCl -> MnCl2 + 2H2O + Cl2.', answer: 'Oxidized: HCl (loses H to become Cl2). \nReduced: MnO2 (loses O to become MnCl2).' },
  { id: 'sc12', subjectId: 'science', chapter: 'Acids, Bases and Salts', type: 'Short', marks: 3, question: 'Write the chemical formula for Plaster of Paris. How is it prepared? State one important use.', answer: 'Formula: CaSO4.1/2H2O (Calcium Sulphate Hemihydrate). \nPreparation: Heating Gypsum (CaSO4.2H2O) at 373K. \nUse: Supporting fractured bones, making statues/toys.' },
  { id: 'sc13', subjectId: 'science', chapter: 'Metals and Non-metals', type: 'Short', marks: 3, question: 'Differentiate between Roasting and Calcination with suitable examples.', answer: 'Roasting: Heating ore in excess air (for Sulphides). Ex: 2ZnS + 3O2 -> 2ZnO + 2SO2. \nCalcination: Heating ore in limited air (for Carbonates). Ex: ZnCO3 -> ZnO + CO2.' },
  { id: 'sc14', subjectId: 'science', chapter: 'Carbon and its Compounds', type: 'Short', marks: 2, question: 'Draw the electron dot structure of (i) Ethane (ii) Ethene.', answer: 'Ethane (C2H6): Single bond between C-C, each C shares with 3 H. \nEthene (C2H4): Double bond between C=C, each C shares with 2 H.' },
  { id: 'sc15', subjectId: 'science', chapter: 'Carbon and its Compounds', type: 'Long', marks: 5, question: 'Differentiate between Ethanol and Ethanoic acid on the basis of physical and chemical properties.', answer: 'Physical: Ethanol is liquid with pleasant smell; Ethanoic acid smells like vinegar, freezes in winter (glacial). \nChemical: Ethanol + Na -> H2 gas. Ethanoic Acid + NaHCO3 -> CO2 gas (Brisk effervescence). \nLitmus: Ethanoic acid turns blue litmus red.' },
  { id: 'sc16', subjectId: 'science', chapter: 'Life Processes', type: 'Short', marks: 2, question: 'Why is diffusion insufficient to meet the oxygen requirements of multicellular organisms like humans?', answer: 'In multicellular organisms, not all cells are in direct contact with the environment. Diffusion is too slow to transport oxygen to deep tissues quickly enough to sustain life.' },
  { id: 'sc17', subjectId: 'science', chapter: 'Life Processes', type: 'Short', marks: 3, question: 'What is double circulation? Why is it necessary in birds and mammals?', answer: 'Blood passes through the heart twice in one cycle (Pulmonary + Systemic). \nNecessary to separate oxygenated and deoxygenated blood, allowing high energy supply for thermoregulation in birds/mammals.' },
  { id: 'sc18', subjectId: 'science', chapter: 'Life Processes', type: 'Long', marks: 5, question: 'Describe the structure and functioning of a nephron in the human kidney.', answer: 'Structure: Bowman\'s capsule, Glomerulus, PCT, Loop of Henle, DCT, Collecting Duct. \nFunction: Filtration of blood under pressure in Glomerulus. Selective reabsorption of glucose/water in tubules. Secretion of wastes. Urine formation.' },
  { id: 'sc19', subjectId: 'science', chapter: 'Control and Coordination', type: 'Short', marks: 3, question: 'Draw a well-labeled diagram of a reflex arc. What is the role of the spinal cord in a reflex action?', answer: 'Path: Receptor -> Sensory Neuron -> Spinal Cord (Relay Neuron) -> Motor Neuron -> Effector (Muscle). \nRole: Spinal cord processes the stimulus and generates a quick response before the brain analyzes it, providing protection.' },
  { id: 'sc20', subjectId: 'science', chapter: 'How do Organisms Reproduce', type: 'Short', marks: 3, question: 'How does binary fission differ from multiple fission? Give an example of each.', answer: 'Binary: Parent splits into 2 daughters (Amoeba). Occurs in favorable conditions. \nMultiple: Parent splits into many daughters (Plasmodium). Occurs in unfavorable conditions (cyst).' },
  { id: 'sc21', subjectId: 'science', chapter: 'How do Organisms Reproduce', type: 'Short', marks: 3, question: 'Draw a longitudinal section of a flower and label the reproductive parts.', answer: 'Labels needed: Stamen (Anther, Filament), Pistil (Stigma, Style, Ovary), Petals, Sepals.' },
  { id: 'sc22', subjectId: 'science', chapter: 'Heredity', type: 'Short', marks: 3, question: 'Explain the mechanism of sex determination in humans.', answer: 'Females have XX chromosomes, Males have XY. \nGametes: Female (X), Male (X or Y). \nIf Sperm X fuses with Egg X -> XX (Girl). \nIf Sperm Y fuses with Egg X -> XY (Boy). \nFather determines sex.' },
  { id: 'sc23', subjectId: 'science', chapter: 'Our Environment', type: 'Short', marks: 2, question: 'What is the 10% Law of energy transfer? Explain with an example.', answer: 'Only 10% of energy is transferred to the next trophic level. 90% is lost as heat/metabolism. \nExample: Sun (1000J) -> Plants (10J) -> Deer (1J) -> Lion (0.1J).' },
  { id: 'sc24', subjectId: 'science', chapter: 'Our Environment', type: 'Short', marks: 3, question: 'What is biological magnification? Will the levels of this magnification be different at different levels of the ecosystem?', answer: 'Accumulation of non-biodegradable chemicals (pesticides) in food chain. \nYes, concentration increases at higher trophic levels. Top carnivores have highest accumulation.' },
  { id: 'sc25', subjectId: 'science', chapter: 'Light - Reflection and Refraction', type: 'Short', marks: 3, question: 'An object is placed at a distance of 10 cm from a convex mirror of focal length 15 cm. Find the position and nature of the image.', answer: 'u = -10, f = +15. \n1/v + 1/u = 1/f => 1/v = 1/15 + 1/10 = (2+3)/30 = 5/30. \nv = +6 cm. \nImage is Virtual, Erect and Diminished (behind mirror).' },
  { id: 'sc26', subjectId: 'science', chapter: 'Electricity', type: 'Short', marks: 2, question: 'Why are appliances connected in parallel in domestic electric circuits?', answer: '1. Each appliance gets full voltage (220V). \n2. Separate on/off switches possible. \n3. If one fails, others keep working. \n4. Overall resistance decreases, allowing proper current.' },
  { id: 'sc27', subjectId: 'science', chapter: 'Acids, Bases and Salts', type: 'Long', marks: 5, question: 'Explain the Chlor-Alkali process with a labeled diagram. Write the uses of the three products formed.', answer: 'Electrolysis of Brine (NaCl solution). \n2NaCl + 2H2O -> 2NaOH + Cl2 + H2. \nProducts: \nNaOH: Soaps, Paper. \nChlorine: Water treatment, PVC. \nHydrogen: Fuel, Ammonia.' },
  { id: 'sc28', subjectId: 'science', chapter: 'Metals and Non-metals', type: 'Short', marks: 3, question: 'Explain the process of electrolytic refining of copper with a neat labeled diagram.', answer: 'Anode: Impure Copper. Cathode: Pure Copper strip. Electrolyte: CuSO4. \nCurrent passed -> Cu from Anode dissolves, deposits on Cathode. Impurities settle as Anode Mud.' },
  { id: 'sc29', subjectId: 'science', chapter: 'Life Processes', type: 'Short', marks: 3, question: 'Write the three events that occur during the process of photosynthesis.', answer: '1. Absorption of light energy by chlorophyll. \n2. Conversion of light energy to chemical energy and splitting of water molecules into H and O. \n3. Reduction of Carbon dioxide to carbohydrates.' },
  { id: 'sc30', subjectId: 'science', chapter: 'Control and Coordination', type: 'Short', marks: 2, question: 'Name the plant hormones responsible for (i) Growth of stem (ii) Wilting of leaves.', answer: 'i) Gibberellins (or Auxins). \nii) Abscisic Acid.' },

  // --- SOCIAL SCIENCE (30 Questions) ---
  { id: 'sst1', subjectId: 'social', chapter: 'Nationalism in India', type: 'Long', marks: 5, question: 'Why did Mahatma Gandhi decide to launch the Non-Cooperation Movement? What were its three main stages? Why was it withdrawn?', answer: 'Launch: Against Rowlatt Act, Jallianwala Bagh, and to support Khilafat. \nStages: 1. Surrender of titles. 2. Boycott of civil services/courts/schools. 3. Full civil disobedience if repression used. \nWithdrawn: Due to violence at Chauri Chaura (1922).' },
  { id: 'sst2', subjectId: 'social', chapter: 'Political Parties', type: 'Long', marks: 5, question: 'Describe any five major functions of political parties. Why is the existence of political parties necessary for a democracy?', answer: 'Functions: 1. Contest elections. 2. Put forward policies. 3. Make laws. 4. Form government. 5. Play opposition role. \nNecessity: Representative democracy needs mechanism to gather views, support/restrain govt, and make policies.' },
  { id: 'sst3', subjectId: 'social', chapter: 'Manufacturing Industries', type: 'Short', marks: 3, question: 'Explain any three factors that affect the location of industries in a region. Give examples.', answer: '1. Raw material availability (e.g., Jute mills in Bengal). \n2. Labour (cheap/skilled). \n3. Market proximity. \n4. Power supply.' },
  { id: 'sst4', subjectId: 'social', chapter: 'Money and Credit', type: 'Short', marks: 3, question: 'In what ways does the Reserve Bank of India supervise the functioning of banks? Why is this necessary?', answer: '1. Monitors cash balance (CRR). \n2. Checks that loans go to small cultivators/businesses, not just profit-making companies. \n3. Banks submit periodic reports. \nNecessary to prevent bank failures and ensure equitable credit.' },
  { id: 'sst5', subjectId: 'social', chapter: 'The Making of a Global World', type: 'Short', marks: 2, question: 'What was the "Silk Route"? Explain its importance in ancient trade and cultural exchange.', answer: 'Network of routes connecting Asia with Europe/Africa. \nTrade: Silk, spices, textiles traveled West; Gold/Silver flowed East. \nCulture: Buddhism, Christianity, Islam spread via these routes.' },
  { id: 'sst6', subjectId: 'social', chapter: 'Nationalism in Europe', type: 'Long', marks: 5, question: 'Describe the process of Unification of Germany. Who was the architect of this process?', answer: 'Architect: Otto Von Bismarck (Prussia). \nProcess: Used "Blood and Iron" policy. \nFought 3 wars over 7 years with Austria, Denmark, France. \nPrussian victory led to unification. Kaiser William I proclaimed emperor in 1871.' },
  { id: 'sst7', subjectId: 'social', chapter: 'Nationalism in India', type: 'Short', marks: 3, question: 'Why was the Salt March an effective symbol of resistance against colonialism?', answer: 'Salt was consumed by rich and poor alike. Tax on it was oppressive. \nViolating the salt law united the nation across religious and class lines. \nIt marked the beginning of Civil Disobedience.' },
  { id: 'sst8', subjectId: 'social', chapter: 'Print Culture', type: 'Short', marks: 3, question: 'How did the printing press create a new culture of reading in Europe?', answer: 'Books became cheaper and abundant. \nReading publics emerged. \nOral culture transformed into reading culture. \nIdeas of scientists and philosophers spread quickly.' },
  { id: 'sst9', subjectId: 'social', chapter: 'Resources and Development', type: 'Short', marks: 2, question: 'Distinguish between Khadar and Bangar soil.', answer: 'Khadar: New alluvium, more fertile, fine particles, near river banks. \nBangar: Old alluvium, less fertile, has "Kankar" nodules, away from river.' },
  { id: 'sst10', subjectId: 'social', chapter: 'Resources and Development', type: 'Short', marks: 3, question: 'Suggest any three measures for soil conservation.', answer: '1. Contour Ploughing. \n2. Terrace Farming. \n3. Shelter Belts. \n4. Strip Cropping.' },
  { id: 'sst11', subjectId: 'social', chapter: 'Water Resources', type: 'Short', marks: 2, question: 'Why is rainwater harvesting important in semi-arid regions of Rajasthan?', answer: 'To combat water scarcity. \n"Tanka" system stores drinking water (Palar Pani) for dry seasons. \nAlso cools the houses.' },
  { id: 'sst12', subjectId: 'social', chapter: 'Agriculture', type: 'Short', marks: 3, question: 'Describe the geographical conditions required for the growth of Rice.', answer: 'Temp: High (>25°C). \nRainfall: High (>100 cm). \nSoil: Clayey alluvial soil with water retention. \nLabor: Intensive.' },
  { id: 'sst13', subjectId: 'social', chapter: 'Minerals and Energy', type: 'Short', marks: 3, question: 'Why do we need to conserve mineral resources? Explain any two ways to conserve them.', answer: 'Need: They are finite and non-renewable. Formation takes millions of years. \nWays: 1. Recycling metals. 2. Using substitutes. 3. Improving technology to use low-grade ores.' },
  { id: 'sst14', subjectId: 'social', chapter: 'Lifelines of National Economy', type: 'Short', marks: 3, question: 'Roadways have an edge over railways in India. Justify the statement with three arguments.', answer: '1. Lower construction cost. \n2. Door-to-door service. \n3. Feasible in hilly/rough terrain. \n4. Feeder to other modes.' },
  { id: 'sst15', subjectId: 'social', chapter: 'Power Sharing', type: 'Short', marks: 3, question: 'How is the Belgian model of power sharing different from the Majoritarianism in Sri Lanka?', answer: 'Belgium: Accommodated diversity. Equal representation for Dutch/French in center. Community govt for culture. \nSri Lanka: Sinhala supremacy. Ignored Tamils, leading to Civil War.' },
  { id: 'sst16', subjectId: 'social', chapter: 'Federalism', type: 'Short', marks: 3, question: 'Explain the major steps taken towards decentralization in India in 1992.', answer: '73rd/74th Amendment: \n1. Regular elections mandatory. \n2. Seats reserved for SC/ST/OBC. \n3. 1/3rd seats for women. \n4. State Election Commission formed.' },
  { id: 'sst17', subjectId: 'social', chapter: 'Gender, Religion and Caste', type: 'Short', marks: 3, question: 'Mention any two constitutional provisions that make India a secular state.', answer: '1. No official religion. \n2. Freedom to practice/propagate any religion (Art 25). \n3. No discrimination on grounds of religion.' },
  { id: 'sst18', subjectId: 'social', chapter: 'Political Parties', type: 'Short', marks: 3, question: 'What is meant by "dynastic succession" in political parties? Why is it a challenge?', answer: 'Top positions controlled by members of one family. \nChallenge: Prevents ordinary workers from rising. Leads to incompetent leadership. Unfair to democracy.' },
  { id: 'sst19', subjectId: 'social', chapter: 'Outcomes of Democracy', type: 'Short', marks: 3, question: 'How does democracy produce an accountable, responsive and legitimate government?', answer: 'Accountable: Through regular elections. \nResponsive: To public opinion/needs. \nLegitimate: People\'s own government (elected by them).' },
  { id: 'sst20', subjectId: 'social', chapter: 'Development', type: 'Short', marks: 3, question: '"Sustainable development is crucial for development." Explain.', answer: 'Development should meet present needs without compromising future generations. \nReckless use of resources causes environmental degradation, which threatens future survival (e.g., Groundwater depletion).' },
  { id: 'sst21', subjectId: 'social', chapter: 'Sectors of Economy', type: 'Long', marks: 5, question: 'Compare the employment conditions prevailing in the organized and unorganized sectors.', answer: 'Organized: Job security, fixed hours, paid leave, PF/medical benefits, follows labor laws. \nUnorganized: No security, low pay, no paid leave, no benefits, laws often ignored.' },
  { id: 'sst22', subjectId: 'social', chapter: 'Sectors of Economy', type: 'Short', marks: 3, question: 'How can more employment be created in rural areas? Suggest any three measures.', answer: '1. Constructing dams/canals (irrigation jobs). \n2. Investing in transport/storage. \n3. Promoting local industries (honey, dal mills). \n4. MGNREGA implementation.' },
  { id: 'sst23', subjectId: 'social', chapter: 'Money and Credit', type: 'Long', marks: 5, question: 'What are Self Help Groups (SHGs)? Explain their significance in rural India.', answer: 'Group of 15-20 rural poor (mostly women) pooling savings. \nSignificance: 1. Collateral-free loans. 2. Low interest. 3. Empower women. 4. Discuss social issues.' },
  { id: 'sst24', subjectId: 'social', chapter: 'Globalization', type: 'Short', marks: 3, question: 'What is the role of MNCs in the globalization process?', answer: 'MNCs invest in different countries, bring technology, and integrate markets. \nThey produce where costs are low, linking economies globally.' },
  { id: 'sst25', subjectId: 'social', chapter: 'Globalization', type: 'Short', marks: 3, question: 'How has liberalization of trade and investment policies helped the globalization process?', answer: 'Removing barriers (taxes/quotas) allowed free flow of goods and capital. \nEncouraged MNCs to invest and foreign technology to enter India.' },
  { id: 'sst26', subjectId: 'social', chapter: 'Nationalism in Europe', type: 'Short', marks: 2, question: 'Who were Marianne and Germania? What was the importance of the way they were portrayed?', answer: 'Allegories of Nation. \nMarianne (France): Liberty/Republic. \nGermania (Germany): Heroism/Strength (Oak leaves). \nImportance: Personified the nation to instill identity.' },
  { id: 'sst27', subjectId: 'social', chapter: 'Nationalism in India', type: 'Short', marks: 2, question: 'What was the Poona Pact? Between whom was it signed?', answer: 'Signed between Gandhi and Ambedkar (1932). \nProvided reserved seats for Depressed Classes in provincial councils, but voted by general electorate. Ended fast unto death.' },
  { id: 'sst28', subjectId: 'social', chapter: 'Lifelines of National Economy', type: 'Short', marks: 2, question: 'What are the advantages of pipeline transportation?', answer: '1. No trans-shipment losses/delays. \n2. Ideal for liquids/gases. \n3. Low running cost (though high initial cost).' },
  { id: 'sst29', subjectId: 'social', chapter: 'Gender, Religion and Caste', type: 'Short', marks: 3, question: 'How can caste take various forms in politics? Explain.', answer: '1. Parties choose candidates based on caste composition. \n2. Appeals to caste sentiment for votes. \n3. "One person one vote" compels leaders to mobilize caste support.' },
  { id: 'sst30', subjectId: 'social', chapter: 'Development', type: 'Short', marks: 2, question: 'What is BMI? How is it calculated?', answer: 'Body Mass Index. Indicator of nourishment. \nFormula: Weight (kg) / Height² (m²). \n<18.5 Underweight, >25 Overweight.' },

  // --- ENGLISH (30 Questions) ---
  { id: 'eng1', subjectId: 'english', chapter: 'Writing Skills', type: 'Long', marks: 5, question: 'Write a letter to the Editor of a local newspaper regarding the poor condition of roads in your locality, suggesting measures to improve them.', answer: 'Format: Sender Addr -> Date -> Receiver Addr -> Sub -> Salutation -> Body -> Closing. \nContent: Potholes causing accidents, water logging, traffic jams. Suggestion: Immediate repair, quality material, regular maintenance.' },
  { id: 'eng2', subjectId: 'english', chapter: 'Glimpses of India', type: 'Short', marks: 3, question: 'How is the bread an important part of life in Goa? Explain with reference to "A Baker from Goa".', answer: 'Bread is essential for festivals. Bol for marriage, sweet bread for parties, sandwiches for engagement, cakes/bolinhas for Christmas. Baker (Pader) is a key figure.' },
  { id: 'eng3', subjectId: 'english', chapter: 'The Sermon at Benares', type: 'Long', marks: 6, question: 'Life is full of trials and tribulations. Kisa Gotami also passes through a period of grief in her life. How does she behave in those circumstances? What lesson does she learn in the end?', answer: 'Behaves desperately, carrying dead son to everyone for medicine. \nLesson: Death is inevitable and common to all. Grieving brings pain, not peace. One must accept mortality to attain peace of mind.' },
  { id: 'eng4', subjectId: 'english', chapter: 'Amanda!', type: 'Short', marks: 3, question: 'Why does Amanda wish to be a mermaid, an orphan, or Rapunzel? What does this tell us about her state of mind?', answer: 'She feels nagged and controlled. \nMermaid: Drifting blissfully alone. \nOrphan: Freedom to roam barefoot. \nRapunzel: Solitude in a tower. \nState of mind: Desires escape into a fantasy world of silence and freedom.' },
  { id: 'eng5', subjectId: 'english', chapter: 'Grammar', type: 'Short', marks: 1, question: 'Complete the sentence: The teacher, along with the students, ____ (is/are) going for a picnic.', answer: 'is. (Subject "The teacher" is singular; "along with" does not change the number).' },
  { id: 'eng6', subjectId: 'english', chapter: 'A Letter to God', type: 'Short', marks: 3, question: 'Sketch the character of the Postmaster in the story "A Letter to God".', answer: 'Fat, amiable, kind-hearted. \nMoved by Lencho\'s faith. \nGenerous (gave part of salary). \nDid not want to shake Lencho\'s faith in God.' },
  { id: 'eng7', subjectId: 'english', chapter: 'Nelson Mandela', type: 'Short', marks: 3, question: 'What "twin obligations" does Mandela mention?', answer: '1. Obligation to family, parents, wife, children. \n2. Obligation to people, community, and country. \nIn apartheid SA, it was impossible to fulfill both.' },
  { id: 'eng8', subjectId: 'english', chapter: 'Two Stories about Flying', type: 'Short', marks: 3, question: 'Why was the young seagull afraid to fly? How did his family react?', answer: 'Afraid wings wouldn\'t support him; sea looked vast. \nFamily: Encouraged, scolded, threatened to starve him, and taunted him for cowardice.' },
  { id: 'eng9', subjectId: 'english', chapter: 'Diary of Anne Frank', type: 'Short', marks: 3, question: 'Why did Mr. Keesing call Anne an "incorrigible chatterbox"? How did she justify it?', answer: 'She talked too much in class. \nJustification: It\'s a student\'s trait. Also, it\'s inherited from her mother, so she can\'t cure it.' },
  { id: 'eng10', subjectId: 'english', chapter: 'The Proposal', type: 'Long', marks: 6, question: 'The principle "forgive and forget" helps a lot in maintaining cordial relations. Do you think Lomov and Natalya follow this? Why/Why not?', answer: 'No, they fight over Oxen Meadows and dogs (Squeezer vs Guess). \nThey insult each other despite Lomov coming to propose. \nThey prioritize ego/property over relationship, creating a farce.' },
  { id: 'eng11', subjectId: 'english', chapter: 'Dust of Snow', type: 'Short', marks: 2, question: 'How does the poet\'s mood change in the poem "Dust of Snow"?', answer: 'Depressive/Sad to Happy/Optimistic. \nThe crow shaking snow off hemlock tree lifted his spirits and saved the day.' },
  { id: 'eng12', subjectId: 'english', chapter: 'Fire and Ice', type: 'Short', marks: 2, question: 'What do "Fire" and "Ice" stand for in the poem by Robert Frost?', answer: 'Fire: Desire, greed, lust. \nIce: Hatred, indifference, coldness. \nBoth can destroy the world.' },
  { id: 'eng13', subjectId: 'english', chapter: 'A Tiger in the Zoo', type: 'Short', marks: 3, question: 'Contrast the tiger in the zoo with the tiger in its natural habitat.', answer: 'Zoo: Stalks in concrete cell, rage suppressed, ignores visitors. \nWild: Lurks in shadow, slides through grass, snarls at village edge, terrorizes.' },
  { id: 'eng14', subjectId: 'english', chapter: 'The Ball Poem', type: 'Short', marks: 3, question: 'What does the boy learn from the loss of his ball?', answer: 'Epistemology of loss. \nMaterial things are temporary. \nOne must stand up and accept loss as part of growing up.' },
  { id: 'eng15', subjectId: 'english', chapter: 'The Trees', type: 'Short', marks: 3, question: 'Where are the trees in the poem? What do their roots, leaves and twigs do?', answer: 'In the house. \nRoots: Work to disengage from floor. \nLeaves: Strain toward glass. \nTwigs: Stiff with exertion. \nMoving out to the forest.' },
  { id: 'eng16', subjectId: 'english', chapter: 'Fog', type: 'Short', marks: 2, question: 'How does the poet compare the fog to a cat?', answer: 'Fog comes silently on "little cat feet". \nIt sits looking over harbor "on silent haunches" and moves on. \nMetaphor of silence and stealth.' },
  { id: 'eng17', subjectId: 'english', chapter: 'The Tale of Custard the Dragon', type: 'Short', marks: 3, question: 'How did Custard prove that he was not a coward?', answer: 'When the Pirate attacked, others hid. \nCustard jumped, snorted like an engine, clashed tail, and gobbled the pirate up.' },
  { id: 'eng18', subjectId: 'english', chapter: 'A Triumph of Surgery', type: 'Short', marks: 3, question: 'Why was Mrs. Pumphrey worried about Tricki? What was the actual problem?', answer: 'Tricki was listless, refusing food. She thought he had malnutrition. \nActual problem: Overfeeding and lack of exercise (Greed).' },
  { id: 'eng19', subjectId: 'english', chapter: 'The Thief\'s Story', type: 'Long', marks: 6, question: 'Hari Singh says, "He knew. But neither his lips nor his eyes showed anything." Explain the change in Hari Singh\'s character.', answer: 'Hari returned the money because he valued education and Anil\'s trust. \nAnil knew about the theft (wet notes) but forgave him to reform him. \nHari changed from a thief to a person seeking respect.' },
  { id: 'eng20', subjectId: 'english', chapter: 'The Midnight Visitor', type: 'Short', marks: 3, question: 'How did Ausable get rid of Max without using a weapon?', answer: 'Used presence of mind. \nFabricated a story about a balcony. \nClaimed the knocker was the police. \nMax jumped out of the window (to the non-existent balcony) and fell.' },
  { id: 'eng21', subjectId: 'english', chapter: 'A Question of Trust', type: 'Short', marks: 3, question: 'Horace Danby was a meticulous planner but still he faltered. Where did he go wrong?', answer: 'He was tricked by the lady in red (another thief). \nHe trusted her appearance. \nHe opened the safe without gloves (leaving fingerprints) to light her cigarette.' },
  { id: 'eng22', subjectId: 'english', chapter: 'Footprints without Feet', type: 'Short', marks: 3, question: 'Griffin was rather a lawless person. Comment.', answer: 'Set fire to landlord\'s house. \nStole clothes/food from store. \nRobbed theatrical company. \nHit the constable and the clergyman. \nMisused science for crime.' },
  { id: 'eng23', subjectId: 'english', chapter: 'The Making of a Scientist', type: 'Short', marks: 3, question: 'What role did Ebright\'s mother play in his making as a scientist?', answer: 'Encouraged curiosity. \nBought him equipment (telescope, microscope). \nGave him the book "The Travels of Monarch X". \nTook him on trips.' },
  { id: 'eng24', subjectId: 'english', chapter: 'The Necklace', type: 'Short', marks: 3, question: 'What was the cause of Matilda\'s ruin? How could she have avoided it?', answer: 'Cause: Vanity, discontentment, desire for luxury. \nAvoidance: Telling Mme Forestier the truth about the lost necklace immediately (it was fake).' },
  { id: 'eng25', subjectId: 'english', chapter: 'Bholi', type: 'Long', marks: 6, question: 'Bholi\'s teacher played a significant role in changing the course of her life. Elaborate.', answer: 'Teacher was kind and patient, unlike others. \nEncouraged her to speak. \nGave her books and confidence. \nTransformed a stuttering simpleton into a confident Sulekha who rejected the greedy Bishamber.' },
  { id: 'eng26', subjectId: 'english', chapter: 'The Book That Saved the Earth', type: 'Short', marks: 3, question: 'How did a book of nursery rhymes save the Earth from Martian invasion?', answer: 'Think-Tank misinterpreted the rhymes. \nThought "Mistress Mary" meant humans grow explosives. \nThought "Humpty Dumpty" was him falling. \nScared off the Martians.' },
  { id: 'eng27', subjectId: 'english', chapter: 'Grammar', type: 'Short', marks: 1, question: 'Change to reported speech: He said to me, "Where are you going?"', answer: 'He asked me where I was going.' },
  { id: 'eng28', subjectId: 'english', chapter: 'Grammar', type: 'Short', marks: 1, question: 'Fill in the blank with a modal: You ____ (must/should) respect your elders.', answer: 'should (Moral Duty) OR must (Necessity - depends on context, but "should" is standard for respect).' },
  { id: 'eng29', subjectId: 'english', chapter: 'Writing Skills', type: 'Long', marks: 5, question: 'Write an analytical paragraph on the "Rising trend of online shopping" based on the given chart (Mock data).', answer: 'Analyze trends: Increase in users, convenience factor, discounts. \nContrast with offline retail. \nConclusion: Future is digital but hybrid model may persist.' },
  { id: 'eng30', subjectId: 'english', chapter: 'Writing Skills', type: 'Long', marks: 5, question: 'You are the librarian of your school. Write a letter to a publisher placing an order for a list of books.', answer: 'Include list (Name, Author, Qty). \nAsk for discount. \nSpecify delivery date and payment mode.' },

  // --- SANSKRIT (30 Questions) ---
  { id: 'san1', subjectId: 'sanskrit', chapter: 'Grammar', type: 'Short', marks: 1, question: 'Sandhi: Jagat + Nath = ____.', answer: 'Jagannath' },
  { id: 'san2', subjectId: 'sanskrit', chapter: 'Grammar', type: 'Short', marks: 1, question: 'Sandhi: Vidya + Alaya = ____.', answer: 'Vidyalaya' },
  { id: 'san3', subjectId: 'sanskrit', chapter: 'Grammar', type: 'Short', marks: 1, question: 'Samas: Dashanana (Vigrah kurot).', answer: 'Dasha ananani yasya sah (Bahuvrihi).' },
  { id: 'san4', subjectId: 'sanskrit', chapter: 'Grammar', type: 'Short', marks: 1, question: 'Pratyaya: Gam + Tavyat = ____.', answer: 'Gantavyam' },
  { id: 'san5', subjectId: 'sanskrit', chapter: 'Suchiparyavaranam', type: 'Short', marks: 2, question: 'Kavi kimartham prakriteh sharanam ichhati?', answer: 'Mahanagare jeevanam durvaham jatam, atah kavi shuddh paryavaranay prakriteh sharanam ichhati.' },
  { id: 'san6', subjectId: 'sanskrit', chapter: 'Buddhirbalavati Sada', type: 'Short', marks: 2, question: 'Vyaghra kim vichintya palayita?', answer: '"Iyam kachid vyaghramari" iti vichintya vyaghrah palayitah.' },
  { id: 'san7', subjectId: 'sanskrit', chapter: 'Shishulalanam', type: 'Short', marks: 2, question: 'Kushlavau kam upashritya pranamatah?', answer: 'Kushlavau Ramam upashritya pranamatah.' },
  { id: 'san8', subjectId: 'sanskrit', chapter: 'Janani Tulyavatsala', type: 'Short', marks: 2, question: 'Mata surabhi kimartham ashruni munchati sma?', answer: 'Bhumau patite putram drishtva mata surabhi ashruni munchati sma.' },
  { id: 'san9', subjectId: 'sanskrit', chapter: 'Subhashitani', type: 'Short', marks: 2, question: 'Aalasayam hi manushyanam sharirastho mahan ripu. Arth spasht kurot.', answer: 'Alasya manushya ke sharir mein sthit sabse bada shatru hai. Udyam ke saman koi bandhu nahi hai.' },
  { id: 'san10', subjectId: 'sanskrit', chapter: 'Vichitra Sakshi', type: 'Long', marks: 4, question: 'Nyayadheesh Bankim Chandra katham nirnayam kritvan?', answer: 'Sah shavam nyayalay aanetum adishtvan. Tada shavah (chaurah) utthay sarva vrittantam kathitvan. Evam sah arakshinam danditvan.' },
  { id: 'san11', subjectId: 'sanskrit', chapter: 'Grammar', type: 'Short', marks: 1, question: 'Avyaya: Sah ____ (always) satyam vadati.', answer: 'Sadaa' },
  { id: 'san12', subjectId: 'sanskrit', chapter: 'Grammar', type: 'Short', marks: 1, question: 'Vachya: Ramah pustakam pathati. (Change voice)', answer: 'Ramena pustakam pathyate.' },
  { id: 'san13', subjectId: 'sanskrit', chapter: 'Grammar', type: 'Short', marks: 1, question: 'Samaya: 7:30 (Sanskrit mein likhein).', answer: 'Sardha-sapta-vadanam' },
  { id: 'san14', subjectId: 'sanskrit', chapter: 'Grammar', type: 'Short', marks: 1, question: 'Ashudhi Sanshodhan: Sah pathati (correction for dual subject).', answer: 'Tau pathatah (if dual) or Te pathanti (if plural). Sah pathati is correct for singular.' },
  { id: 'san15', subjectId: 'sanskrit', chapter: 'Sauhardam Prakriteh Shobha', type: 'Short', marks: 3, question: 'Simha vanarau kimartham kruddha abhavat?', answer: 'Yada vanarah simhasya puchham dhunanti tada simha kruddha abhavat.' },
  { id: 'san16', subjectId: 'sanskrit', chapter: 'Literature', type: 'Short', marks: 2, question: 'Ken samabandhen Valmiki Lavkushayoh guru?', answer: 'Upnayanopadeshen.' },
  { id: 'san17', subjectId: 'sanskrit', chapter: 'Literature', type: 'Short', marks: 2, question: 'Indrah durbal vrishabhasya kashtani apakartum kim kritvan?', answer: 'Indrah vrishtim kritvan.' },
  { id: 'san18', subjectId: 'sanskrit', chapter: 'Literature', type: 'Short', marks: 2, question: 'Manushyanam mahan ripu kah?', answer: 'Aalasyam.' },
  { id: 'san19', subjectId: 'sanskrit', chapter: 'Literature', type: 'Short', marks: 2, question: 'Vastuah chorah kah aaseet?', answer: 'Vastutah chorah arakshi (kotwal) aaseet.' },
  { id: 'san20', subjectId: 'sanskrit', chapter: 'Grammar', type: 'Short', marks: 1, question: 'Pratyaya: Path + Tumun = ____.', answer: 'Pathitum' },
  { id: 'san21', subjectId: 'sanskrit', chapter: 'Grammar', type: 'Short', marks: 1, question: 'Samas: Neelkamalam (Vigrah).', answer: 'Neelam cha tat kamalam (Karmadharaya).' },
  { id: 'san22', subjectId: 'sanskrit', chapter: 'Grammar', type: 'Short', marks: 1, question: 'Sandhi: Po + An = ____.', answer: 'Pavanah' },
  { id: 'san23', subjectId: 'sanskrit', chapter: 'Grammar', type: 'Short', marks: 1, question: 'Avyaya: ____ (Where) tvam gachhasi?', answer: 'Kutra' },
  { id: 'san24', subjectId: 'sanskrit', chapter: 'Writing', type: 'Long', marks: 5, question: 'Write a letter to your friend describing your school annual day in Sanskrit.', answer: 'Use: Priya Mitra, Namaskar. Atra sarvam kushalam. Mama vidyalaye varshikotsav aaseet. Nrityam, geetam cha abhavat. Matri-pitri agachhan. Bhavatah mitra.' },
  { id: 'san25', subjectId: 'sanskrit', chapter: 'Writing', type: 'Long', marks: 5, question: 'Translate to Sanskrit: The sun rises in the east.', answer: 'Suryah purvasyam dishi udeti.' },
  { id: 'san26', subjectId: 'sanskrit', chapter: 'Writing', type: 'Long', marks: 5, question: 'Describe the picture (Park scene) in 5 Sanskrit sentences.', answer: 'Idam udyanasya chitram asti. Atra balakah kridanti. Vrikshah santi. Pushpani viksanti. Janah bhramanti.' },
  { id: 'san27', subjectId: 'sanskrit', chapter: 'Literature', type: 'Short', marks: 2, question: 'Bhukampasya kechan karanani likhat.', answer: 'Prithivyah antargarbhe halchalam, jwalamukhi sphotanam.' },
  { id: 'san28', subjectId: 'sanskrit', chapter: 'Literature', type: 'Short', marks: 2, question: 'Pranebhyo api kah rakshaniya?', answer: 'Sadacharah.' },
  { id: 'san29', subjectId: 'sanskrit', chapter: 'Grammar', type: 'Short', marks: 1, question: 'Vachya: Mayaa grantha pathyate. (Kartrivachya mein badlein)', answer: 'Aham grantham pathami.' },
  { id: 'san30', subjectId: 'sanskrit', chapter: 'Grammar', type: 'Short', marks: 1, question: 'Sandhi: Namah + Te = ____.', answer: 'Namaste' },

  // --- INFORMATION TECHNOLOGY (CODE 402) (30 Questions) ---
  { id: 'it1', subjectId: 'cs', chapter: 'Digital Documentation', type: 'Short', marks: 2, question: 'What are Styles in OpenOffice Writer? Name any two categories of styles.', answer: 'Styles are saved sets of formatting. Categories: Paragraph Styles, Character Styles, Page Styles, List Styles.' },
  { id: 'it2', subjectId: 'cs', chapter: 'Digital Documentation', type: 'Short', marks: 2, question: 'How can you insert an image in a document? Mention two ways.', answer: '1. Insert > Picture > From File. \n2. Drag and Drop. \n3. Copy and Paste.' },
  { id: 'it3', subjectId: 'cs', chapter: 'Digital Documentation', type: 'Long', marks: 4, question: 'Explain the purpose of Table of Contents (TOC). Write steps to create a TOC.', answer: 'Purpose: Overview of document structure, quick navigation. \nSteps: Apply Heading styles -> Insert -> Indexes and Tables -> Indexes and Tables -> OK.' },
  { id: 'it4', subjectId: 'cs', chapter: 'Digital Documentation', type: 'Short', marks: 2, question: 'What is Mail Merge? List the main components required for it.', answer: 'Feature to create multiple documents from a single template. \nComponents: Main Document, Data Source, Merged Document.' },
  { id: 'it5', subjectId: 'cs', chapter: 'Digital Documentation', type: 'Short', marks: 2, question: 'Differentiate between Anchoring and Wrapping of images.', answer: 'Anchoring: Fixes position relative to page/para/char. \nWrapping: Determines how text flows around the image (Page Wrap, Optimal Page Wrap).' },
  { id: 'it6', subjectId: 'cs', chapter: 'Electronic Spreadsheet', type: 'Short', marks: 2, question: 'What is the "Consolidate" function in Calc? Why is it used?', answer: 'Combines data from multiple ranges/sheets into one range. \nUsed for summarizing data (Sum, Average) from different sources.' },
  { id: 'it7', subjectId: 'cs', chapter: 'Electronic Spreadsheet', type: 'Short', marks: 2, question: 'Define Subtotals. How do you apply them to a range of data?', answer: 'Calculates totals/averages for groups of data. \nData > Subtotals > Select Group By column and function.' },
  { id: 'it8', subjectId: 'cs', chapter: 'Electronic Spreadsheet', type: 'Short', marks: 2, question: 'What are Scenarios in a spreadsheet? How are they useful?', answer: 'Saved set of cell values for "What-if" analysis. \nUseful to switch between different outcomes (Best case, Worst case) without changing structure.' },
  { id: 'it9', subjectId: 'cs', chapter: 'Electronic Spreadsheet', type: 'Long', marks: 4, question: 'Explain "Goal Seek" with an example. How is it different from "Solver"?', answer: 'Goal Seek: Finds input for a specific output (1 variable). Ex: Finding marks needed to get 90% avg. \nSolver: Finds optimal values for multiple variables with constraints.' },
  { id: 'it10', subjectId: 'cs', chapter: 'Electronic Spreadsheet', type: 'Short', marks: 2, question: 'How can you link external data in a worksheet? Mention one method.', answer: 'Using "Insert > Link to External Data" or referencing cells like \'file:///Path/To/File.ods\'#Sheet1.A1.' },
  { id: 'it11', subjectId: 'cs', chapter: 'Electronic Spreadsheet', type: 'Short', marks: 2, question: 'What is a Macro? How do you record a macro in Calc?', answer: 'Saved sequence of commands. \nTools > Macros > Record Macro -> Perform actions -> Stop Recording -> Save.' },
  { id: 'it12', subjectId: 'cs', chapter: 'DBMS', type: 'Short', marks: 2, question: 'Define Database and DBMS. Give two examples of DBMS software.', answer: 'Database: Organized collection of data. \nDBMS: Software to manage database. \nExamples: MySQL, Oracle, MS Access, OpenOffice Base.' },
  { id: 'it13', subjectId: 'cs', chapter: 'DBMS', type: 'Short', marks: 2, question: 'What is a Primary Key? How is it different from a Foreign Key?', answer: 'Primary Key: Uniquely identifies a record (No duplicates, No Nulls). \nForeign Key: Links to a Primary Key in another table.' },
  { id: 'it14', subjectId: 'cs', chapter: 'DBMS', type: 'Long', marks: 4, question: 'Explain the different data types available in OpenOffice Base.', answer: 'Numeric (Integer, Decimal), Text (Varchar, Char), Date/Time, Boolean (Yes/No).' },
  { id: 'it15', subjectId: 'cs', chapter: 'DBMS', type: 'Short', marks: 2, question: 'Differentiate between a Form and a Report in a database.', answer: 'Form: Interface to enter/edit data. \nReport: Formatted output of data for printing/viewing.' },
  { id: 'it16', subjectId: 'cs', chapter: 'DBMS', type: 'Short', marks: 2, question: 'What is a Query? Write a SQL command to select all records from a table named "Students".', answer: 'Request for data. \nSQL: SELECT * FROM Students;' },
  { id: 'it17', subjectId: 'cs', chapter: 'DBMS', type: 'Short', marks: 1, question: 'What is Referential Integrity?', answer: 'Accuracy and consistency of data relationships (Foreign key must match a Primary key).' },
  { id: 'it18', subjectId: 'cs', chapter: 'Web Applications', type: 'Short', marks: 2, question: 'Explain the purpose of Sticky Keys and Toggle Keys in Accessibility options.', answer: 'Sticky Keys: Press modifier keys (Shift/Ctrl) one by one instead of together. \nToggle Keys: Sound alert when Caps/Num Lock is pressed.' },
  { id: 'it19', subjectId: 'cs', chapter: 'Web Applications', type: 'Short', marks: 2, question: 'What is a Peer-to-Peer (P2P) network? How does it differ from Client-Server?', answer: 'P2P: All computers are equal, share resources directly. \nClient-Server: Central server provides resources to clients.' },
  { id: 'it20', subjectId: 'cs', chapter: 'Web Applications', type: 'Short', marks: 2, question: 'List any three advantages of Instant Messaging (IM).', answer: '1. Real-time communication. \n2. Cost-effective. \n3. File sharing.' },
  { id: 'it21', subjectId: 'cs', chapter: 'Web Applications', type: 'Short', marks: 2, question: 'What is a Blog? Name one online and one offline blog editor.', answer: 'Online journal. \nOnline: WordPress. \nOffline: Qumana or Windows Live Writer.' },
  { id: 'it22', subjectId: 'cs', chapter: 'Web Applications', type: 'Short', marks: 2, question: 'Explain the best practices for creating a strong password.', answer: 'Mix of Uppercase, Lowercase, Numbers, Symbols. Length > 8 chars. No dictionary words.' },
  { id: 'it23', subjectId: 'cs', chapter: 'Web Applications', type: 'Long', marks: 4, question: 'Describe the various types of health hazards associated with working on computers. Suggest remedies.', answer: 'Hazards: Eye strain, Back pain, RSI (Repetitive Strain Injury). \nRemedies: Ergonomic chair, Regular breaks, Proper lighting.' },
  { id: 'it24', subjectId: 'cs', chapter: 'Employability Skills', type: 'Short', marks: 2, question: 'What are the 7 Cs of effective communication?', answer: 'Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous.' },
  { id: 'it25', subjectId: 'cs', chapter: 'Employability Skills', type: 'Short', marks: 2, question: 'Define Stress Management. Mention two techniques to manage stress.', answer: 'Techniques: Yoga/Meditation, Physical Exercise, Time Management.' },
  { id: 'it26', subjectId: 'cs', chapter: 'Employability Skills', type: 'Short', marks: 2, question: 'What is an Operating System? Give two examples.', answer: 'Interface between user and hardware. Ex: Windows, Linux.' },
  { id: 'it27', subjectId: 'cs', chapter: 'Employability Skills', type: 'Short', marks: 2, question: 'List four qualities of a successful entrepreneur.', answer: 'Confidence, Risk-taking, Innovation, Patience.' },
  { id: 'it28', subjectId: 'cs', chapter: 'Employability Skills', type: 'Short', marks: 2, question: 'What is Sustainable Development? Why is it important?', answer: 'Development meeting needs without compromising future. \nImportant to save environment and resources.' },
  { id: 'it29', subjectId: 'cs', chapter: 'Web Applications', type: 'Short', marks: 2, question: 'What is Wi-Fi? How is it useful?', answer: 'Wireless Fidelity. Networking without cables using radio waves.' },
  { id: 'it30', subjectId: 'cs', chapter: 'Digital Documentation', type: 'Short', marks: 2, question: 'What is a Template? How does it save time?', answer: 'Pre-formatted document model. Saves time by reusing layout/styles.' }
];