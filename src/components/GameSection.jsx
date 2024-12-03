import { useState } from 'react';

const GameSection = () => {
    //settaggio parola usata
    const [word, setWord] = useState('');
    //settaggio difficoltà
    const [difficult, setdifficult] = useState(5);
    //settaggio conto dei tentativi
    const [count, setCount] = useState(0);
    //settaggio array per le parole usate
    const [tryWord, setTryWord] = useState([]);

    //cambiambento dinamico della variabile word
    const handlerWord = (e) => {
        setWord(e.target.value);
    };

    //invio della parola al click del pulsante
    const sendWord = () => {
        //controllo della parola
        if (word.length === 5) {
            //puscho la parola nell'array manenendo l'array precedente con lo spread operator
            setTryWord((prevTryWord) => [...prevTryWord, word]);
            setWord('');
            //incremento il numero di tentativi
            setCount((prevCount) => prevCount + 1);
        } else {
            console.log('errore');
        }
    };

    return (
        <div>
            <input
                type="text"
                onChange={handlerWord}
                value={word}
                maxLength={5}
            />
            <button
                type="button"
                className="p-2 border-2 border-red-700"
                onClick={sendWord}
            >
                Invia
            </button>
            <p>tentativi: {count}</p>
            <p>Parole usate: {JSON.stringify(tryWord)}</p>
            {Array.from({ length: 5 }, (_, index) => {
                return (
                    <section
                        key={index}
                        className="container flex justify-between mt-10"
                    >
                        {Array.from({ length: difficult }, (_, index) => {
                            return (
                                <div
                                    key={index}
                                    className="w-1/5 aspect-square mx-2 text-center border-2 border-white"
                                >
                                    <p>{word[index]}</p>
                                </div>
                            );
                        })}
                    </section>
                );
            })}
        </div>
    );
};

export default GameSection;
