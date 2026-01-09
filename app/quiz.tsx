import { ScreenContainer } from "@/components/screen-container";
import { QuizFlow } from "@/components/quiz-flow";
import { useRouter } from "expo-router";
import type { QuizFilters } from "@/types/school";

export default function QuizScreen() {
  const router = useRouter();

  const handleQuizComplete = (filters: QuizFilters) => {
    const params = new URLSearchParams();
    
    if (filters.level) params.set("level", filters.level);
    if (filters.district) params.set("district", filters.district);
    if (filters.category) params.set("category", filters.category);
    if (filters.curriculum) params.set("curriculum", filters.curriculum);
    if (filters.language) params.set("language", filters.language);
    if (filters.tuitionRange) {
      params.set("tuitionMin", filters.tuitionRange.min.toString());
      params.set("tuitionMax", filters.tuitionRange.max.toString());
    }

    router.push(`/recommendation?${params.toString()}`);
  };

  return (
    <ScreenContainer edges={["top", "left", "right"]}>
      <QuizFlow onComplete={handleQuizComplete} />
    </ScreenContainer>
  );
}
