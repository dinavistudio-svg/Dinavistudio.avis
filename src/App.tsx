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
          {/* Section 1: Vos informations */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-[#90040f]/20"
          >
            <h2 className="text-3xl mb-6 text-[#90040f]" style={{ fontFamily: "'Eras Light ITC', 'Futura', sans-serif" }}>
              1. Vos informations <span className="text-lg text-[#210609]/50">(optionnel)</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="nom" className="text-[#210609]">Nom</Label>
                <Input
                  id="nom"
                  {...register('nom')}
                  className="mt-2 border-[#90040f]/30 focus:border-[#90040f]"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <Label htmlFor="emailTel" className="text-[#210609]">Email / Téléphone</Label>
                <Input
                  id="emailTel"
                  {...register('emailTel')}
                  className="mt-2 border-[#90040f]/30 focus:border-[#90040f]"
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <Label htmlFor="projet" className="text-[#210609]">Projet ou prestation réalisée</Label>
                <Input
                  id="projet"
                  {...register('projet')}
                  className="mt-2 border-[#90040f]/30 focus:border-[#90040f]"
                  placeholder="Ex: Identité visuelle"
                />
              </div>
              <div>
                <Label htmlFor="dateRealisation" className="text-[#210609]">Date de réalisation</Label>
                <Input
                  id="dateRealisation"
                  type="date"
                  {...register('dateRealisation')}
                  className="mt-2 border-[#90040f]/30 focus:border-[#90040f]"
                />
              </div>
            </div>
          </motion.div>

          {/* Section 2: Première impression */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-[#90040f]/20"
          >
            <h2 className="text-3xl mb-6 text-[#90040f]" style={{ fontFamily: "'Eras Light ITC', 'Futura', sans-serif" }}>
              2. Première impression et contact
            </h2>
            
            <div className="space-y-6">
              <div>
                <Label className="text-[#210609] text-lg mb-3 block">
                  Comment avez-vous découvert Dinavi Studio ?
                </Label>
                <Controller
                  name="decouverte"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                      {['Recommandation', 'Réseaux sociaux', 'Publicité', 'Autre'].map((option) => (
                        <div key={option} className="flex items-center space-x-3">
                          <RadioGroupItem value={option} id={`decouverte-${option}`} className="border-[#90040f]" />
                          <Label htmlFor={`decouverte-${option}`} className="cursor-pointer text-[#210609]">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
              </div>

              <div>
                <Label className="text-[#210609] text-lg mb-3 block">
                  Votre premier contact avec Sara Maugalem a été :
                </Label>
                <Controller
                  name="premierContact"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                      {['Très satisfaisant', 'Satisfaisant', 'Moyen', 'Insatisfaisant', 'Très insatisfaisant'].map((option) => (
                        <div key={option} className="flex items-center space-x-3">
                          <RadioGroupItem value={option} id={`contact-${option}`} className="border-[#90040f]" />
                          <Label htmlFor={`contact-${option}`} className="cursor-pointer text-[#210609]">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
              </div>

              <div>
                <Label className="text-[#210609] text-lg mb-3 block">
                  Clarté des informations fournies avant la prestation :
                </Label>
                <Controller
                  name="clarteInfo"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                      {['Très claire', 'Claire', 'Moyenne', 'Peu claire', 'Pas du tout claire'].map((option) => (
                        <div key={option} className="flex items-center space-x-3">
                          <RadioGroupItem value={option} id={`clarte-${option}`} className="border-[#90040f]" />
                          <Label htmlFor={`clarte-${option}`} className="cursor-pointer text-[#210609]">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
              </div>
            </div>
          </motion.div>

          {/* Section 3: Expérience pendant le projet */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-[#90040f]/20"
          >
            <h2 className="text-3xl mb-6 text-[#90040f]" style={{ fontFamily: "'Eras Light ITC', 'Futura', sans-serif" }}>
              3. Expérience pendant le projet
            </h2>
            
            <div className="space-y-8">
              <StarRating name="comprehension" label="Compréhension de vos besoins et attentes" />
              <StarRating name="accompagnement" label="Accompagnement et conseils proposés" />
              <StarRating name="delais" label="Respect des délais et engagements" />
            </div>
          </motion.div>

          {/* Section 4: Qualité de la prestation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-[#90040f]/20"
          >
            <h2 className="text-3xl mb-6 text-[#90040f]" style={{ fontFamily: "'Eras Light ITC', 'Futura', sans-serif" }}>
              4. Qualité de la prestation
            </h2>
            
            <div className="space-y-8">
              <StarRating name="creativite" label="Pertinence et originalité des propositions créatives" />
              <StarRating name="qualiteLivrable" label="Qualité finale du livrable (identité visuelle, supports graphiques…)" />

              <div>
                <Label className="text-[#210609] text-lg mb-3 block">
                  La prestation a-t-elle répondu à vos attentes ?
                </Label>
                <Controller
                  name="attentes"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                      {['Tout à fait', 'Partiellement', 'Pas du tout'].map((option) => (
                        <div key={option} className="flex items-center space-x-3">
                          <RadioGroupItem value={option} id={`attentes-${option}`} className="border-[#90040f]" />
                          <Label htmlFor={`attentes-${option}`} className="cursor-pointer text-[#210609]">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
              </div>
            </div>
          </motion.div>

          {/* Section 5: Communication */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-[#90040f]/20"
          >
            <h2 className="text-3xl mb-6 text-[#90040f]" style={{ fontFamily: "'Eras Light ITC', 'Futura', sans-serif" }}>
              5. Communication et relation client
            </h2>
            
            <div className="space-y-8">
              <StarRating name="disponibilite" label="Disponibilité et réactivité" />
              <StarRating name="courtoisie" label="Courtoisie et professionnalisme" />
              <StarRating name="ecoute" label="Qualité des échanges et écoute" />
            </div>
          </motion.div>

          {/* Section 6: Parcours global */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-[#90040f]/20"
          >
            <h2 className="text-3xl mb-6 text-[#90040f]" style={{ fontFamily: "'Eras Light ITC', 'Futura', sans-serif" }}>
              6. Parcours global et fidélité
            </h2>
            
            <div className="space-y-8">
              <div>
                <Label className="text-[#210609] text-lg mb-3 block">
                  Votre expérience globale avec Dinavi Studio :
                </Label>
                <Controller
                  name="experienceGlobale"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                      {['Très satisfaisante', 'Satisfaisante', 'Moyenne', 'Insatisfaisante', 'Très insatisfaisante'].map((option) => (
                        <div key={option} className="flex items-center space-x-3">
                          <RadioGroupItem value={option} id={`experience-${option}`} className="border-[#90040f]" />
                          <Label htmlFor={`experience-${option}`} className="cursor-pointer text-[#210609]">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
              </div>

              <StarRating name="probabiliteRefaire" label="Probabilité de refaire appel à Sara Maugalem" />
              <StarRating name="probabiliteRecommander" label="Probabilité de recommander Sara Maugalem à un ami ou partenaire" />
            </div>
          </motion.div>

          {/* Section 7: Commentaires libres */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-[#90040f]/20"
          >
            <h2 className="text-3xl mb-6 text-[#90040f]" style={{ fontFamily: "'Eras Light ITC', 'Futura', sans-serif" }}>
              7. Commentaires libres
            </h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="pointsForts" className="text-[#210609] text-lg mb-2 block">
                  Points forts de votre expérience
                </Label>
                <Textarea
                  id="pointsForts"
                  {...register('pointsForts')}
                  className="mt-2 border-[#90040f]/30 focus:border-[#90040f] min-h-[100px]"
                  placeholder="Partagez ce qui vous a particulièrement plu..."
                />
              </div>

              <div>
                <Label htmlFor="pointsAmeliorer" className="text-[#210609] text-lg mb-2 block">
                  Points à améliorer
                </Label>
                <Textarea
                  id="pointsAmeliorer"
                  {...register('pointsAmeliorer')}
                  className="mt-2 border-[#90040f]/30 focus:border-[#90040f] min-h-[100px]"
                  placeholder="Y a-t-il des aspects qui pourraient être améliorés ?"
                />
              </div>

              <div>
                <Label htmlFor="suggestions" className="text-[#210609] text-lg mb-2 block">
                  Suggestions pour améliorer l'accompagnement
                </Label>
                <Textarea
                  id="suggestions"
                  {...register('suggestions')}
                  className="mt-2 border-[#90040f]/30 focus:border-[#90040f] min-h-[100px]"
                  placeholder="Vos suggestions sont précieuses..."
                />
              </div>
            </div>
          </motion.div>

          {/* Section 8: Consentement */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-[#90040f]/20"
          >
            <h2 className="text-3xl mb-6 text-[#90040f]" style={{ fontFamily: "'Eras Light ITC', 'Futura', sans-serif" }}>
              8. Consentement
            </h2>
            
            <div>
              <Label className="text-[#210609] text-lg mb-3 block">
                Acceptez-vous que votre avis soit utilisé à des fins d'amélioration ou de communication ?
              </Label>
              <Controller
                name="consentement"
                control={control}
                render={({ field }) => (
                  <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                    {['Oui', 'Non'].map((option) => (
                      <div key={option} className="flex items-center space-x-3">
                        <RadioGroupItem value={option} id={`consentement-${option}`} className="border-[#90040f]" />
                        <Label htmlFor={`consentement-${option}`} className="cursor-pointer text-[#210609]">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>
          </motion.div>

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
