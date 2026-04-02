import mockQuizzes from "@/lib/api/mock/quizzes.json";

export interface ApiQuiz {
  id: number;
  lessonId: number;
  question: string;
  options: string[];
  correctAnswer?: string;
  videoCheckpoint?: number;
  point?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface QuizSubmitResponse {
  success: boolean;
  message?: string;
  data?: {
    quizId: number;
    lessonId: number;
    userAnswer: string;
    correctAnswer?: string;
    isCorrect: boolean;
  };
}

interface QuizResultResponse {
  success: boolean;
  message?: string;
  data?: {
    lessonId: number;
    totalQuestions: number;
    correctAnswers: number;
    earnedPoints: number;
    totalPoints: number;
    answers: Array<{
      quizId: number;
      isCorrect: boolean;
      userAnswer?: string;
      correctAnswer?: string;
    }>;
  };
}

interface MockQuizListResponse {
  success: boolean;
  message: string;
  count: number;
  data: ApiQuiz[];
}

const mockDb = mockQuizzes as MockQuizListResponse;
const answerStore = new Map<number, string>();

function getMockQuizzesByLessonId(lessonId: number): ApiQuiz[] {
  return mockDb.data.filter((quiz) => quiz.lessonId === lessonId);
}

export async function getQuizzesByLesson(lessonId: number): Promise<ApiQuiz[]> {
  return getMockQuizzesByLessonId(lessonId);
}

export async function submitQuizAnswer(quizId: number, userAnswer: string) {
  const quiz = mockDb.data.find((q) => q.id === quizId);
  if (!quiz) {
    return { ok: false, data: { success: false, message: "Quiz not found" } as QuizSubmitResponse };
  }

  answerStore.set(quizId, userAnswer);
  const isCorrect = quiz.correctAnswer === userAnswer;
  const data: QuizSubmitResponse = {
    success: true,
    message: isCorrect ? "Answer recorded" : "Answer recorded",
    data: {
      quizId,
      lessonId: quiz.lessonId,
      userAnswer,
      correctAnswer: quiz.correctAnswer,
      isCorrect,
    },
  };

  return { ok: true, data };
}

export async function getQuizResults(lessonId: number) {
  const quizzes = getMockQuizzesByLessonId(lessonId);
  const answers = quizzes.map((quiz) => {
    const userAnswer = answerStore.get(quiz.id);
    const isCorrect = !!userAnswer && userAnswer === quiz.correctAnswer;
    return {
      quizId: quiz.id,
      isCorrect,
      userAnswer,
      correctAnswer: quiz.correctAnswer,
    };
  });

  const correctAnswers = answers.filter((a) => a.isCorrect).length;
  const totalPoints = quizzes.reduce((sum, quiz) => sum + (quiz.point ?? 0), 0);
  const earnedPoints = quizzes.reduce((sum, quiz) => {
    const answer = answers.find((a) => a.quizId === quiz.id);
    return sum + (answer?.isCorrect ? quiz.point ?? 0 : 0);
  }, 0);

  const data: QuizResultResponse = {
    success: true,
    message: "Quiz results generated",
    data: {
      lessonId,
      totalQuestions: quizzes.length,
      correctAnswers,
      earnedPoints,
      totalPoints,
      answers,
    },
  };

  return { ok: true, data };
}
