'use client'

import { useState, useEffect } from 'react'
import { Play, Target, Calendar, TrendingUp, Book, Settings, User, Home, Activity, Apple, BarChart3, ChevronRight, Plus, Timer, Droplets, Flame, Award, Clock, CheckCircle2, MapPin, Wind, Zap, Trophy, Route, Heart, ChefHat, Utensils } from 'lucide-react'

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

export default function RunApp() {
  const [currentScreen, setCurrentScreen] = useState('onboarding')
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [restTimer, setRestTimer] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [runData, setRunData] = useState(mockRun)
  const [recipeTab, setRecipeTab] = useState<'pre' | 'post'>('pre')
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null)

  // Onboarding state
  const [onboardingData, setOnboardingData] = useState({
    goal: '',
    level: '',
    daysPerWeek: 0,
    sessionTime: 0,
    terrain: [],
    preferences: []
  })

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('runapp-onboarding')
    if (hasCompletedOnboarding) {
      setIsFirstTime(false)
      setCurrentScreen('dashboard')
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

  const completeOnboarding = () => {
    localStorage.setItem('runapp-onboarding', 'true')
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

  const updateInterval = (index: number, field: string, value: any) => {
    const updated = { ...runData }
    updated.intervals[index] = { ...updated.intervals[index], [field]: value }
    setRunData(updated)
  }

  // Onboarding Component
  const OnboardingScreen = () => {
    const steps = [
      {
        title: 'Qual seu objetivo?',
        options: ['5K', '10K', 'Meia Maratona', 'Maratona', 'Melhorar Pace', 'Perder Peso'],
        field: 'goal'
      },
      {
        title: 'Qual seu nível?',
        options: ['Iniciante', 'Intermediário', 'Avançado', 'Elite'],
        field: 'level'
      },
      {
        title: 'Quantos dias por semana?',
        options: ['3 dias', '4 dias', '5 dias', '6 dias'],
        field: 'daysPerWeek'
      },
      {
        title: 'Tempo por treino?',
        options: ['30-45 min', '45-60 min', '60-90 min', '90+ min'],
        field: 'sessionTime'
      },
      {
        title: 'Onde você corre?',
        options: ['Rua/Asfalto', 'Pista', 'Trail/Trilha', 'Esteira'],
        field: 'terrain',
        multiple: true
      }
    ]

    const currentStep = steps[onboardingStep]

    return (
      <div className="min-h-screen bg-[#0B0F14] text-[#E6EBF2] p-6 flex flex-col">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center">
                <Activity className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">RunPro</h1>
            <p className="text-[#9AA8B2] text-center">Seu treinador de corrida pessoal</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 mx-1 rounded-full transition-colors duration-300 ${
                    index <= onboardingStep ? 'bg-[#10B981]' : 'bg-[#11161E]'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-[#9AA8B2] text-center">
              Etapa {onboardingStep + 1} de {steps.length}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">{currentStep.title}</h2>
            <div className="space-y-3">
              {currentStep.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (currentStep.multiple) {
                      const current = onboardingData[currentStep.field as keyof typeof onboardingData] as string[]
                      const updated = current.includes(option)
                        ? current.filter(item => item !== option)
                        : [...current, option]
                      setOnboardingData(prev => ({ ...prev, [currentStep.field]: updated }))
                    } else {
                      setOnboardingData(prev => ({ ...prev, [currentStep.field]: option }))
                    }
                  }}
                  className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 ${
                    currentStep.multiple
                      ? (onboardingData[currentStep.field as keyof typeof onboardingData] as string[])?.includes(option)
                        ? 'border-[#10B981] bg-[#10B981]/10'
                        : 'border-[#11161E] bg-[#11161E]/50 hover:border-[#10B981]/50'
                      : onboardingData[currentStep.field as keyof typeof onboardingData] === option
                      ? 'border-[#10B981] bg-[#10B981]/10'
                      : 'border-[#11161E] bg-[#11161E]/50 hover:border-[#10B981]/50'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          {onboardingStep > 0 && (
            <button
              onClick={() => setOnboardingStep(prev => prev - 1)}
              className="flex-1 py-4 px-6 rounded-2xl border border-[#11161E] text-[#9AA8B2] font-medium transition-colors duration-200 hover:border-[#10B981]/50"
            >
              Voltar
            </button>
          )}
          <button
            onClick={() => {
              if (onboardingStep < steps.length - 1) {
                setOnboardingStep(prev => prev + 1)
              } else {
                completeOnboarding()
              }
            }}
            disabled={!onboardingData[currentStep.field as keyof typeof onboardingData] || 
              (currentStep.multiple && (onboardingData[currentStep.field as keyof typeof onboardingData] as string[]).length === 0)}
            className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#10B981]/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {onboardingStep < steps.length - 1 ? 'Continuar' : 'Finalizar'}
          </button>
        </div>
      </div>
    )
  }

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
              <h3 className="text-lg font-bold text-[#10B981]">Treino de Hoje</h3>
              <p className="text-[#9AA8B2]">{mockUser.todayRun.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#9AA8B2]">{mockUser.todayRun.distance} km</p>
              <p className="text-sm text-[#9AA8B2]">{mockUser.todayRun.duration} min</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentScreen('run')}
            className="w-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-[#10B981]/25"
          >
            <Play className="w-5 h-5" />
            Iniciar Corrida
          </button>
        </div>

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
    if (currentScreen === 'onboarding') return null

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
      default:
        return <DashboardScreen />
    }
  }

  return (
    <div className="font-inter">
      {renderScreen()}
      <BottomNav />
      {currentScreen !== 'onboarding' && <div className="h-20" />}
    </div>
  )
}
