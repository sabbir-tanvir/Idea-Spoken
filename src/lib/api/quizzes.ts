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
  count?: number;
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

interface QuizResultAttempt {
  userAnswer?: string;
  isCorrect: boolean;
  pointsEarned?: number;
  quizId: number;
  quiz?: {
    id: number;
    question?: string;
    options?: string[];
    correctAnswer?: string;
    point?: number;
    lessonId?: number;
  };
}

interface QuizResultsApiPayload {
  success: boolean;
  message?: string;
  count?: number;
  data?: QuizResultAttempt[];
}

export async function getQuizzesByLesson(lessonId: number): Promise<ApiQuiz[]> {
  try {
    const response = await fetch(`/api/quizzes/lesson/${lessonId}`, {
      cache: "no-store",
    });

    if (!response.ok) return [];

    const payload = await response.json();
    if (Array.isArray(payload)) return payload as ApiQuiz[];

    if (payload?.success) {
      if (Array.isArray(payload.data)) return payload.data as ApiQuiz[];
      if (payload.data?.quizzes && Array.isArray(payload.data.quizzes)) {
        return payload.data.quizzes as ApiQuiz[];
      }
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch quizzes by lesson:", error);
    return [];
  }
}

export async function submitQuizAnswer(quizId: number, userAnswer: string) {
  try {
    const response = await fetch(`/api/quizzes/${quizId}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userAnswer }),
    });

    const data: QuizSubmitResponse = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error("Failed to submit quiz answer:", error);
    return {
      ok: false,
      data: {
        success: false,
        message: "Failed to submit quiz answer",
      } as QuizSubmitResponse,
    };
  }
}

export async function getQuizResults(lessonId: number) {
  try {
    const response = await fetch(`/api/quizzes/results/lesson/${lessonId}`, {
      method: "GET",
      cache: "no-store",
    });

    const payload: QuizResultsApiPayload = await response.json();
    if (!response.ok || !payload.success) {
      return {
        ok: false,
        data: {
          success: false,
          message: payload.message ?? "Failed to fetch quiz results",
        } as QuizResultResponse,
      };
    }

    const attempts = payload.data ?? [];
    const answers = attempts.map((attempt) => ({
      quizId: attempt.quizId,
      isCorrect: attempt.isCorrect,
      userAnswer: attempt.userAnswer,
      correctAnswer: attempt.quiz?.correctAnswer,
    }));

    const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
    const earnedPoints = attempts.reduce((sum, attempt) => sum + (attempt.pointsEarned ?? 0), 0);
    const totalPoints = attempts.reduce(
      (sum, attempt) => sum + (attempt.quiz?.point ?? 0),
      0
    );

    const data: QuizResultResponse = {
      success: true,
      count: payload.count,
      data: {
        lessonId,
        totalQuestions: answers.length,
        correctAnswers,
        earnedPoints,
        totalPoints,
        answers,
      },
    };

    return { ok: true, data };
  } catch (error) {
    console.error("Failed to fetch quiz results:", error);
    return {
      ok: false,
      data: {
        success: false,
        message: "Failed to fetch quiz results",
      } as QuizResultResponse,
    };
  }
}
