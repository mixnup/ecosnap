import { useState, useEffect } from 'react';
import { useUserPreferences } from '../../context/UserPreferencesContext';
import { toast } from 'sonner';
import { Loader2, ChefHat, Flame, Users, Clock, MapPin, ShieldCheck } from 'lucide-react';

const CUISINE_OPTIONS = [
  'Filipino', 'Italian', 'Asian', 'Mexican', 'Mediterranean',
  'Indian', 'Japanese', 'Korean', 'Thai', 'American',
  'French', 'Middle Eastern', 'Chinese', 'Vietnamese',
];

const DIETARY_OPTIONS = [
  'Halal', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free',
  'Nut-Free', 'Keto', 'Paleo', 'Pescatarian', 'Low-Sodium',
];

const LOCATION_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'philippines', label: 'Philippines' },
  { value: 'usa', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'japan', label: 'Japan' },
  { value: 'korea', label: 'South Korea' },
  { value: 'australia', label: 'Australia' },
];

export default function SettingsPage() {
  const { preferences, loading, updatePreferences } = useUserPreferences();
  const [localPrefs, setLocalPrefs] = useState(preferences);

  // Sync local state with context when prefs load (initial load)
  useEffect(() => {
    setLocalPrefs(preferences);
  }, [preferences]);

  const toggleArrayItem = (field: 'cuisineTypes' | 'dietaryRestrictions', value: string) => {
    const lower = value.toLowerCase();
    const current = localPrefs[field];
    const updated = current.includes(lower)
      ? current.filter(v => v !== lower)
      : [...current, lower];
    setLocalPrefs({ ...localPrefs, [field]: updated });
  };

  // Auto-save with debounce
  useEffect(() => {
    // Prevent saving if localPrefs matches context (e.g., initial load)
    if (JSON.stringify(localPrefs) === JSON.stringify(preferences)) return;

    const timer = setTimeout(() => {
      toast.promise(updatePreferences(localPrefs), {
        loading: 'Auto-saving preferences...',
        success: 'Preferences saved',
        error: 'Failed to save preferences',
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [localPrefs, preferences, updatePreferences]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-[900px] mx-auto space-y-10">
      {/* Header */}
      <header>
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-emerald-600 mb-3">
            Configure
          </p>
        </div>
        <h1 className="text-4xl md:text-[56px] font-extrabold tracking-tight text-text-heading leading-[1.1]">
          Settings.
        </h1>
        <p className="text-text-body mt-5 text-xl max-w-2xl leading-relaxed">
          Personalize your cooking preferences. These settings help the AI generate better recipes for you.
        </p>
      </header>

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Cuisine Preferences */}
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <ChefHat size={18} className="text-emerald-600" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-text-heading">Cuisine Preferences</h3>
              <p className="text-xs text-text-muted">Select your favorite cuisines</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {CUISINE_OPTIONS.map(cuisine => (
              <button
                key={cuisine}
                onClick={() => toggleArrayItem('cuisineTypes', cuisine)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 border ${
                  localPrefs.cuisineTypes.includes(cuisine.toLowerCase())
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                    : 'bg-white text-text-muted border-gray-200 hover:border-emerald-200 hover:text-emerald-600'
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        {/* Spice Level */}
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
              <Flame size={18} className="text-red-500" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-text-heading">Spice Level</h3>
              <p className="text-xs text-text-muted">How spicy do you like it?</p>
            </div>
          </div>
          <div className="flex gap-3">
            {(['mild', 'medium', 'spicy'] as const).map(level => (
              <button
                key={level}
                onClick={() => setLocalPrefs({ ...localPrefs, spiceLevel: level })}
                className={`flex-1 py-3 rounded-xl text-sm font-bold capitalize transition-all duration-300 border ${
                  localPrefs.spiceLevel === level
                    ? 'bg-red-500 text-white border-red-500 shadow-md shadow-red-500/20'
                    : 'bg-white text-text-muted border-gray-200 hover:border-red-200'
                }`}
              >
                {level === 'mild' ? '🌶️ Mild' : level === 'medium' ? '🌶️🌶️ Medium' : '🌶️🌶️🌶️ Spicy'}
              </button>
            ))}
          </div>
        </div>

        {/* Cooking Skill */}
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center">
              <ChefHat size={18} className="text-violet-600" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-text-heading">Cooking Skill</h3>
              <p className="text-xs text-text-muted">We'll adjust recipe complexity accordingly</p>
            </div>
          </div>
          <div className="flex gap-3">
            {(['beginner', 'intermediate', 'advanced'] as const).map(skill => (
              <button
                key={skill}
                onClick={() => setLocalPrefs({ ...localPrefs, cookingSkill: skill })}
                className={`flex-1 py-3 rounded-xl text-sm font-bold capitalize transition-all duration-300 border ${
                  localPrefs.cookingSkill === skill
                    ? 'bg-violet-500 text-white border-violet-500 shadow-md shadow-violet-500/20'
                    : 'bg-white text-text-muted border-gray-200 hover:border-violet-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Restrictions */}
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
              <ShieldCheck size={18} className="text-teal-600" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-text-heading">Dietary Restrictions</h3>
              <p className="text-xs text-text-muted">Auto-applied to all recipe generations</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {DIETARY_OPTIONS.map(restriction => (
              <button
                key={restriction}
                onClick={() => toggleArrayItem('dietaryRestrictions', restriction)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 border ${
                  localPrefs.dietaryRestrictions.includes(restriction.toLowerCase())
                    ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/20'
                    : 'bg-white text-text-muted border-gray-200 hover:border-teal-200 hover:text-teal-600'
                }`}
              >
                {restriction}
              </button>
            ))}
          </div>
        </div>

        {/* Serving Size & Cook Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Users size={18} className="text-blue-600" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-bold text-text-heading">Serving Size</h3>
                <p className="text-xs text-text-muted">Number of people</p>
              </div>
            </div>
            <input
              type="number"
              min={1}
              max={20}
              value={localPrefs.servingSize}
              onChange={e => setLocalPrefs({ ...localPrefs, servingSize: Number(e.target.value) || 1 })}
              className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-200 transition-all outline-none text-text-heading font-bold text-center text-2xl"
            />
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                <Clock size={18} className="text-amber-600" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-bold text-text-heading">Max Cook Time</h3>
                <p className="text-xs text-text-muted">Minutes</p>
              </div>
            </div>
            <input
              type="number"
              min={10}
              max={240}
              step={5}
              value={localPrefs.maxCookTime}
              onChange={e => setLocalPrefs({ ...localPrefs, maxCookTime: Number(e.target.value) || 30 })}
              className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-amber-200 transition-all outline-none text-text-heading font-bold text-center text-2xl"
            />
          </div>
        </div>

        {/* Location */}
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center">
              <MapPin size={18} className="text-pink-600" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-text-heading">Location</h3>
              <p className="text-xs text-text-muted">Helps localize ingredient availability</p>
            </div>
          </div>
          <select
            value={localPrefs.location}
            onChange={e => setLocalPrefs({ ...localPrefs, location: e.target.value })}
            className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-pink-200 transition-all outline-none text-text-heading font-medium appearance-none cursor-pointer"
          >
            {LOCATION_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}
