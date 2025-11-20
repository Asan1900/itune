import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useTuningSettings } from "@/hooks/useTuningSettings";
import { useLanguage } from "@/hooks/useLanguage";
import { InstrumentType } from "@/types/tuning";
import { Guitar, Music, Volume2 } from "lucide-react";

const INSTRUMENT_INFO: Record<InstrumentType, { nameKey: string; icon: React.ReactNode; stringsKey: string; descKey: string }> = {
  'guitar': {
    nameKey: 'instrument.guitar',
    icon: <Guitar className="w-4 h-4" />,
    stringsKey: 'instrument.strings.6',
    descKey: 'instrument.desc.guitar'
  },
  'guitar-12': {
    nameKey: 'instrument.guitar-12',
    icon: <Guitar className="w-4 h-4" />,
    stringsKey: 'instrument.strings.12',
    descKey: 'instrument.desc.guitar-12'
  },
  'ukulele': {
    nameKey: 'instrument.ukulele',
    icon: <Music className="w-4 h-4" />,
    stringsKey: 'instrument.strings.4',
    descKey: 'instrument.desc.ukulele'
  },
  'mandolin': {
    nameKey: 'instrument.mandolin',
    icon: <Music className="w-4 h-4" />,
    stringsKey: 'instrument.strings.8',
    descKey: 'instrument.desc.mandolin'
  },
  'banjo': {
    nameKey: 'instrument.banjo',
    icon: <Volume2 className="w-4 h-4" />,
    stringsKey: 'instrument.strings.5',
    descKey: 'instrument.desc.banjo'
  }
};

export function InstrumentSelector() {
  const { settings, setInstrument, getTuningsForInstrument } = useTuningSettings();
  const { t } = useLanguage();
  const currentInstrument = settings.selectedInstrument;
  const availableTunings = getTuningsForInstrument(currentInstrument);

  const handleInstrumentChange = (instrument: InstrumentType) => {
    setInstrument(instrument);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {INSTRUMENT_INFO[currentInstrument].icon}
        <h3 className="text-lg font-semibold">{t('instrument.title')}</h3>
      </div>
      <div className="space-y-4">
        <Select value={currentInstrument} onValueChange={handleInstrumentChange}>
          <SelectTrigger className="w-full h-auto p-4 flex flex-col items-start gap-2 text-left">
            <div className="flex items-center gap-2 w-full">
              {INSTRUMENT_INFO[currentInstrument].icon}
              <span className="font-medium text-base">{t(INSTRUMENT_INFO[currentInstrument].nameKey)}</span>
            </div>
            <div className="text-sm text-muted-foreground w-full">
              {t(INSTRUMENT_INFO[currentInstrument].descKey)}
            </div>
            <div className="mt-1">
              <Badge variant="secondary" className="pointer-events-none">
                {availableTunings.length} {t('tuning.available')}
              </Badge>
            </div>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(INSTRUMENT_INFO).map(([key, info]) => (
              <SelectItem
                key={key}
                value={key}
                className="cursor-pointer focus:bg-primary/10 focus:text-primary data-[state=checked]:bg-primary/20 data-[state=checked]:text-primary"
              >
                <div className="flex items-center gap-2">
                  {info.icon}
                  <span className="font-medium">{t(info.nameKey)}</span>
                  <Badge variant="outline" className="text-xs border-primary/20">
                    {t(info.stringsKey)}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>


      </div>
    </div>
  );
}