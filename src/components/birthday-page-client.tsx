"use client";

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Mail, Smile, Play, Pause } from 'lucide-react';
import BackgroundParticles from '@/components/background-particles';
import Confetti from '@/components/confetti';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function BirthdayPageClient() {
  const [showConfetti, setShowConfetti] = useState(false);

  const messageRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const voiceRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const handleConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="relative bg-gradient-to-br from-background via-accent/50 to-background">
      <BackgroundParticles />
      {showConfetti && <Confetti />}
      
      {/* Hero Section */}
      <section id="home" className="h-screen min-h-screen">
        <div className="text-center flex flex-col items-center gap-8 animate-fade-in">
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-primary" style={{ textShadow: '0 0 15px hsl(var(--primary)), 0 0 25px hsl(var(--primary))' }}>
            आई, वाढदिवसाच्या हार्दिक शुभेच्छा 💖
          </h1>
          <p className="font-body text-lg md:text-xl text-foreground/80">
            A special day for my everything.
          </p>
          <Button size="lg" onClick={() => handleScrollTo(messageRef)} className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow duration-300">
            Click to open my heart <Mail className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Message Section */}
      <section ref={messageRef} id="message">
        <Card className="w-full max-w-4xl bg-white/20 dark:bg-black/20 backdrop-blur-lg border-primary/20 shadow-2xl shadow-primary/10 transition-all duration-500 hover:shadow-primary/20 hover:border-primary/40">
          <CardContent className="p-8 md:p-12">
            <p className="font-headline text-3xl md:text-4xl leading-relaxed text-center text-foreground">
              आई, तुझं प्रेम माझं जग आहे. मी कॉलेजमध्ये दूर आहे, पण प्रत्येक दिवस तुझी आठवण येते.
              <br/>
              <span className="font-body text-2xl md:text-3xl mt-4 block">
                Happy Birthday Aai — you are my superhero. ❤️
              </span>
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Gallery Section */}
      <section ref={galleryRef} id="gallery" className="py-20">
        <div className="w-full max-w-7xl text-center">
          <h2 className="font-headline text-4xl md:text-5xl text-primary mb-12">A Trip Down Memory Lane</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-fr gap-4 px-4">
            {PlaceHolderImages.map((img, index) => {
              const collageClasses = [
                'md:col-span-2 md:row-span-2 aspect-[4/3]', // childhood-1
                'md:col-span-1 aspect-[3/4]', // queen-1
                'md:col-span-1 aspect-[3/4]', // aai-and-me-1
                'md:col-span-2 aspect-[16/9]', // family-1
                'md:col-span-2 aspect-[16/9]', // smile-1
              ];
              return (
                <div key={img.id} className={`group ${collageClasses[index] || ''}`}>
                  <Card className="overflow-hidden bg-white/20 dark:bg-black/20 backdrop-blur-md border-primary/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20 h-full">
                    <CardContent className="p-0 relative h-full">
                      <Image
                        src={img.imageUrl}
                        alt={img.description}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={img.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <p className="absolute bottom-4 left-4 font-headline text-lg text-white">{img.description}</p>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Voice Wish Section */}
      <section ref={voiceRef} id="voice-wish">
        <VoiceWish />
      </section>

      {/* Final Section */}
      <section ref={finalRef} id="final">
        <div className="text-center flex flex-col items-center gap-8">
            <p className="font-headline text-4xl md:text-6xl text-primary" style={{ textShadow: '0 0 10px hsl(var(--primary))' }}>
              "तुझं प्रेम हे माझं प्रेरणास्थान आहे 💕"
            </p>
            <Button size="lg" onClick={handleConfetti} className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow duration-300">
                Send me your smile 😊 <Smile className="ml-2" />
            </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full text-center p-8 bg-background/50">
        <p className="font-body text-foreground/70">
          Coded with infinite love <Heart className="inline-block h-4 w-4 text-primary" fill="currentColor" /> — तुझा मुलगा, मिर्त्तुल.
        </p>
      </footer>
    </div>
  );
}


function VoiceWish() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // We only want to create the audio element on the client side
        if (typeof window !== 'undefined' && !audioRef.current) {
            // NOTE: Add a real audio file to public/audio/voice-wish.mp3 for this to work
            audioRef.current = new Audio('/audio/voice-wish.mp3');
            audioRef.current.onended = () => setIsPlaying(false);
        }
        
        // Cleanup
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
            }
            setIsPlaying(!isPlaying);
        } else {
            console.log("Audio not ready yet.");
        }
    };

    const bars = Array.from({ length: 30 });

    return (
        <div className="flex flex-col items-center justify-center gap-12">
            <h2 className="font-headline text-4xl md:text-5xl text-primary text-center">माझं मेसेज ऐक Aai 🎧</h2>
            <div className="flex items-center justify-center gap-8">
                <Button onClick={togglePlay} variant="outline" size="icon" className="w-24 h-24 rounded-full border-2 border-primary bg-transparent text-primary hover:bg-primary/10 hover:text-primary" style={{boxShadow: '0 0 20px hsl(var(--primary)), inset 0 0 20px hsl(var(--primary))'}}>
                    {isPlaying ? <Pause size={48} /> : <Play size={48} className="ml-2"/>}
                </Button>
            </div>
            <div className="flex items-center justify-center h-24 w-full max-w-md gap-1">
                {bars.map((_, i) => (
                    <div key={i} className="w-2 bg-primary/50 rounded-full"
                         style={{
                             height: isPlaying ? `${Math.random() * 80 + 20}%` : '10%',
                             transition: 'height 0.3s ease-in-out',
                             animation: isPlaying ? `wave 1s ease-in-out ${i * 0.05}s infinite alternate` : 'none'
                         }}
                    ></div>
                ))}
            </div>
            <style jsx>{`
                @keyframes wave {
                    from {
                        transform: scaleY(0.5);
                    }
                    to {
                        transform: scaleY(1);
                    }
                }
            `}</style>
        </div>
    );
}
