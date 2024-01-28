import { useSearchParams } from 'react-router-dom';
import { Project } from '../Project';
import { useEffect } from 'react';
import { getSearchWith } from '../../helpers/getSearchWith';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as portfolioActions from '../../features/portfolioSlice';
import { Loader } from '../Loader';
import { LoaderElement } from '../../types/LoaderElement';
import { Errors } from '../Errors';
import { Pagination } from '../Pagination';
import { useScrollToRef } from '../../customHooks/useScrollToRef';
import './portfolio.scss';

type Props = {
  relPage: string;
};

export const Portfolio: React.FC<Props> = ({ relPage }) => {
  const dispatch = useAppDispatch();
  const {
    portfolio: {
      results: projects,
      num_pages,
      current_page,
      next_page,
      previous_page,
    },
    hasLoaded,
    isLoadingPortfolio,
    errorsLoadingPortfolio,
  } = useAppSelector(state => state.portfolio);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || null;
  const query = searchParams.get('title') || null;

  useEffect(() => {
    const timerId = setTimeout(() => {
      const params = getSearchWith({ page }, searchParams);

      dispatch(portfolioActions.init(params ? `?${params}` : ''));
    }, 300);

    return () => clearTimeout(timerId);
  }, [page]);

  useEffect(() => {
    const params = getSearchWith({ query }, searchParams);

    dispatch(portfolioActions.init(params ? `?${params}` : ''));
  }, [query]);

  const sectionRef = useScrollToRef([page]);

  return (
    <section className={`${relPage}__portfolio portfolio`} ref={sectionRef}>
      <h1 className="portfolio__title">Реалізовані проекти</h1>

      {errorsLoadingPortfolio && (
        <Errors className="portfolio__errors" errors={errorsLoadingPortfolio} />
      )}

      {isLoadingPortfolio && (
        <Loader className="portfolio__loader" element={LoaderElement.Block} />
      )}

      {!!projects.length && !errorsLoadingPortfolio && (
        <div className="portfolio__projects">
          {projects.map(project => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      )}

      {hasLoaded && !projects.length && !errorsLoadingPortfolio && (
        <p className="portfolio__no-results">Нічого не знайдено</p>
      )}

      {num_pages > 1 && (
        <Pagination
          config={{ num_pages, current_page, next_page, previous_page }}
        />
      )}
    </section>
  );
};
