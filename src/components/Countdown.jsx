import { useState, useEffect } from 'react';

const Countdown = () => {
  const getTargetDate = () => {
    const now = new Date();
    return new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000); // 3 days from now
  };

  const [targetDate, setTargetDate] = useState(getTargetDate());
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;

      if (timeLeft <= 0) {
        setTargetDate(getTargetDate()); // Reset countdown
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="sales-countdown w-100 py-1 bg-secondary text-center text-dark text-uppercase fw-semibold">
      <p>
        <i className="bi bi-tags-fill pe-1"></i>
        <span className="pe-1">Get 20% OFF Special Sales in</span>
        <span>{timeLeft}</span>
      </p>
    </section>
  );
};

export default Countdown;
