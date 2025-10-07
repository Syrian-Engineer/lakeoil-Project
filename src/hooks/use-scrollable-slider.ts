// 'use client';

// import { useEffect, useRef } from 'react';

// export function useScrollableSlider() {
//   const sliderEl = useRef<HTMLDivElement>(null!);
//   const sliderPrevBtn = useRef<HTMLButtonElement>(null!);
//   const sliderNextBtn = useRef<HTMLButtonElement>(null!);

//   function scrollToTheRight() {
//     let offsetWidth = sliderEl.current.offsetWidth;
//     sliderEl.current.scrollLeft += offsetWidth / 2;
//     sliderPrevBtn.current.classList.remove('opacity-0', 'invisible');
//   }

//   function scrollToTheLeft() {
//     let offsetWidth = sliderEl.current.offsetWidth;
//     sliderEl.current.scrollLeft -= offsetWidth / 2;
//     sliderNextBtn.current.classList.remove('opacity-0', 'invisible');
//   }

//   useEffect(() => {
//     const filterBarEl = sliderEl.current;
//     const prevBtn = sliderPrevBtn.current;
//     const nextBtn = sliderNextBtn.current;
//     const formPageHeaderEl = filterBarEl.classList.contains(
//       'formPageHeaderSliderElJS'
//     );
//     initNextPrevBtnVisibility();

//     // @ts-ignore
//     function initNextPrevBtnVisibility() {
//       let offsetWidth = filterBarEl.offsetWidth;
//       let scrollWidth = filterBarEl.scrollWidth;
//       // show next btn when scrollWidth is gather than offsetWidth
//       if (scrollWidth > offsetWidth) {
//         nextBtn?.classList.remove('opacity-0', 'invisible');
//         if (formPageHeaderEl) {
//           filterBarEl?.classList.add('!-mb-[43px]');
//         }
//       } else {
//         nextBtn?.classList.add('opacity-0', 'invisible');
//         if (formPageHeaderEl) {
//           filterBarEl?.classList.remove('!-mb-[43px]');
//         }
//       }
//       // hide prev btn initially
//       prevBtn?.classList.add('opacity-0', 'invisible');
//     }

//     function visibleNextAndPrevBtnOnScroll() {
//       let newScrollLeft = filterBarEl?.scrollLeft,
//         offsetWidth = filterBarEl?.offsetWidth,
//         scrollWidth = filterBarEl?.scrollWidth;
//       // reach to the right end
//       if (scrollWidth - newScrollLeft == offsetWidth) {
//         nextBtn?.classList.add('opacity-0', 'invisible');
//         prevBtn?.classList.remove('opacity-0', 'invisible');
//       } else {
//         nextBtn?.classList.remove('opacity-0', 'invisible');
//       }
//       // reach to the left end
//       if (newScrollLeft === 0) {
//         prevBtn?.classList.add('opacity-0', 'invisible');
//         nextBtn?.classList.remove('opacity-0', 'invisible');
//       } else {
//         prevBtn?.classList.remove('opacity-0', 'invisible');
//       }
//     }

//     window.addEventListener('resize', initNextPrevBtnVisibility);
//     filterBarEl.addEventListener('scroll', visibleNextAndPrevBtnOnScroll);
//     // clear event
//     return () => {
//       window.removeEventListener('resize', initNextPrevBtnVisibility);
//       filterBarEl.removeEventListener('scroll', visibleNextAndPrevBtnOnScroll);
//     };
//   }, []);

//   return {
//     sliderEl,
//     sliderPrevBtn,
//     sliderNextBtn,
//     scrollToTheRight,
//     scrollToTheLeft,
//   };
// }



'use client';

import { useEffect, useRef } from 'react';

export function useScrollableSlider() {
  const sliderEl = useRef<HTMLDivElement | null>(null);
  const sliderPrevBtn = useRef<HTMLButtonElement | null>(null);
  const sliderNextBtn = useRef<HTMLButtonElement | null>(null);

  function scrollToTheRight() {
    if (!sliderEl.current || !sliderPrevBtn.current) return;
    const offsetWidth = sliderEl.current.offsetWidth;
    sliderEl.current.scrollLeft += offsetWidth / 2;
    sliderPrevBtn.current.classList.remove('opacity-0', 'invisible');
  }

  function scrollToTheLeft() {
    if (!sliderEl.current || !sliderNextBtn.current) return;
    const offsetWidth = sliderEl.current.offsetWidth;
    sliderEl.current.scrollLeft -= offsetWidth / 2;
    sliderNextBtn.current.classList.remove('opacity-0', 'invisible');
  }

  useEffect(() => {
    const filterBarEl = sliderEl.current;
    const prevBtn = sliderPrevBtn.current;
    const nextBtn = sliderNextBtn.current;

    // ✅ Abort if refs not yet attached
    if (!filterBarEl || !prevBtn || !nextBtn) return;

    const formPageHeaderEl = filterBarEl.classList.contains('formPageHeaderSliderElJS');

    function initNextPrevBtnVisibility() {
      if (!filterBarEl || !prevBtn || !nextBtn) return;

      const offsetWidth = filterBarEl.offsetWidth;
      const scrollWidth = filterBarEl.scrollWidth;

      // show next btn when scrollWidth is greater than offsetWidth
      if (scrollWidth > offsetWidth) {
        nextBtn.classList.remove('opacity-0', 'invisible');
        if (formPageHeaderEl) {
          filterBarEl.classList.add('!-mb-[43px]');
        }
      } else {
        nextBtn.classList.add('opacity-0', 'invisible');
        if (formPageHeaderEl) {
          filterBarEl.classList.remove('!-mb-[43px]');
        }
      }

      // hide prev btn initially
      prevBtn.classList.add('opacity-0', 'invisible');
    }

    function visibleNextAndPrevBtnOnScroll() {
      if (!filterBarEl || !prevBtn || !nextBtn) return;

      const newScrollLeft = filterBarEl.scrollLeft;
      const offsetWidth = filterBarEl.offsetWidth;
      const scrollWidth = filterBarEl.scrollWidth;

      // reach to the right end
      if (scrollWidth - newScrollLeft === offsetWidth) {
        nextBtn.classList.add('opacity-0', 'invisible');
        prevBtn.classList.remove('opacity-0', 'invisible');
      } else {
        nextBtn.classList.remove('opacity-0', 'invisible');
      }

      // reach to the left end
      if (newScrollLeft === 0) {
        prevBtn.classList.add('opacity-0', 'invisible');
        nextBtn.classList.remove('opacity-0', 'invisible');
      } else {
        prevBtn.classList.remove('opacity-0', 'invisible');
      }
    }

    // Initialize visibility
    initNextPrevBtnVisibility();

    // Attach listeners
    window.addEventListener('resize', initNextPrevBtnVisibility);
    filterBarEl.addEventListener('scroll', visibleNextAndPrevBtnOnScroll);

    // Cleanup
    return () => {
      window.removeEventListener('resize', initNextPrevBtnVisibility);
      filterBarEl.removeEventListener('scroll', visibleNextAndPrevBtnOnScroll);
    };
  }, []);

  return {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  };
}
