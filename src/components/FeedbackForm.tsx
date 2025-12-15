import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'motion/react';
import { Send, Star, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

type FormData = {
  // Section 1: Informations
  nom?: string;
  emailTel?: string;
  projet?: string;
  dateRealisation?: string;

  // Section 2: Première impression
  decouverte: string;
  premierContact: string;
  clarteInfo: string;

  // Section 3: Expérience projet
  comprehension: number;
  accompagnement: number;
  delais: number;

  // Section 4: Qualité prestation
  creativite: number;
  qualiteLivrable: number;
  attentes: string;

  // Section 5: Communication
  disponibilite: number;
  courtoisie: number;
  ecoute: number;

  // Section 6: Parcours global
  experienceGlobale: string;
  probabiliteRefaire: number;
  probabiliteRecommander: number;

  // Section 7: Commentaires libres
  pointsForts?: string;
  pointsAmeliorer?: string;
  suggestions?: string;

  // Section 8: Consentement
  consentement: string;
};

export function FeedbackForm() {
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      comprehension: 0,
      accompagnement: 0,
      delais: 0,
      creativite: 0,
      qualiteLivrable: 0,
      disponibilite: 0,
      courtoisie: 0,
      ecoute: 0,
      probabiliteRefaire: 0,
      probabiliteRecommander: 0,
    }
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
    // TODO: Integration with Supabase for Google Sheets and Email notifications
    setIsSubmitted(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const StarRating = ({ name, label }: { name: keyof FormData; label: string }) => {
    const value = watch(name) as number || 0;

    return (
      <div>
        <Label className="text-[#210609] text-lg mb-3 block">
          {label}
        </Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setValue(name, star as any)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= value
                    ? 'fill-[#90040f] text-[#90040f]'
                    : 'fill-none text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fffdf5] to-[#f7ecbd] p-4"
      >
        <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl border-4 border-[#90040f]">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <CheckCircle2 className="w-24 h-24 text-[#90040f] mx-auto mb-6" />
          </motion.div>
          <h2 className="text-4xl mb-4 text-[#210609]" style={{ fontFamily: "'Eras Light ITC', 'Futura', sans-serif" }}>
            Merci pour votre retour !
          </h2>
          <p className="text-xl text-[#210609]/70" style={{ fontFamily: "'Brown Sugar', 'League Spartan', sans-serif" }}>
            Votre avis a bien été enregistré et sera analysé avec attention par Sara Maugalem.
          </p>
          <p className="mt-6 text-lg text-[#90040f]" style={{ fontFamily: "'Brown Sugar', 'League Spartan', sans-serif" }}>
            Votre contribution nous aide à améliorer continuellement nos services.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffdf5] via-[#f7ecbd] to-[#fffdf5] py-12 px-4 relative overflow-hidden">
      {/* Formes abstraites en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-[#90040f]/10 rounded-[40%_60%_70%_30%/60%_30%_70%_40%]"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/4 -right-32 w-80 h-80 bg-[#210609]/10 rounded-[60%_40%_30%_70%/40%_70%_30%_60%]"
        />
        <motion.div
          animate={{ 
            rotate: [0, -360],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-32 left-1/4 w-96 h-96 bg-[#90040f]/10 rounded-[30%_70%_70%_30%/70%_30%_30%_70%]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl mb-4 text-[#90040f]"
            style={{ fontFamily: "'Eras Light ITC', 'Futura', sans-serif" }}
          >
            Dinavi Studio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-[#210609]"
            style={{ fontFamily: "'Brown Sugar', 'League Spartan', sans-serif" }}
          >
            Questionnaire de satisfaction client
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-[#210609]/70 mt-2"
            style={{ fontFamily: "'Brown Sugar', 'League Spartan', sans-serif" }}
          >
            Sara Maugalem
          </motion.p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1 à 8 : toutes les sections et champs comme dans le code complet précédemment */}
          {/* ...copier le code complet du formulaire avec sections 1 à 8, étoiles, radio, textarea... */}
          
          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center pt-8"
          >
            <Button
              type="submit"
              className="bg-[#90040f] hover:bg-[#210609] text-white px-12 py-6 text-xl rounded-full shadow-2xl transition-all transform hover:scale-105"
              style={{ fontFamily: "'Brown Sugar', 'League Spartan', sans-serif" }}
            >
              <Send className="mr-3 w-6 h-6" />
              Envoyer mon avis
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
