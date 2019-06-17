import { useEffect, useRef } from 'react';

const useInterval = (callback, delay = null) => {
  // const [count, setCount] = useState(0)
  const savedCallback = useRef();
  // After every render, save the latest callback into our ref.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.
  useEffect(() => {
    const handler = () => savedCallback.current();
    if (delay !== null) {
      // setCount(count + 1)
      let id = setInterval(handler, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
