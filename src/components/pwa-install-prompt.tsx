"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Smartphone, Download } from "lucide-react";

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    // Show prompt for iOS devices
    if (isIOSDevice) {
      setShowPrompt(true);
    }
  }, []);

  if (!isIOS) return null;

  return (
    <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Install App
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Install this application on your device for a better experience.
          </p>
          <div className="space-y-2">
            <p className="text-sm font-medium">To install on iOS:</p>
            <ol className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>
                1. Tap the Share button <Download className="inline h-4 w-4" />
              </li>
              <li>2. Scroll down and tap "Add to Home Screen"</li>
              <li>3. Tap "Add" to confirm</li>
            </ol>
          </div>
          <Button onClick={() => setShowPrompt(false)} className="w-full">
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
