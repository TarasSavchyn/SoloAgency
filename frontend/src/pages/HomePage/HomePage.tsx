import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AddReview, CallRequest } from '../../components/sections/forms';
import {
  Articles,
  ContactUs,
  Hero,
  ReviewsSlider,
} from '../../components/sections/common';
import './home-page.scss';
import { scrollToTop } from '../../helpers/scrollToTop';
import { useAppSelector } from '../../app/hooks';

export const HomePage = () => {
  const { articles } = useAppSelector(state => state.articles);
  const location = useLocation();
  const contactsRef = useRef<HTMLElement>(null);

  const scrollToContacts = () => {
    if (articles) {
      contactsRef.current?.scrollIntoView();
    }
  };

  useEffect(() => {
    location.state === 'contacts' ? scrollToContacts() : scrollToTop();
  }, [location.key, articles]);

  return (
    <div className="home-page">
      <Hero relPage="home-page" onCallRequest={scrollToContacts} />

      <Articles relPage="home-page" />

      <section className="home-page__contacts" id="contacts" ref={contactsRef}>
        <h1 className="home-page__contacts-title">Наші контакти</h1>

        <div className="home-page__contacts-content">
          <CallRequest relPage="home-page" />

          <ContactUs relPage="home-page" />
        </div>
      </section>

      <section className="home-page__reviews">
        <h1 className="home-page__reviews-title">Що говорять про нас?</h1>

        <ReviewsSlider />
      </section>

      <AddReview relPage="home-page" />
    </div>
  );
};
