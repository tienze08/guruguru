import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

export default function Quiz() {
  const courseTitle = 'React Native Fundamentals'; // Tên khóa học

  const questions = [
    {
      id: 1,
      question: 'What is React Native?',
      options: ['A framework for web development', 'A mobile development framework', 'A programming language', 'A database system'],
      correctAnswer: 'A mobile development framework',
    },
    {
      id: 2,
      question: 'Which language is used in React Native?',
      options: ['Java', 'Swift', 'JavaScript', 'Python'],
      correctAnswer: 'JavaScript',
    },
    {
      id: 3,
      question: 'What is used for navigation in React Native?',
      options: ['React Router', 'React Navigation', 'Redux', 'Express'],
      correctAnswer: 'React Navigation',
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelection = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.courseTitle}>{courseTitle}</Text>
      <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
      {quizCompleted ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>🎉 Quiz Completed!</Text>
          <Text style={styles.resultScore}>Your Score: {score} / {questions.length}</Text>
        </View>
      ) : (
        <View style={styles.quizBox}>
          <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <Pressable
              key={index}
              style={[
                styles.optionButton,
                selectedOption === option ? styles.selectedOption : null
              ]}
              onPress={() => handleAnswerSelection(option)}
            >
              <Text style={[styles.optionText, selectedOption === option ? styles.selectedOptionText : null]}>
                {option}
              </Text>
            </Pressable>
          ))}
          <Pressable
            style={[styles.nextButton, selectedOption ? styles.nextButtonActive : styles.nextButtonDisabled]}
            onPress={handleNextQuestion}
            disabled={selectedOption === null}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 15,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  quizBox: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  optionButton: {
    width: '100%',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    transition: '0.2s',
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
    borderColor: '#388E3C',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nextButton: {
    width: '100%',
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonActive: {
    backgroundColor: '#007BFF',
  },
  nextButtonDisabled: {
    backgroundColor: '#B0BEC5',
  },
  nextButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  resultScore: {
    fontSize: 20,
    color: '#333',
  },
});
