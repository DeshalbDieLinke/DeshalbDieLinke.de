export default function QuestionAndAnswer(props: {question: string, answer: string}) {
    const { question, answer } = props;
    return (
        <details className="group py-4">
                <summary className="flex items-center justify-between font-medium list-none cursor-pointer">
                    <h5>{question}</h5>
                    <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"
                            width="24" className="dark:stroke-gray-400">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </span>
                </summary>
                <p className="mt-3 text-gray-600 group-open:animate-fadeIn">
                    {answer}
                </p>
        </details>

    );
}


// 
// Es ist relativ klar, dass Merz Kanzler wird, wenn nicht noch ein Wunder geschieht. Bereits jetzt zeigt sich aber, dass SPD und Grüne ihre Ideale schon vor der Wahl verraten, statt wie sonst erst danach. Habeck will die Ausgaben für die Bundeswehr auf 3,5% des BIP zu erhöhen. Das wären schätzungsweise rund 160 Milliarden Euro pro Jahr – die wir deutlich besser einsetzen könnten.<br> 
//                 Auch die SPD macht bereits Versprechen, für Merz Einschnitte beim Bürgergeld in Kauf zu nehmen. Damit feuert die SPD (wie sonst auch) gegen die Schwächsten der Gesellschaft, statt sich das Geld von denen zu holen, die viel zu viel haben.
//                 <br /> 
//                 Merz kann man also nicht verhindern – auch eine Verhandlungsposition steigert man durch die Wahl von SPD und Grünen nicht, wenn sie bereits vorab von ihrem Pfad abweichen.<br/> 
//                 Viel besser ist es, für eine starke Linke zu kämpfen: Merz braucht Opposition von links und im Bestfall eine Dreierkoalition aus Union, SPD und Grünen, denn in dieser müsste er mehr Kompromisse eingehen, als in einer Zweierkoalition.
