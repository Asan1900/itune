import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TunerControlsProps {
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
}

export function TunerControls({ isActive, onStart, onStop }: TunerControlsProps) {
  return (
    <div className="flex justify-center">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          onClick={isActive ? onStop : onStart}
          size="xl"
          variant={isActive ? "destructive" : "glow"}
          className={cn(
            "w-24 h-24 rounded-full shadow-2xl border-2 relative group overflow-hidden",
            isActive
              ? "border-destructive/30 animate-pulse"
              : "border-primary/30"
          )}
        >
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

          {isActive ? (
            <MicOff className="h-10 w-10 relative z-10" />
          ) : (
            <Mic className="h-10 w-10 relative z-10" />
          )}

          {/* Pulse ring effect for active state */}
          {isActive && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-destructive/50 animate-ping" />
              <div className="absolute inset-2 rounded-full border border-destructive/30 animate-ping" style={{ animationDelay: '0.5s' }} />
            </>
          )}

          {/* Glow effect for inactive state */}
          {!isActive && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 animate-pulse opacity-50" />
          )}
        </Button>
      </motion.div>
    </div>
  );
}