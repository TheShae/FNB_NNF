import React from 'react';
import EventsFeed from '../components/EventsFeed';

export default function EventsPage({ events }) {
  return (
    <div className="container">
      <EventsFeed events={events} />
    </div>
  );
}
