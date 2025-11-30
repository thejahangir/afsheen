import React, { useState, useEffect } from 'react';
import { SUBJECTS, MOCK_NOTE_CONTENT, SYLLABUS_DATA, PREDICTED_QUESTIONS_2026, MOTIVATIONAL_QUOTES } from './constants';
import { Subject, NoteContent, LoadingState, ViewState, VideoSearchResult, PredictionQuestion } from './types';
import { generateNotes, generateLogo, searchVideoRecommendations } from './services/geminiService';
import { SubjectCard } from './components/SubjectCard';
import { Icon, ArrowLeft, Sparkles, Lightbulb, BookMarked, GraduationCap, ChevronRight, Search, Brain, Monitor, Zap, X, CheckCircle, Circle, Play, Clock, User, Film, Youtube, ExternalLink, Target, ChevronDown } from './components/Icons';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('HOME');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [topicSearchQuery, setTopicSearchQuery] = useState<string>('');
  const [noteContent, setNoteContent] = useState<NoteContent | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  
  // Quick Revision State
  const [quickRevisionMode, setQuickRevisionMode] = useState(false);

  // Logo State
  const [appLogo, setAppLogo] = useState<string | null>(null);
  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);

  // Completed Topics State (Persisted)
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  // Video Search State
  const [videoSearchQuery, setVideoSearchQuery] = useState('');
  const [videoSearchResults, setVideoSearchResults] = useState<VideoSearchResult[]>([]);
  const [videoSearchLoading, setVideoSearchLoading] = useState(false);

  // Expected Questions Filter State
  const [predictionFilterSubject, setPredictionFilterSubject] = useState<string>('math');
  const [activeQuestion, setActiveQuestion] = useState<PredictionQuestion | null>(null);

  // Motivational Banner State
  const [showMotivationalBanner, setShowMotivationalBanner] = useState(true);
  const [currentQuote, setCurrentQuote] = useState('');

  const selectedSubject = SUBJECTS.find(s => s.id === selectedSubjectId);

  const filteredTopics = selectedSubject 
    ? selectedSubject.topics.filter(topic => topic.title.toLowerCase().includes(topicSearchQuery.toLowerCase()))
    : [];

  useEffect(() => {
    // Load logo from local storage on mount
    const savedLogo = localStorage.getItem('note4afsheen_logo');
    if (savedLogo) {
      setAppLogo(savedLogo);
    }

    // Load completed topics
    const savedCompleted = localStorage.getItem('note4afsheen_completed');
    if (savedCompleted) {
      try {
        setCompletedTopics(new Set(JSON.parse(savedCompleted)));
      } catch (e) {
        console.error("Failed to parse completed topics", e);
      }
    }

    // Set Random Quote
    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    setCurrentQuote(randomQuote);
  }, []);

  const handleGenerateLogo = async () => {
    if (!process.env.API_KEY) {
      alert("Please connect an API Key to use the Magic Logo feature.");
      return;
    }
    
    setIsGeneratingLogo(true);
    try {
      const logoData = await generateLogo();
      if (logoData) {
        setAppLogo(logoData);
        localStorage.setItem('note4afsheen_logo', logoData);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingLogo(false);
    }
  };

  const toggleTopicCompletion = (subjectId: string, topicTitle: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation
    const key = `${subjectId}|${topicTitle}`;
    const newSet = new Set(completedTopics);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    setCompletedTopics(newSet);
    localStorage.setItem('note4afsheen_completed', JSON.stringify(Array.from(newSet)));
  };

  const handleSubjectClick = (id: string) => {
    setSelectedSubjectId(id);
    setViewState('SUBJECT');
    setNoteContent(null);
    setSelectedTopic(null);
    setTopicSearchQuery('');
    setQuickRevisionMode(false);
    window.scrollTo(0, 0);
  };

  const handleBackHome = () => {
    setViewState('HOME');
    setSelectedSubjectId(null);
    setSelectedTopic(null);
    setNoteContent(null);
    setTopicSearchQuery('');
    setQuickRevisionMode(false);
    // Refresh quote on home return
    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    setCurrentQuote(randomQuote);
    setShowMotivationalBanner(true);
    window.scrollTo(0, 0);
  };

  // Improved Mobile Back Logic
  const handleMobileBack = () => {
    if (selectedTopic) {
      // Go back to topic list
      setSelectedTopic(null);
      setNoteContent(null);
    } else {
      // Go back to Home
      handleBackHome();
    }
  };

  const handleViewSyllabus = () => {
    setViewState('SYLLABUS');
    window.scrollTo(0, 0);
  };

  const handleExpectedQuestions = () => {
    setViewState('EXPECTED_QUESTIONS');
    window.scrollTo(0, 0);
  }

  const handleVideoSearch = () => {
    setViewState('VIDEO_SEARCH');
    setVideoSearchQuery('');
    setVideoSearchResults([]);
    window.scrollTo(0, 0);
  };
  
  const handlePerformVideoSearch = async (e?: React.FormEvent, overrideQuery?: string) => {
    if (e) e.preventDefault();
    const query = overrideQuery || videoSearchQuery;
    
    if (!query.trim()) return;

    // Update input if using override
    if (overrideQuery) setVideoSearchQuery(overrideQuery);

    setVideoSearchLoading(true);
    setVideoSearchResults([]); // Clear previous results
    try {
      const results = await searchVideoRecommendations(query);
      setVideoSearchResults(results);
    } catch (e) {
      console.error(e);
    } finally {
      setVideoSearchLoading(false);
    }
  };

  const handleConceptVideoSearch = (concept: string) => {
    if (!selectedSubject) return;
    
    // Clean up concept text (remove "1.", "Concept:", etc.)
    const cleanConcept = concept.replace(/^\d+\.|Concept \d+:?/i, '').trim();
    const fullQuery = `${selectedSubject.name} class 10 ${cleanConcept}`;
    
    setViewState('VIDEO_SEARCH');
    window.scrollTo(0, 0);
    
    // Trigger search
    handlePerformVideoSearch(undefined, fullQuery);
  };

  const handleVideoSearchBack = () => {
    if (selectedSubjectId) {
      setViewState('SUBJECT');
    } else {
      setViewState('HOME');
    }
  };

  const handleTopicSelect = async (topicTitle: string) => {
    if (!selectedSubject) return;
    
    // Scroll content to top
    document.getElementById('main-content')?.scrollTo({ top: 0, behavior: 'smooth' });

    setSelectedTopic(topicTitle);
    setLoadingState(LoadingState.LOADING);
    setNoteContent(null); 
    // Do not reset quick revision mode here, allowing user to browse chapters in quick mode if they want

    try {
      // Service now handles fallbacks and guarantees data (mock or real)
      const data = await generateNotes(selectedSubject.name, topicTitle);
      setNoteContent(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setLoadingState(LoadingState.ERROR);
    }
  };

  // --- Render Functions ---

  const renderHome = () => (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      
      {/* Motivational Banner */}
      {showMotivationalBanner && (
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white text-center py-2 px-4 relative border-b border-indigo-500/30">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
             <Sparkles size={16} className="text-yellow-300 mr-3 animate-pulse" />
             <p className="font-medium text-sm md:text-base italic tracking-wide">
               "{currentQuote}"
             </p>
          </div>
          <button 
            onClick={() => setShowMotivationalBanner(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-indigo-300 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
             <div className="flex items-center group">
                <div className="relative">
                  {appLogo ? (
                    <img 
                      src={appLogo} 
                      alt="Note4Afsheen Logo" 
                      className="h-10 w-10 rounded-lg object-cover mr-3 border border-indigo-500/50 shadow-lg shadow-indigo-500/20" 
                    />
                  ) : (
                    <Brain className={`h-8 w-8 text-indigo-500 mr-2 ${isGeneratingLogo ? 'animate-pulse' : ''}`} />
                  )}
                  {/* Magic Button */}
                  <button 
                    onClick={handleGenerateLogo}
                    disabled={isGeneratingLogo}
                    title="Generate AI Logo with Nano Banana"
                    className="absolute -bottom-2 -right-2 bg-slate-800 p-1 rounded-full text-yellow-400 hover:text-white hover:bg-indigo-600 transition-colors border border-slate-700 shadow-sm opacity-0 group-hover:opacity-100 disabled:opacity-50"
                  >
                    <Sparkles size={10} className={isGeneratingLogo ? 'animate-spin' : ''} />
                  </button>
                </div>

                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  Note4Afsheen
                </span>
             </div>
             <div className="hidden md:flex items-center space-x-4">
               <button onClick={handleBackHome} className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</button>
               <button onClick={() => document.getElementById('subjects')?.scrollIntoView({ behavior: 'smooth' })} className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Subjects</button>
               <button onClick={handleVideoSearch} className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Video Search</button>
               <button onClick={handleViewSyllabus} className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Syllabus</button>
               <span className="bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-500/30">Class 10 Special</span>
             </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center py-16 lg:py-24 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] -z-10"></div>

          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-900/30 text-indigo-300 border border-indigo-500/30 text-sm font-medium mb-6 animate-fade-in-up">
            <Sparkles size={14} className="mr-2 text-indigo-400" />
            Board Exam Prep 2025
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Your Smart Notes for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Class 10 Board Exam
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Master every chapter with AI-powered summaries, formula sheets, and important questions. 
            Designed specifically for the 2025 curriculum.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button 
               onClick={() => document.getElementById('subjects')?.scrollIntoView({ behavior: 'smooth' })}
               className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105"
             >
               Start Learning
             </button>
             <button 
                onClick={handleViewSyllabus}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-lg border border-slate-700 transition-all"
              >
               View Syllabus
             </button>
          </div>
        </div>

        {/* 2026 Prediction Block */}
        <section 
          onClick={handleExpectedQuestions}
          className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-3xl p-8 mb-24 cursor-pointer hover:border-amber-400/50 transition-all group shadow-lg shadow-amber-900/10"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Target size={120} className="text-amber-500" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/30">
                 <Target size={12} className="mr-2" /> Exam Strategy
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">2026 Expected Questions</h2>
              <p className="text-slate-300 max-w-xl">
                 Get ahead of the curve. Access our curated list of high-probability questions for the 2026 Board Exams, hand-picked from top educational sources.
              </p>
            </div>
            <button className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl shadow-lg hover:bg-amber-500 transition-all flex items-center shrink-0">
               View Predictions <ChevronRight size={18} className="ml-2" />
            </button>
          </div>
        </section>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 border-y border-slate-800 py-12 bg-slate-900/30 rounded-3xl">
           <div className="text-center p-4">
             <div className="mx-auto w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
               <Monitor className="text-emerald-400" />
             </div>
             <h3 className="text-white font-bold text-lg">Smart Summaries</h3>
             <p className="text-slate-400 text-sm mt-2">Concise, easy-to-revise notes generated instantly.</p>
           </div>
           <div className="text-center p-4">
             <div className="mx-auto w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-4">
               <Lightbulb className="text-amber-400" />
             </div>
             <h3 className="text-white font-bold text-lg">Key Concepts</h3>
             <p className="text-slate-400 text-sm mt-2">Focus on what matters most for the exam.</p>
           </div>
           <div className="text-center p-4">
             <div className="mx-auto w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center mb-4">
               <GraduationCap className="text-rose-400" />
             </div>
             <h3 className="text-white font-bold text-lg">Exam Focused</h3>
             <p className="text-slate-400 text-sm mt-2">Important questions and formulas at your fingertips.</p>
           </div>
        </div>

        {/* Video Search Block */}
        <section 
          onClick={handleVideoSearch}
          className="relative group rounded-3xl overflow-hidden bg-gradient-to-r from-red-900/20 to-slate-900 border border-slate-800 mb-24 cursor-pointer hover:border-red-500/30 transition-all"
        >
           {/* Decorative Background */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-red-600/10 transition-all"></div>
           
           <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                 <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider mb-4 border border-red-500/20">
                    <Youtube size={12} className="mr-2" /> New Feature
                 </div>
                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Smart Video Search</h2>
                 <p className="text-slate-400 text-lg">
                    Don't waste time scrolling. Find the <strong>best educational videos</strong> instantly. 
                    Search any topic, and we'll curate the top YouTube lessons for you.
                 </p>
              </div>
              <div className="shrink-0">
                 <button 
                   className="flex items-center px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-900/20 transform group-hover:scale-105"
                 >
                    Search Videos <Search size={20} className="ml-2" />
                 </button>
              </div>
           </div>
        </section>

        {/* Subject Grid */}
        <div id="subjects" className="scroll-mt-24 mb-24">
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-3xl font-bold text-white">Choose a Subject</h2>
             <span className="text-slate-400 text-sm hidden sm:block">All 6 Subjects Included</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUBJECTS.map(subject => (
              <SubjectCard key={subject.id} subject={subject} onClick={handleSubjectClick} />
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-24 py-12 border-t border-slate-800 text-center">
          <div className="flex items-center justify-center mb-4">
            {appLogo ? (
                <img src={appLogo} alt="Logo" className="h-6 w-6 rounded mr-2" />
            ) : (
                <Brain className="text-slate-600 mr-2" size={20}/>
            )}
             <span className="text-slate-500 font-semibold">Note4Afsheen</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2025 Note4Afsheen. Built for excellence by Jahangir. 
          </p>
        </footer>
      </div>
    </div>
  );

  const renderExpectedQuestions = () => {
    // Filter questions based on selected subject in this view
    const filteredQuestions = PREDICTED_QUESTIONS_2026.filter(q => q.subjectId === predictionFilterSubject);
    
    // Get subject details for color theming
    const activeSubject = SUBJECTS.find(s => s.id === predictionFilterSubject);
    const themeColor = activeSubject ? activeSubject.color.replace('bg-', 'text-').replace('-600', '-400') : 'text-indigo-400';
    const borderColor = activeSubject ? activeSubject.color.replace('bg-', 'border-').replace('-600', '-500') : 'border-indigo-500';
    const bgHover = activeSubject ? activeSubject.color.replace('bg-', 'hover:bg-').replace('-600', '-900') : 'hover:bg-slate-800';

    return (
      <div className="min-h-screen bg-slate-950 text-slate-200">
        <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center">
              <button onClick={handleBackHome} className="flex items-center text-slate-300 hover:text-white mr-6">
                <ArrowLeft className="mr-2" size={20}/>
              </button>
              <span className="text-xl font-bold text-white flex items-center">
                <Target size={20} className="mr-2 text-amber-500" />
                2026 Expected Questions
              </span>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 py-12">
          
          <div className="text-center mb-10">
             <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Board Exam Predictions</h1>
             <p className="text-slate-400 max-w-2xl mx-auto">
               Hand-picked, high-value questions based on the latest CBSE trends. 
               Practice these to secure top marks in 2026. Click on a question to view the answer.
             </p>
          </div>

          {/* Subject Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
             {SUBJECTS.map(subject => (
               <button
                 key={subject.id}
                 onClick={() => setPredictionFilterSubject(subject.id)}
                 className={`px-6 py-2 rounded-full font-bold text-sm transition-all border ${
                   predictionFilterSubject === subject.id 
                     ? `${subject.color} text-white border-transparent shadow-lg transform scale-105`
                     : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-600'
                 }`}
               >
                 {subject.name}
               </button>
             ))}
          </div>

          {/* Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q, idx) => (
                <div key={idx} className="bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-800 hover:border-slate-700 transition-all shadow-sm">
                   <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase border bg-opacity-10 ${borderColor} ${themeColor}`}>
                           {q.type}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">
                           {q.marks} Marks
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        {q.chapter}
                      </span>
                   </div>
                   
                   <h3 className="text-lg md:text-xl font-medium text-slate-200 leading-relaxed mb-4">
                     <span className="text-slate-500 font-bold mr-2">Q{idx + 1}.</span> {q.question}
                   </h3>

                   <div className="flex justify-end items-center gap-4">
                      {/* View Answer Button */}
                      <button 
                        onClick={() => setActiveQuestion(q)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors shadow-sm`}
                      >
                         View Answer
                      </button>

                      <button 
                        onClick={() => handleSubjectClick(q.subjectId)} // Simplified: just goes to subject page for now
                        className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center"
                      >
                         Go to Subject Notes <ChevronRight size={14} className="ml-1" />
                      </button>
                   </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-500">
                 No predicted questions available for this subject yet. Check back soon!
              </div>
            )}
          </div>
        </div>

        {/* Answer Modal */}
        {activeQuestion && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
             <div 
               className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
               onClick={() => setActiveQuestion(null)}
             ></div>
             <div className="relative bg-slate-900 border border-slate-700 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 md:p-8 shadow-2xl animate-zoom-in custom-scroll">
                <button 
                  onClick={() => setActiveQuestion(null)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full transition-colors"
                >
                   <X size={20} />
                </button>

                <div className="mb-6 pr-8">
                   <span className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2 block">Question</span>
                   <h3 className="text-lg md:text-xl font-semibold text-white">{activeQuestion.question}</h3>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                   <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 block flex items-center">
                     <CheckCircle size={14} className="mr-2"/> Correct Answer
                   </span>
                   <div className="text-slate-300 leading-relaxed whitespace-pre-line font-medium text-lg">
                      {activeQuestion.answer}
                   </div>
                </div>

                <div className="mt-6 flex justify-end">
                   <button 
                     onClick={() => setActiveQuestion(null)}
                     className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg"
                   >
                      Close
                   </button>
                </div>
             </div>
          </div>
        )}

      </div>
    );
  };

  const renderVideoSearch = () => (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
             <button onClick={handleVideoSearchBack} className="flex items-center text-slate-300 hover:text-white mr-6">
               <ArrowLeft className="mr-2" size={20}/>
             </button>
             <span className="text-xl font-bold text-white">Search YouTube Videos</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
         {/* Search Input Section */}
         <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-6">Find the Perfect Lesson</h1>
            <form onSubmit={(e) => handlePerformVideoSearch(e)} className="relative max-w-xl mx-auto">
               <input 
                 type="text" 
                 placeholder="e.g. Quadratic Equations Class 10" 
                 value={videoSearchQuery}
                 onChange={(e) => setVideoSearchQuery(e.target.value)}
                 className="w-full px-6 py-4 rounded-full bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-lg shadow-xl"
               />
               <button 
                 type="submit"
                 disabled={videoSearchLoading}
                 className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-500 text-white rounded-full px-6 font-bold transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  {videoSearchLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Search size={20} />}
               </button>
            </form>
            <p className="text-slate-500 mt-4 text-sm">
               We use AI to recommend the best channels and specific videos for your topic.
            </p>
         </div>

         {/* Results Grid */}
         {videoSearchResults.length > 0 && (
           <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
              <h2 className="text-xl font-bold text-white mb-6">Recommended Videos</h2>
              {videoSearchResults.map((video, idx) => (
                <div 
                  key={idx} 
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}
                  className="group bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-red-500/30 rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg hover:shadow-red-900/10 flex flex-col sm:flex-row gap-6 items-start"
                >
                   {/* Thumbnail / Icon */}
                   <div className="w-full sm:w-48 aspect-video bg-slate-950 rounded-lg border border-slate-800 group-hover:border-red-500/20 transition-colors shrink-0 relative overflow-hidden">
                      {/* Fallback Icon (always rendered behind) */}
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                         <Youtube size={32} className="text-slate-700/50" />
                      </div>

                      {/* Using actual YT thumbnail (HQ) if ID exists */}
                      <img 
                        src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`} 
                        alt={video.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity z-10"
                        loading="lazy"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <Play size={20} fill="white" className="text-white ml-1" />
                          </div>
                      </div>
                   </div>

                   <div className="flex-1">
                      <div className="flex items-start justify-between">
                         <h3 className="text-lg font-bold text-slate-100 group-hover:text-red-400 transition-colors mb-2">
                           {video.title}
                         </h3>
                         <span className="bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded font-mono border border-slate-700 whitespace-nowrap ml-4 hidden sm:block">
                           {video.durationLabel}
                         </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-slate-400 mb-3 font-medium">
                         <User size={14} className="mr-2 text-slate-500" /> {video.channelName}
                      </div>
                      
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                         {video.description}
                      </p>

                      <div className="mt-4 flex items-center text-xs font-bold text-red-500 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                         Watch on YouTube <Youtube size={14} className="ml-1" />
                      </div>
                   </div>
                </div>
              ))}
           </div>
         )}

         {/* Empty State / Initial State */}
         {!videoSearchLoading && videoSearchResults.length === 0 && (
            <div className="text-center py-12 text-slate-600">
               {!videoSearchQuery ? (
                  <div className="flex flex-col items-center">
                     <Film size={48} className="mb-4 opacity-20" />
                     <p>Enter a topic above to start searching.</p>
                  </div>
               ) : (
                  <div className="flex flex-col items-center">
                    <p className="mb-4 text-slate-400">We couldn't find specific video links for "{videoSearchQuery}" via the API.</p>
                    <a 
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(videoSearchQuery + " Class 10")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all shadow-lg flex items-center"
                    >
                      Search directly on YouTube <Youtube size={18} className="ml-2" />
                    </a>
                  </div>
               )}
            </div>
         )}
         
         {/* Loading Skeleton */}
         {videoSearchLoading && (
            <div className="space-y-4">
               {[1, 2, 3].map(i => (
                  <div key={i} className="bg-slate-900 rounded-xl p-6 flex gap-6 animate-pulse border border-slate-800">
                     <div className="w-48 h-28 bg-slate-800 rounded-lg shrink-0"></div>
                     <div className="flex-1 space-y-3">
                        <div className="h-6 bg-slate-800 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-800 rounded w-1/4"></div>
                        <div className="h-4 bg-slate-800 rounded w-full"></div>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
    </div>
  );

  const renderSubjectView = () => {
    if (!selectedSubject) return null;
    
    // Calculate progress
    const totalTopics = selectedSubject.topics.length;
    const completedCount = selectedSubject.topics.filter(t => completedTopics.has(`${selectedSubject.id}|${t.title}`)).length;
    const progressPercentage = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

    const normalizeMatch = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    // Filter high-quality curated predictions for the current topic
    const topicPredictions = PREDICTED_QUESTIONS_2026.filter(q => 
      q.subjectId === selectedSubject.id && 
      selectedTopic && 
      (normalizeMatch(q.chapter).includes(normalizeMatch(selectedTopic)) || normalizeMatch(selectedTopic).includes(normalizeMatch(q.chapter)))
    );

    return (
      <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden transition-all duration-300">
        {/* Sidebar - Hidden in Quick Revision Mode */}
        <div className={`w-80 bg-slate-900 border-r border-slate-800 flex-col h-full ${quickRevisionMode ? 'hidden' : 'hidden md:flex'}`}>
          <div className="p-6 border-b border-slate-800">
            <button 
              onClick={handleBackHome}
              className="flex items-center text-slate-400 hover:text-white transition-colors mb-4 text-sm font-medium"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </button>
            <h2 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-2`}>
              {selectedSubject.name}
            </h2>
            
            {/* Enhanced Progress Bar Tracker */}
            <div className="mb-6 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 shadow-inner">
               <div className="flex justify-between items-end text-sm mb-2">
                 <span className="text-slate-400 font-medium">Course Progress</span>
                 <span className="text-emerald-400 font-bold">{completedCount} <span className="text-slate-600 font-normal">/</span> {totalTopics}</span>
               </div>
               <div className="w-full bg-slate-900/80 rounded-full h-2.5 overflow-hidden border border-slate-700/30">
                  <div 
                    className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(16,185,129,0.2)]" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
               </div>
               <div className="mt-2 text-xs text-slate-500 text-right">
                  {progressPercentage === 100 ? "🎉 All chapters completed!" : `${100 - progressPercentage}% to go`}
               </div>
            </div>

            <div className="relative group">
              <input
                type="text"
                placeholder="Search chapters..."
                value={topicSearchQuery}
                onChange={(e) => setTopicSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-500"
              />
              <Search className="absolute left-3 top-2.5 text-slate-500 group-hover:text-slate-300 transition-colors" size={16} />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scroll">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic, idx) => {
                const isCompleted = completedTopics.has(`${selectedSubject.id}|${topic.title}`);
                const isSelected = selectedTopic === topic.title;
                
                return (
                  <div
                    key={idx}
                    className={`w-full flex items-start justify-between p-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                      isSelected 
                        ? 'bg-indigo-600/20 shadow-sm border border-indigo-500/30' 
                        : 'hover:bg-slate-800 border border-transparent'
                    }`}
                  >
                    <div 
                      className="flex flex-col min-w-0 flex-1 mr-2 cursor-pointer"
                      onClick={() => handleTopicSelect(topic.title)}
                    >
                       <div className="flex items-center">
                          <div 
                            onClick={(e) => toggleTopicCompletion(selectedSubject.id, topic.title, e)}
                            className="mr-3 cursor-pointer text-slate-600 hover:text-emerald-500 flex-shrink-0 transition-colors"
                            title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                          >
                            {isCompleted ? (
                              <CheckCircle size={16} className="text-emerald-500 animate-pop drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            ) : (
                              <Circle size={16} />
                            )}
                          </div>
                          <span className={`font-semibold truncate ${isSelected ? 'text-indigo-300' : 'text-slate-300'} ${isCompleted ? 'text-slate-500 line-through decoration-slate-600' : ''}`}>
                            {topic.title}
                          </span>
                       </div>
                       {/* Description Subtitle */}
                       <span className={`text-xs ml-7 truncate mt-0.5 ${isSelected ? 'text-indigo-400/70' : 'text-slate-500 group-hover:text-slate-400'}`}>
                          {topic.description}
                       </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-sm text-slate-500 italic">
                No chapters match "{topicSearchQuery}"
              </div>
            )}
          </div>
        </div>

        {/* Mobile Header - Hidden in Quick Revision Mode */}
        <div className={`md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 z-50 flex items-center px-4 justify-between ${quickRevisionMode ? 'hidden' : 'flex'}`}>
           <button onClick={handleMobileBack} className="p-2 -ml-2 text-slate-300">
             <ArrowLeft size={20} />
           </button>
           <div className="flex flex-col items-center flex-1 mx-4">
             <span className="font-bold text-slate-200 text-sm truncate max-w-[150px]">{selectedSubject.name}</span>
             {/* Mini Progress Bar for Mobile */}
             <div className="w-full max-w-[120px] bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
               <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
             </div>
           </div>
           <div className="w-8 flex justify-end">
              <span className="text-xs text-emerald-500 font-bold">{Math.round(progressPercentage)}%</span>
           </div>
        </div>

        {/* Main Content Area */}
        <div id="main-content" className="flex-1 h-full overflow-y-auto bg-slate-950 relative pt-16 md:pt-0">
          {!selectedTopic ? (
            <div className="h-full flex flex-col text-slate-500 min-h-[500px]">
              
              {/* Dashboard Hero for Subject */}
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto">
                  <div className={`p-6 rounded-full bg-slate-800/50 mb-6 border border-slate-800 hidden md:block`}>
                     <BookMarked size={48} className="text-indigo-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2 hidden md:block">Ready to revise?</h3>
                  <p className="max-w-md text-slate-400 mb-8 hidden md:block">Select a chapter from the list to generate instant notes, summaries, and important questions.</p>

                  {/* External References & Resources Section */}
                  {selectedSubject.references && selectedSubject.references.length > 0 && (
                     <div className="w-full hidden md:block">
                        <div className="flex items-center justify-center gap-2 mb-4 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                           <ExternalLink size={14} /> Official Resources
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                           {selectedSubject.references.map((ref, i) => (
                              <a 
                                 key={i} 
                                 href={ref.url} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="flex items-center p-3 bg-slate-900 border border-slate-800 rounded-lg hover:border-indigo-500/30 hover:bg-slate-800 transition-all group"
                              >
                                 <div className="bg-indigo-500/10 p-2 rounded mr-3 text-indigo-400 group-hover:text-indigo-300">
                                    <ExternalLink size={16} />
                                 </div>
                                 <span className="text-sm font-medium text-slate-300 group-hover:text-white truncate">{ref.title}</span>
                              </a>
                           ))}
                        </div>
                     </div>
                  )}
              </div>
              
              {/* Mobile Chapter Selector Fallback / Main Area List */}
              <div className="md:hidden w-full mt-4 text-left pb-10 px-4">
                <div className="flex justify-between items-center mb-3 px-1">
                   <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Chapters</p>
                   <span className="text-xs text-emerald-500 font-medium">{progressPercentage}% Complete</span>
                </div>
                
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search chapters..."
                    value={topicSearchQuery}
                    onChange={(e) => setTopicSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
                  />
                  <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                </div>
                <div className="space-y-2 mb-8">
                {filteredTopics.length > 0 ? (
                  filteredTopics.map((topic, idx) => {
                    const isCompleted = completedTopics.has(`${selectedSubject.id}|${topic.title}`);
                    return (
                      <div
                        key={idx}
                        className="w-full p-4 bg-slate-900 rounded-lg text-sm font-medium text-slate-300 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between group"
                      >
                         <div 
                           className="flex flex-col flex-1 cursor-pointer mr-4"
                           onClick={() => handleTopicSelect(topic.title)}
                         >
                            <span className={`text-base font-semibold ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-200'} truncate`}>
                              {topic.title}
                            </span>
                            <span className="text-xs text-slate-500 mt-0.5 truncate">{topic.description}</span>
                         </div>
                         
                         <div className="flex items-center gap-3">
                             <button
                                onClick={(e) => toggleTopicCompletion(selectedSubject.id, topic.title, e)}
                                className="text-slate-500 hover:text-emerald-500 p-2"
                                title={isCompleted ? "Mark incomplete" : "Mark complete"}
                             >
                                {isCompleted ? <CheckCircle size={20} className="text-emerald-500 animate-pop drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> : <Circle size={20} />}
                             </button>
 
                             <button
                               onClick={() => handleTopicSelect(topic.title)}
                               className="px-4 py-2 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs font-bold rounded-lg transition-colors border border-slate-700 hover:border-indigo-500 whitespace-nowrap"
                             >
                               View Notes
                             </button>
                         </div>
                      </div>
                    );
                  })
                ) : (
                    <div className="p-4 text-center text-sm text-slate-500 italic bg-slate-900 rounded-lg">
                        No chapters match.
                    </div>
                )}
                </div>

                {/* Mobile Resources Section */}
                {selectedSubject.references && selectedSubject.references.length > 0 && (
                  <div className="mt-8">
                     <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <ExternalLink size={12} /> Study Resources
                     </div>
                     <div className="space-y-2">
                        {selectedSubject.references.map((ref, i) => (
                           <a 
                              key={i} 
                              href={ref.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center p-3 bg-slate-900 border border-slate-800 rounded-lg active:bg-slate-800"
                           >
                              <ExternalLink size={14} className="text-indigo-400 mr-3" />
                              <span className="text-sm font-medium text-slate-300 truncate">{ref.title}</span>
                           </a>
                        ))}
                     </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={`mx-auto p-6 transition-all duration-300 ${quickRevisionMode ? 'max-w-3xl py-12' : 'max-w-4xl md:p-12'}`}>
              
              {/* Header with Quick Revision Toggle */}
              <div className="mb-8 border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                 <div className="w-full md:w-auto">
                    <div className="flex items-center space-x-2 text-sm text-indigo-400 font-medium mb-2">
                       {quickRevisionMode && <Zap size={16} className="text-yellow-400 animate-pulse" />}
                       <span className="uppercase tracking-wide">{quickRevisionMode ? 'Quick Revision Mode' : 'Chapter Note'}</span>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-start gap-4">
                      <h1 className={`${quickRevisionMode ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'} font-bold text-white transition-all`}>
                        {selectedTopic}
                      </h1>
                      
                      {/* Mark Complete Checkbox in Header for easy access */}
                      <button 
                        onClick={(e) => toggleTopicCompletion(selectedSubject.id, selectedTopic!, e)}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-slate-800 transition-colors md:hidden"
                        title="Mark Complete"
                      >
                         {completedTopics.has(`${selectedSubject.id}|${selectedTopic}`) ? (
                           <CheckCircle size={28} className="text-emerald-500 animate-pop drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                         ) : (
                           <Circle size={28} className="text-slate-600" />
                         )}
                      </button>
                    </div>
                 </div>
                 
                 {loadingState === LoadingState.SUCCESS && noteContent && (
                   <button 
                     onClick={() => setQuickRevisionMode(!quickRevisionMode)}
                     className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                       quickRevisionMode 
                         ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white' 
                         : 'bg-indigo-600/10 text-indigo-300 hover:bg-indigo-600/20 border border-indigo-500/30'
                     }`}
                   >
                     {quickRevisionMode ? (
                       <>
                         <X size={18} className="mr-2" /> Exit Quick Mode
                       </>
                     ) : (
                       <>
                         <Zap size={18} className="mr-2 text-yellow-400" /> Quick Revision
                       </>
                     )}
                   </button>
                 )}
              </div>

              {loadingState === LoadingState.LOADING && (
                <div className="space-y-8 animate-pulse">
                  <div className="h-40 bg-slate-900 rounded-xl w-full border border-slate-800"></div>
                  <div className="space-y-4">
                    <div className="h-8 bg-slate-900 rounded w-1/3"></div>
                    <div className="h-4 bg-slate-900 rounded w-full"></div>
                    <div className="h-4 bg-slate-900 rounded w-full"></div>
                  </div>
                </div>
              )}
              
              {loadingState === LoadingState.ERROR && (
                <div className="p-6 bg-red-900/20 text-red-300 rounded-xl border border-red-900/30">
                  <p className="font-semibold">Oops! Could not generate notes.</p>
                  <p className="text-sm mt-1 opacity-80">Please check your internet connection or API key and try again.</p>
                </div>
              )}

              {loadingState === LoadingState.SUCCESS && noteContent && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Summary Section */}
                  <section className={`rounded-2xl border transition-all duration-300 ${
                    quickRevisionMode 
                      ? 'bg-transparent border-transparent p-0' 
                      : 'bg-gradient-to-br from-indigo-900/20 to-slate-900 p-6 md:p-8 border-indigo-500/20 shadow-lg'
                  }`}>
                    {!quickRevisionMode && (
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                          <Sparkles size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-white">Quick Summary</h3>
                      </div>
                    )}
                    <p className={`text-slate-300 leading-relaxed ${quickRevisionMode ? 'text-xl md:text-2xl text-slate-200 leading-loose' : 'text-lg'}`}>
                      {noteContent.summary}
                    </p>
                  </section>

                  <div className={`grid gap-8 ${quickRevisionMode ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
                    {/* Key Concepts */}
                    <section>
                      <div className={`flex items-center gap-3 mb-6 ${quickRevisionMode ? '' : 'border-b border-slate-800 pb-3'}`}>
                        {!quickRevisionMode && <Lightbulb size={24} className="text-amber-400" />}
                        <h3 className={`font-bold text-white ${quickRevisionMode ? 'text-2xl text-amber-400 mb-6' : 'text-xl'}`}>Key Concepts</h3>
                      </div>
                      <ul className="space-y-4">
                        {noteContent.keyConcepts.map((concept, i) => (
                          <li key={i} className="flex gap-4 group items-start">
                            <span className={`flex-shrink-0 flex items-center justify-center rounded-full font-bold transition-colors ${
                              quickRevisionMode 
                                ? 'w-10 h-10 text-lg bg-amber-500/20 text-amber-400' 
                                : 'w-8 h-8 text-sm bg-slate-800 text-slate-400 group-hover:bg-amber-500/20 group-hover:text-amber-400 border border-slate-700'
                            }`}>
                              {i + 1}
                            </span>
                            <div className="flex-1">
                               <p className={`${quickRevisionMode ? 'text-lg text-slate-200' : 'text-slate-300'} pt-1`}>{concept}</p>
                               {/* Contextual Video Link */}
                               {!quickRevisionMode && (
                                 <button 
                                   onClick={() => handleConceptVideoSearch(concept)}
                                   className="mt-2 flex items-center text-xs font-bold text-indigo-400 hover:text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity"
                                 >
                                    <Play size={12} className="mr-1" /> Watch Video
                                 </button>
                               )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* Formulas (Conditional) - Hidden in Quick Revision */}
                    {!quickRevisionMode && noteContent.formulas && noteContent.formulas.length > 0 && (
                      <section>
                         <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-3">
                          <GraduationCap size={24} className="text-emerald-400" />
                          <h3 className="text-xl font-bold text-white">Important Formulas</h3>
                        </div>
                        <div className="bg-black/40 rounded-xl p-6 text-emerald-100/90 space-y-4 font-mono text-sm relative overflow-hidden border border-slate-800">
                           <div className="absolute top-0 right-0 p-4 opacity-5">
                              <Icon name="Calculator" size={64} className="text-white"/>
                           </div>
                           {noteContent.formulas.map((formula, i) => (
                             <div key={i} className="border-b border-slate-800 last:border-0 pb-3 last:pb-0">
                               {formula}
                             </div>
                           ))}
                        </div>
                      </section>
                    )}
                  </div>

                  {/* Important Questions Section (Merged: Curated Predictions + AI Generated) */}
                  <section className={`transition-all duration-300 ${
                    quickRevisionMode 
                      ? 'mt-8' 
                      : 'bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8'
                  }`}>
                    <div className="flex items-center gap-3 mb-6">
                      {!quickRevisionMode && (
                        <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                          <BookMarked size={20} />
                        </div>
                      )}
                      <h3 className={`font-bold text-white ${quickRevisionMode ? 'text-2xl text-rose-400' : 'text-xl'}`}>
                        {quickRevisionMode ? 'Important Questions' : 'Exam Corner: Important Questions'}
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Curated 2026 Predictions */}
                      {topicPredictions.map((q, i) => (
                        <div key={`pred-${i}`} className="mb-4">
                          <details className={`group rounded-lg border transition-all duration-200 ${
                            quickRevisionMode 
                              ? 'bg-transparent border-slate-800' 
                              : 'bg-slate-900/80 border-amber-500/30 open:bg-slate-900 shadow-sm'
                          }`}>
                            <summary className="flex items-start gap-3 p-4 cursor-pointer list-none">
                                <span className={`font-semibold flex-shrink-0 flex items-center justify-center ${
                                  quickRevisionMode ? 'text-amber-400 text-lg' : 'text-amber-500 bg-amber-500/10 w-8 h-8 rounded text-sm'
                                }`}>Q</span>
                                <div className="flex-1">
                                  <div className="flex flex-wrap gap-2 mb-2">
                                     <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-900 px-2 py-0.5 rounded-full flex items-center w-fit">
                                       <Target size={10} className="mr-1" /> 2026 Prediction
                                     </span>
                                  </div>
                                  <span className={`font-medium block mb-2 ${
                                    quickRevisionMode ? 'text-slate-200 text-lg leading-relaxed' : 'text-slate-200 group-hover:text-white'
                                  }`}>{q.question}</span>
                                  <span className="text-xs text-indigo-400 group-open:hidden flex items-center font-bold">
                                    View Answer <ChevronDown size={14} className="ml-1" />
                                  </span>
                                </div>
                                <ChevronDown className="mt-1 text-slate-500 transition-transform group-open:rotate-180" size={20} />
                            </summary>
                            <div className={`px-4 pb-4 pl-[3.5rem] pt-0 ${quickRevisionMode ? 'text-lg text-slate-300' : 'text-slate-300'}`}>
                               <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800 text-base leading-relaxed">
                                  <span className="text-emerald-500 font-bold text-xs uppercase tracking-wider mb-2 block flex items-center">
                                     <CheckCircle size={12} className="mr-1" /> Answer
                                  </span>
                                  {q.answer}
                               </div>
                            </div>
                          </details>
                        </div>
                      ))}

                      {/* AI Generated Questions */}
                      {noteContent.importantQuestions.map((q, i) => (
                        <div key={`ai-${i}`} className="mb-4">
                          <details className={`group rounded-lg border transition-all duration-200 ${
                            quickRevisionMode 
                              ? 'bg-transparent border-slate-800' 
                              : 'bg-slate-900 hover:bg-slate-900/80 border-slate-800 hover:border-rose-500/30'
                          }`}>
                            <summary className="flex items-start gap-3 p-4 cursor-pointer list-none">
                              <span className={`font-semibold flex-shrink-0 ${
                                quickRevisionMode ? 'text-rose-400 text-lg mt-0.5' : 'text-slate-500 mr-2 mt-1'
                              }`}>{topicPredictions.length > 0 ? `Q${topicPredictions.length + i + 1}.` : `Q${i+1}.`}</span>
                              <div className="flex-1">
                                <span className={`font-medium block mb-2 ${
                                  quickRevisionMode ? 'text-slate-200 text-lg leading-relaxed' : 'text-slate-300 group-hover:text-white'
                                }`}>{q.question}</span>
                                <span className="text-xs text-indigo-400 group-open:hidden flex items-center font-bold">
                                    View Answer <ChevronDown size={14} className="ml-1" />
                                </span>
                              </div>
                              <ChevronDown className="mt-1 text-slate-500 transition-transform group-open:rotate-180" size={20} />
                            </summary>
                            <div className={`px-4 pb-4 pl-[3.5rem] pt-0 ${quickRevisionMode ? 'text-lg text-slate-300' : 'text-slate-300'}`}>
                               <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800 text-base leading-relaxed">
                                  <span className="text-emerald-500 font-bold text-xs uppercase tracking-wider mb-2 block flex items-center">
                                     <CheckCircle size={12} className="mr-1" /> Answer
                                  </span>
                                  {q.answer}
                               </div>
                            </div>
                          </details>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Completion Action at the bottom of the note */}
                  <div className="flex justify-center mt-12 pb-8">
                     <button
                        onClick={(e) => toggleTopicCompletion(selectedSubject.id, selectedTopic!, e)}
                        className={`flex items-center px-6 py-3 rounded-full text-lg font-semibold transition-all transform active:scale-95 duration-200 shadow-lg ${
                          completedTopics.has(`${selectedSubject.id}|${selectedTopic}`)
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-900/50'
                            : 'bg-slate-800 text-slate-300 hover:bg-emerald-600 hover:text-white border border-slate-700'
                        }`}
                     >
                       {completedTopics.has(`${selectedSubject.id}|${selectedTopic}`) ? (
                          <>
                             <CheckCircle size={24} className="mr-3 animate-pop drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> Completed
                          </>
                       ) : (
                          <>
                             <Circle size={24} className="mr-3" /> Mark as Complete
                          </>
                       )}
                     </button>
                  </div>

                  
                  {/* Related Topics / Next Chapter Navigation */}
                  <div className="mt-8 pt-8 border-t border-slate-800/50">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                      <Sparkles size={20} className="text-indigo-400 mr-2" /> 
                      Continue Learning
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                      {/* Next Chapter Card */}
                      {(() => {
                         const currentIndex = selectedSubject.topics.findIndex(t => t.title === (selectedTopic || ''));
                         const nextTopic = selectedSubject.topics[currentIndex + 1];
                         
                         if (nextTopic) {
                           return (
                              <div 
                                onClick={() => handleTopicSelect(nextTopic.title)}
                                className="group relative p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-all cursor-pointer overflow-hidden shadow-lg hover:shadow-indigo-500/10"
                              >
                                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 group-hover:w-2 transition-all duration-300"></div>
                                <div className="flex justify-between items-start mb-2">
                                   <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-2 py-1 rounded">Next Chapter</span>
                                   <ChevronRight size={20} className="text-slate-500 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
                                </div>
                                <h4 className="text-lg font-bold text-slate-100 group-hover:text-white mt-2 line-clamp-1">{nextTopic.title}</h4>
                                <p className="text-sm text-slate-400 mt-2">{nextTopic.description}</p>
                              </div>
                           );
                         }
                         return null;
                      })()}

                      {/* Smart Suggestion Card */}
                      {(() => {
                         const currentIndex = selectedSubject.topics.findIndex(t => t.title === (selectedTopic || ''));
                         const currentTopicObj = selectedSubject.topics[currentIndex];
                         if (!currentTopicObj) return null;

                         const nextTopicIndex = currentIndex + 1;
                         
                         // Helper to tokenize for simple keyword matching
                         const getTokens = (str: string) => str.toLowerCase().split(/[\s\-,]+/).filter(w => w.length > 3 && !['unit', 'chapter', 'part', 'introduction', 'some', 'about', 'concept', 'basics'].includes(w));
                         const currentTokens = getTokens(currentTopicObj.title);

                         // Candidates: Exclude current and next (since next is already shown)
                         // We map to keep index for distance calculation if needed
                         const candidates = selectedSubject.topics
                            .map((t, i) => ({ ...t, originalIndex: i }))
                            .filter((t, i) => i !== currentIndex && i !== nextTopicIndex);

                         if (candidates.length === 0) return null;

                         let bestMatch = null;
                         let maxScore = 0;

                         candidates.forEach(topic => {
                            let score = 0;
                            const topicTokens = getTokens(topic.title);
                            
                            // Keyword overlap in Title
                            currentTokens.forEach(ct => {
                               if (topicTokens.some(tt => tt.includes(ct) || ct.includes(tt))) score += 3;
                            });

                            // Description overlap
                            const descTokens = getTokens(topic.description);
                            currentTokens.forEach(ct => {
                               if (descTokens.some(dt => dt.includes(ct) || ct.includes(dt))) score += 1;
                            });
                            
                            if (score > maxScore) {
                               maxScore = score;
                               bestMatch = topic;
                            }
                         });

                         let relatedTopic = bestMatch;
                         let relationLabel = "Explore Related";

                         if (!relatedTopic) {
                            // Fallback 1: Previous Topic (Review)
                            if (currentIndex > 0) {
                               relatedTopic = selectedSubject.topics[currentIndex - 1] as any;
                               relationLabel = "Review Previous";
                            } 
                            // Fallback 2: Topic after next
                            else if (selectedSubject.topics.length > nextTopicIndex + 1) {
                               relatedTopic = selectedSubject.topics[nextTopicIndex + 1] as any;
                               relationLabel = "Up Next";
                            }
                             // Fallback 3: Random remaining
                            else {
                               relatedTopic = candidates[Math.floor(Math.random() * candidates.length)];
                               relationLabel = "Explore More";
                            }
                         } else {
                            relationLabel = "Similar Topic";
                         }

                         if (!relatedTopic) return null;
                         
                         // Cast back to Topic (remove originalIndex if spread caused type issue, though TS usually handles it)
                         const finalTopic = relatedTopic as typeof selectedSubject.topics[0];

                         return (
                              <div 
                                onClick={() => handleTopicSelect(finalTopic.title)}
                                className="group relative p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer overflow-hidden shadow-lg hover:shadow-emerald-500/10"
                              >
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 group-hover:w-2 transition-all duration-300"></div>
                                <div className="flex justify-between items-start mb-2">
                                   <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-1 rounded">{relationLabel}</span>
                                   <Icon name="Lightbulb" size={20} className="text-slate-500 group-hover:text-emerald-400 transition-all" />
                                </div>
                                <h4 className="text-lg font-bold text-slate-100 group-hover:text-white mt-2 line-clamp-1">{finalTopic.title}</h4>
                                <p className="text-sm text-slate-400 mt-2">{finalTopic.description}</p>
                              </div>
                           );
                      })()}
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSyllabus = () => (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
             <button onClick={handleBackHome} className="flex items-center text-slate-300 hover:text-white mr-6">
               <ArrowLeft className="mr-2" size={20}/>
             </button>
             <span className="text-xl font-bold text-white">CBSE Class 10 Syllabus (2024-25)</span>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Complete Board Syllabus</h1>
          <p className="text-slate-400">Comprehensive breakdown of units, marks distribution, and chapters.</p>
        </div>

        <div className="grid gap-12">
          {SUBJECTS.map((subject) => {
             const syllabus = SYLLABUS_DATA.find(s => s.subjectId === subject.id);
             if (!syllabus) return null;

             return (
               <div key={subject.id} className="relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                 <div className={`absolute top-0 left-0 w-2 h-full ${subject.color}`}></div>
                 <div className="p-8">
                   <div className="flex items-center mb-6">
                     <div className={`p-3 rounded-lg ${subject.color} bg-opacity-20 mr-4`}>
                        <Icon name={subject.icon as any} className="text-slate-100" size={24} />
                     </div>
                     <h2 className="text-2xl font-bold text-white">{subject.name}</h2>
                   </div>

                   <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                     {syllabus.units.map((unit, idx) => (
                       <div key={idx} className="bg-slate-950/50 rounded-xl p-5 border border-slate-800/50 hover:border-slate-700 transition-colors">
                         <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-indigo-300 text-lg">{unit.title}</h3>
                            {unit.marks && (
                              <span className="bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded font-mono border border-slate-700">
                                {unit.marks} Marks
                              </span>
                            )}
                         </div>
                         <ul className="list-disc list-inside space-y-2">
                           {unit.topics.map((t, i) => (
                             <li key={i} className="text-slate-400 text-sm leading-relaxed pl-2 -indent-2">
                               <span className="inline-block w-2 h-2 rounded-full bg-slate-700 mr-2 align-middle"></span>
                               {t}
                             </li>
                           ))}
                         </ul>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
             );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
      {viewState === 'HOME' && renderHome()}
      {viewState === 'SUBJECT' && renderSubjectView()}
      {viewState === 'SYLLABUS' && renderSyllabus()}
      {viewState === 'VIDEO_SEARCH' && renderVideoSearch()}
      {viewState === 'EXPECTED_QUESTIONS' && renderExpectedQuestions()}
    </div>
  );
};

export default App;