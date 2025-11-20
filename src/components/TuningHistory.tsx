import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History } from 'lucide-react';
import { useTuningSettings } from '@/hooks/useTuningSettings';
import { useLanguage } from '@/hooks/useLanguage';

export function TuningHistory() {
  const { getStringAccuracies, getCurrentTuning } = useTuningSettings();
  const stringAccuracies = getStringAccuracies();
  const currentTuning = getCurrentTuning();
  const { t } = useLanguage();

  if (!currentTuning || stringAccuracies.every(acc => acc === null)) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <History className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">{t('history.title')}</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {currentTuning.notes.map((note, index) => {
          const accuracy = stringAccuracies[index];

          return (
            <div key={index} className="text-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-border bg-background mx-auto">
                <span className="font-mono text-sm">{note.note}</span>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">
                  {t('common.string')} {index + 1}
                </div>
                {accuracy !== null ? (
                  <Badge
                    variant="outline"
                    className={`text-xs ${accuracy <= 5
                      ? 'bg-tuner-accurate/20 border-tuner-accurate text-tuner-accurate'
                      : accuracy <= 15
                        ? 'bg-tuner-close/20 border-tuner-close text-tuner-close'
                        : 'bg-tuner-off/20 border-tuner-off text-tuner-off'
                      }`}
                  >
                    ±{accuracy.toFixed(0)}¢
                  </Badge>
                ) : (
                  <div className="text-xs text-muted-foreground">—</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>

  );
}