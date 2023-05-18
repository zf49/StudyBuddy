import { useEffect, useState } from 'react';

function TestRoll() {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
        <>{console.log(isBottom)}</>
      <div style={{ height: '100px' }}>xxxxx</div>
    </div>
  );
}

export default TestRoll;
