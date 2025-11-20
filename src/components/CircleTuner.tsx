import React, { useMemo } from 'react';
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";

interface CircleTunerProps {
    cents: number;
    note: string;
    octave: number;
    isActive: boolean;
    frequency: number;
}

export const CircleTuner = ({ cents, note, octave, isActive, frequency }: CircleTunerProps) => {
    const { t } = useLanguage();

    // Calculate ball position
    // Range: -50 to +50 cents mapped to -100% to +100% translation (roughly)
    // We want it to be inside the circle when close to 0

    const isAccurate = Math.abs(cents) <= 5;
    const isClose = Math.abs(cents) <= 15;

    // Visual position calculation
    // 0 cents = center
    // -50 cents = left edge
    // +50 cents = right edge
    const positionX = Math.max(-150, Math.min(150, cents * 3)); // Multiplier determines sensitivity

    const ballColor = useMemo(() => {
        if (!isActive) return "bg-muted";
        if (isAccurate) return "bg-tuner-accurate shadow-[0_0_30px_rgba(var(--tuner-accurate),0.6)]";
        if (isClose) return "bg-tuner-close shadow-[0_0_20px_rgba(var(--tuner-close),0.4)]";
        return "bg-tuner-off shadow-[0_0_20px_rgba(var(--tuner-off),0.4)]";
    }, [isActive, isAccurate, isClose]);

    const circleBorderColor = useMemo(() => {
        if (!isActive) return "border-muted/20";
        if (isAccurate) return "border-tuner-accurate/50 shadow-[0_0_50px_rgba(var(--tuner-accurate),0.2)]";
        return "border-white/10";
    }, [isActive, isAccurate]);

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-[400px]">

            {/* Main Target Circle */}
            <div className={cn(
                "relative w-64 h-64 rounded-full border-4 transition-all duration-500 flex items-center justify-center bg-card/30 backdrop-blur-sm",
                circleBorderColor
            )}>

                {/* Inner Target Zone */}
                <div className={cn(
                    "absolute w-16 h-16 rounded-full border-2 border-dashed transition-all duration-300",
                    isAccurate ? "border-tuner-accurate opacity-100" : "border-white/20 opacity-50"
                )} />

                {/* Note Display */}
                <div className="z-10 flex flex-col items-center">
                    <span className={cn(
                        "text-8xl font-bold tracking-tighter transition-all duration-200",
                        isActive ? "text-foreground" : "text-muted-foreground/20"
                    )}>
                        {isActive && note ? note : "-"}
                    </span>
                    <span className="text-2xl font-medium text-muted-foreground">
                        {isActive && note ? octave : ""}
                    </span>
                </div>

                {/* The Ball (Indicator) */}
                {isActive && (
                    <div
                        className={cn(
                            "absolute w-12 h-12 rounded-full transition-all duration-100 ease-out z-20 mix-blend-screen",
                            ballColor
                        )}
                        style={{
                            transform: `translate(${positionX}px, 0)`,
                        }}
                    >
                        {/* Inner dot for precision */}
                        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                    </div>
                )}
            </div>

            {/* Frequency Display */}
            <div className="mt-12 flex flex-col items-center gap-2">
                <div className="text-4xl font-mono font-light text-muted-foreground">
                    {isActive && frequency > 0 ? frequency.toFixed(1) : "---.-"} <span className="text-lg">Hz</span>
                </div>
                <div className={cn(
                    "text-lg font-medium transition-colors",
                    isAccurate ? "text-tuner-accurate" : isClose ? "text-tuner-close" : "text-tuner-off"
                )}>
                    {isActive && note ? (
                        isAccurate ? t('tuner.status.accurate') :
                            cents > 0 ? `+${Math.round(cents)} ${t('tuner.direction.sharp')}` :
                                `${Math.round(cents)} ${t('tuner.direction.flat')}`
                    ) : t('tuner.waiting')}
                </div>
            </div>

            {/* Guide Lines */}
            <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -z-10" />
            <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent -z-10" />

        </div>
    );
};
