import { useState, useEffect } from 'react';
import { Tab, TabProgress } from '@/types/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Target,
  Brain,
  Trophy,
  Clock,
  Volume2,
  VolumeX
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TabLearningModeProps {
  tab: Tab;
  progress: TabProgress;
  onProgressUpdate: (updates: Partial<TabProgress>) => void;
}

type LearningMode = 'practice' | 'ear-training' | 'tab-hero' | 'mistake-check';

export const TabLearningMode = ({ tab, progress, onProgressUpdate }: TabLearningModeProps) => {
  const [currentMode, setCurrentMode] = useState<LearningMode>('practice');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentMeasure, setCurrentMeasure] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Ear training state
  const [playedNote, setPlayedNote] = useState<{ string: number; fret: number } | null>(null);
  const [userGuess, setUserGuess] = useState<{ string: number; fret: number } | null>(null);
  const [earTrainingScore, setEarTrainingScore] = useState(0);

  // Tab Hero state
  const [heroSpeed, setHeroSpeed] = useState(0.75);
  const [heroScore, setHeroScore] = useState(0);
  const [heroStreak, setHeroStreak] = useState(0);

  const modes = [
    { 
      id: 'practice', 
      label: 'Практика', 
      icon: Target, 
      description: 'Изучайте таб пошагово' 
    },
    { 
      id: 'ear-training', 
      label: 'Слух', 
      icon: Brain, 
      description: 'Угадывайте ноты на слух' 
    },
    { 
      id: 'tab-hero', 
      label: 'Tab Hero', 
      icon: Trophy, 
      description: 'Играйте в ритм' 
    },
    { 
      id: 'mistake-check', 
      label: 'Проверка', 
      icon: CheckCircle, 
      description: 'Найдите ошибки' 
    },
  ] as const;

  // Session timer
  useEffect(() => {
    if (isPlaying && !sessionStartTime) {
      setSessionStartTime(Date.now());
    }

    const timer = setInterval(() => {
      if (sessionStartTime) {
        setSessionTime(Math.floor((Date.now() - sessionStartTime) / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, sessionStartTime]);

  // Update progress when session ends
  useEffect(() => {
    if (!isPlaying && sessionStartTime && sessionTime > 0) {
      onProgressUpdate({
        practiceTime: (progress.practiceTime || 0) + sessionTime,
        lastPracticed: Date.now(),
      });
      setSessionStartTime(null);
    }
  }, [isPlaying, sessionStartTime, sessionTime, progress.practiceTime, onProgressUpdate]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const markSectionLearned = () => {
    const sectionName = tab.sections[currentSection]?.name || `Section ${currentSection}`;
    const learnedSections = progress.learnedSections || [];
    
    if (!learnedSections.includes(sectionName)) {
      onProgressUpdate({
        learnedSections: [...learnedSections, sectionName],
      });
    }
  };

  const generateRandomNote = () => {
    const strings = 6;
    const frets = 12;
    const randomString = Math.floor(Math.random() * strings) + 1;
    const randomFret = Math.floor(Math.random() * frets);
    
    setPlayedNote({ string: randomString, fret: randomFret });
    setUserGuess(null);
  };

  const checkEarTrainingGuess = (guess: { string: number; fret: number }) => {
    setUserGuess(guess);
    
    if (playedNote && guess.string === playedNote.string && guess.fret === playedNote.fret) {
      setEarTrainingScore(earTrainingScore + 1);
      setCorrectCount(correctCount + 1);
    } else {
      setMistakeCount(mistakeCount + 1);
    }
  };

  const renderPracticeMode = () => (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Режим практики</h3>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium">Текущая секция</label>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">
                {tab.sections[currentSection]?.name || `Секция ${currentSection + 1}`}
              </Badge>
              <Button
                size="sm"
                variant="outline"
                onClick={markSectionLearned}
                disabled={(progress.learnedSections || []).includes(tab.sections[currentSection]?.name || `Section ${currentSection}`)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Изучено
              </Button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Прогресс изучения</label>
            <div className="mt-1">
              <Progress 
                value={((progress.learnedSections?.length || 0) / tab.sections.length) * 100} 
                className="h-2"
              />
              <div className="text-xs text-muted-foreground mt-1">
                {progress.learnedSections?.length || 0} из {tab.sections.length} секций
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={togglePlay}>
            {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isPlaying ? 'Пауза' : 'Играть'}
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
          >
            Предыдущая секция
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => setCurrentSection(Math.min(tab.sections.length - 1, currentSection + 1))}
            disabled={currentSection === tab.sections.length - 1}
          >
            Следующая секция
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderEarTrainingMode = () => (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Тренировка слуха</h3>
          <div className="text-sm">
            Счет: {earTrainingScore} | Правильно: {correctCount} | Ошибок: {mistakeCount}
          </div>
        </div>
        
        <div className="text-center space-y-4">
          {!playedNote ? (
            <Button onClick={generateRandomNote} size="lg">
              <Volume2 className="h-5 w-5 mr-2" />
              Сыграть ноту
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-lg mb-4">Угадайте, какая нота была сыграна:</p>
                
                {/* Simplified fretboard for guessing */}
                <div className="space-y-2">
                  {['e', 'B', 'G', 'D', 'A', 'E'].map((stringName, stringIndex) => (
                    <div key={stringName} className="flex items-center gap-2">
                      <span className="w-4 text-sm">{stringName}</span>
                      <div className="flex gap-1">
                        {Array.from({ length: 13 }, (_, fret) => (
                          <button
                            key={fret}
                            className={cn(
                              "w-8 h-8 border rounded text-xs hover:bg-accent transition-colors",
                              userGuess?.string === stringIndex + 1 && userGuess?.fret === fret
                                ? "bg-primary text-primary-foreground"
                                : "bg-background"
                            )}
                            onClick={() => checkEarTrainingGuess({ string: stringIndex + 1, fret })}
                          >
                            {fret || 'O'}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {userGuess && (
                <div className="flex items-center justify-center gap-4">
                  {playedNote && userGuess.string === playedNote.string && userGuess.fret === playedNote.fret ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span>Правильно!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <XCircle className="h-5 w-5" />
                      <span>Неправильно. Правильный ответ: {playedNote?.string} струна, {playedNote?.fret} лад</span>
                    </div>
                  )}
                  
                  <Button onClick={generateRandomNote}>
                    Следующая нота
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );

  const renderTabHeroMode = () => (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Tab Hero</h3>
          <div className="flex items-center gap-4 text-sm">
            <span>Счет: {heroScore}</span>
            <span>Комбо: {heroStreak}</span>
            <span>Скорость: {Math.round(heroSpeed * 100)}%</span>
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <div className="p-8 bg-muted rounded-lg">
            <p className="text-lg mb-4">Играйте ноты в ритм!</p>
            <div className="text-sm text-muted-foreground">
              Ноты будут появляться на экране. Играйте их в правильное время.
            </div>
          </div>
          
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setHeroSpeed(Math.max(0.25, heroSpeed - 0.25))}
            >
              Медленнее
            </Button>
            
            <Button onClick={togglePlay}>
              {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isPlaying ? 'Пауза' : 'Старт'}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setHeroSpeed(Math.min(2, heroSpeed + 0.25))}
            >
              Быстрее
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderMistakeCheckMode = () => (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Проверка ошибок</h3>
          <div className="text-sm">
            Найдено ошибок: {mistakeCount}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-lg mb-2">Найдите ошибки в табулатуре</p>
            <p className="text-sm text-muted-foreground">
              Некоторые ноты в табе содержат ошибки. Найдите их и исправьте.
            </p>
          </div>
          
          {/* Simplified tab display with intentional mistakes */}
          <div className="font-mono text-sm bg-background border rounded p-4">
            <div className="space-y-1">
              <div>e|--0--2--3--5--|</div>
              <div>B|--1--3--0--5--|</div>
              <div>G|--0--2--0--6--|</div> {/* mistake: should be 4 not 6 */}
              <div>D|--2--0--0--7--|</div> {/* mistake: should be 5 not 7 */}
              <div>A|--3--2--3--5--|</div>
              <div>E|--0--0--0--0--|</div>
            </div>
          </div>
          
          <Button>
            <CheckCircle className="h-4 w-4 mr-2" />
            Проверить исправления
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderModeContent = () => {
    switch (currentMode) {
      case 'practice':
        return renderPracticeMode();
      case 'ear-training':
        return renderEarTrainingMode();
      case 'tab-hero':
        return renderTabHeroMode();
      case 'mistake-check':
        return renderMistakeCheckMode();
      default:
        return renderPracticeMode();
    }
  };

  return (
    <div className="space-y-4">
      {/* Mode Selector */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Режимы обучения</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {modes.map((mode) => (
            <button
              key={mode.id}
              className={cn(
                "p-4 rounded-lg border text-left transition-colors hover:bg-accent",
                currentMode === mode.id ? "border-primary bg-primary/10" : "border-border"
              )}
              onClick={() => setCurrentMode(mode.id)}
            >
              <mode.icon className="h-6 w-6 mb-2 text-primary" />
              <div className="font-medium">{mode.label}</div>
              <div className="text-sm text-muted-foreground">{mode.description}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Mode Content */}
      {renderModeContent()}

      {/* Session Stats */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Статистика сессии</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{Math.floor(sessionTime / 60)}</div>
            <div className="text-sm text-muted-foreground">Минут практики</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{progress.learnedSections?.length || 0}</div>
            <div className="text-sm text-muted-foreground">Изучено секций</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{correctCount}</div>
            <div className="text-sm text-muted-foreground">Правильных ответов</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {mistakeCount + correctCount > 0 ? Math.round((correctCount / (mistakeCount + correctCount)) * 100) : 0}%
            </div>
            <div className="text-sm text-muted-foreground">Точность</div>
          </div>
        </div>
      </Card>
    </div>
  );
};