
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Play, Pause, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface CookingTimerProps {
  cookingTime: number; // in minutes
}

export function CookingTimer({ cookingTime }: CookingTimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(cookingTime * 60); // convert to seconds
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef<number | null>(null);
  const totalTime = cookingTime * 60; // total time in seconds

  useEffect(() => {
    // Reset timer when cookingTime prop changes
    setTimeRemaining(cookingTime * 60);
    setProgress(100);
    setIsRunning(false);
    
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [cookingTime]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Timer complete
            setIsRunning(false);
            window.clearInterval(intervalRef.current as number);
            intervalRef.current = null;
            toast.success("Cooking timer complete!", {
              description: "Your food should be ready now!"
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  // Update progress bar
  useEffect(() => {
    const progressValue = (timeRemaining / totalTime) * 100;
    setProgress(progressValue);
  }, [timeRemaining, totalTime]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(cookingTime * 60);
    setProgress(100);
  };

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="border rounded-lg p-4 bg-card shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="text-recipe-primary" />
        <h3 className="font-medium">Cooking Timer</h3>
      </div>
      
      <div className="text-center mb-2">
        <span className="text-3xl font-bold">{formatTime(timeRemaining)}</span>
      </div>
      
      <Progress 
        value={progress} 
        className={`h-2 mb-4 ${progress < 25 ? 'bg-red-200' : progress < 50 ? 'bg-yellow-200' : 'bg-green-200'}`}
      />
      
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className={isRunning ? "bg-red-400" : "bg-red-100"}
          onClick={toggleTimer}
        >
          {isRunning ? <Pause className="mr-1" /> : <Play className="mr-1" />}
          {isRunning ? "Pause" : "Start"}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={resetTimer}
          disabled={timeRemaining === totalTime && !isRunning}
        >
          <RotateCcw className="mr-1" />
          Reset
        </Button>
      </div>
    </div>
  );
}