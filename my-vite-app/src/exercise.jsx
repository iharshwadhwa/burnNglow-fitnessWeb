import React, { useState } from 'react';

const workoutLevels = ['Beginner', 'Intermediate', 'Advanced'];

// YouTube video IDs for each exercise
const exerciseVideos = {
  // Beginner Exercises
  "Jumping Jacks": "ipaN8xZmQXM",
  "Bodyweight Squats": "3fl7uYmiMVw",
  "Push-ups": "IODxDxX7oi4",
  "Mountain Climbers": "K3Xt4QH4b-U",
  "Lunges": "YSuIZ6CbOQs",
  "Plank": "j6WVxGJZv5Y",
  "High Knees": "d9kQK5Ds0wo",
  "Step-ups": "ScJ3l2oJwQw",
  "Lunge Jumps": "uLxOZrGgTwY",
  "Squat Pulses": "r1T4NkIxG8g",
  "Jump Rope": "1BZM2Vre5oc",
  "Bicycle Crunches": "9FGilxCbdz8",
  "Plank Twists": "1WvKUjhyw4k",
  "Sit-ups": "1fbU_MkV7NE",
  "Flutter Kicks": "ANVdMDaYRts",
  "Leg Raises": "JB2oyawG9KI",
  "Burpees": "dZgVxmf6jkA",
  "Skaters": "1fR3WlFyDIE",
  "Plank Jacks": "3jf6Almzxg4",
  "Plank to Push-up": "Xf9E3qDfl6w",
  "Tuck Jumps": "F0s4WZqXkCE",
  "Cardio Kickboxing": "XMxem5EgyJ8",
  "Speed Skaters": "1fR3WlFyDIE",
  "Jump Squats": "CVaEhXotL7M",
  "Yoga": "v7AYKMP6rOE",
  "Stretching": "g_tea8ZNk5A",
  "Jogging": "z_9o5aC3Ljk",
  "Breathing Exercises": "d3kQa5D5XLI",
  "Foam Rolling": "MhQqQ3j0J4Q",
  "Light Dance Cardio": "zloxHhLK2NQ",
  
  // Intermediate/Advanced Exercises
  "Goblet Squats": "v-mQmH1kqbg",
  "Dumbbell Deadlifts": "Fkzk_RqlYig",
  "Leg Press": "IZxyjW7MPJQ",
  "Lunges with Dumbbells": "D7KaRcUTQeE",
  "Leg Extensions": "YyvSfVjQeL0",
  "Standing Calf Raises": "JbyjNymZOt0",
  "Pull-ups": "eGo4IYlbE5g",
  "Lat Pulldown": "CAwf7n6Luuc",
  "Cable Rows": "GZbfZ1f4Jh8",
  "Barbell Shrugs": "NAqCVe2mwzM",
  "Dumbbell Shoulder Press": "qEwKCR5JCog",
  "Dumbbell Bicep Curls": "ykJmrZ5v0Oo",
  "Incline Dumbbell Press": "8iPEnn-ltC8",
  "Triceps Dips": "0326dyZYtcU",
  "Arnold Press": "3ml7BH7mNwQ",
  "Dumbbell Lateral Raise": "3VcKaXpzqRo",
  "Barbell Upright Row": "amCU-ziHITM",
  "Deadlifts": "1ZXobu7JvvE",
  "Chin-ups": "brhRXlOhsAM",
  "Rack Pulls": "HwPjUsYRO3g",
  "Dumbbell Rows": "BXnZ4UXVL_c",
  "Back Extensions": "ph3pddpKzzw",
  "Incline Bench Press": "SrqOu55lrYU",
  "Dumbbell Chest Press": "VmB1G1K7v94",
  "Cable Flys": "Iwe6AmxVf7o",
  "Chest Dips": "2z8JmcrW-As",
  "Dumbbell Pullover": "FK4rHfWKEac",
  "Russian Twists": "wkD8rjkodUI",
  "Plank Shoulder Taps": "3WfDkQq3m_4",
  "Wall Sit": "y-wV4Venusw",
  "Calf Raises": "JbyjNymZOt0",
  "Barbell Bench Press": "vcBig73ojpE",
  "Chest Fly": "Z57CtFmRMxA",
  "Dips": "2z8JmcrW-As",
  "Overhead Press": "qEwKCR5JCog",
  "Barbell Squats": "SW_C1A-rejs",
  "Leg Curl": "1Tq3Q5YU9Ys",
  "Barbell Row": "k1zatH-3aac",
  "Face Pulls": "rep-qVOkqgk",
  "Front Raise": "3VcKaXpzqRo",
  "Shrugs": "NAqCVe2mwzM",
  "HIIT Circuit": "twnH6fXhX9s",
  "Dance Cardio": "zloxHhLK2NQ",
  "Bodyweight Circuit": "twnH6fXhX9s",
  "Jump Lunges": "COpD5b_Dmoo",
  "Push-up to Plank": "Xf9E3qDfl6w",
  "Box Jumps": "F0s4WZqXkCE",
  "Calf Hops": "JbyjNymZOt0",
  "Heavy Squats": "SW_C1A-rejs",
  "Walking Lunges with Dumbbells": "D7KaRcUTQeE",
  "Romanian Deadlifts": "1ZXobu7JvvE",
  "Seated Row Machine": "GZbfZ1f4Jh8",
  "Military Press": "qEwKCR5JCog",
  "Bent-over Rows": "k1zatH-3aac",
  "T-bar Rows": "k1zatH-3aac",
  "Active Recovery": "v7AYKMP6rOE"
  
};

// Helper component to display exercise videos
const ExerciseVideoModal = ({ exercise, onClose }) => {
  if (!exercise) return null;

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const contentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '800px',
    width: '90%',
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={e => e.stopPropagation()}>
        <h3>{exercise.name}</h3>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
          <iframe
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            src={`https://www.youtube.com/embed/${exercise.video}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={exercise.name}
          />
        </div>
        <div style={{ marginTop: '15px' }}>
          <p><strong>Sets:</strong> {exercise.sets}</p>
          <p><strong>Reps/Duration:</strong> {exercise.reps}</p>
          <p><strong>Rest:</strong> {exercise.rest}</p>
        </div>
        <button 
          onClick={onClose}
          style={{
            marginTop: '15px',
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Add video property to each exercise in the workout plans
const addVideosToExercises = (plans) => {
  return Object.keys(plans).reduce((acc, level) => {
    acc[level] = Object.keys(plans[level]).reduce((days, day) => {
      days[day] = {
        weightLoss: plans[level][day].weightLoss.map(exercise => ({
          ...exercise,
          video: exerciseVideos[exercise.name] || 'dQw4w9WgXcQ'
        })),
        weightGain: plans[level][day].weightGain.map(exercise => ({
          ...exercise,
          video: exerciseVideos[exercise.name] || 'dQw4w9WgXcQ'
        }))
      };
      return days;
    }, {});
    return acc;
  }, {});
};

const workoutPlans = {
  // Your complete workoutPlans object goes here
  Beginner: {
    Monday: {
      weightLoss: [
        { name: "Jumping Jacks", sets: 3, reps: "30 sec", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"  },
        { name: "Bodyweight Squats", sets: 3, reps: "15", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Push-ups", sets: 3, reps: "10", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Mountain Climbers", sets: 3, reps: "30 sec", rest: "20 sec",videoUrl: "https://youtube.com/shorts/K3Xt4QH4b-U?feature=shared" },
        { name: "Lunges", sets: 3, reps: "12 each leg", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Plank", sets: 3, reps: "30 sec", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" }
      ],
      weightGain: [
        { name: "Bodyweight Squats", sets: 3, reps: "12", rest: "60 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Push-ups", sets: 3, reps: "8", rest: "60 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Lunges", sets: 3, reps: "10 each leg", rest: "60 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Dumbbell Rows", sets: 3, reps: "12", rest: "60 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Dumbbell Bench Press", sets: 3, reps: "10", rest: "90 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Deadlifts", sets: 3, reps: "8", rest: "90 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"}
      ]
    },
    Tuesday: {
      weightLoss: [
        { name: "High Knees", sets: 3, reps: "1 min", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Step-ups", sets: 3, reps: "12 each leg", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Lunge Jumps", sets: 3, reps: "12 each leg", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Squat Pulses", sets: 3, reps: "15", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Jump Rope", sets: 3, reps: "1 min", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Mountain Climbers", sets: 3, reps: "30 sec", rest: "20 sec" ,videoUrl: "https://youtube.com/shorts/K3Xt4QH4b-U?feature=shared"}
      ],
      weightGain: [
        { name: "Goblet Squats", sets: 3, reps: "12", rest: "90 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Dumbbell Deadlifts", sets: 3, reps: "10", rest: "90 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Leg Press", sets: 3, reps: "10", rest: "90 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Lunges with Dumbbells", sets: 3, reps: "10 each leg", rest: "60 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Leg Extensions", sets: 3, reps: "15", rest: "60 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Standing Calf Raises", sets: 3, reps: "15", rest: "30 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"}
      ]
    },
    Wednesday: {
      weightLoss: [
        { name: "Bicycle Crunches", sets: 3, reps: "30 sec", rest: "20 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Plank Twists", sets: 3, reps: "30 sec", rest: "20 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Sit-ups", sets: 3, reps: "15", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Flutter Kicks", sets: 3, reps: "30 sec", rest: "20 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Leg Raises", sets: 3, reps: "15", rest: "30 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Mountain Climbers", sets: 3, reps: "30 sec", rest: "20 sec" ,videoUrl: "https://youtube.com/shorts/K3Xt4QH4b-U?feature=shared"}
      ],
      weightGain: [
        { name: "Pull-ups (assisted if necessary)", sets: 3, reps: "8", rest: "90 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Lat Pulldown", sets: 3, reps: "12", rest: "60 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Cable Rows", sets: 3, reps: "12", rest: "60 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Barbell Shrugs", sets: 3, reps: "12", rest: "45 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Dumbbell Shoulder Press", sets: 3, reps: "10", rest: "90 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Dumbbell Bicep Curls", sets: 3, reps: "12", rest: "60 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"}
      ]
    },
    Thursday: {
      weightLoss: [
        { name: "Burpees", sets: 3, reps: "12", rest: "30 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Skaters", sets: 3, reps: "30 sec", rest: "20 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Plank Jacks", sets: 3, reps: "30 sec", rest: "20 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Jumping Jacks", sets: 3, reps: "1 min", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Mountain Climbers", sets: 3, reps: "30 sec", rest: "20 sec" ,videoUrl: "https://youtube.com/shorts/K3Xt4QH4b-U?feature=shared"},
        { name: "Plank to Push-up", sets: 3, reps: "10", rest: "30 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"}
      ],
      weightGain: [
        { name: "Dumbbell Bench Press", sets: 3, reps: "10", rest: "90 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Incline Dumbbell Press", sets: 3, reps: "10", rest: "90 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Triceps Dips", sets: 3, reps: "12", rest: "60 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Arnold Press", sets: 3, reps: "12", rest: "60 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Dumbbell Lateral Raise", sets: 3, reps: "15", rest: "30 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Barbell Upright Row", sets: 3, reps: "12", rest: "45 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" }
      ]
    },
    Friday: {
      weightLoss: [
        { name: "Tuck Jumps", sets: 3, reps: "15", rest: "30 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Jump Rope", sets: 3, reps: "1 min", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "High Knees", sets: 3, reps: "1 min", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Squat Pulses", sets: 3, reps: "15", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Mountain Climbers", sets: 3, reps: "30 sec", rest: "20 sec",videoUrl: "https://youtube.com/shorts/K3Xt4QH4b-U?feature=shared" },
        { name: "Burpees", sets: 3, reps: "15", rest: "30 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"}
      ],
      weightGain: [
        { name: "Deadlifts", sets: 3, reps: "8", rest: "90 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Chin-ups (assisted if necessary)", sets: 3, reps: "8", rest: "90 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Rack Pulls", sets: 3, reps: "8", rest: "90 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Barbell Shrugs", sets: 3, reps: "12", rest: "45 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Dumbbell Rows", sets: 3, reps: "12", rest: "60 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Back Extensions", sets: 3, reps: "20", rest: "45 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" }
      ]
    },
    Saturday: {
      weightLoss: [
        { name: "Cardio Kickboxing", sets: 3, reps: "5 mins", rest: "1 min",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Speed Skaters", sets: 3, reps: "30 sec", rest: "30 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Burpees", sets: 3, reps: "20", rest: "30 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Jump Squats", sets: 3, reps: "15", rest: "30 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Plank Jacks", sets: 3, reps: "30 sec", rest: "20 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Jumping Jacks", sets: 3, reps: "1 min", rest: "30 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"}
      ],
      weightGain: [
        { name: "Incline Bench Press", sets: 3, reps: "8", rest: "90 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Dumbbell Chest Press", sets: 3, reps: "10", rest: "90 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Cable Flys", sets: 3, reps: "15", rest: "45 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Chest Dips", sets: 3, reps: "12", rest: "60 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Dumbbell Pullover", sets: 3, reps: "12", rest: "60 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Push-ups", sets: 3, reps: "Max", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" }
      ]
    },
    Sunday: {
      weightLoss: [
        { name: "Yoga", sets: 1, reps: "30 mins", rest: "-" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Stretching", sets: 1, reps: "15 mins", rest: "-",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Jogging", sets: 1, reps: "30 mins", rest: "-" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Breathing Exercises", sets: 1, reps: "10 mins", rest: "-",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Foam Rolling", sets: 1, reps: "10 mins", rest: "-",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Light Dance Cardio", sets: 1, reps: "15 mins", rest: "-" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"}
      ],
      weightGain: [
        { name: "Stretching", sets: 1, reps: "15 mins", rest: "-",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Yoga", sets: 1, reps: "20 mins", rest: "-",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Walking", sets: 1, reps: "30 mins", rest: "-",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Foam Rolling", sets: 1, reps: "10 mins", rest: "-" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Breathing Exercises", sets: 1, reps: "10 mins", rest: "-" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Active Recovery", sets: 1, reps: "20 mins", rest: "-",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" }
      ]
    }
  },
  Intermediate: {
    Monday: {
      weightLoss: [
        { name: "Jumping Jacks", sets: 4, reps: "30 sec", rest: "15 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Mountain Climbers", sets: 4, reps: "30 sec", rest: "20 sec" ,videoUrl: "https://youtube.com/shorts/K3Xt4QH4b-U?feature=shared"},
        { name: "Push-ups", sets: 3, reps: "15", rest: "30 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Squats", sets: 3, reps: "20", rest: "30 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"},
        { name: "Plank", sets: 3, reps: "1 min", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "High Knees", sets: 4, reps: "30 sec", rest: "15 sec" ,videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"}
      ],
      weightGain: [
        { name: "Barbell Bench Press", sets: 4, reps: "10", rest: "90 sec" },
        { name: "Incline Dumbbell Press", sets: 4, reps: "12", rest: "60 sec" },
        { name: "Push-ups", sets: 3, reps: "Max", rest: "60 sec" },
        { name: "Chest Fly", sets: 3, reps: "15", rest: "45 sec" },
        { name: "Dips", sets: 3, reps: "10", rest: "60 sec" },
        { name: "Overhead Press", sets: 3, reps: "12", rest: "60 sec" }
      ]
    },
    Tuesday: {
      weightLoss: [
        { name: "Bodyweight Squats", sets: 4, reps: "20", rest: "30 sec" },
        { name: "Jump Squats", sets: 3, reps: "15", rest: "30 sec" },
        { name: "Step-Ups", sets: 3, reps: "12 each leg", rest: "30 sec" },
        { name: "Lunges", sets: 3, reps: "12 each leg", rest: "30 sec" },
        { name: "Wall Sit", sets: 3, reps: "1 min", rest: "30 sec" },
        { name: "Calf Raises", sets: 3, reps: "20", rest: "20 sec" }
      ],
      weightGain: [
        { name: "Barbell Squats", sets: 4, reps: "8-10", rest: "120 sec" },
        { name: "Leg Press", sets: 4, reps: "10", rest: "90 sec" },
        { name: "Lunges", sets: 3, reps: "12 each leg", rest: "60 sec" },
        { name: "Deadlifts", sets: 4, reps: "10", rest: "90 sec" },
        { name: "Leg Curl", sets: 3, reps: "12", rest: "60 sec" },
        { name: "Calf Raises", sets: 3, reps: "20", rest: "30 sec" }
      ]
    },
    Wednesday: {
      weightLoss: [
        { name: "Russian Twists", sets: 4, reps: "30 sec", rest: "20 sec" },
        { name: "Leg Raises", sets: 3, reps: "15", rest: "30 sec" },
        { name: "Plank Shoulder Taps", sets: 4, reps: "30 sec", rest: "20 sec" },
        { name: "Mountain Climbers", sets: 4, reps: "30 sec", rest: "20 sec" },
        { name: "Sit-ups", sets: 3, reps: "20", rest: "30 sec" },
        { name: "High Knees", sets: 4, reps: "30 sec", rest: "15 sec" }
      ],
      weightGain: [
        { name: "Pull-Ups", sets: 4, reps: "8-10", rest: "90 sec" },
        { name: "Lat Pulldown", sets: 4, reps: "10-12", rest: "60 sec" },
        { name: "Barbell Row", sets: 4, reps: "10", rest: "90 sec" },
        { name: "Face Pulls", sets: 3, reps: "15", rest: "45 sec" },
        { name: "Cable Rows", sets: 3, reps: "12", rest: "60 sec" },
        { name: "Dumbbell Shrugs", sets: 3, reps: "15", rest: "30 sec" }
      ]
    },
    Thursday: {
      weightLoss: [
        { name: "Burpees", sets: 3, reps: "15", rest: "30 sec" },
        { name: "Skaters", sets: 3, reps: "30 sec", rest: "20 sec" },
        { name: "High Knees", sets: 3, reps: "30 sec", rest: "15 sec" },
        { name: "Mountain Climbers", sets: 4, reps: "30 sec", rest: "20 sec" },
        { name: "Jumping Jacks", sets: 4, reps: "30 sec", rest: "15 sec" },
        { name: "Plank", sets: 3, reps: "1 min", rest: "30 sec" }
      ],
      weightGain: [
        { name: "Overhead Press", sets: 4, reps: "8-10", rest: "90 sec" },
        { name: "Arnold Press", sets: 3, reps: "10", rest: "60 sec" },
        { name: "Lateral Raise", sets: 3, reps: "15", rest: "30 sec" },
        { name: "Front Raise", sets: 3, reps: "12", rest: "30 sec" },
        { name: "Shrugs", sets: 3, reps: "15", rest: "30 sec" },
        { name: "Face Pulls", sets: 3, reps: "15", rest: "45 sec" }
      ]
    },
    Friday: {
      weightLoss: [
        { name: "Jump Rope", sets: 4, reps: "1 min", rest: "30 sec" },
        { name: "HIIT Circuit", sets: 4, reps: "5 mins", rest: "1 min" },
        { name: "Squat Jumps", sets: 4, reps: "15", rest: "30 sec" },
        { name: "Plank", sets: 3, reps: "1 min", rest: "30 sec" },
        { name: "Push-ups", sets: 3, reps: "15", rest: "30 sec" },
        { name: "Burpees", sets: 3, reps: "15", rest: "30 sec" }
      ],
      weightGain: [
        { name: "Deadlifts", sets: 4, reps: "6-8", rest: "120 sec" },
        { name: "Barbell Rows", sets: 4, reps: "10", rest: "90 sec" },
        { name: "Chin-Ups", sets: 3, reps: "Max", rest: "60 sec" },
        { name: "Cable Rows", sets: 3, reps: "12", rest: "60 sec" },
        { name: "Lat Pulldown", sets: 3, reps: "12", rest: "60 sec" },
        { name: "Back Extensions", sets: 3, reps: "15", rest: "45 sec" }
      ]
    },
    Saturday: {
      weightLoss: [
        { name: "Dance Cardio", sets: 4, reps: "5 mins", rest: "1 min" },
        { name: "Bodyweight Circuit", sets: 3, reps: "15 reps each", rest: "1 min" },
        { name: "Jump Squats", sets: 4, reps: "15", rest: "30 sec" },
        { name: "High Knees", sets: 4, reps: "30 sec", rest: "15 sec" },
        { name: "Step-Ups", sets: 3, reps: "12 each leg", rest: "30 sec" },
        { name: "Plank", sets: 3, reps: "1 min", rest: "30 sec" }
      ],
      weightGain: [
        { name: "Incline Bench Press", sets: 4, reps: "10", rest: "90 sec" },
        { name: "Dumbbell Press", sets: 4, reps: "10-12", rest: "60 sec" },
        { name: "Chest Dips", sets: 3, reps: "12", rest: "60 sec" },
        { name: "Lateral Raise", sets: 3, reps: "15", rest: "30 sec" },
        { name: "Cable Fly", sets: 3, reps: "12", rest: "60 sec" },
        { name: "Push-ups", sets: 3, reps: "Max", rest: "30 sec" }
      ]
    },
    Sunday: {
      weightLoss: [
        { name: "Yoga", sets: 1, reps: "30 mins", rest: "-" },
        { name: "Stretching", sets: 1, reps: "15 mins", rest: "-" },
        { name: "Breathing Exercises", sets: 1, reps: "10 mins", rest: "-" },
        { name: "Walking", sets: 1, reps: "30 mins", rest: "-" },
        { name: "Foam Rolling", sets: 1, reps: "10 mins", rest: "-" },
        { name: "Light Jog", sets: 1, reps: "10-15 mins", rest: "-" }
      ],
      weightGain: [
        { name: "Stretching", sets: 1, reps: "15 mins", rest: "-" },
        { name: "Foam Rolling", sets: 1, reps: "10 mins", rest: "-" },
        { name: "Light Bike Ride", sets: 1, reps: "20 mins", rest: "-" },
        { name: "Walking", sets: 1, reps: "30 mins", rest: "-" },
        { name: "Yoga", sets: 1, reps: "20 mins", rest: "-" },
        { name: "Breathing Exercises", sets: 1, reps: "10 mins", rest: "-" }
      ]
    }
  },
  Advanced: {
    Monday: {
      weightLoss: [
        { name: "Jump Lunges", sets: 4, reps: "20", rest: "30 sec" },
        { name: "Push-up to Plank", sets: 4, reps: "15", rest: "30 sec" },
        { name: "Mountain Climbers", sets: 4, reps: "30 sec", rest: "20 sec" },
        { name: "Burpees", sets: 3, reps: "15", rest: "30 sec" },
        { name: "Box Jumps", sets: 3, reps: "15", rest: "30 sec" },
        { name: "Plank Jacks", sets: 4, reps: "30 sec", rest: "20 sec" }
      ],
      weightGain: [
        { name: "Barbell Deadlifts", sets: 4, reps: "6-8", rest: "120 sec" },
        { name: "Weighted Pull-ups", sets: 4, reps: "8", rest: "90 sec" },
        { name: "Barbell Bench Press", sets: 4, reps: "8", rest: "90 sec" },
        { name: "Front Squats", sets: 3, reps: "10", rest: "90 sec" },
        { name: "Military Press", sets: 4, reps: "10", rest: "90 sec" },
        { name: "Bent-over Rows", sets: 3, reps: "10", rest: "60 sec" }
      ]
    },
    Tuesday: {
      weightLoss: [
        { name: "Jump Squats", sets: 4, reps: "15", rest: "30 sec" },
        { name: "Step-ups", sets: 4, reps: "15 each leg", rest: "30 sec" },
        { name: "Speed Skaters", sets: 4, reps: "30 sec", rest: "20 sec" },
        { name: "Wall Sit", sets: 3, reps: "1 min", rest: "30 sec" },
        { name: "Lunge Jumps", sets: 3, reps: "15 each leg", rest: "30 sec" },
        { name: "Calf Hops", sets: 4, reps: "20", rest: "20 sec" }
      ],
      weightGain: [
        { name: "Heavy Squats", sets: 5, reps: "6", rest: "150 sec" },
        { name: "Leg Press", sets: 4, reps: "10", rest: "90 sec" },
        { name: "Walking Lunges with Dumbbells", sets: 3, reps: "20 steps", rest: "60 sec" },
        { name: "Romanian Deadlifts", sets: 4, reps: "8", rest: "90 sec" },
        { name: "Standing Calf Raises", sets: 3, reps: "25", rest: "30 sec" },
        { name: "Leg Extensions", sets: 3, reps: "15", rest: "60 sec" }
      ]
    },
    Wednesday: {
      weightLoss: [
        { name: "Bicycle Crunches", sets: 4, reps: "30 sec", rest: "20 sec" },
        { name: "Plank Twists", sets: 3, reps: "30 sec", rest: "20 sec" },
        { name: "Sit-ups", sets: 4, reps: "20", rest: "30 sec" },
        { name: "Flutter Kicks", sets: 4, reps: "30 sec", rest: "20 sec" },
        { name: "Leg Raises", sets: 3, reps: "20", rest: "30 sec" },
        { name: "Mountain Climbers", sets: 4, reps: "30 sec", rest: "20 sec" }
      ],
      weightGain: [
        { name: "Weighted Pull-ups", sets: 4, reps: "8", rest: "90 sec" },
        { name: "Cable Rows", sets: 4, reps: "12", rest: "60 sec" },
        { name: "Lat Pulldown", sets: 3, reps: "12", rest: "60 sec" },
        { name: "Seated Row Machine", sets: 3, reps: "12", rest: "60 sec" },
        { name: "Face Pulls", sets: 3, reps: "15", rest: "45 sec" },
        { name: "Barbell Shrugs", sets: 3, reps: "15", rest: "30 sec" }
      ]
    },
    Thursday: {
      weightLoss: [
        { name: "HIIT Circuit", sets: 4, reps: "5 mins", rest: "1 min" },
        { name: "Burpees", sets: 3, reps: "20", rest: "30 sec" },
        { name: "Skaters", sets: 3, reps: "30 sec", rest: "20 sec" },
        { name: "Plank Jacks", sets: 4, reps: "30 sec", rest: "20 sec" },
        { name: "Jumping Jacks", sets: 4, reps: "1 min", rest: "30 sec" },
        { name: "Plank to Push-up", sets: 3, reps: "12", rest: "30 sec" }
      ],
      weightGain: [
        { name: "Overhead Press", sets: 4, reps: "8", rest: "90 sec" },
        { name: "Arnold Press", sets: 4, reps: "10", rest: "60 sec" },
        { name: "Dumbbell Lateral Raise", sets: 3, reps: "15", rest: "30 sec" },
        { name: "Barbell Upright Row", sets: 3, reps: "12", rest: "45 sec" },
        { name: "Face Pulls", sets: 3, reps: "15", rest: "45 sec" },
        { name: "Dumbbell Front Raise", sets: 3, reps: "12", rest: "30 sec" }
      ]
    },
    Friday: {
      weightLoss: [
        { name: "High Knees", sets: 4, reps: "1 min", rest: "30 sec",videoUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
        { name: "Tuck Jumps", sets: 3, reps: "15", rest: "30 sec" },
        { name: "Jump Rope", sets: 4, reps: "1 min", rest: "30 sec" },
        { name: "Jumping Jacks", sets: 3, reps: "1 min", rest: "30 sec" },
        { name: "Squat Pulses", sets: 3, reps: "20", rest: "30 sec" },
        { name: "Mountain Climbers", sets: 4, reps: "30 sec", rest: "20 sec" }
      ],
      weightGain: [
        { name: "Barbell Deadlifts", sets: 5, reps: "5", rest: "150 sec" },
        { name: "Rack Pulls", sets: 4, reps: "8", rest: "90 sec" },
        { name: "Chin-Ups", sets: 3, reps: "Max", rest: "60 sec" },
        { name: "T-bar Rows", sets: 3, reps: "10", rest: "60 sec" },
        { name: "Barbell Shrugs", sets: 3, reps: "15", rest: "30 sec" },
        { name: "Back Extensions", sets: 3, reps: "20", rest: "45 sec" }
      ]
    },
    Saturday: {
      weightLoss: [
        { name: "Cardio Kickboxing", sets: 4, reps: "5 mins", rest: "1 min" },
        { name: "Speed Skaters", sets: 4, reps: "30 sec", rest: "30 sec" },
        { name: "Bodyweight Circuit", sets: 3, reps: "15 each", rest: "1 min" },
        { name: "Burpees", sets: 3, reps: "20", rest: "30 sec" },
        { name: "Jump Squats", sets: 4, reps: "20", rest: "30 sec" },
        { name: "Plank Jacks", sets: 4, reps: "30 sec", rest: "20 sec" }
      ],
      weightGain: [
        { name: "Incline Bench Press", sets: 4, reps: "8", rest: "90 sec" },
        { name: "Dumbbell Chest Press", sets: 4, reps: "10", rest: "60 sec" },
        { name: "Cable Flys", sets: 3, reps: "15", rest: "45 sec" },
        { name: "Chest Dips", sets: 3, reps: "12", rest: "60 sec" },
        { name: "Dumbbell Pullover", sets: 3, reps: "12", rest: "60 sec" },
        { name: "Push-ups", sets: 3, reps: "Max", rest: "30 sec" }
      ]
    },
    Sunday: {
      weightLoss: [
        { name: "Yoga", sets: 1, reps: "30 mins", rest: "-" },
        { name: "Stretching", sets: 1, reps: "15 mins", rest: "-" },
        { name: "Jogging", sets: 1, reps: "30 mins", rest: "-" },
        { name: "Breathing Exercises", sets: 1, reps: "10 mins", rest: "-" },
        { name: "Foam Rolling", sets: 1, reps: "10 mins", rest: "-" },
        { name: "Light Dance Cardio", sets: 1, reps: "15 mins", rest: "-" }
      ],
      weightGain: [
        { name: "Stretching", sets: 1, reps: "15 mins", rest: "-" },
        { name: "Yoga", sets: 1, reps: "20 mins", rest: "-" },
        { name: "Walking", sets: 1, reps: "30 mins", rest: "-" },
        { name: "Foam Rolling", sets: 1, reps: "10 mins", rest: "-" },
        { name: "Breathing Exercises", sets: 1, reps: "10 mins", rest: "-" },
        { name: "Active Recovery", sets: 1, reps: "20 mins", rest: "-" }
      ]
    }
  }
};

const workoutPlansWithVideos = addVideosToExercises(workoutPlans);

const App = () => {
  const [selectedGoal, setSelectedGoal] = useState('weightLoss');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedLevel, setSelectedLevel] = useState('Beginner');
  const [selectedExercise, setSelectedExercise] = useState(null);

  const containerStyle = {
    backgroundImage: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
    minHeight: '100vh',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    marginBottom: '2rem',
    transition: 'all 0.3s ease-in-out',
  };

  const buttonStyle = {
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    margin: '5px',
    backgroundColor: '#f4f4f4',
    color: '#333',
    fontSize: '16px',
    fontWeight: '600',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: '#fff',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1.5rem',
  };

  const thStyle = {
    padding: '12px',
    backgroundColor: '#f4f4f4',
    textAlign: 'left',
    borderBottom: '2px solid #ccc',
  };

  const tdStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #eee',
  };

  const exerciseRowStyle = {
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const exerciseRowHoverStyle = {
    backgroundColor: '#f8f9fa',
  };

  const currentPlan = workoutPlansWithVideos[selectedLevel]?.[selectedDay]?.[selectedGoal] || [];

  return (
    <div style={containerStyle}>
      {selectedExercise && (
        <ExerciseVideoModal 
          exercise={selectedExercise} 
          onClose={() => setSelectedExercise(null)} 
        />
      )}
      
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1>🏋‍♂ 7-Day Workout Planner</h1>

          <div style={{ margin: '20px 0' }}>
            {workoutLevels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                style={selectedLevel === level ? activeButtonStyle : buttonStyle}
              >
                {level}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={() => setSelectedGoal('weightLoss')}
              style={selectedGoal === 'weightLoss' ? activeButtonStyle : buttonStyle}
            >
              Weight Loss Plan
            </button>
            <button
              onClick={() => setSelectedGoal('weightGain')}
              style={selectedGoal === 'weightGain' ? activeButtonStyle : buttonStyle}
            >
              Weight Gain Plan
            </button>
          </div>

          <div>
            {Object.keys(workoutPlansWithVideos[selectedLevel] || {}).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                style={selectedDay === day ? activeButtonStyle : buttonStyle}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <h3 style={{ textAlign: 'center', marginTop: '20px' }}>
          {selectedDay}'s Workout ({selectedLevel} - {selectedGoal === 'weightLoss' ? 'Weight Loss' : 'Weight Gain'})
        </h3>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Exercise</th>
              <th style={thStyle}>Sets</th>
              <th style={thStyle}>Reps/Duration</th>
              <th style={thStyle}>Rest</th>
            </tr>
          </thead>
          <tbody>
            {currentPlan.map((exercise, index) => (
              <tr 
                key={index}
                style={exerciseRowStyle}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = exerciseRowHoverStyle.backgroundColor}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}
                onClick={() => setSelectedExercise(exercise)}
              >
                <td style={tdStyle}>
                  {exercise.name} <span style={{ color: '#28a745', marginLeft: '5px' }}>▶️</span>
                </td>
                <td style={tdStyle}>{exercise.sets}</td>
                <td style={tdStyle}>{exercise.reps}</td>
                <td style={tdStyle}>{exercise.rest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={cardStyle}>
        <h4>💡 Tips for {selectedGoal === 'weightLoss' ? 'Weight Loss' : 'Weight Gain'}</h4>
        <ul>
          {selectedGoal === 'weightLoss' ? (
            <>
              <li>Maintain a caloric deficit of 500-750 calories per day</li>
              <li>Focus on high-intensity exercises with shorter rest periods</li>
              <li>Include both cardio and strength training for optimal results</li>
              <li>Stay hydrated and get adequate sleep</li>
            </>
          ) : (
            <>
              <li>Maintain a caloric surplus of 300-500 calories per day</li>
              <li>Focus on compound exercises with progressive overload</li>
              <li>Ensure adequate protein intake (1.6-2.2g per kg of body weight)</li>
              <li>Get 7-9 hours of quality sleep for optimal recovery</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;