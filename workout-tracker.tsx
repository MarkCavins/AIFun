import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WorkoutTracker = () => {
  const exerciseDescriptions = {
    'Kettlebell Clean': 'Start with the kettlebell on the ground. In one fluid motion, pull it up along your body, "catch" it in the rack position at your shoulder. Focus on proper hip hinge and keeping the bell close to your body.',
    'Dumbbell Shoulder Press': 'Hold dumbbells at shoulder height, palms facing forward. Press weights overhead until arms are fully extended. Lower back to starting position with control.',
    'Standing Chest Press': 'Using a resistance band around a fixed point, stand in a split stance. Push the band forward at chest height, fully extending arms. Control the return.',
    'Tricep Kickback': 'Bend forward at hips, upper arms parallel to floor. Extend forearms back until arms are straight. Focus on keeping upper arms still.',
    'Push-ups': 'Start in plank position, lower chest to ground keeping body rigid. Push back up to start. Modify on knees if needed.',
    'Sumo Squats': 'Stand with feet wide, toes pointed out. Squat down keeping knees in line with toes. Keep chest up and back straight.',
    'Side Bridge w/ Crunch': 'In side plank, lower hip to ground and lift back up while pulling top knee to elbow. Maintain stable shoulder position.',
    'Romanian Dead Lift': 'Hold weight in front of thighs, hinge at hips pushing butt back. Lower weight along legs keeping back straight. Return to standing.',
    'Reverse Plank': 'Sit on ground, place hands behind you. Lift hips until body forms straight line. Hold position while maintaining proper breathing.',
    'Curtsy Lunge': 'Step one leg behind and across your body, lowering into a lunge. Return to start. Alternate legs.',
    'Single Arm Swing': 'Hold kettlebell in one hand between legs. Hinge at hips, swing bell forward to shoulder height using hip drive. Control the return.',
    'Face Pull': 'Using resistance band at head height, pull band toward face, separating hands and squeezing shoulder blades. Control return.',
    'Bent-Over Row': 'Hinge forward at hips, back straight. Pull weight to lower rib cage, squeezing shoulder blades. Lower with control.',
    'Pulldown': 'Using resistance band overhead, pull band down to upper chest while maintaining upright posture. Control the return.',
    'Upright Row': 'Hold weight in front of thighs, pull straight up along body to chin height, elbows lead the movement. Lower with control.',
    'Bear Crawl': 'Start on hands and knees, lift knees slightly off ground. Move forward by stepping opposite hand and foot together.',
    'Down Dog Abs': 'Start in downward dog position. Bring knee to nose, extending opposite leg. Alternate legs.',
    'Russian Twist': 'Sit with knees bent, feet off ground. Rotate torso side to side, touching weight to ground on each side.',
    'Side Plank with Leg Lift': 'Hold side plank position. Lift top leg up and down while maintaining stable core and hip position.',
    'Butterfly Sit-up': 'Lie on back, soles of feet together, knees out. Sit up touching hands to feet, lower with control.',
    'Jump Squat': 'Lower into squat position, explosively jump upward. Land softly and immediately lower into next rep.',
    'Wood Chop': 'Hold weight at shoulder height on one side. Rotate and lower weight across body to opposite hip. Control the return.',
    'Split Jump': 'Start in lunge position. Jump and switch legs in air. Land softly and immediately prepare for next rep.',
    'Lateral Raise': 'Hold weights at sides, raise arms out to shoulder height keeping slight bend in elbows. Lower with control.',
    'Weighted Lunge': 'Hold weights at sides, step forward into lunge. Lower back knee toward ground. Push off front foot to return to start.'
  };

  const initialWorkouts = {
    'Day 1 - Upper Body Push': {
      'Circuit 1': {
        'Kettlebell Clean': [false, false, false],
        'Dumbbell Shoulder Press': [false, false, false],
        'Standing Chest Press': [false, false, false],
        'Tricep Kickback': [false, false, false],
        'Push-ups': [false, false, false],
      }
    },
    'Day 2 - Lower Body & Core': {
      'Circuit 1': {
        'Sumo Squats': [false, false, false],
        'Side Bridge w/ Crunch': [false, false, false],
        'Romanian Dead Lift': [false, false, false],
        'Reverse Plank': [false, false, false],
        'Curtsy Lunge': [false, false, false],
      }
    },
    'Day 3 - Upper Body Pull': {
      'Circuit 1': {
        'Single Arm Swing': [false, false, false],
        'Face Pull': [false, false, false],
        'Bent-Over Row': [false, false, false],
        'Pulldown': [false, false, false],
        'Upright Row': [false, false, false],
      }
    },
    'Day 4 - Core Focus': {
      'Circuit 1': {
        'Bear Crawl': [false, false, false],
        'Down Dog Abs': [false, false, false],
        'Russian Twist': [false, false, false],
        'Side Plank with Leg Lift': [false, false, false],
        'Butterfly Sit-up': [false, false, false],
      }
    },
    'Day 5 - Lower Body & Shoulders': {
      'Circuit 1': {
        'Jump Squat': [false, false, false],
        'Wood Chop': [false, false, false],
        'Split Jump': [false, false, false],
        'Lateral Raise': [false, false, false],
        'Weighted Lunge': [false, false, false],
      }
    }
  };

  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [selectedDay, setSelectedDay] = useState(Object.keys(workouts)[0]);
  const [expandedExercise, setExpandedExercise] = useState(null);

  const toggleSet = (exercise, setIndex) => {
    setWorkouts(prev => {
      const newWorkouts = { ...prev };
      const sets = [...newWorkouts[selectedDay]['Circuit 1'][exercise]];
      sets[setIndex] = !sets[setIndex];
      newWorkouts[selectedDay]['Circuit 1'][exercise] = sets;
      return newWorkouts;
    });
  };

  const resetDay = () => {
    setWorkouts(prev => {
      const newWorkouts = { ...prev };
      Object.keys(newWorkouts[selectedDay]['Circuit 1']).forEach(exercise => {
        newWorkouts[selectedDay]['Circuit 1'][exercise] = [false, false, false];
      });
      return newWorkouts;
    });
  };

  const calculateDayProgress = (day) => {
    const exercises = workouts[day]['Circuit 1'];
    const totalSets = Object.values(exercises).reduce((acc, sets) => acc + sets.length, 0);
    const completedSets = Object.values(exercises).reduce((acc, sets) => acc + sets.filter(set => set).length, 0);
    return (completedSets / totalSets) * 100;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Workout Tracker</h1>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
          {Object.keys(workouts).map(day => (
            <Card key={day} className="overflow-hidden">
              <div
                className={`p-2 cursor-pointer ${
                  selectedDay === day ? 'bg-blue-600 text-white' : 'bg-gray-100'
                }`}
                onClick={() => setSelectedDay(day)}
              >
                <div className="font-medium">{day.split(' - ')[0]}</div>
                <div className="text-sm">{Math.round(calculateDayProgress(day))}% Complete</div>
                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div
                    className="bg-green-500 h-full rounded"
                    style={{ width: `${calculateDayProgress(day)}%` }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{selectedDay}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(workouts[selectedDay]['Circuit 1']).map(([exercise, sets]) => (
                <div key={exercise} className="border p-4 rounded-lg">
                  <div 
                    className="cursor-pointer"
                    onClick={() => setExpandedExercise(expandedExercise === exercise ? null : exercise)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <span className="font-medium text-lg">{exercise}</span>
                        <div className="text-sm text-gray-500">
                          45 seconds work, 15 seconds rest
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {sets.map((isComplete, index) => (
                          <div
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSet(exercise, index);
                            }}
                            className={`w-8 h-8 flex items-center justify-center rounded cursor-pointer ${
                              isComplete ? 'bg-green-500 text-white' : 'bg-gray-200'
                            }`}
                          >
                            {isComplete && <span>✓</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                    {expandedExercise === exercise && (
                      <div className="mt-2 text-gray-600 bg-gray-50 p-3 rounded">
                        {exerciseDescriptions[exercise]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <button
        onClick={resetDay}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Reset Day
      </button>

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">Workout Notes:</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Complete 3 rounds of each circuit</li>
          <li>45 seconds per exercise, 15 seconds rest between exercises</li>
          <li>1 minute rest between rounds</li>
          <li>Start with 5 minutes warm-up</li>
          <li>End with 3-5 minutes stretching</li>
        </ul>
      </div>
    </div>
  );
};

export default WorkoutTracker;
