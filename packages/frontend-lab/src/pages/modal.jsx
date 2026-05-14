import { useEffect, useRef, useState } from 'react'

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef()
  function handleModalState() {
    setIsOpen((prevState) => !prevState)
  }
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        handleModalState()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])
  useEffect(() => {
    if (isOpen) {
      ref.current?.focus()
      const focusableEls = ref.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstEle = focusableEls[0]
      const lastEle = focusableEls[focusableEls.length - 1]

      function handleTab(e) {
        if (e.key !== 'Tab') return // add this line
        if (e.shiftKey) {
          if (document.activeElement === firstEle) {
            e.preventDefault()
            lastEle.focus()
          }
        } else {
          if (document.activeElement === lastEle) {
            e.preventDefault()
            firstEle.focus()
          }
        }
      }

      window.addEventListener('keydown', handleTab)
      return () => window.removeEventListener('keydown', handleTab)
    }
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <div
          onClick={handleModalState}
          className='flex fixed z-50 bg-black/70 min-h-screen min-w-screen justify-center items-center'
        >
          <div
            ref={ref}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className='bg-white h-100 w-200 overflow-scroll rounded-sm flex flex-col items-center  px-4 py-2'
          >
            <div>
              <button className='bg-pink-400 text-pink-800 px-4 py-2 rounded-sm text-sm '>
                Test Focus
              </button>
            </div>
            <p>
              1. This is a classic senior frontend interview question that tests
              whether you understand browser accessibility and UX fundamentals,
              not just React syntax. What you're being asked to build A Modal
              dialog with four specific behaviors: 1. Focus Trap When the modal
              opens, keyboard focus must stay inside it. Tab and Shift+Tab
              should cycle through only the focusable elements within the modal
              — they must not reach elements behind it. This is both a UX and
              accessibility (WCAG) requirement. 2. ESC to close Pressing the
              Escape key should close the modal. This is standard browser/OS
              behavior users expect from any dialog. 3. Click-outside to close
              Clicking on the backdrop/overlay (the dimmed area outside the
              modal box) should close it. Clicking inside the modal should not
              close it. 4. Scroll lock When the modal is open, the page behind
              it should not scroll. The body scroll position should be frozen,
              and restored exactly when the modal closes. Why this is a "senior
              filter" These four features test specific knowledge: Feature What
              it tests Focus trap DOM traversal, querySelectorAll with focusable
              selectors, keydown event handling, tabIndex ESC Global event
              listeners, cleanup on unmount Click-outside Event bubbling vs.
              target vs. currentTarget distinction Scroll lock
              document.body.style.overflow, handling scrollbar width jitter A
              junior dev will get the visual modal right. The gap shows up in
              edge cases: what happens when focus is on the last element and you
              hit Tab? What if the modal has no focusable elements? Does the
              scrollbar jump when you lock the body? The core challenge All four
              features involve side effects on the global document/window —
              which means you need to think carefully about: Adding and cleaning
              up event listeners Restoring original state (scroll position,
              focus) when the modal closes Not breaking anything when the modal
              unmounts unexpectedly Want me to walk through the implementation
              strategy for any specific piece?
            </p>
          </div>
        </div>
      )}
      <ModalDummyContent handleModalState={handleModalState} />
    </>
  )
}

const ModalDummyContent = ({ handleModalState }) => {
  return (
    <section
      className={`relative z-10 flex items-center justify-center flex-col space-y-3 text-pink-800 text-sm px-16 py-12 `}
    >
      <div>
        <button
          onClick={handleModalState}
          className='bg-pink-400 text-pink-800 px-4 py-2 rounded-sm text-sm '
        >
          Open Modal
        </button>
      </div>
      <p>
        1. This is a classic senior frontend interview question that tests
        whether you understand browser accessibility and UX fundamentals, not
        just React syntax. What you're being asked to build A Modal dialog with
        four specific behaviors: 1. Focus Trap When the modal opens, keyboard
        focus must stay inside it. Tab and Shift+Tab should cycle through only
        the focusable elements within the modal — they must not reach elements
        behind it. This is both a UX and accessibility (WCAG) requirement. 2.
        ESC to close Pressing the Escape key should close the modal. This is
        standard browser/OS behavior users expect from any dialog. 3.
        Click-outside to close Clicking on the backdrop/overlay (the dimmed area
        outside the modal box) should close it. Clicking inside the modal should
        not close it. 4. Scroll lock When the modal is open, the page behind it
        should not scroll. The body scroll position should be frozen, and
        restored exactly when the modal closes. Why this is a "senior filter"
        These four features test specific knowledge: Feature What it tests Focus
        trap DOM traversal, querySelectorAll with focusable selectors, keydown
        event handling, tabIndex ESC Global event listeners, cleanup on unmount
        Click-outside Event bubbling vs. target vs. currentTarget distinction
        Scroll lock document.body.style.overflow, handling scrollbar width
        jitter A junior dev will get the visual modal right. The gap shows up in
        edge cases: what happens when focus is on the last element and you hit
        Tab? What if the modal has no focusable elements? Does the scrollbar
        jump when you lock the body? The core challenge All four features
        involve side effects on the global document/window — which means you
        need to think carefully about: Adding and cleaning up event listeners
        Restoring original state (scroll position, focus) when the modal closes
        Not breaking anything when the modal unmounts unexpectedly Want me to
        walk through the implementation strategy for any specific piece?
      </p>
      <div>
        <button
          onClick={handleModalState}
          className='bg-pink-400 text-pink-800 px-4 py-2 rounded-sm text-sm '
        >
          Open Modal
        </button>
      </div>
      <p>
        2. This is a classic senior frontend interview question that tests
        whether you understand browser accessibility and UX fundamentals, not
        just React syntax. What you're being asked to build A Modal dialog with
        four specific behaviors: 1. Focus Trap When the modal opens, keyboard
        focus must stay inside it. Tab and Shift+Tab should cycle through only
        the focusable elements within the modal — they must not reach elements
        behind it. This is both a UX and accessibility (WCAG) requirement. 2.
        ESC to close Pressing the Escape key should close the modal. This is
        standard browser/OS behavior users expect from any dialog. 3.
        Click-outside to close Clicking on the backdrop/overlay (the dimmed area
        outside the modal box) should close it. Clicking inside the modal should
        not close it. 4. Scroll lock When the modal is open, the page behind it
        should not scroll. The body scroll position should be frozen, and
        restored exactly when the modal closes. Why this is a "senior filter"
        These four features test specific knowledge: Feature What it tests Focus
        trap DOM traversal, querySelectorAll with focusable selectors, keydown
        event handling, tabIndex ESC Global event listeners, cleanup on unmount
        Click-outside Event bubbling vs. target vs. currentTarget distinction
        Scroll lock document.body.style.overflow, handling scrollbar width
        jitter A junior dev will get the visual modal right. The gap shows up in
        edge cases: what happens when focus is on the last element and you hit
        Tab? What if the modal has no focusable elements? Does the scrollbar
        jump when you lock the body? The core challenge All four features
        involve side effects on the global document/window — which means you
        need to think carefully about: Adding and cleaning up event listeners
        Restoring original state (scroll position, focus) when the modal closes
        Not breaking anything when the modal unmounts unexpectedly Want me to
        walk through the implementation strategy for any specific piece?
      </p>

      <p>
        {' '}
        3.This is a classic senior frontend interview question that tests
        whether you understand browser accessibility and UX fundamentals, not
        just React syntax. What you're being asked to build A Modal dialog with
        four specific behaviors: 1. Focus Trap When the modal opens, keyboard
        focus must stay inside it. Tab and Shift+Tab should cycle through only
        the focusable elements within the modal — they must not reach elements
        behind it. This is both a UX and accessibility (WCAG) requirement. 2.
        ESC to close Pressing the Escape key should close the modal. This is
        standard browser/OS behavior users expect from any dialog. 3.
        Click-outside to close Clicking on the backdrop/overlay (the dimmed area
        outside the modal box) should close it. Clicking inside the modal should
        not close it. 4. Scroll lock When the modal is open, the page behind it
        should not scroll. The body scroll position should be frozen, and
        restored exactly when the modal closes. Why this is a "senior filter"
        These four features test specific knowledge: Feature What it tests Focus
        trap DOM traversal, querySelectorAll with focusable selectors, keydown
        event handling, tabIndex ESC Global event listeners, cleanup on unmount
        Click-outside Event bubbling vs. target vs. currentTarget distinction
        Scroll lock document.body.style.overflow, handling scrollbar width
        jitter A junior dev will get the visual modal right. The gap shows up in
        edge cases: what happens when focus is on the last element and you hit
        Tab? What if the modal has no focusable elements? Does the scrollbar
        jump when you lock the body? The core challenge All four features
        involve side effects on the global document/window — which means you
        need to think carefully about: Adding and cleaning up event listeners
        Restoring original state (scroll position, focus) when the modal closes
        Not breaking anything when the modal unmounts unexpectedly Want me to
        walk through the implementation strategy for any specific piece?
      </p>

      <p>
        4. This is a classic senior frontend interview question that tests
        whether you understand browser accessibility and UX fundamentals, not
        just React syntax. What you're being asked to build A Modal dialog with
        four specific behaviors: 1. Focus Trap When the modal opens, keyboard
        focus must stay inside it. Tab and Shift+Tab should cycle through only
        the focusable elements within the modal — they must not reach elements
        behind it. This is both a UX and accessibility (WCAG) requirement. 2.
        ESC to close Pressing the Escape key should close the modal. This is
        standard browser/OS behavior users expect from any dialog. 3.
        Click-outside to close Clicking on the backdrop/overlay (the dimmed area
        outside the modal box) should close it. Clicking inside the modal should
        not close it. 4. Scroll lock When the modal is open, the page behind it
        should not scroll. The body scroll position should be frozen, and
        restored exactly when the modal closes. Why this is a "senior filter"
        These four features test specific knowledge: Feature What it tests Focus
        trap DOM traversal, querySelectorAll with focusable selectors, keydown
        event handling, tabIndex ESC Global event listeners, cleanup on unmount
        Click-outside Event bubbling vs. target vs. currentTarget distinction
        Scroll lock document.body.style.overflow, handling scrollbar width
        jitter A junior dev will get the visual modal right. The gap shows up in
        edge cases: what happens when focus is on the last element and you hit
        Tab? What if the modal has no focusable elements? Does the scrollbar
        jump when you lock the body? The core challenge All four features
        involve side effects on the global document/window — which means you
        need to think carefully about: Adding and cleaning up event listeners
        Restoring original state (scroll position, focus) when the modal closes
        Not breaking anything when the modal unmounts unexpectedly Want me to
        walk through the implementation strategy for any specific piece?
      </p>
    </section>
  )
}
export default Modal
