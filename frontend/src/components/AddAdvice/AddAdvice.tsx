import { useState } from 'react';
import { NewAdvice } from '../../types/Advice';
import * as advicesActions from '../../features/advicesSlice';
import { useAppDispatch } from '../../app/hooks';
import './add-advice.scss';

export const AddAdvice = () => {
  const dispatch = useAppDispatch();
  const [newAdvice, setNewAdvice] = useState<NewAdvice>({
    question: '',
    answer: '',
    priority: 5,
  });

  const handleAdd = async () => {
    await dispatch(advicesActions.add(newAdvice));

    setNewAdvice(newAdvice);
  };

  return (
    <form onSubmit={handleAdd}>
      <input
        type="text"
        placeholder="Question"
        value={newAdvice.question}
        onChange={event =>
          setNewAdvice(state => ({
            ...state,
            question: event.target.value,
          }))
        }
      />
      <input
        type="text"
        placeholder="Answer"
        value={newAdvice.answer}
        onChange={event =>
          setNewAdvice(state => ({
            ...state,
            answer: event.target.value,
          }))
        }
      />
      <button>Add</button>
    </form>
  );
};
