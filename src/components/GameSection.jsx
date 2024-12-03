import { useState } from 'react';

const GameSection = () => {
    const [word, setWord] = useState('');
    const [tryWord, setTryWord] = useState(5);

    const handlerWord = (e) => {
        setWord(e.target.value);
    };

    const sendWord = () => {
        if (word.length === 5) {
            console.log('parola accettata', word);
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
            <p>{word}</p>
            {Array.from({ length: tryWord }, (index) => {
                return (
                    <section
                        key={index}
                        className="container flex justify-between mt-10"
                    >
                        {Array.from({ length: 5 }, (index) => {
                            return (
                                <div
                                    key={index}
                                    className="w-1/5 aspect-square mx-2 text-center border-2 border-white"
                                >
                                    c
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
