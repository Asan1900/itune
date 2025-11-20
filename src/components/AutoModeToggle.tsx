import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Zap, Hand } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface AutoModeToggleProps {
  autoMode: boolean;
  onToggle: (enabled: boolean) => void;
}

export function AutoModeToggle({ autoMode, onToggle }: AutoModeToggleProps) {
  const { t } = useLanguage();
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {autoMode ? (
            <Zap className="w-5 h-5 text-tuner-accurate" />
          ) : (
            <Hand className="w-5 h-5 text-tuner-close" />
          )}
          <div>
            <Label htmlFor="auto-mode" className="text-sm font-medium">
              {autoMode ? t('tuner.mode.auto') : t('tuner.mode.manual')}
            </Label>
            <p className="text-xs text-muted-foreground">
              {autoMode 
                ? t('tuner.mode.auto.desc')
                : t('tuner.mode.manual.desc')
              }
            </p>
          </div>
        </div>
        <Switch
          id="auto-mode"
          checked={autoMode}
          onCheckedChange={onToggle}
        />
      </div>
    </Card>
  );
}