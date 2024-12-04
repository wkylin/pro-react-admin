
const useEventListener = (type, handler, el = window) => {
  const savedHandler = React.useRef();

  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const listener = e => savedHandler.current(e);

    el.addEventListener(type, listener);

    return () => {
      el.removeEventListener(type, listener);
    };
  }, [type, el]);
}

export default useEventListener

// const updateCoords = React.useCallback(
//   ({ clientX, clientY }) => {
//     setCoords({ x: clientX, y: clientY });
//   },
//   [setCoords]
// );
//  useEventListener('mousemove', updateCoords);