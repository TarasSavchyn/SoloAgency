import './advices-page.scss';
import { Advices } from '../../components/Advices';
import { AddAdvice } from '../../components/AddAdvice';
import { useAppSelector } from '../../app/hooks';

export const AdvicesPage = () => {
  const { user } = useAppSelector(state => state.auth.authData);

  return (
    <div className="advices-page">
      <Advices relPage="advices-page" />

      {user?.is_staff && <AddAdvice relPage="advices-page" />}
    </div>
  );
};
