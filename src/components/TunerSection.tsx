import React from 'react';
import { useAudioAnalysis } from "@/hooks/useAudioAnalysis";
import { TunerDisplay } from "@/components/TunerDisplay";
import { TunerControls } from "@/components/TunerControls";

export const TunerSection = () => {
    const audioAnalysis = useAudioAnalysis();

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-5xl mx-auto">
                <TunerDisplay
                    frequency={audioAnalysis.frequency}
                    note={audioAnalysis.note}
                    octave={audioAnalysis.octave}
                    cents={audioAnalysis.cents}
                    isActive={audioAnalysis.isActive}
                    detectedStringIndex={audioAnalysis.detectedStringIndex}
                    onStringSelect={(stringIndex) => {
                        console.log('Selected string:', stringIndex);
                    }}
                />
            </div>

            <div className="max-w-2xl mx-auto text-center">
                <TunerControls
                    isActive={audioAnalysis.isActive}
                    onStart={audioAnalysis.start}
                    onStop={audioAnalysis.stop}
                />
            </div>
        </div>
    );
};
