import Forms from "./form";
import { preload, secQuestions } from "./preload";

async function SecurityQuestion(props: { userId: string }) {
    const answers = await preload(props.userId);
    const questions = await secQuestions();
    return <Forms questions={questions} answers={answers} userid={props.userId} />;
}

export default SecurityQuestion;
