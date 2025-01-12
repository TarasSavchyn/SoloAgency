import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Errors, Loader, Pagination } from '../../../UX';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import * as eventTypesActions from '../../../../features/eventTypesSlice';
import { getSearchWith } from '../../../../helpers/getSearchWith';
import { LoaderElement } from '../../../../types/LoaderElement';
import { useScrollToRef } from '../../../../customHooks/useScrollToRef';
import './event-types.scss';

type Props = {
  relPage: string;
};

export const EventTypes: React.FC<Props> = ({ relPage }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || null;
  const dispatch = useAppDispatch();
  const { eventTypes, isLoadingEventTypes, errors } = useAppSelector(
    state => state.eventTypes,
  );
  const { num_pages, results } = eventTypes;

  useEffect(() => {
    const timerId = setTimeout(() => {
      const params = getSearchWith({ page }, searchParams);

      dispatch(eventTypesActions.init(params ? `?${params}` : ''));
    }, 300);

    return () => clearTimeout(timerId);
  }, [page]);

  const sectionRef = useScrollToRef([page]);

  return (
    <section className={`${relPage}__event-types event-types`} ref={sectionRef}>
      <h2 className="event-types__title">Більше послуг</h2>

      {isLoadingEventTypes && (
        <Loader className="event-types__loader" element={LoaderElement.Block} />
      )}

      {!!results.length && !errors && (
        <>
          <div className="event-types__events">
            {results.map(({ id, photo, name, description }) => (
              <article className="event-types__event" key={id}>
                <div className="event-types__event-image-wrapper">
                  <img
                    src={photo}
                    alt={name}
                    className="event-types__event-image"
                  />
                  <p className="event-types__event-description">
                    {description}
                  </p>
                </div>

                <h3 className="event-types__event-title">{name}</h3>
              </article>
            ))}
          </div>

          {num_pages > 1 && <Pagination config={eventTypes} />}
        </>
      )}

      {errors && <Errors className="event-types__errors" errors={errors} />}
    </section>
  );
};
