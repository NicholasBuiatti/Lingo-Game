import { useState } from 'react';

const GameSection = () => {
    const [word, setWord] = useState('');
    const [difficult, setdifficult] = useState(5);
    const [count, setCount] = useState(0);
    const [tryWord, setTryWord] = useState([]);

    const handlerWord = (e) => {
        setWord(e.target.value);
    };

    const sendWord = () => {
        if (word.length === 5) {
            setTryWord((prevTryWord) => [...prevTryWord, word]);
            setWord('');
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
