'use client'

import { useState, useEffect } from 'react'
import { Play, Target, Calendar, TrendingUp, Book, Settings, User, Home, Activity, Apple, BarChart3, ChevronRight, Plus, Timer, Droplets, Flame, Award, Clock, CheckCircle2, MapPin, Wind, Zap, Trophy, Route, Heart, ChefHat, Utensils, X, Edit2, Trash2, Pause, Mountain, Share2, Download, Copy, Facebook, Twitter, Instagram } from 'lucide-react'

// Mock Data
const mockUser = {
  name: 'Alex Silva',
  goal: 'Meia Maratona',
  level: 'Intermediário',
  streak: 12,
  weeklyDistance: 32.5,
  targetDistance: 40,
  calories: { consumed: 1850, target: 2200 },
  macros: { protein: { consumed: 120, target: 165 }, carbs: { consumed: 180, target: 275 }, fat: { consumed: 65, target: 85 } },
  water: { consumed: 6, target: 8 },
  todayRun: {
    name: 'Treino Intervalado',
    distance: 8,
    duration: 45,
    completed: false
  }
}

const mockRun = {
  name: 'Treino Intervalado',
  intervals: [
    { name: 'Aquecimento', distance: 1.5, pace: '6:00', type: 'easy', completed: false },
    { name: 'Intervalo 1', distance: 1, pace: '4:30', type: 'hard', completed: false },
    { name: 'Recuperação 1', distance: 0.5, pace: '6:30', type: 'recovery', completed: false },
    { name: 'Intervalo 2', distance: 1, pace: '4:30', type: 'hard', completed: false },
    { name: 'Recuperação 2', distance: 0.5, pace: '6:30', type: 'recovery', completed: false },
    { name: 'Intervalo 3', distance: 1, pace: '4:30', type: 'hard', completed: false },
    { name: 'Desaquecimento', distance: 2.5, pace: '6:00', type: 'easy', completed: false }
  ]
}

const mockMeals = [
  { name: 'Café da Manhã', calories: 450, protein: 25, carbs: 65, fat: 12, completed: true },
  { name: 'Lanche Pré-Treino', calories: 200, protein: 15, carbs: 35, fat: 5, completed: true },
  { name: 'Almoço', calories: 650, protein: 45, carbs: 80, fat: 18, completed: true },
  { name: 'Lanche da Tarde', calories: 300, protein: 20, carbs: 40, fat: 10, completed: false },
  { name: 'Jantar', calories: 550, protein: 40, carbs: 50, fat: 20, completed: false },
  { name: 'Ceia', calories: 250, protein: 20, carbs: 25, fat: 10, completed: false }
]

const preworkoutRecipes = [
  {
    name: 'Banana com Pasta de Amendoim',
    time: '5 min',
    timing: '30-60 min antes',
    calories: 280,
    protein: 8,
    carbs: 42,
    fat: 10,
    ingredients: ['1 banana média', '2 colheres de pasta de amendoim', '1 pitada de canela'],
    benefits: 'Energia rápida e sustentada',
    icon: '🍌'
  },
  {
    name: 'Aveia com Frutas Vermelhas',
    time: '10 min',
    timing: '60-90 min antes',
    calories: 320,
    protein: 12,
    carbs: 58,
    fat: 6,
    ingredients: ['50g aveia', '150ml leite', '1 xícara frutas vermelhas', '1 colher mel'],
    benefits: 'Carboidratos de liberação gradual',
    icon: '🥣'
  },
  {
    name: 'Smoothie Energético',
    time: '5 min',
    timing: '30-45 min antes',
    calories: 250,
    protein: 15,
    carbs: 45,
    fat: 3,
    ingredients: ['1 banana', '200ml leite', '1 scoop whey', '1 colher mel', 'Gelo'],
    benefits: 'Hidratação + energia instantânea',
    icon: '🥤'
  },
  {
    name: 'Torrada com Geleia e Queijo',
    time: '5 min',
    timing: '45-60 min antes',
    calories: 290,
    protein: 14,
    carbs: 48,
    fat: 5,
    ingredients: ['2 fatias pão integral', '2 colheres geleia', '2 fatias queijo branco'],
    benefits: 'Carboidratos + proteína leve',
    icon: '🍞'
  },
  {
    name: 'Batata Doce com Ovo',
    time: '15 min',
    timing: '90-120 min antes',
    calories: 380,
    protein: 18,
    carbs: 62,
    fat: 8,
    ingredients: ['1 batata doce média', '2 ovos cozidos', 'Sal e pimenta'],
    benefits: 'Energia duradoura para treinos longos',
    icon: '🍠'
  },
  {
    name: 'Iogurte com Granola',
    time: '3 min',
    timing: '30-45 min antes',
    calories: 260,
    protein: 16,
    carbs: 40,
    fat: 6,
    ingredients: ['200g iogurte grego', '3 colheres granola', '1 colher mel'],
    benefits: 'Digestão fácil + energia rápida',
    icon: '🥛'
  }
]

const postworkoutRecipes = [
  {
    name: 'Shake de Recuperação',
    time: '5 min',
    timing: 'Até 30 min após',
    calories: 350,
    protein: 35,
    carbs: 48,
    fat: 5,
    ingredients: ['1 scoop whey', '1 banana', '200ml leite', '1 colher aveia', 'Gelo'],
    benefits: 'Recuperação muscular rápida',
    icon: '🥤'
  },
  {
    name: 'Frango com Batata Doce',
    time: '25 min',
    timing: '60-90 min após',
    calories: 480,
    protein: 45,
    carbs: 58,
    fat: 8,
    ingredients: ['150g peito de frango', '200g batata doce', 'Temperos naturais', 'Azeite'],
    benefits: 'Reposição completa de nutrientes',
    icon: '🍗'
  },
  {
    name: 'Omelete de Claras com Aveia',
    time: '10 min',
    timing: '30-60 min após',
    calories: 320,
    protein: 32,
    carbs: 38,
    fat: 6,
    ingredients: ['4 claras', '2 ovos inteiros', '3 colheres aveia', 'Vegetais'],
    benefits: 'Alta proteína + carboidratos',
    icon: '🍳'
  },
  {
    name: 'Salmão com Quinoa',
    time: '20 min',
    timing: '60-90 min após',
    calories: 520,
    protein: 42,
    carbs: 52,
    fat: 16,
    ingredients: ['150g salmão', '100g quinoa', 'Brócolis', 'Limão'],
    benefits: 'Ômega-3 + recuperação muscular',
    icon: '🐟'
  },
  {
    name: 'Wrap de Atum',
    time: '10 min',
    timing: '45-60 min após',
    calories: 380,
    protein: 38,
    carbs: 45,
    fat: 8,
    ingredients: ['1 lata atum', '1 tortilha integral', 'Alface', 'Tomate', 'Iogurte'],
    benefits: 'Proteína magra + praticidade',
    icon: '🌯'
  },
  {
    name: 'Panqueca de Banana Proteica',
    time: '15 min',
    timing: '30-60 min após',
    calories: 340,
    protein: 28,
    carbs: 48,
    fat: 6,
    ingredients: ['2 bananas', '3 ovos', '3 colheres aveia', '1 scoop whey'],
    benefits: 'Doce saudável + recuperação',
    icon: '🥞'
  }
]

interface Goal {
  id: string
  type: 'distance' | 'pace' | 'weight' | 'frequency' | 'race'
  title: string
  target: number | string
  current: number | string
  unit: string
  deadline: string
  progress: number
  icon: string
  color: string
}

interface LiveRunData {
  isRunning: boolean
  isPaused: boolean
  distance: number
  duration: number
  elevation: number
  currentPace: string
  avgPace: string
  calories: number
  startTime: number | null
}

interface CompletedRun {
  id: string
  date: string
  distance: number
  duration: number
  elevation: number
  avgPace: string
  calories: number
  route?: { lat: number; lng: number }[]
}

export default function RunApp() {
  const [currentScreen, setCurrentScreen] = useState('onboarding')
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [restTimer, setRestTimer] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [runData, setRunData] = useState(mockRun)
  const [recipeTab, setRecipeTab] = useState<'pre' | 'post'>('pre')
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null)
  const [goals, setGoals] = useState<Goal[]>([])
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [completedRuns, setCompletedRuns] = useState<CompletedRun[]>([])
  const [showShareModal, setShowShareModal] = useState(false)
  const [selectedRunToShare, setSelectedRunToShare] = useState<CompletedRun | null>(null)

  // Live Run Tracker State
  const [liveRun, setLiveRun] = useState<LiveRunData>({
    isRunning: false,
    isPaused: false,
    distance: 0,
    duration: 0,
    elevation: 0,
    currentPace: '0:00',
    avgPace: '0:00',
    calories: 0,
    startTime: null
  })

  // Onboarding state - Expandido e mais específico
  const [onboardingData, setOnboardingData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    goal: '',
    targetRace: '',
    raceDate: '',
    level: '',
    currentPace: '',
    weeklyDistance: '',
    daysPerWeek: 0,
    sessionTime: 0,
    preferredTime: '',
    terrain: [] as string[],
    runningExperience: '',
    injuries: [] as string[],
    dietaryRestrictions: [] as string[],
    motivation: ''
  })

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('runapp-onboarding')
    if (hasCompletedOnboarding) {
      setIsFirstTime(false)
      setCurrentScreen('dashboard')
    }

    // Load goals from localStorage
    const savedGoals = localStorage.getItem('runapp-goals')
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    }

    // Load completed runs from localStorage
    const savedRuns = localStorage.getItem('runapp-completed-runs')
    if (savedRuns) {
      setCompletedRuns(JSON.parse(savedRuns))
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => prev - 1)
      }, 1000)
    } else if (restTimer === 0) {
      setIsResting(false)
    }
    return () => clearInterval(interval)
  }, [isResting, restTimer])

  // Live Run Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (liveRun.isRunning && !liveRun.isPaused) {
      interval = setInterval(() => {
        setLiveRun(prev => {
          const newDuration = prev.duration + 1
          
          // Simulate distance increase (adjust based on pace)
          const distanceIncrement = 0.002 // ~0.12 km per minute at 5:00/km pace
          const newDistance = prev.distance + distanceIncrement
          
          // Simulate elevation gain (random small increases)
          const elevationIncrement = Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0
          const newElevation = prev.elevation + elevationIncrement
          
          // Calculate current pace (last minute)
          const currentPaceValue = newDuration > 0 ? (newDuration / 60) / newDistance : 0
          const currentPaceMin = Math.floor(currentPaceValue)
          const currentPaceSec = Math.floor((currentPaceValue - currentPaceMin) * 60)
          
          // Calculate average pace
          const avgPaceValue = newDuration > 0 ? (newDuration / 60) / newDistance : 0
          const avgPaceMin = Math.floor(avgPaceValue)
          const avgPaceSec = Math.floor((avgPaceValue - avgPaceMin) * 60)
          
          // Calculate calories (rough estimate: 60 cal per km for average runner)
          const newCalories = Math.floor(newDistance * 60)
          
          return {
            ...prev,
            duration: newDuration,
            distance: newDistance,
            elevation: newElevation,
            currentPace: `${currentPaceMin}:${currentPaceSec.toString().padStart(2, '0')}`,
            avgPace: `${avgPaceMin}:${avgPaceSec.toString().padStart(2, '0')}`,
            calories: newCalories
          }
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [liveRun.isRunning, liveRun.isPaused])

  const completeOnboarding = () => {
    localStorage.setItem('runapp-onboarding', 'true')
    localStorage.setItem('runapp-user-data', JSON.stringify(onboardingData))
    setIsFirstTime(false)
    setCurrentScreen('dashboard')
  }

  const startRestTimer = (seconds: number) => {
    setRestTimer(seconds)
    setIsResting(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const startLiveRun = () => {
    setLiveRun({
      isRunning: true,
      isPaused: false,
      distance: 0,
      duration: 0,
      elevation: 0,
      currentPace: '0:00',
      avgPace: '0:00',
      calories: 0,
      startTime: Date.now()
    })
    setCurrentScreen('liverun')
  }

  const pauseLiveRun = () => {
    setLiveRun(prev => ({ ...prev, isPaused: true }))
  }

  const resumeLiveRun = () => {
    setLiveRun(prev => ({ ...prev, isPaused: false }))
  }

  const finishLiveRun = () => {
    // Save completed run
    const completedRun: CompletedRun = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      distance: liveRun.distance,
      duration: liveRun.duration,
      elevation: liveRun.elevation,
      avgPace: liveRun.avgPace,
      calories: liveRun.calories
    }

    const updatedRuns = [completedRun, ...completedRuns]
    setCompletedRuns(updatedRuns)
    localStorage.setItem('runapp-completed-runs', JSON.stringify(updatedRuns))

    // Show share modal
    setSelectedRunToShare(completedRun)
    setShowShareModal(true)

    // Reset live run
    setLiveRun({
      isRunning: false,
      isPaused: false,
      distance: 0,
      duration: 0,
      elevation: 0,
      currentPace: '0:00',
      avgPace: '0:00',
      calories: 0,
      startTime: null
    })
  }

  const updateInterval = (index: number, field: string, value: any) => {
    const updated = { ...runData }
    updated.intervals[index] = { ...updated.intervals[index], [field]: value }
    setRunData(updated)
  }

  const saveGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString()
    }
    
    const updatedGoals = editingGoal 
      ? goals.map(g => g.id === editingGoal.id ? { ...newGoal, id: editingGoal.id } : g)
      : [...goals, newGoal]
    
    setGoals(updatedGoals)
    localStorage.setItem('runapp-goals', JSON.stringify(updatedGoals))
    setShowGoalModal(false)
    setEditingGoal(null)
  }

  const deleteGoal = (id: string) => {
    const updatedGoals = goals.filter(g => g.id !== id)
    setGoals(updatedGoals)
    localStorage.setItem('runapp-goals', JSON.stringify(updatedGoals))
  }

  const updateGoalProgress = (id: string, current: number | string) => {
    const updatedGoals = goals.map(g => {
      if (g.id === id) {
        const progress = typeof g.target === 'number' && typeof current === 'number'
          ? Math.min((current / g.target) * 100, 100)
          : 0
        return { ...g, current, progress }
      }
      return g
    })
    setGoals(updatedGoals)
    localStorage.setItem('runapp-goals', JSON.stringify(updatedGoals))
  }

  const shareRun = (platform: string, run: CompletedRun) => {
    const shareText = `🏃‍♂️ Acabei de completar uma corrida no RunPro!\n\n📊 Estatísticas:\n🏁 Distância: ${run.distance.toFixed(2)} km\n⏱️ Tempo: ${formatDuration(run.duration)}\n⚡ Pace Médio: ${run.avgPace}/km\n⛰️ Elevação: ${run.elevation}m\n🔥 Calorias: ${run.calories} kcal\n\n#RunPro #Corrida #Running`

    const shareUrl = typeof window !== 'undefined' ? window.location.origin : ''

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
        break
      case 'instagram':
        // Instagram doesn't support direct web sharing, copy to clipboard instead
        navigator.clipboard.writeText(shareText)
        alert('📋 Texto copiado! Cole no Instagram Stories ou Feed.')
        break
      case 'copy':
        navigator.clipboard.writeText(shareText)
        alert('📋 Estatísticas copiadas para a área de transferência!')
        break
      case 'download':
        // Generate a simple text file with run data
        const runData = `CORRIDA - ${new Date(run.date).toLocaleDateString('pt-BR')}\n\n` +
                       `Distância: ${run.distance.toFixed(2)} km\n` +
                       `Tempo: ${formatDuration(run.duration)}\n` +
                       `Pace Médio: ${run.avgPace}/km\n` +
                       `Elevação: ${run.elevation}m\n` +
                       `Calorias: ${run.calories} kcal\n\n` +
                       `Gerado por RunPro`
        
        const blob = new Blob([runData], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `corrida-${new Date(run.date).toISOString().split('T')[0]}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        break
    }
  }

  // Share Modal Component
  const ShareModal = () => {
    if (!selectedRunToShare) return null

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-6">
        <div className="bg-[#11161E] rounded-3xl max-w-lg w-full border border-[#1A1F2E]">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">🎉 Corrida Finalizada!</h2>
              <button
                onClick={() => {
                  setShowShareModal(false)
                  setSelectedRunToShare(null)
                  setCurrentScreen('dashboard')
                }}
                className="w-10 h-10 bg-[#0B0F14] rounded-xl flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Run Summary Card */}
            <div className="bg-gradient-to-br from-[#10B981]/10 to-[#059669]/5 p-6 rounded-2xl border border-[#10B981]/20 mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#10B981]">{selectedRunToShare.distance.toFixed(2)}</p>
                  <p className="text-sm text-[#9AA8B2]">km</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{formatDuration(selectedRunToShare.duration)}</p>
                  <p className="text-sm text-[#9AA8B2]">tempo</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#0B0F14] p-3 rounded-xl text-center">
                  <p className="text-lg font-bold">{selectedRunToShare.avgPace}</p>
                  <p className="text-xs text-[#9AA8B2]">pace/km</p>
                </div>
                <div className="bg-[#0B0F14] p-3 rounded-xl text-center">
                  <p className="text-lg font-bold">{selectedRunToShare.elevation}m</p>
                  <p className="text-xs text-[#9AA8B2]">elevação</p>
                </div>
                <div className="bg-[#0B0F14] p-3 rounded-xl text-center">
                  <p className="text-lg font-bold">{selectedRunToShare.calories}</p>
                  <p className="text-xs text-[#9AA8B2]">kcal</p>
                </div>
              </div>
            </div>

            {/* Share Options */}
            <div className="mb-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#10B981]" />
                Compartilhar Resultado
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => shareRun('facebook', selectedRunToShare)}
                  className="bg-[#1877F2]/20 border-2 border-[#1877F2]/50 text-[#1877F2] py-3 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#1877F2]/30"
                >
                  <Facebook className="w-5 h-5" />
                  Facebook
                </button>
                <button
                  onClick={() => shareRun('twitter', selectedRunToShare)}
                  className="bg-[#1DA1F2]/20 border-2 border-[#1DA1F2]/50 text-[#1DA1F2] py-3 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#1DA1F2]/30"
                >
                  <Twitter className="w-5 h-5" />
                  Twitter
                </button>
                <button
                  onClick={() => shareRun('instagram', selectedRunToShare)}
                  className="bg-gradient-to-br from-[#833AB4]/20 via-[#FD1D1D]/20 to-[#F77737]/20 border-2 border-[#E1306C]/50 text-[#E1306C] py-3 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:from-[#833AB4]/30 hover:via-[#FD1D1D]/30 hover:to-[#F77737]/30"
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </button>
                <button
                  onClick={() => shareRun('copy', selectedRunToShare)}
                  className="bg-[#10B981]/20 border-2 border-[#10B981]/50 text-[#10B981] py-3 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#10B981]/30"
                >
                  <Copy className="w-5 h-5" />
                  Copiar
                </button>
              </div>
            </div>

            {/* Download Option */}
            <button
              onClick={() => shareRun('download', selectedRunToShare)}
              className="w-full bg-[#11161E] border-2 border-[#1A1F2E] text-[#E6EBF2] py-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:border-[#10B981]/50 mb-4"
            >
              <Download className="w-5 h-5" />
              Baixar Estatísticas
            </button>

            <button
              onClick={() => {
                setShowShareModal(false)
                setSelectedRunToShare(null)
                setCurrentScreen('dashboard')
              }}
              className="w-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white py-4 rounded-2xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#10B981]/25"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Onboarding Component - Expandido com mais perguntas
  const OnboardingScreen = () => {
    const steps = [
      {
        title: 'Bem-vindo ao RunPro! 🏃‍♂️',
        subtitle: 'Vamos personalizar sua experiência',
        type: 'welcome'
      },
      {
        title: 'Como você se chama?',
        subtitle: 'Queremos conhecer você melhor',
        type: 'text',
        field: 'name',
        placeholder: 'Seu nome'
      },
      {
        title: 'Informações básicas',
        subtitle: 'Isso nos ajuda a personalizar seus treinos',
        type: 'personal',
        fields: [
          { field: 'age', placeholder: 'Idade', type: 'number' },
          { field: 'weight', placeholder: 'Peso (kg)', type: 'number' },
          { field: 'height', placeholder: 'Altura (cm)', type: 'number' }
        ]
      },
      {
        title: 'Qual seu objetivo principal?',
        subtitle: 'Escolha o que mais te motiva',
        type: 'options',
        options: [
          { value: '5K', label: '5K - Primeira corrida', icon: '🎯' },
          { value: '10K', label: '10K - Desafio intermediário', icon: '🏃' },
          { value: 'Meia Maratona', label: 'Meia Maratona (21K)', icon: '🏅' },
          { value: 'Maratona', label: 'Maratona Completa (42K)', icon: '🏆' },
          { value: 'Melhorar Pace', label: 'Melhorar velocidade', icon: '⚡' },
          { value: 'Perder Peso', label: 'Perder peso e saúde', icon: '💪' }
        ],
        field: 'goal'
      },
      {
        title: 'Tem alguma prova em mente?',
        subtitle: 'Podemos criar um plano específico',
        type: 'race',
        fields: [
          { field: 'targetRace', placeholder: 'Nome da prova (opcional)', type: 'text' },
          { field: 'raceDate', placeholder: 'Data da prova (opcional)', type: 'date' }
        ]
      },
      {
        title: 'Qual seu nível atual?',
        subtitle: 'Seja honesto para treinos adequados',
        type: 'options',
        options: [
          { value: 'Iniciante', label: 'Iniciante', desc: 'Começando agora ou voltando', icon: '🌱' },
          { value: 'Intermediário', label: 'Intermediário', desc: 'Corro regularmente há meses', icon: '🏃' },
          { value: 'Avançado', label: 'Avançado', desc: 'Treino estruturado há anos', icon: '💪' },
          { value: 'Elite', label: 'Elite', desc: 'Competidor experiente', icon: '🏆' }
        ],
        field: 'level'
      },
      {
        title: 'Qual seu pace atual?',
        subtitle: 'Aproximadamente, em corridas confortáveis',
        type: 'options',
        options: [
          { value: '7:00+', label: 'Acima de 7:00/km', icon: '🐢' },
          { value: '6:00-7:00', label: '6:00 - 7:00/km', icon: '🚶' },
          { value: '5:00-6:00', label: '5:00 - 6:00/km', icon: '🏃' },
          { value: '4:00-5:00', label: '4:00 - 5:00/km', icon: '⚡' },
          { value: '4:00-', label: 'Abaixo de 4:00/km', icon: '🚀' }
        ],
        field: 'currentPace'
      },
      {
        title: 'Quanto você corre atualmente?',
        subtitle: 'Distância semanal aproximada',
        type: 'options',
        options: [
          { value: '0-10', label: '0-10 km/semana', icon: '🌱' },
          { value: '10-20', label: '10-20 km/semana', icon: '🏃' },
          { value: '20-40', label: '20-40 km/semana', icon: '💪' },
          { value: '40-60', label: '40-60 km/semana', icon: '🔥' },
          { value: '60+', label: 'Mais de 60 km/semana', icon: '🏆' }
        ],
        field: 'weeklyDistance'
      },
      {
        title: 'Quantos dias por semana?',
        subtitle: 'Frequência de treino ideal para você',
        type: 'options',
        options: [
          { value: 3, label: '3 dias/semana', desc: 'Iniciante ou manutenção', icon: '📅' },
          { value: 4, label: '4 dias/semana', desc: 'Intermediário', icon: '📆' },
          { value: 5, label: '5 dias/semana', desc: 'Avançado', icon: '🗓️' },
          { value: 6, label: '6 dias/semana', desc: 'Elite ou preparação', icon: '📋' }
        ],
        field: 'daysPerWeek'
      },
      {
        title: 'Duração dos treinos?',
        subtitle: 'Tempo disponível por sessão',
        type: 'options',
        options: [
          { value: '30-45', label: '30-45 minutos', icon: '⏱️' },
          { value: '45-60', label: '45-60 minutos', icon: '⏰' },
          { value: '60-90', label: '60-90 minutos', icon: '🕐' },
          { value: '90+', label: 'Mais de 90 minutos', icon: '⏳' }
        ],
        field: 'sessionTime'
      },
      {
        title: 'Horário preferido?',
        subtitle: 'Quando você prefere treinar?',
        type: 'options',
        options: [
          { value: 'Manhã', label: 'Manhã (5h-9h)', icon: '🌅' },
          { value: 'Meio-dia', label: 'Meio-dia (11h-14h)', icon: '☀️' },
          { value: 'Tarde', label: 'Tarde (16h-19h)', icon: '🌤️' },
          { value: 'Noite', label: 'Noite (19h-22h)', icon: '🌙' }
        ],
        field: 'preferredTime'
      },
      {
        title: 'Onde você corre?',
        subtitle: 'Pode escolher mais de uma opção',
        type: 'options',
        options: [
          { value: 'Rua/Asfalto', label: 'Rua/Asfalto', icon: '🏙️' },
          { value: 'Pista', label: 'Pista de atletismo', icon: '🏟️' },
          { value: 'Trail/Trilha', label: 'Trail/Trilha', icon: '🏔️' },
          { value: 'Esteira', label: 'Esteira', icon: '🏋️' },
          { value: 'Parque', label: 'Parque', icon: '🌳' }
        ],
        field: 'terrain',
        multiple: true
      },
      {
        title: 'Há quanto tempo corre?',
        subtitle: 'Experiência total com corrida',
        type: 'options',
        options: [
          { value: 'Menos de 6 meses', label: 'Menos de 6 meses', icon: '🌱' },
          { value: '6 meses - 1 ano', label: '6 meses - 1 ano', icon: '🏃' },
          { value: '1-3 anos', label: '1-3 anos', icon: '💪' },
          { value: '3-5 anos', label: '3-5 anos', icon: '🔥' },
          { value: 'Mais de 5 anos', label: 'Mais de 5 anos', icon: '🏆' }
        ],
        field: 'runningExperience'
      },
      {
        title: 'Histórico de lesões?',
        subtitle: 'Importante para prevenir problemas',
        type: 'options',
        options: [
          { value: 'Nenhuma', label: 'Nenhuma lesão', icon: '✅' },
          { value: 'Joelho', label: 'Problemas no joelho', icon: '🦵' },
          { value: 'Tornozelo', label: 'Problemas no tornozelo', icon: '🦶' },
          { value: 'Canelite', label: 'Canelite', icon: '🩹' },
          { value: 'Fascite', label: 'Fascite plantar', icon: '👣' },
          { value: 'Outras', label: 'Outras lesões', icon: '🏥' }
        ],
        field: 'injuries',
        multiple: true
      },
      {
        title: 'Restrições alimentares?',
        subtitle: 'Para personalizar receitas',
        type: 'options',
        options: [
          { value: 'Nenhuma', label: 'Nenhuma restrição', icon: '🍽️' },
          { value: 'Vegetariano', label: 'Vegetariano', icon: '🥗' },
          { value: 'Vegano', label: 'Vegano', icon: '🌱' },
          { value: 'Sem Lactose', label: 'Sem lactose', icon: '🥛' },
          { value: 'Sem Glúten', label: 'Sem glúten', icon: '🌾' },
          { value: 'Low Carb', label: 'Low carb', icon: '🥩' }
        ],
        field: 'dietaryRestrictions',
        multiple: true
      },
      {
        title: 'O que te motiva?',
        subtitle: 'Sua principal motivação para correr',
        type: 'options',
        options: [
          { value: 'Saúde', label: 'Saúde e bem-estar', icon: '❤️' },
          { value: 'Competição', label: 'Competir e melhorar', icon: '🏆' },
          { value: 'Peso', label: 'Perder peso', icon: '⚖️' },
          { value: 'Social', label: 'Socializar', icon: '👥' },
          { value: 'Mental', label: 'Saúde mental', icon: '🧠' },
          { value: 'Desafio', label: 'Desafio pessoal', icon: '💪' }
        ],
        field: 'motivation'
      }
    ]

    const currentStep = steps[onboardingStep]

    const handleNext = () => {
      if (onboardingStep < steps.length - 1) {
        setOnboardingStep(prev => prev + 1)
      } else {
        completeOnboarding()
      }
    }

    const handleBack = () => {
      if (onboardingStep > 0) {
        setOnboardingStep(prev => prev - 1)
      }
    }

    const isStepValid = () => {
      if (currentStep.type === 'welcome') return true
      if (currentStep.type === 'text') {
        return onboardingData[currentStep.field as keyof typeof onboardingData] !== ''
      }
      if (currentStep.type === 'personal') {
        return currentStep.fields.every(f => onboardingData[f.field as keyof typeof onboardingData] !== '')
      }
      if (currentStep.type === 'race') {
        return true // Campos opcionais
      }
      if (currentStep.type === 'options') {
        const value = onboardingData[currentStep.field as keyof typeof onboardingData]
        if (currentStep.multiple) {
          return Array.isArray(value) && value.length > 0
        }
        return value !== '' && value !== 0
      }
      return true
    }

    return (
      <div className="min-h-screen bg-[#0B0F14] text-[#E6EBF2] p-6 flex flex-col">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center">
                <Activity className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">RunPro</h1>
            <p className="text-[#9AA8B2] text-center">Seu treinador de corrida pessoal</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 mx-0.5 rounded-full transition-colors duration-300 ${
                    index <= onboardingStep ? 'bg-[#10B981]' : 'bg-[#11161E]'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-[#9AA8B2] text-center">
              Etapa {onboardingStep + 1} de {steps.length}
            </p>
          </div>

          {/* Content */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-center">{currentStep.title}</h2>
            {currentStep.subtitle && (
              <p className="text-[#9AA8B2] text-center mb-6">{currentStep.subtitle}</p>
            )}

            {/* Welcome Screen */}
            {currentStep.type === 'welcome' && (
              <div className="text-center py-8">
                <div className="text-6xl mb-6">🏃‍♂️</div>
                <p className="text-lg text-[#E6EBF2] mb-4">
                  Vamos criar um plano de treino personalizado para você!
                </p>
                <p className="text-[#9AA8B2]">
                  Responda algumas perguntas para começarmos
                </p>
              </div>
            )}

            {/* Text Input */}
            {currentStep.type === 'text' && (
              <input
                type="text"
                value={onboardingData[currentStep.field as keyof typeof onboardingData] as string}
                onChange={(e) => setOnboardingData(prev => ({ ...prev, [currentStep.field]: e.target.value }))}
                placeholder={currentStep.placeholder}
                className="w-full p-4 rounded-2xl bg-[#11161E] border-2 border-[#1A1F2E] text-[#E6EBF2] placeholder-[#9AA8B2] focus:border-[#10B981] focus:outline-none transition-colors duration-200"
              />
            )}

            {/* Personal Info */}
            {currentStep.type === 'personal' && (
              <div className="space-y-3">
                {currentStep.fields.map((field, index) => (
                  <input
                    key={index}
                    type={field.type}
                    value={onboardingData[field.field as keyof typeof onboardingData] as string}
                    onChange={(e) => setOnboardingData(prev => ({ ...prev, [field.field]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full p-4 rounded-2xl bg-[#11161E] border-2 border-[#1A1F2E] text-[#E6EBF2] placeholder-[#9AA8B2] focus:border-[#10B981] focus:outline-none transition-colors duration-200"
                  />
                ))}
              </div>
            )}

            {/* Race Info */}
            {currentStep.type === 'race' && (
              <div className="space-y-3">
                {currentStep.fields.map((field, index) => (
                  <input
                    key={index}
                    type={field.type}
                    value={onboardingData[field.field as keyof typeof onboardingData] as string}
                    onChange={(e) => setOnboardingData(prev => ({ ...prev, [field.field]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full p-4 rounded-2xl bg-[#11161E] border-2 border-[#1A1F2E] text-[#E6EBF2] placeholder-[#9AA8B2] focus:border-[#10B981] focus:outline-none transition-colors duration-200"
                  />
                ))}
              </div>
            )}

            {/* Options */}
            {currentStep.type === 'options' && (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {currentStep.options.map((option, index) => {
                  const isSelected = currentStep.multiple
                    ? (onboardingData[currentStep.field as keyof typeof onboardingData] as string[])?.includes(option.value as string)
                    : onboardingData[currentStep.field as keyof typeof onboardingData] === option.value

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (currentStep.multiple) {
                          const current = onboardingData[currentStep.field as keyof typeof onboardingData] as string[]
                          const updated = current.includes(option.value as string)
                            ? current.filter(item => item !== option.value)
                            : [...current, option.value as string]
                          setOnboardingData(prev => ({ ...prev, [currentStep.field]: updated }))
                        } else {
                          setOnboardingData(prev => ({ ...prev, [currentStep.field]: option.value }))
                        }
                      }}
                      className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                        isSelected
                          ? 'border-[#10B981] bg-[#10B981]/10'
                          : 'border-[#11161E] bg-[#11161E]/50 hover:border-[#10B981]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{option.icon}</span>
                        <div className="flex-1">
                          <p className="font-medium">{option.label}</p>
                          {option.desc && (
                            <p className="text-sm text-[#9AA8B2] mt-1">{option.desc}</p>
                          )}
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {onboardingStep > 0 && (
            <button
              onClick={handleBack}
              className="flex-1 py-4 px-6 rounded-2xl border border-[#11161E] text-[#9AA8B2] font-medium transition-colors duration-200 hover:border-[#10B981]/50"
            >
              Voltar
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#10B981]/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {onboardingStep < steps.length - 1 ? 'Continuar' : 'Começar!'}
          </button>
        </div>
      </div>
    )
  }

  // Goal Modal Component
  const GoalModal = () => {
    const [goalType, setGoalType] = useState<Goal['type']>(editingGoal?.type || 'distance')
    const [title, setTitle] = useState(editingGoal?.title || '')
    const [target, setTarget] = useState(editingGoal?.target.toString() || '')
    const [current, setCurrent] = useState(editingGoal?.current.toString() || '0')
    const [deadline, setDeadline] = useState(editingGoal?.deadline || '')

    const goalTypes = [
      { type: 'distance' as const, label: 'Distância', icon: '🏃', unit: 'km', color: 'from-[#10B981] to-[#059669]' },
      { type: 'pace' as const, label: 'Pace', icon: '⚡', unit: 'min/km', color: 'from-yellow-500 to-orange-500' },
      { type: 'weight' as const, label: 'Peso', icon: '⚖️', unit: 'kg', color: 'from-blue-500 to-cyan-500' },
      { type: 'frequency' as const, label: 'Frequência', icon: '📅', unit: 'dias/sem', color: 'from-purple-500 to-pink-500' },
      { type: 'race' as const, label: 'Prova', icon: '🏆', unit: 'data', color: 'from-red-500 to-orange-500' }
    ]

    const selectedType = goalTypes.find(t => t.type === goalType)!

    const handleSave = () => {
      if (!title || !target || !deadline) return

      const progress = typeof target === 'string' && !isNaN(Number(target)) && !isNaN(Number(current))
        ? Math.min((Number(current) / Number(target)) * 100, 100)
        : 0

      saveGoal({
        type: goalType,
        title,
        target: goalType === 'race' ? target : Number(target),
        current: goalType === 'race' ? current : Number(current),
        unit: selectedType.unit,
        deadline,
        progress,
        icon: selectedType.icon,
        color: selectedType.color
      })
    }

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-6">
        <div className="bg-[#11161E] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#1A1F2E]">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{editingGoal ? 'Editar Meta' : 'Nova Meta'}</h2>
              <button
                onClick={() => {
                  setShowGoalModal(false)
                  setEditingGoal(null)
                }}
                className="w-10 h-10 bg-[#0B0F14] rounded-xl flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Goal Type Selector */}
            <div className="mb-6">
              <label className="text-sm text-[#9AA8B2] mb-2 block">Tipo de Meta</label>
              <div className="grid grid-cols-3 gap-3">
                {goalTypes.map((type) => (
                  <button
                    key={type.type}
                    onClick={() => setGoalType(type.type)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                      goalType === type.type
                        ? 'border-[#10B981] bg-[#10B981]/10'
                        : 'border-[#1A1F2E] hover:border-[#10B981]/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <p className="text-xs font-medium">{type.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="text-sm text-[#9AA8B2] mb-2 block">Título da Meta</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Ex: Correr ${goalType === 'distance' ? '100km' : goalType === 'pace' ? '5:00/km' : goalType === 'weight' ? '75kg' : goalType === 'frequency' ? '5 dias' : 'Meia Maratona'} em ${new Date().toLocaleDateString('pt-BR', { month: 'long' })}`}
                className="w-full p-4 rounded-2xl bg-[#0B0F14] border-2 border-[#1A1F2E] text-[#E6EBF2] placeholder-[#9AA8B2] focus:border-[#10B981] focus:outline-none"
              />
            </div>

            {/* Target */}
            <div className="mb-4">
              <label className="text-sm text-[#9AA8B2] mb-2 block">Meta ({selectedType.unit})</label>
              <input
                type={goalType === 'race' ? 'text' : 'number'}
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder={goalType === 'race' ? 'Nome da prova' : '100'}
                className="w-full p-4 rounded-2xl bg-[#0B0F14] border-2 border-[#1A1F2E] text-[#E6EBF2] placeholder-[#9AA8B2] focus:border-[#10B981] focus:outline-none"
              />
            </div>

            {/* Current */}
            <div className="mb-4">
              <label className="text-sm text-[#9AA8B2] mb-2 block">Progresso Atual ({selectedType.unit})</label>
              <input
                type={goalType === 'race' ? 'text' : 'number'}
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder={goalType === 'race' ? 'Status' : '0'}
                className="w-full p-4 rounded-2xl bg-[#0B0F14] border-2 border-[#1A1F2E] text-[#E6EBF2] placeholder-[#9AA8B2] focus:border-[#10B981] focus:outline-none"
              />
            </div>

            {/* Deadline */}
            <div className="mb-6">
              <label className="text-sm text-[#9AA8B2] mb-2 block">Prazo</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full p-4 rounded-2xl bg-[#0B0F14] border-2 border-[#1A1F2E] text-[#E6EBF2] focus:border-[#10B981] focus:outline-none"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={!title || !target || !deadline}
              className="w-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white py-4 rounded-2xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#10B981]/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editingGoal ? 'Salvar Alterações' : 'Criar Meta'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Live Run Screen
  const LiveRunScreen = () => (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EBF2]">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => {
              if (confirm('Deseja realmente encerrar a corrida?')) {
                finishLiveRun()
              }
            }}
            className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Corrida em Andamento</h1>
          <div className="w-10 h-10" />
        </div>

        {/* Main Stats - Large Display */}
        <div className="bg-gradient-to-br from-[#10B981]/10 to-[#059669]/5 p-8 rounded-3xl border border-[#10B981]/20 mb-6">
          <div className="text-center mb-8">
            <p className="text-[#9AA8B2] text-sm mb-2">Distância</p>
            <p className="text-6xl font-bold text-[#10B981] mb-1">
              {liveRun.distance.toFixed(2)}
            </p>
            <p className="text-xl text-[#9AA8B2]">km</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <p className="text-[#9AA8B2] text-sm mb-2">Tempo</p>
              <p className="text-3xl font-bold">{formatDuration(liveRun.duration)}</p>
            </div>
            <div className="text-center">
              <p className="text-[#9AA8B2] text-sm mb-2">Pace Médio</p>
              <p className="text-3xl font-bold">{liveRun.avgPace}</p>
              <p className="text-sm text-[#9AA8B2]">/km</p>
            </div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E] text-center">
            <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
            <p className="text-lg font-bold">{liveRun.currentPace}</p>
            <p className="text-xs text-[#9AA8B2]">Pace Atual</p>
          </div>
          <div className="bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E] text-center">
            <Mountain className="w-5 h-5 text-blue-400 mx-auto mb-2" />
            <p className="text-lg font-bold">{liveRun.elevation}m</p>
            <p className="text-xs text-[#9AA8B2]">Elevação</p>
          </div>
          <div className="bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E] text-center">
            <Flame className="w-5 h-5 text-orange-400 mx-auto mb-2" />
            <p className="text-lg font-bold">{liveRun.calories}</p>
            <p className="text-xs text-[#9AA8B2]">Calorias</p>
          </div>
        </div>

        {/* Real-time Info Banner */}
        <div className="bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E] mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-sm text-[#9AA8B2]">
                {liveRun.isPaused ? 'Pausado' : 'Rastreando em tempo real'}
              </span>
            </div>
            <Heart className="w-5 h-5 text-red-400 animate-pulse" />
          </div>
        </div>

        {/* Lap/Split Info */}
        <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mb-6">
          <h3 className="font-bold mb-4">Estatísticas da Corrida</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#9AA8B2]">Velocidade Média</span>
              <span className="font-medium">
                {liveRun.duration > 0 ? ((liveRun.distance / (liveRun.duration / 3600)).toFixed(2)) : '0.00'} km/h
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#9AA8B2]">Calorias/km</span>
              <span className="font-medium">
                {liveRun.distance > 0 ? Math.floor(liveRun.calories / liveRun.distance) : 0} kcal
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#9AA8B2]">Elevação/km</span>
              <span className="font-medium">
                {liveRun.distance > 0 ? (liveRun.elevation / liveRun.distance).toFixed(1) : '0.0'} m
              </span>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="space-y-3">
          {!liveRun.isPaused ? (
            <button
              onClick={pauseLiveRun}
              className="w-full bg-yellow-500/20 border-2 border-yellow-500/50 text-yellow-400 py-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:bg-yellow-500/30"
            >
              <Pause className="w-5 h-5" />
              Pausar Corrida
            </button>
          ) : (
            <button
              onClick={resumeLiveRun}
              className="w-full bg-[#10B981]/20 border-2 border-[#10B981]/50 text-[#10B981] py-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#10B981]/30"
            >
              <Play className="w-5 h-5" />
              Retomar Corrida
            </button>
          )}
          
          <button
            onClick={() => {
              if (confirm('Deseja finalizar a corrida?')) {
                finishLiveRun()
              }
            }}
            className="w-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white py-4 rounded-2xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#10B981]/25"
          >
            Finalizar Corrida
          </button>
        </div>
      </div>
    </div>
  )

  // Goals Screen
  const GoalsScreen = () => (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EBF2]">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentScreen('profile')}
            className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-xl font-bold">Minhas Metas</h1>
          <button
            onClick={() => setShowGoalModal(true)}
            className="w-10 h-10 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>

        {goals.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Nenhuma meta definida</h3>
            <p className="text-[#9AA8B2] mb-6">
              Defina suas metas pessoais e acompanhe seu progresso
            </p>
            <button
              onClick={() => setShowGoalModal(true)}
              className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white py-3 px-6 rounded-2xl font-medium inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Criar Primeira Meta
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-12 h-12 bg-gradient-to-br ${goal.color} rounded-xl flex items-center justify-center text-2xl`}>
                      {goal.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{goal.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-[#9AA8B2]">
                        <Calendar className="w-4 h-4" />
                        <span>Prazo: {new Date(goal.deadline).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingGoal(goal)
                        setShowGoalModal(true)
                      }}
                      className="w-8 h-8 bg-[#0B0F14] rounded-lg flex items-center justify-center hover:bg-[#10B981]/20 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="w-8 h-8 bg-[#0B0F14] rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-[#9AA8B2]">Progresso</span>
                    <span className="text-sm font-medium">
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <div className="w-full bg-[#0B0F14] rounded-full h-3">
                    <div
                      className={`bg-gradient-to-r ${goal.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#10B981]">{Math.round(goal.progress)}%</span>
                  <button
                    onClick={() => {
                      const newCurrent = prompt(`Atualizar progresso (${goal.unit}):`, goal.current.toString())
                      if (newCurrent) {
                        updateGoalProgress(goal.id, goal.type === 'race' ? newCurrent : Number(newCurrent))
                      }
                    }}
                    className="text-sm px-4 py-2 bg-[#0B0F14] rounded-xl hover:bg-[#10B981]/20 transition-colors"
                  >
                    Atualizar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showGoalModal && <GoalModal />}
    </div>
  )

  // Dashboard Component
  const DashboardScreen = () => (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EBF2]">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Olá, {mockUser.name}! 👋</h1>
            <p className="text-[#9AA8B2]">Pronto para correr hoje?</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-[#11161E] px-3 py-2 rounded-xl">
              <Flame className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-medium">{mockUser.streak}</span>
            </div>
            <button
              onClick={() => setCurrentScreen('profile')}
              className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center"
            >
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E]">
            <div className="flex items-center justify-between mb-2">
              <Route className="w-5 h-5 text-[#10B981]" />
              <span className="text-xs text-[#9AA8B2]">Distância Semanal</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">{mockUser.weeklyDistance}</span>
              <span className="text-sm text-[#9AA8B2]">/{mockUser.targetDistance} km</span>
            </div>
            <div className="w-full bg-[#0B0F14] rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-[#10B981] to-[#059669] h-2 rounded-full transition-all duration-500"
                style={{ width: `${(mockUser.weeklyDistance / mockUser.targetDistance) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E]">
            <div className="flex items-center justify-between mb-2">
              <Droplets className="w-5 h-5 text-blue-400" />
              <span className="text-xs text-[#9AA8B2]">Hidratação</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">{mockUser.water.consumed}</span>
              <span className="text-sm text-[#9AA8B2]">/{mockUser.water.target}</span>
            </div>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: mockUser.water.target }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full ${
                    i < mockUser.water.consumed ? 'bg-blue-400' : 'bg-[#0B0F14]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Today's Run */}
        <div className="bg-gradient-to-br from-[#10B981]/10 to-[#059669]/5 p-6 rounded-2xl border border-[#10B981]/20 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-[#10B981]">Iniciar Corrida</h3>
              <p className="text-[#9AA8B2]">Rastreamento em tempo real</p>
            </div>
            <Activity className="w-8 h-8 text-[#10B981]" />
          </div>
          <button
            onClick={startLiveRun}
            className="w-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-[#10B981]/25"
          >
            <Play className="w-5 h-5" />
            Começar Agora
          </button>
        </div>

        {/* Active Goals Preview */}
        {goals.length > 0 && (
          <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Metas Ativas</h3>
              <button
                onClick={() => setCurrentScreen('goals')}
                className="text-sm text-[#10B981] hover:underline"
              >
                Ver todas
              </button>
            </div>
            <div className="space-y-3">
              {goals.slice(0, 2).map((goal) => (
                <div key={goal.id} className="bg-[#0B0F14] p-4 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{goal.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{goal.title}</p>
                      <p className="text-xs text-[#9AA8B2]">
                        {goal.current} / {goal.target} {goal.unit}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-[#10B981]">{Math.round(goal.progress)}%</span>
                  </div>
                  <div className="w-full bg-[#11161E] rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${goal.color} h-2 rounded-full`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Runs with Share */}
        {completedRuns.length > 0 && (
          <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Corridas Recentes</h3>
              <Activity className="w-5 h-5 text-[#10B981]" />
            </div>
            <div className="space-y-3">
              {completedRuns.slice(0, 3).map((run) => (
                <div key={run.id} className="bg-[#0B0F14] p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {new Date(run.date).toLocaleDateString('pt-BR', { 
                          day: '2-digit', 
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <p className="text-xs text-[#9AA8B2]">
                        {run.distance.toFixed(2)} km • {formatDuration(run.duration)} • {run.avgPace}/km
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedRunToShare(run)
                        setShowShareModal(true)
                      }}
                      className="w-8 h-8 bg-[#11161E] rounded-lg flex items-center justify-center hover:bg-[#10B981]/20 transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-[#10B981]" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <p className="text-[#9AA8B2]">Elevação</p>
                      <p className="font-medium">{run.elevation}m</p>
                    </div>
                    <div>
                      <p className="text-[#9AA8B2]">Calorias</p>
                      <p className="font-medium">{run.calories}</p>
                    </div>
                    <div>
                      <p className="text-[#9AA8B2]">Pace</p>
                      <p className="font-medium">{run.avgPace}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weekly Summary */}
        <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mb-6">
          <h3 className="text-lg font-bold mb-4">Resumo da Semana</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Route className="w-5 h-5 text-[#10B981]" />
              </div>
              <p className="text-2xl font-bold">{mockUser.weeklyDistance}</p>
              <p className="text-xs text-[#9AA8B2]">km corridos</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-2xl font-bold">3:45</p>
              <p className="text-xs text-[#9AA8B2]">horas</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-2xl font-bold">5:20</p>
              <p className="text-xs text-[#9AA8B2]">pace médio</p>
            </div>
          </div>
        </div>

        {/* Nutrition Summary */}
        <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mb-6">
          <h3 className="text-lg font-bold mb-4">Nutrição</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-[#9AA8B2]">Calorias</span>
                <span className="text-sm">{mockUser.calories.consumed} / {mockUser.calories.target} kcal</span>
              </div>
              <div className="w-full bg-[#0B0F14] rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#10B981] to-[#059669] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(mockUser.calories.consumed / mockUser.calories.target) * 100}%` }}
                />
              </div>
            </div>
            {Object.entries(mockUser.macros).map(([macro, data]) => (
              <div key={macro}>
                <div className="flex justify-between mb-2">
                  <span className="capitalize text-[#9AA8B2]">{macro === 'protein' ? 'Proteína' : macro === 'carbs' ? 'Carboidratos' : 'Gordura'}</span>
                  <span className="text-sm">{data.consumed}g / {data.target}g</span>
                </div>
                <div className="w-full bg-[#0B0F14] rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      macro === 'protein' ? 'bg-green-500' : 
                      macro === 'carbs' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${Math.min((data.consumed / data.target) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setCurrentScreen('diet')}
            className="bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E] flex flex-col items-center gap-2 transition-all duration-200 hover:border-[#10B981]/50"
          >
            <Apple className="w-6 h-6 text-[#10B981]" />
            <span className="text-sm font-medium">Nutrição</span>
          </button>
          <button
            onClick={() => setCurrentScreen('progress')}
            className="bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E] flex flex-col items-center gap-2 transition-all duration-200 hover:border-[#10B981]/50"
          >
            <TrendingUp className="w-6 h-6 text-[#10B981]" />
            <span className="text-sm font-medium">Progresso</span>
          </button>
        </div>
      </div>
    </div>
  )

  // Run Screen
  const RunScreen = () => (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EBF2]">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold">{runData.name}</h1>
            <p className="text-[#9AA8B2] text-sm">8 km • 45 min</p>
          </div>
          <button className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Recovery Timer */}
        {isResting && (
          <div className="bg-gradient-to-br from-[#10B981]/10 to-[#059669]/5 p-6 rounded-2xl border border-[#10B981]/20 mb-6">
            <div className="text-center">
              <Timer className="w-8 h-8 text-[#10B981] mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-[#10B981]">{formatTime(restTimer)}</h3>
              <p className="text-[#9AA8B2]">Recuperação ativa</p>
              <button
                onClick={() => setIsResting(false)}
                className="mt-4 px-6 py-2 bg-[#10B981] text-white rounded-xl text-sm font-medium"
              >
                Pular
              </button>
            </div>
          </div>
        )}

        {/* Intervals */}
        <div className="space-y-4">
          {runData.intervals.map((interval, index) => (
            <div key={index} className={`bg-[#11161E] p-6 rounded-2xl border ${
              interval.type === 'hard' ? 'border-red-500/30' :
              interval.type === 'recovery' ? 'border-blue-500/30' :
              'border-[#1A1F2E]'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{interval.name}</h3>
                    {interval.type === 'hard' && (
                      <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">Intenso</span>
                    )}
                    {interval.type === 'recovery' && (
                      <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">Recuperação</span>
                    )}
                  </div>
                  <p className="text-[#9AA8B2] text-sm">{interval.distance} km • Pace {interval.pace}/km</p>
                </div>
                <button
                  onClick={() => updateInterval(index, 'completed', !interval.completed)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    interval.completed 
                      ? 'border-[#10B981] bg-[#10B981] text-white' 
                      : 'border-[#9AA8B2] hover:border-[#10B981]'
                  }`}
                >
                  {interval.completed && <CheckCircle2 className="w-5 h-5" />}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#0B0F14] p-3 rounded-xl text-center">
                  <Route className="w-4 h-4 text-[#10B981] mx-auto mb-1" />
                  <p className="text-sm font-medium">{interval.distance} km</p>
                  <p className="text-xs text-[#9AA8B2]">Distância</p>
                </div>
                <div className="bg-[#0B0F14] p-3 rounded-xl text-center">
                  <Zap className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                  <p className="text-sm font-medium">{interval.pace}</p>
                  <p className="text-xs text-[#9AA8B2]">Pace</p>
                </div>
                <div className="bg-[#0B0F14] p-3 rounded-xl text-center">
                  <Heart className="w-4 h-4 text-red-400 mx-auto mb-1" />
                  <p className="text-sm font-medium">
                    {interval.type === 'hard' ? '85%' : interval.type === 'recovery' ? '65%' : '70%'}
                  </p>
                  <p className="text-xs text-[#9AA8B2]">FC Alvo</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pb-6">
          <button className="w-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white py-4 rounded-2xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#10B981]/25">
            Finalizar Corrida
          </button>
        </div>
      </div>
    </div>
  )

  // Diet Screen
  const DietScreen = () => (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EBF2]">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-xl font-bold">Nutrição do Dia</h1>
          <button className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Daily Summary */}
        <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mb-6">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-[#10B981]">{mockUser.calories.consumed}</p>
              <p className="text-xs text-[#9AA8B2]">Calorias</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-500">{mockUser.macros.protein.consumed}g</p>
              <p className="text-xs text-[#9AA8B2]">Proteína</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-500">{mockUser.macros.carbs.consumed}g</p>
              <p className="text-xs text-[#9AA8B2]">Carbos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-500">{mockUser.macros.fat.consumed}g</p>
              <p className="text-xs text-[#9AA8B2]">Gordura</p>
            </div>
          </div>
        </div>

        {/* Meals */}
        <div className="space-y-4">
          {mockMeals.map((meal, index) => (
            <div key={index} className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <button
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      meal.completed 
                        ? 'border-[#10B981] bg-[#10B981] text-white' 
                        : 'border-[#9AA8B2] hover:border-[#10B981]'
                    }`}
                  >
                    {meal.completed && <CheckCircle2 className="w-4 h-4" />}
                  </button>
                  <div>
                    <h3 className="font-bold">{meal.name}</h3>
                    <p className="text-[#9AA8B2] text-sm">{meal.calories} kcal</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#9AA8B2]" />
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm font-medium text-green-500">{meal.protein}g</p>
                  <p className="text-xs text-[#9AA8B2]">Proteína</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-500">{meal.carbs}g</p>
                  <p className="text-xs text-[#9AA8B2]">Carbos</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-500">{meal.fat}g</p>
                  <p className="text-xs text-[#9AA8B2]">Gordura</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Water Tracking */}
        <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold">Hidratação</h3>
            </div>
            <span className="text-sm text-[#9AA8B2]">{mockUser.water.consumed}/{mockUser.water.target} copos</span>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: mockUser.water.target }).map((_, i) => (
              <button
                key={i}
                className={`flex-1 h-12 rounded-xl transition-all duration-200 ${
                  i < mockUser.water.consumed 
                    ? 'bg-blue-400 text-white' 
                    : 'bg-[#0B0F14] border border-[#1A1F2E] hover:border-blue-400/50'
                }`}
              >
                <Droplets className="w-5 h-5 mx-auto" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Recipes Screen
  const RecipesScreen = () => (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EBF2]">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-xl font-bold">Receitas Fitness</h1>
          <div className="w-10 h-10" />
        </div>

        {/* Tab Selector */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setRecipeTab('pre')}
            className={`flex-1 py-3 px-4 rounded-2xl font-medium transition-all duration-200 ${
              recipeTab === 'pre'
                ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-lg shadow-[#10B981]/25'
                : 'bg-[#11161E] text-[#9AA8B2] border border-[#1A1F2E] hover:border-[#10B981]/50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Pré-Treino</span>
            </div>
          </button>
          <button
            onClick={() => setRecipeTab('post')}
            className={`flex-1 py-3 px-4 rounded-2xl font-medium transition-all duration-200 ${
              recipeTab === 'post'
                ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-lg shadow-[#10B981]/25'
                : 'bg-[#11161E] text-[#9AA8B2] border border-[#1A1F2E] hover:border-[#10B981]/50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Pós-Treino</span>
            </div>
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-br from-[#10B981]/10 to-[#059669]/5 p-4 rounded-2xl border border-[#10B981]/20 mb-6">
          <div className="flex items-start gap-3">
            <ChefHat className="w-5 h-5 text-[#10B981] mt-0.5" />
            <div>
              <h3 className="font-bold text-[#10B981] mb-1">
                {recipeTab === 'pre' ? 'Energia para Correr' : 'Recuperação Muscular'}
              </h3>
              <p className="text-sm text-[#9AA8B2]">
                {recipeTab === 'pre' 
                  ? 'Receitas ricas em carboidratos para fornecer energia durante a corrida'
                  : 'Receitas com proteína e carboidratos para recuperação pós-treino'}
              </p>
            </div>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="space-y-4">
          {(recipeTab === 'pre' ? preworkoutRecipes : postworkoutRecipes).map((recipe, index) => (
            <button
              key={index}
              onClick={() => setSelectedRecipe(recipe)}
              className="w-full bg-[#11161E] p-5 rounded-2xl border border-[#1A1F2E] transition-all duration-200 hover:border-[#10B981]/50 text-left"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{recipe.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{recipe.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-[#9AA8B2]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {recipe.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Timer className="w-3 h-3" />
                          {recipe.timing}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#9AA8B2]" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#10B981]/20 text-[#10B981]">
                      {recipe.calories} kcal
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                      {recipe.protein}g proteína
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                      {recipe.carbs}g carbos
                    </span>
                  </div>

                  <p className="text-sm text-[#9AA8B2]">{recipe.benefits}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-6">
          <div className="bg-[#11161E] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#1A1F2E]">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="text-5xl">{selectedRecipe.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{selectedRecipe.name}</h2>
                    <div className="flex items-center gap-3 text-sm text-[#9AA8B2]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedRecipe.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Timer className="w-4 h-4" />
                        {selectedRecipe.timing}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="w-10 h-10 bg-[#0B0F14] rounded-xl flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
              </div>

              {/* Macros */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="bg-[#0B0F14] p-3 rounded-xl text-center">
                  <p className="text-lg font-bold text-[#10B981]">{selectedRecipe.calories}</p>
                  <p className="text-xs text-[#9AA8B2]">kcal</p>
                </div>
                <div className="bg-[#0B0F14] p-3 rounded-xl text-center">
                  <p className="text-lg font-bold text-green-500">{selectedRecipe.protein}g</p>
                  <p className="text-xs text-[#9AA8B2]">Proteína</p>
                </div>
                <div className="bg-[#0B0F14] p-3 rounded-xl text-center">
                  <p className="text-lg font-bold text-blue-500">{selectedRecipe.carbs}g</p>
                  <p className="text-xs text-[#9AA8B2]">Carbos</p>
                </div>
                <div className="bg-[#0B0F14] p-3 rounded-xl text-center">
                  <p className="text-lg font-bold text-yellow-500">{selectedRecipe.fat}g</p>
                  <p className="text-xs text-[#9AA8B2]">Gordura</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-br from-[#10B981]/10 to-[#059669]/5 p-4 rounded-2xl border border-[#10B981]/20 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-[#10B981]" />
                  <h3 className="font-bold text-[#10B981]">Benefícios</h3>
                </div>
                <p className="text-sm text-[#E6EBF2]">{selectedRecipe.benefits}</p>
              </div>

              {/* Ingredients */}
              <div className="mb-6">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#10B981]" />
                  Ingredientes
                </h3>
                <ul className="space-y-2">
                  {selectedRecipe.ingredients.map((ingredient: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5" />
                      <span className="text-[#E6EBF2]">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedRecipe(null)}
                className="w-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white py-4 rounded-2xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#10B981]/25"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // Progress Screen
  const ProgressScreen = () => (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EBF2]">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-xl font-bold">Progresso</h1>
          <button className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Distance Progress */}
        <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Distância Mensal</h3>
            <span className="text-[#10B981] font-bold">128 km</span>
          </div>
          <div className="h-32 bg-[#0B0F14] rounded-xl p-4 flex items-end justify-between">
            {[95, 110, 118, 128].map((distance, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-8 bg-gradient-to-t from-[#10B981] to-[#059669] rounded-t"
                  style={{ height: `${(distance / 150) * 100}%` }}
                />
                <span className="text-xs text-[#9AA8B2] mt-2">{distance}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pace Evolution */}
        <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mb-6">
          <h3 className="font-bold mb-4">Evolução do Pace</h3>
          <div className="space-y-3">
            {[
              { distance: '5K', pace: '5:15', best: '4:58', change: '-17s' },
              { distance: '10K', pace: '5:35', best: '5:22', change: '-13s' },
              { distance: 'Meia', pace: '5:50', best: '5:42', change: '-8s' },
              { distance: 'Longo', pace: '6:10', best: '5:58', change: '-12s' }
            ].map((record, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-[#9AA8B2]">{record.distance}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{record.pace}/km</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                    {record.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Volume */}
        <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mb-6">
          <h3 className="font-bold mb-4">Volume Semanal</h3>
          <div className="h-32 bg-[#0B0F14] rounded-xl p-4 flex items-end justify-between">
            {[28, 32, 35, 32.5].map((volume, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-8 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                  style={{ height: `${(volume / 40) * 100}%` }}
                />
                <span className="text-xs text-[#9AA8B2] mt-2">{volume}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Records */}
        <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Recordes Pessoais</h3>
            <Trophy className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="space-y-3">
            {[
              { name: 'Maior Distância', value: '21.1 km', date: '15/03/2024' },
              { name: 'Melhor Pace 5K', value: '4:58/km', date: '22/03/2024' },
              { name: 'Mais Rápido 10K', value: '53:40', date: '10/03/2024' },
              { name: 'Sequência Atual', value: '12 dias', date: 'Hoje' }
            ].map((record, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{record.name}</p>
                  <p className="text-xs text-[#9AA8B2]">{record.date}</p>
                </div>
                <span className="text-[#10B981] font-bold">{record.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Profile Screen
  const ProfileScreen = () => (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EBF2]">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-xl font-bold">Perfil</h1>
          <button className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Header */}
        <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{mockUser.name}</h2>
              <p className="text-[#9AA8B2]">{mockUser.goal} • {mockUser.level}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-[#10B981]">{mockUser.streak}</p>
              <p className="text-xs text-[#9AA8B2]">Dias seguidos</p>
            </div>
            <div>
              <p className="text-2xl font-bold">128</p>
              <p className="text-xs text-[#9AA8B2]">km este mês</p>
            </div>
            <div>
              <p className="text-2xl font-bold">5:20</p>
              <p className="text-xs text-[#9AA8B2]">Pace médio</p>
            </div>
          </div>
        </div>

        {/* Menu Options */}
        <div className="space-y-3">
          {[
            { icon: Target, label: 'Meus Objetivos', screen: 'goals' },
            { icon: Calendar, label: 'Plano de Treino', screen: 'plan' },
            { icon: Book, label: 'Histórico', screen: 'library' },
            { icon: Activity, label: 'Estatísticas', screen: 'stats' },
            { icon: Settings, label: 'Configurações', screen: 'settings' }
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentScreen(item.screen)}
              className="w-full bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E] flex items-center justify-between transition-all duration-200 hover:border-[#10B981]/50"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-[#10B981]" />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#9AA8B2]" />
            </button>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={() => {
              localStorage.removeItem('runapp-onboarding')
              localStorage.removeItem('runapp-user-data')
              setCurrentScreen('onboarding')
              setOnboardingStep(0)
            }}
            className="w-full bg-red-500/10 border border-red-500/20 text-red-400 py-4 rounded-2xl font-medium transition-all duration-200 hover:bg-red-500/20"
          >
            Refazer Configuração Inicial
          </button>
        </div>
      </div>
    </div>
  )

  // Bottom Navigation
  const BottomNav = () => {
    if (currentScreen === 'onboarding' || currentScreen === 'liverun') return null

    const navItems = [
      { icon: Home, label: 'Início', screen: 'dashboard' },
      { icon: Activity, label: 'Corrida', screen: 'run' },
      { icon: ChefHat, label: 'Receitas', screen: 'recipes' },
      { icon: Apple, label: 'Nutrição', screen: 'diet' },
      { icon: BarChart3, label: 'Progresso', screen: 'progress' }
    ]

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-[#11161E] border-t border-[#1A1F2E] px-6 py-4">
        <div className="flex justify-between">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentScreen(item.screen)}
              className={`flex flex-col items-center gap-1 transition-all duration-200 ${
                currentScreen === item.screen 
                  ? 'text-[#10B981]' 
                  : 'text-[#9AA8B2] hover:text-[#10B981]'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen />
      case 'dashboard':
        return <DashboardScreen />
      case 'liverun':
        return <LiveRunScreen />
      case 'run':
        return <RunScreen />
      case 'diet':
        return <DietScreen />
      case 'recipes':
        return <RecipesScreen />
      case 'progress':
        return <ProgressScreen />
      case 'profile':
        return <ProfileScreen />
      case 'goals':
        return <GoalsScreen />
      default:
        return <DashboardScreen />
    }
  }

  return (
    <div className="font-inter">
      {renderScreen()}
      <BottomNav />
      {currentScreen !== 'onboarding' && currentScreen !== 'liverun' && <div className="h-20" />}
      {showShareModal && <ShareModal />}
    </div>
  )
}
